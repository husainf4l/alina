namespace alina_backend.app.analytics;

public class RevenueTrendDto
{
    public DateTime Date { get; set; }
    public decimal Revenue { get; set; }
}

public class OrderTrendDto
{
    public DateTime Date { get; set; }
    public int Orders { get; set; }
}

public class TopGigDto
{
    public Guid GigId { get; set; }
    public string GigTitle { get; set; }
    public int Orders { get; set; }
    public decimal Revenue { get; set; }
}

public class CustomerInsightsDto
{
    public int TotalCustomers { get; set; }
    public int RepeatCustomers { get; set; }
    public double AverageOrderValue { get; set; }
    public double CustomerRetentionRate { get; set; }
    public List<string> TopCustomerLocations { get; set; } = new();
}