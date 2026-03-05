using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.app.marketplace;

namespace alina_backend.app.disputes;

public enum DisputeStatus
{
    Open,
    UnderReview,
    Resolved
}

public enum DisputeResolution
{
    RefundBuyer,
    ReleaseSeller,
    Partial
}

public class Dispute
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;

    public Guid OpenedByUserId { get; set; }

    [Required]
    [StringLength(1000)]
    public string Reason { get; set; } = string.Empty;

    public DisputeStatus Status { get; set; } = DisputeStatus.Open;

    public DisputeResolution? Resolution { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal? ResolutionAmount { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? ResolvedAt { get; set; }

    [StringLength(2000)]
    public string? AdminNotes { get; set; }
}