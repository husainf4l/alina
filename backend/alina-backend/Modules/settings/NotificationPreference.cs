using System.ComponentModel.DataAnnotations;
using alina_backend.Modules.users;

namespace alina_backend.Modules.settings;

public class UserNotificationPreference
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }
    public User? User { get; set; }

    // Channel preferences
    public bool EmailNotifications { get; set; } = true;
    public bool PushNotifications { get; set; } = true;
    public bool SmsNotifications { get; set; } = false;
    public bool InAppNotifications { get; set; } = true;

    // Event preferences
    public bool NewOrderAlerts { get; set; } = true;
    public bool OrderStatusUpdates { get; set; } = true;
    public bool MessageAlerts { get; set; } = true;
    public bool ReviewAlerts { get; set; } = true;
    public bool PaymentAlerts { get; set; } = true;
    public bool WithdrawalAlerts { get; set; } = true;
    public bool PromotionAlerts { get; set; } = false;
    public bool MarketingEmails { get; set; } = false;
    public bool NewsletterSubscription { get; set; } = false;
    public bool SystemUpdates { get; set; } = true;

    // Seller-specific
    public bool GigPerformanceReports { get; set; } = true;
    public bool DailyEarningsReport { get; set; } = false;
    public bool WeeklyEarningsReport { get; set; } = true;
    public bool MonthlyEarningsReport { get; set; } = true;

    // Buyer-specific
    public bool OrderReminders { get; set; } = true;
    public bool DeliveryNotifications { get; set; } = true;
    public bool RevisionNotifications { get; set; } = true;

    // Quiet hours
    public bool EnableQuietHours { get; set; } = false;
    public TimeSpan? QuietHoursStart { get; set; }
    public TimeSpan? QuietHoursEnd { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
