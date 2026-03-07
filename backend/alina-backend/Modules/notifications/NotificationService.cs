using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace alina_backend.Modules.notifications;

public class NotificationService
{
    private readonly AppDbContext _context;
    private readonly ILogger<NotificationService> _logger;
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationService(
        AppDbContext context,
        ILogger<NotificationService> logger,
        IHubContext<NotificationHub> hubContext)
    {
        _context = context;
        _logger = logger;
        _hubContext = hubContext;
    }

    public async Task CreateNotification(
        Guid userId,
        string title,
        string message,
        string type,
        Guid? relatedEntityId = null,
        string? relatedEntityType = null)
    {
        try
        {
            var notification = new Notification
            {
                UserId = userId,
                Title = title,
                Message = message,
                Type = type,
                RelatedEntityId = relatedEntityId,
                RelatedEntityType = relatedEntityType,
                CreatedAt = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            // Push real-time notification via SignalR to the user's group
            await _hubContext.Clients.Group($"user_{userId}").SendAsync("ReceiveNotification", new
            {
                id = notification.Id,
                title = notification.Title,
                message = notification.Message,
                type = notification.Type,
                relatedEntityId = notification.RelatedEntityId,
                relatedEntityType = notification.RelatedEntityType,
                isRead = false,
                createdAt = notification.CreatedAt
            });

            _logger.LogInformation("Created notification for user {UserId}: {Title}", userId, title);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create notification for user {UserId}", userId);
            // Don't throw - notifications shouldn't break main flows
        }
    }
}