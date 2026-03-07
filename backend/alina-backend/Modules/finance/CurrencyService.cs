using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace alina_backend.Modules.finance;

public interface ICurrencyService
{
    Task<decimal> ConvertAsync(decimal amount, string fromCode, string toCode);
    Task<Dictionary<string, decimal>> GetRatesAsync();
}

public class CurrencyService : ICurrencyService
{
    private readonly AppDbContext _context;
    private readonly IMemoryCache _cache;
    private const string RatesCacheKey = "currency_rates";
    private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(1);

    public CurrencyService(AppDbContext context, IMemoryCache cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<decimal> ConvertAsync(decimal amount, string fromCode, string toCode)
    {
        if (fromCode == toCode) return amount;

        var rates = await GetRatesAsync();
        if (!rates.TryGetValue(fromCode, out var fromRate) || !rates.TryGetValue(toCode, out var toRate))
            throw new Exception($"Exchange rate not found for {fromCode} or {toCode}");

        // Convert to Base (USD) first, then to target
        return (amount / fromRate) * toRate;
    }

    public async Task<Dictionary<string, decimal>> GetRatesAsync()
    {
        if (_cache.TryGetValue(RatesCacheKey, out Dictionary<string, decimal>? cached) && cached != null)
            return cached;

        var rates = await _context.CurrencyRates.ToDictionaryAsync(r => r.Code, r => r.Rate);
        _cache.Set(RatesCacheKey, rates, CacheDuration);
        return rates;
    }
}
