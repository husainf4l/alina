using Microsoft.EntityFrameworkCore;

namespace alina_backend.app.finance;

public interface ICurrencyService
{
    Task<decimal> ConvertAsync(decimal amount, string fromCode, string toCode);
    Task<Dictionary<string, decimal>> GetRatesAsync();
}

public class CurrencyService : ICurrencyService
{
    private readonly AppDbContext _context;

    public CurrencyService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<decimal> ConvertAsync(decimal amount, string fromCode, string toCode)
    {
        if (fromCode == toCode) return amount;

        var rates = await _context.CurrencyRates.ToListAsync();
        var fromRate = rates.FirstOrDefault(r => r.Code == fromCode)?.Rate;
        var toRate = rates.FirstOrDefault(r => r.Code == toCode)?.Rate;

        if (fromRate == null || toRate == null)
            throw new Exception($"Exchange rate not found for {fromCode} or {toCode}");

        // Convert to Base (USD) first, then to target
        var baseAmount = amount / fromRate.Value;
        return baseAmount * toRate.Value;
    }

    public async Task<Dictionary<string, decimal>> GetRatesAsync()
    {
        return await _context.CurrencyRates.ToDictionaryAsync(r => r.Code, r => r.Rate);
    }
}
