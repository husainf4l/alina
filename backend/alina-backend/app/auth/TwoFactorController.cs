using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace alina_backend.app.auth;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TwoFactorController : ControllerBase
{
    private readonly TwoFactorAuthService _twoFactorService;
    private readonly ILogger<TwoFactorController> _logger;

    public TwoFactorController(
        TwoFactorAuthService twoFactorService,
        ILogger<TwoFactorController> logger)
    {
        _twoFactorService = twoFactorService;
        _logger = logger;
    }

    /// <summary>
    /// Request 2FA code for withdrawal or sensitive operation
    /// </summary>
    [HttpPost("request-code")]
    public async Task<ActionResult> RequestVerificationCode([FromBody] Request2FADto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var (success, message) = await _twoFactorService.SendVerificationCodeAsync(userId, dto.Method);
        
        if (!success)
        {
            return BadRequest(new { error = message });
        }

        return Ok(new { message = message, expiresInMinutes = 10 });
    }

    /// <summary>
    /// Verify 2FA code
    /// </summary>
    [HttpPost("verify-code")]
    public async Task<ActionResult> VerifyCode([FromBody] Verify2FADto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var (success, message) = await _twoFactorService.VerifyCodeAsync(userId, dto.Code, dto.Purpose);
        
        if (!success)
        {
            return BadRequest(new { error = message });
        }

        return Ok(new { message = message, verified = true });
    }

    /// <summary>
    /// Enable TOTP-based 2FA (Google Authenticator)
    /// </summary>
    [HttpPost("enable-totp")]
    public async Task<ActionResult> EnableTotp()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var (success, secret, qrCodeUrl) = await _twoFactorService.EnableTotpAsync(userId);
        
        if (!success)
        {
            return BadRequest(new { error = "Failed to enable TOTP" });
        }

        return Ok(new
        {
            message = "Scan this QR code with your authenticator app",
            secret = secret,
            qrCodeUrl = qrCodeUrl,
            manualEntryKey = secret
        });
    }

    /// <summary>
    /// Verify TOTP code from authenticator app
    /// </summary>
    [HttpPost("verify-totp")]
    public async Task<ActionResult> VerifyTotp([FromBody] VerifyTotpDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var verified = await _twoFactorService.VerifyTotpAsync(userId, dto.Code);
        
        if (!verified)
        {
            return BadRequest(new { error = "Invalid TOTP code" });
        }

        return Ok(new { message = "TOTP verified successfully", verified = true });
    }
}

public record Request2FADto(string Method = "email"); // email or sms
public record Verify2FADto(string Code, string Purpose = "general");
public record VerifyTotpDto(string Code);
