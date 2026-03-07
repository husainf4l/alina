using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using alina_backend.Modules.notifications;

namespace alina_backend.Modules.auth;

[ApiController]
[Route("api/auth")]
[Authorize]
public class PasswordController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly EmailService _emailService;
    private readonly ILogger<PasswordController> _logger;
    private readonly IServiceScopeFactory _scopeFactory;

    public PasswordController(
        AppDbContext context,
        EmailService emailService,
        ILogger<PasswordController> logger,
        IServiceScopeFactory scopeFactory)
    {
        _context = context;
        _emailService = emailService;
        _logger = logger;
        _scopeFactory = scopeFactory;
    }

    /// <summary>
    /// Change password for authenticated user
    /// POST /api/auth/change-password
    /// </summary>
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var userIdClaim = User.FindFirst("sub")?.Value ?? User.FindFirst("userId")?.Value;
        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new { error = "Invalid user token" });
        }

        try
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound(new { error = "User not found" });
            }

            // Verify current password
            if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            {
                _logger.LogWarning("Failed password change attempt for user {UserId} - incorrect current password", userId);
                return BadRequest(new { error = "Current password is incorrect" });
            }

            // Validate new password strength
            if (!IsValidPassword(dto.NewPassword))
            {
                return BadRequest(new 
                { 
                    error = "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character" 
                });
            }

            // Don't allow same password
            if (dto.CurrentPassword == dto.NewPassword)
            {
                return BadRequest(new { error = "New password must be different from current password" });
            }

            // Hash new password
            var newPasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            user.PasswordHash = newPasswordHash;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            _logger.LogInformation("Password changed successfully for user {UserId}", userId);

            // Send email notification (use IServiceScopeFactory to avoid capturing scoped service)
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
            var userEmail = user.Email;
            var userName = user.FullName ?? user.Email;
            var changedAt = DateTime.UtcNow;
            _ = Task.Run(async () =>
            {
                try
                {
                    using var scope = _scopeFactory.CreateScope();
                    var emailSvc = scope.ServiceProvider.GetRequiredService<EmailService>();
                    await emailSvc.SendPasswordChangeNotificationAsync(
                        userEmail, userName, changedAt, ipAddress);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to send password change email to {Email}", userEmail);
                }
            });

            return Ok(new { message = "Password changed successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error changing password for user {UserId}", userId);
            return StatusCode(500, new { error = "Failed to change password" });
        }
    }

    /// <summary>
    /// Request password reset (forgot password)
    /// POST /api/auth/forgot-password
    /// </summary>
    [AllowAnonymous]
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            
            // Don't reveal if email exists (security best practice)
            if (user == null)
            {
                _logger.LogInformation("Password reset requested for non-existent email: {Email}", dto.Email);
                return Ok(new { message = "If an account exists with this email, a reset link has been sent" });
            }

            // Generate cryptographically secure reset token
            var rawToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
            var tokenHash = Convert.ToBase64String(
                System.Security.Cryptography.SHA256.HashData(
                    System.Text.Encoding.UTF8.GetBytes(rawToken)));

            // Invalidate any existing unused tokens for this user
            var existingTokens = await _context.PasswordResetTokens
                .Where(t => t.UserId == user.Id && !t.IsUsed && t.ExpiresAt > DateTime.UtcNow)
                .ToListAsync();
            foreach (var t in existingTokens) t.IsUsed = true;

            // Persist the hashed token (never store the raw token)
            _context.PasswordResetTokens.Add(new PasswordResetToken
            {
                UserId = user.Id,
                TokenHash = tokenHash,
                ExpiresAt = DateTime.UtcNow.AddHours(1)
            });
            await _context.SaveChangesAsync();

            // Send reset email (use IServiceScopeFactory for fire-and-forget)
            var userEmail2 = user.Email;
            var userName2 = user.FullName ?? user.Email;
            _ = Task.Run(async () =>
            {
                try
                {
                    using var scope = _scopeFactory.CreateScope();
                    var emailSvc = scope.ServiceProvider.GetRequiredService<EmailService>();
                    var resetLink = $"https://alina.com/reset-password?token={Uri.EscapeDataString(rawToken)}";
                    await emailSvc.SendPasswordResetEmailAsync(userEmail2, userName2, resetLink);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to send password reset email to {Email}", userEmail2);
                }
            });

            return Ok(new { message = "If an account exists with this email, a reset link has been sent" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing forgot password request");
            return StatusCode(500, new { error = "Failed to process password reset request" });
        }
    }


    /// <summary>
    /// Reset password using the token received by email
    /// POST /api/auth/reset-password
    /// </summary>
    [AllowAnonymous]
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
    {
        try
        {
            var tokenHash = Convert.ToBase64String(
                System.Security.Cryptography.SHA256.HashData(
                    System.Text.Encoding.UTF8.GetBytes(dto.Token)));

            var tokenRecord = await _context.PasswordResetTokens
                .Include(t => t.User)
                .FirstOrDefaultAsync(t =>
                    t.TokenHash == tokenHash &&
                    !t.IsUsed &&
                    t.ExpiresAt > DateTime.UtcNow);

            if (tokenRecord == null)
            {
                _logger.LogWarning("Invalid or expired password reset token used");
                return BadRequest(new { error = "Invalid or expired reset token" });
            }

            var user = await _context.Users.FindAsync(tokenRecord.UserId);
            if (user == null)
                return BadRequest(new { error = "User not found" });

            if (!IsValidPassword(dto.NewPassword))
                return BadRequest(new { error = "Password must be at least 8 characters with uppercase, lowercase, number and special character" });

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;

            tokenRecord.IsUsed = true;
            tokenRecord.UsedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            _logger.LogInformation("Password reset successfully for user {UserId}", user.Id);
            return Ok(new { message = "Password reset successfully. You can now log in with your new password." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during password reset");
            return StatusCode(500, new { error = "Failed to reset password" });
        }
    }

    private static bool IsValidPassword(string password)
    {
        if (string.IsNullOrEmpty(password) || password.Length < 8)
            return false;

        bool hasUpper = password.Any(char.IsUpper);
        bool hasLower = password.Any(char.IsLower);
        bool hasDigit = password.Any(char.IsDigit);
        bool hasSpecial = password.Any(ch => !char.IsLetterOrDigit(ch));

        return hasUpper && hasLower && hasDigit && hasSpecial;
    }
}

// DTOs
public record ChangePasswordDto(string CurrentPassword, string NewPassword);
public record ForgotPasswordDto(string Email);
