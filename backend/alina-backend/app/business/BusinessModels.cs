using System.ComponentModel.DataAnnotations;
using alina_backend.app.users;
using alina_backend.app.marketplace;

namespace alina_backend.app.business;

public enum AppointmentStatus
{
    Available,
    Booked,
    Completed,
    Cancelled,
    NoShow
}

public class ScheduleSlot
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid SellerId { get; set; }
    public User? Seller { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public TimeSpan StartTime { get; set; }

    [Required]
    public TimeSpan EndTime { get; set; }

    public int DurationMinutes { get; set; }

    [Required]
    public AppointmentStatus Status { get; set; } = AppointmentStatus.Available;

    // If booked
    public Guid? BuyerId { get; set; }
    public User? Buyer { get; set; }

    public Guid? OrderId { get; set; }
    public Order? Order { get; set; }

    [StringLength(500)]
    public string? Notes { get; set; }

    [StringLength(500)]
    public string? CancellationReason { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class AvailabilitySetting
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid SellerId { get; set; }
    public User? Seller { get; set; }

    // Working days (JSON array: ["Monday", "Tuesday", ...])
    [Required, StringLength(200)]
    public string WorkingDays { get; set; } = "[\"Monday\",\"Tuesday\",\"Wednesday\",\"Thursday\",\"Friday\"]";

    [Required]
    public TimeSpan WorkingHoursStart { get; set; } = new TimeSpan(9, 0, 0);

    [Required]
    public TimeSpan WorkingHoursEnd { get; set; } = new TimeSpan(17, 0, 0);

    [Required, StringLength(100)]
    public string Timezone { get; set; } = "UTC";

    // Buffer time between appointments (minutes)
    public int BufferTimeMinutes { get; set; } = 15;

    // How far in advance can clients book (days)
    public int MaxAdvanceBookingDays { get; set; } = 30;

    // Minimum notice required for booking (hours)
    public int MinimumNoticeHours { get; set; } = 24;

    public bool AutoAcceptBookings { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum BusinessToolType
{
    InvoiceGenerator,
    ContractBuilder,
    TimeTracker,
    ExpenseManager,
    ClientDatabase,
    ProjectPlanner,
    FileSharing,
    VideoConference
}

public class BusinessToolSetting
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid SellerId { get; set; }
    public User? Seller { get; set; }

    [Required]
    public BusinessToolType ToolType { get; set; }

    [Required, StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    public bool IsEnabled { get; set; } = false;

    public int UsageCount { get; set; }

    // Tool-specific settings (JSON)
    public string? Settings { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
