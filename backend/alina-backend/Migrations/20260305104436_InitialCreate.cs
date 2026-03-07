using System;
using System.Collections.Generic;
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
                name: "TwoFactorVerifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Method = table.Column<string>(type: "text", nullable: false),
                    Purpose = table.Column<string>(type: "text", nullable: true),
                    ExpiresAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsUsed = table.Column<bool>(type: "boolean", nullable: false),
                    UsedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TwoFactorVerifications", x => x.Id);
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
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserTotpSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    SecretKey = table.Column<string>(type: "text", nullable: false),
                    IsEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EnabledAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTotpSettings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AdCampaigns",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SellerId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Platform = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Budget = table.Column<decimal>(type: "numeric", nullable: false),
                    Spent = table.Column<decimal>(type: "numeric", nullable: false),
                    DailyBudget = table.Column<decimal>(type: "numeric", nullable: false),
                    TargetKeywords = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    TargetLocations = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    TargetDemographics = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Impressions = table.Column<int>(type: "integer", nullable: false),
                    Clicks = table.Column<int>(type: "integer", nullable: false),
                    Conversions = table.Column<int>(type: "integer", nullable: false),
                    CostPerClick = table.Column<decimal>(type: "numeric", nullable: false),
                    ConversionRate = table.Column<decimal>(type: "numeric", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    VideoUrl = table.Column<string>(type: "text", nullable: true),
                    CallToAction = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdCampaigns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdCampaigns_Users_SellerId",
                        column: x => x.SellerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AvailabilitySettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SellerId = table.Column<Guid>(type: "uuid", nullable: false),
                    WorkingDays = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    WorkingHoursStart = table.Column<TimeSpan>(type: "interval", nullable: false),
                    WorkingHoursEnd = table.Column<TimeSpan>(type: "interval", nullable: false),
                    Timezone = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    BufferTimeMinutes = table.Column<int>(type: "integer", nullable: false),
                    MaxAdvanceBookingDays = table.Column<int>(type: "integer", nullable: false),
                    MinimumNoticeHours = table.Column<int>(type: "integer", nullable: false),
                    AutoAcceptBookings = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvailabilitySettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AvailabilitySettings_Users_SellerId",
                        column: x => x.SellerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BusinessToolSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SellerId = table.Column<Guid>(type: "uuid", nullable: false),
                    ToolType = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    IsEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    UsageCount = table.Column<int>(type: "integer", nullable: false),
                    Settings = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessToolSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusinessToolSettings_Users_SellerId",
                        column: x => x.SellerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Conversations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    User1Id = table.Column<Guid>(type: "uuid", nullable: false),
                    User2Id = table.Column<Guid>(type: "uuid", nullable: false),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: true),
                    GigId = table.Column<Guid>(type: "uuid", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    LastMessageText = table.Column<string>(type: "text", nullable: true),
                    LastMessageAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastMessageSenderId = table.Column<Guid>(type: "uuid", nullable: true),
                    UnreadCountUser1 = table.Column<int>(type: "integer", nullable: false),
                    UnreadCountUser2 = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Conversations_Users_User1Id",
                        column: x => x.User1Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Conversations_Users_User2Id",
                        column: x => x.User2Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    SellerLevel = table.Column<int>(type: "integer", nullable: false),
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
                name: "Promotions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SellerId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    DiscountPercentage = table.Column<decimal>(type: "numeric", nullable: true),
                    DiscountAmount = table.Column<decimal>(type: "numeric", nullable: true),
                    MinimumOrderValue = table.Column<decimal>(type: "numeric", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Budget = table.Column<decimal>(type: "numeric", nullable: false),
                    Spent = table.Column<decimal>(type: "numeric", nullable: false),
                    MaxRedemptions = table.Column<int>(type: "integer", nullable: false),
                    TimesRedeemed = table.Column<int>(type: "integer", nullable: false),
                    Impressions = table.Column<int>(type: "integer", nullable: false),
                    Clicks = table.Column<int>(type: "integer", nullable: false),
                    Conversions = table.Column<int>(type: "integer", nullable: false),
                    TargetGigIds = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Promotions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Promotions_Users_SellerId",
                        column: x => x.SellerId,
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
                    RequesterId = table.Column<Guid>(type: "uuid", nullable: false),
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
                        name: "FK_Revisions_Users_RequesterId",
                        column: x => x.RequesterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "UserNotificationPreferences",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    EmailNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    PushNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    SmsNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    InAppNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    NewOrderAlerts = table.Column<bool>(type: "boolean", nullable: false),
                    OrderStatusUpdates = table.Column<bool>(type: "boolean", nullable: false),
                    MessageAlerts = table.Column<bool>(type: "boolean", nullable: false),
                    ReviewAlerts = table.Column<bool>(type: "boolean", nullable: false),
                    PaymentAlerts = table.Column<bool>(type: "boolean", nullable: false),
                    WithdrawalAlerts = table.Column<bool>(type: "boolean", nullable: false),
                    PromotionAlerts = table.Column<bool>(type: "boolean", nullable: false),
                    MarketingEmails = table.Column<bool>(type: "boolean", nullable: false),
                    NewsletterSubscription = table.Column<bool>(type: "boolean", nullable: false),
                    SystemUpdates = table.Column<bool>(type: "boolean", nullable: false),
                    GigPerformanceReports = table.Column<bool>(type: "boolean", nullable: false),
                    DailyEarningsReport = table.Column<bool>(type: "boolean", nullable: false),
                    WeeklyEarningsReport = table.Column<bool>(type: "boolean", nullable: false),
                    MonthlyEarningsReport = table.Column<bool>(type: "boolean", nullable: false),
                    OrderReminders = table.Column<bool>(type: "boolean", nullable: false),
                    DeliveryNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    RevisionNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    EnableQuietHours = table.Column<bool>(type: "boolean", nullable: false),
                    QuietHoursStart = table.Column<TimeSpan>(type: "interval", nullable: true),
                    QuietHoursEnd = table.Column<TimeSpan>(type: "interval", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNotificationPreferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserNotificationPreferences_Users_UserId",
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
                name: "UserSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ThemeMode = table.Column<string>(type: "text", nullable: false),
                    PrimaryColor = table.Column<string>(type: "text", nullable: false),
                    Language = table.Column<string>(type: "text", nullable: false),
                    Timezone = table.Column<string>(type: "text", nullable: false),
                    DateFormat = table.Column<string>(type: "text", nullable: false),
                    TimeFormat = table.Column<string>(type: "text", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false),
                    ProfileVisibility = table.Column<string>(type: "text", nullable: false),
                    ShowEmail = table.Column<bool>(type: "boolean", nullable: false),
                    ShowPhone = table.Column<bool>(type: "boolean", nullable: false),
                    ShowLocation = table.Column<bool>(type: "boolean", nullable: false),
                    ActivityStatus = table.Column<bool>(type: "boolean", nullable: false),
                    ShowLastSeen = table.Column<bool>(type: "boolean", nullable: false),
                    DefaultView = table.Column<string>(type: "text", nullable: false),
                    ShowCompletedOrders = table.Column<bool>(type: "boolean", nullable: false),
                    DashboardItemsPerPage = table.Column<int>(type: "integer", nullable: false),
                    AutoRefreshDashboard = table.Column<bool>(type: "boolean", nullable: false),
                    AutoRefreshInterval = table.Column<int>(type: "integer", nullable: false),
                    SaveSearchHistory = table.Column<bool>(type: "boolean", nullable: false),
                    DefaultSortBy = table.Column<string>(type: "text", nullable: false),
                    DefaultItemsPerPage = table.Column<int>(type: "integer", nullable: false),
                    ReducedMotion = table.Column<bool>(type: "boolean", nullable: false),
                    HighContrast = table.Column<bool>(type: "boolean", nullable: false),
                    FontSize = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSettings_Users_UserId",
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
                    ConversationId = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    DeliveredAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AttachmentType = table.Column<string>(type: "text", nullable: true),
                    AttachmentSize = table.Column<long>(type: "bigint", nullable: true),
                    ReplyToMessageId = table.Column<Guid>(type: "uuid", nullable: true),
                    Reactions = table.Column<string>(type: "text", nullable: true),
                    IsEdited = table.Column<bool>(type: "boolean", nullable: false),
                    EditedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
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
                        name: "FK_Messages_Conversations_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "Conversations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_Messages_ReplyToMessageId",
                        column: x => x.ReplyToMessageId,
                        principalTable: "Messages",
                        principalColumn: "Id");
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
                name: "SearchAnalytics",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SearchTerm = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    SearchCount = table.Column<int>(type: "integer", nullable: false),
                    FirstSearchedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastSearchedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SearchAnalytics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SearchAnalytics_Profiles_UserId",
                        column: x => x.UserId,
                        principalTable: "Profiles",
                        principalColumn: "Id");
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
                    ProfileId = table.Column<Guid>(type: "uuid", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true),
                    AvailableBalance = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    EscrowBalance = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    PendingWithdrawal = table.Column<decimal>(type: "numeric", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
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
                    RejectionReason = table.Column<string>(type: "text", nullable: true),
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
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    GigId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Favorites_Gigs_GigId",
                        column: x => x.GigId,
                        principalTable: "Gigs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Favorites_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Packages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false),
                    DeliveryTimeInDays = table.Column<int>(type: "integer", nullable: false),
                    GigId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Packages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Packages_Gigs_GigId",
                        column: x => x.GigId,
                        principalTable: "Gigs",
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
                    CustomOfferId = table.Column<int>(type: "integer", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GigId1 = table.Column<Guid>(type: "uuid", nullable: true),
                    UserTaskId1 = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Media", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Media_CustomOffers_CustomOfferId",
                        column: x => x.CustomOfferId,
                        principalTable: "CustomOffers",
                        principalColumn: "Id");
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
                    UserId = table.Column<Guid>(type: "uuid", nullable: true),
                    RecipientId = table.Column<Guid>(type: "uuid", nullable: true),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Reference = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: true),
                    Metadata = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProcessedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
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
                    PlatformFee = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    SellerAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    Deadline = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeliveredAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ReleasedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CancelledAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CancellationReason = table.Column<string>(type: "text", nullable: true),
                    Requirements = table.Column<string>(type: "text", nullable: true),
                    DeliveryMessage = table.Column<string>(type: "text", nullable: true),
                    AttachmentUrls = table.Column<List<string>>(type: "text[]", nullable: true),
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

            migrationBuilder.CreateTable(
                name: "ScheduleSlots",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SellerId = table.Column<Guid>(type: "uuid", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "interval", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "interval", nullable: false),
                    DurationMinutes = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    BuyerId = table.Column<Guid>(type: "uuid", nullable: true),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: true),
                    Notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CancellationReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleSlots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScheduleSlots_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ScheduleSlots_Users_BuyerId",
                        column: x => x.BuyerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ScheduleSlots_Users_SellerId",
                        column: x => x.SellerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1600), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("01a3e221-575b-41c1-bef6-ea51510675d8"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1640), null, null, "music_note", "Music & Audio", "الموسيقى والصوتيات", null },
                    { new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1640), null, null, "business", "Business Services", "الخدمات التجارية", null },
                    { new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1600), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("768acba4-7483-415f-9396-f4a4003b01c9"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1620), null, null, "trending_up", "Digital Marketing", "التسويق الرقمي", null },
                    { new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1630), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1620), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("f3ccf4c9-a49a-467a-91c3-8faebbaa9d3e"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1650), null, null, "self_improvement", "Lifestyle & Coaching", "نمط الحياة والتدريب", null }
                });

            migrationBuilder.InsertData(
                table: "CurrencyRates",
                columns: new[] { "Code", "LastUpdated", "Rate" },
                values: new object[,]
                {
                    { "AED", new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070), 3.6725m },
                    { "BHD", new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070), 0.3760m },
                    { "JOD", new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070), 0.7090m },
                    { "KWD", new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070), 0.3070m },
                    { "OMR", new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1080), 0.3845m },
                    { "SAR", new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070), 3.7500m },
                    { "USD", new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070), 1.0000m }
                });

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("2d7ff158-99a7-448e-946d-a92c4e6f6c34"), "fr", "French" },
                    { new Guid("30769768-6849-4b51-b90a-5eeb7e1a8473"), "pt", "Portuguese" },
                    { new Guid("32e64943-64d4-4e3e-9ed3-a3bc744d5dfe"), "hi", "Hindi" },
                    { new Guid("34d12973-e2fc-41f7-b905-4c9099699508"), "ru", "Russian" },
                    { new Guid("64b18ef6-8f21-40f4-b48d-d77e7d420107"), "en", "English" },
                    { new Guid("712da8ad-a323-411d-b247-1d7a40457d86"), "ja", "Japanese" },
                    { new Guid("73d7e9dd-d17d-40e0-8ac2-2d2826a2a3b1"), "ar", "Arabic" },
                    { new Guid("7d2a960e-105c-4955-a265-80bd56f79925"), "zh", "Chinese" },
                    { new Guid("8c8c18bb-9a8e-4ed5-8532-0a9b7a0e5fb0"), "es", "Spanish" },
                    { new Guid("d9983742-d037-4c61-acf8-af5b447e26bd"), "de", "German" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("17517908-434b-4a00-b462-9ca23ed7873b"), "Video & Animation", "Video Editing" },
                    { new Guid("211d7131-f450-4b07-aedb-9474a7715cba"), "Marketing", "SEO" },
                    { new Guid("386925e3-5a37-43b3-82cc-e8e577cf5964"), "Writing", "Translation" },
                    { new Guid("3e101772-71e3-4ec4-bbaf-fdf5ecdbf27b"), "Programming", "React" },
                    { new Guid("5273aa01-a444-4541-b6d3-b8224084ffb5"), "Design", "Adobe Illustrator" },
                    { new Guid("5547ee3a-7388-419d-9fd5-74aca2674409"), "Marketing", "Digital Marketing" },
                    { new Guid("595a83b9-2fc6-4e44-a438-6b0a1339f3e4"), "Video & Animation", "Animation" },
                    { new Guid("5a7d9c78-7d00-44ed-8542-1609ccd15582"), "Programming", "C#" },
                    { new Guid("6d18143d-07de-4868-94f6-eac5da714d24"), "Marketing", "Email Marketing" },
                    { new Guid("7b3e7a0a-6f7c-4d46-be12-06e0f277c40b"), "Programming", "TypeScript" },
                    { new Guid("7c148b09-baea-4f2e-9fe4-99c7ddfaa6d9"), "Programming", "Flutter" },
                    { new Guid("8038a4b3-8e7a-4e51-b6e0-ff6770e554ec"), "Programming", "JavaScript" },
                    { new Guid("a0122dee-5a4a-4fdd-b444-c4023a52f6b7"), "Design", "Figma" },
                    { new Guid("a2825b0b-ecf2-49f2-82c3-c3aec7393ed6"), "Programming", "Python" },
                    { new Guid("a45816b5-de0f-4096-abc0-dafd80778da6"), "Design", "Adobe Photoshop" },
                    { new Guid("a538d5e6-43e1-4410-a9a2-b37763094646"), "Writing", "Copywriting" },
                    { new Guid("a7171cca-2452-4ccf-a870-75b0cb2350aa"), "Marketing", "Content Writing" },
                    { new Guid("b56ae3b2-e008-478f-b4af-4e33246be8b7"), "Design", "UI/UX Design" },
                    { new Guid("c28573da-f1c0-498a-af84-cad1e24c1fcf"), "Writing", "Technical Writing" },
                    { new Guid("c434e0b6-ae0e-40df-8d22-916e9a5d70cb"), "Programming", "Swift" },
                    { new Guid("c4b35056-0be4-4170-8b9b-ec934c3672da"), "Design", "Logo Design" },
                    { new Guid("ce105a77-bc7c-4ee4-a370-c6d39c4d52bd"), "Design", "Graphic Design" },
                    { new Guid("e1075a59-b517-43aa-b7f6-cc61be73632a"), "Business", "Data Analysis" },
                    { new Guid("ee11583e-6bcb-4906-b389-5fdd086ee533"), "Marketing", "Social Media Marketing" },
                    { new Guid("f093bde3-b8e9-4724-84e2-4a1cef5091d1"), "Design", "3D Modeling" },
                    { new Guid("f5ebb989-b72d-43ca-899d-7bd33a3b62c2"), "Programming", "Java" },
                    { new Guid("f94540d4-2c94-4abf-b992-51f40c4d1dfa"), "Programming", "Node.js" },
                    { new Guid("fc23e18a-90b1-4231-9839-698357dcea8e"), "Business", "Business Consulting" },
                    { new Guid("fd1905b2-b62f-4cbf-a0b6-8c94a611c9c3"), "Video & Animation", "After Effects" },
                    { new Guid("fdfd315a-5640-4900-8055-b4addaa7200e"), "Programming", "Kotlin" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("0311a6db-c13b-4295-a88a-1c714131ca37"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1800), null, null, null, "Marketing Strategy", "استراتيجية التسويق", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("058eb4b6-31b4-49f7-a995-714014a8c5d2"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1770), null, null, null, "SEO", "تحسين محركات البحث", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("074ca8ea-0dc6-4742-a0c6-f30f1162c81c"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1910), null, null, null, "Market Research", "أبحاث السوق", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("077a6d57-d69d-4efb-a82d-64dde9de0877"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1740), null, null, null, "AI & Machine Learning", "الذكاء الاصطناعي والتعلم الآلي", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("0811a81f-fb58-4b56-8d16-209a09708b41"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1850), null, null, null, "Proofreading", "التدقيق اللغوي", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("11a0ecc5-e038-439a-b511-57caea3ac8fe"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1970), null, null, null, "Music Production", "إنتاج الموسيقى", new Guid("01a3e221-575b-41c1-bef6-ea51510675d8") },
                    { new Guid("1216379d-2f7d-48eb-8df2-9f1b56d730ad"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1980), null, null, null, "Life Coaching", "تدريب الحياة", new Guid("f3ccf4c9-a49a-467a-91c3-8faebbaa9d3e") },
                    { new Guid("1389cf63-5b14-4741-a546-9e4bb4a95340"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1990), null, null, null, "Career Coaching", "التدريب المهني", new Guid("f3ccf4c9-a49a-467a-91c3-8faebbaa9d3e") },
                    { new Guid("157ac9e0-d00f-4a13-8ddf-585b14b5d97a"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1750), null, null, null, "DevOps & Cloud", "ديف أوبس والحوسبة السحابية", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("17135922-edaa-47cb-bf63-d7e4f3b48c64"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1790), null, null, null, "Content Marketing", "تسويق المحتوى", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("1f26b9f3-e6d2-4049-a267-9b0af9d41976"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1810), null, null, null, "Influencer Marketing", "التسويق عبر المؤثرين", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("27587cc3-7592-4aef-ad10-1aecb8f8d41d"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1690), null, null, null, "Book Cover Design", "تصميم أغلفة الكتب", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("27ee01d4-075a-4bdb-aa36-b535c34dcb85"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1890), null, null, null, "3D Animation", "الرسوم المتحركة ثلاثية الأبعاد", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("2d19f988-fc5b-4075-ba5e-af0bec63e7ad"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1930), null, null, null, "Data Entry", "إدخال البيانات", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("2e6b4d6c-569b-42d3-a2e3-7d2d1910ded7"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1860), null, null, null, "Academic Writing", "الكتابة الأكاديمية", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("2ed31f34-0ef3-4546-8bc2-a49bc0c03208"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1660), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("3fd553bc-519b-47bc-80f7-3d9179df049b"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1680), null, null, null, "Packaging Design", "تصميم التغليف", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("40b82e7c-42af-47ef-a13a-ab0b7c6e5a59"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1880), null, null, null, "2D Animation", "الرسوم المتحركة ثنائية الأبعاد", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("5ff7395a-e65b-4f09-b3bf-7522e03d6bef"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1950), null, null, null, "Voice Over", "التعليق الصوتي", new Guid("01a3e221-575b-41c1-bef6-ea51510675d8") },
                    { new Guid("62855717-995b-4b9d-892b-52976189c847"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1670), null, null, null, "Social Media Design", "تصميم وسائل التواصل الاجتماعي", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("6536eb2b-8e3c-481e-a9f0-3cccb546b3de"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1680), null, null, null, "Illustration", "الرسم التوضيحي", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("6cfacf43-b793-44b1-b9e0-a12114e4f490"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1940), null, null, null, "Financial Consulting", "الاستشارات المالية", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("77edc9c0-c049-4f35-900b-9533d3dabfad"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1700), null, null, null, "UI/UX Design", "تصميم واجهة وتجربة المستخدم", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("7c68acc3-b84f-41c5-9bbd-bcb9644b482d"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1830), null, null, null, "Technical Writing", "الكتابة التقنية", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("860a23ae-a4e4-43bc-980e-7f363a7477e7"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1740), null, null, null, "Automation & Bots", "الأتمتة والروبوتات", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("8a59f3cf-8276-486b-9c7b-88ad896e468b"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1840), null, null, null, "Translation", "الترجمة", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("8d63cb3e-216a-4236-ac08-e2d3d1141ead"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1720), null, null, null, "E-commerce Development", "تطوير التجارة الإلكترونية", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("92377ee9-f2ce-4bbc-a011-1157c8381951"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1940), null, null, null, "Accounting", "المحاسبة", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("952ff931-b0af-4b3e-95d5-e6b4fa25834f"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1650), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("a03830fa-4cd9-46cf-b50b-c41a0abf1997"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1730), null, null, null, "API Development", "تطوير واجهات برمجة التطبيقات", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("a2e364bc-a984-40e2-8898-57c41be68dc8"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1960), null, null, null, "Podcast Editing", "تحرير البودكاست", new Guid("01a3e221-575b-41c1-bef6-ea51510675d8") },
                    { new Guid("a642c56d-1973-4459-89bc-9782410d4c05"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1770), null, null, null, "Social Media Marketing", "التسويق عبر وسائل التواصل الاجتماعي", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("a72b84c6-14fc-43b9-88a0-f840ec2b8c24"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1920), null, null, null, "Virtual Assistant", "المساعد الافتراضي", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("ab2f1e32-0ef4-448b-a81a-0dc65667866f"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1870), null, null, null, "Motion Graphics", "الرسوم المتحركة", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("ab8a6c68-41c4-445a-9d4e-73cb6fca4f18"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1760), null, null, null, "Cybersecurity", "الأمن السيبراني", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("ab9f7c34-2925-4464-8549-c34d564303ba"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1790), null, null, null, "Email Marketing", "التسويق عبر البريد الإلكتروني", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("b91362fd-f7c5-41f7-8cee-f81ac4d59efd"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1910), null, null, null, "Business Plans", "خطط الأعمال", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("bc257127-937f-4894-8246-71f6b2f2a5f9"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(2000), null, null, null, "Online Tutoring", "التدريس عبر الإنترنت", new Guid("f3ccf4c9-a49a-467a-91c3-8faebbaa9d3e") },
                    { new Guid("bf9df5d9-4140-4f17-81b0-8f4cb45327df"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1820), null, null, null, "Copywriting", "كتابة المحتوى الإعلاني", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("c0e179a2-5a8e-4965-814e-3b85e4668bc6"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1880), null, null, null, "Explainer Videos", "فيديوهات توضيحية", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("c6a6cd78-d3b1-455c-aa4b-543f25bf8d2c"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1860), null, null, null, "Video Editing", "تحرير الفيديو", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("cac018e6-c9e4-4c1a-bb86-360228c1f5d7"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1840), null, null, null, "Resume Writing", "كتابة السيرة الذاتية", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("d0b828b0-426c-4b82-8151-7d4aa6fe93ed"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1780), null, null, null, "Paid Ads (Google/Facebook/TikTok)", "الإعلانات المدفوعة", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("db835309-8069-4c02-9f6a-df0e0f61b02c"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1960), null, null, null, "Audio Mixing", "مزج الصوت", new Guid("01a3e221-575b-41c1-bef6-ea51510675d8") },
                    { new Guid("dffa0d88-0cbb-44a7-a378-b5f9f98efa66"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1660), null, null, null, "Business Cards & Stationery", "بطاقات العمل والقرطاسية", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("e90d921f-84e6-4197-b65a-f581feb6657c"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1720), null, null, null, "Mobile App Development", "تطوير تطبيقات الجوال", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("eefcb683-c27e-483c-b169-7c4712d6e264"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1700), null, null, null, "3D Modeling", "النمذجة ثلاثية الأبعاد", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("f790c98e-b431-4f32-a161-a260b0aee170"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1820), null, null, null, "Blog Writing", "كتابة المدونات", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("fa3c4ce7-a263-47af-b478-9a1dbf566882"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1900), null, null, null, "YouTube Editing", "تحرير فيديوهات يوتيوب", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("fc00136c-0dc4-418b-99b1-5c53d6c001c4"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1710), null, null, null, "Web Development", "تطوير المواقع", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("fdce20e3-9a0c-4312-8564-5502eb7fa8e8"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1980), null, null, null, "Fitness Coaching", "التدريب على اللياقة البدنية", new Guid("f3ccf4c9-a49a-467a-91c3-8faebbaa9d3e") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdCampaigns_SellerId",
                table: "AdCampaigns",
                column: "SellerId");

            migrationBuilder.CreateIndex(
                name: "IX_AvailabilitySettings_SellerId",
                table: "AvailabilitySettings",
                column: "SellerId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessToolSettings_SellerId",
                table: "BusinessToolSettings",
                column: "SellerId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentId",
                table: "Categories",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_User1Id",
                table: "Conversations",
                column: "User1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_User2Id",
                table: "Conversations",
                column: "User2Id");

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
                name: "IX_Favorites_GigId",
                table: "Favorites",
                column: "GigId");

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
                name: "IX_Media_CustomOfferId",
                table: "Media",
                column: "CustomOfferId");

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
                name: "IX_Messages_ConversationId",
                table: "Messages",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReceiverId",
                table: "Messages",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReplyToMessageId",
                table: "Messages",
                column: "ReplyToMessageId");

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
                name: "IX_Packages_GigId",
                table: "Packages",
                column: "GigId");

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
                name: "IX_Promotions_SellerId",
                table: "Promotions",
                column: "SellerId");

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
                name: "IX_Revisions_RequesterId",
                table: "Revisions",
                column: "RequesterId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleSlots_BuyerId",
                table: "ScheduleSlots",
                column: "BuyerId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleSlots_OrderId",
                table: "ScheduleSlots",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleSlots_SellerId",
                table: "ScheduleSlots",
                column: "SellerId");

            migrationBuilder.CreateIndex(
                name: "IX_SearchAnalytics_UserId",
                table: "SearchAnalytics",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTickets_UserId",
                table: "SupportTickets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_WalletId",
                table: "Transactions",
                column: "WalletId");

            migrationBuilder.CreateIndex(
                name: "IX_UserNotificationPreferences_UserId",
                table: "UserNotificationPreferences",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserNotificationSettings_UserId",
                table: "UserNotificationSettings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSettings_UserId",
                table: "UserSettings",
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
                name: "AdCampaigns");

            migrationBuilder.DropTable(
                name: "AvailabilitySettings");

            migrationBuilder.DropTable(
                name: "BusinessToolSettings");

            migrationBuilder.DropTable(
                name: "CurrencyRates");

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
                name: "Packages");

            migrationBuilder.DropTable(
                name: "ProfileLanguages");

            migrationBuilder.DropTable(
                name: "ProfileSkills");

            migrationBuilder.DropTable(
                name: "Promotions");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Revisions");

            migrationBuilder.DropTable(
                name: "ScheduleSlots");

            migrationBuilder.DropTable(
                name: "SearchAnalytics");

            migrationBuilder.DropTable(
                name: "SupportTickets");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "TwoFactorVerifications");

            migrationBuilder.DropTable(
                name: "UserNotificationPreferences");

            migrationBuilder.DropTable(
                name: "UserNotificationSettings");

            migrationBuilder.DropTable(
                name: "UserSettings");

            migrationBuilder.DropTable(
                name: "UserTotpSettings");

            migrationBuilder.DropTable(
                name: "WithdrawalRequests");

            migrationBuilder.DropTable(
                name: "Goals");

            migrationBuilder.DropTable(
                name: "CustomOffers");

            migrationBuilder.DropTable(
                name: "Conversations");

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
