using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace alina_backend.Modules.auth;

/// <summary>
/// Two-Factor Authentication service for enhanced security
/// Supports TOTP (Time-based One-Time Password) and SMS verification
/// </summary>
public class TwoFactorAuthService
{
    private readonly AppDbContext _context;
    private readonly ILogger<TwoFactorAuthService> _logger;
    private readonly IConfiguration _configuration;
    
    // For SMS/Email verification codes
    private const int CODE_LENGTH = 6;
    private const int CODE_EXPIRY_MINUTES = 10;

    public TwoFactorAuthService(
        AppDbContext context,
        ILogger<TwoFactorAuthService> logger,
        IConfiguration configuration)
    {
        _context = context;
        _logger = logger;
        _configuration = configuration;
    }

    /// <summary>
    /// Generate and send 2FA code via SMS/Email
    /// </summary>
    public async Task<(bool Success, string Message)> SendVerificationCodeAsync(Guid userId, string method = "email")
    {
        try
        {
            // Generate 6-digit code
            var code = GenerateNumericCode(CODE_LENGTH);
            var expiresAt = DateTime.UtcNow.AddMinutes(CODE_EXPIRY_MINUTES);

            // Store code in database
            var verification = new TwoFactorVerification
            {
                UserId = userId,
                Code = code,
                Method = method,
                ExpiresAt = expiresAt,
                IsUsed = false
            };

            _context.TwoFactorVerifications.Add(verification);
            await _context.SaveChangesAsync();

            // Send code based on method
            if (method == "email")
            {
                // TODO: Send email (integrate with email service in P1-6)
_logger.LogInformation("2FA code {Code} generated for user {UserId} via email", code, userId);
            }
            else if (method == "sms")
            {
                // TODO: Send SMS (integrate with SMS service)
                _logger.LogInformation("2FA code {Code} generated for user {UserId} via SMS", code, userId);
            }

            return (true, $"Verification code sent via {method}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send 2FA code for user {UserId}", userId);
            return (false, "Failed to send verification code");
        }
    }

    /// <summary>
    /// Verify 2FA code
    /// </summary>
    public async Task<(bool Success, string Message)> VerifyCodeAsync(Guid userId, string code, string purpose = "withdrawal")
    {
        try
        {
            var verification = await _context.TwoFactorVerifications
                .Where(v => v.UserId == userId && 
                           v.Code == code && 
                           !v.IsUsed && 
                           v.ExpiresAt > DateTime.UtcNow)
                .OrderByDescending(v => v.CreatedAt)
                .FirstOrDefaultAsync();

            if (verification == null)
            {
                _logger.LogWarning("Invalid or expired 2FA code for user {UserId}", userId);
                return (false, "Invalid or expired verification code");
            }

            // Mark as used
            verification.IsUsed = true;
            verification.UsedAt = DateTime.UtcNow;
            verification.Purpose = purpose;
            await _context.SaveChangesAsync();

            _logger.LogInformation("2FA code verified successfully for user {UserId}", userId);
            return (true, "Verification successful");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error verifying 2FA code for user {UserId}", userId);
            return (false, "Verification failed");
        }
    }

    /// <summary>
    /// Enable TOTP-based 2FA (Google Authenticator, Authy, etc.)
    /// </summary>
    public async Task<(bool Success, string Secret, string QrCodeUrl)> EnableTotpAsync(Guid userId, string appName = "Alina")
    {
        try
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return (false, string.Empty, string.Empty);
            }

            // Generate secret key
            var secret = GenerateBase32Secret();
            
            // Save to user settings
            var totpSettings = await _context.UserTotpSettings.FirstOrDefaultAsync(s => s.UserId == userId);
            if (totpSettings == null)
            {
                totpSettings = new UserTotpSettings
                {
                    UserId = userId,
                    SecretKey = secret,
                    IsEnabled = false
                };
                _context.UserTotpSettings.Add(totpSettings);
            }
            else
            {
                totpSettings.SecretKey = secret;
            }

            await _context.SaveChangesAsync();

            // Generate QR code URL for authenticator apps
            var qrCodeUrl = GenerateTotpQrCodeUrl(user.Email, secret, appName);

