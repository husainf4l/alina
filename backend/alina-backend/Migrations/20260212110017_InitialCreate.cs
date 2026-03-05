using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AchievementBadges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Icon = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Color = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    GoalType = table.Column<int>(type: "integer", nullable: false),
                    Level = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AchievementBadges", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    ParentId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Categories_Categories_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CurrencyRates",
                columns: table => new
                {
                    Code = table.Column<string>(type: "text", nullable: false),
                    Rate = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrencyRates", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "Languages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Code = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Languages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LegalDocuments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LegalDocuments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Skills",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CategoryName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    GoogleId = table.Column<string>(type: "text", nullable: true),
                    Provider = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomOffers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SenderId = table.Column<Guid>(type: "uuid", nullable: false),
                    RecipientId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    DeliveryTimeInDays = table.Column<int>(type: "integer", nullable: false),
                    Features = table.Column<string>(type: "text", nullable: true),
                    Attachments = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    ResponseMessage = table.Column<string>(type: "text", nullable: true),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RespondedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomOffers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomOffers_Users_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomOffers_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FraudFlags",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Reason = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IsResolved = table.Column<bool>(type: "boolean", nullable: false),
                    ResolvedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ResolutionNotes = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IpAddress = table.Column<string>(type: "text", nullable: true),
                    UserAgent = table.Column<string>(type: "text", nullable: true),
                    SeverityScore = table.Column<decimal>(type: "numeric", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FraudFlags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FraudFlags_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Message = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RelatedEntityId = table.Column<Guid>(type: "uuid", nullable: true),
                    RelatedEntityType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Profiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Tagline = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    Bio = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    AvatarUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    CoverImageUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    Location = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Country = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    TimeZone = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    UserRole = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    PreferredCurrency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    ResponseTimeHours = table.Column<int>(type: "integer", nullable: true),
                    LastDeliveryAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    WebsiteUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    TwitterUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    LinkedInUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    GithubUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    ProfileCompletionPercentage = table.Column<int>(type: "integer", nullable: false),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false),
                    IsPublic = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Profiles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Token = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RevokedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Revisions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    RequesterId = table.Column<int>(type: "integer", nullable: false),
                    RequesterId1 = table.Column<Guid>(type: "uuid", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Attachments = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    ResolutionMessage = table.Column<string>(type: "text", nullable: true),
                    ResolutionAttachments = table.Column<string>(type: "text", nullable: true),
                    RequestedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RespondedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Revisions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Revisions_Users_RequesterId1",
                        column: x => x.RequesterId1,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SupportTickets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Subject = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Message = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    Status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupportTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportTickets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserNotificationSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    OrderUpdates = table.Column<bool>(type: "boolean", nullable: false),
                    MessageNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    OfferNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    MarketingEmails = table.Column<bool>(type: "boolean", nullable: false),
                    PushEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNotificationSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserNotificationSettings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Gigs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    MainImage = table.Column<string>(type: "text", nullable: true),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: false),
                    SellerId = table.Column<Guid>(type: "uuid", nullable: false),
                    StartingPrice = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false),
                    DeliveryTimeInDays = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    AverageRating = table.Column<double>(type: "double precision", nullable: false),
                    ReviewCount = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gigs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Gigs_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Gigs_Profiles_SellerId",
                        column: x => x.SellerId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Goals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProfileId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Period = table.Column<int>(type: "integer", nullable: false),
                    TargetValue = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    CurrentValue = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    ProgressPercentage = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsAchieved = table.Column<bool>(type: "boolean", nullable: false),
                    AchievedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AchievementBadge = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Goals_Profiles_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SenderId = table.Column<Guid>(type: "uuid", nullable: false),
                    ReceiverId = table.Column<Guid>(type: "uuid", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    AttachmentUrl = table.Column<string>(type: "text", nullable: true),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    ReadAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_Profiles_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Messages_Profiles_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProfileLanguages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProfileId = table.Column<Guid>(type: "uuid", nullable: false),
                    LanguageId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProficiencyLevel = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileLanguages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProfileLanguages_Languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "Languages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProfileLanguages_Profiles_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProfileSkills",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProfileId = table.Column<Guid>(type: "uuid", nullable: false),
                    SkillId = table.Column<Guid>(type: "uuid", nullable: false),
                    Level = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProfileSkills_Profiles_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProfileSkills_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: true),
                    Budget = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false),
                    Deadline = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    PosterId = table.Column<Guid>(type: "uuid", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: false),
                    AssignedTaskerId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTasks_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTasks_Profiles_AssignedTaskerId",
                        column: x => x.AssignedTaskerId,
                        principalTable: "Profiles",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserTasks_Profiles_PosterId",
                        column: x => x.PosterId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Wallets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProfileId = table.Column<Guid>(type: "uuid", nullable: false),
                    AvailableBalance = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    EscrowBalance = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wallets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Wallets_Profiles_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WithdrawalRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    BankDetails = table.Column<string>(type: "text", nullable: true),
                    AdminNotes = table.Column<string>(type: "text", nullable: true),
                    RequestedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProcessedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WithdrawalRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WithdrawalRequests_Profiles_UserId",
                        column: x => x.UserId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Favorites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    GigId = table.Column<int>(type: "integer", nullable: false),
                    GigId1 = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Favorites_Gigs_GigId1",
                        column: x => x.GigId1,
                        principalTable: "Gigs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Favorites_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GoalProgress",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GoalId = table.Column<Guid>(type: "uuid", nullable: false),
                    Value = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    RecordedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoalProgress", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoalProgress_Goals_GoalId",
                        column: x => x.GoalId,
                        principalTable: "Goals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Media",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    FileName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    FileType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    OwnerId = table.Column<Guid>(type: "uuid", nullable: true),
                    GigId = table.Column<Guid>(type: "uuid", nullable: true),
                    UserTaskId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GigId1 = table.Column<Guid>(type: "uuid", nullable: true),
                    UserTaskId1 = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Media", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Media_Gigs_GigId",
                        column: x => x.GigId,
                        principalTable: "Gigs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Media_Gigs_GigId1",
                        column: x => x.GigId1,
                        principalTable: "Gigs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Media_Profiles_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Profiles",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Media_UserTasks_UserTaskId",
                        column: x => x.UserTaskId,
                        principalTable: "UserTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Media_UserTasks_UserTaskId1",
                        column: x => x.UserTaskId1,
                        principalTable: "UserTasks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Offers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TaskId = table.Column<Guid>(type: "uuid", nullable: false),
                    TaskerId = table.Column<Guid>(type: "uuid", nullable: false),
                    Price = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Offers_Profiles_TaskerId",
                        column: x => x.TaskerId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Offers_UserTasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "UserTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    WalletId = table.Column<Guid>(type: "uuid", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Reference = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProcessedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transactions_Wallets_WalletId",
                        column: x => x.WalletId,
                        principalTable: "Wallets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GigId = table.Column<Guid>(type: "uuid", nullable: true),
                    OfferId = table.Column<Guid>(type: "uuid", nullable: true),
                    BuyerId = table.Column<Guid>(type: "uuid", nullable: false),
                    SellerId = table.Column<Guid>(type: "uuid", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    PaymentStatus = table.Column<int>(type: "integer", nullable: false),
                    PaymentMethod = table.Column<string>(type: "text", nullable: false),
                    CommissionAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    PlatformFeePercentage = table.Column<decimal>(type: "numeric(5,2)", nullable: true),
                    Deadline = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeliveredAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Requirements = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Gigs_GigId",
                        column: x => x.GigId,
                        principalTable: "Gigs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_Offers_OfferId",
                        column: x => x.OfferId,
                        principalTable: "Offers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_Profiles_BuyerId",
                        column: x => x.BuyerId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Profiles_SellerId",
                        column: x => x.SellerId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Disputes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: false),
                    OpenedByUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Resolution = table.Column<int>(type: "integer", nullable: true),
                    ResolutionAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ResolvedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AdminNotes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Disputes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Disputes_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GigId = table.Column<Guid>(type: "uuid", nullable: true),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: false),
                    ReviewerId = table.Column<Guid>(type: "uuid", nullable: false),
                    RevieweeId = table.Column<Guid>(type: "uuid", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    Comment = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_Gigs_GigId",
                        column: x => x.GigId,
                        principalTable: "Gigs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Reviews_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Profiles_RevieweeId",
                        column: x => x.RevieweeId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Profiles_ReviewerId",
                        column: x => x.ReviewerId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("006f05c8-bc88-4671-8155-8516731dc3f7"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(630), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("2ad95b39-8e95-44fd-9a82-2408d5f5a1e1"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(630), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("3a925873-15cc-474f-b863-cce75158476e"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(620), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("632fcb86-d3bd-4628-a7b1-7dd50fefd2a2"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(640), null, null, "home", "Home Services", "خدمات المنزل", null },
                    { new Guid("866e6af0-7dbd-46f7-ab0f-63007bcd1a55"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(630), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null }
                });

            migrationBuilder.InsertData(
                table: "CurrencyRates",
                columns: new[] { "Code", "LastUpdated", "Rate" },
                values: new object[,]
                {
                    { "AED", new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110), 3.6725m },
                    { "BHD", new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110), 0.3760m },
                    { "JOD", new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110), 0.7090m },
                    { "KWD", new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110), 0.3070m },
                    { "OMR", new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110), 0.3845m },
                    { "SAR", new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110), 3.7500m },
                    { "USD", new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110), 1.0000m }
                });

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("011996e7-90c4-4aa9-a94e-6b297242f999"), "de", "German" },
                    { new Guid("10728772-d3e8-421b-967a-10f7c88643ee"), "hi", "Hindi" },
                    { new Guid("3a0bb667-de35-4afe-98cf-d5e2e4d87811"), "ru", "Russian" },
                    { new Guid("5b4cb07c-4374-4aa0-8408-a194676737bc"), "en", "English" },
                    { new Guid("9393ab27-4ea5-4427-9853-1a09f1ccc8f9"), "pt", "Portuguese" },
                    { new Guid("ace508d0-9a2f-4212-914c-28ab84922f82"), "fr", "French" },
                    { new Guid("ade7c93f-d01e-45db-b996-6820b1c682cd"), "zh", "Chinese" },
                    { new Guid("b72d70c4-58ac-4d83-baa8-56b629f48ace"), "es", "Spanish" },
                    { new Guid("d70ba290-ee0f-4e91-bb7d-6db32422f090"), "ar", "Arabic" },
                    { new Guid("db7ef77c-09c9-4584-9ca4-1353b4bf3319"), "ja", "Japanese" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("023ddb2d-c290-4874-bdeb-844afdb03401"), "Marketing", "SEO" },
                    { new Guid("0c961ed0-8785-47ff-9584-036f7ac8b625"), "Design", "Figma" },
                    { new Guid("15d3a3e7-25fd-4ce5-995c-438d500ed727"), "Programming", "Kotlin" },
                    { new Guid("1b350724-360f-49d2-aaa6-64f6c20f36ca"), "Programming", "Swift" },
                    { new Guid("21fc4e95-0170-40d9-ab55-5cecbc3c0c1b"), "Writing", "Translation" },
                    { new Guid("220fd228-2292-4da2-997b-22f749b61d8a"), "Marketing", "Content Writing" },
                    { new Guid("286f6d30-9f00-4b89-954a-7f87364496c1"), "Design", "UI/UX Design" },
                    { new Guid("2a7fd381-ba7c-4470-b32c-31dbdfb6976e"), "Video & Animation", "Animation" },
                    { new Guid("2b4c24d4-bd60-4519-b4ac-4828e340e56f"), "Business", "Business Consulting" },
                    { new Guid("3034f94a-40a0-493e-ad38-6d59fbe64e34"), "Programming", "TypeScript" },
                    { new Guid("3ad40b8f-c00b-41de-9ef2-baca3150d015"), "Design", "Adobe Illustrator" },
                    { new Guid("49c94ab9-2454-49ae-b5cd-f9362198556a"), "Marketing", "Digital Marketing" },
                    { new Guid("5b3e5e62-b689-48f9-9caf-9ec2615d19df"), "Programming", "React" },
                    { new Guid("6981c920-5479-40c2-8ef4-320ce5a5d002"), "Design", "3D Modeling" },
                    { new Guid("6f60eebb-9616-492e-b779-03d7e207e1b2"), "Programming", "C#" },
                    { new Guid("734cfc68-69b4-4dc0-b77e-142b29d4ca88"), "Programming", "JavaScript" },
                    { new Guid("793f2fd1-e8a0-42c0-a21a-028ce6069608"), "Writing", "Copywriting" },
                    { new Guid("7be2d4c5-7a8e-486d-b2f3-2ddc00f2d1b7"), "Programming", "Flutter" },
                    { new Guid("8488094c-0478-4fd5-95a1-e2dbbf872c7c"), "Marketing", "Email Marketing" },
                    { new Guid("84e4aae9-5d35-4dd9-b43c-7524e091860c"), "Design", "Adobe Photoshop" },
                    { new Guid("88e085f9-7bf0-4c45-ba10-2b7b0d935a90"), "Video & Animation", "After Effects" },
                    { new Guid("94a42966-8e80-42f4-bb98-749deed2e4ad"), "Marketing", "Social Media Marketing" },
                    { new Guid("96fe0808-a025-4750-9bc1-9323925ec724"), "Video & Animation", "Video Editing" },
                    { new Guid("9e6bee49-2bf5-4845-9d2f-e06bbaeaaba0"), "Design", "Logo Design" },
                    { new Guid("a27a75c8-2b92-498d-bf65-5aebc4693833"), "Programming", "Java" },
                    { new Guid("b1b45d6e-680b-41de-98f6-f31982e89aee"), "Business", "Data Analysis" },
                    { new Guid("c353b99a-0966-492e-9d07-4de4f63d676e"), "Design", "Graphic Design" },
                    { new Guid("e1dd1e01-9da7-4c77-9de5-1d154bab0d7f"), "Programming", "Python" },
                    { new Guid("e67f1577-d062-4e4f-89b0-3a2b8778e14a"), "Writing", "Technical Writing" },
                    { new Guid("e8612c80-d560-4553-9d97-b29c894aa3dc"), "Programming", "Node.js" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("1298439a-ab00-4ede-8a58-1be9d632c84e"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(690), null, null, null, "Handyman", "أعمال الصيانة", new Guid("632fcb86-d3bd-4628-a7b1-7dd50fefd2a2") },
                    { new Guid("19319a93-527e-478f-bef3-0b058281b4f6"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(640), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("3a925873-15cc-474f-b863-cce75158476e") },
                    { new Guid("22d1a707-8cc3-4a18-9855-085ff2d91ec8"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(690), null, null, null, "Moving", "نقل الأثاث", new Guid("632fcb86-d3bd-4628-a7b1-7dd50fefd2a2") },
                    { new Guid("78ba3877-92bb-4e9c-a82b-64d5030472f0"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(670), null, null, null, "Mobile Apps", "تطبيقات الجوال", new Guid("006f05c8-bc88-4671-8155-8516731dc3f7") },
                    { new Guid("a6bb5281-145f-4b97-89bd-cf5cf3944801"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(700), null, null, null, "Gardening", "تنسيق الحدائق", new Guid("632fcb86-d3bd-4628-a7b1-7dd50fefd2a2") },
                    { new Guid("a6ff6ef6-1186-4e0e-9b1f-0be66a0faeea"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(660), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("3a925873-15cc-474f-b863-cce75158476e") },
                    { new Guid("b462e06a-de40-47e5-9c87-f07a30238b17"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(680), null, null, null, "AI Services", "خدمات الذكاء الاصطناعي", new Guid("006f05c8-bc88-4671-8155-8516731dc3f7") },
                    { new Guid("ce3420f4-7ee3-4a7f-9e90-d57f3966ffd6"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(660), null, null, null, "Web Development", "تطوير المواقع", new Guid("006f05c8-bc88-4671-8155-8516731dc3f7") },
                    { new Guid("d00ffba4-10a9-4ec7-a20f-9292bdbe0cc4"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(650), null, null, null, "Web Design", "تصميم المواقع", new Guid("3a925873-15cc-474f-b863-cce75158476e") },
                    { new Guid("d6a6ccbc-ed83-4e10-902c-efee64270728"), new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(680), null, null, null, "Cleaning", "التنظيف", new Guid("632fcb86-d3bd-4628-a7b1-7dd50fefd2a2") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentId",
                table: "Categories",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomOffers_RecipientId",
                table: "CustomOffers",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomOffers_SenderId",
                table: "CustomOffers",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Disputes_OrderId",
                table: "Disputes",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_GigId1",
                table: "Favorites",
                column: "GigId1");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_UserId",
                table: "Favorites",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FraudFlags_UserId",
                table: "FraudFlags",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Gigs_CategoryId",
                table: "Gigs",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Gigs_SellerId",
                table: "Gigs",
                column: "SellerId");

            migrationBuilder.CreateIndex(
                name: "IX_GoalProgress_GoalId",
                table: "GoalProgress",
                column: "GoalId");

            migrationBuilder.CreateIndex(
                name: "IX_Goals_ProfileId",
                table: "Goals",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_GigId",
                table: "Media",
                column: "GigId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_GigId1",
                table: "Media",
                column: "GigId1");

            migrationBuilder.CreateIndex(
                name: "IX_Media_OwnerId",
                table: "Media",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_UserTaskId",
                table: "Media",
                column: "UserTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_UserTaskId1",
                table: "Media",
                column: "UserTaskId1");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReceiverId",
                table: "Messages",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Offers_TaskerId",
                table: "Offers",
                column: "TaskerId");

            migrationBuilder.CreateIndex(
                name: "IX_Offers_TaskId",
                table: "Offers",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_BuyerId",
                table: "Orders",
                column: "BuyerId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_GigId",
                table: "Orders",
                column: "GigId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OfferId",
                table: "Orders",
                column: "OfferId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_SellerId",
                table: "Orders",
                column: "SellerId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfileLanguages_LanguageId",
                table: "ProfileLanguages",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfileLanguages_ProfileId",
                table: "ProfileLanguages",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Profiles_UserId",
                table: "Profiles",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProfileSkills_ProfileId",
                table: "ProfileSkills",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfileSkills_SkillId",
                table: "ProfileSkills",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_GigId",
                table: "Reviews",
                column: "GigId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_OrderId",
                table: "Reviews",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_RevieweeId",
                table: "Reviews",
                column: "RevieweeId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ReviewerId",
                table: "Reviews",
                column: "ReviewerId");

            migrationBuilder.CreateIndex(
                name: "IX_Revisions_RequesterId1",
                table: "Revisions",
                column: "RequesterId1");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTickets_UserId",
                table: "SupportTickets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_WalletId",
                table: "Transactions",
                column: "WalletId");

            migrationBuilder.CreateIndex(
                name: "IX_UserNotificationSettings_UserId",
                table: "UserNotificationSettings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTasks_AssignedTaskerId",
                table: "UserTasks",
                column: "AssignedTaskerId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTasks_CategoryId",
                table: "UserTasks",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTasks_PosterId",
                table: "UserTasks",
                column: "PosterId");

            migrationBuilder.CreateIndex(
                name: "IX_Wallets_ProfileId",
                table: "Wallets",
                column: "ProfileId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WithdrawalRequests_UserId",
                table: "WithdrawalRequests",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AchievementBadges");

            migrationBuilder.DropTable(
                name: "CurrencyRates");

            migrationBuilder.DropTable(
                name: "CustomOffers");

            migrationBuilder.DropTable(
                name: "Disputes");

            migrationBuilder.DropTable(
                name: "Favorites");

            migrationBuilder.DropTable(
                name: "FraudFlags");

            migrationBuilder.DropTable(
                name: "GoalProgress");

            migrationBuilder.DropTable(
                name: "LegalDocuments");

            migrationBuilder.DropTable(
                name: "Media");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "ProfileLanguages");

            migrationBuilder.DropTable(
                name: "ProfileSkills");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Revisions");

            migrationBuilder.DropTable(
                name: "SupportTickets");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "UserNotificationSettings");

            migrationBuilder.DropTable(
                name: "WithdrawalRequests");

            migrationBuilder.DropTable(
                name: "Goals");

            migrationBuilder.DropTable(
                name: "Languages");

            migrationBuilder.DropTable(
                name: "Skills");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Wallets");

            migrationBuilder.DropTable(
                name: "Gigs");

            migrationBuilder.DropTable(
                name: "Offers");

            migrationBuilder.DropTable(
                name: "UserTasks");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Profiles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
