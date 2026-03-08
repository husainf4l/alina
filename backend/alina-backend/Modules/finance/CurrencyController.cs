using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace alina_backend.Modules.finance;

[ApiController]
[Route("api/currency")]
public class CurrencyController : ControllerBase
{
    private readonly ICurrencyService _currencyService;
    private readonly AppDbContext _context;
    private readonly ILogger<CurrencyController> _logger;

    // Supported currencies with display metadata
    private static readonly Dictionary<string, CurrencyInfo> SupportedCurrencies = new()
    {
        ["USD"] = new("USD", "US Dollar",       "$",  "en-US"),
        ["EUR"] = new("EUR", "Euro",             "€",  "de-DE"),
        ["GBP"] = new("GBP", "British Pound",   "£",  "en-GB"),
        ["SAR"] = new("SAR", "Saudi Riyal",      "﷼", "ar-SA"),
        ["AED"] = new("AED", "UAE Dirham",       "د.إ","ar-AE"),
        ["KWD"] = new("KWD", "Kuwaiti Dinar",   "د.ك","ar-KW"),
        ["BHD"] = new("BHD", "Bahraini Dinar",  "BD", "ar-BH"),
        ["OMR"] = new("OMR", "Omani Rial",       "ر.ع","ar-OM"),
        ["JOD"] = new("JOD", "Jordanian Dinar", "JD", "ar-JO"),
        ["EGP"] = new("EGP", "Egyptian Pound",  "E£", "ar-EG"),
        ["TRY"] = new("TRY", "Turkish Lira",    "₺",  "tr-TR"),
        ["QAR"] = new("QAR", "Qatari Riyal",    "ر.ق","ar-QA"),
    };

    public CurrencyController(ICurrencyService currencyService, AppDbContext context, ILogger<CurrencyController> logger)
    {
        _currencyService = currencyService;
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Returns all exchange rates relative to USD (base currency).
    /// Public — no auth needed. Frontend should cache this response (1 hour TTL).
    /// Response includes symbol and locale for each currency so frontend can format prices natively.
    /// </summary>
    [HttpGet("rates")]
    [ResponseCache(Duration = 3600, VaryByHeader = "Accept")]
    public async Task<ActionResult<CurrencyRatesResponse>> GetRates()
    {
        var rates = await _currencyService.GetRatesAsync();

        var currencies = rates
            .Where(r => SupportedCurrencies.ContainsKey(r.Key))
            .Select(r =>
            {
                var info = SupportedCurrencies[r.Key];
                return new CurrencyRateDto(
                    Code:     r.Key,
                    Rate:     r.Value,
                    Symbol:   info.Symbol,
                    Name:     info.Name,
                    Locale:   info.Locale
                );
            })
            .OrderBy(c => c.Code)
            .ToList();

        var lastUpdated = await _context.CurrencyRates
            .MaxAsync(r => r.LastUpdated);

        return Ok(new CurrencyRatesResponse("USD", currencies, lastUpdated));
    }

    /// <summary>
    /// Convert an amount from one currency to another.
    /// Public — used by frontend price display.
    /// </summary>
    [HttpGet("convert")]
    public async Task<ActionResult<ConvertResponse>> Convert(
        [FromQuery] decimal amount,
        [FromQuery] string from,
        [FromQuery] string to)
    {
        if (amount <= 0) return BadRequest("Amount must be positive");
        if (string.IsNullOrWhiteSpace(from) || string.IsNullOrWhiteSpace(to))
            return BadRequest("from and to are required");

        from = from.ToUpperInvariant();
        to = to.ToUpperInvariant();

        try
        {
            var converted = await _currencyService.ConvertAsync(amount, from, to);
            return Ok(new ConvertResponse(
                From:      from,
                To:        to,
                Original:  amount,
                Converted: Math.Round(converted, 2)
            ));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Admin: manually update exchange rates.
    /// Accepts a dictionary of { "USD": 1.0, "SAR": 3.75, ... } relative to USD.
    /// Invalidates cache immediately.
    /// </summary>
    [HttpPut("rates")]
    [Authorize]
    public async Task<ActionResult> UpdateRates([FromBody] Dictionary<string, decimal> rates)
    {
        if (!User.IsInRole("Admin")) return Forbid();

        if (rates == null || rates.Count == 0) return BadRequest("No rates provided");
        if (!rates.ContainsKey("USD") || rates["USD"] != 1.0m)
            return BadRequest("USD must be included with rate 1.0 (base currency)");

        foreach (var (code, rate) in rates)
        {
            if (rate <= 0) return BadRequest($"Rate for {code} must be positive");

            var existing = await _context.CurrencyRates.FindAsync(code.ToUpperInvariant());
            if (existing != null)
            {
                existing.Rate = rate;
                existing.LastUpdated = DateTime.UtcNow;
            }
            else
            {
                _context.CurrencyRates.Add(new CurrencyRate
                {
                    Code = code.ToUpperInvariant(),
                    Rate = rate,
                    LastUpdated = DateTime.UtcNow
                });
            }
        }

        await _context.SaveChangesAsync();
        _logger.LogInformation("Admin updated {Count} currency rates", rates.Count);

        // Bust the in-memory cache
        if (HttpContext.RequestServices.GetService<Microsoft.Extensions.Caching.Memory.IMemoryCache>() is { } cache)
            cache.Remove("currency_rates");

        return Ok(new { updated = rates.Count, updatedAt = DateTime.UtcNow });
    }
}

// ──────────────────────────── Response records ────────────────────────────

public record CurrencyInfo(string Code, string Name, string Symbol, string Locale);

public record CurrencyRateDto(string Code, decimal Rate, string Symbol, string Name, string Locale);

public record CurrencyRatesResponse(
    string Base,
    IReadOnlyList<CurrencyRateDto> Currencies,
    DateTime LastUpdated
);

public record ConvertResponse(string From, string To, decimal Original, decimal Converted);
