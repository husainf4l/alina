using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Security.Claims;
using alina_backend.Modules.media;

namespace alina_backend.Modules.marketplace;

[ApiController]
[Route("api/[controller]")]
public class MarketplaceController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly alina_backend.Modules.finance.ICurrencyService _currencyService;

    public MarketplaceController(AppDbContext context, alina_backend.Modules.finance.ICurrencyService currencyService)
    {
        _context = context;
        _currencyService = currencyService;
    }

    private async Task<string> GetUserCurrency()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return "USD";

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        return profile?.PreferredCurrency ?? "USD";
    }

    // --- Categories ---

    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
    {
        var categories = await _context.Categories
            .Include(c => c.SubCategories)
            .ToListAsync();

        var rootCategories = categories
            .Where(c => c.ParentId == null)
            .Select(c => MapToDto(c))
            .ToList();

        return rootCategories;
    }

    private static CategoryDto MapToDto(Category c)
    {
        return new CategoryDto(
            c.Id, 
            c.Name, 
            c.NameAr, 
            c.Description, 
            c.DescriptionAr, 
            c.Icon, 
            c.ParentId,
            c.SubCategories?.Select(MapToDto).ToList()
        );
    }

    [HttpGet("trending-categories")]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetTrendingCategories()
    {
        var lastWeek = DateTime.UtcNow.AddDays(-7);

        var trendingCategoryIds = await _context.Orders
            .Where(o => o.CreatedAt >= lastWeek)
            .GroupBy(o => o.Gig.CategoryId)
            .OrderByDescending(g => g.Count())
            .Take(10)
            .Select(g => g.Key)
            .ToListAsync();

        // Fallback: If no trending data, return categories with most gigs
        if (!trendingCategoryIds.Any())
        {
            trendingCategoryIds = await _context.Gigs
                .Where(g => g.IsActive && !g.IsDeleted)
                .GroupBy(g => g.CategoryId)
                .OrderByDescending(g => g.Count())
                .Take(8)
                .Select(g => g.Key)
                .ToListAsync();
        }

        var categories = await _context.Categories
            .Where(c => trendingCategoryIds.Contains(c.Id))
            .ToListAsync();

        var result = categories
            .OrderBy(c => trendingCategoryIds.IndexOf(c.Id))
            .Select(c => MapToDto(c))
            .ToList();

        return result;
    }

    [HttpGet("main-categories")]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetMainCategories()
    {
        var categories = await _context.Categories
            .Where(c => c.ParentId == null)
            .OrderBy(c => c.Name)
            .ToListAsync();

        var result = categories
            .Select(c => new CategoryDto(
                c.Id,
                c.Name,
                c.NameAr,
                c.Description,
                c.DescriptionAr,
                c.Icon,
                c.ParentId,
                null // Don't include subcategories in this endpoint
            ))
            .ToList();

        return result;
    }

    [HttpGet("{parentId}/subcategories")]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetSubcategories(Guid parentId)
    {
        var subcategories = await _context.Categories
            .Where(c => c.ParentId == parentId)
            .OrderBy(c => c.Name)
            .ToListAsync();

        var result = subcategories
            .Select(c => new CategoryDto(
                c.Id,
                c.Name,
                c.NameAr,
                c.Description,
                c.DescriptionAr,
                c.Icon,
                c.ParentId,
                null
            ))
            .ToList();

        return result;
    }

    [HttpGet("recommended")]
    public async Task<ActionResult<IEnumerable<GigDto>>> GetRecommended()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        List<Guid> userCategories = new List<Guid>();

        // Try to get user's preferred categories from their order history
        if (Guid.TryParse(userIdStr, out var userId))
        {
            userCategories = await _context.Orders
                .Where(o => o.BuyerId == userId)
                .Select(o => o.Gig.CategoryId)
                .Distinct()
                .ToListAsync();
        }

        List<Gig> recommended;
        
        // If user has order history, show from those categories
        if (userCategories.Any())
        {
            recommended = await _context.Gigs
                .Include(g => g.Seller)
                .Include(g => g.Category)
                .Include(g => g.Gallery)
                .Where(g => userCategories.Contains(g.CategoryId) && !g.IsDeleted && g.IsActive)
                .OrderByDescending(g => g.AverageRating)
                .Take(10)
                .ToListAsync();
        }
        else
        {
            // Fallback: Show top-rated gigs across all categories for new users
            recommended = await _context.Gigs
                .Include(g => g.Seller)
                .Include(g => g.Category)
                .Include(g => g.Gallery)
                .Where(g => !g.IsDeleted && g.IsActive)
                .OrderByDescending(g => g.AverageRating)
                .ThenByDescending(g => g.ReviewCount)
                .Take(10)
                .ToListAsync();
        }

        var currency = await GetUserCurrency();
        var items = new List<GigDto>();

        foreach (var g in recommended)
        {
            items.Add(new GigDto(
                g.Id, g.Title, g.Description, g.MainImage,
                g.Gallery?.Select(m => m.Url).ToList() ?? new List<string>(),
                g.CategoryId, g.Category.Name, g.SellerId, g.Seller.DisplayName ?? "Unknown",
                g.Seller.SellerLevel.ToString(),
                new List<PackageDto>(), // Recommended gigs don't need full package details
                g.DeliveryTimeInDays, g.AverageRating, g.ReviewCount, g.IsActive
            ));
        }

        return items;
    }

    [HttpGet("search-suggestions")]
    public async Task<IActionResult> GetSearchSuggestions(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            // Return trending searches when no query
            var lastWeek = DateTime.UtcNow.AddDays(-7);
            var trendingSuggestions = await _context.SearchAnalytics
                .Where(sa => sa.LastSearchedAt >= lastWeek)
                .OrderByDescending(sa => sa.SearchCount)
                .Take(5)
                .Select(sa => sa.SearchTerm)
                .ToListAsync();
            return Ok(trendingSuggestions);
        }

        var suggestions = new List<string>();

        // Add gig title matches
        var gigSuggestions = await _context.Gigs
            .Where(g => g.Title.Contains(query))
            .OrderByDescending(g => g.AverageRating)
            .Select(g => g.Title)
            .Distinct()
            .Take(3)
            .ToListAsync();

        suggestions.AddRange(gigSuggestions);

        // Add trending searches that match the query
        var weekAgo = DateTime.UtcNow.AddDays(-7);
        var trendingMatches = await _context.SearchAnalytics
            .Where(sa => sa.LastSearchedAt >= weekAgo && sa.SearchTerm.Contains(query))
            .OrderByDescending(sa => sa.SearchCount)
            .Take(2)
            .Select(sa => sa.SearchTerm)
            .ToListAsync();

        suggestions.AddRange(trendingMatches);

        // Remove duplicates and limit to 5
        return Ok(suggestions.Distinct().Take(5).ToList());
    }

    [HttpPost("search-analytics")]
    public async Task<IActionResult> RecordSearchAnalytics([FromBody] SearchAnalyticsDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.SearchTerm))
            return BadRequest("Search term is required");

        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        Guid? userId = null;
        if (Guid.TryParse(userIdStr, out var parsedUserId))
        {
            userId = parsedUserId;
        }

        // Atomic increment to avoid lost-update race condition under concurrent requests
        var updated = await _context.SearchAnalytics
            .Where(sa => sa.SearchTerm.ToLower() == dto.SearchTerm.ToLower())
            .ExecuteUpdateAsync(s => s
                .SetProperty(sa => sa.SearchCount, sa => sa.SearchCount + 1)
                .SetProperty(sa => sa.LastSearchedAt, DateTime.UtcNow));

        if (updated == 0)
        {
            // No existing record — insert a new one
            // Wrap in try/catch to handle concurrent inserts (unique constraint violation)
            try
            {
                var analytics = new SearchAnalytics
                {
                    SearchTerm = dto.SearchTerm.Trim(),
                    SearchCount = 1,
                    FirstSearchedAt = DateTime.UtcNow,
                    LastSearchedAt = DateTime.UtcNow,
                    UserId = userId
                };
                _context.SearchAnalytics.Add(analytics);
                await _context.SaveChangesAsync();
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException)
            {
                // Another request inserted the same term concurrently — apply the increment now
                await _context.SearchAnalytics
                    .Where(sa => sa.SearchTerm.ToLower() == dto.SearchTerm.ToLower())
                    .ExecuteUpdateAsync(s => s
                        .SetProperty(sa => sa.SearchCount, sa => sa.SearchCount + 1)
                        .SetProperty(sa => sa.LastSearchedAt, DateTime.UtcNow));
            }
        }

        return Ok();
    }

    [HttpGet("trending-searches")]
    public async Task<IActionResult> GetTrendingSearches(int limit = 10)
    {
        var lastWeek = DateTime.UtcNow.AddDays(-7);

        var trendingSearches = await _context.SearchAnalytics
            .Where(sa => sa.LastSearchedAt >= lastWeek)
            .OrderByDescending(sa => sa.SearchCount)
            .Take(limit)
            .Select(sa => new TrendingSearchDto(
                sa.SearchTerm,
                sa.SearchCount,
                sa.LastSearchedAt
            ))
            .ToListAsync();

        return Ok(trendingSearches);
    }

    [HttpPost("categories")]
    [Authorize] // Admin only in real world, but open for now or simple Auth
    public async Task<ActionResult<CategoryDto>> CreateCategory(CreateCategoryDto dto)
    {
        var category = new Category
        {
            Name = dto.Name,
            NameAr = dto.NameAr,
            Description = dto.Description,
            DescriptionAr = dto.DescriptionAr,
            Icon = dto.Icon,
            ParentId = dto.ParentId
        };

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategories), new { id = category.Id }, 
            new CategoryDto(category.Id, category.Name, category.NameAr, category.Description, category.DescriptionAr, category.Icon, category.ParentId));
    }

    // --- Gigs ---

    [HttpGet("gigs")]
    public async Task<ActionResult<PagedResponse<GigDto>>> GetGigs(
        [FromQuery] Guid? categoryId, 
        [FromQuery] string? search, 
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] int? deliveryTime,
        [FromQuery] double? minRating,
        [FromQuery] PaginationParams pagination)
    {
        var query = _context.Gigs
            .Include(g => g.Category)
            .Include(g => g.Seller)
            .Include(g => g.Gallery)
            .Include(g => g.Packages)
            .Where(g => !g.IsDeleted && g.IsActive);

        if (categoryId.HasValue)
        {
            var categoryIds = await _context.Categories
                .Where(c => c.Id == categoryId.Value || c.ParentId == categoryId.Value)
                .Select(c => c.Id)
                .ToListAsync();
                
            query = query.Where(g => categoryIds.Contains(g.CategoryId));
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.ToLower();
            query = query.Where(g => g.Title.ToLower().Contains(s) || g.Description.ToLower().Contains(s));
        }

        // Apply price filters
        if (minPrice.HasValue)
        {
            query = query.Where(g => g.StartingPrice >= minPrice.Value);
        }
        if (maxPrice.HasValue)
        {
            query = query.Where(g => g.StartingPrice <= maxPrice.Value);
        }

        // Apply delivery time filter
        if (deliveryTime.HasValue)
        {
            query = query.Where(g => g.DeliveryTimeInDays <= deliveryTime.Value);
        }

        // Apply rating filter
        if (minRating.HasValue)
        {
            query = query.Where(g => g.AverageRating >= minRating.Value);
        }

        var totalCount = await query.CountAsync();
        var currency = await GetUserCurrency();
        
        var gigs = await query
            .OrderByDescending(g => g.CreatedAt)
            .Skip((pagination.PageNumber - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync();

        var items = new List<GigDto>();
        foreach (var g in gigs)
        {
            var packages = g.Packages.Select(p => new PackageDto(
                p.Id, p.Name, p.Description, 
                new Money(p.Price, p.Currency), 
                p.DeliveryTimeInDays
            )).ToList();
            
            items.Add(new GigDto(
                g.Id, g.Title, g.Description, g.MainImage, 
                g.Gallery.Select(m => m.Url).ToList(),
                g.CategoryId, g.Category.Name, g.SellerId, g.Seller.DisplayName ?? "Unknown",
                g.Seller.SellerLevel.ToString(),
                packages,
                g.DeliveryTimeInDays, g.AverageRating, g.ReviewCount, g.IsActive
            ));
        }

        return new PagedResponse<GigDto>(items, totalCount, pagination.PageNumber, pagination.PageSize);
    }

    [HttpGet("gigs/{id}")]
    public async Task<ActionResult<GigDto>> GetGig(Guid id)
    {
        var g = await _context.Gigs
            .Include(g => g.Category)
            .Include(g => g.Seller)
            .Include(g => g.Packages)
            .FirstOrDefaultAsync(g => g.Id == id && !g.IsDeleted);

        if (g == null) return NotFound();

        var packages = g.Packages.Select(p => new PackageDto(
            p.Id, p.Name, p.Description, 
            new Money(p.Price, p.Currency), 
            p.DeliveryTimeInDays
        )).ToList();

        var currency = await GetUserCurrency();
        var convertedPrice = await _currencyService.ConvertAsync(g.StartingPrice, "USD", currency);

        return new GigDto(
            g.Id, g.Title, g.Description, g.MainImage, 
            g.Gallery.Select(m => m.Url).ToList(),
            g.CategoryId, g.Category.Name, g.SellerId, g.Seller.DisplayName ?? "Unknown",
            g.Seller.SellerLevel.ToString(),
            packages,
            g.DeliveryTimeInDays, g.AverageRating, g.ReviewCount, g.IsActive
        );
    }

    [HttpPost("gigs")]
    [Authorize]
    public async Task<ActionResult<GigDto>> CreateGig(CreateGigDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("User profile not found");

        var gig = new Gig
        {
            Title = dto.Title,
            Description = dto.Description,
            CategoryId = dto.CategoryId,
            SellerId = profile.Id,
            StartingPrice = dto.StartingPrice,
            DeliveryTimeInDays = dto.DeliveryTimeInDays,
            MainImage = dto.MainImage
        };

        _context.Gigs.Add(gig);
        await _context.SaveChangesAsync();

        // Handle gallery images if provided
        if (dto.GalleryImages != null && dto.GalleryImages.Any())
        {
            foreach (var imageUrl in dto.GalleryImages)
            {
                var media = new Media
                {
                    FileName = Path.GetFileName(imageUrl),
                    Url = imageUrl,
                    FileType = "image",
                    OwnerId = profile.Id,
                    GigId = gig.Id
                };
                _context.Media.Add(media);
            }
            await _context.SaveChangesAsync();
        }

        return CreatedAtAction(nameof(GetGig), new { id = gig.Id }, 
            new GigDto(gig.Id, gig.Title, gig.Description, gig.MainImage, 
                dto.GalleryImages ?? new List<string>(), 
                gig.CategoryId, "", gig.SellerId, profile.DisplayName ?? "", 
                profile.SellerLevel.ToString(), new List<PackageDto>(),
                gig.DeliveryTimeInDays, gig.AverageRating, gig.ReviewCount, gig.IsActive));
    }

    [HttpGet("my-gigs")]
    [HttpGet("gigs/me")] // Alias for frontend compatibility
    [Authorize]
    public async Task<ActionResult<PagedResponse<GigDto>>> GetMyGigs([FromQuery] PaginationParams pagination)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("User profile not found");

        var query = _context.Gigs
            .Include(g => g.Category)
            .Include(g => g.Seller)
            .Include(g => g.Gallery)
            .Include(g => g.Packages)
            .Where(g => g.SellerId == profile.Id && !g.IsDeleted);

        var totalCount = await query.CountAsync();
        
        var gigs = await query
            .OrderByDescending(g => g.CreatedAt)
            .Skip((pagination.PageNumber - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync();

        var items = new List<GigDto>();
        foreach (var g in gigs)
        {
            var packages = g.Packages.Select(p => new PackageDto(
                p.Id, p.Name, p.Description, 
                new Money(p.Price, p.Currency), 
                p.DeliveryTimeInDays
            )).ToList();
            
            items.Add(new GigDto(
                g.Id, g.Title, g.Description, g.MainImage, 
                g.Gallery.Select(m => m.Url).ToList(),
                g.CategoryId, g.Category.Name, g.SellerId, g.Seller.DisplayName ?? "Unknown",
                g.Seller.SellerLevel.ToString(),
                packages,
                g.DeliveryTimeInDays, g.AverageRating, g.ReviewCount, g.IsActive
            ));
        }

        return new PagedResponse<GigDto>(items, totalCount, pagination.PageNumber, pagination.PageSize);
    }

    [HttpPut("gigs/{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateGig(Guid id, CreateGigDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("User profile not found");

        var gig = await _context.Gigs
            .Include(g => g.Gallery)
            .FirstOrDefaultAsync(g => g.Id == id && g.SellerId == profile.Id && !g.IsDeleted);

        if (gig == null) return NotFound();

        gig.Title = dto.Title;
        gig.Description = dto.Description;
        gig.CategoryId = dto.CategoryId;
        gig.StartingPrice = dto.StartingPrice;
        gig.DeliveryTimeInDays = dto.DeliveryTimeInDays;
        gig.MainImage = dto.MainImage;
        gig.UpdatedAt = DateTime.UtcNow;

        // Update gallery images
        if (dto.GalleryImages != null)
        {
            // Remove existing gallery
            _context.Media.RemoveRange(gig.Gallery);
            
            // Add new gallery images
            foreach (var imageUrl in dto.GalleryImages)
            {
                var media = new Media
                {
                    FileName = Path.GetFileName(imageUrl),
                    Url = imageUrl,
                    FileType = "image",
                    OwnerId = profile.Id,
                    GigId = gig.Id
                };
                _context.Media.Add(media);
            }
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPatch("gigs/{gigId:guid}/status")]
    [Authorize]
    public async Task<IActionResult> UpdateGigStatus([FromRoute] Guid gigId, [FromBody] UpdateGigStatusDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("User profile not found");

        var gig = await _context.Gigs
            .Include(g => g.Category)
            .Include(g => g.Seller)
            .Include(g => g.Packages)
            .Include(g => g.Gallery)
            .Include(g => g.Reviews)
            .FirstOrDefaultAsync(g => g.Id == gigId && g.SellerId == profile.Id && !g.IsDeleted);

        if (gig == null) return NotFound();

        gig.IsActive = dto.IsActive;
        gig.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        // Return the updated gig
        var packages = gig.Packages.Select(p => new PackageDto(
            p.Id, p.Name, p.Description, 
            new Money(p.Price, p.Currency), 
            p.DeliveryTimeInDays
        )).ToList();

        var currency = await GetUserCurrency();

        var updatedGig = new GigDto(
            gig.Id, 
            gig.Title, 
            gig.Description, 
            gig.MainImage, 
            gig.Gallery?.Select(m => m.Url).ToList() ?? new List<string>(),
            gig.CategoryId, 
            gig.Category.Name, 
            gig.SellerId, 
            gig.Seller.DisplayName ?? "Unknown",
            gig.Seller.SellerLevel.ToString(),
            packages,
            gig.DeliveryTimeInDays, 
            gig.AverageRating, 
            gig.ReviewCount,
            gig.IsActive
        );

        return Ok(updatedGig);
    }

    [HttpDelete("gigs/{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteGig(Guid id)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("User profile not found");

        var gig = await _context.Gigs
            .FirstOrDefaultAsync(g => g.Id == id && g.SellerId == profile.Id && !g.IsDeleted);

        if (gig == null) return NotFound();

        gig.IsDeleted = true;
        gig.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // --- Reviews ---

    [HttpGet("gigs/{gigId}/reviews")]
    public async Task<ActionResult<PagedResponse<ReviewDto>>> GetGigReviews(
        Guid gigId, 
        [FromQuery] PaginationParams pagination)
    {
        var reviews = await _context.Reviews
            .Include(r => r.Reviewer)
            .Include(r => r.Order)
            .Where(r => r.GigId == gigId)
            .OrderByDescending(r => r.CreatedAt)
            .Skip((pagination.PageNumber - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync();

        var totalCount = await _context.Reviews
            .Where(r => r.GigId == gigId)
            .CountAsync();

        var reviewDtos = reviews.Select(r => new ReviewDto(
            r.Id,
            r.GigId,
            r.OrderId,
            r.ReviewerId,
            r.Reviewer.DisplayName ?? "Anonymous",
            r.Rating,
            r.Comment,
            r.CreatedAt
        )).ToList();

        return new PagedResponse<ReviewDto>(reviewDtos, totalCount, pagination.PageNumber, pagination.PageSize);
    }

    [HttpPost("reviews")]
    [Authorize]
    public async Task<ActionResult<ReviewDto>> CreateReview(CreateReviewDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var reviewerProfile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (reviewerProfile == null) return BadRequest("User profile not found");

        // Check if order exists and belongs to the user
        var order = await _context.Orders
            .Include(o => o.Gig)
            .FirstOrDefaultAsync(o => o.Id == dto.OrderId);

        if (order == null) return NotFound("Order not found");

        // Check if user is the buyer of this order
        if (order.BuyerId != reviewerProfile.Id) return Forbid("You can only review orders you purchased");

        // Check if order is completed
        if (order.Status != OrderStatus.Completed) return BadRequest("You can only review completed orders");

        // Check if review already exists for this order
        var existingReview = await _context.Reviews
            .FirstOrDefaultAsync(r => r.OrderId == dto.OrderId);

        if (existingReview != null) return BadRequest("Review already exists for this order");

        var review = new Review
        {
            GigId = order.GigId,
            OrderId = dto.OrderId,
            ReviewerId = reviewerProfile.Id,
            RevieweeId = order.SellerId,
            Rating = dto.Rating,
            Comment = dto.Comment
        };

        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();

        // Update gig's average rating and review count
        await UpdateGigRating(order.GigId.Value);

        return CreatedAtAction(nameof(GetGigReviews), new { gigId = order.GigId }, 
            new ReviewDto(
                review.Id,
                review.GigId,
                review.OrderId,
                review.ReviewerId,
                reviewerProfile.DisplayName ?? "Anonymous",
                review.Rating,
                review.Comment,
                review.CreatedAt
            ));
    }

    [HttpGet("orders/{orderId}/review")]
    [Authorize]
    public async Task<ActionResult<ReviewDto?>> GetOrderReview(Guid orderId)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("User profile not found");

        var review = await _context.Reviews
            .Include(r => r.Reviewer)
            .FirstOrDefaultAsync(r => r.OrderId == orderId && r.ReviewerId == profile.Id);

        if (review == null) return Ok((ReviewDto?)null);

        return new ReviewDto(
            review.Id,
            review.GigId,
            review.OrderId,
            review.ReviewerId,
            review.Reviewer.DisplayName ?? "Anonymous",
            review.Rating,
            review.Comment,
            review.CreatedAt
        );
    }

    private async Task UpdateGigRating(Guid gigId)
    {
        var reviews = await _context.Reviews
            .Where(r => r.GigId == gigId)
            .ToListAsync();

        if (reviews.Any())
        {
            var averageRating = reviews.Average(r => r.Rating);
            var reviewCount = reviews.Count;

            var gig = await _context.Gigs.FindAsync(gigId);
            if (gig != null)
            {
                gig.AverageRating = Math.Round(averageRating, 1);
                gig.ReviewCount = reviewCount;
                await _context.SaveChangesAsync();
            }
        }
    }
}
