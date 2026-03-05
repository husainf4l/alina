using System.ComponentModel.DataAnnotations;
using alina_backend.app.profiles;

namespace alina_backend.app.marketplace;

public class Review
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid? GigId { get; set; }
    public Gig? Gig { get; set; }

    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;

    public Guid ReviewerId { get; set; }
    public Profile Reviewer { get; set; } = null!;

    public Guid RevieweeId { get; set; }
    public Profile Reviewee { get; set; } = null!;

    [Range(1, 5)]
    public int Rating { get; set; }

    [StringLength(1000)]
    public string? Comment { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
