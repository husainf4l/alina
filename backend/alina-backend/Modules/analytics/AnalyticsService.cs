using alina_backend.Modules.finance;
using alina_backend.Modules.orders;
using alina_backend.Modules.marketplace;
using Microsoft.EntityFrameworkCore;

namespace alina_backend.Modules.analytics;

public class AnalyticsService
{
    private readonly AppDbContext _context;

    public AnalyticsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PlatformMetricsDto> GetPlatformMetricsAsync()
    {
        var today = DateTime.UtcNow.Date;
        var tomorrow = today.AddDays(1);
        var sevenDaysAgo = today.AddDays(-7);
        var thirtyDaysAgo = today.AddDays(-30);

        // Daily GMV (Gross Marketplace Volume) - total order amounts today
        var dailyGMV = await _context.Orders
            .Where(o => o.CreatedAt >= today && o.CreatedAt < tomorrow)
            .SumAsync(o => o.Amount);

        // Daily Revenue (platform commission) - commissions from completed orders today
        var dailyRevenue = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed && o.CompletedAt.HasValue && o.CompletedAt.Value >= today && o.CompletedAt.Value < tomorrow)
            .SumAsync(o => o.CommissionAmount ?? 0);

        // New users today
        var newUsersToday = await _context.Users
            .CountAsync(u => u.CreatedAt >= today && u.CreatedAt < tomorrow);

        // Active users (7 days) - users who have created orders or profiles recently
        var activeUsers7Days = await _context.Users
            .Where(u => u.CreatedAt >= sevenDaysAgo ||
                       _context.Profiles.Any(p => p.UserId == u.Id && p.UpdatedAt >= sevenDaysAgo) ||
                       _context.Orders.Any(o => (o.Buyer.UserId == u.Id || o.Seller.UserId == u.Id) && o.CreatedAt >= sevenDaysAgo))
            .Distinct()
            .CountAsync();

        // Active users (30 days)
        var activeUsers30Days = await _context.Users
            .Where(u => u.CreatedAt >= thirtyDaysAgo ||
                       _context.Profiles.Any(p => p.UserId == u.Id && p.UpdatedAt >= thirtyDaysAgo) ||
                       _context.Orders.Any(o => (o.Buyer.UserId == u.Id || o.Seller.UserId == u.Id) && o.CreatedAt >= thirtyDaysAgo))
            .Distinct()
            .CountAsync();

        // Orders created today
        var ordersToday = await _context.Orders
            .CountAsync(o => o.CreatedAt >= today && o.CreatedAt < tomorrow);

        // Orders completed today
        var completedToday = await _context.Orders
            .CountAsync(o => o.Status == OrderStatus.Completed && o.CompletedAt.HasValue && o.CompletedAt.Value >= today && o.CompletedAt.Value < tomorrow);

        // Cancellation rate (last 30 days)
        var totalOrders30Days = await _context.Orders
            .CountAsync(o => o.CreatedAt >= thirtyDaysAgo);

        var cancelledOrders30Days = await _context.Orders
            .CountAsync(o => o.CreatedAt >= thirtyDaysAgo && o.Status == OrderStatus.Cancelled);

        var cancellationRate = totalOrders30Days > 0 ? (double)cancelledOrders30Days / totalOrders30Days : 0;

        // Dispute rate (last 30 days)
        var disputedOrders30Days = await _context.Disputes
            .CountAsync(d => d.CreatedAt >= thirtyDaysAgo);

        var disputeRate = totalOrders30Days > 0 ? (double)disputedOrders30Days / totalOrders30Days : 0;

