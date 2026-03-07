using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace alina_backend.Modules.support;

[ApiController]
[Route("api/support")]
[Authorize]
public class SupportController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<SupportController> _logger;

    public SupportController(AppDbContext context, ILogger<SupportController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpPost("ticket")]
    public async Task<IActionResult> CreateSupportTicket([FromBody] CreateSupportTicketRequest request)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        if (string.IsNullOrWhiteSpace(request.Subject) || string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest(new { error = "invalid_request", error_description = "Subject and message are required" });
        }

        var ticket = new SupportTicket
        {
            UserId = userId,
            Subject = request.Subject.Trim(),
            Message = request.Message.Trim(),
            Status = "Open"
        };

        _context.SupportTickets.Add(ticket);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Support ticket created by user {UserId}: {Subject}", userId, ticket.Subject);

        return Ok(new
        {
            ticket.Id,
            ticket.Subject,
            ticket.Status,
            ticket.CreatedAt,
            message = "Support ticket created successfully"
        });
    }

    [HttpGet("tickets")]
    public async Task<IActionResult> GetUserTickets()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var tickets = await _context.SupportTickets
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new
            {
                t.Id,
                t.Subject,
                t.Status,
                t.CreatedAt,
                t.UpdatedAt
            })
            .ToListAsync();

        return Ok(tickets);
    }
}

public class CreateSupportTicketRequest
{
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}