using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace alina_backend.Modules.notifications;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotificationController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<NotificationController> _logger;

    public NotificationController(AppDbContext context, ILogger<NotificationController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetNotifications()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var notifications = await _context.Notifications
            .Where(n => n.UserId == userId)
            .OrderByDescending(n => n.CreatedAt)
            .Take(50)
            .Select(n => new
            {
                n.Id,
                n.Title,
                n.Message,
                n.Type,
                n.IsRead,
                n.CreatedAt,
                n.RelatedEntityId,
                n.RelatedEntityType
            })
            .ToListAsync();

        return Ok(notifications);
    }

    [HttpPut("{id}/read")]
    public async Task<IActionResult> MarkAsRead(Guid id)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var notification = await _context.Notifications
            .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

        if (notification == null)
        {
            return NotFound(new { error = "notification_not_found", error_description = "Notification not found" });
        }

        notification.IsRead = true;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Notification marked as read" });
    }

    [HttpPut("read-all")]
    public async Task<IActionResult> MarkAllAsRead()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        await _context.Notifications
            .Where(n => n.UserId == userId && !n.IsRead)
            .ExecuteUpdateAsync(s => s.SetProperty(n => n.IsRead, true));

        return Ok(new { message = "All notifications marked as read" });
    }

    [HttpGet("settings")]
    public async Task<IActionResult> GetNotificationSettings()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var settings = await _context.UserNotificationSettings
            .FirstOrDefaultAsync(s => s.UserId == userId);

        if (settings == null)
        {
            // Create default settings if none exist
            settings = new UserNotificationSettings
            {
                UserId = userId,
                OrderUpdates = true,
                MessageNotifications = true,
                OfferNotifications = true,
                MarketingEmails = false,
                PushEnabled = true
            };
            _context.UserNotificationSettings.Add(settings);
            await _context.SaveChangesAsync();
        }

        return Ok(new
        {
            settings.OrderUpdates,
            settings.MessageNotifications,
            settings.OfferNotifications,
            settings.MarketingEmails,
            settings.PushEnabled
        });
    }

    [HttpPut("settings")]
    public async Task<IActionResult> UpdateNotificationSettings([FromBody] UpdateNotificationSettingsRequest request)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var settings = await _context.UserNotificationSettings
            .FirstOrDefaultAsync(s => s.UserId == userId);

        if (settings == null)
        {
            settings = new UserNotificationSettings
            {
                UserId = userId
            };
            _context.UserNotificationSettings.Add(settings);
        }

        settings.OrderUpdates = request.OrderUpdates;
        settings.MessageNotifications = request.MessageNotifications;
        settings.OfferNotifications = request.OfferNotifications;
        settings.MarketingEmails = request.MarketingEmails;
        settings.PushEnabled = request.PushEnabled;
        settings.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Notification settings updated successfully" });
    }

    [HttpPost("register-token")]
    public async Task<IActionResult> RegisterFcmToken([FromBody] RegisterFcmTokenRequest request)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        // In a real implementation, you'd store the FCM token in a UserDeviceTokens table
        // For now, we'll just log it
        _logger.LogInformation("FCM token registered for user {UserId}: {Token} on {Platform}", userId, request.Token, request.Platform);

        return Ok(new { message = "FCM token registered successfully" });
    }

    [HttpPost("unregister-token")]
    public async Task<IActionResult> UnregisterFcmToken([FromBody] UnregisterFcmTokenRequest request)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        // In a real implementation, you'd remove the FCM token from the UserDeviceTokens table
        _logger.LogInformation("FCM token unregistered for user {UserId}: {Token}", userId, request.Token);

        return Ok(new { message = "FCM token unregistered successfully" });
    }
}

public class UpdateNotificationSettingsRequest
{
    public bool OrderUpdates { get; set; }
    public bool MessageNotifications { get; set; }
    public bool OfferNotifications { get; set; }
    public bool MarketingEmails { get; set; }
    public bool PushEnabled { get; set; }
}

public class RegisterFcmTokenRequest
{
    public string Token { get; set; } = string.Empty;
    public string Platform { get; set; } = string.Empty;
}

public class UnregisterFcmTokenRequest
{
    public string Token { get; set; } = string.Empty;
}