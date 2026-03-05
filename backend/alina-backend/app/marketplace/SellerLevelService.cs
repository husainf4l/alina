using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using alina_backend.app.profiles;

namespace alina_backend.app.marketplace;

public class SellerLevelService
{
    private readonly AppDbContext _context;
    private readonly ILogger<SellerLevelService> _logger;

    public SellerLevelService(AppDbContext context, ILogger<SellerLevelService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task UpdateSellerLevel(Guid profileId)
    {
        var profile = await _context.Profiles
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.Id == profileId);

        if (profile == null || (profile.UserRole != "seller" && profile.UserRole != "tasker"))
        {
            return; // Only update levels for sellers
        }

        var newLevel = await CalculateSellerLevel(profileId);
        if (profile.SellerLevel != newLevel)
        {
            profile.SellerLevel = newLevel;
            await _context.SaveChangesAsync();
            _logger.LogInformation("Updated seller {ProfileId} level to {Level}", profileId, newLevel);
        }
    }

    public async Task<SellerLevel> CalculateSellerLevel(Guid profileId)
    {
        // Get seller's completed orders
        var completedOrders = await _context.Orders
            .Where(o => o.SellerId == profileId && o.Status == OrderStatus.Completed)
            .ToListAsync();

        if (completedOrders.Count == 0)
        {
            return SellerLevel.New;
        }

        // Calculate metrics
        var totalRevenue = completedOrders.Sum(o => o.SellerAmount ?? 0);
        var orderCount = completedOrders.Count;

        // Get average rating
        var reviews = await _context.Reviews
            .Where(r => r.RevieweeId == profileId)
            .ToListAsync();

        var averageRating = reviews.Any() ? reviews.Average(r => r.Rating) : 0.0;

        // Check cancellation rate (orders that were cancelled after being accepted)
        var cancelledOrders = await _context.Orders
            .CountAsync(o => o.SellerId == profileId && o.Status == OrderStatus.Cancelled);

        var totalOrders = await _context.Orders
            .CountAsync(o => o.SellerId == profileId && (o.Status == OrderStatus.Completed || o.Status == OrderStatus.Cancelled));

        var cancellationRate = totalOrders > 0 ? (double)cancelledOrders / totalOrders : 0.0;

        // Check on-time delivery (orders delivered before or on deadline)
        var onTimeDeliveries = completedOrders.Count(o =>
            o.Deadline.HasValue && o.DeliveredAt.HasValue && o.DeliveredAt.Value <= o.Deadline.Value);

        var onTimeDeliveryRate = completedOrders.Count > 0 ? (double)onTimeDeliveries / completedOrders.Count : 0.0;

        // Calculate level based on metrics
        if (totalRevenue >= 10000 && averageRating >= 4.8 && orderCount >= 100 && cancellationRate <= 0.05 && onTimeDeliveryRate >= 0.95)
        {
            return SellerLevel.TopRated;
        }
        else if (totalRevenue >= 1000 && averageRating >= 4.5 && orderCount >= 25 && cancellationRate <= 0.10 && onTimeDeliveryRate >= 0.90)
        {
            return SellerLevel.Level2;
        }
        else if (totalRevenue >= 100 && averageRating >= 4.0 && orderCount >= 5)
        {
            return SellerLevel.Level1;
        }

        return SellerLevel.New;
    }

    public async Task UpdateAllSellerLevels()
    {
        var sellerProfiles = await _context.Profiles
            .Where(p => p.UserRole == "seller" || p.UserRole == "tasker")
            .ToListAsync();

        foreach (var profile in sellerProfiles)
        {
            await UpdateSellerLevel(profile.Id);
        }

        _logger.LogInformation("Updated seller levels for {Count} sellers", sellerProfiles.Count);
    }
}