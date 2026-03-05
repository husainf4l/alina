using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.app.users;

namespace alina_backend.app.notifications;

public class UserNotificationSettings
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }

    public bool OrderUpdates { get; set; } = true;

    public bool MessageNotifications { get; set; } = true;

    public bool OfferNotifications { get; set; } = true;

    public bool MarketingEmails { get; set; } = false;

    public bool PushEnabled { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    [ForeignKey("UserId")]
    public User? User { get; set; }
}