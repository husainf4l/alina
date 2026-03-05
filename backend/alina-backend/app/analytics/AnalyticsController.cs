using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace alina_backend.app.analytics;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AnalyticsController : ControllerBase
{
    private readonly AnalyticsService _analyticsService;

    public AnalyticsController(AnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }

    [HttpGet("platform")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<PlatformMetricsDto>> GetPlatformMetrics()
    {
        var metrics = await _analyticsService.GetPlatformMetricsAsync();
        return Ok(metrics);
    }

    [HttpGet("seller")]
    public async Task<ActionResult<SellerAnalyticsDto>> GetSellerAnalytics()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var analytics = await _analyticsService.GetSellerAnalyticsAsync(userId);
        return Ok(analytics);
    }

    [HttpGet("seller/revenue-trends")]
    public async Task<ActionResult<List<RevenueTrendDto>>> GetSellerRevenueTrends([FromQuery] int days = 30)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var trends = await _analyticsService.GetSellerRevenueTrendsAsync(userId, days);
        return Ok(trends);
    }

    [HttpGet("seller/order-trends")]
    public async Task<ActionResult<List<OrderTrendDto>>> GetSellerOrderTrends([FromQuery] int days = 30)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var trends = await _analyticsService.GetSellerOrderTrendsAsync(userId, days);
        return Ok(trends);
    }

    [HttpGet("seller/top-gigs")]
    public async Task<ActionResult<List<TopGigDto>>> GetSellerTopGigs([FromQuery] int limit = 10)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var topGigs = await _analyticsService.GetSellerTopGigsAsync(userId, limit);
        return Ok(topGigs);
    }

    [HttpGet("seller/customer-insights")]
    public async Task<ActionResult<CustomerInsightsDto>> GetSellerCustomerInsights()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var insights = await _analyticsService.GetSellerCustomerInsightsAsync(userId);
        return Ok(insights);
    }
}