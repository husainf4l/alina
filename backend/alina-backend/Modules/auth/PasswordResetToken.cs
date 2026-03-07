using System.ComponentModel.DataAnnotations;

namespace alina_backend.Modules.auth;

/// <summary>
/// Persisted password reset token — stores only the SHA-256 hash, never the plaintext token.
/// The raw token is sent to the user's email once and never stored.
/// </summary>
public class PasswordResetToken
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }

    /// <summary>SHA-256 hash of the raw token (base64 encoded)</summary>
    [Required, StringLength(128)]
    public string TokenHash { get; set; } = string.Empty;

    public DateTime ExpiresAt { get; set; }

    public bool IsUsed { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UsedAt { get; set; }
}
