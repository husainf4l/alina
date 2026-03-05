using System.ComponentModel.DataAnnotations;
using alina_backend.app.users;

namespace alina_backend.app.messaging;

public enum ConversationStatus
{
    Active,
    Archived,
    Blocked
}

public class Conversation
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid User1Id { get; set; }
    public User? User1 { get; set; }

    [Required]
    public Guid User2Id { get; set; }
    public User? User2 { get; set; }

    // Optional: Link to order/gig
    public Guid? OrderId { get; set; }
    public Guid? GigId { get; set; }

    [Required]
    public ConversationStatus Status { get; set; } = ConversationStatus.Active;

    // Last message info for quick display
    public string? LastMessageText { get; set; }
    public DateTime? LastMessageAt { get; set; }
    public Guid? LastMessageSenderId { get; set; }

    // Unread counts
    public int UnreadCountUser1 { get; set; }
    public int UnreadCountUser2 { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Message> Messages { get; set; } = new List<Message>();
}

public enum MessageStatus
{
    Sent,
    Delivered,
    Read
}

public enum MessageType
{
    Text,
    Image,
    File,
    Audio,
    Video,
    OfferRequest,
    OrderUpdate,
    System
}

// Update existing Message model to be richer
public partial class Message
{
    public Guid ConversationId { get; set; }
    public Conversation? Conversation { get; set; }

    public MessageType Type { get; set; } = MessageType.Text;

    public MessageStatus Status { get; set; } = MessageStatus.Sent;

    public DateTime? DeliveredAt { get; set; }

    // Additional attachment metadata (AttachmentUrl already in base)
    public string? AttachmentType { get; set; }
    public long? AttachmentSize { get; set; }

    // Reply/thread support
    public Guid? ReplyToMessageId { get; set; }
    public Message? ReplyToMessage { get; set; }

    // Reactions
    public string? Reactions { get; set; } // JSON: {"👍": ["userId1", "userId2"], "❤️": ["userId3"]}

    public bool IsEdited { get; set; }
    public DateTime? EditedAt { get; set; }

    public bool IsDeleted { get; set; }
}
