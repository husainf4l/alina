using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.app.profiles;
using alina_backend.app.auth;

namespace alina_backend.app.finance;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WithdrawalController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TwoFactorAuthService _twoFactorAuth;
    private readonly ILogger<WithdrawalController> _logger;

    public WithdrawalController(
        AppDbContext context,
        TwoFactorAuthService twoFactorAuth,
        ILogger<WithdrawalController> logger)
    {
        _context = context;
        _twoFactorAuth = twoFactorAuth;
        _logger = logger;
    }

    /// <summary>
    /// Step 1: Request withdrawal with 2FA - sends verification code
    /// </summary>
    [HttpPost("request")]
    public async Task<ActionResult> RequestWithdrawalWithdrawal2FA(CreateWithdrawalRequestDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        // Validate amount and balance first
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == profile.Id);
        if (wallet == null) return BadRequest("Wallet not found");

        decimal availableForWithdrawal = wallet.AvailableBalance - wallet.EscrowBalance - wallet.PendingWithdrawal;
        if (availableForWithdrawal < dto.Amount)
            return BadRequest($"Insufficient available balance. Available: ${availableForWithdrawal:F2}");

        // Send 2FA code
        var (success, message) = await _twoFactorAuth.SendVerificationCodeAsync(userId, "email");
        
        if (!success)
        {
            return BadRequest(new { error = "Failed to send verification code" });
        }

        return Ok(new
        {
            message = "Verification code sent. Please verify to complete withdrawal.",
            expiresInMinutes = 10,
            amount = dto.Amount,
            currency = dto.Currency ?? "USD"
        });
    }

    /// <summary>
    /// Step 2: Complete withdrawal after 2FA verification
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<WithdrawalRequestDto>> CreateWithdrawalRequest(CreateWithdrawalRequestWithCodeDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        // Verify 2FA code first
        var (verified, verifyMessage) = await _twoFactorAuth.VerifyCodeAsync(userId, dto.VerificationCode, "withdrawal");
        if (!verified)
        {
            _logger.LogWarning("Failed withdrawal attempt for user {UserId} - Invalid 2FA code", userId);
            return BadRequest(new { error = "Invalid or expired verification code" });
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        // Check withdrawal cooldown (24 hours between requests)
        var lastWithdrawal = await _context.WithdrawalRequests
            .Where(w => w.UserId == userId)
            .OrderByDescending(w => w.RequestedAt)
            .FirstOrDefaultAsync();

        if (lastWithdrawal != null)
        {
            var timeSinceLastWithdrawal = DateTime.UtcNow - lastWithdrawal.RequestedAt;
            if (timeSinceLastWithdrawal < TimeSpan.FromHours(24))
            {
                var remainingTime = TimeSpan.FromHours(24) - timeSinceLastWithdrawal;
                return BadRequest($"Withdrawal cooldown active. You can request another withdrawal in {remainingTime.Hours} hours and {remainingTime.Minutes} minutes.");
            }
        }

        // Validate amount
        if (dto.Amount <= 0)
            return BadRequest("Withdrawal amount must be greater than zero");

        // Get user's wallet
        var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == profile.Id);
        if (wallet == null)
            return BadRequest("Wallet not found");

        // Check available balance (excluding escrow and pending withdrawals)
        decimal availableForWithdrawal = wallet.AvailableBalance - wallet.EscrowBalance - wallet.PendingWithdrawal;
        if (availableForWithdrawal < dto.Amount)
            return BadRequest($"Insufficient available balance for withdrawal. Available: \\${availableForWithdrawal:F2}, Requested: \\${dto.Amount:F2}");

        // Use database transaction for atomic withdrawal request
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            // Move funds from balance to pending withdrawal (money stays in system until approved)
            wallet.AvailableBalance -= dto.Amount;
            wallet.PendingWithdrawal += dto.Amount;
            wallet.UpdatedAt = DateTime.UtcNow;

            // Create withdrawal request
            var withdrawalRequest = new WithdrawalRequest
            {
                UserId = userId,
                Amount = dto.Amount,
                Currency = dto.Currency ?? "USD",
                BankDetails = dto.BankDetails,
                Status = WithdrawalStatus.Pending,
                RequestedAt = DateTime.UtcNow
            };

            _context.WithdrawalRequests.Add(withdrawalRequest);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            return Ok(new WithdrawalRequestDto(
                withdrawalRequest.Id,
                withdrawalRequest.UserId,
                withdrawalRequest.Amount,
                withdrawalRequest.Currency,
                withdrawalRequest.Status.ToString(),
                withdrawalRequest.BankDetails,
                withdrawalRequest.AdminNotes,
                withdrawalRequest.RequestedAt,
                withdrawalRequest.ProcessedAt
            ));
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, "Failed to create withdrawal request. Please try again.");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WithdrawalRequestDto>>> GetWithdrawalRequests()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var requests = await _context.WithdrawalRequests
            .Where(w => w.UserId == userId)
            .OrderByDescending(w => w.RequestedAt)
            .Select(w => new WithdrawalRequestDto(
                w.Id,
                w.UserId,
                w.Amount,
                w.Currency,
                w.Status.ToString(),
                w.BankDetails,
                w.AdminNotes,
                w.RequestedAt,
                w.ProcessedAt
            ))
            .ToListAsync();

        return Ok(requests);
    }

    [HttpGet("my")]
    public async Task<ActionResult<IEnumerable<WithdrawalRequestDto>>> GetMyWithdrawalRequests()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var requests = await _context.WithdrawalRequests
            .Where(w => w.UserId == userId)
            .OrderByDescending(w => w.RequestedAt)
            .Select(w => new WithdrawalRequestDto(
                w.Id,
                w.UserId,
                w.Amount,
                w.Currency,
                w.Status.ToString(),
                w.BankDetails,
                w.AdminNotes,
                w.RequestedAt,
                w.ProcessedAt
            ))
            .ToListAsync();

        return Ok(requests);
    }

    [HttpPost("{id}/approve")]
    [Authorize(Roles = "Admin")] // Only admins can approve
    public async Task<IActionResult> ApproveWithdrawalRequest(Guid id, ApproveWithdrawalRequestDto dto)
    {
        var request = await _context.WithdrawalRequests.FindAsync(id);
        if (request == null) return NotFound();

        if (request.Status != WithdrawalStatus.Pending)
            return BadRequest("Request is not in pending status");

        // Update request status
        request.Status = WithdrawalStatus.Approved;
        request.ProcessedAt = DateTime.UtcNow;
        request.AdminNotes = dto.AdminNotes;

        // Find and update the corresponding transaction
        var transaction = await _context.Transactions
            .FirstOrDefaultAsync(t => t.WalletId == 
                _context.Wallets.FirstOrDefault(w => w.ProfileId == 
                    _context.Profiles.FirstOrDefault(p => p.UserId == request.UserId)!.Id)!.Id
                && t.Type == TransactionType.Withdrawal 
                && t.Status == TransactionStatus.Pending
                && t.Amount == -request.Amount);

        if (transaction != null)
        {
            transaction.Status = TransactionStatus.Completed;
            transaction.ProcessedAt = DateTime.UtcNow;
            transaction.Description = $"Withdrawal approved: {request.Amount} {request.Currency}";
        }

        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("{id}/reject")]
    [Authorize(Roles = "Admin")] // Only admins can reject
    public async Task<IActionResult> RejectWithdrawalRequest(Guid id, RejectWithdrawalRequestDto dto)
    {
        var request = await _context.WithdrawalRequests.FindAsync(id);
        if (request == null) return NotFound();

        if (request.Status != WithdrawalStatus.Pending)
            return BadRequest("Request is not in pending status");

        // Use transaction to refund the amount back to available balance
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            // Update request status
            request.Status = WithdrawalStatus.Rejected;
            request.ProcessedAt = DateTime.UtcNow;
            request.AdminNotes = dto.AdminNotes;

            // Refund the amount back to available balance
            var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == request.UserId);
            if (profile != null)
            {
                var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == profile.Id);
                if (wallet != null)
                {
                    wallet.AvailableBalance += request.Amount;
                    wallet.UpdatedAt = DateTime.UtcNow;
                }
            }

            // Update the transaction status
            var withdrawalTransaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.WalletId == 
                    _context.Wallets.FirstOrDefault(w => w.ProfileId == 
                        _context.Profiles.FirstOrDefault(p => p.UserId == request.UserId)!.Id)!.Id
                    && t.Type == TransactionType.Withdrawal 
                    && t.Status == TransactionStatus.Pending
                    && t.Amount == -request.Amount);

            if (withdrawalTransaction != null)
            {
                withdrawalTransaction.Status = TransactionStatus.Rejected;
                withdrawalTransaction.ProcessedAt = DateTime.UtcNow;
                withdrawalTransaction.Description = $"Withdrawal rejected: {dto.AdminNotes}";
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return Ok();
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, "Failed to reject withdrawal request. Please try again.");
        }
    }

    [HttpGet("pending")]
    [Authorize(Roles = "Admin")] // Only admins can see pending requests
    public async Task<ActionResult<IEnumerable<WithdrawalRequestDto>>> GetPendingWithdrawalRequests()
    {
        var requests = await _context.WithdrawalRequests
            .Include(w => w.User)
            .Where(w => w.Status == WithdrawalStatus.Pending)
            .OrderBy(w => w.RequestedAt)
            .Select(w => new WithdrawalRequestDto(
                w.Id,
                w.UserId,
                w.Amount,
                w.Currency,
                w.Status.ToString(),
                w.BankDetails,
                w.AdminNotes,
                w.RequestedAt,
                w.ProcessedAt
            ))
            .ToListAsync();

        return Ok(requests);
    }

    // Admin endpoints for withdrawal approval
    [HttpPost("{id}/approve")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ApproveWithdrawal(Guid id, [FromBody] ApproveWithdrawalRequestDto dto)
    {
        var withdrawal = await _context.WithdrawalRequests
            .Include(w => w.User)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (withdrawal == null)
            return NotFound("Withdrawal request not found");

        if (withdrawal.Status != WithdrawalStatus.Pending)
            return BadRequest("Withdrawal request is not in pending status");

        // Get user's wallet
        var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == withdrawal.User.Id);
        if (wallet == null)
            return BadRequest("User wallet not found");

        // Verify funds are still in pending withdrawal
        if (wallet.PendingWithdrawal < withdrawal.Amount)
            return BadRequest("Insufficient pending withdrawal funds");

        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            // Remove from pending withdrawal (money leaves system via manual payout)
            wallet.PendingWithdrawal -= withdrawal.Amount;
            wallet.UpdatedAt = DateTime.UtcNow;

            // Update withdrawal request
            withdrawal.Status = WithdrawalStatus.Approved;
            withdrawal.ProcessedAt = DateTime.UtcNow;
            withdrawal.AdminNotes = dto.AdminNotes;

            // Create transaction record for the approved withdrawal
            var transactionRecord = new Transaction
            {
                WalletId = wallet.Id,
                Amount = -withdrawal.Amount,
                Type = TransactionType.Withdrawal,
                Status = TransactionStatus.Completed,
                Description = $"Approved withdrawal: \\${withdrawal.Amount:F2} {withdrawal.Currency}",
                ProcessedAt = DateTime.UtcNow
            };

            _context.Transactions.Add(transactionRecord);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new { message = "Withdrawal approved successfully" });
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    [HttpPost("{id}/reject")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> RejectWithdrawal(Guid id, [FromBody] RejectWithdrawalRequestDto dto)
    {
        var withdrawal = await _context.WithdrawalRequests
            .Include(w => w.User)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (withdrawal == null)
            return NotFound("Withdrawal request not found");

        if (withdrawal.Status != WithdrawalStatus.Pending)
            return BadRequest("Withdrawal request is not in pending status");

        // Get user's wallet
        var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == withdrawal.User.Id);
        if (wallet == null)
            return BadRequest("User wallet not found");

        // Verify funds are still in pending withdrawal
        if (wallet.PendingWithdrawal < withdrawal.Amount)
            return BadRequest("Insufficient pending withdrawal funds");

        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            // Return funds from pending withdrawal back to available balance
            wallet.PendingWithdrawal -= withdrawal.Amount;
            wallet.AvailableBalance += withdrawal.Amount;
            wallet.UpdatedAt = DateTime.UtcNow;

            // Update withdrawal request
            withdrawal.Status = WithdrawalStatus.Rejected;
            withdrawal.RejectionReason = dto.AdminNotes;
            withdrawal.ProcessedAt = DateTime.UtcNow;
            withdrawal.AdminNotes = dto.AdminNotes;

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new { message = "Withdrawal rejected successfully" });
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}

public record CreateWithdrawalRequestDto(decimal Amount, string? Currency, string? BankDetails);
public record CreateWithdrawalRequestWithCodeDto(decimal Amount, string? Currency, string? BankDetails, string VerificationCode);
public record WithdrawalRequestDto(Guid Id, Guid UserId, decimal Amount, string Currency, string Status, string? BankDetails, string? AdminNotes, DateTime RequestedAt, DateTime? ProcessedAt);
public record ApproveWithdrawalRequestDto(string? AdminNotes);
public record RejectWithdrawalRequestDto(string AdminNotes);