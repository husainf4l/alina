using System.ComponentModel.DataAnnotations;
using alina_backend.app.profiles;

namespace alina_backend.app.finance;

public class Wallet
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid? ProfileId { get; set; }
    public Profile? Profile { get; set; }

    public Guid? UserId { get; set; } // For system/platform wallets

    public decimal AvailableBalance { get; set; } = 0;
    
    // Funds held during an active order
    public decimal EscrowBalance { get; set; } = 0;

    // Funds requested for withdrawal but not yet approved
    public decimal PendingWithdrawal { get; set; } = 0;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
