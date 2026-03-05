using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.app.profiles;

namespace alina_backend.app.marketplace;

public enum OfferStatus
{
    Pending,
    Accepted,
    Rejected,
    Withdrawn
}

public class Offer
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid TaskId { get; set; }
    public UserTask Task { get; set; } = null!;

    public Guid TaskerId { get; set; }
    public Profile Tasker { get; set; } = null!;

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    public string Currency { get; set; } = "USD";

    [Required, StringLength(1000)]
    public string Message { get; set; } = string.Empty;

    public OfferStatus Status { get; set; } = OfferStatus.Pending;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
