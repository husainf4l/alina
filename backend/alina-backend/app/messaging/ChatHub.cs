using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;
using System.Security.Claims;

namespace alina_backend.app.messaging;

[Authorize]
public class ChatHub : Hub
{
    private readonly AppDbContext _context;
    private static readonly ConcurrentDictionary<string, string> _onlineUsers = new();

    public ChatHub(AppDbContext context)
    {
        _context = context;
    }

    public override async Task OnConnectedAsync()
    {
        var userId = GetCurrentUserId();
        if (userId.HasValue)
        {
            _onlineUsers[Context.ConnectionId] = userId.Value.ToString();
            await Clients.Caller.SendAsync("UserConnected", userId.Value);
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (_onlineUsers.TryRemove(Context.ConnectionId, out _))
        {
            // User disconnected
        }

        await base.OnDisconnectedAsync(exception);
    }

    public async Task SendMessage(Guid receiverId, string content, string? attachmentUrl = null)
    {
        var senderId = GetCurrentUserId();
        if (!senderId.HasValue)
        {
            await Clients.Caller.SendAsync("Error", "Unauthorized");
            return;
        }

        // Validate message content
        if (string.IsNullOrWhiteSpace(content) && string.IsNullOrWhiteSpace(attachmentUrl))
        {
            await Clients.Caller.SendAsync("Error", "Message cannot be empty");
            return;
        }

        // Limit message length
        if (content?.Length > 2000)
        {
            await Clients.Caller.SendAsync("Error", "Message too long (max 2000 characters)");
            return;
        }

        // Get sender profile
        var senderProfile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == senderId.Value);
        if (senderProfile == null)
        {
            await Clients.Caller.SendAsync("Error", "Sender profile not found");
            return;
        }

        // Get receiver profile
        var receiverProfile = await _context.Profiles.FirstOrDefaultAsync(p => p.Id == receiverId);
        if (receiverProfile == null)
        {
            await Clients.Caller.SendAsync("Error", "Receiver not found");
            return;
        }

        // Create and save message
        var message = new Message
        {
            SenderId = senderProfile.Id,
            ReceiverId = receiverId,
            Content = content ?? "",
            AttachmentUrl = attachmentUrl
        };

        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        // Create message DTO
        var messageDto = new MessageDto(
            message.Id,
            message.SenderId,
            senderProfile.DisplayName ?? "User",
            message.ReceiverId,
            receiverProfile.DisplayName ?? "User",
            message.Content,
            message.AttachmentUrl,
            message.IsRead,
            message.ReadAt,
            message.CreatedAt
        );

        // Send to receiver if online
        var receiverConnectionId = _onlineUsers.FirstOrDefault(x => x.Value == receiverProfile.UserId.ToString()).Key;
        if (!string.IsNullOrEmpty(receiverConnectionId))
        {
            await Clients.Client(receiverConnectionId).SendAsync("ReceiveMessage", messageDto);
        }

        // Send confirmation to sender
        await Clients.Caller.SendAsync("MessageSent", messageDto);
    }

    public async Task GetOnlineUsers()
    {
        var currentUserId = GetCurrentUserId();
        if (!currentUserId.HasValue) return;

        var onlineUserIds = _onlineUsers.Values
            .Where(id => id != currentUserId.Value.ToString())
            .Distinct()
            .ToList();

        await Clients.Caller.SendAsync("OnlineUsers", onlineUserIds);
    }

    private Guid? GetCurrentUserId()
    {
        var userIdClaim = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Guid.TryParse(userIdClaim, out var userId) ? userId : null;
    }
}