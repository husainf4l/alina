using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using alina_backend.Modules.users;

namespace alina_backend.Modules.profiles;

public enum SellerLevel
{
    New,
    Level1,
    Level2,
    TopRated
}

public class Profile
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; } = null!;

    [MaxLength(50)]
    public string? DisplayName { get; set; }

    [MaxLength(150)]
    public string? Tagline { get; set; }

    [MaxLength(2000)]
    public string? Bio { get; set; }

    [MaxLength(255)]
    public string? AvatarUrl { get; set; }

    [MaxLength(255)]
    public string? CoverImageUrl { get; set; }

    [MaxLength(100)]
    public string? Location { get; set; }

    [MaxLength(100)]
    public string? Country { get; set; }

    [MaxLength(50)]
    public string? TimeZone { get; set; }

    // User role in marketplace
    [Required]
    [MaxLength(20)]
    public string UserRole { get; set; } = "buyer"; // buyer, seller, both

    [MaxLength(10)]
    public string PreferredCurrency { get; set; } = "USD"; // SAR, AED, JOD, USD

    // Seller-specific fields
    public int? ResponseTimeHours { get; set; }
    public DateTime? LastDeliveryAt { get; set; }
    public SellerLevel SellerLevel { get; set; } = SellerLevel.New;

    // Social links
    [MaxLength(255)]
    public string? WebsiteUrl { get; set; }

    [MaxLength(255)]
    public string? TwitterUrl { get; set; }

    [MaxLength(255)]
    public string? LinkedInUrl { get; set; }

    [MaxLength(255)]
    public string? GithubUrl { get; set; }

    // Profile completion
    public int ProfileCompletionPercentage { get; set; } = 0;

    // Profile status
    public bool IsVerified { get; set; } = false;
    public bool IsAdmin { get; set; } = false;
    public bool IsPublic { get; set; } = true;

    // Audit fields
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public ICollection<ProfileLanguage> ProfileLanguages { get; set; } = new List<ProfileLanguage>();
    public ICollection<ProfileSkill> ProfileSkills { get; set; } = new List<ProfileSkill>();
}

// Language proficiency for users
public class Language
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty; // English, Arabic, Spanish, etc.

    [Required]
    [MaxLength(5)]
    public string Code { get; set; } = string.Empty; // en, ar, es, etc.

    public ICollection<ProfileLanguage> ProfileLanguages { get; set; } = new List<ProfileLanguage>();
}

// Join table for Profile-Language many-to-many
public class ProfileLanguage
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid ProfileId { get; set; }

    [ForeignKey("ProfileId")]
    public Profile Profile { get; set; } = null!;

    [Required]
    public Guid LanguageId { get; set; }

    [ForeignKey("LanguageId")]
    public Language Language { get; set; } = null!;

    [Required]
    [MaxLength(20)]
    public string ProficiencyLevel { get; set; } = "basic"; // basic, conversational, fluent, native
}

// Skills/expertise tags
public class Skill
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty; // React, UI/UX Design, SEO, etc.

    [MaxLength(50)]
    public string? CategoryName { get; set; } // Programming, Design, Marketing, etc.

    public ICollection<ProfileSkill> ProfileSkills { get; set; } = new List<ProfileSkill>();
}

// Join table for Profile-Skill many-to-many
public class ProfileSkill
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid ProfileId { get; set; }

    [ForeignKey("ProfileId")]
    public Profile Profile { get; set; } = null!;

    [Required]
    public Guid SkillId { get; set; }

    [ForeignKey("SkillId")]
    public Skill Skill { get; set; } = null!;

    // Optional: skill level
    [MaxLength(20)]
    public string? Level { get; set; } // beginner, intermediate, expert
}
