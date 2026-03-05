using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.app.marketplace;

namespace alina_backend.app.marketplace;

[ApiController]
[Route("api/marketplace/favorites")]
public class FavoritesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<FavoritesController> _logger;

    public FavoritesController(AppDbContext context, ILogger<FavoritesController> logger)
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
    /// Get user's favorite gigs
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetFavoriteGigs([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        var userId = GetCurrentUserId();

        var query = _context.Favorites
            .Where(f => f.UserId == userId)
            .OrderByDescending(f => f.CreatedAt);

        var totalCount = await query.CountAsync();
        var favorites = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(f => f.GigId)
            .ToListAsync();

        // For now, return gig IDs. In a real implementation, you'd join with a Gigs table
        // and return full gig objects
        var gigDtos = favorites.Select(gigId => new
        {
            id = gigId.ToString(),
            title = $"Gig {gigId}", // Mock data
            description = $"Description for gig {gigId}",
            price = new { amount = 50.0m, currency = "USD" },
            sellerName = "Seller Name"
        }).ToList();

        return Ok(new
        {
            items = gigDtos,
            totalCount,
            pageNumber,
            pageSize,
            totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        });
    }

    /// <summary>
    /// Add gig to favorites
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> AddToFavorites([FromBody] AddToFavoritesRequest request)
    {
        var userId = GetCurrentUserId();

        // Check if already favorited
        var existing = await _context.Favorites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.GigId == request.GigId);

        if (existing != null)
        {
            return BadRequest(new { error = "Gig is already in favorites" });
        }

        var favorite = new Favorite
        {
            UserId = userId,
            GigId = request.GigId
        };

        _context.Favorites.Add(favorite);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Gig added to favorites" });
    }

    /// <summary>
    /// Remove gig from favorites
    /// </summary>
    [HttpDelete("{gigId}")]
    public async Task<IActionResult> RemoveFromFavorites(Guid gigId)
    {
        var userId = GetCurrentUserId();

        var favorite = await _context.Favorites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.GigId == gigId);

        if (favorite == null)
        {
            return NotFound(new { error = "Favorite not found" });
        }

        _context.Favorites.Remove(favorite);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Gig removed from favorites" });
    }

    /// <summary>
    /// Check if gig is favorited
    /// </summary>
    [HttpGet("{gigId}/check")]
    public async Task<IActionResult> IsGigFavorited(Guid gigId)
    {
        var userId = GetCurrentUserId();

        var isFavorited = await _context.Favorites
            .AnyAsync(f => f.UserId == userId && f.GigId == gigId);

        return Ok(new { isFavorited });
    }
}

public class AddToFavoritesRequest
{
    public Guid GigId { get; set; }
}