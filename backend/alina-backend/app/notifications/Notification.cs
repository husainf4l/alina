using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.app.users;

namespace alina_backend.app.notifications;

public class Notification
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(1000)]
    public string Message { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public string Type { get; set; } = string.Empty; // order, message, offer, deposit, etc.

    public bool IsRead { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Guid? RelatedEntityId { get; set; }

    [StringLength(50)]
    public string? RelatedEntityType { get; set; }

    // Navigation property
    [ForeignKey("UserId")]
    public User? User { get; set; }
}