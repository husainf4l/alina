using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.Modules.profiles;
using alina_backend.Modules.finance;
using alina_backend.Modules.marketplace;
using alina_backend.Modules.analytics;

namespace alina_backend.Modules.admin;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AnalyticsService _analyticsService;

    public AdminController(AppDbContext context, AnalyticsService analyticsService)
    {
        _context = context;
        _analyticsService = analyticsService;
    }

    // --- Withdrawal Management ---

    [HttpGet("withdrawals/pending")]
    public async Task<ActionResult<IEnumerable<AdminWithdrawalRequestDto>>> GetPendingWithdrawals()
    {
        var requests = await _context.WithdrawalRequests
            .Include(w => w.User)
            .Where(w => w.Status == WithdrawalStatus.Pending)
            .OrderBy(w => w.RequestedAt)
            .Select(w => new AdminWithdrawalRequestDto(
                w.Id,
                w.UserId,
                w.User.DisplayName ?? "Unknown User",
                w.User.User.Email ?? "No Email",
                w.Amount,
                w.Currency,
                w.BankDetails,
                w.RequestedAt
            ))
            .ToListAsync();

        return Ok(requests);
    }

    [HttpPost("withdrawals/{id}/approve")]
    public async Task<IActionResult> ApproveWithdrawal(Guid id, [FromBody] AdminActionDto dto)
    {
        var request = await _context.WithdrawalRequests
            .Include(w => w.User)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (request == null) return NotFound();
        if (request.Status != WithdrawalStatus.Pending)
            return BadRequest("Request is not in pending status");

        // Update request status
        request.Status = WithdrawalStatus.Approved;
        request.ProcessedAt = DateTime.UtcNow;
        request.AdminNotes = dto.Notes;

        // Create transaction record for completed withdrawal
        var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId ==
            _context.Profiles.FirstOrDefault(p => p.UserId == request.UserId)!.Id);

        if (wallet != null)
        {
            var withdrawalTransaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.WalletId == wallet.Id
                    && t.Type == TransactionType.Withdrawal
                    && t.Status == TransactionStatus.Pending
                    && t.Amount == -request.Amount);

            if (withdrawalTransaction != null)
            {
                withdrawalTransaction.Status = TransactionStatus.Completed;
                withdrawalTransaction.ProcessedAt = DateTime.UtcNow;
                withdrawalTransaction.Description = $"Withdrawal approved: {dto.Notes ?? "Processed by admin"}";
            }
        }

        await _context.SaveChangesAsync();

        // TODO: Send notification to user
        // TODO: Trigger actual bank transfer

        return Ok();
    }

    [HttpPost("withdrawals/{id}/reject")]
    public async Task<IActionResult> RejectWithdrawal(Guid id, [FromBody] AdminActionDto dto)
    {
        var request = await _context.WithdrawalRequests
            .Include(w => w.User)
            .FirstOrDefaultAsync(w => w.Id == id);

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
            request.AdminNotes = dto.Notes;

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
                withdrawalTransaction.Description = $"Withdrawal rejected: {dto.Notes}";
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            // TODO: Send notification to user

            return Ok();
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, "Failed to reject withdrawal request. Please try again.");
        }
    }

    [HttpGet("withdrawals/stats")]
    public async Task<ActionResult<WithdrawalStatsDto>> GetWithdrawalStats()
    {
        var now = DateTime.UtcNow;
        var startOfMonth = new DateTime(now.Year, now.Month, 1);
        var startOfYear = new DateTime(now.Year, 1, 1);

        var monthlyWithdrawals = await _context.WithdrawalRequests
            .Where(w => w.RequestedAt >= startOfMonth && w.Status == WithdrawalStatus.Approved)
            .SumAsync(w => w.Amount);

        var yearlyWithdrawals = await _context.WithdrawalRequests
            .Where(w => w.RequestedAt >= startOfYear && w.Status == WithdrawalStatus.Approved)
            .SumAsync(w => w.Amount);

        var pendingCount = await _context.WithdrawalRequests
            .CountAsync(w => w.Status == WithdrawalStatus.Pending);

        var totalUsersWithWithdrawals = await _context.WithdrawalRequests
            .Select(w => w.UserId)
            .Distinct()
            .CountAsync();

        return Ok(new WithdrawalStatsDto(
            monthlyWithdrawals,
            yearlyWithdrawals,
            pendingCount,
            totalUsersWithWithdrawals
        ));
    }

    // --- Platform Statistics ---

    [HttpGet("stats")]
    public async Task<ActionResult<PlatformStatsDto>> GetPlatformStats()
    {
        var totalUsers = await _context.Users.CountAsync();
        var totalOrders = await _context.Orders.CountAsync();
        var totalRevenue = await _context.Transactions
            .Where(t => t.Type == TransactionType.Release)
            .SumAsync(t => t.Amount);

        var activeOrders = await _context.Orders
            .CountAsync(o => o.Status == OrderStatus.InProgress || o.Status == OrderStatus.Completed);

        var totalWalletBalance = await _context.Wallets.SumAsync(w => w.AvailableBalance + w.EscrowBalance);

        // Platform earnings calculations
        var totalPlatformEarnings = await _context.Transactions
            .Where(t => t.Type == TransactionType.PlatformFee)
            .SumAsync(t => t.Amount);

        var today = DateTime.UtcNow.Date;
        var earningsToday = await _context.Transactions
            .Where(t => t.Type == TransactionType.PlatformFee && t.ProcessedAt >= today)
            .SumAsync(t => t.Amount);

        var thisMonth = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
        var earningsThisMonth = await _context.Transactions
            .Where(t => t.Type == TransactionType.PlatformFee && t.ProcessedAt >= thisMonth)
            .SumAsync(t => t.Amount);

        // BUG-15: AverageAsync throws InvalidOperationException on empty set — use nullable overload with ?? 0
        var averageCommissionRate = await _context.Orders
            .Where(o => o.CommissionAmount.HasValue && o.PlatformFeePercentage.HasValue)
            .AverageAsync(o => (decimal?)o.PlatformFeePercentage!.Value) ?? 0m;

        return Ok(new PlatformStatsDto(
            totalUsers,
            totalOrders,
            activeOrders,
            totalRevenue,
            totalWalletBalance,
            totalPlatformEarnings,
            earningsToday,
            earningsThisMonth,
            averageCommissionRate
        ));
    }

    [HttpGet("analytics/overview")]
    public async Task<ActionResult<PlatformMetricsDto>> GetAnalyticsOverview()
    {
        var metrics = await _analyticsService.GetPlatformMetricsAsync();
        return Ok(metrics);
    }

    [HttpGet("analytics/revenue")]
    public async Task<ActionResult<RevenueAnalyticsDto>> GetRevenueAnalytics()
    {
        // Total GMV (Gross Marketplace Value) - sum of all completed order amounts
        var totalGMV = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed)
            .SumAsync(o => o.Amount);

        // Total Platform Revenue - sum of all platform fees from completed orders
        var totalPlatformRevenue = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed)
            .SumAsync(o => o.PlatformFee ?? 0);

        // Monthly GMV and Revenue
        var thisMonth = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
        var monthlyGMV = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed && o.CompletedAt >= thisMonth)
            .SumAsync(o => o.Amount);

        var monthlyRevenue = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed && o.CompletedAt >= thisMonth)
            .SumAsync(o => o.PlatformFee ?? 0);

        // Weekly GMV and Revenue
        var thisWeek = DateTime.UtcNow.AddDays(-7);
        var weeklyGMV = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed && o.CompletedAt >= thisWeek)
            .SumAsync(o => o.Amount);

        var weeklyRevenue = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed && o.CompletedAt >= thisWeek)
            .SumAsync(o => o.PlatformFee ?? 0);

        // Daily GMV and Revenue
        var today = DateTime.UtcNow.Date;
        var dailyGMV = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed && o.CompletedAt >= today)
            .SumAsync(o => o.Amount);

        var dailyRevenue = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed && o.CompletedAt >= today)
            .SumAsync(o => o.PlatformFee ?? 0);

        // Revenue by category (simplified - using gig categories)
        var revenueByCategory = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed && o.GigId.HasValue)
            .Include(o => o.Gig).ThenInclude(g => g.Category)
            .GroupBy(o => o.Gig.Category.Name)
            .Select(g => new { Category = g.Key, Revenue = g.Sum(o => o.PlatformFee ?? 0) })
            .ToDictionaryAsync(g => g.Category, g => (double)g.Revenue);

        // Revenue trend (last 30 days)
        var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);
        var revenueTrend = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed && o.CompletedAt >= thirtyDaysAgo)
            .GroupBy(o => o.CompletedAt.Value.Date)
            .Select(g => new RevenueDataPoint(g.Key, (double)g.Sum(o => o.PlatformFee ?? 0)))
            .OrderBy(r => r.Date)
            .ToListAsync();

        // Total Seller Payouts - sum of all seller earnings from completed orders
        var totalSellerPayouts = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed)
            .SumAsync(o => o.SellerAmount ?? 0);

        // Escrow Balance - total amount currently in escrow
        var escrowBalance = await _context.Wallets
            .SumAsync(w => w.EscrowBalance);

        return Ok(new RevenueAnalyticsDto(
            totalGMV: (double)totalGMV,
            totalPlatformRevenue: (double)totalPlatformRevenue,
            totalSellerPayouts: (double)totalSellerPayouts,
            escrowBalance: (double)escrowBalance,
            monthlyGMV: (double)monthlyGMV,
            monthlyRevenue: (double)monthlyRevenue,
            weeklyGMV: (double)weeklyGMV,
            weeklyRevenue: (double)weeklyRevenue,
            dailyGMV: (double)dailyGMV,
            dailyRevenue: (double)dailyRevenue,
            revenueByCategory: revenueByCategory,
            revenueTrend: revenueTrend
        ));
    }

    // --- Dispute Management ---

    [HttpGet("orders/disputed")]
    public async Task<ActionResult<IEnumerable<object>>> GetDisputedOrders()
    {
        var disputedOrders = await _context.Orders
            .Include(o => o.Gig)
            .Include(o => o.Buyer)
            .Include(o => o.Seller)
            .Where(o => o.Status == OrderStatus.Disputed)
            .OrderByDescending(o => o.UpdatedAt)
            .Select(o => new
            {
                id = o.Id,
                gigTitle = o.GigId.HasValue ? o.Gig.Title : "Custom Order",
                buyerName = o.Buyer.DisplayName ?? "Unknown Buyer",
                buyerEmail = o.Buyer.User.Email ?? "No Email",
                sellerName = o.Seller.DisplayName ?? "Unknown Seller",
                sellerEmail = o.Seller.User.Email ?? "No Email",
                amount = o.Amount,
                currency = o.Currency,
                status = o.Status.ToString(),
                createdAt = o.CreatedAt,
                updatedAt = o.UpdatedAt,
                deadline = o.Deadline,
                requirements = o.Requirements
            })
            .ToListAsync();

        return Ok(disputedOrders);
    }
}

