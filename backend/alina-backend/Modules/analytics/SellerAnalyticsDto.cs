namespace alina_backend.Modules.analytics;

public class SellerAnalyticsDto
{
    public int ProfileViews { get; set; }
    public int GigClicks { get; set; }
    public double ConversionRate { get; set; } // Orders per profile view
    public decimal Earnings7Days { get; set; }
    public decimal Earnings30Days { get; set; }
    public int Orders7Days { get; set; }
    public int Orders30Days { get; set; }
    public double OrderGrowthRate { get; set; } // Growth in orders over last 7 days vs previous 7 days
}