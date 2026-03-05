using System.ComponentModel.DataAnnotations;
using alina_backend.app.users;

namespace alina_backend.app.settings;

/// <summary>
/// User settings model for storing all user preferences
/// </summary>
public class UserSettings
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }
    public User? User { get; set; }

    // Theme preferences
    public string ThemeMode { get; set; } = "system"; // light, dark, system
    public string PrimaryColor { get; set; } = "#1f2937"; // Gray-900

    // Localization
    public string Language { get; set; } = "en";
    public string Timezone { get; set; } = "UTC";
    public string DateFormat { get; set; } = "MM/DD/YYYY";
    public string TimeFormat { get; set; } = "12h"; // 12h or 24h
    public string Currency { get; set; } = "USD";

    // Privacy preferences
    public string ProfileVisibility { get; set; } = "public"; // public, private, friends
    public bool ShowEmail { get; set; } = false;
    public bool ShowPhone { get; set; } = false;
    public bool ShowLocation { get; set; } = true;
    public bool ActivityStatus { get; set; } = true; // Show online/offline status
    public bool ShowLastSeen { get; set; } = false;

    // Dashboard preferences
    public string DefaultView { get; set; } = "seller"; // seller or buyer
    public bool ShowCompletedOrders { get; set; } = true;
    public int DashboardItemsPerPage { get; set; } = 10;
    public bool AutoRefreshDashboard { get; set; } = false;
    public int AutoRefreshInterval { get; set; } = 30; // seconds

    // Search & browse preferences
    public bool SaveSearchHistory { get; set; } = true;
    public string DefaultSortBy { get; set; } = "relevance";
    public int DefaultItemsPerPage { get; set; } = 12;

    // Accessibility
    public bool ReducedMotion { get; set; } = false;
    public bool HighContrast { get; set; } = false;
    public string FontSize { get; set; } = "medium"; // small, medium, large

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