// DTOs
public record AdminWithdrawalRequestDto(
    Guid Id,
    Guid UserId,
    string UserName,
    string UserEmail,
    decimal Amount,
    string Currency,
    string? BankDetails,
    DateTime RequestedAt
);

public record AdminActionDto(string? Notes);

public record WithdrawalStatsDto(
    decimal MonthlyWithdrawals,
    decimal YearlyWithdrawals,
    int PendingRequests,
    int TotalUsersWithWithdrawals
);

public record PlatformStatsDto(
    int TotalUsers,
    int TotalOrders,
    int ActiveOrders,
    decimal TotalRevenue,
    decimal TotalWalletBalance,
    decimal TotalPlatformEarnings,
    decimal EarningsToday,
    decimal EarningsThisMonth,
    decimal AverageCommissionRate
);

public record RevenueAnalyticsDto(
    double totalGMV,
    double totalPlatformRevenue,
    double totalSellerPayouts,
    double escrowBalance,
    double monthlyGMV,
    double monthlyRevenue,
    double weeklyGMV,
    double weeklyRevenue,
    double dailyGMV,
    double dailyRevenue,
    Dictionary<string, double> revenueByCategory,
    List<RevenueDataPoint> revenueTrend
);

public record RevenueDataPoint(
    DateTime Date,
    double Revenue
);