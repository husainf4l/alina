using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.Modules.marketplace;
using alina_backend.Modules.users;
using Microsoft.AspNetCore.SignalR;
using System.IO;
using alina_backend.Modules.media;

namespace alina_backend.Modules.marketplace;

[ApiController]
[Route("api/customoffers")]
public class CustomOffersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<CustomOffersController> _logger;
    private readonly IHubContext<alina_backend.Modules.notifications.NotificationHub> _notificationHub;

    public CustomOffersController(AppDbContext context, ILogger<CustomOffersController> logger, IHubContext<alina_backend.Modules.notifications.NotificationHub> notificationHub)
    {
        _context = context;
        _logger = logger;
        _notificationHub = notificationHub;
    }

    private Guid GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("userId");
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
        {
            throw new UnauthorizedAccessException("User not authenticated");
        }
        return userId;
    }

    /// <summary>
    /// Send a custom offer to another user
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> SendCustomOffer([FromBody] SendCustomOfferRequest request)
    {
        var senderId = GetCurrentUserId();

        var customOffer = new CustomOffer
        {
            SenderId = senderId,
            RecipientId = request.RecipientId,
            Title = request.Title,
            Description = request.Description,
            Price = request.Price,
            Currency = request.Currency ?? "USD",
            DeliveryTimeInDays = request.DeliveryTimeInDays,
            Features = System.Text.Json.JsonSerializer.Serialize(request.Features),
            ExpiryDate = DateTime.UtcNow.AddDays(request.ExpiryDays ?? 7)
        };

        _context.CustomOffers.Add(customOffer);
        await _context.SaveChangesAsync();

        // Create media records for attachments if provided
        if (request.AttachmentUrls != null && request.AttachmentUrls.Any())
        {
            var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == senderId);
            if (profile != null)
            {
                foreach (var attachmentUrl in request.AttachmentUrls)
                {
                    // Extract filename from URL
                    var fileName = attachmentUrl.Split('/').Last();
                    var media = new Media
                    {
                        Url = attachmentUrl,
                        FileName = fileName,
                        FileType = GetFileTypeFromUrl(attachmentUrl),
                        FileSize = 0, // We don't have this info, could be updated later
                        OwnerId = profile.Id,
                        CustomOfferId = customOffer.Id
                    };
                    _context.Media.Add(media);
                }
                await _context.SaveChangesAsync();
            }
        }

        // Send real-time notification to recipient
        await _notificationHub.Clients.Group($"user_{request.RecipientId}").SendAsync("ReceiveNotification", new
        {
            id = Guid.NewGuid().ToString(),
            type = "marketplace",
            eventType = "new_offer",
            title = "New Custom Offer",
            message = $"You received a new custom offer: {request.Title}",
            timestamp = DateTime.UtcNow,
            data = new
            {
                offerId = customOffer.Id,
                senderId = senderId.ToString(),
                senderName = customOffer.Sender?.FullName ?? "Unknown",
                title = request.Title,
                price = new { amount = request.Price, currency = request.Currency ?? "USD" }
            }
        });

        return Ok(await GetCustomOfferDto(customOffer));
    }

    /// <summary>
    /// Get custom offers sent by current user
    /// </summary>
    [HttpGet("sent")]
    public async Task<IActionResult> GetSentOffers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        var userId = GetCurrentUserId();

        var query = _context.CustomOffers
            .Where(co => co.SenderId == userId)
            .Include(co => co.Recipient)
            .OrderByDescending(co => co.SentAt);

        var totalCount = await query.CountAsync();
        var offers = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var offerDtos = new List<object>();
        foreach (var offer in offers)
        {
            offerDtos.Add(await GetCustomOfferDto(offer));
        }

        return Ok(new
        {
            items = offerDtos,
            totalCount,
            pageNumber,
            pageSize,
            totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        });
    }

    /// <summary>
    /// Get custom offers received by current user
    /// </summary>
    [HttpGet("received")]
    public async Task<IActionResult> GetReceivedOffers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        var userId = GetCurrentUserId();

        var query = _context.CustomOffers
            .Where(co => co.RecipientId == userId)
            .Include(co => co.Sender)
            .OrderByDescending(co => co.SentAt);

        var totalCount = await query.CountAsync();
        var offers = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var offerDtos = new List<object>();
        foreach (var offer in offers)
        {
            offerDtos.Add(await GetCustomOfferDto(offer));
        }

        return Ok(new
        {
            items = offerDtos,
            totalCount,
            pageNumber,
            pageSize,
            totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        });
    }

    /// <summary>
    /// Respond to a custom offer (accept/reject)
    /// </summary>
    [HttpPost("{offerId}/respond")]
    public async Task<IActionResult> RespondToOffer(int offerId, [FromBody] RespondToOfferRequest request)
    {
        var userId = GetCurrentUserId();

        var offer = await _context.CustomOffers
            .FirstOrDefaultAsync(co => co.Id == offerId && co.RecipientId == userId);

        if (offer == null)
        {
            return NotFound(new { error = "Offer not found" });
        }

        if (offer.Status != CustomOfferStatus.Pending)
        {
            return BadRequest(new { error = "Offer has already been responded to" });
        }

        offer.Status = request.Accept ? CustomOfferStatus.Accepted : CustomOfferStatus.Rejected;
        offer.ResponseMessage = request.ResponseMessage;
        offer.RespondedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        // Send real-time notification to sender
        var eventType = request.Accept ? "offer_accepted" : "offer_rejected";
        var title = request.Accept ? "Offer Accepted" : "Offer Declined";
        var message = request.Accept
            ? $"Your custom offer '{offer.Title}' was accepted"
            : $"Your custom offer '{offer.Title}' was declined";

        await _notificationHub.Clients.Group($"user_{offer.SenderId}").SendAsync("ReceiveNotification", new
        {
            id = Guid.NewGuid().ToString(),
            type = "marketplace",
            eventType,
            title,
            message,
            timestamp = DateTime.UtcNow,
            data = new
            {
                offerId = offer.Id,
                recipientId = offer.RecipientId.ToString(),
                recipientName = offer.Recipient?.FullName ?? "Unknown",
                title = offer.Title,
                responseMessage = request.ResponseMessage,
                accepted = request.Accept
            }
        });

        return Ok(await GetCustomOfferDto(offer));
    }

    /// <summary>
    /// Get a specific custom offer by ID
    /// </summary>
    [HttpGet("{offerId}")]
    public async Task<IActionResult> GetOfferById(int offerId)
    {
        var userId = GetCurrentUserId();

        var offer = await _context.CustomOffers
            .Include(co => co.Sender)
            .Include(co => co.Recipient)
            .FirstOrDefaultAsync(co => co.Id == offerId && (co.SenderId == userId || co.RecipientId == userId));

        if (offer == null)
        {
            return NotFound(new { error = "Offer not found" });
        }

        return Ok(await GetCustomOfferDto(offer));
    }

    /// <summary>
    /// Withdraw a sent offer (if not yet responded to)
    /// </summary>
    [HttpDelete("{offerId}")]
    public async Task<IActionResult> WithdrawOffer(int offerId)
    {
        var userId = GetCurrentUserId();

        var offer = await _context.CustomOffers
            .FirstOrDefaultAsync(co => co.Id == offerId && co.SenderId == userId);

        if (offer == null)
        {
            return NotFound(new { error = "Offer not found" });
        }

        if (offer.Status != CustomOfferStatus.Pending)
        {
            return BadRequest(new { error = "Cannot withdraw offer that has been responded to" });
        }

        _context.CustomOffers.Remove(offer);
        await _context.SaveChangesAsync();

        // Send real-time notification to recipient
        await _notificationHub.Clients.Group($"user_{offer.RecipientId}").SendAsync("ReceiveNotification", new
        {
            id = Guid.NewGuid().ToString(),
            type = "marketplace",
            eventType = "offer_withdrawn",
            title = "Offer Withdrawn",
            message = $"The custom offer '{offer.Title}' was withdrawn by the sender",
            timestamp = DateTime.UtcNow,
            data = new
            {
                offerId = offer.Id,
                senderId = offer.SenderId.ToString(),
                senderName = offer.Sender?.FullName ?? "Unknown",
                title = offer.Title
            }
        });

        return Ok(new { message = "Offer withdrawn successfully" });
    }

    /// <summary>
    /// Get pending offers count for current user
    /// </summary>
    [HttpGet("pending/count")]
    public async Task<IActionResult> GetPendingOffersCount()
    {
        var userId = GetCurrentUserId();

        var count = await _context.CustomOffers
            .CountAsync(co => co.RecipientId == userId &&
                             co.Status == CustomOfferStatus.Pending &&
                             co.ExpiryDate > DateTime.UtcNow);

        return Ok(new { count });
    }

    private async Task<object> GetCustomOfferDto(CustomOffer offer)
    {
        var features = string.IsNullOrEmpty(offer.Features)
            ? new List<string>()
            : System.Text.Json.JsonSerializer.Deserialize<List<string>>(offer.Features);

        // Fetch media attachments for this custom offer
        var attachments = await _context.Media
            .Where(m => m.CustomOfferId == offer.Id)
            .Select(m => new
            {
                id = m.Id.ToString(),
                fileName = m.FileName,
                fileUrl = m.Url,
                fileType = m.FileType,
                fileSize = m.FileSize,
                uploadedBy = m.Owner != null && m.Owner.User != null ? m.Owner.User.FullName : "Unknown",
                uploadedAt = m.CreatedAt
            })
            .ToListAsync();

        return new
        {
            id = offer.Id.ToString(),
            senderId = offer.SenderId.ToString(),
            senderName = offer.Sender?.FullName ?? "Unknown",
            recipientId = offer.RecipientId.ToString(),
            recipientName = offer.Recipient?.FullName ?? "Unknown",
            title = offer.Title,
            description = offer.Description,
            price = new { amount = offer.Price, currency = offer.Currency },
            deliveryTimeInDays = offer.DeliveryTimeInDays,
            features,
            attachments,
            status = offer.Status.ToString().ToLower(),
            sentAt = offer.SentAt,
            expiryDate = offer.ExpiryDate,
            responseMessage = offer.ResponseMessage,
            respondedAt = offer.RespondedAt
        };
    }

    private string GetFileTypeFromUrl(string url)
    {
        var extension = Path.GetExtension(url).ToLower();
        return extension switch
        {
            ".jpg" => "image/jpeg",
            ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".pdf" => "application/pdf",
            ".doc" => "application/msword",
            ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".txt" => "text/plain",
            ".zip" => "application/zip",
            ".rar" => "application/x-rar-compressed",
            _ => "application/octet-stream"
        };
    }
}

public class SendCustomOfferRequest
{
    public Guid RecipientId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string? Currency { get; set; }
    public int DeliveryTimeInDays { get; set; }
    public List<string> Features { get; set; } = new();
    public List<string>? AttachmentUrls { get; set; }
    public int? ExpiryDays { get; set; }
}

public class RespondToOfferRequest
{
    public bool Accept { get; set; }
    public string? ResponseMessage { get; set; }
}