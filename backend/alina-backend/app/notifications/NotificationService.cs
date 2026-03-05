using Microsoft.EntityFrameworkCore;

namespace alina_backend.app.notifications;

public class NotificationService
{
    private readonly AppDbContext _context;
    private readonly ILogger<NotificationService> _logger;

    public NotificationService(AppDbContext context, ILogger<NotificationService> logger)
    {
        _context = context;
        _logger = logger;
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

            _logger.LogInformation("Created notification for user {UserId}: {Title}", userId, title);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create notification for user {UserId}", userId);
            // Don't throw - notifications shouldn't break main flows
        }
    }
}