using System.ComponentModel.DataAnnotations;

namespace alina_backend.Modules.messaging;

public record MessageDto(
    Guid Id,
    Guid SenderId,
    string SenderName,
    Guid ReceiverId,
    string ReceiverName,
    string Content,
    string? AttachmentUrl,
    bool IsRead,
    DateTime? ReadAt,
    DateTime CreatedAt);

public record SendMessageDto(
    [Required] Guid ReceiverId,
    [Required][MaxLength(2000)] string Content,
    string? AttachmentUrl);

public record ChatSummaryDto(
    Guid OtherUserId,
    string OtherUserName,
    string LastMessage,
    DateTime LastMessageTime,
    int UnreadCount);
