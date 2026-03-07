using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.Modules.marketplace;
using alina_backend.Modules.finance;

namespace alina_backend.Modules.disputes;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DisputeController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<DisputeController> _logger;

    public DisputeController(AppDbContext context, ILogger<DisputeController> logger)
    {
        _context = context;
        _logger = logger;
        _logger.LogInformation("DisputeController instantiated");
    }

    /// <summary>
    /// Open a dispute for an order (Buyer only)
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> OpenDispute([FromBody] OpenDisputeRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        // Resolve to profile ID (orders use Profile IDs, not User IDs)
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId.Value);
        if (profile == null)
            return BadRequest("Profile not found");

        // Get the order
        var order = await _context.Orders
            .Include(o => o.Buyer)
            .FirstOrDefaultAsync(o => o.Id == request.OrderId);

        if (order == null)
        {
            return NotFound("Order not found");
        }

        // Only buyer can open dispute
        if (order.BuyerId != profile.Id)
        {
            return Forbid();
        }

        // Only active orders can be disputed
        if (order.Status != OrderStatus.InProgress)
        {
            return BadRequest("Only active orders can be disputed");
        }

        // Check if dispute already exists
        var existingDispute = await _context.Disputes
            .FirstOrDefaultAsync(d => d.OrderId == request.OrderId);

        if (existingDispute != null)
        {
            return BadRequest("A dispute already exists for this order");
        }

        // Create dispute
        var dispute = new Dispute
        {
            OrderId = request.OrderId,
            OpenedByUserId = userId.Value,
            Reason = request.Reason,
            Status = DisputeStatus.Open
        };

        // Update order status to Disputed
        order.Status = OrderStatus.Disputed;

        _context.Disputes.Add(dispute);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Dispute opened for order {OrderId} by user {UserId}", order.Id, userId);

        return Ok(new
        {
            disputeId = dispute.Id,
            message = "Dispute opened successfully"
        });
    }

    /// <summary>
    /// Get disputes for the current user
    /// </summary>
    [HttpGet("my")]
    public async Task<IActionResult> GetMyDisputes()
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        // Resolve to profile ID (orders use Profile IDs, not User IDs)
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId.Value);
        if (profile == null)
            return BadRequest("Profile not found");

        var profileId = profile.Id;

        var disputes = await _context.Disputes
            .Include(d => d.Order)
                .ThenInclude(o => o.Buyer)
                    .ThenInclude(b => b.User)
            .Include(d => d.Order)
                .ThenInclude(o => o.Seller)
                    .ThenInclude(s => s.User)
            .Include(d => d.Order)
                .ThenInclude(o => o.Gig)
            .Include(d => d.Order)
                .ThenInclude(o => o.Offer)
            .Where(d => d.Order.BuyerId == profileId || d.Order.SellerId == profileId)
            .OrderByDescending(d => d.CreatedAt)
            .Select(d => new
            {
                id = d.Id,
                orderId = d.OrderId,
                orderTitle = d.Order.Gig != null ? d.Order.Gig.Title :
                           d.Order.Offer != null ? "Offer for task" : "Custom Order",
                buyerName = d.Order.Buyer.User.FullName,
                sellerName = d.Order.Seller.User.FullName,
                amount = d.Order.Amount,
                currency = d.Order.Currency,
                reason = d.Reason,
                status = d.Status.ToString(),
                resolution = d.Resolution.HasValue ? d.Resolution.Value.ToString() : null,
                resolutionAmount = d.ResolutionAmount,
                createdAt = d.CreatedAt,
                resolvedAt = d.ResolvedAt,
                adminNotes = d.AdminNotes
            })
            .ToListAsync();

        return Ok(disputes);
    }

    /// <summary>
    /// Resolve a dispute (Admin only)
    /// </summary>
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/resolve")]
    public async Task<IActionResult> ResolveDispute(Guid id, [FromBody] ResolveDisputeRequest request)
    {
        var dispute = await _context.Disputes
            .Include(d => d.Order)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (dispute == null)
        {
            return NotFound("Dispute not found");
        }

        if (dispute.Status == DisputeStatus.Resolved)
        {
            return BadRequest("Dispute is already resolved");
        }

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            // Update dispute
            dispute.Status = DisputeStatus.Resolved;
            dispute.Resolution = request.Resolution;
            dispute.ResolutionAmount = request.ResolutionAmount;
            dispute.ResolvedAt = DateTime.UtcNow;
            dispute.AdminNotes = request.AdminNotes;

            // Handle escrow resolution
            await ResolveEscrow(dispute, request);

            // Update order status based on resolution
            dispute.Order.Status = request.Resolution == DisputeResolution.RefundBuyer
                ? OrderStatus.Cancelled
                : OrderStatus.Completed;

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            _logger.LogInformation("Dispute {DisputeId} resolved with {Resolution}", id, request.Resolution);

            return Ok(new
            {
                message = "Dispute resolved successfully"
            });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error resolving dispute {DisputeId}", id);
            return StatusCode(500, "Error resolving dispute");
        }
    }

    private async Task ResolveEscrow(Dispute dispute, ResolveDisputeRequest request)
    {
        var order = dispute.Order;

        // Get escrow transaction (Payment to Escrow)
        var escrowTransaction = await _context.Transactions
            .FirstOrDefaultAsync(t => t.OrderId == order.Id && t.Type == TransactionType.Payment);

        if (escrowTransaction == null)
        {
            throw new Exception("Escrow transaction not found");
        }

        // Use absolute value — buyer Payment transactions are stored as negative debits
        var escrowAmount = Math.Abs(escrowTransaction.Amount);

        if (request.Resolution == DisputeResolution.RefundBuyer)
        {
            // Full refund to buyer
            await CreateTransaction(order.BuyerId, escrowAmount, TransactionType.Refund, $"Dispute refund for order {order.Id}");
        }
        else if (request.Resolution == DisputeResolution.ReleaseSeller)
        {
            // Full release to seller (with commission)
            var commission = escrowAmount * 0.15m; // 15% platform fee
            var sellerAmount = escrowAmount - commission;

            await CreateTransaction(order.SellerId, sellerAmount, TransactionType.Release, $"Dispute resolution release for order {order.Id}");
            await CreateTransaction(Guid.Empty, commission, TransactionType.PlatformFee, $"Platform fee from dispute resolution for order {order.Id}");
        }
        else if (request.Resolution == DisputeResolution.Partial)
        {
            // Partial resolution
            if (!request.ResolutionAmount.HasValue)
            {
                throw new Exception("Resolution amount required for partial resolution");
            }

            var buyerAmount = request.ResolutionAmount.Value;
            var sellerAmount = escrowAmount - buyerAmount;

            // Apply commission proportionally
            var commission = sellerAmount * 0.15m;
            var sellerNetAmount = sellerAmount - commission;

            await CreateTransaction(order.BuyerId, buyerAmount, TransactionType.Refund, $"Partial dispute refund for order {order.Id}");
            await CreateTransaction(order.SellerId, sellerNetAmount, TransactionType.Release, $"Partial dispute release for order {order.Id}");
            await CreateTransaction(Guid.Empty, commission, TransactionType.PlatformFee, $"Platform fee from partial dispute resolution for order {order.Id}");
        }
    }

    private async Task CreateTransaction(Guid walletProfileId, decimal amount, TransactionType type, string description)
    {
        // For platform fees, we don't need a wallet
        if (type == TransactionType.PlatformFee)
        {
            var platformTransaction = new Transaction
            {
                WalletId = null, // Platform fee — no user wallet
                Amount = amount,
                Type = type,
                Status = TransactionStatus.Completed,
                Description = description,
                ProcessedAt = DateTime.UtcNow
            };
            _context.Transactions.Add(platformTransaction);
            return;
        }

        // Get or create wallet for the profile
        var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == walletProfileId);
        if (wallet == null)
        {
            throw new Exception($"Wallet not found for profile {walletProfileId}");
        }

        var transaction = new Transaction
        {
            WalletId = wallet.Id,
            Amount = amount,
            Type = type,
            Status = TransactionStatus.Completed,
            Description = description,
            OrderId = null, // Not tied to an order for dispute resolutions
            ProcessedAt = DateTime.UtcNow
        };

        // Update wallet balance
        if (type == TransactionType.Release || type == TransactionType.Refund)
        {
            wallet.AvailableBalance += amount;
        }

        _context.Transactions.Add(transaction);
    }

    private Guid? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return userIdClaim != null ? Guid.Parse(userIdClaim) : null;
    }
}

// DTOs
public record OpenDisputeRequest
{
    public Guid OrderId { get; init; }
    public string Reason { get; init; } = string.Empty;
}

public record ResolveDisputeRequest
{
    public DisputeResolution Resolution { get; init; }
    public decimal? ResolutionAmount { get; init; }
    public string? AdminNotes { get; init; }
}