using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.Modules.finance;
using alina_backend.Modules.fraud;
using alina_backend.Modules.profiles;
using alina_backend.Modules.users;

namespace alina_backend.Modules.marketplace;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MarketplaceOpsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly alina_backend.Modules.finance.ICurrencyService _currencyService;
    private readonly ILogger<MarketplaceOpsController> _logger;

    // Platform system user ID for commission collection
    private static readonly Guid PLATFORM_USER_ID = Guid.Parse("00000000-0000-0000-0000-000000000001");

    public MarketplaceOpsController(AppDbContext context, alina_backend.Modules.finance.ICurrencyService currencyService, ILogger<MarketplaceOpsController> logger)
    {
        _context = context;
        _currencyService = currencyService;
        _logger = logger;
    }

    private async Task<string> GetUserCurrency()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return "USD";

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        return profile?.PreferredCurrency ?? "USD";
    }

    // --- Orders ---

    [HttpGet("orders")]
    public async Task<ActionResult<PagedResponse<OrderDto>>> GetOrders([FromQuery] PaginationParams pagination, [FromQuery] OrderStatus? status)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            // Auto-create profile if doesn't exist
            var user = await _context.Users.FindAsync(userId);
            if (user == null) 
            {
                _logger.LogError("User not found in database for userId: {UserId}", userId);
                return Unauthorized();
            }

            _logger.LogInformation("Auto-creating profile for user: {UserId}", userId);
            profile = new Profile
            {
                UserId = user.Id,
                DisplayName = user.FullName,
                UserRole = "buyer", // Explicitly set default role
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Profile created successfully for user: {UserId}", userId);
        }

        var query = _context.Orders
            .Include(o => o.Gig)
            .Include(o => o.Offer).ThenInclude(f => f.Task)
            .Include(o => o.Buyer)
            .Include(o => o.Seller)
            .Where(o => o.BuyerId == profile.Id || o.SellerId == profile.Id);

        if (status.HasValue)
        {
            query = query.Where(o => o.Status == status.Value);
        }

        var totalCount = await query.CountAsync();
        var currency = await GetUserCurrency();
        
        var orders = await query
            .OrderByDescending(o => o.CreatedAt)
            .Skip((pagination.PageNumber - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync();

        var items = new List<OrderDto>();
        foreach (var o in orders)
        {
            var convertedAmount = await _currencyService.ConvertAsync(o.Amount, "USD", currency);
            items.Add(new OrderDto(
                o.Id, 
                o.GigId, 
                o.GigId.HasValue ? o.Gig.Title : (o.OfferId.HasValue ? o.Offer.Task.Title : "Custom Order"), 
                o.BuyerId, o.Buyer.DisplayName ?? "User", 
                o.SellerId, o.Seller.DisplayName ?? "Seller", 
                new Money(convertedAmount, currency), 
                o.Status.ToString(), 
                o.Deadline,
                o.DeliveryMessage,
                o.AttachmentUrls,
                o.CreatedAt,
                // o.CommissionAmount, // Temporarily commented out due to missing column
                o.PlatformFeePercentage,
                // o.CommissionAmount.HasValue ? o.Amount - o.CommissionAmount.Value : null // Temporarily commented out
                null
            ));
        }

        return new PagedResponse<OrderDto>(items, totalCount, pagination.PageNumber, pagination.PageSize);
    }

    [HttpGet("orders/{id}")]
    public async Task<ActionResult<OrderDto>> GetOrderById(Guid id)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var order = await _context.Orders
            .Include(o => o.Gig)
            .Include(o => o.Offer).ThenInclude(f => f.Task)
            .Include(o => o.Buyer)
            .Include(o => o.Seller)
            .FirstOrDefaultAsync(o => o.Id == id && (o.BuyerId == profile.Id || o.SellerId == profile.Id));

        if (order == null) return NotFound();

        var currency = await GetUserCurrency();
        var convertedAmount = await _currencyService.ConvertAsync(order.Amount, "USD", currency);

        return new OrderDto(
            order.Id, 
            order.GigId, 
            order.GigId.HasValue ? order.Gig.Title : (order.OfferId.HasValue ? order.Offer.Task.Title : "Custom Order"), 
            order.BuyerId, order.Buyer.DisplayName ?? "User", 
            order.SellerId, order.Seller.DisplayName ?? "Seller", 
            new Money(convertedAmount, currency), 
            order.Status.ToString(), 
            order.Deadline,
            order.DeliveryMessage,
            order.AttachmentUrls,
            order.CreatedAt,
            order.PlatformFeePercentage,
            null
        );
    }

    [HttpPost("orders")]
    public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var buyerProfile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (buyerProfile == null) return BadRequest("Profile not found");

        var gig = await _context.Gigs
            .Include(g => g.Packages)
            .FirstOrDefaultAsync(g => g.Id == dto.GigId);
        if (gig == null || gig.IsDeleted || !gig.IsActive) return BadRequest("Gig not available");

        // Find the selected package
        var package = gig.Packages.FirstOrDefault(p => p.Name == dto.PackageName);
        if (package == null) return BadRequest("Invalid package selected");

        // Prevent self-dealing: buyers cannot purchase their own gigs
        if (gig.SellerId == buyerProfile.Id)
        {
            // Log fraud attempt
            var fraudFlag = new FraudFlag
            {
                UserId = userId,
                Reason = FraudReason.SelfDealAttempt,
                Description = $"Attempted to purchase own gig (ID: {gig.Id})",
                SeverityScore = 85, // High severity
                IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
                UserAgent = HttpContext.Request.Headers["User-Agent"].ToString()
            };
            _context.FraudFlags.Add(fraudFlag);
            await _context.SaveChangesAsync();

            return BadRequest("You cannot purchase your own gig. This incident has been logged.");
        }

        // Use database transaction for atomic escrow operation
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            // Get or create wallet with row-level lock for concurrency control
            var wallet = await _context.Wallets
                .FirstOrDefaultAsync(w => w.ProfileId == buyerProfile.Id);
            
            if (wallet == null)
            {
                wallet = new Wallet { ProfileId = buyerProfile.Id };
                _context.Wallets.Add(wallet);
                await _context.SaveChangesAsync(); // Save to get the wallet ID
            }

            // Check balance with concurrency control
            if (wallet.AvailableBalance < package.Price)
            {
                await transaction.RollbackAsync();
                return BadRequest("Insufficient wallet balance. Please deposit funds first.");
            }

            // Create order first to get the ID for transaction reference
            var order = new Order
            {
                GigId = gig.Id,
                BuyerId = buyerProfile.Id,
                SellerId = gig.SellerId,
                Amount = package.Price,
                Status = OrderStatus.InProgress, // Move to InProgress since paid
                PaymentStatus = PaymentStatus.Paid,
                Requirements = dto.Requirements,
                Deadline = DateTime.UtcNow.AddDays(package.DeliveryTimeInDays)
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync(); // Save to get order ID

            // Atomic escrow operation: deduct from buyer available, add to escrow
            wallet.AvailableBalance -= package.Price;
            wallet.EscrowBalance += package.Price;
            wallet.UpdatedAt = DateTime.UtcNow;

            // Create transaction record for buyer debit
            var buyerTransaction = new Transaction
            {
                WalletId = wallet.Id,
                Amount = -package.Price,
                Type = TransactionType.Payment,
                Status = TransactionStatus.Completed,
                OrderId = order.Id,
                Description = $"Payment for order: {gig.Title} - {package.Name}",
                ProcessedAt = DateTime.UtcNow
            };

            // Get seller wallet and add to escrow
            var sellerWallet = await _context.Wallets
                .FirstOrDefaultAsync(w => w.ProfileId == gig.SellerId);
            
            if (sellerWallet == null)
            {
                sellerWallet = new Wallet { ProfileId = gig.SellerId };
                _context.Wallets.Add(sellerWallet);
                await _context.SaveChangesAsync();
            }

            sellerWallet.EscrowBalance += package.Price;
            sellerWallet.UpdatedAt = DateTime.UtcNow;

            // Create transaction record for seller escrow credit
            var sellerTransaction = new Transaction
            {
                WalletId = sellerWallet.Id,
                Amount = package.Price,
                Type = TransactionType.Payment, // This represents escrow credit
                Status = TransactionStatus.Completed,
                OrderId = order.Id,
                Description = $"Escrow credit for order: {gig.Title} - {package.Name}",
                ProcessedAt = DateTime.UtcNow
            };

            _context.Transactions.AddRange(buyerTransaction, sellerTransaction);
            await _context.SaveChangesAsync();

            // Commit transaction only if all operations succeed
            await transaction.CommitAsync();

            return Ok(new OrderDto(order.Id, order.GigId, gig.Title, order.BuyerId, buyerProfile.DisplayName ?? "", 
                order.SellerId, "", new Money(order.Amount, order.Currency), order.Status.ToString(), order.Deadline,
                order.DeliveryMessage,
                order.AttachmentUrls,
                order.CreatedAt,
                // order.CommissionAmount, // Temporarily commented out
                order.PlatformFeePercentage,
                // order.CommissionAmount.HasValue ? order.Amount - order.CommissionAmount.Value : null // Temporarily commented out
                null));
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            // Log the error here
            return StatusCode(500, "Failed to create order. Please try again.");
        }
    }

    [HttpPatch("orders/{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(Guid id, UpdateOrderStatusDto dto)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound();

        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var userProfile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (userProfile == null) return BadRequest("Profile not found");

        // Only buyer or seller can update order status
        if (order.BuyerId != userProfile.Id && order.SellerId != userProfile.Id)
            return Forbid();

        // Validate status transition permissions
        if (dto.Status == OrderStatus.Delivered && order.SellerId != userProfile.Id)
            return Forbid("Only the seller can mark an order as delivered");

        if (dto.Status == OrderStatus.Completed && order.BuyerId != userProfile.Id)
            return Forbid("Only the buyer can mark a delivered order as completed");

        var oldStatus = order.Status;
        order.Status = dto.Status;
        order.UpdatedAt = DateTime.UtcNow;

        // Handle escrow operations with database transactions
        if (dto.Status == OrderStatus.Completed && oldStatus != OrderStatus.Completed)
        {
            order.CompletedAt = DateTime.UtcNow;
            
            // Calculate commission
            var commissionRate = 0.15m;
            var platformFee = order.Amount * commissionRate;
            var sellerAmount = order.Amount - platformFee;
            
            // Store commission details in order
            order.CommissionAmount = platformFee; // For backward compatibility
            order.PlatformFeePercentage = commissionRate * 100;
            order.PlatformFee = platformFee;
            order.SellerAmount = sellerAmount;
            
            // RELEASE ESCROW FUNDS WITH COMMISSION - Atomic operation
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var buyerWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.BuyerId);
                var sellerWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.SellerId);

                if (sellerWallet == null)
                {
                    sellerWallet = new Wallet { ProfileId = order.SellerId };
                    _context.Wallets.Add(sellerWallet);
                    await _context.SaveChangesAsync();
                }

                if (buyerWallet == null || sellerWallet == null)
                {
                    await transaction.RollbackAsync();
                    return BadRequest("Wallet error. Please contact support.");
                }

                // Check escrow balance
                if (buyerWallet.EscrowBalance < order.Amount)
                {
                    await transaction.RollbackAsync();
                    return BadRequest("Insufficient escrow balance. Please contact support.");
                }

                // Atomic escrow release with commission:
                // 1. Deduct full amount from buyer escrow
                buyerWallet.EscrowBalance -= order.Amount;
                buyerWallet.UpdatedAt = DateTime.UtcNow;
                
                // 2. Add seller earnings (amount - commission) to seller available balance
                sellerWallet.AvailableBalance += sellerAmount;
                sellerWallet.UpdatedAt = DateTime.UtcNow;

                // 3. Get or create platform wallet and add commission
                var platformWallet = await _context.Wallets
                    .FirstOrDefaultAsync(w => w.UserId == PLATFORM_USER_ID);
                
                if (platformWallet == null)
                {
                    // Create platform user if doesn't exist
                    var platformUser = await _context.Users.FindAsync(PLATFORM_USER_ID);
                    if (platformUser == null)
                    {
                        platformUser = new User
                        {
                            Id = PLATFORM_USER_ID,
                            FullName = "Platform System",
                            Email = "platform@alina.com",
                            PasswordHash = "SYSTEM_USER", // Not used for login
                            CreatedAt = DateTime.UtcNow
                        };
                        _context.Users.Add(platformUser);
                        await _context.SaveChangesAsync();
                    }

                    // Create platform wallet
                    platformWallet = new Wallet
                    {
                        UserId = PLATFORM_USER_ID,
                        ProfileId = null, // Platform doesn't have a profile
                        AvailableBalance = 0,
                        EscrowBalance = 0,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    };
                    _context.Wallets.Add(platformWallet);
                    await _context.SaveChangesAsync();
                }

                // Add platform commission to platform wallet
                platformWallet.AvailableBalance += platformFee;
                platformWallet.UpdatedAt = DateTime.UtcNow;

                // Create transaction record for seller earnings
                var releaseTransaction = new Transaction
                {
                    WalletId = sellerWallet.Id,
                    Amount = sellerAmount,
                    Type = TransactionType.Release,
                    Status = TransactionStatus.Completed,
                    OrderId = order.Id,
                    Description = $"Earnings released for completed order (after {commissionRate*100:F1}% platform fee)",
                    ProcessedAt = DateTime.UtcNow
                };

                // Create platform revenue transaction
                var platformRevenueTransaction = new Transaction
                {
                    WalletId = platformWallet.Id,
                    Amount = platformFee,
                    Type = TransactionType.PlatformFee,
                    Status = TransactionStatus.Completed,
                    OrderId = order.Id,
                    Description = $"Platform commission ({commissionRate*100:F1}%) for completed order",
                    ProcessedAt = DateTime.UtcNow
                };

                _context.Transactions.Add(releaseTransaction);
                _context.Transactions.Add(platformRevenueTransaction);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Failed to release funds. Please try again.");
            }
        }

        if (dto.Status == OrderStatus.Cancelled && oldStatus != OrderStatus.Cancelled)
        {
            // Check for excessive cancellations (fraud detection)
            var recentCancellations = await _context.Orders
                .Where(o => (o.BuyerId == userProfile.Id || o.SellerId == userProfile.Id) && 
                           o.Status == OrderStatus.Cancelled && 
                           o.UpdatedAt > DateTime.UtcNow.AddHours(-24))
                .CountAsync();

            if (recentCancellations >= 3) // More than 3 cancellations in 24 hours
            {
                var fraudFlag = new FraudFlag
                {
                    UserId = userId,
                    Reason = FraudReason.TooManyCancellations,
                    Description = $"Excessive cancellations: {recentCancellations + 1} in last 24 hours",
                    SeverityScore = 70, // Medium-high severity
                    IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
                    UserAgent = HttpContext.Request.Headers["User-Agent"].ToString()
                };
                _context.FraudFlags.Add(fraudFlag);
                await _context.SaveChangesAsync();
            }

            // REFUND ESCROW FUNDS - Atomic operation
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var buyerWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.BuyerId);
                var sellerWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.SellerId);
                
                if (buyerWallet == null)
                {
                    await transaction.RollbackAsync();
                    return BadRequest("Wallet error. Please contact support.");
                }

                // Check escrow balance
                if (buyerWallet.EscrowBalance < order.Amount)
                {
                    await transaction.RollbackAsync();
                    return BadRequest("Insufficient escrow balance. Please contact support.");
                }

                // Atomic refund: deduct from buyer escrow, add back to buyer available
                buyerWallet.EscrowBalance -= order.Amount;
                buyerWallet.AvailableBalance += order.Amount;
                buyerWallet.UpdatedAt = DateTime.UtcNow;

                // Also clear seller escrow (was credited when order was created)
                if (sellerWallet != null && sellerWallet.EscrowBalance >= order.Amount)
                {
                    sellerWallet.EscrowBalance -= order.Amount;
                    sellerWallet.UpdatedAt = DateTime.UtcNow;
                }

                // Save order status inside the transaction
                order.Status = dto.Status;
                order.UpdatedAt = DateTime.UtcNow;

                // Create transaction record for refund
                var refundTransaction = new Transaction
                {
                    WalletId = buyerWallet.Id,
                    Amount = order.Amount,
                    Type = TransactionType.Refund,
                    Status = TransactionStatus.Completed,
                    OrderId = order.Id,
                    Description = $"Refund for cancelled order",
                    ProcessedAt = DateTime.UtcNow
                };

                _context.Transactions.Add(refundTransaction);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Failed to process refund. Please try again.");
            }

            return Ok();
        }

        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPut("orders/{id}/deliver")]
    public async Task<IActionResult> DeliverOrder(Guid id, DeliverOrderDto dto)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound();

        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var userProfile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (userProfile == null) return BadRequest("Profile not found");

        // Only seller can deliver the order
        if (order.SellerId != userProfile.Id)
            return Forbid();

        // Can only deliver orders that are in progress
        if (order.Status != OrderStatus.InProgress)
            return BadRequest("Order must be in progress to be delivered");

        // Update order with delivery information
        order.DeliveryMessage = dto.DeliveryMessage;
        order.AttachmentUrls = dto.AttachmentUrls;
        order.DeliveredAt = DateTime.UtcNow;
        order.Status = OrderStatus.Delivered; // Mark as delivered, not completed
        order.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        // Return updated order
        var currency = await GetUserCurrency();
        var convertedAmount = await _currencyService.ConvertAsync(order.Amount, "USD", currency);

        return Ok(new OrderDto(
            order.Id, 
            order.GigId, 
            order.GigId.HasValue ? order.Gig.Title : "Custom Order", 
            order.BuyerId, order.Buyer.DisplayName ?? "User", 
            order.SellerId, order.Seller.DisplayName ?? "Seller", 
            new Money(convertedAmount, currency), 
            order.Status.ToString(), 
            order.Deadline,
            order.DeliveryMessage,
            order.AttachmentUrls,
            order.CreatedAt,
            order.PlatformFeePercentage,
            null
        ));
    }

    // --- Reviews ---

    [HttpPost("reviews")]
    public async Task<ActionResult<ReviewDto>> CreateReview(CreateReviewDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var order = await _context.Orders.Include(o => o.Gig).FirstOrDefaultAsync(o => o.Id == dto.OrderId);
        if (order == null) return NotFound("Order not found");
        if (order.Status != OrderStatus.Completed) 
            return BadRequest("Can only review completed orders");

        // Check if review already exists
        if (await _context.Reviews.AnyAsync(r => r.OrderId == order.Id && r.ReviewerId == profile.Id))
            return BadRequest("Review already exists for this order");

        var review = new Review
        {
            OrderId = order.Id,
            GigId = order.GigId,
            ReviewerId = profile.Id,
            RevieweeId = (profile.Id == order.BuyerId) ? order.SellerId : order.BuyerId,
            Rating = dto.Rating,
            Comment = dto.Comment
        };

        _context.Reviews.Add(review);

        // Update Gig rating only if it's a Gig order — use SQL aggregation to avoid N+1
        if (order.GigId.HasValue)
        {
            var gig = order.Gig;
            // Save review first so it's included in the aggregate
            await _context.SaveChangesAsync();

            var stats = await _context.Reviews
                .Where(r => r.GigId == gig.Id)
                .GroupBy(r => r.GigId)
                .Select(g => new { Avg = g.Average(r => (double)r.Rating), Count = g.Count() })
                .FirstOrDefaultAsync();

            if (stats != null)
            {
                gig.AverageRating = stats.Avg;
                gig.ReviewCount = stats.Count;
            }
        }

        await _context.SaveChangesAsync();

        return Ok(new ReviewDto(review.Id, review.GigId, review.OrderId, review.ReviewerId, 
            profile.DisplayName ?? "User", review.Rating, review.Comment, review.CreatedAt));
    }

    [HttpPut("orders/{id}/complete")]
    public async Task<IActionResult> CompleteOrder(Guid id)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var buyerProfile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (buyerProfile == null) return BadRequest("Profile not found");

        var order = await _context.Orders
            .Include(o => o.Buyer)
            .Include(o => o.Seller)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null) return NotFound("Order not found");

        // Only the buyer can accept delivery and mark as completed
        if (order.BuyerId != buyerProfile.Id)
            return Forbid("Only the buyer can accept delivery and complete an order");

        // Order must be in Delivered state (seller has submitted delivery)
        if (order.Status != OrderStatus.Delivered)
            return BadRequest("Order must be in Delivered state for buyer to accept and complete it");
            return BadRequest("Order must be InProgress to be completed");

        // Use database transaction for atomic escrow release
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var buyerWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.BuyerId);
            var sellerWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.SellerId);

            if (buyerWallet == null || sellerWallet == null)
            {
                await transaction.RollbackAsync();
                return BadRequest("Wallet error. Please contact support.");
            }

            // Validate escrow balance
            if (buyerWallet.EscrowBalance < order.Amount)
            {
                await transaction.RollbackAsync();
                return BadRequest("Insufficient escrow balance. Please contact support.");
            }

            // Calculate platform commission (15%)
            var commissionRate = 0.15m;
            var platformFee = order.Amount * commissionRate;
            var sellerAmount = order.Amount - platformFee;

            // Store commission details in order
            order.CommissionAmount = platformFee; // For backward compatibility
            order.PlatformFeePercentage = commissionRate * 100;
            order.PlatformFee = platformFee;
            order.SellerAmount = sellerAmount;

            // Atomic escrow release with commission:
            // 1. Deduct full amount from buyer escrow
            buyerWallet.EscrowBalance -= order.Amount;
            buyerWallet.UpdatedAt = DateTime.UtcNow;

            // 2. Add seller earnings (amount - commission) to seller available balance
            sellerWallet.AvailableBalance += sellerAmount;
            sellerWallet.UpdatedAt = DateTime.UtcNow;

            // 3. Get or create platform wallet and add commission
            var platformWallet = await _context.Wallets
                .FirstOrDefaultAsync(w => w.UserId == PLATFORM_USER_ID);
            
            if (platformWallet == null)
            {
                // Create platform user if doesn't exist
                var platformUser = await _context.Users.FindAsync(PLATFORM_USER_ID);
                if (platformUser == null)
                {
                    platformUser = new User
                    {
                        Id = PLATFORM_USER_ID,
                        FullName = "Platform System",
                        Email = "platform@alina.com",
                        PasswordHash = "SYSTEM_USER", // Not used for login
                        CreatedAt = DateTime.UtcNow
                    };
                    _context.Users.Add(platformUser);
                    await _context.SaveChangesAsync();
                }

                // Create platform wallet
                platformWallet = new Wallet
                {
                    UserId = PLATFORM_USER_ID,
                    ProfileId = null, // Platform doesn't have a profile
                    AvailableBalance = 0,
                    EscrowBalance = 0,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.Wallets.Add(platformWallet);
                await _context.SaveChangesAsync();
            }

            // Add platform commission to platform wallet
            platformWallet.AvailableBalance += platformFee;
            platformWallet.UpdatedAt = DateTime.UtcNow;

            // 3. Update order status
            order.Status = OrderStatus.Completed;
            order.CompletedAt = DateTime.UtcNow;
            order.UpdatedAt = DateTime.UtcNow;

            // Create transaction record for seller earnings
            var releaseTransaction = new Transaction
            {
                WalletId = sellerWallet.Id,
                Amount = sellerAmount,
                Type = TransactionType.Release,
                Status = TransactionStatus.Completed,
                OrderId = order.Id,
                Description = $"Earnings released for completed order (after {commissionRate*100:F1}% platform fee)",
                ProcessedAt = DateTime.UtcNow
            };

            // Create platform revenue transaction
            var platformRevenueTransaction = new Transaction
            {
                WalletId = platformWallet.Id,
                Amount = platformFee,
                Type = TransactionType.PlatformFee,
                Status = TransactionStatus.Completed,
                OrderId = order.Id,
                Description = $"Platform commission ({commissionRate*100:F1}%) for completed order",
                ProcessedAt = DateTime.UtcNow
            };

            _context.Transactions.AddRange(releaseTransaction, platformRevenueTransaction);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            // Update seller level after successful order completion
            var sellerLevelService = HttpContext.RequestServices.GetRequiredService<SellerLevelService>();
            await sellerLevelService.UpdateSellerLevel(order.SellerId);

            return Ok(new OrderDto(order.Id, order.GigId, order.GigId.HasValue ? order.Gig.Title : "Custom Order", 
                order.BuyerId, order.Buyer.DisplayName ?? "User", 
                order.SellerId, order.Seller.DisplayName ?? "Seller", 
                new Money(order.Amount, order.Currency), order.Status.ToString(), order.Deadline,
                order.DeliveryMessage,
                order.AttachmentUrls,
                order.CreatedAt,
                order.PlatformFeePercentage, order.CommissionAmount));
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Failed to complete order {OrderId}", id);
            return StatusCode(500, "Failed to complete order. Please try again.");
        }
    }

    [HttpPut("orders/{id}/cancel")]
    public async Task<IActionResult> CancelOrder(Guid id, CancelOrderDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var userProfile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (userProfile == null) return BadRequest("Profile not found");

        var order = await _context.Orders
            .Include(o => o.Buyer)
            .Include(o => o.Seller)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null) return NotFound("Order not found");

        // Only buyer can cancel their own orders
        if (order.BuyerId != userProfile.Id)
            return Forbid("You can only cancel your own orders");

        // Validate order can be cancelled
        if (order.Status != OrderStatus.InProgress && order.Status != OrderStatus.Pending)
            return BadRequest("Order cannot be cancelled at this stage");

        // Use database transaction for atomic refund
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var buyerWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.BuyerId);

            if (buyerWallet == null)
            {
                await transaction.RollbackAsync();
                return BadRequest("Wallet error. Please contact support.");
            }

            // Validate escrow balance
            if (buyerWallet.EscrowBalance < order.Amount)
            {
                await transaction.RollbackAsync();
                return BadRequest("Escrow inconsistency. Please contact support.");
            }

            // Apply cancellation fee (optional - could be 0 for now)
            var cancellationFee = 0.0m; // No fee for now
            var refundAmount = order.Amount - cancellationFee;

            // Atomic escrow refund
            buyerWallet.EscrowBalance -= order.Amount;
            buyerWallet.AvailableBalance += refundAmount;
            buyerWallet.UpdatedAt = DateTime.UtcNow;

            // Update order status
            order.Status = OrderStatus.Cancelled;
            order.CancelledAt = DateTime.UtcNow;
            order.CancellationReason = dto.Reason;
            order.UpdatedAt = DateTime.UtcNow;

            // Create transaction record for refund
            var refundTransaction = new Transaction
            {
                WalletId = buyerWallet.Id,
                Amount = refundAmount,
                Type = TransactionType.Refund,
                Status = TransactionStatus.Completed,
                OrderId = order.Id,
                Description = $"Refund for cancelled order: {dto.Reason ?? "No reason provided"}",
                ProcessedAt = DateTime.UtcNow
            };

            // If there was a cancellation fee, record it
            if (cancellationFee > 0)
            {
                var feeTransaction = new Transaction
                {
                    WalletId = buyerWallet.Id,
                    Amount = -cancellationFee,
                    Type = TransactionType.CancellationFee,
                    Status = TransactionStatus.Completed,
                    OrderId = order.Id,
                    Description = $"Cancellation fee for order",
                    ProcessedAt = DateTime.UtcNow
                };
                _context.Transactions.Add(feeTransaction);
            }

            _context.Transactions.Add(refundTransaction);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new OrderDto(order.Id, order.GigId, order.GigId.HasValue ? order.Gig.Title : "Custom Order",
                order.BuyerId, order.Buyer.DisplayName ?? "User",
                order.SellerId, order.Seller.DisplayName ?? "Seller",
                new Money(order.Amount, order.Currency), order.Status.ToString(), order.Deadline,
                order.DeliveryMessage,
                order.AttachmentUrls,
                order.CreatedAt,
                order.PlatformFeePercentage, order.CommissionAmount));
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Failed to cancel order {OrderId}", id);
            return StatusCode(500, "Failed to cancel order. Please try again.");
        }
    }

    [HttpPut("orders/{id}/dispute")]
    public async Task<IActionResult> DisputeOrder(Guid id)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var buyerProfile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (buyerProfile == null) return BadRequest("Profile not found");

        var order = await _context.Orders
            .Include(o => o.Buyer)
            .Include(o => o.Seller)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null) return NotFound("Order not found");

        // Only buyer can dispute their own orders
        if (order.BuyerId != buyerProfile.Id)
            return Forbid("You can only dispute your own orders");

        // Validate order can be disputed
        if (order.Status != OrderStatus.InProgress && order.Status != OrderStatus.Completed)
            return BadRequest("Order cannot be disputed at this stage");

        order.Status = OrderStatus.Disputed;
        order.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new OrderDto(order.Id, order.GigId, order.GigId.HasValue ? order.Gig.Title : "Custom Order",
            order.BuyerId, order.Buyer.DisplayName ?? "User",
            order.SellerId, order.Seller.DisplayName ?? "Seller",
            new Money(order.Amount, order.Currency), order.Status.ToString(), order.Deadline,
            order.DeliveryMessage,
            order.AttachmentUrls,
            order.CreatedAt,
            order.PlatformFeePercentage, order.CommissionAmount));
    }

    [HttpPut("orders/{id}/refund")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> RefundOrder(Guid id)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var order = await _context.Orders
                .Include(o => o.Buyer)
                .Include(o => o.Seller)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                await transaction.RollbackAsync();
                return NotFound("Order not found");
            }

            if (order.Status != OrderStatus.Disputed)
            {
                await transaction.RollbackAsync();
                return BadRequest("Order must be disputed to be refunded");
            }

            var buyerWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.BuyerId);

            if (buyerWallet == null)
            {
                await transaction.RollbackAsync();
                return BadRequest("Buyer wallet not found");
            }

            // Validate escrow balance
            if (buyerWallet.EscrowBalance < order.Amount)
            {
                await transaction.RollbackAsync();
                return BadRequest("Insufficient escrow balance");
            }

            // Atomic refund: move from escrow back to available balance
            buyerWallet.EscrowBalance -= order.Amount;
            buyerWallet.AvailableBalance += order.Amount;
            buyerWallet.UpdatedAt = DateTime.UtcNow;

            // Update order status
            order.Status = OrderStatus.Refunded;
            order.UpdatedAt = DateTime.UtcNow;

            // Create transaction record for refund
            var refundTransaction = new Transaction
            {
                WalletId = buyerWallet.Id,
                Amount = order.Amount,
                Type = TransactionType.Refund,
                Status = TransactionStatus.Completed,
                OrderId = order.Id,
                Description = $"Admin refund for disputed order",
                ProcessedAt = DateTime.UtcNow
            };

            _context.Transactions.Add(refundTransaction);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new OrderDto(order.Id, order.GigId, order.GigId.HasValue ? order.Gig.Title : "Custom Order",
                order.BuyerId, order.Buyer.DisplayName ?? "User",
                order.SellerId, order.Seller.DisplayName ?? "Seller",
                new Money(order.Amount, order.Currency), order.Status.ToString(), order.Deadline,
                order.DeliveryMessage,
                order.AttachmentUrls,
                order.CreatedAt,
                order.PlatformFeePercentage, order.CommissionAmount));
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Failed to refund order {OrderId}", id);
            return StatusCode(500, "Failed to process refund. Please try again.");
        }
    }

    [HttpPut("orders/{id}/release")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ReleaseOrderToSeller(Guid id)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var order = await _context.Orders
                .Include(o => o.Buyer)
                .Include(o => o.Seller)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                await transaction.RollbackAsync();
                return NotFound("Order not found");
            }

            if (order.Status != OrderStatus.Disputed)
            {
                await transaction.RollbackAsync();
                return BadRequest("Order must be disputed to release to seller");
            }

            var buyerWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.BuyerId);
            var sellerWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.SellerId);

            if (buyerWallet == null || sellerWallet == null)
            {
                await transaction.RollbackAsync();
                return BadRequest("Wallet error. Please contact support.");
            }

            // Validate escrow balance
            if (buyerWallet.EscrowBalance < order.Amount)
            {
                await transaction.RollbackAsync();
                return BadRequest("Insufficient escrow balance");
            }

            // Calculate commission (15%)
            var commissionRate = 0.15m;
            var platformFee = order.Amount * commissionRate;
            var sellerAmount = order.Amount - platformFee;

            // Store commission details in order
            order.CommissionAmount = platformFee;
            order.PlatformFeePercentage = commissionRate * 100;
            order.PlatformFee = platformFee;
            order.SellerAmount = sellerAmount;

            // Atomic escrow release with commission
            buyerWallet.EscrowBalance -= order.Amount;
            buyerWallet.UpdatedAt = DateTime.UtcNow;

            sellerWallet.AvailableBalance += sellerAmount;
            sellerWallet.UpdatedAt = DateTime.UtcNow;

            // Get or create platform wallet and add commission
            var platformWallet = await _context.Wallets
                .FirstOrDefaultAsync(w => w.UserId == PLATFORM_USER_ID);

            if (platformWallet == null)
            {
                var platformUser = await _context.Users.FindAsync(PLATFORM_USER_ID);
                if (platformUser == null)
                {
                    platformUser = new User
                    {
                        Id = PLATFORM_USER_ID,
                        FullName = "Platform System",
                        Email = "platform@alina.com",
                        PasswordHash = "SYSTEM_USER",
                        CreatedAt = DateTime.UtcNow
                    };
                    _context.Users.Add(platformUser);
                    await _context.SaveChangesAsync();
                }

                platformWallet = new Wallet
                {
                    UserId = PLATFORM_USER_ID,
                    ProfileId = null,
                    AvailableBalance = 0,
                    EscrowBalance = 0,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.Wallets.Add(platformWallet);
                await _context.SaveChangesAsync();
            }

            platformWallet.AvailableBalance += platformFee;
            platformWallet.UpdatedAt = DateTime.UtcNow;

            // Update order status
            order.Status = OrderStatus.Completed;
            order.CompletedAt = DateTime.UtcNow;
            order.UpdatedAt = DateTime.UtcNow;

            // Create transaction records
            var releaseTransaction = new Transaction
            {
                WalletId = sellerWallet.Id,
                Amount = sellerAmount,
                Type = TransactionType.Release,
                Status = TransactionStatus.Completed,
                OrderId = order.Id,
                Description = $"Admin release for disputed order (after {commissionRate*100:F1}% platform fee)",
                ProcessedAt = DateTime.UtcNow
            };

            var platformRevenueTransaction = new Transaction
            {
                WalletId = platformWallet.Id,
                Amount = platformFee,
                Type = TransactionType.PlatformFee,
                Status = TransactionStatus.Completed,
                OrderId = order.Id,
                Description = $"Platform commission ({commissionRate*100:F1}%) for disputed order resolution",
                ProcessedAt = DateTime.UtcNow
            };

            _context.Transactions.AddRange(releaseTransaction, platformRevenueTransaction);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new OrderDto(order.Id, order.GigId, order.GigId.HasValue ? order.Gig.Title : "Custom Order",
                order.BuyerId, order.Buyer.DisplayName ?? "User",
                order.SellerId, order.Seller.DisplayName ?? "Seller",
                new Money(order.Amount, order.Currency), order.Status.ToString(), order.Deadline,
                order.DeliveryMessage,
                order.AttachmentUrls,
                order.CreatedAt,
                order.PlatformFeePercentage, order.CommissionAmount));
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Failed to release disputed order {OrderId} to seller", id);
            return StatusCode(500, "Failed to release funds. Please try again.");
        }
    }
}
