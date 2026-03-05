using System.ComponentModel.DataAnnotations;

namespace alina_backend.app.legal;

public class LegalDocument
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [StringLength(50)]
    public string Type { get; set; } = string.Empty; // PrivacyPolicy, TermsOfService

    [Required]
    public string Content { get; set; } = string.Empty; // HTML content

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}