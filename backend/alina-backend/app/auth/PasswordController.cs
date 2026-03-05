using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using alina_backend.app.notifications;

namespace alina_backend.app.auth;

[ApiController]
[Route("api/auth")]
[Authorize]
public class PasswordController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly EmailService _emailService;
    private readonly ILogger<PasswordController> _logger;

    public PasswordController(
        AppDbContext context,
        EmailService emailService,
        ILogger<PasswordController> logger)
    {
        _context = context;
        _emailService = emailService;
        _logger = logger;
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

            // Send email notification
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
            _ = Task.Run(async () =>
            {
                try
                {
                    await _emailService.SendPasswordChangeNotificationAsync(
                        user.Email,
                        user.FullName ?? user.Email,
                        DateTime.UtcNow,
                        ipAddress
                    );
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to send password change email to {Email}", user.Email);
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

            // Generate reset token (simple implementation - use proper token generation in production)
            var resetToken = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            var resetExpiry = DateTime.UtcNow.AddHours(1);

            // TODO: Store reset token in database with expiry
            // For now, log it (in production, send email with reset link)
            _logger.LogInformation("Password reset token for {Email}: {Token}, expires at {Expiry}", 
                user.Email, resetToken, resetExpiry);

            // Send reset email
            _ = Task.Run(async () =>
            {
                try
                {
                    var resetLink = $"https://alina.com/reset-password?token={Uri.EscapeDataString(resetToken)}";
                    // TODO: Create SendPasswordResetEmail method in EmailService
                    _logger.LogInformation("Password reset link: {Link}", resetLink);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to send password reset email to {Email}", user.Email);
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
