using System.ComponentModel.DataAnnotations;
using alina_backend.Modules.users;

namespace alina_backend.Modules.marketplace;

public class Favorite
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }
    public User? User { get; set; }

    [Required]
    public Guid GigId { get; set; }
    public Gig? Gig { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}