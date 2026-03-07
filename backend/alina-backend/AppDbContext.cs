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

        modelBuilder.Entity<Gig>()
            .Property(g => g.BasePrice)
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

        // Seed Currency Rates (Approximate GCC rates relative to 1 USD)
        modelBuilder.Entity<CurrencyRate>().HasData(
            new CurrencyRate { Code = "USD", Rate = 1.0000m },
            new CurrencyRate { Code = "SAR", Rate = 3.7500m },
            new CurrencyRate { Code = "AED", Rate = 3.6725m },
            new CurrencyRate { Code = "JOD", Rate = 0.7090m },
            new CurrencyRate { Code = "KWD", Rate = 0.3070m },
            new CurrencyRate { Code = "BHD", Rate = 0.3760m },
            new CurrencyRate { Code = "OMR", Rate = 0.3845m }
        );

        // Seed common languages
        modelBuilder.Entity<Language>().HasData(
            new Language { Id = Guid.NewGuid(), Name = "English", Code = "en" },
            new Language { Id = Guid.NewGuid(), Name = "Arabic", Code = "ar" },
            new Language { Id = Guid.NewGuid(), Name = "Spanish", Code = "es" },
            new Language { Id = Guid.NewGuid(), Name = "French", Code = "fr" },
            new Language { Id = Guid.NewGuid(), Name = "German", Code = "de" },
            new Language { Id = Guid.NewGuid(), Name = "Chinese", Code = "zh" },
            new Language { Id = Guid.NewGuid(), Name = "Japanese", Code = "ja" },
            new Language { Id = Guid.NewGuid(), Name = "Portuguese", Code = "pt" },
            new Language { Id = Guid.NewGuid(), Name = "Russian", Code = "ru" },
            new Language { Id = Guid.NewGuid(), Name = "Hindi", Code = "hi" }
        );

        // Seed common skills
        modelBuilder.Entity<Skill>().HasData(
            // Programming
            new Skill { Id = Guid.NewGuid(), Name = "React", CategoryName = "Programming" },
            new Skill { Id = Guid.NewGuid(), Name = "Node.js", CategoryName = "Programming" },
            new Skill { Id = Guid.NewGuid(), Name = "Python", CategoryName = "Programming" },
            new Skill { Id = Guid.NewGuid(), Name = "JavaScript", CategoryName = "Programming" },
            new Skill { Id = Guid.NewGuid(), Name = "TypeScript", CategoryName = "Programming" },
            new Skill { Id = Guid.NewGuid(), Name = "C#", CategoryName = "Programming" },
            new Skill { Id = Guid.NewGuid(), Name = "Java", CategoryName = "Programming" },
            new Skill { Id = Guid.NewGuid(), Name = "Flutter", CategoryName = "Programming" },
            new Skill { Id = Guid.NewGuid(), Name = "Swift", CategoryName = "Programming" },
            new Skill { Id = Guid.NewGuid(), Name = "Kotlin", CategoryName = "Programming" },
            
            // Design
            new Skill { Id = Guid.NewGuid(), Name = "UI/UX Design", CategoryName = "Design" },
            new Skill { Id = Guid.NewGuid(), Name = "Figma", CategoryName = "Design" },
            new Skill { Id = Guid.NewGuid(), Name = "Adobe Photoshop", CategoryName = "Design" },
            new Skill { Id = Guid.NewGuid(), Name = "Adobe Illustrator", CategoryName = "Design" },
            new Skill { Id = Guid.NewGuid(), Name = "Graphic Design", CategoryName = "Design" },
            new Skill { Id = Guid.NewGuid(), Name = "Logo Design", CategoryName = "Design" },
            new Skill { Id = Guid.NewGuid(), Name = "3D Modeling", CategoryName = "Design" },
            
            // Marketing
            new Skill { Id = Guid.NewGuid(), Name = "SEO", CategoryName = "Marketing" },
            new Skill { Id = Guid.NewGuid(), Name = "Social Media Marketing", CategoryName = "Marketing" },
            new Skill { Id = Guid.NewGuid(), Name = "Content Writing", CategoryName = "Marketing" },
            new Skill { Id = Guid.NewGuid(), Name = "Email Marketing", CategoryName = "Marketing" },
            new Skill { Id = Guid.NewGuid(), Name = "Digital Marketing", CategoryName = "Marketing" },
            
            // Video & Animation
            new Skill { Id = Guid.NewGuid(), Name = "Video Editing", CategoryName = "Video & Animation" },
            new Skill { Id = Guid.NewGuid(), Name = "After Effects", CategoryName = "Video & Animation" },
            new Skill { Id = Guid.NewGuid(), Name = "Animation", CategoryName = "Video & Animation" },
            
            // Writing
            new Skill { Id = Guid.NewGuid(), Name = "Copywriting", CategoryName = "Writing" },
            new Skill { Id = Guid.NewGuid(), Name = "Technical Writing", CategoryName = "Writing" },
            new Skill { Id = Guid.NewGuid(), Name = "Translation", CategoryName = "Writing" },
            
            // Business
            new Skill { Id = Guid.NewGuid(), Name = "Data Analysis", CategoryName = "Business" },
            new Skill { Id = Guid.NewGuid(), Name = "Business Consulting", CategoryName = "Business" }
        );

        // Seed Marketplace Categories
        var graphicsId = Guid.NewGuid();
        var programmingId = Guid.NewGuid();
        var writingId = Guid.NewGuid();
        var videoId = Guid.NewGuid();
        var digitalMarketingId = Guid.NewGuid();
        var businessServicesId = Guid.NewGuid();
        var musicAudioId = Guid.NewGuid();
        var lifestyleCoachingId = Guid.NewGuid();

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
            new Category { Id = Guid.NewGuid(), ParentId = graphicsId, Name = "Logo Design", NameAr = "تصميم الشعارات" },
            new Category { Id = Guid.NewGuid(), ParentId = graphicsId, Name = "Brand Identity", NameAr = "هوية العلامة التجارية" },
            new Category { Id = Guid.NewGuid(), ParentId = graphicsId, Name = "Business Cards & Stationery", NameAr = "بطاقات العمل والقرطاسية" },
            new Category { Id = Guid.NewGuid(), ParentId = graphicsId, Name = "Social Media Design", NameAr = "تصميم وسائل التواصل الاجتماعي" },
            new Category { Id = Guid.NewGuid(), ParentId = graphicsId, Name = "Packaging Design", NameAr = "تصميم التغليف" },
            new Category { Id = Guid.NewGuid(), ParentId = graphicsId, Name = "Illustration", NameAr = "الرسم التوضيحي" },
            new Category { Id = Guid.NewGuid(), ParentId = graphicsId, Name = "Book Cover Design", NameAr = "تصميم أغلفة الكتب" },
            new Category { Id = Guid.NewGuid(), ParentId = graphicsId, Name = "UI/UX Design", NameAr = "تصميم واجهة وتجربة المستخدم" },
            new Category { Id = Guid.NewGuid(), ParentId = graphicsId, Name = "3D Modeling", NameAr = "النمذجة ثلاثية الأبعاد" },

            // ========== 2. Programming & Tech Subcategories ==========
            new Category { Id = Guid.NewGuid(), ParentId = programmingId, Name = "Web Development", NameAr = "تطوير المواقع" },
            new Category { Id = Guid.NewGuid(), ParentId = programmingId, Name = "Mobile App Development", NameAr = "تطوير تطبيقات الجوال" },
            new Category { Id = Guid.NewGuid(), ParentId = programmingId, Name = "E-commerce Development", NameAr = "تطوير التجارة الإلكترونية" },
            new Category { Id = Guid.NewGuid(), ParentId = programmingId, Name = "API Development", NameAr = "تطوير واجهات برمجة التطبيقات" },
            new Category { Id = Guid.NewGuid(), ParentId = programmingId, Name = "AI & Machine Learning", NameAr = "الذكاء الاصطناعي والتعلم الآلي" },
            new Category { Id = Guid.NewGuid(), ParentId = programmingId, Name = "Automation & Bots", NameAr = "الأتمتة والروبوتات" },
            new Category { Id = Guid.NewGuid(), ParentId = programmingId, Name = "DevOps & Cloud", NameAr = "ديف أوبس والحوسبة السحابية" },
            new Category { Id = Guid.NewGuid(), ParentId = programmingId, Name = "Cybersecurity", NameAr = "الأمن السيبراني" },

            // ========== 3. Digital Marketing Subcategories ==========
            new Category { Id = Guid.NewGuid(), ParentId = digitalMarketingId, Name = "Social Media Marketing", NameAr = "التسويق عبر وسائل التواصل الاجتماعي" },
            new Category { Id = Guid.NewGuid(), ParentId = digitalMarketingId, Name = "SEO", NameAr = "تحسين محركات البحث" },
            new Category { Id = Guid.NewGuid(), ParentId = digitalMarketingId, Name = "Paid Ads (Google/Facebook/TikTok)", NameAr = "الإعلانات المدفوعة" },
            new Category { Id = Guid.NewGuid(), ParentId = digitalMarketingId, Name = "Email Marketing", NameAr = "التسويق عبر البريد الإلكتروني" },
            new Category { Id = Guid.NewGuid(), ParentId = digitalMarketingId, Name = "Content Marketing", NameAr = "تسويق المحتوى" },
            new Category { Id = Guid.NewGuid(), ParentId = digitalMarketingId, Name = "Marketing Strategy", NameAr = "استراتيجية التسويق" },
            new Category { Id = Guid.NewGuid(), ParentId = digitalMarketingId, Name = "Influencer Marketing", NameAr = "التسويق عبر المؤثرين" },

            // ========== 4. Writing & Translation Subcategories ==========
            new Category { Id = Guid.NewGuid(), ParentId = writingId, Name = "Blog Writing", NameAr = "كتابة المدونات" },
            new Category { Id = Guid.NewGuid(), ParentId = writingId, Name = "Copywriting", NameAr = "كتابة المحتوى الإعلاني" },
            new Category { Id = Guid.NewGuid(), ParentId = writingId, Name = "Technical Writing", NameAr = "الكتابة التقنية" },
            new Category { Id = Guid.NewGuid(), ParentId = writingId, Name = "Resume Writing", NameAr = "كتابة السيرة الذاتية" },
            new Category { Id = Guid.NewGuid(), ParentId = writingId, Name = "Translation", NameAr = "الترجمة" },
            new Category { Id = Guid.NewGuid(), ParentId = writingId, Name = "Proofreading", NameAr = "التدقيق اللغوي" },
            new Category { Id = Guid.NewGuid(), ParentId = writingId, Name = "Academic Writing", NameAr = "الكتابة الأكاديمية" },

            // ========== 5. Video & Animation Subcategories ==========
            new Category { Id = Guid.NewGuid(), ParentId = videoId, Name = "Video Editing", NameAr = "تحرير الفيديو" },
            new Category { Id = Guid.NewGuid(), ParentId = videoId, Name = "Motion Graphics", NameAr = "الرسوم المتحركة" },
            new Category { Id = Guid.NewGuid(), ParentId = videoId, Name = "Explainer Videos", NameAr = "فيديوهات توضيحية" },
            new Category { Id = Guid.NewGuid(), ParentId = videoId, Name = "2D Animation", NameAr = "الرسوم المتحركة ثنائية الأبعاد" },
            new Category { Id = Guid.NewGuid(), ParentId = videoId, Name = "3D Animation", NameAr = "الرسوم المتحركة ثلاثية الأبعاد" },
            new Category { Id = Guid.NewGuid(), ParentId = videoId, Name = "YouTube Editing", NameAr = "تحرير فيديوهات يوتيوب" },

            // ========== 6. Business Services Subcategories ==========
            new Category { Id = Guid.NewGuid(), ParentId = businessServicesId, Name = "Business Plans", NameAr = "خطط الأعمال" },
            new Category { Id = Guid.NewGuid(), ParentId = businessServicesId, Name = "Market Research", NameAr = "أبحاث السوق" },
            new Category { Id = Guid.NewGuid(), ParentId = businessServicesId, Name = "Virtual Assistant", NameAr = "المساعد الافتراضي" },
            new Category { Id = Guid.NewGuid(), ParentId = businessServicesId, Name = "Data Entry", NameAr = "إدخال البيانات" },
            new Category { Id = Guid.NewGuid(), ParentId = businessServicesId, Name = "Financial Consulting", NameAr = "الاستشارات المالية" },
            new Category { Id = Guid.NewGuid(), ParentId = businessServicesId, Name = "Accounting", NameAr = "المحاسبة" },

            // ========== 7. Music & Audio Subcategories ==========
            new Category { Id = Guid.NewGuid(), ParentId = musicAudioId, Name = "Voice Over", NameAr = "التعليق الصوتي" },
            new Category { Id = Guid.NewGuid(), ParentId = musicAudioId, Name = "Podcast Editing", NameAr = "تحرير البودكاست" },
            new Category { Id = Guid.NewGuid(), ParentId = musicAudioId, Name = "Audio Mixing", NameAr = "مزج الصوت" },
            new Category { Id = Guid.NewGuid(), ParentId = musicAudioId, Name = "Music Production", NameAr = "إنتاج الموسيقى" },

            // ========== 8. Lifestyle & Coaching Subcategories ==========
            new Category { Id = Guid.NewGuid(), ParentId = lifestyleCoachingId, Name = "Fitness Coaching", NameAr = "التدريب على اللياقة البدنية" },
            new Category { Id = Guid.NewGuid(), ParentId = lifestyleCoachingId, Name = "Life Coaching", NameAr = "تدريب الحياة" },
            new Category { Id = Guid.NewGuid(), ParentId = lifestyleCoachingId, Name = "Career Coaching", NameAr = "التدريب المهني" },
            new Category { Id = Guid.NewGuid(), ParentId = lifestyleCoachingId, Name = "Online Tutoring", NameAr = "التدريس عبر الإنترنت" }
        );
    }
}