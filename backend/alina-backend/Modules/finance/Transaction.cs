using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alina_backend.Modules.finance;

public enum TransactionType
{
    Deposit,
    Payment,    // Buyer pays to Escrow
    Release,    // From Escrow to Seller Available
    Refund,     // From Escrow back to Buyer Available
    Withdrawal,
    PlatformFee, // Platform commission revenue
    CancellationFee
}

public enum TransactionStatus
{
    Pending,
    Completed,
    Rejected
}

public class Transaction
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid WalletId { get; set; }
    public Wallet Wallet { get; set; } = null!;
    
    // User who initiated the transaction (optional, for tracking)
    public Guid? UserId { get; set; }
    
    // Recipient of the transaction (optional, for transfers)
    public Guid? RecipientId { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }

    public string Currency { get; set; } = "USD";

    public TransactionType Type { get; set; }
    public TransactionStatus Status { get; set; } = TransactionStatus.Pending;

    // For Bank Transfers: URL to the receipt image in S3
    public string? Reference { get; set; }
    
    public string? Description { get; set; }

    // Optional link to an Order
    public Guid? OrderId { get; set; }
    
    // Additional metadata as JSON
    public string? Metadata { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ProcessedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}
