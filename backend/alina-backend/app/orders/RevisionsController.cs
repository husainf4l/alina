using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.app.orders;

namespace alina_backend.app.orders;

[ApiController]
[Route("api/order/revision")]
public class RevisionsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<RevisionsController> _logger;

    public RevisionsController(AppDbContext context, ILogger<RevisionsController> logger)
    {
        _context = context;
        _logger = logger;
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
    /// Request a revision for an order
    /// </summary>
    [HttpPost("request")]
    public async Task<IActionResult> RequestRevision([FromBody] RequestRevisionRequest request)
    {
        var requesterId = GetCurrentUserId();

        // TODO: Validate that the user is the buyer of the order
        // For now, assume validation passes

        var revision = new Revision
        {
            OrderId = request.OrderId,
            RequesterId = requesterId,
            Description = request.Description,
            Attachments = request.Attachments != null ? System.Text.Json.JsonSerializer.Serialize(request.Attachments) : null
        };

        _context.Revisions.Add(revision);
        await _context.SaveChangesAsync();

        return Ok(await GetRevisionDto(revision));
    }

    /// <summary>
    /// Get revisions for a specific order
    /// </summary>
    [HttpGet("order/{orderId}")]
    public async Task<IActionResult> GetOrderRevisions(int orderId)
    {
        var userId = GetCurrentUserId();

        // TODO: Validate that the user is involved in the order
        // For now, allow access

        var revisions = await _context.Revisions
            .Where(r => r.OrderId == orderId)
            .Include(r => r.Requester)
            .OrderByDescending(r => r.RequestedAt)
            .ToListAsync();

        var revisionDtos = new List<object>();
        foreach (var revision in revisions)
        {
            revisionDtos.Add(await GetRevisionDto(revision));
        }

        return Ok(revisionDtos);
    }

    /// <summary>
    /// Respond to a revision request (accept/reject/complete)
    /// </summary>
    [HttpPost("{revisionId}/respond")]
    public async Task<IActionResult> RespondToRevision(int revisionId, [FromBody] RespondToRevisionRequest request)
    {
        var userId = GetCurrentUserId();

        var revision = await _context.Revisions
            .Include(r => r.Requester)
            .FirstOrDefaultAsync(r => r.Id == revisionId);

        if (revision == null)
        {
            return NotFound(new { error = "Revision not found" });
        }

        // TODO: Validate that the user is the seller/freelancer for this order
        // For now, allow any authenticated user to respond

        RevisionStatus newStatus;
        switch (request.Action.ToLower())
        {
            case "accept":
                newStatus = RevisionStatus.Accepted;
                break;
            case "reject":
                newStatus = RevisionStatus.Rejected;
                break;
            case "complete":
                newStatus = RevisionStatus.Completed;
                break;
            default:
                return BadRequest(new { error = "Invalid action. Must be 'accept', 'reject', or 'complete'" });
        }

        revision.Status = newStatus;
        revision.ResolutionMessage = request.ResolutionMessage;
        revision.ResolutionAttachments = request.ResolutionAttachments != null
            ? System.Text.Json.JsonSerializer.Serialize(request.ResolutionAttachments)
            : null;
        revision.RespondedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(await GetRevisionDto(revision));
    }

    /// <summary>
    /// Get pending revisions for current user
    /// </summary>
    [HttpGet("pending")]
    public async Task<IActionResult> GetPendingRevisions()
    {
        var userId = GetCurrentUserId();

        // TODO: Get revisions where the user is the seller/freelancer
        // For now, return all pending revisions

        var revisions = await _context.Revisions
            .Where(r => r.Status == RevisionStatus.Requested)
            .Include(r => r.Requester)
            .OrderByDescending(r => r.RequestedAt)
            .ToListAsync();

        var revisionDtos = new List<object>();
        foreach (var revision in revisions)
        {
            revisionDtos.Add(await GetRevisionDto(revision));
        }

        return Ok(revisionDtos);
    }

    /// <summary>
    /// Get a specific revision by ID
    /// </summary>
    [HttpGet("{revisionId}")]
    public async Task<IActionResult> GetRevisionById(int revisionId)
    {
        var userId = GetCurrentUserId();

        var revision = await _context.Revisions
            .Include(r => r.Requester)
            .FirstOrDefaultAsync(r => r.Id == revisionId);

        if (revision == null)
        {
            return NotFound(new { error = "Revision not found" });
        }

        // TODO: Validate that the user is involved in this revision
        // For now, allow access

        return Ok(await GetRevisionDto(revision));
    }

    private async Task<object> GetRevisionDto(Revision revision)
    {
        var attachments = string.IsNullOrEmpty(revision.Attachments)
            ? new List<string>()
            : System.Text.Json.JsonSerializer.Deserialize<List<string>>(revision.Attachments);

        var resolutionAttachments = string.IsNullOrEmpty(revision.ResolutionAttachments)
            ? new List<string>()
            : System.Text.Json.JsonSerializer.Deserialize<List<string>>(revision.ResolutionAttachments);

        return new
        {
            id = revision.Id.ToString(),
            orderId = revision.OrderId.ToString(),
            requesterId = revision.RequesterId.ToString(),
            requesterName = revision.Requester?.FullName ?? "Unknown",
            description = revision.Description,
            attachments,
            status = revision.Status.ToString().ToLower(),
            resolutionMessage = revision.ResolutionMessage,
            resolutionAttachments,
            requestedAt = revision.RequestedAt,
            respondedAt = revision.RespondedAt
        };
    }
}

public class RequestRevisionRequest
{
    public int OrderId { get; set; }
    public string Description { get; set; } = string.Empty;
    public List<string>? Attachments { get; set; }
}

public class RespondToRevisionRequest
{
    public string Action { get; set; } = string.Empty; // "accept", "reject", "complete"
    public string? ResolutionMessage { get; set; }
    public List<string>? ResolutionAttachments { get; set; }
}