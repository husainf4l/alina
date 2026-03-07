using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using alina_backend.Modules.finance;
using alina_backend.Modules.disputes;

namespace alina_backend.Modules.marketplace;

public class AutoReleaseService : BackgroundService
{
    private readonly ILogger<AutoReleaseService> _logger;
    private readonly IServiceProvider _serviceProvider;
    private readonly TimeSpan _checkInterval = TimeSpan.FromHours(1); // Check every hour

    // Platform system user ID for commission collection
    private static readonly Guid PLATFORM_USER_ID = Guid.Parse("00000000-0000-0000-0000-000000000001");

    public AutoReleaseService(
        ILogger<AutoReleaseService> logger,
        IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Auto-release service started");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await ProcessAutoReleasesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing auto-releases");
            }

            await Task.Delay(_checkInterval, stoppingToken);
        }

        _logger.LogInformation("Auto-release service stopped");
    }

    private async Task ProcessAutoReleasesAsync()
    {
        using var scope = _serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // Find orders that are Delivered (awaiting buyer acceptance) and 3+ days past delivery,
        // with no open disputes — auto-complete and release escrow.
        var autoReleaseDeadline = DateTime.UtcNow.AddDays(-3);
        var ordersToAutoRelease = await context.Orders
            .Where(o => o.Status == OrderStatus.Delivered &&
                       o.ReleasedAt == null &&
                       o.DeliveredAt.HasValue &&
                       o.DeliveredAt.Value < autoReleaseDeadline &&
                       !context.Disputes.Any(d => d.OrderId == o.Id && d.Status == DisputeStatus.Open))
            .Include(o => o.Buyer)
            .Include(o => o.Seller)
            .ToListAsync();

        _logger.LogInformation("Found {Count} orders eligible for auto-release", ordersToAutoRelease.Count);

        foreach (var order in ordersToAutoRelease)
        {
            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                // Get wallets
                var buyerWallet = await context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.BuyerId);
                var sellerWallet = await context.Wallets.FirstOrDefaultAsync(w => w.ProfileId == order.SellerId);

                if (buyerWallet == null || sellerWallet == null)
                {
                    _logger.LogWarning("Wallet not found for order {OrderId}, skipping auto-release", order.Id);
                    await transaction.RollbackAsync();
                    continue;
                }

                // Validate escrow balance
                if (buyerWallet.EscrowBalance < order.Amount)
                {
                    _logger.LogWarning("Insufficient escrow balance for order {OrderId}, skipping auto-release", order.Id);
                    await transaction.RollbackAsync();
                    continue;
                }

                // Atomic escrow release
                buyerWallet.EscrowBalance -= order.Amount;
                sellerWallet.AvailableBalance += order.SellerAmount ?? order.Amount;
                buyerWallet.UpdatedAt = DateTime.UtcNow;
                sellerWallet.UpdatedAt = DateTime.UtcNow;

                // Mark order as Completed and released
                order.Status = OrderStatus.Completed;
                order.CompletedAt = DateTime.UtcNow;
                order.ReleasedAt = DateTime.UtcNow;
                order.UpdatedAt = DateTime.UtcNow;

                // Create transaction record
                var releaseTransaction = new Transaction
                {
                    WalletId = sellerWallet.Id,
                    Amount = order.SellerAmount ?? order.Amount,
                    Type = TransactionType.Release,
                    Status = TransactionStatus.Completed,
                    OrderId = order.Id,
                    Description = $"Auto-released escrow 3 days after delivery",
                    ProcessedAt = DateTime.UtcNow
                };

                context.Transactions.Add(releaseTransaction);
                await context.SaveChangesAsync();
                await transaction.CommitAsync();

                _logger.LogInformation("Auto-released escrow for order {OrderId}: {Amount} to seller {SellerId}",
                    order.Id, order.SellerAmount ?? order.Amount, order.SellerId);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Failed to auto-release escrow for order {OrderId}", order.Id);
            }
        }
    }
}