using System.ComponentModel.DataAnnotations;
using alina_backend.app.users;

namespace alina_backend.app.fraud;

public enum FraudReason
{
    TooManyCancellations,
    TooManyDisputes,
    HighRefundRate,
    RapidWithdrawals,
    SelfDealAttempt,
    SuspiciousOrderPattern,
    MultipleAccounts,
    UnusualActivity
}

public class FraudFlag
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public FraudReason Reason { get; set; }

    [Required]
    public string Description { get; set; } = string.Empty;

    public bool IsResolved { get; set; } = false;
    public DateTime? ResolvedAt { get; set; }
    public string? ResolutionNotes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Additional metadata
    public string? IpAddress { get; set; }
    public string? UserAgent { get; set; }
    public decimal? SeverityScore { get; set; } // 0-100, higher = more suspicious
}