using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace alina_backend.app.finance;

public class CurrencyRate
{
    [Key]
    public string Code { get; set; } = string.Empty; // SAR, AED, JOD, USD

    [Column(TypeName = "decimal(18,4)")]
    public decimal Rate { get; set; } // Rate relative to USD (Base)

    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
}