        return new PlatformMetricsDto
        {
            DailyGMV = dailyGMV,
            DailyRevenue = dailyRevenue,
            NewUsersToday = newUsersToday,
            ActiveUsers7Days = activeUsers7Days,
            ActiveUsers30Days = activeUsers30Days,
            OrdersToday = ordersToday,
            CompletedToday = completedToday,
            CancellationRate = Math.Round(cancellationRate * 100, 2), // Convert to percentage
            DisputeRate = Math.Round(disputeRate * 100, 2) // Convert to percentage
        };
    }

    public async Task<SellerAnalyticsDto> GetSellerAnalyticsAsync(Guid sellerId)
    {
        var today = DateTime.UtcNow.Date;
        var sevenDaysAgo = today.AddDays(-7);
        var thirtyDaysAgo = today.AddDays(-30);
        var fourteenDaysAgo = today.AddDays(-14);

        // Profile views - this would need an event tracking system, for now we'll use a placeholder
        var profileViews = 0; // TODO: Implement event tracking

        // Gig clicks - also needs event tracking
        var gigClicks = 0; // TODO: Implement event tracking

        // Orders for this seller
        var sellerOrders = _context.Orders.Where(o => o.SellerId == sellerId);

        // Earnings in last 7 days (seller net amount, not platform fee)
        var earnings7Days = await sellerOrders
            .Where(o => o.Status == OrderStatus.Completed && o.CompletedAt >= sevenDaysAgo)
            .SumAsync(o => o.SellerAmount ?? 0);

        // Earnings in last 30 days
        var earnings30Days = await sellerOrders
            .Where(o => o.Status == OrderStatus.Completed && o.CompletedAt >= thirtyDaysAgo)
            .SumAsync(o => o.SellerAmount ?? 0);

        // Orders in last 7 days
        var orders7Days = await sellerOrders
            .CountAsync(o => o.CreatedAt >= sevenDaysAgo);

        // Orders in last 30 days
        var orders30Days = await sellerOrders
            .CountAsync(o => o.CreatedAt >= thirtyDaysAgo);

        // Orders in previous 7 days (8-14 days ago) for growth calculation
        var ordersPrevious7Days = await sellerOrders
            .CountAsync(o => o.CreatedAt >= fourteenDaysAgo && o.CreatedAt < sevenDaysAgo);

        // Conversion rate (orders per profile view, placeholder for now)
        var conversionRate = profileViews > 0 ? (double)orders30Days / profileViews : 0;

        // Order growth rate
        var orderGrowthRate = ordersPrevious7Days > 0
            ? ((double)(orders7Days - ordersPrevious7Days) / ordersPrevious7Days) * 100
            : (orders7Days > 0 ? 100 : 0);

        return new SellerAnalyticsDto
        {
            ProfileViews = profileViews,
            GigClicks = gigClicks,
            ConversionRate = Math.Round(conversionRate * 100, 2), // Convert to percentage
            Earnings7Days = earnings7Days,
            Earnings30Days = earnings30Days,
            Orders7Days = orders7Days,
            Orders30Days = orders30Days,
            OrderGrowthRate = Math.Round(orderGrowthRate, 2)
        };
    }

    public async Task<List<RevenueTrendDto>> GetSellerRevenueTrendsAsync(Guid sellerId, int days)
    {
        var startDate = DateTime.UtcNow.Date.AddDays(-days);

        var revenueTrends = await _context.Orders
            .Where(o => o.SellerId == sellerId && o.Status == OrderStatus.Completed && o.CompletedAt >= startDate)
            .GroupBy(o => o.CompletedAt!.Value.Date)
            .Select(g => new RevenueTrendDto
            {
                Date = g.Key,
                Revenue = g.Sum(o => o.SellerAmount ?? 0)
            })
            .OrderBy(t => t.Date)
            .ToListAsync();

        return revenueTrends;
    }

    public async Task<List<OrderTrendDto>> GetSellerOrderTrendsAsync(Guid sellerId, int days)
    {
        var startDate = DateTime.UtcNow.Date.AddDays(-days);

        var orderTrends = await _context.Orders
            .Where(o => o.SellerId == sellerId && o.CreatedAt >= startDate)
            .GroupBy(o => o.CreatedAt.Date)
            .Select(g => new OrderTrendDto
            {
                Date = g.Key,
                Orders = g.Count()
            })
            .OrderBy(t => t.Date)
            .ToListAsync();

        return orderTrends;
    }

    public async Task<List<TopGigDto>> GetSellerTopGigsAsync(Guid sellerId, int limit)
    {
        var topGigs = await _context.Orders
            .Where(o => o.SellerId == sellerId && o.Status == OrderStatus.Completed)
            .GroupBy(o => o.GigId)
            .Select(g => new
            {
                GigId = g.Key,
                Orders = g.Count(),
                Revenue = g.Sum(o => o.SellerAmount ?? 0)
            })
            .OrderByDescending(x => x.Revenue)
            .Take(limit)
            .Join(_context.Gigs,
                stats => stats.GigId,
                gig => gig.Id,
                (stats, gig) => new TopGigDto
                {
                    GigId = gig.Id,
                    GigTitle = gig.Title,
                    Orders = stats.Orders,
                    Revenue = stats.Revenue
                })
            .ToListAsync();

        return topGigs;
    }

    public async Task<CustomerInsightsDto> GetSellerCustomerInsightsAsync(Guid sellerId)
    {
        var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);
        var fifteenDaysAgo = DateTime.UtcNow.AddDays(-15);

        // PERF-06: Use DB aggregation instead of materialising all orders
        var baseQuery = _context.Orders
            .Where(o => o.SellerId == sellerId && o.Status == OrderStatus.Completed && o.CompletedAt >= thirtyDaysAgo);

        var totalCustomers = await baseQuery.Select(o => o.BuyerId).Distinct().CountAsync();

        // Repeat customers via DB grouping
        var repeatCustomers = await baseQuery
            .GroupBy(o => o.BuyerId)
            .CountAsync(g => g.Count() > 1);

        // Average order value via DB
        var averageOrderValue = (double)(await baseQuery.AverageAsync(o => (decimal?)o.Amount) ?? 0m);

        // Customer retention: distinct buyers in last 15 days
        var recentCustomers = await baseQuery
            .Where(o => o.CompletedAt >= fifteenDaysAgo)
            .Select(o => o.BuyerId)
            .Distinct()
            .CountAsync();

        var customerRetentionRate = totalCustomers > 0 ? (double)recentCustomers / totalCustomers * 100 : 0;

        var topCustomerLocations = new List<string> { "Local", "Regional", "International" }; // Placeholder

        return new CustomerInsightsDto
        {
            TotalCustomers = totalCustomers,
            RepeatCustomers = repeatCustomers,
            AverageOrderValue = averageOrderValue,
            CustomerRetentionRate = customerRetentionRate,
            TopCustomerLocations = topCustomerLocations
        };
    }
}