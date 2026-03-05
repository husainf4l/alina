using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.app.profiles;
using alina_backend.app.marketplace;

namespace alina_backend.app.media;

public class Media
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required, StringLength(1000)]
    public string Url { get; set; } = string.Empty;

    [Required, StringLength(100)]
    public string FileName { get; set; } = string.Empty;

    [StringLength(50)]
    public string FileType { get; set; } = string.Empty; // e.g., image/jpeg, video/mp4

    public long FileSize { get; set; }

    public Guid? OwnerId { get; set; }
    public Profile? Owner { get; set; }

    // Relationship to Gigs (optional if using many-to-many or polymorphic)
    public Guid? GigId { get; set; }
    public Gig? Gig { get; set; }
    
    // Relationship to UserTasks (optional)
    public Guid? UserTaskId { get; set; }
    public UserTask? UserTask { get; set; }

    // Relationship to CustomOffers (optional)
    public int? CustomOfferId { get; set; }
    public CustomOffer? CustomOffer { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
