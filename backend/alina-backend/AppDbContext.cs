using Microsoft.EntityFrameworkCore;
using alina_backend.Modules.users;
using alina_backend.Modules.profiles;
using alina_backend.Modules.marketplace;
using alina_backend.Modules.messaging;
using alina_backend.Modules.media;
using alina_backend.Modules.finance;
using alina_backend.Modules.orders;
using alina_backend.Modules.notifications;
using alina_backend.Modules.support;
using alina_backend.Modules.legal;
using alina_backend.Modules.disputes;
using alina_backend.Modules.fraud;
using alina_backend.Modules.dashboard;
using alina_backend.Modules.marketing;
using alina_backend.Modules.business;
using alina_backend.Modules.auth;
using alina_backend.Modules.settings;

namespace alina_backend;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    // Profiles
    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<ProfileLanguage> ProfileLanguages { get; set; }
    public DbSet<ProfileSkill> ProfileSkills { get; set; }

    // Marketplace
    public DbSet<CustomOffer> CustomOffers { get; set; }
    public DbSet<Favorite> Favorites { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Gig> Gigs { get; set; }
    public DbSet<Package> Packages { get; set; }
    public DbSet<UserTask> UserTasks { get; set; }
    public DbSet<Offer> Offers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Revision> Revisions { get; set; }
    public DbSet<SearchAnalytics> SearchAnalytics { get; set; }

    // Messaging
    public DbSet<Message> Messages { get; set; }

    // Media
    public DbSet<Media> Media { get; set; }

    // Finance
    public DbSet<Wallet> Wallets { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<CurrencyRate> CurrencyRates { get; set; }
    public DbSet<WithdrawalRequest> WithdrawalRequests { get; set; }

    // Notifications
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<UserNotificationSettings> UserNotificationSettings { get; set; }

    // Support
    public DbSet<SupportTicket> SupportTickets { get; set; }

    // Legal
    public DbSet<LegalDocument> LegalDocuments { get; set; }

    // Disputes
    public DbSet<Dispute> Disputes { get; set; }

    // Fraud Protection
    public DbSet<FraudFlag> FraudFlags { get; set; }

    // Dashboard Goals
    public DbSet<Goal> Goals { get; set; }
    public DbSet<GoalProgress> GoalProgress { get; set; }
    public DbSet<AchievementBadge> AchievementBadges { get; set; }

    // Marketing
    public DbSet<Promotion> Promotions { get; set; }
    public DbSet<AdCampaign> AdCampaigns { get; set; }

    // Business
    public DbSet<ScheduleSlot> ScheduleSlots { get; set; }
    public DbSet<AvailabilitySetting> AvailabilitySettings { get; set; }
    public DbSet<BusinessToolSetting> BusinessToolSettings { get; set; }

    // Conversations
    public DbSet<Conversation> Conversations { get; set; }

    // User Settings
    public DbSet<UserNotificationPreference> UserNotificationPreferences { get; set; }
    public DbSet<UserSettings> UserSettings { get; set; }
    
    // Two-Factor Authentication
    public DbSet<alina_backend.Modules.auth.TwoFactorVerification> TwoFactorVerifications { get; set; }
    public DbSet<alina_backend.Modules.auth.UserTotpSettings> UserTotpSettings { get; set; }
    public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ── Performance Indexes ────────────────────────────────────────────────

        // Auth: email lookup on every login
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique()
            .HasDatabaseName("IX_Users_Email");

        // Auth: refresh token lookup on every token refresh
        modelBuilder.Entity<RefreshToken>()
            .HasIndex(rt => rt.Token)
            .IsUnique()
            .HasDatabaseName("IX_RefreshTokens_Token");

        // Profile by UserId (used everywhere)
        modelBuilder.Entity<Profile>()
            .HasIndex(p => p.UserId)
            .IsUnique()
            .HasDatabaseName("IX_Profiles_UserId");

        // Orders by buyer, seller, status
        modelBuilder.Entity<Order>()
            .HasIndex(o => o.BuyerId)
            .HasDatabaseName("IX_Orders_BuyerId");

        modelBuilder.Entity<Order>()
            .HasIndex(o => o.SellerId)
            .HasDatabaseName("IX_Orders_SellerId");

        modelBuilder.Entity<Order>()
            .HasIndex(o => o.Status)
            .HasDatabaseName("IX_Orders_Status");

        modelBuilder.Entity<Order>()
            .HasIndex(o => new { o.SellerId, o.Status })
            .HasDatabaseName("IX_Orders_SellerId_Status");

        // Transactions by wallet and order
        modelBuilder.Entity<Transaction>()
            .HasIndex(t => t.WalletId)
            .HasDatabaseName("IX_Transactions_WalletId");

        modelBuilder.Entity<Transaction>()
            .HasIndex(t => t.OrderId)
            .HasDatabaseName("IX_Transactions_OrderId");

        // Gigs by category and seller
        modelBuilder.Entity<Gig>()
            .HasIndex(g => g.CategoryId)
            .HasDatabaseName("IX_Gigs_CategoryId");

        modelBuilder.Entity<Gig>()
            .HasIndex(g => g.SellerId)
            .HasDatabaseName("IX_Gigs_SellerId");

        // Notifications by user
        modelBuilder.Entity<Notification>()
            .HasIndex(n => n.UserId)
            .HasDatabaseName("IX_Notifications_UserId");

        // Search analytics by term
        modelBuilder.Entity<SearchAnalytics>()
            .HasIndex(sa => sa.SearchTerm)
            .HasDatabaseName("IX_SearchAnalytics_SearchTerm");

        // WithdrawalRequests by user and status
        modelBuilder.Entity<WithdrawalRequest>()
            .HasIndex(w => w.UserId)
            .HasDatabaseName("IX_WithdrawalRequests_UserId");

        modelBuilder.Entity<WithdrawalRequest>()
            .HasIndex(w => w.Status)
            .HasDatabaseName("IX_WithdrawalRequests_Status");

        // Wallet by ProfileId
        modelBuilder.Entity<Wallet>()
            .HasIndex(w => w.ProfileId)
            .HasDatabaseName("IX_Wallets_ProfileId");

        // Reviews by GigId
        modelBuilder.Entity<Review>()
            .HasIndex(r => r.GigId)
            .HasDatabaseName("IX_Reviews_GigId");


        // Messaging: Conversations by participants (frequent lookup)
        modelBuilder.Entity<Conversation>()
            .HasIndex(c => new { c.User1Id, c.User2Id })
            .HasDatabaseName("IX_Conversations_User1Id_User2Id");

        modelBuilder.Entity<Conversation>()
            .HasIndex(c => c.UpdatedAt)
            .HasDatabaseName("IX_Conversations_UpdatedAt");

        // Messages by conversation (for GetMessages queries)
        modelBuilder.Entity<Message>()
            .HasIndex(m => m.ConversationId)
            .HasDatabaseName("IX_Messages_ConversationId");

        modelBuilder.Entity<Message>()
            .HasIndex(m => new { m.ConversationId, m.CreatedAt })
            .HasDatabaseName("IX_Messages_ConversationId_CreatedAt");

        // TwoFactor: quick lookup by UserId+Purpose
        modelBuilder.Entity<alina_backend.Modules.auth.TwoFactorVerification>()
            .HasIndex(v => new { v.UserId, v.Purpose, v.IsUsed })
            .HasDatabaseName("IX_TwoFactorVerifications_UserId_Purpose");

        // ── End Indexes ────────────────────────────────────────────────────────


        // User-Profile one-to-one relationship
        modelBuilder.Entity<User>()
            .HasOne<Profile>()
            .WithOne(p => p.User)
            .HasForeignKey<Profile>(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Category self-reference
        modelBuilder.Entity<Category>()
            .HasOne(c => c.Parent)
            .WithMany(c => c.SubCategories)
            .HasForeignKey(c => c.ParentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Gig relationships
        modelBuilder.Entity<Gig>()
            .HasOne(g => g.Seller)
            .WithMany()
            .HasForeignKey(g => g.SellerId);

        modelBuilder.Entity<Gig>()
            .HasOne(g => g.Category)
            .WithMany(c => c.Gigs)
            .HasForeignKey(g => g.CategoryId);

        // Package relationships
        modelBuilder.Entity<Package>()
            .HasOne(p => p.Gig)
            .WithMany(g => g.Packages)
            .HasForeignKey(p => p.GigId)
            .OnDelete(DeleteBehavior.Cascade);

        // Order relationships
        modelBuilder.Entity<Order>()
            .HasOne(o => o.Buyer)
            .WithMany()
            .HasForeignKey(o => o.BuyerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Order>()
            .HasOne(o => o.Seller)
            .WithMany()
            .HasForeignKey(o => o.SellerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Review relationships
        modelBuilder.Entity<Review>()
            .HasOne(r => r.Order)
            .WithOne()
            .HasForeignKey<Review>(r => r.OrderId);

        // Message relationships
        modelBuilder.Entity<Message>()
            .HasOne(m => m.Sender)
            .WithMany()
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Message>()
            .HasOne(m => m.Receiver)
            .WithMany()
            .HasForeignKey(m => m.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);

        // UserTask relationships
        modelBuilder.Entity<UserTask>()
            .HasOne(t => t.Poster)
            .WithMany()
            .HasForeignKey(t => t.PosterId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<UserTask>()
            .HasOne(t => t.AssignedTasker)
            .WithMany()
            .HasForeignKey(t => t.AssignedTaskerId);

        modelBuilder.Entity<UserTask>()
            .HasOne(t => t.Category)
            .WithMany()
            .HasForeignKey(t => t.CategoryId);

        // Offer relationships
        modelBuilder.Entity<Offer>()
            .HasOne(o => o.Task)
            .WithMany(t => t.Offers)
            .HasForeignKey(o => o.TaskId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Offer>()
            .HasOne(o => o.Tasker)
            .WithMany()
            .HasForeignKey(o => o.TaskerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Order relationships updates
        modelBuilder.Entity<Order>()
            .HasOne(o => o.Gig)
            .WithMany()
            .HasForeignKey(o => o.GigId);

        modelBuilder.Entity<Order>()
            .HasOne(o => o.Offer)
            .WithOne()
            .HasForeignKey<Order>(o => o.OfferId);

        // Media relationships
        modelBuilder.Entity<Media>()
            .HasOne(m => m.Owner)
            .WithMany()
            .HasForeignKey(m => m.OwnerId);
        
        modelBuilder.Entity<Media>()
            .HasOne(m => m.Gig)
            .WithMany(g => g.Gallery)
            .HasForeignKey(m => m.GigId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Media>()
            .HasOne(m => m.UserTask)
            .WithMany(t => t.Attachments)
            .HasForeignKey(m => m.UserTaskId)
            .OnDelete(DeleteBehavior.Cascade);

        // Wallet and Transaction
        modelBuilder.Entity<Wallet>()
            .HasOne(w => w.Profile)
            .WithOne()
            .HasForeignKey<Wallet>(w => w.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Wallet)
            .WithMany()
            .HasForeignKey(t => t.WalletId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Transaction>()
            .Property(t => t.Amount)
            .HasPrecision(18, 2);
        
        modelBuilder.Entity<Wallet>()
            .Property(w => w.AvailableBalance)
            .HasPrecision(18, 2);
        
        modelBuilder.Entity<Wallet>()
            .Property(w => w.EscrowBalance)
            .HasPrecision(18, 2);

        // Decimal precision for Order and other money fields
        modelBuilder.Entity<Order>()
            .Property(o => o.Amount)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Order>()
            .Property(o => o.SellerAmount)
            .HasPrecision(18, 2);

        // DB-03: Concurrency token for Wallet balances to prevent race conditions
        modelBuilder.Entity<Wallet>()
            .Property(w => w.RowVersion)
            .IsRowVersion();

        // Notifications
        modelBuilder.Entity<Notification>()
            .HasOne(n => n.User)
            .WithMany()
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Goal relationships
        modelBuilder.Entity<Goal>()
            .HasOne(g => g.Profile)
            .WithMany()
            .HasForeignKey(g => g.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<GoalProgress>()
            .HasOne(gp => gp.Goal)
            .WithMany(g => g.ProgressEntries)
            .HasForeignKey(gp => gp.GoalId)
            .OnDelete(DeleteBehavior.Cascade);


        // PasswordResetToken: FK to User
        modelBuilder.Entity<PasswordResetToken>()
            .HasIndex(t => t.UserId)
            .HasDatabaseName("IX_PasswordResetTokens_UserId");

        modelBuilder.Entity<PasswordResetToken>()
            .HasIndex(t => t.TokenHash)
            .HasDatabaseName("IX_PasswordResetTokens_TokenHash");

        // Message.ConversationId FK (partial class adds this property)
        modelBuilder.Entity<Message>()
            .HasOne(m => m.Conversation)
            .WithMany(c => c.Messages)
            .HasForeignKey(m => m.ConversationId)
            .OnDelete(DeleteBehavior.Cascade);

        // Seed Currency Rates (Approximate GCC rates relative to 1 USD)
        modelBuilder.Entity<CurrencyRate>().HasData(
            // Base
            new CurrencyRate { Code = "USD", Rate = 1.0000m,  LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            // Major
            new CurrencyRate { Code = "EUR", Rate = 0.9200m,  LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CurrencyRate { Code = "GBP", Rate = 0.7900m,  LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CurrencyRate { Code = "TRY", Rate = 34.0000m, LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CurrencyRate { Code = "EGP", Rate = 49.0000m, LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            // Gulf
            new CurrencyRate { Code = "SAR", Rate = 3.7500m,  LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CurrencyRate { Code = "AED", Rate = 3.6725m,  LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CurrencyRate { Code = "KWD", Rate = 0.3070m,  LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CurrencyRate { Code = "BHD", Rate = 0.3760m,  LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CurrencyRate { Code = "OMR", Rate = 0.3845m,  LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CurrencyRate { Code = "QAR", Rate = 3.6400m,  LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CurrencyRate { Code = "JOD", Rate = 0.7090m,  LastUpdated = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
        );

        // Seed common languages
        // PAT-04: Fixed GUIDs — never use Guid.NewGuid() in HasData (regenerates each migration)
        modelBuilder.Entity<Language>().HasData(
            new Language { Id = new Guid("a1000000-0000-0000-0000-000000000001"), Name = "English",    Code = "en" },
            new Language { Id = new Guid("a1000000-0000-0000-0000-000000000002"), Name = "Arabic",     Code = "ar" },
            new Language { Id = new Guid("a1000000-0000-0000-0000-000000000003"), Name = "Spanish",    Code = "es" },
            new Language { Id = new Guid("a1000000-0000-0000-0000-000000000004"), Name = "French",     Code = "fr" },
            new Language { Id = new Guid("a1000000-0000-0000-0000-000000000005"), Name = "German",     Code = "de" },
            new Language { Id = new Guid("a1000000-0000-0000-0000-000000000006"), Name = "Chinese",    Code = "zh" },
            new Language { Id = new Guid("a1000000-0000-0000-0000-000000000007"), Name = "Japanese",   Code = "ja" },
            new Language { Id = new Guid("a1000000-0000-0000-0000-000000000008"), Name = "Portuguese", Code = "pt" },
            new Language { Id = new Guid("a1000000-0000-0000-0000-000000000009"), Name = "Russian",    Code = "ru" },
            new Language { Id = new Guid("a1000000-0000-0000-0000-000000000010"), Name = "Hindi",      Code = "hi" }
        );

        // Seed common skills
        // PAT-04: Fixed GUIDs — never use Guid.NewGuid() in HasData
        modelBuilder.Entity<Skill>().HasData(
            // Programming
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000001"), Name = "React",                    CategoryName = "Programming" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000002"), Name = "Node.js",                  CategoryName = "Programming" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000003"), Name = "Python",                   CategoryName = "Programming" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000004"), Name = "JavaScript",               CategoryName = "Programming" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000005"), Name = "TypeScript",               CategoryName = "Programming" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000006"), Name = "C#",                       CategoryName = "Programming" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000007"), Name = "Java",                     CategoryName = "Programming" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000008"), Name = "Flutter",                  CategoryName = "Programming" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000009"), Name = "Swift",                    CategoryName = "Programming" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000010"), Name = "Kotlin",                   CategoryName = "Programming" },
            // Design
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000011"), Name = "UI/UX Design",             CategoryName = "Design" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000012"), Name = "Figma",                    CategoryName = "Design" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000013"), Name = "Adobe Photoshop",          CategoryName = "Design" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000014"), Name = "Adobe Illustrator",        CategoryName = "Design" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000015"), Name = "Graphic Design",           CategoryName = "Design" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000016"), Name = "Logo Design",              CategoryName = "Design" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000017"), Name = "3D Modeling",              CategoryName = "Design" },
            // Marketing
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000018"), Name = "SEO",                     CategoryName = "Marketing" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000019"), Name = "Social Media Marketing",   CategoryName = "Marketing" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000020"), Name = "Content Writing",          CategoryName = "Marketing" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000021"), Name = "Email Marketing",          CategoryName = "Marketing" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000022"), Name = "Digital Marketing",        CategoryName = "Marketing" },
            // Video & Animation
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000023"), Name = "Video Editing",            CategoryName = "Video & Animation" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000024"), Name = "After Effects",            CategoryName = "Video & Animation" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000025"), Name = "Animation",                CategoryName = "Video & Animation" },
            // Writing
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000026"), Name = "Copywriting",              CategoryName = "Writing" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000027"), Name = "Technical Writing",        CategoryName = "Writing" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000028"), Name = "Translation",              CategoryName = "Writing" },
            // Business
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000029"), Name = "Data Analysis",            CategoryName = "Business" },
            new Skill { Id = new Guid("a2000000-0000-0000-0000-000000000030"), Name = "Business Consulting",      CategoryName = "Business" }
        );

        // Seed Marketplace Categories
        // PAT-04: Fixed GUIDs for parent category IDs
        var graphicsId         = new Guid("a3000000-0000-0000-0000-000000000001");
        var programmingId      = new Guid("a3000000-0000-0000-0000-000000000002");
        var writingId          = new Guid("a3000000-0000-0000-0000-000000000003");
        var videoId            = new Guid("a3000000-0000-0000-0000-000000000004");
        var digitalMarketingId = new Guid("a3000000-0000-0000-0000-000000000005");
        var businessServicesId = new Guid("a3000000-0000-0000-0000-000000000006");
        var musicAudioId       = new Guid("a3000000-0000-0000-0000-000000000007");
        var lifestyleCoachingId = new Guid("a3000000-0000-0000-0000-000000000008");

        modelBuilder.Entity<Category>().HasData(
            // ========== MAIN CATEGORIES ==========
            new Category { Id = graphicsId, Name = "Graphics & Design", NameAr = "الجرافيك والتصميم", Icon = "brush" },
            new Category { Id = programmingId, Name = "Programming & Tech", NameAr = "البرمجة والتكنولوجيا", Icon = "code" },
            new Category { Id = digitalMarketingId, Name = "Digital Marketing", NameAr = "التسويق الرقمي", Icon = "trending_up" },
            new Category { Id = writingId, Name = "Writing & Translation", NameAr = "الكتابة والترجمة", Icon = "pen" },
            new Category { Id = videoId, Name = "Video & Animation", NameAr = "الفيديو والأنيميشن", Icon = "video" },
            new Category { Id = businessServicesId, Name = "Business Services", NameAr = "الخدمات التجارية", Icon = "business" },
            new Category { Id = musicAudioId, Name = "Music & Audio", NameAr = "الموسيقى والصوتيات", Icon = "music_note" },
            new Category { Id = lifestyleCoachingId, Name = "Lifestyle & Coaching", NameAr = "نمط الحياة والتدريب", Icon = "self_improvement" },

            // ========== 1. Graphics & Design Subcategories ==========
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000001"), ParentId = graphicsId, Name = "Logo Design",                NameAr = "تصميم الشعارات" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000002"), ParentId = graphicsId, Name = "Brand Identity",             NameAr = "هوية العلامة التجارية" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000003"), ParentId = graphicsId, Name = "Business Cards & Stationery", NameAr = "بطاقات العمل والقرطاسية" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000004"), ParentId = graphicsId, Name = "Social Media Design",        NameAr = "تصميم وسائل التواصل الاجتماعي" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000005"), ParentId = graphicsId, Name = "Packaging Design",           NameAr = "تصميم التغليف" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000006"), ParentId = graphicsId, Name = "Illustration",               NameAr = "الرسم التوضيحي" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000007"), ParentId = graphicsId, Name = "Book Cover Design",          NameAr = "تصميم أغلفة الكتب" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000008"), ParentId = graphicsId, Name = "UI/UX Design",               NameAr = "تصميم واجهة وتجربة المستخدم" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000009"), ParentId = graphicsId, Name = "3D Modeling",                NameAr = "النمذجة ثلاثية الأبعاد" },

            // ========== 2. Programming & Tech Subcategories ==========
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000010"), ParentId = programmingId, Name = "Web Development",           NameAr = "تطوير المواقع" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000011"), ParentId = programmingId, Name = "Mobile App Development",    NameAr = "تطوير تطبيقات الجوال" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000012"), ParentId = programmingId, Name = "E-commerce Development",    NameAr = "تطوير التجارة الإلكترونية" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000013"), ParentId = programmingId, Name = "API Development",           NameAr = "تطوير واجهات برمجة التطبيقات" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000014"), ParentId = programmingId, Name = "AI & Machine Learning",     NameAr = "الذكاء الاصطناعي والتعلم الآلي" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000015"), ParentId = programmingId, Name = "Automation & Bots",         NameAr = "الأتمتة والروبوتات" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000016"), ParentId = programmingId, Name = "DevOps & Cloud",             NameAr = "ديف أوبس والحوسبة السحابية" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000017"), ParentId = programmingId, Name = "Cybersecurity",             NameAr = "الأمن السيبراني" },

            // ========== 3. Digital Marketing Subcategories ==========
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000018"), ParentId = digitalMarketingId, Name = "Social Media Marketing",           NameAr = "التسويق عبر وسائل التواصل الاجتماعي" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000019"), ParentId = digitalMarketingId, Name = "SEO",                              NameAr = "تحسين محركات البحث" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000020"), ParentId = digitalMarketingId, Name = "Paid Ads (Google/Facebook/TikTok)", NameAr = "الإعلانات المدفوعة" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000021"), ParentId = digitalMarketingId, Name = "Email Marketing",                  NameAr = "التسويق عبر البريد الإلكتروني" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000022"), ParentId = digitalMarketingId, Name = "Content Marketing",                NameAr = "تسويق المحتوى" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000023"), ParentId = digitalMarketingId, Name = "Marketing Strategy",               NameAr = "استراتيجية التسويق" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000024"), ParentId = digitalMarketingId, Name = "Influencer Marketing",             NameAr = "التسويق عبر المؤثرين" },

            // ========== 4. Writing & Translation Subcategories ==========
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000025"), ParentId = writingId, Name = "Blog Writing",      NameAr = "كتابة المدونات" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000026"), ParentId = writingId, Name = "Copywriting",       NameAr = "كتابة المحتوى الإعلاني" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000027"), ParentId = writingId, Name = "Technical Writing", NameAr = "الكتابة التقنية" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000028"), ParentId = writingId, Name = "Resume Writing",    NameAr = "كتابة السيرة الذاتية" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000029"), ParentId = writingId, Name = "Translation",       NameAr = "الترجمة" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000030"), ParentId = writingId, Name = "Proofreading",      NameAr = "التدقيق اللغوي" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000031"), ParentId = writingId, Name = "Academic Writing",  NameAr = "الكتابة الأكاديمية" },

            // ========== 5. Video & Animation Subcategories ==========
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000032"), ParentId = videoId, Name = "Video Editing",    NameAr = "تحرير الفيديو" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000033"), ParentId = videoId, Name = "Motion Graphics",  NameAr = "الرسوم المتحركة" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000034"), ParentId = videoId, Name = "Explainer Videos", NameAr = "فيديوهات توضيحية" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000035"), ParentId = videoId, Name = "2D Animation",     NameAr = "الرسوم المتحركة ثنائية الأبعاد" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000036"), ParentId = videoId, Name = "3D Animation",     NameAr = "الرسوم المتحركة ثلاثية الأبعاد" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000037"), ParentId = videoId, Name = "YouTube Editing",  NameAr = "تحرير فيديوهات يوتيوب" },

            // ========== 6. Business Services Subcategories ==========
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000038"), ParentId = businessServicesId, Name = "Business Plans",        NameAr = "خطط الأعمال" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000039"), ParentId = businessServicesId, Name = "Market Research",       NameAr = "أبحاث السوق" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000040"), ParentId = businessServicesId, Name = "Virtual Assistant",     NameAr = "المساعد الافتراضي" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000041"), ParentId = businessServicesId, Name = "Data Entry",            NameAr = "إدخال البيانات" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000042"), ParentId = businessServicesId, Name = "Financial Consulting",  NameAr = "الاستشارات المالية" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000043"), ParentId = businessServicesId, Name = "Accounting",            NameAr = "المحاسبة" },

            // ========== 7. Music & Audio Subcategories ==========
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000044"), ParentId = musicAudioId, Name = "Voice Over",      NameAr = "التعليق الصوتي" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000045"), ParentId = musicAudioId, Name = "Podcast Editing", NameAr = "تحرير البودكاست" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000046"), ParentId = musicAudioId, Name = "Audio Mixing",    NameAr = "مزج الصوت" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000047"), ParentId = musicAudioId, Name = "Music Production", NameAr = "إنتاج الموسيقى" },

            // ========== 8. Lifestyle & Coaching Subcategories ==========
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000048"), ParentId = lifestyleCoachingId, Name = "Fitness Coaching",  NameAr = "التدريب على اللياقة البدنية" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000049"), ParentId = lifestyleCoachingId, Name = "Life Coaching",     NameAr = "تدريب الحياة" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000050"), ParentId = lifestyleCoachingId, Name = "Career Coaching",   NameAr = "التدريب المهني" },
            new Category { Id = new Guid("a4000000-0000-0000-0000-000000000051"), ParentId = lifestyleCoachingId, Name = "Online Tutoring",   NameAr = "التدريس عبر الإنترنت" }
        );
    }
}