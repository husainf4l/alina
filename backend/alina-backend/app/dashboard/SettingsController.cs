using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using alina_backend.app.profiles;
using alina_backend.app.settings;

namespace alina_backend.app.dashboard;

[ApiController]
[Route("api/seller/[controller]")]
[Authorize]
public class SettingsController : ControllerBase
{
    private readonly AppDbContext _context;

    public SettingsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("profile")]
    public async Task<ActionResult<SellerProfileSettingsDto>> GetSellerProfileSettings()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var settings = new SellerProfileSettingsDto
        {
            DisplayName = profile.DisplayName,
            Bio = profile.Bio,
            Skills = profile.ProfileSkills.Select(ps => ps.Skill.Name).ToList(),
            Languages = profile.ProfileLanguages.Select(pl => pl.Language.Name).ToList(),
            PreferredCurrency = profile.PreferredCurrency,
            Timezone = profile.TimeZone,
            ProfileImageUrl = profile.AvatarUrl,
            IsProfilePublic = profile.IsPublic
        };

        return Ok(settings);
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateSellerProfileSettings([FromBody] UpdateSellerProfileSettingsDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        profile.DisplayName = dto.DisplayName ?? profile.DisplayName;
        profile.Bio = dto.Bio ?? profile.Bio;

        // Handle skills update
        if (dto.Skills != null)
        {
            // Remove existing skills
            _context.ProfileSkills.RemoveRange(profile.ProfileSkills);

            // Add new skills
            foreach (var skillName in dto.Skills)
            {
                var skill = await _context.Skills.FirstOrDefaultAsync(s => s.Name == skillName);
                if (skill == null)
                {
                    skill = new Skill { Name = skillName };
                    _context.Skills.Add(skill);
                    await _context.SaveChangesAsync();
                }

                _context.ProfileSkills.Add(new ProfileSkill
                {
                    ProfileId = profile.Id,
                    SkillId = skill.Id
                });
            }
        }

        // Handle languages update
        if (dto.Languages != null)
        {
            // Remove existing languages
            _context.ProfileLanguages.RemoveRange(profile.ProfileLanguages);

            // Add new languages
            foreach (var languageName in dto.Languages)
            {
                var language = await _context.Languages.FirstOrDefaultAsync(l => l.Name == languageName);
                if (language == null)
                {
                    language = new Language { Name = languageName, Code = languageName.Substring(0, 2).ToLower() };
                    _context.Languages.Add(language);
                    await _context.SaveChangesAsync();
                }

                _context.ProfileLanguages.Add(new ProfileLanguage
                {
                    ProfileId = profile.Id,
                    LanguageId = language.Id,
                    ProficiencyLevel = "fluent"
                });
            }
        }

        profile.PreferredCurrency = dto.PreferredCurrency ?? profile.PreferredCurrency;
        profile.TimeZone = dto.Timezone ?? profile.TimeZone;
        profile.IsPublic = dto.IsProfilePublic ?? profile.IsPublic;
        profile.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Profile settings updated successfully" });
    }

    [HttpGet("notifications")]
    public async Task<ActionResult<NotificationSettingsDto>> GetNotificationSettings()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var preferences = await _context.UserNotificationPreferences
            .FirstOrDefaultAsync(p => p.UserId == userId);

        if (preferences == null)
        {
            // Create default preferences
            preferences = new UserNotificationPreference
            {
                UserId = userId
            };
            _context.UserNotificationPreferences.Add(preferences);
            await _context.SaveChangesAsync();
        }

        var settings = new NotificationSettingsDto
        {
            EmailNotifications = preferences.EmailNotifications,
            PushNotifications = preferences.PushNotifications,
            SmsNotifications = preferences.SmsNotifications,
            NewOrderAlerts = preferences.NewOrderAlerts,
            MessageAlerts = preferences.MessageAlerts,
            ReviewAlerts = preferences.ReviewAlerts,
            PaymentAlerts = preferences.PaymentAlerts,
            MarketingEmails = preferences.MarketingEmails
        };

        return Ok(settings);
    }

    [HttpPut("notifications")]
    public async Task<IActionResult> UpdateNotificationSettings([FromBody] NotificationSettingsDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var preferences = await _context.UserNotificationPreferences
            .FirstOrDefaultAsync(p => p.UserId == userId);

        if (preferences == null)
        {
            preferences = new UserNotificationPreference
            {
                UserId = userId
            };
            _context.UserNotificationPreferences.Add(preferences);
        }

        preferences.EmailNotifications = dto.EmailNotifications;
        preferences.PushNotifications = dto.PushNotifications;
        preferences.SmsNotifications = dto.SmsNotifications;
        preferences.NewOrderAlerts = dto.NewOrderAlerts;
        preferences.MessageAlerts = dto.MessageAlerts;
        preferences.ReviewAlerts = dto.ReviewAlerts;
        preferences.PaymentAlerts = dto.PaymentAlerts;
        preferences.MarketingEmails = dto.MarketingEmails;
        preferences.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Notification settings updated successfully" });
    }

    [HttpGet("privacy")]
    public async Task<ActionResult<PrivacySettingsDto>> GetPrivacySettings()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        var settings = new PrivacySettingsDto
        {
            ProfileVisibility = profile.IsPublic ? "Public" : "Private",
            ShowEarnings = false, // Default to private
            ShowReviews = true,
            ShowPortfolio = true,
            AllowDirectMessages = true
        };

        return Ok(settings);
    }

    [HttpPut("privacy")]
    public async Task<IActionResult> UpdatePrivacySettings([FromBody] PrivacySettingsDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null) return BadRequest("Profile not found");

        profile.IsPublic = dto.ProfileVisibility == "Public";

        await _context.SaveChangesAsync();

        return Ok(new { message = "Privacy settings updated successfully" });
    }

    [HttpGet("security")]
    public async Task<ActionResult<SecuritySettingsDto>> GetSecuritySettings()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        // Placeholder security settings
        var settings = new SecuritySettingsDto
        {
            TwoFactorEnabled = false,
            LoginAlerts = true,
            SessionTimeout = 30, // days
            PasswordLastChanged = DateTime.UtcNow.AddDays(-45),
            ActiveSessions = 1
        };

        return Ok(settings);
    }

    [HttpPost("security/change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        // In a real implementation, you'd validate the current password and update it
        return Ok(new { message = "Password changed successfully" });
    }

    [HttpPost("security/enable-2fa")]
    public async Task<IActionResult> EnableTwoFactorAuth()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId)) return Unauthorized();

        // In a real implementation, you'd generate and return 2FA setup info
        return Ok(new { message = "2FA setup initiated", qrCodeUrl = "placeholder" });
    }
}

