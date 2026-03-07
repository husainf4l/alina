using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.Modules.profiles;

namespace alina_backend.Modules.marketplace;

public class SearchAnalytics
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required, StringLength(255)]
    public string SearchTerm { get; set; } = string.Empty;

    public int SearchCount { get; set; } = 1;

    public DateTime FirstSearchedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastSearchedAt { get; set; } = DateTime.UtcNow;

    // Optional: Track user who searched (for personalization)
    public Guid? UserId { get; set; }
    public Profile? User { get; set; }
}