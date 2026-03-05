namespace alina_backend.app.settings;

/// <summary>
/// DTOs for user settings
/// </summary>
public class UserSettingsDto
{
    // Theme
    public ThemePreferencesDto Theme { get; set; } = new();
    
    // Localization
    public string Language { get; set; } = "en";
    public string Timezone { get; set; } = "UTC";
    public string DateFormat { get; set; } = "MM/DD/YYYY";
    public string TimeFormat { get; set; } = "12h";
    public string Currency { get; set; } = "USD";

    // Notifications
    public NotificationPreferencesDto Notifications { get; set; } = new();

    // Privacy
    public PrivacyPreferencesDto Privacy { get; set; } = new();

    // Dashboard
    public DashboardPreferencesDto Dashboard { get; set; } = new();

    // Search
    public SearchPreferencesDto Search { get; set; } = new();

    // Accessibility
    public AccessibilityPreferencesDto Accessibility { get; set; } = new();
}

public class ThemePreferencesDto
{
    public string Mode { get; set; } = "system"; // light, dark, system
    public string PrimaryColor { get; set; } = "#1f2937";
}

public class NotificationPreferencesDto
{
    public EmailNotificationsDto Email { get; set; } = new();
    public PushNotificationsDto Push { get; set; } = new();
    public SmsNotificationsDto Sms { get; set; } = new();
}

public class EmailNotificationsDto
{
    public bool OrderUpdates { get; set; } = true;
    public bool Messages { get; set; } = true;
    public bool Promotions { get; set; } = false;
    public bool WeeklyDigest { get; set; } = true;
    public bool NewOffers { get; set; } = true;
    public bool Reviews { get; set; } = true;
}

public class PushNotificationsDto
{
    public bool OrderUpdates { get; set; } = true;
    public bool Messages { get; set; } = true;
    public bool Promotions { get; set; } = false;
    public bool NewOffers { get; set; } = true;
}

public class SmsNotificationsDto
{
    public bool OrderUpdates { get; set; } = false;
    public bool SecurityAlerts { get; set; } = true;
}

public class PrivacyPreferencesDto
{
    public string ProfileVisibility { get; set; } = "public";
    public bool ShowEmail { get; set; } = false;
    public bool ShowPhone { get; set; } = false;
    public bool ActivityStatus { get; set; } = true;
}

public class DashboardPreferencesDto
{
    public string DefaultView { get; set; } = "seller";
    public bool ShowCompletedOrders { get; set; } = true;
    public int ItemsPerPage { get; set; } = 10;
}

public class SearchPreferencesDto
{
    public bool SaveHistory { get; set; } = true;
    public string DefaultSort { get; set; } = "relevance";
    public int ItemsPerPage { get; set; } = 12;
}

public class AccessibilityPreferencesDto
{
    public bool ReducedMotion { get; set; } = false;
    public bool HighContrast { get; set; } = false;
    public string FontSize { get; set; } = "medium";
}

public class UpdateSettingsDto
{
    public ThemePreferencesDto? Theme { get; set; }
    public string? Language { get; set; }
    public string? Timezone { get; set; }
    public NotificationPreferencesDto? Notifications { get; set; }
    public PrivacyPreferencesDto? Privacy { get; set; }
    public DashboardPreferencesDto? Dashboard { get; set; }
    public SearchPreferencesDto? Search { get; set; }
    public AccessibilityPreferencesDto? Accessibility { get; set; }
}
