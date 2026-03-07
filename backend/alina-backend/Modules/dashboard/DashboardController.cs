using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.Modules.orders;
using alina_backend.Modules.messaging;
using alina_backend.Modules.marketplace;
using alina_backend.Modules.finance;
using alina_backend.Modules.analytics;
using alina_backend.Modules.profiles;

namespace alina_backend.Modules.dashboard;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<DashboardController> _logger;
    private readonly AnalyticsService _analyticsService;

    public DashboardController(AppDbContext context, ILogger<DashboardController> logger, AnalyticsService analyticsService)
    {
        _context = context;
        _logger = logger;
        _analyticsService = analyticsService;
    }

    /// <summary>
    /// Get seller performance metrics for the current user
    /// </summary>
    [HttpGet("seller-performance")]
    public async Task<IActionResult> GetSellerPerformance()
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            return BadRequest("Profile not found");
        }

        // Only allow sellers to access their performance
        if (profile.UserRole != "seller" && profile.UserRole != "tasker")
        {
            return Forbid();
        }

        var performance = await CalculateSellerPerformance(profile.Id);
        return Ok(performance);
    }

    private async Task<SellerPerformanceDto> CalculateSellerPerformance(Guid profileId)
    {
        var now = DateTime.UtcNow;
        var thirtyDaysAgo = now.AddDays(-30);

        // Get all orders where user is seller
        var orders = await _context.Orders
            .Where(o => o.SellerId == profileId)
            .Include(o => o.Buyer)
            .ToListAsync();

        var totalOrders = orders.Count;
        var completedOrders = orders.Where(o => o.Status == OrderStatus.Completed).ToList();
        var cancelledOrders = orders.Where(o => o.Status == OrderStatus.Cancelled).ToList();

        // 1. Completion Rate: (Completed / (Completed + Cancelled)) * 100
        var completionRate = totalOrders > 0
            ? (double)(completedOrders.Count) / (completedOrders.Count + cancelledOrders.Count) * 100.0
            : 0.0;

        // 2. On-Time Delivery Rate: Orders delivered before deadline
        var ordersWithDeadline = completedOrders.Where(o => o.Deadline.HasValue).ToList();
        var onTimeDeliveries = ordersWithDeadline.Count(o => o.CompletedAt <= o.Deadline);
        var onTimeDeliveryRate = ordersWithDeadline.Count > 0
            ? (double)onTimeDeliveries / ordersWithDeadline.Count * 100.0
            : 0.0;

        // 3. Average Rating: From reviews
        var averageRating = await _context.Reviews
            .Where(r => r.RevieweeId == profileId)
            .AverageAsync(r => (double?)r.Rating) ?? 0.0;

        // 4. Response Rate: For now, use a simplified calculation based on read messages
        // TODO: Implement proper response time tracking when message threading is available
        var totalMessages = await _context.Messages.CountAsync(m => m.ReceiverId == profileId);
        var readMessages = await _context.Messages.CountAsync(m => m.ReceiverId == profileId && m.IsRead);
        var responseRate = totalMessages > 0
            ? (double)readMessages / totalMessages * 100.0
            : 100.0; // If no messages, consider 100% response rate

        // 5. Earnings Last 30 Days: Sum of releases in last 30 days
        var earningsLast30Days = await _context.Transactions
            .Where(t => t.Wallet.ProfileId == profileId &&
                       t.Type == TransactionType.Release &&
                       t.ProcessedAt >= thirtyDaysAgo)
            .SumAsync(t => t.Amount);

        // 6. Calculate Level
        var level = CalculateSellerLevel(totalOrders, completionRate, averageRating, onTimeDeliveryRate);

        return new SellerPerformanceDto
        {
            ResponseRate = Math.Round(responseRate, 1),
            OnTimeDeliveryRate = Math.Round(onTimeDeliveryRate, 1),
            CompletionRate = Math.Round(completionRate, 1),
            AverageRating = Math.Round(averageRating, 1),
            TotalOrders = totalOrders,
            EarningsLast30Days = earningsLast30Days,
            CurrentLevel = level
        };
    }

    private string CalculateSellerLevel(int totalOrders, double completionRate, double averageRating, double onTimeDeliveryRate)
    {
        if (totalOrders < 5)
            return "New";

        if (totalOrders >= 50 && averageRating >= 4.8 && onTimeDeliveryRate >= 95.0)
            return "Top Rated";

        if (totalOrders >= 20 && completionRate >= 95.0 && averageRating >= 4.5)
            return "Level 2";

        if (totalOrders >= 5 && completionRate >= 90.0)
            return "Level 1";

        return "New";
    }

    /// <summary>
    /// Get dashboard statistics for the current user
    /// </summary>
    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        // Get user's role to determine if they're a buyer or seller
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        var isSeller = profile?.UserRole == "seller" || profile?.UserRole == "tasker";

        // Calculate stats based on user role
        var stats = new
        {
            totalOrders = await GetTotalOrders(userId.Value, isSeller),
            activeOrders = await GetActiveOrders(userId.Value, isSeller),
            completedOrders = await GetCompletedOrders(userId.Value, isSeller),
            totalEarnings = await GetTotalEarnings(userId.Value, isSeller),
            activeGigs = isSeller ? await GetActiveGigs(userId.Value) : 0,
            totalGigs = isSeller ? await GetTotalGigs(userId.Value) : 0,
            unreadMessages = await GetUnreadMessages(userId.Value),
            pendingReviews = await GetPendingReviews(userId.Value, isSeller)
        };

        return Ok(stats);
    }

    /// <summary>
    /// Get quick stats for dashboard cards
    /// </summary>
    [HttpGet("quick-stats")]
    public async Task<IActionResult> GetQuickStats()
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var today = DateTime.UtcNow.Date;
        var weekStart = today.AddDays(-(int)today.DayOfWeek);

        // Get user's role
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        var isSeller = profile?.UserRole == "seller" || profile?.UserRole == "tasker";

        var stats = new
        {
            todayOrders = await GetOrdersInDateRange(userId.Value, today, today.AddDays(1), isSeller),
            todayEarnings = await GetEarningsInDateRange(userId.Value, today, today.AddDays(1), isSeller),
            thisWeekOrders = await GetOrdersInDateRange(userId.Value, weekStart, today.AddDays(1), isSeller),
            thisWeekEarnings = await GetEarningsInDateRange(userId.Value, weekStart, today.AddDays(1), isSeller),
            averageRating = await GetAverageRating(userId.Value, isSeller)
        };

        return Ok(stats);
    }

    [HttpGet("seller-analytics")]
    public async Task<IActionResult> GetSellerAnalytics()
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            return BadRequest("Profile not found");
        }

        // Only allow sellers to access analytics
        if (profile.UserRole != "seller" && profile.UserRole != "tasker")
        {
            return Forbid();
        }

        var analytics = await _analyticsService.GetSellerAnalyticsAsync(profile.Id);
        return Ok(analytics);
    }

    [HttpGet("recent-activity")]
    public async Task<IActionResult> GetRecentActivity([FromQuery] int limit = 10)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var activities = new List<object>();

        // Get recent orders
        var recentOrders = await _context.Orders
            .Where(o => o.BuyerId == userId || o.SellerId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .Take(limit / 2)
            .Select(o => new {
                Id = o.Id.ToString(),
                Type = "order",
                Title = o.GigId.HasValue ? o.Gig.Title : "Custom Order",
                Description = o.BuyerId == userId ? $"You ordered: {o.Gig.Title}" : $"New order: {o.Gig.Title}",
                CreatedAt = o.CreatedAt,
                RelatedId = o.Id.ToString()
            })
            .ToListAsync();

        activities.AddRange(recentOrders);

        // Get recent messages
        var recentMessages = await _context.Messages
            .Where(m => m.ReceiverId == userId)
            .OrderByDescending(m => m.CreatedAt)
            .Take(limit / 2)
            .Select(m => new {
                Id = m.Id.ToString(),
                Type = "message",
                Title = "New Message",
                Description = $"Message from: {m.Sender.DisplayName ?? "User"}",
                CreatedAt = m.CreatedAt,
                RelatedId = m.Id.ToString()
            })
            .ToListAsync();

        activities.AddRange(recentMessages);

        // Sort by created date and take limit
        var sortedActivities = activities
            .OrderByDescending(a => (DateTime)a.GetType().GetProperty("CreatedAt")!.GetValue(a)!)
            .Take(limit)
            .ToList();

        return Ok(sortedActivities);
    }

    /// <summary>
    /// Get revenue trends data for charts (last 30 days)
    /// </summary>
    [HttpGet("revenue-trends")]
    public async Task<IActionResult> GetRevenueTrends([FromQuery] int days = 30)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            return BadRequest("Profile not found");
        }

        // Only allow sellers to access revenue trends
        if (profile.UserRole != "seller" && profile.UserRole != "tasker")
        {
            return Forbid();
        }

        var endDate = DateTime.UtcNow.Date;
        var startDate = endDate.AddDays(-days);

        var revenueData = new List<object>();

        for (var date = startDate; date <= endDate; date = date.AddDays(1))
        {
            var dayStart = date;
            var dayEnd = date.AddDays(1);

            var dailyRevenue = await _context.Orders
                .Where(o => o.SellerId == profile.Id &&
                           o.Status == OrderStatus.Completed &&
                           o.CompletedAt >= dayStart &&
                           o.CompletedAt < dayEnd)
                .SumAsync(o => o.Amount);

            revenueData.Add(new
            {
                date = date.ToString("yyyy-MM-dd"),
                revenue = dailyRevenue
            });
        }

        return Ok(new
        {
            period = $"{days} days",
            data = revenueData
        });
    }

    /// <summary>
    /// Get order volume trends data for charts (last 30 days)
    /// </summary>
    [HttpGet("order-volume-trends")]
    public async Task<IActionResult> GetOrderVolumeTrends([FromQuery] int days = 30)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            return BadRequest("Profile not found");
        }

        var endDate = DateTime.UtcNow.Date;
        var startDate = endDate.AddDays(-days);

        var orderData = new List<object>();

        for (var date = startDate; date <= endDate; date = date.AddDays(1))
        {
            var dayStart = date;
            var dayEnd = date.AddDays(1);

            var dailyOrders = await _context.Orders
                .CountAsync(o => o.SellerId == profile.Id &&
                               o.CreatedAt >= dayStart &&
                               o.CreatedAt < dayEnd);

            orderData.Add(new
            {
                date = date.ToString("yyyy-MM-dd"),
                orders = dailyOrders
            });
        }

        return Ok(new
        {
            period = $"{days} days",
            data = orderData
        });
    }

    /// <summary>
    /// Get performance metrics trends for radar chart
    /// </summary>
    [HttpGet("performance-metrics")]
    public async Task<IActionResult> GetPerformanceMetrics()
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            return BadRequest("Profile not found");
        }

        // Only allow sellers to access performance metrics
        if (profile.UserRole != "seller" && profile.UserRole != "tasker")
        {
            return Forbid();
        }

        var performance = await CalculateSellerPerformance(profile.Id);

        // Return current performance metrics for radar chart
        return Ok(new
        {
            responseRate = performance.ResponseRate,
            onTimeDeliveryRate = performance.OnTimeDeliveryRate,
            completionRate = performance.CompletionRate,
            averageRating = performance.AverageRating,
            level = performance.CurrentLevel
        });
    }

    /// <summary>
    /// Get all goals for the current user
    /// </summary>
    [HttpGet("goals")]
    public async Task<IActionResult> GetGoals()
    {
        try
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
            if (profile == null)
            {
                // Auto-create profile if doesn't exist
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    _logger.LogError("User not found in database for userId: {UserId}", userId);
                    return Unauthorized();
                }

                _logger.LogInformation("Auto-creating profile for user: {UserId}", userId);
                profile = new Profile
                {
                    UserId = user.Id,
                    DisplayName = user.FullName,
                    UserRole = "buyer", // Explicitly set default role
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Profiles.Add(profile);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Profile created successfully for user: {UserId}", userId);
            }

            var goals = await _context.Goals
                .Where(g => g.ProfileId == profile.Id)
                .Include(g => g.ProgressEntries.OrderByDescending(p => p.RecordedAt).Take(5))
                .ToListAsync();

            var goalDtos = goals.Select(g => new GoalDto(
                g.Id,
                g.Title,
                g.Description,
                g.Type,
                g.Period,
                g.TargetValue,
                g.CurrentValue,
                g.ProgressPercentage,
                g.StartDate,
                g.EndDate,
                g.Status,
                g.IsAchieved,
                g.AchievedAt,
                g.AchievementBadge
            )).ToList();

            return Ok(goalDtos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new {
                error = ex.Message,
                stack = ex.StackTrace
            });
        }
    }

    /// <summary>
    /// Create a new goal
    /// </summary>
    [HttpPost("goals")]
    public async Task<IActionResult> CreateGoal([FromBody] CreateGoalRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            return BadRequest("Profile not found");
        }

        // Only allow sellers and taskers to create goals
        if (profile.UserRole != "seller" && profile.UserRole != "tasker")
        {
            return Forbid();
        }

        var goal = new Goal
        {
            ProfileId = profile.Id,
            Title = request.Title,
            Description = request.Description,
            Type = request.Type,
            Period = request.Period,
            TargetValue = request.TargetValue,
            EndDate = request.EndDate,
            StartDate = DateTime.UtcNow,
            Status = GoalStatus.Active
        };

        // Calculate initial progress
        await UpdateGoalProgress(goal);

        _context.Goals.Add(goal);
        await _context.SaveChangesAsync();

        var goalDto = new GoalDto(
            goal.Id,
            goal.Title,
            goal.Description,
            goal.Type,
            goal.Period,
            goal.TargetValue,
            goal.CurrentValue,
            goal.ProgressPercentage,
            goal.StartDate,
            goal.EndDate,
            goal.Status,
            goal.IsAchieved,
            goal.AchievedAt,
            goal.AchievementBadge
        );

        return CreatedAtAction(nameof(GetGoals), goalDto);
    }

    /// <summary>
    /// Update an existing goal
    /// </summary>
    [HttpPut("goals/{goalId}")]
    public async Task<IActionResult> UpdateGoal(Guid goalId, [FromBody] UpdateGoalRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            return BadRequest("Profile not found");
        }

        var goal = await _context.Goals.FirstOrDefaultAsync(g => g.Id == goalId && g.ProfileId == profile.Id);
        if (goal == null)
        {
            return NotFound();
        }

        goal.Title = request.Title;
        goal.Description = request.Description;
        goal.TargetValue = request.TargetValue;
        goal.EndDate = request.EndDate;
        goal.Status = request.Status;
        goal.UpdatedAt = DateTime.UtcNow;

        // Recalculate progress
        await UpdateGoalProgress(goal);

        await _context.SaveChangesAsync();

        var goalDto = new GoalDto(
            goal.Id,
            goal.Title,
            goal.Description,
            goal.Type,
            goal.Period,
            goal.TargetValue,
            goal.CurrentValue,
            goal.ProgressPercentage,
            goal.StartDate,
            goal.EndDate,
            goal.Status,
            goal.IsAchieved,
            goal.AchievedAt,
            goal.AchievementBadge
        );

        return Ok(goalDto);
    }

    /// <summary>
    /// Delete a goal
    /// </summary>
    [HttpDelete("goals/{goalId}")]
    public async Task<IActionResult> DeleteGoal(Guid goalId)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            return BadRequest("Profile not found");
        }

        var goal = await _context.Goals.FirstOrDefaultAsync(g => g.Id == goalId && g.ProfileId == profile.Id);
        if (goal == null)
        {
            return NotFound();
        }

        _context.Goals.Remove(goal);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Get goal progress details
    /// </summary>
    [HttpGet("goals/{goalId}/progress")]
    public async Task<IActionResult> GetGoalProgress(Guid goalId)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            return BadRequest("Profile not found");
        }

        var goal = await _context.Goals
            .Include(g => g.ProgressEntries.OrderByDescending(p => p.RecordedAt))
            .FirstOrDefaultAsync(g => g.Id == goalId && g.ProfileId == profile.Id);

        if (goal == null)
        {
            return NotFound();
        }

        var progressEntries = goal.ProgressEntries
            .Take(10)
            .Select(p => new ProgressEntryDto(p.RecordedAt, p.Value, p.Description))
            .ToList();

        var progressDto = new GoalProgressDto(
            goal.Id,
            goal.CurrentValue,
            goal.ProgressPercentage,
            goal.IsAchieved,
            goal.AchievedAt,
            goal.AchievementBadge,
            progressEntries
        );

        return Ok(progressDto);
    }

    private async Task UpdateGoalProgress(Goal goal)
    {
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.Id == goal.ProfileId);
        if (profile == null) return;

        decimal currentValue = 0;
        var now = DateTime.UtcNow;

        switch (goal.Type)
        {
            case GoalType.Revenue:
                // Calculate earnings based on goal period
                var earningsQuery = _context.Orders
                    .Where(o => o.SellerId == profile.Id &&
                               o.Status == OrderStatus.Completed &&
                               o.CompletedAt >= goal.StartDate &&
                               o.CompletedAt <= goal.EndDate);

                if (goal.Period == GoalPeriod.Weekly)
                {
                    earningsQuery = earningsQuery.Where(o => o.CompletedAt >= now.AddDays(-7));
                }
                else if (goal.Period == GoalPeriod.Monthly)
                {
                    earningsQuery = earningsQuery.Where(o => o.CompletedAt >= now.AddDays(-30));
                }

                currentValue = await earningsQuery.SumAsync(o => o.Amount);
                break;

            case GoalType.Orders:
                var ordersQuery = _context.Orders
                    .Where(o => o.SellerId == profile.Id &&
                               o.CreatedAt >= goal.StartDate &&
                               o.CreatedAt <= goal.EndDate);

                if (goal.Period == GoalPeriod.Weekly)
                {
                    ordersQuery = ordersQuery.Where(o => o.CreatedAt >= now.AddDays(-7));
                }
                else if (goal.Period == GoalPeriod.Monthly)
                {
                    ordersQuery = ordersQuery.Where(o => o.CreatedAt >= now.AddDays(-30));
                }

                currentValue = await ordersQuery.CountAsync();
                break;

            case GoalType.Rating:
                var reviews = await _context.Reviews
                    .Where(r => _context.Orders.Any(o => o.Id == r.OrderId && o.SellerId == profile.Id))
                    .ToListAsync();
                currentValue = reviews.Any() ? (decimal)reviews.Average(r => r.Rating) : 0;
                break;

            case GoalType.ResponseTime:
                // Simplified: calculate based on message response rate
                var totalMessages = await _context.Messages.CountAsync(m => m.ReceiverId == profile.Id);
                var readMessages = await _context.Messages.CountAsync(m => m.ReceiverId == profile.Id && m.IsRead);
                currentValue = totalMessages > 0 ? (decimal)readMessages / totalMessages * 100 : 100;
                break;

            case GoalType.CompletionRate:
                var totalOrders = await _context.Orders.CountAsync(o => o.SellerId == profile.Id);
                var completedOrders = await _context.Orders.CountAsync(o => o.SellerId == profile.Id && o.Status == OrderStatus.Completed);
                currentValue = totalOrders > 0 ? (decimal)completedOrders / totalOrders * 100 : 0;
                break;
        }

        goal.CurrentValue = currentValue;
        goal.ProgressPercentage = goal.TargetValue > 0 ? (currentValue / goal.TargetValue) * 100 : 0;

        // Check if goal is achieved
        if (goal.ProgressPercentage >= 100 && !goal.IsAchieved)
        {
            goal.IsAchieved = true;
            goal.AchievedAt = now;
            goal.Status = GoalStatus.Completed;

            // Assign achievement badge based on goal type and level
            goal.AchievementBadge = GetAchievementBadge(goal.Type, goal.TargetValue);
        }

        // Check if goal is expired
        if (now > goal.EndDate && goal.Status == GoalStatus.Active)
        {
            goal.Status = GoalStatus.Expired;
        }

        // Record progress entry
        var progressEntry = new GoalProgress
        {
            GoalId = goal.Id,
            Value = currentValue,
            Description = $"Progress update: {currentValue:F2} / {goal.TargetValue:F2}",
            RecordedAt = now
        };

        _context.GoalProgress.Add(progressEntry);
    }

    private string? GetAchievementBadge(GoalType type, decimal targetValue)
    {
        return type switch
        {
            GoalType.Revenue => targetValue switch
            {
                >= 10000 => "Revenue Master",
                >= 5000 => "Revenue Expert",
                >= 1000 => "Revenue Achiever",
                _ => "Revenue Starter"
            },
            GoalType.Orders => targetValue switch
            {
                >= 100 => "Order Champion",
                >= 50 => "Order Expert",
                >= 10 => "Order Achiever",
                _ => "Order Starter"
            },
            GoalType.Rating => targetValue switch
            {
                >= 4.8m => "Rating Legend",
                >= 4.5m => "Rating Star",
                >= 4.0m => "Rating Achiever",
                _ => "Rating Improver"
            },
            GoalType.CompletionRate => targetValue switch
            {
                >= 95 => "Completion Legend",
                >= 90 => "Completion Expert",
                >= 80 => "Completion Achiever",
                _ => "Completion Starter"
            },
            _ => "Goal Achiever"
        };
    }

    private Guid? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return userIdClaim != null ? Guid.Parse(userIdClaim) : null;
    }

    private async Task<int> GetTotalOrders(Guid userId, bool isSeller)
    {
        if (isSeller)
        {
            return await _context.Orders.CountAsync(o => o.SellerId == userId);
        }
        else
        {
            return await _context.Orders.CountAsync(o => o.BuyerId == userId);
        }
    }

    private async Task<int> GetActiveOrders(Guid userId, bool isSeller)
    {
        if (isSeller)
        {
            return await _context.Orders.CountAsync(o => o.SellerId == userId && (o.Status == OrderStatus.InProgress || o.Status == OrderStatus.Completed));
        }
        else
        {
            return await _context.Orders.CountAsync(o => o.BuyerId == userId && (o.Status == OrderStatus.InProgress || o.Status == OrderStatus.Completed));
        }
    }

    private async Task<int> GetCompletedOrders(Guid userId, bool isSeller)
    {
        if (isSeller)
        {
            return await _context.Orders.CountAsync(o => o.SellerId == userId && o.Status == OrderStatus.Completed);
        }
        else
        {
            return await _context.Orders.CountAsync(o => o.BuyerId == userId && o.Status == OrderStatus.Completed);
        }
    }

    private async Task<object> GetTotalEarnings(Guid userId, bool isSeller)
    {
        decimal total = 0;
        if (isSeller)
        {
            total = await _context.Orders
                .Where(o => o.SellerId == userId && o.Status == OrderStatus.Completed)
                .SumAsync(o => o.Amount);
        }

        return new
        {
            amount = total,
            currency = "USD"
        };
    }

    private async Task<int> GetActiveGigs(Guid userId)
    {
        return await _context.Gigs.CountAsync(g => g.SellerId == userId && g.IsActive);
    }

    private async Task<int> GetTotalGigs(Guid userId)
    {
        return await _context.Gigs.CountAsync(g => g.SellerId == userId);
    }

    private async Task<int> GetUnreadMessages(Guid userId)
    {
        return await _context.Messages.CountAsync(m => m.ReceiverId == userId && !m.IsRead);
    }

    private async Task<int> GetPendingReviews(Guid userId, bool isSeller)
    {
        if (isSeller)
        {
            return await _context.Orders.CountAsync(o =>
                o.SellerId == userId &&
                o.Status == OrderStatus.Completed &&
                !_context.Reviews.Any(r => r.OrderId == o.Id));
        }
        else
        {
            return await _context.Orders.CountAsync(o =>
                o.BuyerId == userId &&
                o.Status == OrderStatus.Completed &&
                !_context.Reviews.Any(r => r.OrderId == o.Id));
        }
    }

    private async Task<int> GetOrdersInDateRange(Guid userId, DateTime start, DateTime end, bool isSeller)
    {
        if (isSeller)
        {
            return await _context.Orders.CountAsync(o =>
                o.SellerId == userId &&
                o.CreatedAt >= start &&
                o.CreatedAt < end);
        }
        else
        {
            return await _context.Orders.CountAsync(o =>
                o.BuyerId == userId &&
                o.CreatedAt >= start &&
                o.CreatedAt < end);
        }
    }

    private async Task<object> GetEarningsInDateRange(Guid userId, DateTime start, DateTime end, bool isSeller)
    {
        decimal total = 0;
        if (isSeller)
        {
            total = await _context.Orders
                .Where(o => o.SellerId == userId &&
                           o.Status == OrderStatus.Completed &&
                           o.CreatedAt >= start &&
                           o.CreatedAt < end)
                .SumAsync(o => o.Amount);
        }

        return new
        {
            amount = total,
            currency = "USD"
        };
    }

    private async Task<double> GetAverageRating(Guid userId, bool isSeller)
    {
        if (isSeller)
        {
            var ratings = await _context.Reviews
                .Where(r => _context.Orders.Any(o => o.Id == r.OrderId && o.SellerId == userId))
                .Select(r => r.Rating)
                .ToListAsync();

            return ratings.Any() ? ratings.Average() : 0.0;
        }
        else
        {
            var ratings = await _context.Reviews
                .Where(r => _context.Orders.Any(o => o.Id == r.OrderId && o.BuyerId == userId))
                .Select(r => r.Rating)
                .ToListAsync();

            return ratings.Any() ? ratings.Average() : 0.0;
        }
    }

    // Platform Analytics Endpoints
    [HttpGet("platform-analytics")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetPlatformAnalytics()
    {
        // GMV (Gross Marketplace Volume) - Total order value for completed orders
        var gmv = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed)
            .SumAsync(o => o.Amount);

        // Net Revenue (Platform Earnings) - Sum of platform fees
        var netRevenue = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed)
            .SumAsync(o => o.PlatformFee ?? 0);

        // Escrow Under Dispute - Orders currently in dispute
        var escrowUnderDispute = await _context.Orders
            .Where(o => o.Status == OrderStatus.Disputed)
            .SumAsync(o => o.Amount);

        // Pending Withdrawals - Total amount in pending withdrawal requests
        var pendingWithdrawals = await _context.WithdrawalRequests
            .Where(w => w.Status == WithdrawalStatus.Pending)
            .SumAsync(w => w.Amount);

        // Total Escrow Balance - All funds currently held in escrow
        var totalEscrowBalance = await _context.Wallets
            .SumAsync(w => w.EscrowBalance);

        return Ok(new
        {
            gmv,
            netRevenue,
            escrowUnderDispute,
            pendingWithdrawals,
            totalEscrowBalance,
            activeUsers = await _context.Users.CountAsync(),
            totalOrders = await _context.Orders.CountAsync(),
            completedOrders = await _context.Orders.CountAsync(o => o.Status == OrderStatus.Completed)
        });
    }

    [HttpGet("admin/revenue-trends")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAdminRevenueTrends([FromQuery] int days = 30)
    {
        var startDate = DateTime.UtcNow.AddDays(-days);

        var revenueData = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed && o.CreatedAt >= startDate)
            .GroupBy(o => o.CreatedAt.Date)
            .Select(g => new
            {
                Date = g.Key,
                Revenue = g.Sum(o => o.PlatformFee ?? 0),
                GMV = g.Sum(o => o.Amount),
                OrderCount = g.Count()
            })
            .OrderBy(x => x.Date)
            .ToListAsync();

        return Ok(revenueData);
    }

    [HttpGet("withdrawal-requests")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetWithdrawalRequests([FromQuery] WithdrawalStatus? status = null)
    {
        var query = _context.WithdrawalRequests
            .Include(w => w.User)
            .AsQueryable();

        if (status.HasValue)
        {
            query = query.Where(w => w.Status == status.Value);
        }

        var requests = await query
            .OrderByDescending(w => w.RequestedAt)
            .Select(w => new
            {
                w.Id,
                w.UserId,
                UserName = w.User.DisplayName ?? "Unknown",
                w.Amount,
                w.Currency,
                Status = w.Status.ToString(),
                w.RejectionReason,
                w.AdminNotes,
                w.RequestedAt,
                w.ProcessedAt
            })
            .ToListAsync();

        return Ok(requests);
    }
}

// DTOs
public record SellerPerformanceDto
{
    public double ResponseRate { get; init; }
    public double OnTimeDeliveryRate { get; init; }
    public double CompletionRate { get; init; }
    public double AverageRating { get; init; }
    public int TotalOrders { get; init; }
    public decimal EarningsLast30Days { get; init; }
    public string CurrentLevel { get; init; }
}