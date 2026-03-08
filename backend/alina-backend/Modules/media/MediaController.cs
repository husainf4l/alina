using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace alina_backend.Modules.media;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MediaController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IStorageService _storageService;
    private readonly ILogger<MediaController> _logger;

    // Public MIME types: uploaded to "public/" prefix, served via CDN with permanent URLs.
    // These are gig images, portfolio photos — content that should be indexed by search engines.
    private static readonly HashSet<string> PublicMimeTypes = new()
    {
        "image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"
    };

    // Private MIME types: uploaded to "private/" prefix, served via presigned URL proxy.
    // These are documents and videos attached to orders/offers — not for public indexing.
    private static readonly HashSet<string> PrivateMimeTypes = new()
    {
        "application/pdf", "video/mp4"
    };

    // SEC-08: Magic byte signatures for all allowed types
    private static readonly Dictionary<string, byte[][]> AllowedMagicBytes = new()
    {
        ["image/jpeg"]      = [new byte[] { 0xFF, 0xD8, 0xFF }],
        ["image/png"]       = [new byte[] { 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A }],
        ["image/gif"]       = [new byte[] { 0x47, 0x49, 0x46, 0x38, 0x37, 0x61 }, new byte[] { 0x47, 0x49, 0x46, 0x38, 0x39, 0x61 }],
        ["image/webp"]      = [new byte[] { 0x52, 0x49, 0x46, 0x46 }],
        ["image/svg+xml"]   = [new byte[] { 0x3C, 0x73, 0x76, 0x67 }, new byte[] { 0x3C, 0x3F, 0x78, 0x6D }],
        ["application/pdf"] = [new byte[] { 0x25, 0x50, 0x44, 0x46 }],
        ["video/mp4"]       = [new byte[] { 0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70 }, new byte[] { 0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70 }],
    };

    public MediaController(AppDbContext context, IStorageService storageService, ILogger<MediaController> logger)
    {
        _context = context;
        _storageService = storageService;
        _logger = logger;
    }

    /// <summary>
    /// Upload a file.
    /// - Images → stored in "public/" prefix → CDN URL returned (permanent, SEO-friendly)
    /// - PDFs/Videos → stored in "private/" prefix → proxy URL returned (presigned on demand)
    /// </summary>
    [HttpPost("upload")]
    public async Task<ActionResult<MediaResponse>> UploadFile(
        IFormFile file,
        [FromQuery] Guid? gigId,
        [FromQuery] Guid? taskId,
        [FromQuery] int? customOfferId)
    {
        if (file == null || file.Length == 0) return BadRequest("No file uploaded");

        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var contentType = file.ContentType?.ToLowerInvariant() ?? string.Empty;
        if (!AllowedMagicBytes.TryGetValue(contentType, out var expectedSignatures))
            return StatusCode(415, new { error = "File type not allowed." });

        // SEC-08: Validate magic bytes
        byte[] header = new byte[16];
        using (var peek = file.OpenReadStream())
            await peek.ReadAsync(header.AsMemory(0, Math.Min(16, (int)file.Length)));

        if (!expectedSignatures.Any(sig => header.Take(sig.Length).SequenceEqual(sig)))
            return StatusCode(415, new { error = "File content does not match declared type." });

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        using var stream = file.OpenReadStream();

        string storageKey;
        if (PublicMimeTypes.Contains(contentType))
        {
            // Images go to CDN — permanent public URL, no expiry
            storageKey = await _storageService.UploadPublicFileAsync(stream, file.FileName, contentType, "media");
        }
        else
        {
            // PDFs/videos go private — served via presigned proxy
            storageKey = await _storageService.UploadPrivateFileAsync(stream, file.FileName, contentType, "attachments");
        }

        var media = new Media
        {
            Url = storageKey,   // DB always stores relative key only
            FileName = file.FileName,
            FileType = contentType,
            FileSize = file.Length,
            OwnerId = profile.Id,
            GigId = gigId,
            UserTaskId = taskId,
            CustomOfferId = customOfferId
        };

        _context.Media.Add(media);
        await _context.SaveChangesAsync();

        _logger.LogInformation("File uploaded by user {UserId}: key={Key}", userId, storageKey);

        return Ok(new MediaResponse(media, ResolveUrl(media)));
    }

    /// <summary>
    /// Serve a PRIVATE file via the backend proxy.
    /// Issues a 302 redirect to a 15-minute presigned S3 URL.
    /// Public images do NOT use this endpoint — they are served directly via the CDN URL.
    /// </summary>
    [HttpGet("file/{id:guid}")]
    [AllowAnonymous]
    public async Task<IActionResult> ServeFile(Guid id)
    {
        var media = await _context.Media.FirstOrDefaultAsync(m => m.Id == id);
        if (media == null) return NotFound();

        // Only private keys go through this proxy
        if (!media.Url.StartsWith("private/"))
            return BadRequest(new { error = "Use the cdn_url field to display public files directly." });

        var presignedUrl = await _storageService.GetPresignedUrlAsync(media.Url, expiryMinutes: 15);
        return Redirect(presignedUrl);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMedia(Guid id)
    {
        var media = await _context.Media.FindAsync(id);
        if (media == null) return NotFound();

        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null || media.OwnerId != profile.Id) return Forbid();

        await _storageService.DeleteFileAsync(media.Url);
        _context.Media.Remove(media);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Returns the correct URL based on whether the file is public or private.
    /// Public → permanent CDN URL (https://media.aqlaan.cloud/public/...)
    /// Private → backend proxy URL (/api/media/file/{id})
    /// </summary>
    private string ResolveUrl(Media media)
    {
        if (media.Url.StartsWith("public/"))
            return _storageService.GetPublicUrl(media.Url);

        // Private: return stable proxy URL — presigning happens at serve time
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        return $"{baseUrl}/api/media/file/{media.Id}";
    }
}

/// <summary>Response DTO — url is always ready to use, no client-side transformation needed.</summary>
public record MediaResponse(
    Guid Id,
    string Url,         // CDN URL for images, proxy URL for private files
    string FileName,
    string FileType,
    long FileSize,
    DateTime CreatedAt)
{
    public MediaResponse(Media m, string resolvedUrl) : this(
        m.Id, resolvedUrl, m.FileName, m.FileType, m.FileSize, m.CreatedAt) { }
}
