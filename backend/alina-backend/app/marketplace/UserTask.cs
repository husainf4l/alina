using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.app.profiles;
using alina_backend.app.media;

namespace alina_backend.app.marketplace;

public enum TaskStatus
{
    Open,
    Assigned,
    Completed,
    Cancelled,
    Expired
}

public enum TaskType
{
    Remote,
    InPerson
}

public class UserTask // Renamed to UserTask to avoid conflict with System.Threading.Tasks.Task
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required, StringLength(255)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    public TaskType Type { get; set; } = TaskType.Remote;
    
    public string? Location { get; set; } // Physical address or description

    [Column(TypeName = "decimal(18,2)")]
    public decimal Budget { get; set; }

    public string Currency { get; set; } = "USD";

    public DateTime Deadline { get; set; }

    public TaskStatus Status { get; set; } = TaskStatus.Open;

    public bool IsDeleted { get; set; } = false;

    public Guid PosterId { get; set; }
    public Profile Poster { get; set; } = null!;

    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public Guid? AssignedTaskerId { get; set; }
    public Profile? AssignedTasker { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Offer> Offers { get; set; } = new List<Offer>();

    public ICollection<Media> Attachments { get; set; } = new List<Media>();
}
