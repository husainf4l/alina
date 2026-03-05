using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.app.marketing;

namespace alina_backend.app.dashboard;

[ApiController]
[Route("api/seller/[controller]")]
[Authorize]
public class MarketingController : ControllerBase
{
    private readonly AppDbContext _context;

    public MarketingController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("promotions")]
    public async Task<ActionResult<List<PromotionDto>>> GetSellerPromotions()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var promotions = await _context.Promotions
            .Where(p => p.SellerId == userId)
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new PromotionDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Type = p.Type.ToString(),
                Status = p.Status.ToString(),
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                Budget = p.Budget,
                Impressions = p.Impressions,
                Clicks = p.Clicks,
                Conversions = p.Conversions
            })
            .ToListAsync();

        return Ok(promotions);
    }

    [HttpPost("promotions")]
    public async Task<ActionResult<PromotionDto>> CreatePromotion([FromBody] CreatePromotionDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        if (!Enum.TryParse<PromotionType>(dto.Type, out var promotionType))
        {
            return BadRequest("Invalid promotion type");
        }

        var promotion = new Promotion
        {
            SellerId = userId,
            Title = dto.Title,
            Description = dto.Description,
            Type = promotionType,
            Status = PromotionStatus.Draft,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            Budget = dto.Budget
        };

        _context.Promotions.Add(promotion);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSellerPromotions), new { id = promotion.Id }, new PromotionDto
        {
            Id = promotion.Id,
            Title = promotion.Title,
            Description = promotion.Description,
            Type = promotion.Type.ToString(),
            Status = promotion.Status.ToString(),
            StartDate = promotion.StartDate,
            EndDate = promotion.EndDate,
            Budget = promotion.Budget,
            Impressions = 0,
            Clicks = 0,
            Conversions = 0
        });
    }

    [HttpGet("ads")]
    public async Task<ActionResult<List<AdDto>>> GetSellerAds()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var ads = await _context.AdCampaigns
            .Where(a => a.SellerId == userId)
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => new AdDto
            {
                Id = a.Id,
                Title = a.Title,
                Description = a.Description,
                Platform = a.Platform.ToString(),
                Status = a.Status.ToString(),
                Budget = a.Budget,
                Spent = a.Spent,
                Impressions = a.Impressions,
                Clicks = a.Clicks,
                Conversions = a.Conversions,
                StartDate = a.StartDate,
                EndDate = a.EndDate
            })
            .ToListAsync();

        return Ok(ads);
    }

    [HttpPost("ads")]
    public async Task<ActionResult<AdDto>> CreateAd([FromBody] CreateAdDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        if (!Enum.TryParse<AdPlatform>(dto.Platform, out var platform))
        {
            return BadRequest("Invalid platform");
        }

        var ad = new AdCampaign
        {
            SellerId = userId,
            Title = dto.Title,
            Description = dto.Description,
            Platform = platform,
            Status = AdStatus.Draft,
            Budget = dto.Budget,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate
        };

        _context.AdCampaigns.Add(ad);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSellerAds), new { id = ad.Id }, new AdDto
        {
            Id = ad.Id,
            Title = ad.Title,
            Description = ad.Description,
            Platform = ad.Platform.ToString(),
            Status = ad.Status.ToString(),
            Budget = ad.Budget,
            Spent = 0,
            Impressions = 0,
            Clicks = 0,
            Conversions = 0,
            StartDate = ad.StartDate,
            EndDate = ad.EndDate
        });
    }

    [HttpGet("insights")]
    public async Task<ActionResult<MarketingInsightsDto>> GetMarketingInsights()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        // Aggregate real data from promotions and ads
        var promotions = await _context.Promotions
            .Where(p => p.SellerId == userId)
            .ToListAsync();

        var ads = await _context.AdCampaigns
            .Where(a => a.SellerId == userId)
            .ToListAsync();

        var totalImpressions = promotions.Sum(p => p.Impressions) + ads.Sum(a => a.Impressions);
        var totalClicks = promotions.Sum(p => p.Clicks) + ads.Sum(a => a.Clicks);
        var totalConversions = promotions.Sum(p => p.Conversions) + ads.Sum(a => a.Conversions);
        var totalSpent = promotions.Sum(p => p.Spent) + ads.Sum(a => a.Spent);

        var clickThroughRate = totalImpressions > 0 ? (totalClicks / (double)totalImpressions) * 100 : 0;
        var conversionRate = totalClicks > 0 ? (totalConversions / (double)totalClicks) * 100 : 0;
        var costPerClick = totalClicks > 0 ? totalSpent / totalClicks : 0;
        var costPerConversion = totalConversions > 0 ? totalSpent / totalConversions : 0;

        // Calculate ROI (simplified - would need order revenue data)
        var estimatedRevenue = totalConversions * 50; // Assume $50 avg order value
        var returnOnAdSpend = totalSpent > 0 ? (estimatedRevenue / totalSpent) : 0;

        var topPerformingList = promotions
            .OrderByDescending(p => p.Conversions)
            .Take(3)
            .Select(p => p.Title)
            .ToList();

        var insights = new MarketingInsightsDto
        {
            TotalImpressions = totalImpressions,
            TotalClicks = totalClicks,
            TotalConversions = totalConversions,
            ClickThroughRate = Math.Round(clickThroughRate, 2),
            ConversionRate = Math.Round(conversionRate, 2),
            CostPerClick = costPerClick,
            CostPerConversion = costPerConversion,
            ReturnOnAdSpend = Math.Round((double)returnOnAdSpend, 2),
            TopPerformingAds = topPerformingList,
            BestPerformingTimes = new List<string> { "9 AM - 12 PM", "2 PM - 5 PM" } // Would need time-based analytics
        };

        return Ok(insights);
    }
}

public class PromotionDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Type { get; set; }
    public string Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal Budget { get; set; }
    public int Impressions { get; set; }
    public int Clicks { get; set; }
    public int Conversions { get; set; }
}

public class CreatePromotionDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Type { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal Budget { get; set; }
}

public class AdDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Platform { get; set; }
    public string Status { get; set; }
    public decimal Budget { get; set; }
    public decimal Spent { get; set; }
    public int Impressions { get; set; }
    public int Clicks { get; set; }
    public int Conversions { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

public class CreateAdDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Platform { get; set; }
    public decimal Budget { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

public class MarketingInsightsDto
{
    public int TotalImpressions { get; set; }
    public int TotalClicks { get; set; }
    public int TotalConversions { get; set; }
    public double ClickThroughRate { get; set; }
    public double ConversionRate { get; set; }
    public decimal CostPerClick { get; set; }
    public decimal CostPerConversion { get; set; }
    public double ReturnOnAdSpend { get; set; }
    public List<string> TopPerformingAds { get; set; } = new();
    public List<string> BestPerformingTimes { get; set; } = new();
}