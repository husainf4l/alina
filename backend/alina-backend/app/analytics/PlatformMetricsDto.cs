namespace alina_backend.app.analytics;

public class PlatformMetricsDto
{
    public decimal DailyGMV { get; set; }
    public decimal DailyRevenue { get; set; }
    public int NewUsersToday { get; set; }
    public int ActiveUsers7Days { get; set; }
    public int ActiveUsers30Days { get; set; }
    public int OrdersToday { get; set; }
    public int CompletedToday { get; set; }
    public double CancellationRate { get; set; }
    public double DisputeRate { get; set; }
}