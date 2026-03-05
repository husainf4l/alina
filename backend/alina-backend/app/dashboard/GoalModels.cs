using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.app.profiles;

namespace alina_backend.app.dashboard;

public enum GoalType
{
    Revenue,
    Orders,
    Rating,
    ResponseTime,
    CompletionRate
}

public enum GoalPeriod
{
    Weekly,
    Monthly,
    Quarterly,
    Yearly
}

public enum GoalStatus
{
    Active,
    Completed,
    Expired,
    Paused
}

public class Goal
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public Guid ProfileId { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public GoalType Type { get; set; }

    [Required]
    public GoalPeriod Period { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal TargetValue { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal CurrentValue { get; set; } = 0;

    [Column(TypeName = "decimal(5,2)")]
    public decimal ProgressPercentage { get; set; } = 0;

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    public DateTime EndDate { get; set; }

    [Required]
    public GoalStatus Status { get; set; } = GoalStatus.Active;

    public bool IsAchieved { get; set; } = false;

    public DateTime? AchievedAt { get; set; }

    [MaxLength(100)]
    public string? AchievementBadge { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    // Navigation properties
    [ForeignKey("ProfileId")]
    public Profile Profile { get; set; } = null!;

    public ICollection<GoalProgress> ProgressEntries { get; set; } = new List<GoalProgress>();
}

public class GoalProgress
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public Guid GoalId { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Value { get; set; }

    [Required]
    public DateTime RecordedAt { get; set; } = DateTime.UtcNow;

    [MaxLength(200)]
    public string Description { get; set; } = string.Empty;

    // Navigation properties
    [ForeignKey("GoalId")]
    public Goal Goal { get; set; } = null!;
}

public class AchievementBadge
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Icon { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Color { get; set; } = string.Empty;

    [Required]
    public GoalType GoalType { get; set; }

    [Required]
    public int Level { get; set; } = 1;

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// DTOs
public record GoalDto(
    Guid Id,
    string Title,
    string Description,
    GoalType Type,
    GoalPeriod Period,
    decimal TargetValue,
    decimal CurrentValue,
    decimal ProgressPercentage,
    DateTime StartDate,
    DateTime EndDate,
    GoalStatus Status,
    bool IsAchieved,
    DateTime? AchievedAt,
    string? AchievementBadge
);

public record CreateGoalRequest(
    string Title,
    string Description,
    GoalType Type,
    GoalPeriod Period,
    decimal TargetValue,
    DateTime EndDate
);

public record UpdateGoalRequest(
    string Title,
    string Description,
    decimal TargetValue,
    DateTime EndDate,
    GoalStatus Status
);

public record GoalProgressDto(
    Guid GoalId,
    decimal CurrentValue,
    decimal ProgressPercentage,
    bool IsAchieved,
    DateTime? AchievedAt,
    string? AchievementBadge,
    List<ProgressEntryDto> RecentProgress
);

public record ProgressEntryDto(
    DateTime Date,
    decimal Value,
    string Description
);

public record AchievementBadgeDto(
    Guid Id,
    string Name,
    string Description,
    string Icon,
    string Color,
    GoalType GoalType,
    int Level
);