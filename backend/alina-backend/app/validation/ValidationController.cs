using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using alina_backend.app.notifications;
using alina_backend.app.validation;

namespace alina_backend.app.auth;

[ApiController]
[Route("api/[controller]")]
public class ValidationController : ControllerBase
{
    private readonly EmailValidationService _emailValidation;
    private readonly ILogger<ValidationController> _logger;

    public ValidationController(
        EmailValidationService emailValidation,
        ILogger<ValidationController> logger)
    {
        _emailValidation = emailValidation;
        _logger = logger;
    }

    /// <summary>
    /// Validate email address (server-side)
    /// POST /api/validation/email
    /// </summary>
    [HttpPost("email")]
    public async Task<ActionResult<EmailValidationResponseDto>> ValidateEmail([FromBody] ValidateEmailDto dto)
    {
        try
        {
            var result = await _emailValidation.ValidateEmailAsync(dto.Email);

            return Ok(new EmailValidationResponseDto(
                result.IsValid,
                result.HasValidMxRecords,
                result.IsDisposable,
                result.Errors,
                result.Warnings
            ));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating email: {Email}", dto.Email);
            return StatusCode(500, new { error = "Email validation failed" });
        }
    }

    /// <summary>
    /// Quick format validation (regex only)
    /// GET /api/validation/email/format?email=test@example.com
    /// </summary>
    [HttpGet("email/format")]
    public ActionResult<bool> ValidateEmailFormat([FromQuery] string email)
    {
        var isValid = _emailValidation.IsValidFormat(email);
        return Ok(new { valid = isValid });
    }
}

// DTOs
public record ValidateEmailDto(string Email);

public record EmailValidationResponseDto(
    bool IsValid,
    bool HasValidMxRecords,
    bool IsDisposable,
    List<string> Errors,
    List<string> Warnings
);
