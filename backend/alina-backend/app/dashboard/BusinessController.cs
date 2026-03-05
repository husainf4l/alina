using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.app.business;

namespace alina_backend.app.dashboard;

[ApiController]
[Route("api/seller/[controller]")]
[Authorize]
public class BusinessController : ControllerBase
{
    private readonly AppDbContext _context;

    public BusinessController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("schedule")]
    public async Task<ActionResult<List<ScheduleSlotDto>>> GetSellerSchedule([FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var query = _context.ScheduleSlots
            .Where(s => s.SellerId == userId);

        if (startDate.HasValue)
        {
            query = query.Where(s => s.Date >= startDate.Value);
        }

        if (endDate.HasValue)
        {
            query = query.Where(s => s.Date <= endDate.Value);
        }

        var slots = await query
            .OrderBy(s => s.Date)
            .ThenBy(s => s.StartTime)
            .Select(s => new ScheduleSlotDto
            {
                Id = s.Id,
                Date = s.Date,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                IsAvailable = s.Status == AppointmentStatus.Available,
                IsBooked = s.Status == AppointmentStatus.Booked,
                BookedBy = s.BuyerId != null ? s.BuyerId.ToString() : null  // Return BuyerId as string
            })
            .ToListAsync();

        return Ok(slots);
    }

    [HttpPost("schedule")]
    public async Task<ActionResult<ScheduleSlotDto>> CreateScheduleSlot([FromBody] CreateScheduleSlotDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var slot = new ScheduleSlot
        {
            SellerId = userId,
            Date = dto.Date,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime,
            Status = dto.IsAvailable ? AppointmentStatus.Available : AppointmentStatus.Available,
            DurationMinutes = (int)(dto.EndTime - dto.StartTime).TotalMinutes
        };

        _context.ScheduleSlots.Add(slot);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSellerSchedule), new { id = slot.Id }, new ScheduleSlotDto
        {
            Id = slot.Id,
            Date = slot.Date,
            StartTime = slot.StartTime,
            EndTime = slot.EndTime,
            IsAvailable = dto.IsAvailable,
            IsBooked = false
        });
    }

    [HttpPut("schedule/{slotId}")]
    public async Task<IActionResult> UpdateScheduleSlot(Guid slotId, [FromBody] UpdateScheduleSlotDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var slot = await _context.ScheduleSlots
            .FirstOrDefaultAsync(s => s.Id == slotId && s.SellerId == userId);

        if (slot == null)
        {
            return NotFound();
        }

        slot.Status = dto.IsAvailable ? AppointmentStatus.Available : AppointmentStatus.Available;
        slot.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Schedule slot updated successfully" });
    }

    [HttpGet("availability")]
    public async Task<ActionResult<AvailabilitySettingsDto>> GetAvailabilitySettings()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var settings = await _context.AvailabilitySettings
            .FirstOrDefaultAsync(a => a.SellerId == userId);

        if (settings == null)
        {
            // Create default settings
            settings = new AvailabilitySetting
            {
                SellerId = userId
            };
            _context.AvailabilitySettings.Add(settings);
            await _context.SaveChangesAsync();
        }

        return Ok(new AvailabilitySettingsDto
        {
            WorkingDays = System.Text.Json.JsonSerializer.Deserialize<List<string>>(settings.WorkingDays) ?? new List<string>(),
            WorkingHoursStart = settings.WorkingHoursStart,
            WorkingHoursEnd = settings.WorkingHoursEnd,
            Timezone = settings.Timezone,
            BufferTime = settings.BufferTimeMinutes,
            MaxAdvanceBooking = settings.MaxAdvanceBookingDays
        });
    }

    [HttpPut("availability")]
    public async Task<IActionResult> UpdateAvailabilitySettings([FromBody] AvailabilitySettingsDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var settings = await _context.AvailabilitySettings
            .FirstOrDefaultAsync(a => a.SellerId == userId);

        if (settings == null)
        {
            settings = new AvailabilitySetting
            {
                SellerId = userId
            };
            _context.AvailabilitySettings.Add(settings);
        }

        settings.WorkingDays = System.Text.Json.JsonSerializer.Serialize(dto.WorkingDays);
        settings.WorkingHoursStart = dto.WorkingHoursStart;
        settings.WorkingHoursEnd = dto.WorkingHoursEnd;
        settings.Timezone = dto.Timezone;
        settings.BufferTimeMinutes = dto.BufferTime;
        settings.MaxAdvanceBookingDays = dto.MaxAdvanceBooking;
        settings.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Availability settings updated successfully" });
    }

    [HttpGet("tools")]
    public async Task<ActionResult<List<BusinessToolDto>>> GetBusinessTools()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var tools = await _context.BusinessToolSettings
            .Where(t => t.SellerId == userId)
            .Select(t => new BusinessToolDto
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description ?? string.Empty,
                IsEnabled = t.IsEnabled,
                UsageCount = t.UsageCount
            })
            .ToListAsync();

        // If no tools exist, create default ones
        if (!tools.Any())
        {
            var defaultTools = new[]
            {
                new BusinessToolSetting
                {
                    SellerId = userId,
                    ToolType = BusinessToolType.InvoiceGenerator,
                    Name = "Invoice Generator",
                    Description = "Generate professional invoices for your clients",
                    IsEnabled = true
                },
                new BusinessToolSetting
                {
                    SellerId = userId,
                    ToolType = BusinessToolType.ContractBuilder,
                    Name = "Contract Builder",
                    Description = "Create custom contracts for your services",
                    IsEnabled = true
                },
                new BusinessToolSetting
                {
                    SellerId = userId,
                    ToolType = BusinessToolType.TimeTracker,
                    Name = "Time Tracker",
                    Description = "Track time spent on projects",
                    IsEnabled = false
                }
            };

            _context.BusinessToolSettings.AddRange(defaultTools);
            await _context.SaveChangesAsync();

            tools = defaultTools.Select(t => new BusinessToolDto
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description ?? string.Empty,
                IsEnabled = t.IsEnabled,
                UsageCount = t.UsageCount
            }).ToList();
        }

        return Ok(tools);
    }

    [HttpPut("tools/{toolId}")]
    public async Task<IActionResult> UpdateBusinessTool(Guid toolId, [FromBody] UpdateBusinessToolDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var tool = await _context.BusinessToolSettings
            .FirstOrDefaultAsync(t => t.Id == toolId && t.SellerId == userId);

        if (tool == null)
        {
            return NotFound();
        }

        tool.IsEnabled = dto.IsEnabled;
        tool.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Business tool updated successfully" });
    }
}

public class ScheduleSlotDto
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public bool IsAvailable { get; set; }
    public bool IsBooked { get; set; }
    public string BookedBy { get; set; }
}

public class CreateScheduleSlotDto
{
    public DateTime Date { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public bool IsAvailable { get; set; }
}

public class UpdateScheduleSlotDto
{
    public bool IsAvailable { get; set; }
}

public class AvailabilitySettingsDto
{
    public List<string> WorkingDays { get; set; } = new();
    public TimeSpan WorkingHoursStart { get; set; }
    public TimeSpan WorkingHoursEnd { get; set; }
    public string Timezone { get; set; }
    public int BufferTime { get; set; } // minutes
    public int MaxAdvanceBooking { get; set; } // days
}

public class BusinessToolDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool IsEnabled { get; set; }
    public int UsageCount { get; set; }
}

public class UpdateBusinessToolDto
{
    public bool IsEnabled { get; set; }
}