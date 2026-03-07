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

    // SEC-08: Allowed MIME types and their magic byte signatures
    private static readonly Dictionary<string, byte[][]> AllowedMagicBytes = new()
    {
        ["image/jpeg"]   = [new byte[] { 0xFF, 0xD8, 0xFF }],
        ["image/png"]    = [new byte[] { 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A }],
        ["image/gif"]    = [new byte[] { 0x47, 0x49, 0x46, 0x38, 0x37, 0x61 }, new byte[] { 0x47, 0x49, 0x46, 0x38, 0x39, 0x61 }],
        ["image/webp"]   = [new byte[] { 0x52, 0x49, 0x46, 0x46 }],
        ["image/svg+xml"] = [new byte[] { 0x3C, 0x73, 0x76, 0x67 }, new byte[] { 0x3C, 0x3F, 0x78, 0x6D }],
        ["application/pdf"] = [new byte[] { 0x25, 0x50, 0x44, 0x46 }],
        ["video/mp4"]    = [new byte[] { 0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70 }, new byte[] { 0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70 }],
    };

    public MediaController(AppDbContext context, IStorageService storageService)
    {
        _context = context;
        _storageService = storageService;
    }

    [HttpPost("upload")]
    public async Task<ActionResult<Media>> UploadFile(IFormFile file, [FromQuery] Guid? gigId, [FromQuery] Guid? taskId, [FromQuery] int? customOfferId)
    {
        if (file == null || file.Length == 0) return BadRequest("No file uploaded");

        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        // SEC-08: Validate declared content type is in the allowlist
        var contentType = file.ContentType?.ToLowerInvariant() ?? string.Empty;
        if (!AllowedMagicBytes.TryGetValue(contentType, out var expectedSignatures))
            return StatusCode(415, new { error = "File type not allowed." });

        // SEC-08: Validate actual magic bytes against declared type
        byte[] header = new byte[16];
        using (var peek = file.OpenReadStream())
        {
            await peek.ReadAsync(header.AsMemory(0, Math.Min(16, (int)file.Length)));
        }
        bool magicMatched = expectedSignatures.Any(sig => header.Take(sig.Length).SequenceEqual(sig));
        if (!magicMatched)
            return StatusCode(415, new { error = "File content does not match declared type." });

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        using var stream = file.OpenReadStream();
        var fileUrl = await _storageService.UploadFileAsync(stream, file.FileName, contentType);

        var media = new Media
        {
            Url = fileUrl,
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

        return Ok(media);
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
}
