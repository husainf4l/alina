using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace alina_backend.Modules.settings;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SettingsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<SettingsController> _logger;

    public SettingsController(AppDbContext context, ILogger<SettingsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Get current user's settings
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<UserSettingsDto>> GetSettings()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var settings = await _context.UserSettings.FirstOrDefaultAsync(s => s.UserId == userId);
        
        if (settings == null)
        {
            // Create default settings
            settings = new UserSettings
            {
                UserId = userId
            };
            _context.UserSettings.Add(settings);
            await _context.SaveChangesAsync();
        }

        // Get notification preferences
        var notificationPrefs = await _context.UserNotificationPreferences
            .FirstOrDefaultAsync(n => n.UserId == userId);

        if (notificationPrefs == null)
        {
            notificationPrefs = new UserNotificationPreference
            {
                UserId = userId
            };
            _context.UserNotificationPreferences.Add(notificationPrefs);
            await _context.SaveChangesAsync();
        }

        return Ok(MapToDto(settings, notificationPrefs));
    }

    /// <summary>
    /// Update user settings (partial update supported)
    /// </summary>
    [HttpPut]
    public async Task<ActionResult<UserSettingsDto>> UpdateSettings([FromBody] UpdateSettingsDto updateDto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var settings = await _context.UserSettings.FirstOrDefaultAsync(s => s.UserId == userId);
        if (settings == null)
        {
            settings = new UserSettings { UserId = userId };
            _context.UserSettings.Add(settings);
        }

        var notificationPrefs = await _context.UserNotificationPreferences
            .FirstOrDefaultAsync(n => n.UserId == userId);
        if (notificationPrefs == null)
        {
            notificationPrefs = new UserNotificationPreference { UserId = userId };
            _context.UserNotificationPreferences.Add(notificationPrefs);
        }

        // Update theme preferences
        if (updateDto.Theme != null)
        {
            settings.ThemeMode = updateDto.Theme.Mode ?? settings.ThemeMode;
            settings.PrimaryColor = updateDto.Theme.PrimaryColor ?? settings.PrimaryColor;
        }

        // Update localization
        if (!string.IsNullOrEmpty(updateDto.Language))
            settings.Language = updateDto.Language;
        if (!string.IsNullOrEmpty(updateDto.Timezone))
            settings.Timezone = updateDto.Timezone;

        // Update notification preferences
        if (updateDto.Notifications != null)
        {
            if (updateDto.Notifications.Email != null)
            {
                notificationPrefs.NewOrderAlerts = updateDto.Notifications.Email.OrderUpdates;
                notificationPrefs.MessageAlerts = updateDto.Notifications.Email.Messages;
                notificationPrefs.PromotionAlerts = updateDto.Notifications.Email.Promotions;
                notificationPrefs.ReviewAlerts = updateDto.Notifications.Email.Reviews;
                notificationPrefs.MarketingEmails = updateDto.Notifications.Email.NewOffers;
            }

            if (updateDto.Notifications.Push != null)
            {
                notificationPrefs.PushNotifications = true;
                // Note: Individual push preferences would need additional fields
            }

            if (updateDto.Notifications.Sms != null)
            {
                notificationPrefs.SmsNotifications = updateDto.Notifications.Sms.OrderUpdates || 
                                                     updateDto.Notifications.Sms.SecurityAlerts;
            }
        }

        // Update privacy preferences
        if (updateDto.Privacy != null)
        {
            settings.ProfileVisibility = updateDto.Privacy.ProfileVisibility ?? settings.ProfileVisibility;
            settings.ShowEmail = updateDto.Privacy.ShowEmail;
            settings.ShowPhone = updateDto.Privacy.ShowPhone;
            settings.ActivityStatus = updateDto.Privacy.ActivityStatus;
        }

        // Update dashboard preferences
        if (updateDto.Dashboard != null)
        {
            settings.DefaultView = updateDto.Dashboard.DefaultView ?? settings.DefaultView;
            settings.ShowCompletedOrders = updateDto.Dashboard.ShowCompletedOrders;
            settings.DashboardItemsPerPage = updateDto.Dashboard.ItemsPerPage;
        }

        // Update search preferences
        if (updateDto.Search != null)
        {
            settings.SaveSearchHistory = updateDto.Search.SaveHistory;
            settings.DefaultSortBy = updateDto.Search.DefaultSort ?? settings.DefaultSortBy;
            settings.DefaultItemsPerPage = updateDto.Search.ItemsPerPage;
        }

        // Update accessibility
        if (updateDto.Accessibility != null)
        {
            settings.ReducedMotion = updateDto.Accessibility.ReducedMotion;
            settings.HighContrast = updateDto.Accessibility.HighContrast;
            settings.FontSize = updateDto.Accessibility.FontSize ?? settings.FontSize;
        }

        settings.UpdatedAt = DateTime.UtcNow;
        notificationPrefs.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        _logger.LogInformation("User {UserId} updated settings", userId);

        return Ok(MapToDto(settings, notificationPrefs));
    }

    /// <summary>
    /// Reset settings to defaults
    /// </summary>
    [HttpPost("reset")]
    public async Task<ActionResult<UserSettingsDto>> ResetSettings()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var settings = await _context.UserSettings.FirstOrDefaultAsync(s => s.UserId == userId);
        if (settings != null)
        {
            _context.UserSettings.Remove(settings);
        }

        var notificationPrefs = await _context.UserNotificationPreferences
            .FirstOrDefaultAsync(n => n.UserId == userId);
        if (notificationPrefs != null)
        {
            _context.UserNotificationPreferences.Remove(notificationPrefs);
        }

        await _context.SaveChangesAsync();

        // Create new default settings
        var newSettings = new UserSettings { UserId = userId };
        var newNotificationPrefs = new UserNotificationPreference { UserId = userId };
        
        _context.UserSettings.Add(newSettings);
        _context.UserNotificationPreferences.Add(newNotificationPrefs);
        await _context.SaveChangesAsync();

        _logger.LogInformation("User {UserId} reset settings to defaults", userId);

        return Ok(MapToDto(newSettings, newNotificationPrefs));
    }

    /// <summary>
    /// Export settings as JSON
    /// </summary>
    [HttpGet("export")]
    public async Task<ActionResult> ExportSettings()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var settings = await _context.UserSettings.FirstOrDefaultAsync(s => s.UserId == userId);
        var notificationPrefs = await _context.UserNotificationPreferences
            .FirstOrDefaultAsync(n => n.UserId == userId);

        if (settings == null)
        {
            settings = new UserSettings { UserId = userId };
        }

        if (notificationPrefs == null)
        {
            notificationPrefs = new UserNotificationPreference { UserId = userId };
        }

        var dto = MapToDto(settings, notificationPrefs);
        
        return File(
            System.Text.Encoding.UTF8.GetBytes(System.Text.Json.JsonSerializer.Serialize(dto, new System.Text.Json.JsonSerializerOptions { WriteIndented = true })),
            "application/json",
            $"alina-settings-{DateTime.UtcNow:yyyyMMdd}.json"
        );
    }

    private UserSettingsDto MapToDto(UserSettings settings, UserNotificationPreference notificationPrefs)
    {
        return new UserSettingsDto
        {
            Theme = new ThemePreferencesDto
            {
                Mode = settings.ThemeMode,
                PrimaryColor = settings.PrimaryColor
            },
            Language = settings.Language,
            Timezone = settings.Timezone,
            DateFormat = settings.DateFormat,
            TimeFormat = settings.TimeFormat,
            Currency = settings.Currency,
            Notifications = new NotificationPreferencesDto
            {
                Email = new EmailNotificationsDto
                {
                    OrderUpdates = notificationPrefs.NewOrderAlerts,
                    Messages = notificationPrefs.MessageAlerts,
                    Promotions = notificationPrefs.PromotionAlerts,
                    WeeklyDigest = notificationPrefs.WeeklyEarningsReport,
                    NewOffers = notificationPrefs.MarketingEmails,
                    Reviews = notificationPrefs.ReviewAlerts
                },
                Push = new PushNotificationsDto
                {
                    OrderUpdates = notificationPrefs.PushNotifications && notificationPrefs.NewOrderAlerts,
                    Messages = notificationPrefs.PushNotifications && notificationPrefs.MessageAlerts,
                    Promotions = notificationPrefs.PushNotifications && notificationPrefs.PromotionAlerts,
                    NewOffers = notificationPrefs.PushNotifications && notificationPrefs.MarketingEmails
                },
                Sms = new SmsNotificationsDto
                {
                    OrderUpdates = notificationPrefs.SmsNotifications,
                    SecurityAlerts = notificationPrefs.SmsNotifications
                }
            },
            Privacy = new PrivacyPreferencesDto
            {
                ProfileVisibility = settings.ProfileVisibility,
                ShowEmail = settings.ShowEmail,
                ShowPhone = settings.ShowPhone,
                ActivityStatus = settings.ActivityStatus
            },
            Dashboard = new DashboardPreferencesDto
            {
                DefaultView = settings.DefaultView,
                ShowCompletedOrders = settings.ShowCompletedOrders,
                ItemsPerPage = settings.DashboardItemsPerPage
            },
            Search = new SearchPreferencesDto
            {
                SaveHistory = settings.SaveSearchHistory,
                DefaultSort = settings.DefaultSortBy,
                ItemsPerPage = settings.DefaultItemsPerPage
            },
            Accessibility = new AccessibilityPreferencesDto
            {
                ReducedMotion = settings.ReducedMotion,
                HighContrast = settings.HighContrast,
                FontSize = settings.FontSize
            }
        };
    }
}
