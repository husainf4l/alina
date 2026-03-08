using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace alina_backend.Modules.finance;

/// <summary>
/// Background service that refreshes exchange rates once per day from exchangerate-api.com.
/// Uses the free tier (no API key needed for USD base).
/// Gulf/pegged currencies (SAR, AED, QAR) have fixed rates and are not overwritten.
/// Falls back silently — the DB seeded rates are always valid fallback data.
/// </summary>
public class CurrencyRateRefreshService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<CurrencyRateRefreshService> _logger;
    private readonly IHttpClientFactory _httpClientFactory;

    // Currencies with USD pegs — never refresh from external API (rates are fixed by central bank)
    private static readonly HashSet<string> PeggedCurrencies = ["SAR", "AED", "QAR", "BHD", "OMR", "KWD", "JOD"];

    private static readonly TimeSpan RefreshInterval = TimeSpan.FromHours(24);

    public CurrencyRateRefreshService(
        IServiceScopeFactory scopeFactory,
        ILogger<CurrencyRateRefreshService> logger,
        IHttpClientFactory httpClientFactory)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
        _httpClientFactory = httpClientFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Wait 30s on startup to let the app fully initialize
        await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            await TryRefreshRatesAsync();
            await Task.Delay(RefreshInterval, stoppingToken);
        }
    }

    private async Task TryRefreshRatesAsync()
    {
        try
        {
            var client = _httpClientFactory.CreateClient("currency");
            // Free tier — no API key, USD base, returns latest rates
            var response = await client.GetFromJsonAsync<ExchangeRateApiResponse>(
                "https://open.er-api.com/v6/latest/USD");

            if (response?.Result != "success" || response.Rates == null)
            {
                _logger.LogWarning("Currency refresh: API returned non-success result");
                return;
            }

            using var scope = _scopeFactory.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var cache = scope.ServiceProvider.GetRequiredService<IMemoryCache>();

            var existingCodes = await db.CurrencyRates.Select(r => r.Code).ToListAsync();

            foreach (var code in existingCodes)
            {
                // Skip pegged currencies — their rates are fixed
                if (PeggedCurrencies.Contains(code)) continue;

                if (!response.Rates.TryGetValue(code, out var rate) || rate <= 0) continue;

                var entity = await db.CurrencyRates.FindAsync(code);
                if (entity == null) continue;

                entity.Rate = Math.Round((decimal)rate, 6);
                entity.LastUpdated = DateTime.UtcNow;
            }

            await db.SaveChangesAsync();

            // Invalidate the in-memory cache so next request gets fresh rates
            cache.Remove("currency_rates");

            _logger.LogInformation("Currency rates refreshed from exchange API. Next refresh in {Hours}h", RefreshInterval.TotalHours);
        }
        catch (Exception ex)
        {
            // Non-fatal — app continues with last-known rates from DB
            _logger.LogWarning(ex, "Currency rate refresh failed, using cached DB rates");
        }
    }
}

// Matches https://open.er-api.com/v6/latest/USD response shape
file class ExchangeRateApiResponse
{
    public string? Result { get; set; }
    public Dictionary<string, double>? Rates { get; set; }
}
