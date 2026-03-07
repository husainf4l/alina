using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.Modules.marketplace;

namespace alina_backend.Modules.finance;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WalletController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ICurrencyService _currencyService;

    public WalletController(AppDbContext context, ICurrencyService currencyService)
    {
        _context = context;
        _currencyService = currencyService;
    }

    [HttpGet]
    public async Task<ActionResult<WalletDto>> GetWallet()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var wallet = await _context.Wallets
            .Include(w => w.Profile)
            .FirstOrDefaultAsync(w => w.ProfileId == profile.Id);

        if (wallet == null)
        {
            wallet = new Wallet { ProfileId = profile.Id };
            _context.Wallets.Add(wallet);
            await _context.SaveChangesAsync();
        }

        var transactions = await _context.Transactions
            .Where(t => t.WalletId == wallet.Id)
            .OrderByDescending(t => t.CreatedAt)
            .Take(10)
            .ToListAsync();

        var convertedAvailable = await _currencyService.ConvertAsync(wallet.AvailableBalance, "USD", profile.PreferredCurrency);
        var convertedEscrow = await _currencyService.ConvertAsync(wallet.EscrowBalance, "USD", profile.PreferredCurrency);

        var transactionDtos = new List<WalletTransactionDto>();
        foreach (var t in transactions)
        {
            var convertedAmount = await _currencyService.ConvertAsync(t.Amount, "USD", profile.PreferredCurrency);
            transactionDtos.Add(new WalletTransactionDto(t.Id, new Money(convertedAmount, profile.PreferredCurrency), 
                t.Type.ToString(), t.Status.ToString(), t.Reference, t.Description, t.CreatedAt));
        }

        return new WalletDto(new Money(convertedAvailable, profile.PreferredCurrency), 
            new Money(convertedEscrow, profile.PreferredCurrency), transactionDtos);
    }

    [HttpPost("deposit")]
    public async Task<ActionResult<WalletTransactionDto>> Deposit([FromBody] CreateDepositDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == profile.Id);
        if (wallet == null) return BadRequest("Wallet not initialized");

        var transaction = new Transaction
        {
            WalletId = wallet.Id,
            Amount = dto.Amount,
            Type = TransactionType.Deposit,
            Status = TransactionStatus.Pending,
            Reference = dto.ReceiptUrl,
            Description = "Bank Transfer Deposit Request"
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return new WalletTransactionDto(transaction.Id, new Money(transaction.Amount, transaction.Currency), transaction.Type.ToString(), 
            transaction.Status.ToString(), transaction.Reference, transaction.Description, transaction.CreatedAt);
    }

    // Admin tool to approve deposits
    [HttpPost("admin/approve-deposit/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ApproveDeposit(Guid id)
    {
        var transaction = await _context.Transactions
            .Include(t => t.Wallet)
            .FirstOrDefaultAsync(t => t.Id == id && t.Type == TransactionType.Deposit && t.Status == TransactionStatus.Pending);

        if (transaction == null) return NotFound();

        transaction.Status = TransactionStatus.Completed;
        transaction.ProcessedAt = DateTime.UtcNow;
        transaction.Wallet.AvailableBalance += transaction.Amount;

        await _context.SaveChangesAsync();

        return Ok("Deposit approved and funds added to wallet.");
    }

    [HttpGet("transactions")]
    public async Task<ActionResult<List<WalletTransactionDto>>> GetTransactions([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == profile.Id);
        if (wallet == null) return BadRequest("Wallet not initialized");

        var transactions = await _context.Transactions
            .Where(t => t.WalletId == wallet.Id)
            .OrderByDescending(t => t.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var transactionDtos = new List<WalletTransactionDto>();
        foreach (var t in transactions)
        {
            var convertedAmount = await _currencyService.ConvertAsync(t.Amount, "USD", profile.PreferredCurrency);
            transactionDtos.Add(new WalletTransactionDto(t.Id, new Money(convertedAmount, profile.PreferredCurrency), 
                t.Type.ToString(), t.Status.ToString(), t.Reference, t.Description, t.CreatedAt));
        }

        return transactionDtos;
    }
}

public record WalletDto(Money AvailableBalance, Money EscrowBalance, List<WalletTransactionDto> RecentTransactions);
public record WalletTransactionDto(Guid Id, Money Amount, string Type, string Status, string? Reference, string? Description, DateTime CreatedAt);
public record CreateDepositDto(decimal Amount, string ReceiptUrl);
