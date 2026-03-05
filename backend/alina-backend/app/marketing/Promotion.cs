using System.ComponentModel.DataAnnotations;
using alina_backend.app.users;

namespace alina_backend.app.marketing;

public enum PromotionType
{
    Discount,           // Percentage or fixed discount
    FreeShipping,       // Free delivery
    BuyOneGetOne,       // BOGO offers
    Bundle,             // Package deals
    FlashSale,          // Time-limited
    Seasonal            // Holiday/seasonal offers
}

public enum PromotionStatus
{
    Draft,
    Active,
    Paused,
    Expired,
    Cancelled
}

public class Promotion
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
    public PromotionType Type { get; set; }

    [Required]
    public PromotionStatus Status { get; set; } = PromotionStatus.Draft;

    // Discount details
    public decimal? DiscountPercentage { get; set; }
    public decimal? DiscountAmount { get; set; }
    public decimal? MinimumOrderValue { get; set; }

    // Date range
    [Required]
    public DateTime StartDate { get; set; }
    
    [Required]
    public DateTime EndDate { get; set; }

    // Budget and tracking
    public decimal Budget { get; set; }
    public decimal Spent { get; set; }
    public int MaxRedemptions { get; set; }
    public int TimesRedeemed { get; set; }

    // Performance metrics
    public int Impressions { get; set; }
    public int Clicks { get; set; }
    public int Conversions { get; set; }

    // Target gigs (optional - can apply to all or specific gigs)
    public string? TargetGigIds { get; set; } // JSON array of Guid strings

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
