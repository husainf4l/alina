using System.ComponentModel.DataAnnotations;

namespace alina_backend.app.marketplace;

public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required, StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, StringLength(100)]
    public string NameAr { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    [StringLength(500)]
    public string? DescriptionAr { get; set; }

    public string? Icon { get; set; }

    public Guid? ParentId { get; set; }
    public Category? Parent { get; set; }

    public ICollection<Category> SubCategories { get; set; } = new List<Category>();
    public ICollection<Gig> Gigs { get; set; } = new List<Gig>();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
