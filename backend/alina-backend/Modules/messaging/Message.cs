using System.ComponentModel.DataAnnotations;
using alina_backend.Modules.profiles;

namespace alina_backend.Modules.messaging;

public partial class Message
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid SenderId { get; set; }
    public Profile Sender { get; set; } = null!;

    public Guid ReceiverId { get; set; }
    public Profile Receiver { get; set; } = null!;

    [Required]
    public string Content { get; set; } = string.Empty;

    public string? AttachmentUrl { get; set; }

    public bool IsRead { get; set; } = false;
    public DateTime? ReadAt { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
