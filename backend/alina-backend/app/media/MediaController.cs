using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace alina_backend.app.media;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MediaController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IStorageService _storageService;

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

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        using var stream = file.OpenReadStream();
        var fileUrl = await _storageService.UploadFileAsync(stream, file.FileName, file.ContentType);

        var media = new Media
        {
            Url = fileUrl,
            FileName = file.FileName,
            FileType = file.ContentType,
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
