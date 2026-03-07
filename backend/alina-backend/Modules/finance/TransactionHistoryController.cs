using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace alina_backend.Modules.finance;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TransactionHistoryController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<TransactionHistoryController> _logger;

    public TransactionHistoryController(AppDbContext context, ILogger<TransactionHistoryController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Get transaction history with pagination and filters
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<TransactionHistoryResponse>> GetTransactionHistory(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? type = null,
        [FromQuery] string? status = null,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] decimal? minAmount = null,
        [FromQuery] decimal? maxAmount = null)
    {
        var userIdClaim = User.FindFirst("sub")?.Value ?? User.FindFirst("userId")?.Value;
        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new { error = "Invalid user token" });
        }

        try
        {
            // Build query
            var query = _context.Transactions
                .Where(t => t.UserId == userId || t.RecipientId == userId);

            // Apply filters
            if (!string.IsNullOrEmpty(type))
            {
                if (Enum.TryParse<TransactionType>(type, true, out var transactionType))
                {
                    query = query.Where(t => t.Type == transactionType);
                }
            }

            if (!string.IsNullOrEmpty(status))
            {
                if (Enum.TryParse<TransactionStatus>(status, true, out var transactionStatus))
                {
                    query = query.Where(t => t.Status == transactionStatus);
                }
            }

            if (startDate.HasValue)
            {
                query = query.Where(t => t.CreatedAt >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(t => t.CreatedAt <= endDate.Value);
            }

            if (minAmount.HasValue)
            {
                query = query.Where(t => t.Amount >= minAmount.Value);
            }

            if (maxAmount.HasValue)
            {
                query = query.Where(t => t.Amount <= maxAmount.Value);
            }

            // Get total count
            var totalCount = await query.CountAsync();

            // Apply pagination
            var transactions = await query
                .OrderByDescending(t => t.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TransactionDto(
                    t.Id,
                    t.Type.ToString(),
                    t.Amount,
                    t.Currency,
                    t.Status.ToString(),
                    t.Description,
                    t.CreatedAt,
                    t.CompletedAt,
                    t.RecipientId == userId
                ))
                .ToListAsync();

            // Calculate summary statistics
            var totalIncoming = await _context.Transactions
                .Where(t => t.RecipientId == userId && t.Status == TransactionStatus.Completed)
                .SumAsync(t => (decimal?)t.Amount) ?? 0;

            var totalOutgoing = await _context.Transactions
                .Where(t => t.UserId == userId && t.Status == TransactionStatus.Completed)
                .SumAsync(t => (decimal?)t.Amount) ?? 0;

            return Ok(new TransactionHistoryResponse(
                transactions,
                totalCount,
                page,
                pageSize,
                (int)Math.Ceiling(totalCount / (double)pageSize),
                new TransactionSummary(
                    totalIncoming,
                    totalOutgoing,
                    totalIncoming - totalOutgoing
                )
            ));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving transaction history for user {UserId}", userId);
            return StatusCode(500, new { error = "Failed to retrieve transaction history" });
        }
    }

    /// <summary>
    /// Get transaction by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<TransactionDetailDto>> GetTransaction(Guid id)
    {
        var userIdClaim = User.FindFirst("sub")?.Value ?? User.FindFirst("userId")?.Value;
        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new { error = "Invalid user token" });
        }

        try
        {
            var transaction = await _context.Transactions
                .Where(t => t.Id == id && (t.UserId == userId || t.RecipientId == userId))
                .Select(t => new TransactionDetailDto(
                    t.Id,
                    t.Type.ToString(),
                    t.Amount,
                    t.Currency,
                    t.Status.ToString(),
                    t.Description,
                    t.CreatedAt,
                    t.CompletedAt,
                    t.RecipientId == userId,
                    t.Metadata
                ))
                .FirstOrDefaultAsync();

            if (transaction == null)
            {
                return NotFound(new { error = "Transaction not found" });
            }

            return Ok(transaction);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving transaction {TransactionId}", id);
            return StatusCode(500, new { error = "Failed to retrieve transaction" });
        }
    }

    /// <summary>
    /// Export transactions as CSV
    /// </summary>
    [HttpGet("export")]
    public async Task<IActionResult> ExportTransactions(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        var userIdClaim = User.FindFirst("sub")?.Value ?? User.FindFirst("userId")?.Value;
        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new { error = "Invalid user token" });
        }

        try
        {
            var query = _context.Transactions
                .Where(t => t.UserId == userId || t.RecipientId == userId);

            if (startDate.HasValue)
            {
                query = query.Where(t => t.CreatedAt >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(t => t.CreatedAt <= endDate.Value);
            }

            var transactions = await query
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            // Generate CSV
            var csv = new System.Text.StringBuilder();
            csv.AppendLine("Date,Type,Amount,Currency,Status,Description,Direction");

            foreach (var t in transactions)
            {
                var direction = t.RecipientId == userId ? "Incoming" : "Outgoing";
                csv.AppendLine($"\"{t.CreatedAt:yyyy-MM-dd HH:mm:ss}\",\"{t.Type}\",{t.Amount},\"{t.Currency}\",\"{t.Status}\",\"{t.Description}\",\"{direction}\"");
            }

            var bytes = System.Text.Encoding.UTF8.GetBytes(csv.ToString());
            return File(bytes, "text/csv", $"transactions-{DateTime.UtcNow:yyyyMMdd}.csv");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error exporting transactions for user {UserId}", userId);
            return StatusCode(500, new { error = "Failed to export transactions" });
        }
    }
}

// DTOs
public record TransactionHistoryResponse(
    List<TransactionDto> Transactions,
    int TotalCount,
    int Page,
    int PageSize,
    int TotalPages,
    TransactionSummary Summary
);

public record TransactionDto(
    Guid Id,
    string Type,
    decimal Amount,
    string Currency,
    string Status,
    string? Description,
    DateTime CreatedAt,
    DateTime? CompletedAt,
    bool IsIncoming
);

public record TransactionDetailDto(
    Guid Id,
    string Type,
    decimal Amount,
    string Currency,
    string Status,
    string? Description,
    DateTime CreatedAt,
    DateTime? CompletedAt,
    bool IsIncoming,
    string? Metadata
);

public record TransactionSummary(
    decimal TotalIncoming,
    decimal TotalOutgoing,
    decimal NetBalance
);