            return (true, secret, qrCodeUrl);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to enable TOTP for user {UserId}", userId);
            return (false, string.Empty, string.Empty);
        }
    }

    /// <summary>
    /// Verify TOTP code
    /// </summary>
    public async Task<bool> VerifyTotpAsync(Guid userId, string code)
    {
        try
        {
            var totpSettings = await _context.UserTotpSettings
                .FirstOrDefaultAsync(s => s.UserId == userId && s.IsEnabled);

            if (totpSettings == null)
            {
                return false;
            }

            return VerifyTotpCode(totpSettings.SecretKey, code);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error verifying TOTP for user {UserId}", userId);
            return false;
        }
    }

    private string GenerateNumericCode(int length)
    {
        var random = RandomNumberGenerator.GetInt32(0, (int)Math.Pow(10, length));
        return random.ToString($"D{length}");
    }

    private string GenerateBase32Secret()
    {
        var bytes = new byte[20];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(bytes);
        }
        return Base32Encode(bytes);
    }

    private string Base32Encode(byte[] data)
    {
        const string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        var result = new StringBuilder();
        int buffer = 0;
        int bitsRemaining = 0;

        foreach (byte b in data)
        {
            buffer = (buffer << 8) | b;
            bitsRemaining += 8;

            while (bitsRemaining >= 5)
            {
                int index = (buffer >> (bitsRemaining - 5)) & 0x1F;
                result.Append(alphabet[index]);
                bitsRemaining -= 5;
            }
        }

        return result.ToString();
    }

    private string GenerateTotpQrCodeUrl(string email, string secret, string appName)
    {
        var encoded = Uri.EscapeDataString($"otpauth://totp/{appName}:{email}?secret={secret}&issuer={appName}");
        return $"https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl={encoded}";
    }

    private bool VerifyTotpCode(string secret, string code)
    {
        // Verify code for current time window and adjacent windows (to account for time drift)
        var currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds() / 30;
        
        for (long offset = -1; offset <= 1; offset++)
        {
            var timeStep = currentTime + offset;
            var expectedCode = GenerateTotpCode(secret, timeStep);
            
            if (expectedCode == code)
            {
                return true;
            }
        }

        return false;
    }

    private string GenerateTotpCode(string secret, long timeStep)
    {
        var key = Base32Decode(secret);
        var timeBytes = BitConverter.GetBytes(timeStep);
        if (BitConverter.IsLittleEndian)
        {
            Array.Reverse(timeBytes);
        }

        using var hmac = new HMACSHA1(key);
        var hash = hmac.ComputeHash(timeBytes);
        
        int offset = hash[hash.Length - 1] & 0x0F;
        int binary = ((hash[offset] & 0x7F) << 24) |
                    ((hash[offset + 1] & 0xFF) << 16) |
                    ((hash[offset + 2] & 0xFF) << 8) |
                    (hash[offset + 3] & 0xFF);
        
        int otp = binary % 1000000;
        return otp.ToString("D6");
    }

    private byte[] Base32Decode(string encoded)
    {
        const string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        var result = new List<byte>();
        int buffer = 0;
        int bitsRemaining = 0;

        foreach (char c in encoded.ToUpper())
        {
            int value = alphabet.IndexOf(c);
            if (value < 0) continue;

            buffer = (buffer << 5) | value;
            bitsRemaining += 5;

            if (bitsRemaining >= 8)
            {
                result.Add((byte)(buffer >> (bitsRemaining - 8)));
                bitsRemaining -= 8;
            }
        }

        return result.ToArray();
    }
}

/// <summary>
/// Model for storing 2FA verification codes
/// </summary>
public class TwoFactorVerification
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Method { get; set; } = "email"; // email, sms
    public string? Purpose { get; set; } // withdrawal, login, etc.
    public DateTime ExpiresAt { get; set; }
    public bool IsUsed { get; set; }
    public DateTime? UsedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>
/// Model for TOTP settings (Google Authenticator, etc.)
/// </summary>
public class UserTotpSettings
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string SecretKey { get; set; } = string.Empty;
    public bool IsEnabled { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? EnabledAt { get; set; }
}
