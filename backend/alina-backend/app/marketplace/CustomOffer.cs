using System.ComponentModel.DataAnnotations;
using alina_backend.app.users;

namespace alina_backend.app.marketplace;

public enum CustomOfferStatus
{
    Pending,
    Accepted,
    Rejected,
    Expired,
    Withdrawn
}

public class CustomOffer
{
    public int Id { get; set; }

    [Required]
    public Guid SenderId { get; set; }
    public User? Sender { get; set; }

    [Required]
    public Guid RecipientId { get; set; }
    public User? Recipient { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public decimal Price { get; set; }

    [Required]
    [StringLength(3)]
    public string Currency { get; set; } = "USD";

    [Required]
    public int DeliveryTimeInDays { get; set; }

    public string? Features { get; set; } // JSON array of features

    // Navigation property for attachments
    public ICollection<alina_backend.app.media.Media>? Attachments { get; set; }

    public CustomOfferStatus Status { get; set; } = CustomOfferStatus.Pending;

    public string? ResponseMessage { get; set; }

    public DateTime SentAt { get; set; } = DateTime.UtcNow;

    public DateTime ExpiryDate { get; set; }

    public DateTime? RespondedAt { get; set; }
}