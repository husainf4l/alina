using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.Modules.profiles;

namespace alina_backend.Modules.marketplace;

public enum OrderStatus
{
    Pending,
    InProgress,
    Delivered,
    Completed,
    Cancelled,
    Refunded,
    Disputed
}

public enum PaymentStatus
{
    Unpaid,
    Pending,
    Paid,
    Refunded
}

public class Order
{
    public Guid Id { get; set; } = Guid.NewGuid();
    
    // Tracking the source of the order
    public Guid? GigId { get; set; }
    public Gig? Gig { get; set; }

    public Guid? OfferId { get; set; }
    public Offer? Offer { get; set; }

    public Guid BuyerId { get; set; }
    public Profile Buyer { get; set; } = null!;

    public Guid SellerId { get; set; }
    public Profile Seller { get; set; } = null!;

    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }

    public string Currency { get; set; } = "USD";

    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    
    public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Unpaid;
    public string PaymentMethod { get; set; } = "Wallet"; // BankTransfer, Wallet

    // Commission and platform revenue
    [Column(TypeName = "decimal(18,2)")]
    public decimal? CommissionAmount { get; set; }

    [Column(TypeName = "decimal(5,2)")]
    public decimal? PlatformFeePercentage { get; set; } = 15.0m; // Updated to 15% commission

    [Column(TypeName = "decimal(18,2)")]
    public decimal? PlatformFee { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal? SellerAmount { get; set; }

    public DateTime? Deadline { get; set; }
    public DateTime? DeliveredAt { get; set; }
    public DateTime? ReleasedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public DateTime? CancelledAt { get; set; }
    public string? CancellationReason { get; set; }

    public string? Requirements { get; set; }

    public string? DeliveryMessage { get; set; }
    public List<string>? AttachmentUrls { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
