using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace alina_backend.Modules.messaging;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MessagingController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IHubContext<ChatHub> _hubContext;

    public MessagingController(AppDbContext context, IHubContext<ChatHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    [HttpGet("chats")]
    public async Task<ActionResult<IEnumerable<ChatSummaryDto>>> GetChats()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        // Simplified chat summary logic
        var messages = await _context.Messages
            .Include(m => m.Sender)
            .Include(m => m.Receiver)
            .Where(m => m.SenderId == profile.Id || m.ReceiverId == profile.Id)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();

        var summaries = messages
            .GroupBy(m => m.SenderId == profile.Id ? m.ReceiverId : m.SenderId)
            .Select(g => {
                var lastMsg = g.First();
                var otherUser = lastMsg.SenderId == profile.Id ? lastMsg.Receiver : lastMsg.Sender;
                return new ChatSummaryDto(
                    otherUser.Id,
                    otherUser.DisplayName ?? "User",
                    lastMsg.Content,
                    lastMsg.CreatedAt,
                    g.Count(m => m.ReceiverId == profile.Id && !m.IsRead)
                );
            });

        return Ok(summaries);
    }

    /// <summary>Get paginated chat history. Use beforeId for cursor pagination (pass last message ID to load older messages).</summary>
    [HttpGet("messages/{otherUserId}")]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetChatHistory(
        Guid otherUserId,
        [Microsoft.AspNetCore.Mvc.FromQuery] Guid? beforeId = null,
        [Microsoft.AspNetCore.Mvc.FromQuery] int pageSize = 50)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        // PERF-03/BUG-12: Never load all messages. Default 50, hard cap 100.
        pageSize = Math.Clamp(pageSize, 1, 100);

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        // Resolve the cursor (beforeId) to a CreatedAt timestamp for efficient keyset pagination
        DateTime? beforeDate = null;
        if (beforeId.HasValue)
        {
            var cursor = await _context.Messages.Where(m => m.Id == beforeId.Value).Select(m => (DateTime?)m.CreatedAt).FirstOrDefaultAsync();
            beforeDate = cursor;
        }

        var query = _context.Messages
            .Where(m => (m.SenderId == profile.Id && m.ReceiverId == otherUserId) ||
                        (m.SenderId == otherUserId && m.ReceiverId == profile.Id));

        if (beforeDate.HasValue)
            query = query.Where(m => m.CreatedAt < beforeDate.Value);

        var messages = await query
            .OrderByDescending(m => m.CreatedAt)
            .Take(pageSize)
            .Select(m => new MessageDto(
                m.Id, m.SenderId, m.Sender!.DisplayName ?? "",
                m.ReceiverId, m.Receiver!.DisplayName ?? "",
                m.Content, m.AttachmentUrl, m.IsRead, m.ReadAt, m.CreatedAt
            ))
            .ToListAsync();

        // Return in chronological order (oldest first)
        messages.Reverse();

        // Mark as read
        var unread = await _context.Messages
            .Where(m => m.ReceiverId == profile.Id && m.SenderId == otherUserId && !m.IsRead)
            .ToListAsync();
        
        if (unread.Any())
        {
            unread.ForEach(m => { m.IsRead = true; m.ReadAt = DateTime.UtcNow; });
            await _context.SaveChangesAsync();
        }

        return Ok(messages);
    }

    [HttpPost("messages")]
    public async Task<ActionResult<MessageDto>> SendMessage(SendMessageDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var message = new Message
        {
            SenderId = profile.Id,
            ReceiverId = dto.ReceiverId,
            Content = dto.Content,
            AttachmentUrl = dto.AttachmentUrl
        };

        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        var messageDto = new MessageDto(message.Id, message.SenderId, profile.DisplayName ?? "", 
            message.ReceiverId, "", message.Content, message.AttachmentUrl, 
            message.IsRead, message.ReadAt, message.CreatedAt);

        // Broadcast message via SignalR
        var receiverProfile = await _context.Profiles.FirstOrDefaultAsync(p => p.Id == dto.ReceiverId);
        if (receiverProfile != null)
        {
            await _hubContext.Clients.User(receiverProfile.UserId.ToString()).SendAsync("ReceiveMessage", messageDto);
        }

        return Ok(messageDto);
    }
}
