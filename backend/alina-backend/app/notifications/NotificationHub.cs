using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace alina_backend.app.notifications;

[Authorize]
public class NotificationHub : Hub
{
    private readonly AppDbContext _context;

    public NotificationHub(AppDbContext context)
    {
        _context = context;
    }

    public override async Task OnConnectedAsync()
    {
        var userId = GetCurrentUserId();
        if (userId.HasValue)
        {
            // Add user to their personal notification group
            await Groups.AddToGroupAsync(Context.ConnectionId, $"user_{userId.Value}");

            // Also add to general notifications group for broadcasts
            await Groups.AddToGroupAsync(Context.ConnectionId, "notifications");
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = GetCurrentUserId();
        if (userId.HasValue)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"user_{userId.Value}");
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "notifications");
        }

        await base.OnDisconnectedAsync(exception);
    }

    // Method to send notification to specific user
    public async Task SendNotificationToUser(Guid userId, string type, string title, string message, object? data = null)
    {
        var notificationData = new
        {
            id = Guid.NewGuid().ToString(),
            type,
            title,
            message,
            timestamp = DateTime.UtcNow,
            data
        };

        await Clients.Group($"user_{userId}").SendAsync("ReceiveNotification", notificationData);
    }

    // Method to broadcast notification to all connected users (admin announcements)
    public async Task BroadcastNotification(string type, string title, string message, object? data = null)
    {
        var notificationData = new
        {
            id = Guid.NewGuid().ToString(),
            type,
            title,
            message,
            timestamp = DateTime.UtcNow,
            data
        };

        await Clients.Group("notifications").SendAsync("ReceiveNotification", notificationData);
    }

    // Method to send marketplace-specific notifications
    public async Task SendMarketplaceNotification(Guid userId, string eventType, object marketplaceData)
    {
        var notificationData = new
        {
            id = Guid.NewGuid().ToString(),
            type = "marketplace",
            eventType, // "new_offer", "offer_accepted", "task_completed", etc.
            title = GetMarketplaceNotificationTitle(eventType),
            message = GetMarketplaceNotificationMessage(eventType, marketplaceData),
            timestamp = DateTime.UtcNow,
            data = marketplaceData
        };

        await Clients.Group($"user_{userId}").SendAsync("ReceiveNotification", notificationData);
    }

    private Guid? GetCurrentUserId()
    {
        var userIdClaim = Context.User?.FindFirst(ClaimTypes.NameIdentifier) ??
                         Context.User?.FindFirst("userId") ??
                         Context.User?.FindFirst("sub");

        if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var userId))
        {
            return userId;
        }

        return null;
    }

    private string GetMarketplaceNotificationTitle(string eventType)
    {
        return eventType switch
        {
            "new_offer" => "New Custom Offer",
            "offer_accepted" => "Offer Accepted",
            "offer_rejected" => "Offer Declined",
            "offer_expired" => "Offer Expired",
            "task_completed" => "Task Completed",
            "payment_received" => "Payment Received",
            "bid_received" => "New Bid Received",
            "bid_accepted" => "Bid Accepted",
            _ => "Marketplace Update"
        };
    }

    private string GetMarketplaceNotificationMessage(string eventType, object data)
    {
        // This would be enhanced based on the actual data structure
        return eventType switch
        {
            "new_offer" => "You received a new custom offer",
            "offer_accepted" => "Your custom offer was accepted",
            "offer_rejected" => "Your custom offer was declined",
            "offer_expired" => "Your custom offer has expired",
            "task_completed" => "Your task has been completed",
            "payment_received" => "You received a payment",
            "bid_received" => "You received a new bid on your task",
            "bid_accepted" => "Your bid was accepted",
            _ => "You have a new marketplace notification"
        };
    }
}