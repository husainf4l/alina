namespace alina_backend.Modules.profiles;

// DTOs for API responses and requests

public class ProfileResponse
{
    public string Id { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string? FullName { get; set; }
    public string? Email { get; set; }
    public string? DisplayName { get; set; }
    public string? Tagline { get; set; }
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public string? CoverImageUrl { get; set; }
    public string? Location { get; set; }
    public string? Country { get; set; }
    public string? TimeZone { get; set; }
    public string UserRole { get; set; } = "buyer";
    public int? ResponseTimeHours { get; set; }
    public DateTime? LastDeliveryAt { get; set; }
    public string? WebsiteUrl { get; set; }
    public string? TwitterUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? GithubUrl { get; set; }
    public int ProfileCompletionPercentage { get; set; }
    public bool IsVerified { get; set; }
    public bool IsPublic { get; set; }
    public DateTime MemberSince { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public double Rating { get; set; }
    public int ReviewCount { get; set; }
    public List<LanguageDto> Languages { get; set; } = new();
    public List<SkillDto> Skills { get; set; } = new();
}

public class UpdateProfileRequest
{
    public string? DisplayName { get; set; }
    public string? Tagline { get; set; }
    public string? Bio { get; set; }
    public string? Location { get; set; }
    public string? Country { get; set; }
    public string? TimeZone { get; set; }
    public string? UserRole { get; set; } // buyer, seller, both
    public string? WebsiteUrl { get; set; }
    public string? TwitterUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? GithubUrl { get; set; }
    public bool? IsPublic { get; set; }
}

public class LanguageDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string NameAr { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
}

public class SkillDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string NameAr { get; set; } = string.Empty;
}

public class AddLanguageRequest
{
    public Guid LanguageId { get; set; }
    public string ProficiencyLevel { get; set; } = "basic"; // basic, conversational, fluent, native
}

public class AddSkillRequest
{
    public Guid SkillId { get; set; }
    public string? Level { get; set; } // beginner, intermediate, expert
}
