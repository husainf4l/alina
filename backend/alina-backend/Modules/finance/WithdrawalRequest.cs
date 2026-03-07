using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.Modules.profiles;

namespace alina_backend.Modules.finance;

public enum WithdrawalStatus
{
    Pending,
    Approved,
    Rejected,
    Processed
}

public class WithdrawalRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid UserId { get; set; }
    public Profile User { get; set; } = null!;

    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }

    public string Currency { get; set; } = "USD";

    public WithdrawalStatus Status { get; set; } = WithdrawalStatus.Pending;

    public string? RejectionReason { get; set; }

    public string? BankDetails { get; set; } // JSON string with bank account info

    public string? AdminNotes { get; set; }

    public DateTime RequestedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ProcessedAt { get; set; }
}