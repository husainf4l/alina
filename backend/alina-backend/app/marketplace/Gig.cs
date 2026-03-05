using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.app.profiles;
using alina_backend.app.media;

namespace alina_backend.app.marketplace;

public class Gig
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required, StringLength(255)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    public string? MainImage { get; set; }
    
    public ICollection<Media> Gallery { get; set; } = new List<Media>();

    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public Guid SellerId { get; set; }
    public Profile Seller { get; set; } = null!;

    // Basic Pricing integration for now
    [Column(TypeName = "decimal(18,2)")]
    public decimal StartingPrice { get; set; }

    public string Currency { get; set; } = "USD";

    public int DeliveryTimeInDays { get; set; }

    public bool IsActive { get; set; } = true;
    public bool IsDeleted { get; set; } = false;

    public double AverageRating { get; set; } = 0;
    public int ReviewCount { get; set; } = 0;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Review> Reviews { get; set; } = new List<Review>();

    // Packages for this gig
    public ICollection<Package> Packages { get; set; } = new List<Package>();
}
