using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.Modules.finance;

namespace alina_backend.Modules.marketplace;

[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ICurrencyService _currencyService;

    public TaskController(AppDbContext context, ICurrencyService currencyService)
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

    [HttpGet]
    public async Task<ActionResult<PagedResponse<UserTaskDto>>> GetTasks([FromQuery] Guid? categoryId, [FromQuery] TaskStatus? status, [FromQuery] string? search, [FromQuery] TaskType? type, [FromQuery] PaginationParams pagination)
    {
        var query = _context.UserTasks
            .Include(t => t.Category)
            .Include(t => t.Poster)
            .Include(t => t.Offers)
            .Where(t => !t.IsDeleted);

        if (categoryId.HasValue)
        {
            var categoryIds = await _context.Categories
                .Where(c => c.Id == categoryId.Value || c.ParentId == categoryId.Value)
                .Select(c => c.Id)
                .ToListAsync();

            query = query.Where(t => categoryIds.Contains(t.CategoryId));
        }
        if (status.HasValue) query = query.Where(t => t.Status == status.Value);
        else query = query.Where(t => t.Status == TaskStatus.Open);
        
        if (type.HasValue) query = query.Where(t => t.Type == type.Value);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.ToLower();
            query = query.Where(t => t.Title.ToLower().Contains(s) || t.Description.ToLower().Contains(s) || (t.Location != null && t.Location.ToLower().Contains(s)));
        }

        var totalCount = await query.CountAsync();
        var currency = await GetUserCurrency();

        var tasks = await query
            .OrderByDescending(t => t.CreatedAt)
            .Skip((pagination.PageNumber - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync();

        var items = new List<UserTaskDto>();
        foreach (var t in tasks)
        {
            var convertedBudget = await _currencyService.ConvertAsync(t.Budget, "USD", currency);
            items.Add(new UserTaskDto(
                t.Id, t.Title, t.Description, t.Type.ToString(), t.Location, 
                new Money(convertedBudget, currency), 
                t.Deadline, t.Status.ToString(), t.PosterId, t.Poster.DisplayName ?? "User", 
                t.CategoryId, t.Category.Name, t.AssignedTaskerId, t.Offers.Count, t.CreatedAt
            ));
        }

        return new PagedResponse<UserTaskDto>(items, totalCount, pagination.PageNumber, pagination.PageSize);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserTaskDto>> GetTask(Guid id)
    {
        var t = await _context.UserTasks
            .Include(t => t.Category)
            .Include(t => t.Poster)
            .Include(t => t.Offers)
            .Include(t => t.Attachments)
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);

        if (t == null) return NotFound();

        var currency = await GetUserCurrency();
        var convertedBudget = await _currencyService.ConvertAsync(t.Budget, "USD", currency);

        return new UserTaskDto(
            t.Id, t.Title, t.Description, t.Type.ToString(), t.Location, 
            new Money(convertedBudget, currency), 
            t.Deadline, t.Status.ToString(), t.PosterId, t.Poster.DisplayName ?? "User", 
            t.CategoryId, t.Category.Name, t.AssignedTaskerId, t.Offers.Count, t.CreatedAt
        );
    }

    [HttpGet("{taskId}/attachments")]
    public async Task<ActionResult<IEnumerable<MediaDto>>> GetTaskAttachments(Guid taskId)
    {
        var task = await _context.UserTasks
            .Include(t => t.Attachments).ThenInclude(m => m.Owner)
            .FirstOrDefaultAsync(t => t.Id == taskId && !t.IsDeleted);

        if (task == null) return NotFound();

        var attachments = task.Attachments.Select(m => new MediaDto(
            m.Id,
            m.FileName,
            m.Url,
            m.FileType,
            m.FileSize,
            m.Owner?.DisplayName ?? "Unknown",
            m.CreatedAt
        ));

        return Ok(attachments);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<UserTaskDto>> CreateTask(CreateUserTaskDto dto)
    {
        if (dto.Type == TaskType.InPerson && string.IsNullOrWhiteSpace(dto.Location))
        {
            return BadRequest("Location is required for in-person tasks.");
        }

        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var task = new UserTask
        {
            Title = dto.Title,
            Description = dto.Description,
            Type = dto.Type,
            Location = dto.Type == TaskType.Remote ? "Remote" : dto.Location,
            Budget = dto.Budget,
            Deadline = dto.Deadline,
            CategoryId = dto.CategoryId,
            PosterId = profile.Id,
            Status = TaskStatus.Open
        };

        _context.UserTasks.Add(task);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, 
            new UserTaskDto(task.Id, task.Title, task.Description, task.Type.ToString(), task.Location, new Money(task.Budget, task.Currency), 
                task.Deadline, task.Status.ToString(), task.PosterId, profile.DisplayName ?? "", 
                task.CategoryId, "", task.AssignedTaskerId, 0, task.CreatedAt));
    }

    // --- Offers ---

    [HttpGet("{taskId}/offers")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffers(Guid taskId)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var task = await _context.UserTasks.FindAsync(taskId);
        if (task == null) return NotFound();

        // Only poster or taskers who applied (or everyone if open marketplace) can see offers? 
        // Typically only the poster sees all offers. Taskers see their own.
        var query = _context.Offers
            .Include(o => o.Tasker)
            .Where(o => o.TaskId == taskId);

        if (task.PosterId != profile.Id)
        {
            query = query.Where(o => o.TaskerId == profile.Id);
        }

        var currency = await GetUserCurrency();
        var offers = await query.ToListAsync();
        var items = new List<OfferDto>();

        foreach (var o in offers)
        {
            var convertedPrice = await _currencyService.ConvertAsync(o.Price, "USD", currency);
            items.Add(new OfferDto(o.Id, o.TaskId, o.TaskerId, o.Tasker.DisplayName ?? "Tasker", 
                new Money(convertedPrice, currency), o.Message, o.Status.ToString(), o.CreatedAt));
        }

        return items;
    }

    [HttpPost("{taskId}/offers")]
    [Authorize]
    public async Task<ActionResult<OfferDto>> CreateOffer(Guid taskId, CreateOfferDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var task = await _context.UserTasks.FindAsync(taskId);
        if (task == null) return NotFound();
        if (task.Status != TaskStatus.Open) return BadRequest("Task is no longer open for offers");

        var offer = new Offer
        {
            TaskId = taskId,
            TaskerId = profile.Id,
            Price = dto.Price,
            Message = dto.Message,
            Status = OfferStatus.Pending
        };

        _context.Offers.Add(offer);
        await _context.SaveChangesAsync();

        return Ok(new OfferDto(offer.Id, offer.TaskId, offer.TaskerId, profile.DisplayName ?? "", new Money(offer.Price, offer.Currency), offer.Message, offer.Status.ToString(), offer.CreatedAt));
    }

    [HttpPost("offers/{offerId}/accept")]
    [Authorize]
    public async Task<IActionResult> AcceptOffer(Guid offerId)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var offer = await _context.Offers.Include(o => o.Task).FirstOrDefaultAsync(o => o.Id == offerId);
        if (offer == null) return NotFound();
        if (offer.Task.PosterId != profile.Id) return Forbid();

        offer.Status = OfferStatus.Accepted;
        offer.Task.Status = TaskStatus.Assigned;
        offer.Task.AssignedTaskerId = offer.TaskerId;

        // Wallet Logic
        var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == profile.Id);
        if (wallet == null)
        {
            wallet = new Wallet { ProfileId = profile.Id };
            _context.Wallets.Add(wallet);
        }

        if (wallet.AvailableBalance < offer.Price)
        {
            return BadRequest("Insufficient wallet balance. Please deposit funds first.");
        }

        // Deduct and Escrow
        wallet.AvailableBalance -= offer.Price;
        wallet.EscrowBalance += offer.Price;

        // Reject other offers
        var otherOffers = await _context.Offers.Where(o => o.TaskId == offer.TaskId && o.Id != offerId).ToListAsync();
        otherOffers.ForEach(o => o.Status = OfferStatus.Rejected);

        // Create Order
        var order = new Order
        {
            OfferId = offer.Id,
            BuyerId = offer.Task.PosterId,
            SellerId = offer.TaskerId,
            Amount = offer.Price,
            Status = OrderStatus.InProgress,
            PaymentStatus = PaymentStatus.Paid,
            Deadline = offer.Task.Deadline
        };

        var transaction = new Transaction
        {
            WalletId = wallet.Id,
            Amount = -offer.Price,
            Type = TransactionType.Payment,
            Status = TransactionStatus.Completed,
            OrderId = order.Id,
            Description = $"Payment for job task: {offer.Task.Title}"
        };

        _context.Orders.Add(order);
        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return Ok(new { OrderId = order.Id });
    }
}