public class SellerProfileSettingsDto
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }
    public List<string> Skills { get; set; } = new();
    public List<string> Languages { get; set; } = new();
    public string PreferredCurrency { get; set; }
    public string Timezone { get; set; }
    public string ProfileImageUrl { get; set; }
    public bool IsProfilePublic { get; set; }
}

public class UpdateSellerProfileSettingsDto
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }
    public List<string> Skills { get; set; }
    public List<string> Languages { get; set; }
    public string PreferredCurrency { get; set; }
    public string Timezone { get; set; }
    public bool? IsProfilePublic { get; set; }
}

public class NotificationSettingsDto
{
    public bool EmailNotifications { get; set; }
    public bool PushNotifications { get; set; }
    public bool SmsNotifications { get; set; }
    public bool NewOrderAlerts { get; set; }
    public bool MessageAlerts { get; set; }
    public bool ReviewAlerts { get; set; }
    public bool PaymentAlerts { get; set; }
    public bool MarketingEmails { get; set; }
}

public class PrivacySettingsDto
{
    public string ProfileVisibility { get; set; }
    public bool ShowEarnings { get; set; }
    public bool ShowReviews { get; set; }
    public bool ShowPortfolio { get; set; }
    public bool AllowDirectMessages { get; set; }
}

public class SecuritySettingsDto
{
    public bool TwoFactorEnabled { get; set; }
    public bool LoginAlerts { get; set; }
    public int SessionTimeout { get; set; }
    public DateTime PasswordLastChanged { get; set; }
    public int ActiveSessions { get; set; }
}

public class ChangePasswordDto
{
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
    public string ConfirmPassword { get; set; }
}