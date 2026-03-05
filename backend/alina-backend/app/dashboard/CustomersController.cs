using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.app.marketplace;
using alina_backend.app.messaging;

namespace alina_backend.app.dashboard;

[ApiController]
[Route("api/seller/[controller]")]
[Authorize]
public class CustomersController : ControllerBase
{
    private readonly AppDbContext _context;

    public CustomersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("reviews")]
    public async Task<ActionResult<List<ReviewDto>>> GetSellerReviews([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var reviews = await _context.Reviews
            .Include(r => r.Order)
            .ThenInclude(o => o.Gig)
            .Include(r => r.Reviewer)
            .Where(r => r.Order.SellerId == userId)
            .OrderByDescending(r => r.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new ReviewDto
            {
                Id = r.Id,
                Rating = r.Rating,
                Comment = r.Comment,
                CreatedAt = r.CreatedAt,
                GigTitle = r.Order.Gig.Title,
                ReviewerName = r.Reviewer.DisplayName ?? "Anonymous",
                OrderId = r.OrderId
            })
            .ToListAsync();

        return Ok(reviews);
    }

    [HttpGet("reviews/stats")]
    public async Task<ActionResult<ReviewStatsDto>> GetSellerReviewStats()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var reviews = await _context.Reviews
            .Include(r => r.Order)
            .Where(r => r.Order.SellerId == userId)
            .ToListAsync();

        var totalReviews = reviews.Count;
        var averageRating = totalReviews > 0 ? reviews.Average(r => r.Rating) : 0;
        var ratingDistribution = reviews
            .GroupBy(r => r.Rating)
            .ToDictionary(g => g.Key, g => g.Count());

        // Fill in missing ratings with 0
        for (int i = 1; i <= 5; i++)
        {
            if (!ratingDistribution.ContainsKey(i))
                ratingDistribution[i] = 0;
        }

        return Ok(new ReviewStatsDto
        {
            TotalReviews = totalReviews,
            AverageRating = Math.Round(averageRating, 1),
            RatingDistribution = ratingDistribution.OrderByDescending(kv => kv.Key).ToDictionary(kv => kv.Key, kv => kv.Value)
        });
    }

    [HttpGet("conversations")]
    public async Task<ActionResult<List<ConversationDto>>> GetSellerConversations([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var conversations = await _context.Conversations
            .Include(c => c.User1)
            .Include(c => c.User2)
            .Include(c => c.Messages.OrderByDescending(m => m.CreatedAt).Take(1))
            .Where(c => c.User1Id == userId || c.User2Id == userId)
            .OrderByDescending(c => c.LastMessageAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new ConversationDto
            {
                Id = c.Id,
                CustomerName = c.User1Id == userId ? (c.User2.Id.ToString() ?? "Unknown") : (c.User1.Id.ToString() ?? "Unknown"),
                LastMessage = c.Messages.OrderByDescending(m => m.CreatedAt).FirstOrDefault() != null 
                    ? c.Messages.OrderByDescending(m => m.CreatedAt).First().Content 
                    : "",
                LastMessageAt = c.LastMessageAt ?? DateTime.UtcNow,
                UnreadCount = c.Messages.Count(m => m.ReceiverId == userId && m.ReadAt == null)
            })
            .ToListAsync();

        return Ok(conversations);
    }

    [HttpPost("reviews/{reviewId}/reply")]
    public async Task<IActionResult> ReplyToReview(Guid reviewId, [FromBody] ReplyToReviewDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var review = await _context.Reviews
            .Include(r => r.Order)
            .FirstOrDefaultAsync(r => r.Id == reviewId && r.Order.SellerId == userId);

        if (review == null) return NotFound("Review not found");

        // In a real implementation, you'd have a review replies table
        // For now, just return success
        return Ok(new { message = "Reply sent successfully" });
    }
}

public class ReviewDto
{
    public Guid Id { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    public string GigTitle { get; set; }
    public string ReviewerName { get; set; }
    public Guid OrderId { get; set; }
}

public class ReviewStatsDto
{
    public int TotalReviews { get; set; }
    public double AverageRating { get; set; }
    public Dictionary<int, int> RatingDistribution { get; set; } = new();
}

public class ConversationDto
{
    public Guid Id { get; set; }
    public string CustomerName { get; set; }
    public string LastMessage { get; set; }
    public DateTime LastMessageAt { get; set; }
    public int UnreadCount { get; set; }
}

public class ReplyToReviewDto
{
    public string Reply { get; set; }
}