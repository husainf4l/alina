using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alina_backend.app.marketplace;

public class Package
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required, StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    public string Currency { get; set; } = "USD";

    public int DeliveryTimeInDays { get; set; }

    // Foreign key to Gig
    public Guid GigId { get; set; }
    public Gig Gig { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}