using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace alina_backend.Modules.profiles;

[ApiController]
[Route("api/profiles")]
public class ProfileController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IImageStorageService _imageStorage;
    private readonly ILogger<ProfileController> _logger;

    public ProfileController(AppDbContext context, IImageStorageService imageStorage, ILogger<ProfileController> logger)
    {
        _context = context;
        _imageStorage = imageStorage;
        _logger = logger;
    }

    /// <summary>
    /// Get public profile by user ID
    /// </summary>
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetProfile(Guid userId)
    {
        var profile = await _context.Profiles
            .Include(p => p.User)
            .Include(p => p.ProfileLanguages)
                .ThenInclude(pl => pl.Language)
            .Include(p => p.ProfileSkills)
                .ThenInclude(ps => ps.Skill)
            .FirstOrDefaultAsync(p => p.UserId == userId);

        if (profile == null)
        {
            return NotFound(new { error = "profile_not_found", error_description = "Profile not found" });
        }

        if (!profile.IsPublic && GetCurrentUserId() != userId)
        {
            return Forbid();
        }

        var response = MapToProfileResponse(profile);
        return Ok(response);
    }

    /// <summary>
    /// Get current user's profile
    /// </summary>
    [Authorize]
    [HttpGet("/api/auth/me")]
    public async Task<IActionResult> GetMyProfile()
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles
            .Include(p => p.User)
            .Include(p => p.ProfileLanguages)
                .ThenInclude(pl => pl.Language)
            .Include(p => p.ProfileSkills)
                .ThenInclude(ps => ps.Skill)
            .FirstOrDefaultAsync(p => p.UserId == userId);

        if (profile == null)
        {
            // Auto-create profile if doesn't exist
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return Unauthorized();
            }

            profile = new Profile
            {
                UserId = user.Id,
                DisplayName = user.FullName,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();

            // Reload with includes
            profile = await _context.Profiles
                .Include(p => p.User)
                .Include(p => p.ProfileLanguages)
                    .ThenInclude(pl => pl.Language)
                .Include(p => p.ProfileSkills)
                    .ThenInclude(ps => ps.Skill)
                .FirstAsync(p => p.Id == profile.Id);

            _logger.LogInformation("Auto-created profile for user {UserId}", userId);
        }

        var response = MapToProfileResponse(profile);
        return Ok(response);
    }

    /// <summary>
    /// Update current user's profile
    /// </summary>
    [Authorize]
    [HttpPut("/api/auth/me")]
    public async Task<IActionResult> UpdateMyProfile([FromBody] UpdateProfileRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.UserId == userId);

        if (profile == null)
        {
            return NotFound(new { error = "profile_not_found", error_description = "Profile not found" });
        }

        // Update fields
        if (request.DisplayName != null)
            profile.DisplayName = request.DisplayName;

        if (request.Tagline != null)
            profile.Tagline = request.Tagline;

        if (request.Bio != null)
            profile.Bio = request.Bio;

        if (request.Location != null)
            profile.Location = request.Location;

        if (request.Country != null)
            profile.Country = request.Country;

        if (request.TimeZone != null)
            profile.TimeZone = request.TimeZone;

        if (request.UserRole != null && IsValidUserRole(request.UserRole))
        {
            // VAL-07: Gate seller/tasker role upgrade — require a minimum completed profile.
            var isUpgradingToSeller = (request.UserRole == "seller" || request.UserRole == "tasker" || request.UserRole == "both")
                && profile.UserRole == "buyer";
            if (isUpgradingToSeller)
            {
                if (string.IsNullOrWhiteSpace(profile.DisplayName) || string.IsNullOrWhiteSpace(profile.Bio))
                    return BadRequest(new { error = "Complete your display name and bio before becoming a seller." });
            }
            profile.UserRole = request.UserRole;
        }

        if (request.WebsiteUrl != null)
            profile.WebsiteUrl = request.WebsiteUrl;

        if (request.TwitterUrl != null)
            profile.TwitterUrl = request.TwitterUrl;

        if (request.LinkedInUrl != null)
            profile.LinkedInUrl = request.LinkedInUrl;

        if (request.GithubUrl != null)
            profile.GithubUrl = request.GithubUrl;

        if (request.IsPublic.HasValue)
            profile.IsPublic = request.IsPublic.Value;

        profile.UpdatedAt = DateTime.UtcNow;
        profile.ProfileCompletionPercentage = CalculateProfileCompletion(profile);

        await _context.SaveChangesAsync();

        _logger.LogInformation("Profile updated for user {UserId}", userId);

        // Reload with includes
        profile = await _context.Profiles
            .Include(p => p.User)
            .Include(p => p.ProfileLanguages)
                .ThenInclude(pl => pl.Language)
            .Include(p => p.ProfileSkills)
                .ThenInclude(ps => ps.Skill)
            .FirstAsync(p => p.Id == profile.Id);

        var response = MapToProfileResponse(profile);
        return Ok(response);
    }

    /// <summary>
    /// Upload profile avatar
    /// </summary>
    [Authorize]
    [HttpPost("/api/auth/me/avatar")]
    public async Task<IActionResult> UploadAvatar([FromForm] IFormFile file)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        if (file == null || file.Length == 0)
        {
            return BadRequest(new { error = "invalid_file", error_description = "No file provided" });
        }

        // Validate file
        using var stream = file.OpenReadStream();
        var isValid = await _imageStorage.ValidateImageAsync(stream, maxSizeBytes: 5 * 1024 * 1024); // 5MB
        if (!isValid)
        {
            return BadRequest(new { error = "invalid_image", error_description = "Invalid image format or size too large (max 5MB)" });
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            return NotFound(new { error = "profile_not_found", error_description = "Profile not found" });
        }

        // Delete old avatar if exists
        if (!string.IsNullOrEmpty(profile.AvatarUrl))
        {
            await _imageStorage.DeleteImageAsync(profile.AvatarUrl);
        }

        // Upload new avatar
        stream.Position = 0;
        var avatarUrl = await _imageStorage.UploadImageAsync(stream, file.FileName, "avatars");

        profile.AvatarUrl = avatarUrl;
        profile.UpdatedAt = DateTime.UtcNow;
        profile.ProfileCompletionPercentage = CalculateProfileCompletion(profile);

        await _context.SaveChangesAsync();

        _logger.LogInformation("Avatar uploaded for user {UserId}", userId);

        return Ok(new { avatar_url = avatarUrl });
    }

    /// <summary>
    /// Upload cover image
    /// </summary>
    [Authorize]
    [HttpPost("/api/auth/me/cover")]
    public async Task<IActionResult> UploadCoverImage([FromForm] IFormFile file)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        if (file == null || file.Length == 0)
        {
            return BadRequest(new { error = "invalid_file", error_description = "No file provided" });
        }

        // Validate file
        using var stream = file.OpenReadStream();
        var isValid = await _imageStorage.ValidateImageAsync(stream, maxSizeBytes: 10 * 1024 * 1024); // 10MB for cover
        if (!isValid)
        {
            return BadRequest(new { error = "invalid_image", error_description = "Invalid image format or size too large (max 10MB)" });
        }

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile == null)
        {
            return NotFound(new { error = "profile_not_found", error_description = "Profile not found" });
        }

        // Delete old cover if exists
        if (!string.IsNullOrEmpty(profile.CoverImageUrl))
        {
            await _imageStorage.DeleteImageAsync(profile.CoverImageUrl);
        }

        // Upload new cover
        stream.Position = 0;
        var coverUrl = await _imageStorage.UploadImageAsync(stream, file.FileName, "covers");

        profile.CoverImageUrl = coverUrl;
        profile.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        _logger.LogInformation("Cover image uploaded for user {UserId}", userId);

        return Ok(new { cover_url = coverUrl });
    }

    /// <summary>
    /// Add language to profile
    /// </summary>
    [Authorize]
    [HttpPost("/api/auth/me/languages")]
    public async Task<IActionResult> AddLanguage([FromBody] AddLanguageRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles
            .Include(p => p.ProfileLanguages)
            .FirstOrDefaultAsync(p => p.UserId == userId);

        if (profile == null)
        {
            return NotFound(new { error = "profile_not_found", error_description = "Profile not found" });
        }

        // Check if language exists
        var language = await _context.Languages.FindAsync(request.LanguageId);
        if (language == null)
        {
            return BadRequest(new { error = "language_not_found", error_description = "Language not found" });
        }

        // Check if already added
        if (profile.ProfileLanguages.Any(pl => pl.LanguageId == request.LanguageId))
        {
            return BadRequest(new { error = "language_exists", error_description = "Language already added" });
        }

        var profileLanguage = new ProfileLanguage
        {
            ProfileId = profile.Id,
            LanguageId = request.LanguageId,
            ProficiencyLevel = request.ProficiencyLevel
        };

        _context.ProfileLanguages.Add(profileLanguage);
        profile.UpdatedAt = DateTime.UtcNow;
        profile.ProfileCompletionPercentage = CalculateProfileCompletion(profile);

        await _context.SaveChangesAsync();

        _logger.LogInformation("Language added to profile for user {UserId}", userId);

        return Ok(new { message = "Language added successfully" });
    }

    /// <summary>
    /// Remove language from profile
    /// </summary>
    [Authorize]
    [HttpDelete("/api/auth/me/languages/{languageId}")]
    public async Task<IActionResult> RemoveLanguage(Guid languageId)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles
            .Include(p => p.ProfileLanguages)
            .FirstOrDefaultAsync(p => p.UserId == userId);

        if (profile == null)
        {
            return NotFound(new { error = "profile_not_found", error_description = "Profile not found" });
        }

        var profileLanguage = profile.ProfileLanguages.FirstOrDefault(pl => pl.LanguageId == languageId);
        if (profileLanguage == null)
        {
            return NotFound(new { error = "language_not_found", error_description = "Language not found in profile" });
        }

        _context.ProfileLanguages.Remove(profileLanguage);
        profile.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        _logger.LogInformation("Language removed from profile for user {UserId}", userId);

        return Ok(new { message = "Language removed successfully" });
    }

    /// <summary>
    /// Add skill to profile
    /// </summary>
    [Authorize]
    [HttpPost("/api/auth/me/skills")]
    public async Task<IActionResult> AddSkill([FromBody] AddSkillRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles
            .Include(p => p.ProfileSkills)
            .FirstOrDefaultAsync(p => p.UserId == userId);

        if (profile == null)
        {
            return NotFound(new { error = "profile_not_found", error_description = "Profile not found" });
        }

        // Check if skill exists
        var skill = await _context.Skills.FindAsync(request.SkillId);
        if (skill == null)
        {
            return BadRequest(new { error = "skill_not_found", error_description = "Skill not found" });
        }

        // Check if already added
        if (profile.ProfileSkills.Any(ps => ps.SkillId == request.SkillId))
        {
            return BadRequest(new { error = "skill_exists", error_description = "Skill already added" });
        }

        var profileSkill = new ProfileSkill
        {
            ProfileId = profile.Id,
            SkillId = request.SkillId,
            Level = request.Level
        };

        _context.ProfileSkills.Add(profileSkill);
        profile.UpdatedAt = DateTime.UtcNow;
        profile.ProfileCompletionPercentage = CalculateProfileCompletion(profile);

        await _context.SaveChangesAsync();

        _logger.LogInformation("Skill added to profile for user {UserId}", userId);

        return Ok(new { message = "Skill added successfully" });
    }

    /// <summary>
    /// Remove skill from profile
    /// </summary>
    [Authorize]
    [HttpDelete("/api/auth/me/skills/{skillId}")]
    public async Task<IActionResult> RemoveSkill(Guid skillId)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var profile = await _context.Profiles
            .Include(p => p.ProfileSkills)
            .FirstOrDefaultAsync(p => p.UserId == userId);

        if (profile == null)
        {
            return NotFound(new { error = "profile_not_found", error_description = "Profile not found" });
        }

        var profileSkill = profile.ProfileSkills.FirstOrDefault(ps => ps.SkillId == skillId);
        if (profileSkill == null)
        {
            return NotFound(new { error = "skill_not_found", error_description = "Skill not found in profile" });
        }

        _context.ProfileSkills.Remove(profileSkill);
        profile.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        _logger.LogInformation("Skill removed from profile for user {UserId}", userId);

        return Ok(new { message = "Skill removed successfully" });
    }

    /// <summary>
    /// Get all available languages
    /// </summary>
    [HttpGet("languages")]
    public async Task<IActionResult> GetLanguages()
    {
        var languages = await _context.Languages
            .Select(l => new { l.Id, l.Name, l.Code })
            .ToListAsync();

        return Ok(languages);
    }

    /// <summary>
    /// Get all available skills
    /// </summary>
    [HttpGet("skills")]
    public async Task<IActionResult> GetSkills([FromQuery] string? category = null)
    {
        var query = _context.Skills.AsQueryable();

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(s => s.CategoryName == category);
        }

        var skills = await query
            .Select(s => new { s.Id, s.Name, s.CategoryName })
            .ToListAsync();

        return Ok(skills);
    }

    // Helper methods

    private Guid? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return userIdClaim != null ? Guid.Parse(userIdClaim) : null;
    }

    private bool IsValidUserRole(string role)
    {
        return role == "buyer" || role == "seller" || role == "both";
    }

    private int CalculateProfileCompletion(Profile profile)
    {
        int total = 0;
        int completed = 0;

        // Basic info (40%)
        total += 4;
        if (!string.IsNullOrEmpty(profile.DisplayName)) completed++;
        if (!string.IsNullOrEmpty(profile.Bio)) completed++;
        if (!string.IsNullOrEmpty(profile.AvatarUrl)) completed++;
        if (!string.IsNullOrEmpty(profile.Location)) completed++;

        // Additional info (30%)
        total += 3;
        if (!string.IsNullOrEmpty(profile.Tagline)) completed++;
        if (profile.ProfileLanguages.Any()) completed++;
        if (profile.ProfileSkills.Any()) completed++;

        // Optional info (30%)
        total += 3;
        if (!string.IsNullOrEmpty(profile.CoverImageUrl)) completed++;
        if (!string.IsNullOrEmpty(profile.WebsiteUrl)) completed++;
        if (!string.IsNullOrEmpty(profile.TwitterUrl) || !string.IsNullOrEmpty(profile.LinkedInUrl)) completed++;

        return (int)Math.Round((double)completed / total * 100);
    }

    private ProfileResponse MapToProfileResponse(Profile profile)
    {
        return new ProfileResponse
        {
            Id = profile.Id.ToString(),
            UserId = profile.UserId.ToString(),
            FullName = profile.User.FullName,
            Email = profile.User.Email,
            DisplayName = profile.DisplayName,
            Tagline = profile.Tagline,
            Bio = profile.Bio,
            AvatarUrl = profile.AvatarUrl,
            CoverImageUrl = profile.CoverImageUrl,
            Location = profile.Location,
            Country = profile.Country,
            TimeZone = profile.TimeZone,
            UserRole = profile.UserRole,
            ResponseTimeHours = profile.ResponseTimeHours,
            LastDeliveryAt = profile.LastDeliveryAt,
            WebsiteUrl = profile.WebsiteUrl,
            TwitterUrl = profile.TwitterUrl,
            LinkedInUrl = profile.LinkedInUrl,
            GithubUrl = profile.GithubUrl,
            ProfileCompletionPercentage = profile.ProfileCompletionPercentage,
            IsVerified = profile.IsVerified,
            IsPublic = profile.IsPublic,
            MemberSince = profile.User.CreatedAt,
            UpdatedAt = profile.UpdatedAt,
            CreatedAt = profile.CreatedAt,
            Rating = 0.0, // TODO: Calculate from reviews
            ReviewCount = 0, // TODO: Calculate from reviews
            Languages = profile.ProfileLanguages.Select(pl => new LanguageDto
            {
                Id = pl.Language.Id.ToString(),
                Name = pl.Language.Name,
                NameAr = pl.Language.Name, // TODO: Add Arabic names to database
                Code = pl.Language.Code,
            }).ToList(),
            Skills = profile.ProfileSkills.Select(ps => new SkillDto
            {
                Id = ps.Skill.Id.ToString(),
                Name = ps.Skill.Name,
                NameAr = ps.Skill.Name, // TODO: Add Arabic names to database
            }).ToList()
        };
    }
}
