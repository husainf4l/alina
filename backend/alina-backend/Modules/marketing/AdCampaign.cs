using System.ComponentModel.DataAnnotations;
using alina_backend.Modules.users;

namespace alina_backend.Modules.marketing;

public enum AdPlatform
{
    Internal,           // Within platform
    Google,             // Google Ads
    Facebook,           // Facebook/Instagram
    TikTok,             // TikTok Ads
    Twitter,            // Twitter/X Ads
    LinkedIn            // LinkedIn Ads
}

public enum AdStatus
{
    Draft,
    PendingApproval,
    Running,
    Paused,
    Completed,
    Rejected
}

public class AdCampaign
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid SellerId { get; set; }
    public User? Seller { get; set; }

    [Required, StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public AdPlatform Platform { get; set; }

    [Required]
    public AdStatus Status { get; set; } = AdStatus.Draft;

    // Budget
    public decimal Budget { get; set; }
    public decimal Spent { get; set; }
    public decimal DailyBudget { get; set; }

    // Targeting
    [StringLength(500)]
    public string? TargetKeywords { get; set; }
    
    [StringLength(500)]
    public string? TargetLocations { get; set; }
    
    [StringLength(500)]
    public string? TargetDemographics { get; set; }

    // Performance metrics
    public int Impressions { get; set; }
    public int Clicks { get; set; }
    public int Conversions { get; set; }
    public decimal CostPerClick { get; set; }
    public decimal ConversionRate { get; set; }

    // Schedule
    [Required]
    public DateTime StartDate { get; set; }
    
    [Required]
    public DateTime EndDate { get; set; }

    // Creative assets
    public string? ImageUrl { get; set; }
    public string? VideoUrl { get; set; }
    
    [StringLength(200)]
    public string? CallToAction { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
