using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddSellerDashboardFeatures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0a68ca0b-a3f3-406d-ba7a-a0e0463d8f75"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0c2e550e-b1b1-4021-80a6-b911cd1d6081"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0ea7228e-e679-4f25-b23f-49c5f3f23218"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("11200732-5cea-463b-83a0-a910f2ce6a87"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1126ed79-3f1a-41b3-928a-888508797b3d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("118c8420-e6f3-4ad6-a2e6-fb4a6dd6336b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("12605776-3f9a-459b-be2d-fcef854fb3d2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("16d582bc-11e0-4522-9e7b-9d48046ab357"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1970fda0-67a9-46e0-a6c1-970d7f7b1ccf"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("28e50cd8-e897-4fed-b16d-51813eb2be94"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2ade5dd2-8e41-4674-a8fa-5a0aeb3bebd2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("30bdf5f1-7f83-43e3-89d1-7ab88b642677"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3882ccaf-2a35-4df4-9c9c-2585cdfcb24f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("40dfe7d0-8068-4bbe-a1c6-49f71cb31ad8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("495abc51-b04f-4d7d-a042-e0a84fd0ccf1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4eb4b238-7d17-4295-bc1b-1a335c5efa35"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5247a0be-dd7a-40e1-9ff2-de2a20d24dbe"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5b31af7f-05c6-495d-baaf-484d2ccd7585"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5c417745-64f3-412d-8774-2be918a4719f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("63a537ee-456f-44ec-bc98-fe5201a0ad2d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("69666b4a-2682-4e5a-b244-54edeb494198"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("738b056f-f46b-4da4-9ce3-2dfef1ba8f88"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7c63c654-7d92-4043-be3d-8afa72e6b2b0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7ce54529-efc9-4ee2-b9e4-752b6b9ac1da"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7ee3c8e6-59d4-4fe6-8db2-6158f612f72f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("81c51b00-f42a-4c18-a001-eb5d52cd9170"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("849387f5-8f8f-4447-8f1a-71847db89bc6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8a4b4e8f-8124-4fe1-805f-84127b034466"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8c6c2229-29c6-4fc2-b36b-8ac231dfd7bf"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("903f7e2d-c465-47ef-9622-29131f78b30c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("9194b5f6-24c8-4982-8dca-b0ab338f9468"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("97630147-32c4-4889-a071-c6fe01a76cd0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("9de69c50-195d-4f6c-a512-00aab0628dc1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a539087b-23d8-47fc-9b91-734b8372cc37"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a85bcd68-605a-4629-adf9-93327794ac8b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("aa1e0e3d-5fb2-420e-b0c4-8e686ad17d6e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("aa52ee3c-1ad3-43fc-b153-d58ce8b7b3ed"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("aba87c41-a90b-49ea-b180-6e522b135a87"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b6cf5508-4fba-4b62-a973-336667781e37"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b84fbf97-fed7-43de-ab32-a5fe4a971a8d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c5de53c3-a7b3-4315-9411-9289c76df7de"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c63c1ffa-9970-4e57-8123-e0fc7c59cce3"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c7069b7d-af32-4f9b-960e-70c9fe656a81"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("cb649aeb-0f2e-432e-adfb-6884e0b44904"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d2332387-f532-4833-9685-a8d97b321c37"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d4435ed7-ca07-4f3a-8509-5d1e62b11154"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d5837cd0-6e96-4841-bae4-b86615a9c837"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d5c3f447-596f-456b-8d54-af1130e13f9b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("df3465a4-222d-40ec-bb20-f9284568ea90"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ed99a096-e871-4222-9fe9-9151be98368c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f876013d-99e6-4685-9713-fb3045512f01"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("129cb6f2-4717-4879-861f-f018d0522700"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("12ec1336-eb3e-430e-8f27-7b47b10ed77c"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("3f2e54c0-ee8a-4bf3-aa0f-4e509721bcf0"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("468d1af3-aecc-4998-8dda-eb4cbdf50e52"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("604770d4-4406-4350-8df0-988db0bbad65"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("84290f07-0603-4259-b957-513aac135c24"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("af6fcf4a-a5f7-4815-872a-0dd884878f3f"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("b6d2b81c-db70-4492-a51d-841176d9c155"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("bcdfb73c-a157-4cb7-ab1f-efa56a3efd13"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("d8b5a8e6-d033-4b7e-82ff-470d03d6eb49"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("0557a54f-0ad6-428c-ab9d-ef4318708118"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("055c2963-09bd-4035-b56e-2c9aa54de537"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("05aa9ea4-5ea0-4cfe-ae4f-f19d71cdc95c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("089cae6f-3ed7-4638-b46f-9519fa067848"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("0eadd30c-2d1a-4a49-bce3-22fb5d87375f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1af5b112-a8ff-4b09-b123-48b6a455e3c8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("29f07305-2e88-435b-ac72-0047e50b7fd6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3cdfa400-6a7a-4d04-a16a-fdfb793f2fd1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("41dc7bea-d282-4186-98c3-5a8de04e74c6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("422fcdb1-21c4-418c-bf5b-050a2e4ac143"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("48a9314e-fe06-4991-baf8-2d431b699b07"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("48c6175a-be29-4188-8eba-47f8ab0d6489"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4d5a6e17-8dd6-427a-bb7c-471e1ceedf31"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("51d6983d-3058-448a-a90d-a97ef5619661"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("646ecd62-bd30-4809-8cdc-87b7b94bef1e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6dbf259e-9bd5-49e2-8aa1-e4024b585e90"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6e2393a6-d1e8-4f95-81dd-a86c42a392d1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("72a33aa9-8a65-428e-8334-aa9faf75482b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7c747f44-1805-4e8d-a3c0-f337d6529f72"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("82d20169-3815-4e01-a6ea-878fc92a75b4"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("89fa3ae4-2326-4366-9305-180680f225bf"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8bfddbe5-2c89-4461-9d5e-c34575b3d715"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8c40371c-1b33-46f9-af2d-d3c03f7f8473"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8ed135e4-37c0-47a5-bbc5-9219daa4c0d1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("99869206-fa9d-41e8-a6ee-b30622dfd577"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b7912454-aaed-4102-81ad-dbffd9dbafdb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c4d0a4c6-6505-4c3b-8a57-28eb8a9f2a77"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d0425e6e-8cde-4e45-95f7-094496c68deb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d2971dac-65c7-48ca-ae19-35397a9c4834"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("ff5ea79f-e511-4a52-8fd7-d22744432874"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("376074de-6e08-4265-9924-9932f7759626"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a73396fe-29d6-499c-893e-22094d98ba80"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a831e920-e480-4569-b319-84e3e859ac9d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e521c550-82db-4538-9ea4-b812e6596cf1"));

            migrationBuilder.AddColumn<long>(
                name: "AttachmentSize",
                table: "Messages",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AttachmentType",
                table: "Messages",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ConversationId",
                table: "Messages",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "DeliveredAt",
                table: "Messages",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EditedAt",
                table: "Messages",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Messages",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsEdited",
                table: "Messages",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Reactions",
                table: "Messages",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ReplyToMessageId",
                table: "Messages",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Messages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Messages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("03a4f835-e02b-4ceb-a89c-faa19b6d93d5"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1290), null, null, "self_improvement", "Lifestyle & Coaching", "نمط الحياة والتدريب", null },
                    { new Guid("0b06a40e-42ae-4cda-aae7-3452c017e81e"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1280), null, null, "music_note", "Music & Audio", "الموسيقى والصوتيات", null },
                    { new Guid("2880f9d5-3214-48ad-aba8-303aa077f2ab"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1270), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("9080bc68-1b22-490b-b203-d04854db01a9"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1260), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("9e89b99b-d7a3-43de-ae4c-ecf9df7302f2"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1280), null, null, "business", "Business Services", "الخدمات التجارية", null },
                    { new Guid("c686dffb-8947-4d2e-b735-9b962ffb609c"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1260), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("d63deff6-efd6-4e3b-9da0-677f1c3f4a6d"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1270), null, null, "trending_up", "Digital Marketing", "التسويق الرقمي", null },
                    { new Guid("e640fd1c-087b-4f0d-9f91-e88628b3b4df"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1270), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(750));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(750));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(750));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(750));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(750));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(750));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(750));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("00133d77-b5a4-473d-b1af-3fd4e1ec35b1"), "zh", "Chinese" },
                    { new Guid("17b7ee2e-ebd7-4ac3-a5f9-a53c5631dcb6"), "hi", "Hindi" },
                    { new Guid("22d7a19b-3fae-4975-9f71-3580eba7b665"), "ar", "Arabic" },
                    { new Guid("2deb350a-25f3-4ecd-8851-bdd7f7ec3df3"), "ru", "Russian" },
                    { new Guid("4c721ad2-2ff8-4dae-8bc6-673e04057a13"), "pt", "Portuguese" },
                    { new Guid("75687732-9593-476c-b83b-d68c930dd27d"), "en", "English" },
                    { new Guid("7f729b1d-ce1c-411b-9253-39f54ad31203"), "fr", "French" },
                    { new Guid("8a97b3ad-8875-4cab-b0ca-e80668a4f156"), "ja", "Japanese" },
                    { new Guid("bcfed4d2-636f-499a-8209-c7addfba1aec"), "es", "Spanish" },
                    { new Guid("ddae022c-5aa5-41c1-a90c-5b48a73543db"), "de", "German" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("0d3dfdb5-3298-4f9e-8753-28cd07f41346"), "Design", "3D Modeling" },
                    { new Guid("1743c431-10be-4925-ac04-a7c773cd8acd"), "Programming", "Python" },
                    { new Guid("1b78eefa-3503-4469-ac26-28fb38ebc26b"), "Video & Animation", "After Effects" },
                    { new Guid("2459e0d2-3755-4617-8c0e-64a9328a4d00"), "Programming", "C#" },
                    { new Guid("2cf537b8-fac6-40a3-a22c-fca633f2e73f"), "Programming", "JavaScript" },
                    { new Guid("33438c7b-970d-45b1-8c38-7f9a141ad8cd"), "Programming", "Node.js" },
                    { new Guid("42e075b6-a176-4bd1-ba8c-8cdeb637afe4"), "Design", "Logo Design" },
                    { new Guid("4c5aa0ba-1a46-4b7c-846b-7637d642a691"), "Design", "Adobe Photoshop" },
                    { new Guid("5719028b-56c2-4031-8747-a8d4d4c4b1ca"), "Writing", "Copywriting" },
                    { new Guid("5be51824-6692-48e4-b15f-56eb877916cd"), "Programming", "TypeScript" },
                    { new Guid("6f2bd0b5-9df1-4093-93da-4c4a55d2c33b"), "Design", "UI/UX Design" },
                    { new Guid("71d2a014-d4bc-450d-a852-6803957cd971"), "Writing", "Technical Writing" },
                    { new Guid("760e741a-1f6a-4ab2-a6f3-12dc952a1e93"), "Writing", "Translation" },
                    { new Guid("83189d3a-b49f-4d66-b926-6a4feacdded6"), "Business", "Data Analysis" },
                    { new Guid("8a1a2d14-2cf8-4145-ad5e-67a1927d907a"), "Programming", "React" },
                    { new Guid("8bd6422d-efa0-45a2-9ed3-f4677b409589"), "Marketing", "Email Marketing" },
                    { new Guid("8fa40fc7-b97f-4a8d-a122-9b8f541932bc"), "Marketing", "Digital Marketing" },
                    { new Guid("921b8c7b-7cec-43a1-a517-dd7ebea4512c"), "Programming", "Java" },
                    { new Guid("99e980d6-be12-4fc7-aa1f-2a844eb796fb"), "Programming", "Kotlin" },
                    { new Guid("af9d353e-0e5b-4f11-afdb-12a897e491f7"), "Marketing", "Content Writing" },
                    { new Guid("b8330b7c-15c3-4b12-8bd5-745f4a659b31"), "Programming", "Swift" },
                    { new Guid("ba8c40ea-1c9b-491f-be4f-8d656443beae"), "Video & Animation", "Animation" },
                    { new Guid("be01260c-d918-44c1-9361-c053dd458900"), "Video & Animation", "Video Editing" },
                    { new Guid("c0db8a63-d7f4-42f2-bbb9-16e1f99dcf2b"), "Design", "Graphic Design" },
                    { new Guid("c9a72c06-543b-4990-8b3a-73a65b954c22"), "Design", "Adobe Illustrator" },
                    { new Guid("e3d801c6-dcca-4a3a-a1dc-b8c5e17878e7"), "Programming", "Flutter" },
                    { new Guid("e77558ab-a2ca-406b-891e-7d2c0b618e27"), "Marketing", "SEO" },
                    { new Guid("e7d9ed9b-9a00-4419-b08a-07e293866ac9"), "Business", "Business Consulting" },
                    { new Guid("ef1c390b-7bd4-4066-a3a1-c2ca64ad2982"), "Marketing", "Social Media Marketing" },
                    { new Guid("f4ecad36-9380-413e-bf86-946ce509e7e2"), "Design", "Figma" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("0257db02-8e1b-4c0e-90d5-78a85bdbbb94"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2070), null, null, null, "Podcast Editing", "تحرير البودكاست", new Guid("0b06a40e-42ae-4cda-aae7-3452c017e81e") },
                    { new Guid("03b3d125-bc7b-44e9-9d6e-35ff3d6e3465"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2050), null, null, null, "Financial Consulting", "الاستشارات المالية", new Guid("9e89b99b-d7a3-43de-ae4c-ecf9df7302f2") },
                    { new Guid("073a5048-fa25-4f74-b2e8-a2e8403484b9"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1330), null, null, null, "Book Cover Design", "تصميم أغلفة الكتب", new Guid("9080bc68-1b22-490b-b203-d04854db01a9") },
                    { new Guid("0f512a8c-09c7-4520-acf8-22b53267cf30"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1380), null, null, null, "E-commerce Development", "تطوير التجارة الإلكترونية", new Guid("c686dffb-8947-4d2e-b735-9b962ffb609c") },
                    { new Guid("125d5765-bd9c-4fde-a854-c9d2d4285380"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1310), null, null, null, "Social Media Design", "تصميم وسائل التواصل الاجتماعي", new Guid("9080bc68-1b22-490b-b203-d04854db01a9") },
                    { new Guid("155b9949-0cce-405c-ba8d-140be1680a16"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1520), null, null, null, "Academic Writing", "الكتابة الأكاديمية", new Guid("2880f9d5-3214-48ad-aba8-303aa077f2ab") },
                    { new Guid("179c772c-3bb1-4ce8-801f-2e3375bdda16"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1510), null, null, null, "Proofreading", "التدقيق اللغوي", new Guid("2880f9d5-3214-48ad-aba8-303aa077f2ab") },
                    { new Guid("2014a4b4-9cc2-4719-880a-96cebf971837"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1300), null, null, null, "Business Cards & Stationery", "بطاقات العمل والقرطاسية", new Guid("9080bc68-1b22-490b-b203-d04854db01a9") },
                    { new Guid("263a96b7-ed41-462a-a71f-16cad66b0dc6"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2010), null, null, null, "YouTube Editing", "تحرير فيديوهات يوتيوب", new Guid("e640fd1c-087b-4f0d-9f91-e88628b3b4df") },
                    { new Guid("2d4da3b3-d7d4-4fcd-8c33-fc3ec580f262"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1470), null, null, null, "Blog Writing", "كتابة المدونات", new Guid("2880f9d5-3214-48ad-aba8-303aa077f2ab") },
                    { new Guid("34376c62-52ee-4395-a547-032d165171ac"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1360), null, null, null, "3D Modeling", "النمذجة ثلاثية الأبعاد", new Guid("9080bc68-1b22-490b-b203-d04854db01a9") },
                    { new Guid("3b68d2f0-080a-48e2-8cf5-8f255d410eb8"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1440), null, null, null, "Paid Ads (Google/Facebook/TikTok)", "الإعلانات المدفوعة", new Guid("d63deff6-efd6-4e3b-9da0-677f1c3f4a6d") },
                    { new Guid("4ff53305-603d-474b-8bf8-d8019ec12465"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1490), null, null, null, "Technical Writing", "الكتابة التقنية", new Guid("2880f9d5-3214-48ad-aba8-303aa077f2ab") },
                    { new Guid("57b6ffbd-a0fc-4475-b151-e40b2212215f"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1350), null, null, null, "UI/UX Design", "تصميم واجهة وتجربة المستخدم", new Guid("9080bc68-1b22-490b-b203-d04854db01a9") },
                    { new Guid("5ff32357-ca9a-4672-950f-80aa1759d4ab"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2030), null, null, null, "Virtual Assistant", "المساعد الافتراضي", new Guid("9e89b99b-d7a3-43de-ae4c-ecf9df7302f2") },
                    { new Guid("633023fb-8542-421b-9eb1-ede73049f152"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1370), null, null, null, "Mobile App Development", "تطوير تطبيقات الجوال", new Guid("c686dffb-8947-4d2e-b735-9b962ffb609c") },
                    { new Guid("6615c91b-98cc-4a13-a0b2-6a6cbc7c194c"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1990), null, null, null, "Explainer Videos", "فيديوهات توضيحية", new Guid("e640fd1c-087b-4f0d-9f91-e88628b3b4df") },
                    { new Guid("66bc3139-845a-46c3-85fe-4808ae86edaf"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2120), null, null, null, "Online Tutoring", "التدريس عبر الإنترنت", new Guid("03a4f835-e02b-4ceb-a89c-faa19b6d93d5") },
                    { new Guid("6cdf0801-15dc-49e8-a320-3621a34d5c7a"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2060), null, null, null, "Voice Over", "التعليق الصوتي", new Guid("0b06a40e-42ae-4cda-aae7-3452c017e81e") },
                    { new Guid("6d7a2f25-b77c-4386-8e10-668fbce6cdcd"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2020), null, null, null, "Market Research", "أبحاث السوق", new Guid("9e89b99b-d7a3-43de-ae4c-ecf9df7302f2") },
                    { new Guid("7b6affc6-2a53-43ba-b5cf-82cae54c52cb"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2000), null, null, null, "3D Animation", "الرسوم المتحركة ثلاثية الأبعاد", new Guid("e640fd1c-087b-4f0d-9f91-e88628b3b4df") },
                    { new Guid("7bec9d14-7741-404d-8625-52ecee1f8f6c"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1390), null, null, null, "AI & Machine Learning", "الذكاء الاصطناعي والتعلم الآلي", new Guid("c686dffb-8947-4d2e-b735-9b962ffb609c") },
                    { new Guid("7e501853-bc4e-46d4-809c-a78168fed3c0"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2000), null, null, null, "2D Animation", "الرسوم المتحركة ثنائية الأبعاد", new Guid("e640fd1c-087b-4f0d-9f91-e88628b3b4df") },
                    { new Guid("7e82b61b-3129-48e9-8c94-e3a0dd9b0335"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1460), null, null, null, "Marketing Strategy", "استراتيجية التسويق", new Guid("d63deff6-efd6-4e3b-9da0-677f1c3f4a6d") },
                    { new Guid("7ea5571a-4243-4b5f-a28d-55acbf9b1cea"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1500), null, null, null, "Translation", "الترجمة", new Guid("2880f9d5-3214-48ad-aba8-303aa077f2ab") },
                    { new Guid("7ea98fd2-a3f2-4fd8-b2ff-247188b405e9"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1320), null, null, null, "Packaging Design", "تصميم التغليف", new Guid("9080bc68-1b22-490b-b203-d04854db01a9") },
                    { new Guid("7f39c79f-b679-4fe9-8cfe-f8293e5d87fc"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1320), null, null, null, "Illustration", "الرسم التوضيحي", new Guid("9080bc68-1b22-490b-b203-d04854db01a9") },
                    { new Guid("80f7bd1f-3eb1-449a-a4a2-cdb89001f744"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2090), null, null, null, "Fitness Coaching", "التدريب على اللياقة البدنية", new Guid("03a4f835-e02b-4ceb-a89c-faa19b6d93d5") },
                    { new Guid("8cd75d1b-e5f6-410c-8cca-245cdc7e44df"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1410), null, null, null, "Cybersecurity", "الأمن السيبراني", new Guid("c686dffb-8947-4d2e-b735-9b962ffb609c") },
                    { new Guid("960ff866-341a-416d-9480-f5af51e7338b"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1480), null, null, null, "Copywriting", "كتابة المحتوى الإعلاني", new Guid("2880f9d5-3214-48ad-aba8-303aa077f2ab") },
                    { new Guid("a9dfb6c1-8657-41b9-a505-40ba82f08590"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2050), null, null, null, "Accounting", "المحاسبة", new Guid("9e89b99b-d7a3-43de-ae4c-ecf9df7302f2") },
                    { new Guid("a9e7d8d7-5749-4177-925b-e10d2f101c28"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1440), null, null, null, "Email Marketing", "التسويق عبر البريد الإلكتروني", new Guid("d63deff6-efd6-4e3b-9da0-677f1c3f4a6d") },
                    { new Guid("afdac5c8-9592-46f9-ab5e-5159175016f6"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2090), null, null, null, "Life Coaching", "تدريب الحياة", new Guid("03a4f835-e02b-4ceb-a89c-faa19b6d93d5") },
                    { new Guid("b976ccb9-eee6-4487-8e3b-c70fa138307f"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2080), null, null, null, "Music Production", "إنتاج الموسيقى", new Guid("0b06a40e-42ae-4cda-aae7-3452c017e81e") },
                    { new Guid("ba081444-cea6-4151-a02d-52d87e13361c"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1290), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("9080bc68-1b22-490b-b203-d04854db01a9") },
                    { new Guid("bf659bb4-222b-4215-ac7e-b45314a0004f"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1390), null, null, null, "API Development", "تطوير واجهات برمجة التطبيقات", new Guid("c686dffb-8947-4d2e-b735-9b962ffb609c") },
                    { new Guid("c304bc46-caca-4f86-895e-e69754f6a8bc"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2070), null, null, null, "Audio Mixing", "مزج الصوت", new Guid("0b06a40e-42ae-4cda-aae7-3452c017e81e") },
                    { new Guid("c85350f5-1afb-4d83-b4d9-08fbbdd86b95"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1370), null, null, null, "Web Development", "تطوير المواقع", new Guid("c686dffb-8947-4d2e-b735-9b962ffb609c") },
                    { new Guid("ca485524-6dac-44c6-9290-8098669e2a9b"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1430), null, null, null, "SEO", "تحسين محركات البحث", new Guid("d63deff6-efd6-4e3b-9da0-677f1c3f4a6d") },
                    { new Guid("cf17bee5-6aac-43cb-a974-d7c940b20c2c"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2020), null, null, null, "Business Plans", "خطط الأعمال", new Guid("9e89b99b-d7a3-43de-ae4c-ecf9df7302f2") },
                    { new Guid("d25a4a14-aa39-4190-8ee9-09ef35723629"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2040), null, null, null, "Data Entry", "إدخال البيانات", new Guid("9e89b99b-d7a3-43de-ae4c-ecf9df7302f2") },
                    { new Guid("daf6415d-2b63-4097-9b46-a8081a595d00"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1410), null, null, null, "DevOps & Cloud", "ديف أوبس والحوسبة السحابية", new Guid("c686dffb-8947-4d2e-b735-9b962ffb609c") },
                    { new Guid("db770a15-8254-49aa-b1b6-df4f3760b04b"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1460), null, null, null, "Influencer Marketing", "التسويق عبر المؤثرين", new Guid("d63deff6-efd6-4e3b-9da0-677f1c3f4a6d") },
                    { new Guid("dd52358c-4d91-4a50-bd47-d9e76b9807bb"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1450), null, null, null, "Content Marketing", "تسويق المحتوى", new Guid("d63deff6-efd6-4e3b-9da0-677f1c3f4a6d") },
                    { new Guid("df66d258-7a4a-4ef2-be65-59735fb00d97"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(2110), null, null, null, "Career Coaching", "التدريب المهني", new Guid("03a4f835-e02b-4ceb-a89c-faa19b6d93d5") },
                    { new Guid("e79c0230-328a-43e3-a53e-8e8ec51bad39"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1400), null, null, null, "Automation & Bots", "الأتمتة والروبوتات", new Guid("c686dffb-8947-4d2e-b735-9b962ffb609c") },
                    { new Guid("f124f102-f34f-43b7-9900-b999eb52ca1e"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1420), null, null, null, "Social Media Marketing", "التسويق عبر وسائل التواصل الاجتماعي", new Guid("d63deff6-efd6-4e3b-9da0-677f1c3f4a6d") },
                    { new Guid("f372c452-06bc-4f63-ab1b-4b8016d978bf"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1300), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("9080bc68-1b22-490b-b203-d04854db01a9") },
                    { new Guid("f3f978e3-affb-4fb9-bca5-449a3e749937"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1490), null, null, null, "Resume Writing", "كتابة السيرة الذاتية", new Guid("2880f9d5-3214-48ad-aba8-303aa077f2ab") },
                    { new Guid("fa0afa93-dde0-41d6-bc15-e50e019190f8"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1520), null, null, null, "Video Editing", "تحرير الفيديو", new Guid("e640fd1c-087b-4f0d-9f91-e88628b3b4df") },
                    { new Guid("fdb12b5b-73bf-40bc-886b-34fe8f297fde"), new DateTime(2026, 2, 22, 11, 35, 9, 981, DateTimeKind.Utc).AddTicks(1530), null, null, null, "Motion Graphics", "الرسوم المتحركة", new Guid("e640fd1c-087b-4f0d-9f91-e88628b3b4df") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ConversationId",
                table: "Messages",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReplyToMessageId",
                table: "Messages",
                column: "ReplyToMessageId");

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
                name: "IX_Conversations_User1Id",
                table: "Conversations",
                column: "User1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_User2Id",
                table: "Conversations",
                column: "User2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Promotions_SellerId",
                table: "Promotions",
                column: "SellerId");

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
                name: "IX_UserNotificationPreferences_UserId",
                table: "UserNotificationPreferences",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Conversations_ConversationId",
                table: "Messages",
                column: "ConversationId",
                principalTable: "Conversations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Messages_ReplyToMessageId",
                table: "Messages",
                column: "ReplyToMessageId",
                principalTable: "Messages",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Conversations_ConversationId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Messages_ReplyToMessageId",
                table: "Messages");

            migrationBuilder.DropTable(
                name: "AdCampaigns");

            migrationBuilder.DropTable(
                name: "AvailabilitySettings");

            migrationBuilder.DropTable(
                name: "BusinessToolSettings");

            migrationBuilder.DropTable(
                name: "Conversations");

            migrationBuilder.DropTable(
                name: "Promotions");

            migrationBuilder.DropTable(
                name: "ScheduleSlots");

            migrationBuilder.DropTable(
                name: "UserNotificationPreferences");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ConversationId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ReplyToMessageId",
                table: "Messages");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0257db02-8e1b-4c0e-90d5-78a85bdbbb94"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("03b3d125-bc7b-44e9-9d6e-35ff3d6e3465"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("073a5048-fa25-4f74-b2e8-a2e8403484b9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0f512a8c-09c7-4520-acf8-22b53267cf30"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("125d5765-bd9c-4fde-a854-c9d2d4285380"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("155b9949-0cce-405c-ba8d-140be1680a16"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("179c772c-3bb1-4ce8-801f-2e3375bdda16"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2014a4b4-9cc2-4719-880a-96cebf971837"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("263a96b7-ed41-462a-a71f-16cad66b0dc6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2d4da3b3-d7d4-4fcd-8c33-fc3ec580f262"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("34376c62-52ee-4395-a547-032d165171ac"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3b68d2f0-080a-48e2-8cf5-8f255d410eb8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4ff53305-603d-474b-8bf8-d8019ec12465"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("57b6ffbd-a0fc-4475-b151-e40b2212215f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5ff32357-ca9a-4672-950f-80aa1759d4ab"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("633023fb-8542-421b-9eb1-ede73049f152"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("6615c91b-98cc-4a13-a0b2-6a6cbc7c194c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("66bc3139-845a-46c3-85fe-4808ae86edaf"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("6cdf0801-15dc-49e8-a320-3621a34d5c7a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("6d7a2f25-b77c-4386-8e10-668fbce6cdcd"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7b6affc6-2a53-43ba-b5cf-82cae54c52cb"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7bec9d14-7741-404d-8625-52ecee1f8f6c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7e501853-bc4e-46d4-809c-a78168fed3c0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7e82b61b-3129-48e9-8c94-e3a0dd9b0335"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7ea5571a-4243-4b5f-a28d-55acbf9b1cea"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7ea98fd2-a3f2-4fd8-b2ff-247188b405e9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7f39c79f-b679-4fe9-8cfe-f8293e5d87fc"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("80f7bd1f-3eb1-449a-a4a2-cdb89001f744"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8cd75d1b-e5f6-410c-8cca-245cdc7e44df"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("960ff866-341a-416d-9480-f5af51e7338b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a9dfb6c1-8657-41b9-a505-40ba82f08590"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a9e7d8d7-5749-4177-925b-e10d2f101c28"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("afdac5c8-9592-46f9-ab5e-5159175016f6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b976ccb9-eee6-4487-8e3b-c70fa138307f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ba081444-cea6-4151-a02d-52d87e13361c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("bf659bb4-222b-4215-ac7e-b45314a0004f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c304bc46-caca-4f86-895e-e69754f6a8bc"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c85350f5-1afb-4d83-b4d9-08fbbdd86b95"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ca485524-6dac-44c6-9290-8098669e2a9b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("cf17bee5-6aac-43cb-a974-d7c940b20c2c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d25a4a14-aa39-4190-8ee9-09ef35723629"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("daf6415d-2b63-4097-9b46-a8081a595d00"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("db770a15-8254-49aa-b1b6-df4f3760b04b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("dd52358c-4d91-4a50-bd47-d9e76b9807bb"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("df66d258-7a4a-4ef2-be65-59735fb00d97"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e79c0230-328a-43e3-a53e-8e8ec51bad39"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f124f102-f34f-43b7-9900-b999eb52ca1e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f372c452-06bc-4f63-ab1b-4b8016d978bf"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f3f978e3-affb-4fb9-bca5-449a3e749937"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("fa0afa93-dde0-41d6-bc15-e50e019190f8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("fdb12b5b-73bf-40bc-886b-34fe8f297fde"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("00133d77-b5a4-473d-b1af-3fd4e1ec35b1"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("17b7ee2e-ebd7-4ac3-a5f9-a53c5631dcb6"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("22d7a19b-3fae-4975-9f71-3580eba7b665"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("2deb350a-25f3-4ecd-8851-bdd7f7ec3df3"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("4c721ad2-2ff8-4dae-8bc6-673e04057a13"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("75687732-9593-476c-b83b-d68c930dd27d"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("7f729b1d-ce1c-411b-9253-39f54ad31203"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("8a97b3ad-8875-4cab-b0ca-e80668a4f156"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("bcfed4d2-636f-499a-8209-c7addfba1aec"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("ddae022c-5aa5-41c1-a90c-5b48a73543db"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("0d3dfdb5-3298-4f9e-8753-28cd07f41346"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1743c431-10be-4925-ac04-a7c773cd8acd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1b78eefa-3503-4469-ac26-28fb38ebc26b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2459e0d2-3755-4617-8c0e-64a9328a4d00"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2cf537b8-fac6-40a3-a22c-fca633f2e73f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("33438c7b-970d-45b1-8c38-7f9a141ad8cd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("42e075b6-a176-4bd1-ba8c-8cdeb637afe4"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4c5aa0ba-1a46-4b7c-846b-7637d642a691"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("5719028b-56c2-4031-8747-a8d4d4c4b1ca"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("5be51824-6692-48e4-b15f-56eb877916cd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6f2bd0b5-9df1-4093-93da-4c4a55d2c33b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("71d2a014-d4bc-450d-a852-6803957cd971"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("760e741a-1f6a-4ab2-a6f3-12dc952a1e93"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("83189d3a-b49f-4d66-b926-6a4feacdded6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8a1a2d14-2cf8-4145-ad5e-67a1927d907a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8bd6422d-efa0-45a2-9ed3-f4677b409589"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8fa40fc7-b97f-4a8d-a122-9b8f541932bc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("921b8c7b-7cec-43a1-a517-dd7ebea4512c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("99e980d6-be12-4fc7-aa1f-2a844eb796fb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("af9d353e-0e5b-4f11-afdb-12a897e491f7"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b8330b7c-15c3-4b12-8bd5-745f4a659b31"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("ba8c40ea-1c9b-491f-be4f-8d656443beae"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("be01260c-d918-44c1-9361-c053dd458900"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c0db8a63-d7f4-42f2-bbb9-16e1f99dcf2b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c9a72c06-543b-4990-8b3a-73a65b954c22"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e3d801c6-dcca-4a3a-a1dc-b8c5e17878e7"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e77558ab-a2ca-406b-891e-7d2c0b618e27"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e7d9ed9b-9a00-4419-b08a-07e293866ac9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("ef1c390b-7bd4-4066-a3a1-c2ca64ad2982"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f4ecad36-9380-413e-bf86-946ce509e7e2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("03a4f835-e02b-4ceb-a89c-faa19b6d93d5"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0b06a40e-42ae-4cda-aae7-3452c017e81e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2880f9d5-3214-48ad-aba8-303aa077f2ab"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("9080bc68-1b22-490b-b203-d04854db01a9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("9e89b99b-d7a3-43de-ae4c-ecf9df7302f2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c686dffb-8947-4d2e-b735-9b962ffb609c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d63deff6-efd6-4e3b-9da0-677f1c3f4a6d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e640fd1c-087b-4f0d-9f91-e88628b3b4df"));

            migrationBuilder.DropColumn(
                name: "AttachmentSize",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "AttachmentType",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "ConversationId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "DeliveredAt",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "EditedAt",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "IsEdited",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Reactions",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "ReplyToMessageId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Messages");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8920), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8910), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("376074de-6e08-4265-9924-9932f7759626"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8920), null, null, "music_note", "Music & Audio", "الموسيقى والصوتيات", null },
                    { new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8910), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("a73396fe-29d6-499c-893e-22094d98ba80"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8910), null, null, "trending_up", "Digital Marketing", "التسويق الرقمي", null },
                    { new Guid("a831e920-e480-4569-b319-84e3e859ac9d"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8920), null, null, "business", "Business Services", "الخدمات التجارية", null },
                    { new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8900), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("e521c550-82db-4538-9ea4-b812e6596cf1"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8930), null, null, "self_improvement", "Lifestyle & Coaching", "نمط الحياة والتدريب", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8420));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8430));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8420));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8420));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8430));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8420));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8420));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("129cb6f2-4717-4879-861f-f018d0522700"), "es", "Spanish" },
                    { new Guid("12ec1336-eb3e-430e-8f27-7b47b10ed77c"), "fr", "French" },
                    { new Guid("3f2e54c0-ee8a-4bf3-aa0f-4e509721bcf0"), "ru", "Russian" },
                    { new Guid("468d1af3-aecc-4998-8dda-eb4cbdf50e52"), "de", "German" },
                    { new Guid("604770d4-4406-4350-8df0-988db0bbad65"), "zh", "Chinese" },
                    { new Guid("84290f07-0603-4259-b957-513aac135c24"), "hi", "Hindi" },
                    { new Guid("af6fcf4a-a5f7-4815-872a-0dd884878f3f"), "ar", "Arabic" },
                    { new Guid("b6d2b81c-db70-4492-a51d-841176d9c155"), "pt", "Portuguese" },
                    { new Guid("bcdfb73c-a157-4cb7-ab1f-efa56a3efd13"), "ja", "Japanese" },
                    { new Guid("d8b5a8e6-d033-4b7e-82ff-470d03d6eb49"), "en", "English" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("0557a54f-0ad6-428c-ab9d-ef4318708118"), "Video & Animation", "Video Editing" },
                    { new Guid("055c2963-09bd-4035-b56e-2c9aa54de537"), "Programming", "React" },
                    { new Guid("05aa9ea4-5ea0-4cfe-ae4f-f19d71cdc95c"), "Programming", "Kotlin" },
                    { new Guid("089cae6f-3ed7-4638-b46f-9519fa067848"), "Programming", "Java" },
                    { new Guid("0eadd30c-2d1a-4a49-bce3-22fb5d87375f"), "Design", "Adobe Illustrator" },
                    { new Guid("1af5b112-a8ff-4b09-b123-48b6a455e3c8"), "Marketing", "Email Marketing" },
                    { new Guid("29f07305-2e88-435b-ac72-0047e50b7fd6"), "Business", "Data Analysis" },
                    { new Guid("3cdfa400-6a7a-4d04-a16a-fdfb793f2fd1"), "Design", "Graphic Design" },
                    { new Guid("41dc7bea-d282-4186-98c3-5a8de04e74c6"), "Marketing", "Social Media Marketing" },
                    { new Guid("422fcdb1-21c4-418c-bf5b-050a2e4ac143"), "Programming", "C#" },
                    { new Guid("48a9314e-fe06-4991-baf8-2d431b699b07"), "Programming", "TypeScript" },
                    { new Guid("48c6175a-be29-4188-8eba-47f8ab0d6489"), "Marketing", "Digital Marketing" },
                    { new Guid("4d5a6e17-8dd6-427a-bb7c-471e1ceedf31"), "Writing", "Translation" },
                    { new Guid("51d6983d-3058-448a-a90d-a97ef5619661"), "Design", "Logo Design" },
                    { new Guid("646ecd62-bd30-4809-8cdc-87b7b94bef1e"), "Programming", "Node.js" },
                    { new Guid("6dbf259e-9bd5-49e2-8aa1-e4024b585e90"), "Business", "Business Consulting" },
                    { new Guid("6e2393a6-d1e8-4f95-81dd-a86c42a392d1"), "Programming", "JavaScript" },
                    { new Guid("72a33aa9-8a65-428e-8334-aa9faf75482b"), "Video & Animation", "Animation" },
                    { new Guid("7c747f44-1805-4e8d-a3c0-f337d6529f72"), "Design", "Adobe Photoshop" },
                    { new Guid("82d20169-3815-4e01-a6ea-878fc92a75b4"), "Design", "Figma" },
                    { new Guid("89fa3ae4-2326-4366-9305-180680f225bf"), "Marketing", "Content Writing" },
                    { new Guid("8bfddbe5-2c89-4461-9d5e-c34575b3d715"), "Programming", "Python" },
                    { new Guid("8c40371c-1b33-46f9-af2d-d3c03f7f8473"), "Design", "UI/UX Design" },
                    { new Guid("8ed135e4-37c0-47a5-bbc5-9219daa4c0d1"), "Marketing", "SEO" },
                    { new Guid("99869206-fa9d-41e8-a6ee-b30622dfd577"), "Programming", "Swift" },
                    { new Guid("b7912454-aaed-4102-81ad-dbffd9dbafdb"), "Writing", "Copywriting" },
                    { new Guid("c4d0a4c6-6505-4c3b-8a57-28eb8a9f2a77"), "Design", "3D Modeling" },
                    { new Guid("d0425e6e-8cde-4e45-95f7-094496c68deb"), "Writing", "Technical Writing" },
                    { new Guid("d2971dac-65c7-48ca-ae19-35397a9c4834"), "Video & Animation", "After Effects" },
                    { new Guid("ff5ea79f-e511-4a52-8fd7-d22744432874"), "Programming", "Flutter" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("0a68ca0b-a3f3-406d-ba7a-a0e0463d8f75"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9060), null, null, null, "Social Media Marketing", "التسويق عبر وسائل التواصل الاجتماعي", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("0c2e550e-b1b1-4021-80a6-b911cd1d6081"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9260), null, null, null, "Fitness Coaching", "التدريب على اللياقة البدنية", new Guid("e521c550-82db-4538-9ea4-b812e6596cf1") },
                    { new Guid("0ea7228e-e679-4f25-b23f-49c5f3f23218"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9230), null, null, null, "Accounting", "المحاسبة", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("11200732-5cea-463b-83a0-a910f2ce6a87"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9020), null, null, null, "E-commerce Development", "تطوير التجارة الإلكترونية", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("1126ed79-3f1a-41b3-928a-888508797b3d"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9200), null, null, null, "Market Research", "أبحاث السوق", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("118c8420-e6f3-4ad6-a2e6-fb4a6dd6336b"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9270), null, null, null, "Life Coaching", "تدريب الحياة", new Guid("e521c550-82db-4538-9ea4-b812e6596cf1") },
                    { new Guid("12605776-3f9a-459b-be2d-fcef854fb3d2"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9250), null, null, null, "Audio Mixing", "مزج الصوت", new Guid("376074de-6e08-4265-9924-9932f7759626") },
                    { new Guid("16d582bc-11e0-4522-9e7b-9d48046ab357"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9230), null, null, null, "Voice Over", "التعليق الصوتي", new Guid("376074de-6e08-4265-9924-9932f7759626") },
                    { new Guid("1970fda0-67a9-46e0-a6c1-970d7f7b1ccf"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9040), null, null, null, "Automation & Bots", "الأتمتة والروبوتات", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("28e50cd8-e897-4fed-b16d-51813eb2be94"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9170), null, null, null, "2D Animation", "الرسوم المتحركة ثنائية الأبعاد", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("2ade5dd2-8e41-4674-a8fa-5a0aeb3bebd2"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9200), null, null, null, "Virtual Assistant", "المساعد الافتراضي", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("30bdf5f1-7f83-43e3-89d1-7ab88b642677"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9050), null, null, null, "Cybersecurity", "الأمن السيبراني", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("3882ccaf-2a35-4df4-9c9c-2585cdfcb24f"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9220), null, null, null, "Financial Consulting", "الاستشارات المالية", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("40dfe7d0-8068-4bbe-a1c6-49f71cb31ad8"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8970), null, null, null, "Book Cover Design", "تصميم أغلفة الكتب", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("495abc51-b04f-4d7d-a042-e0a84fd0ccf1"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8980), null, null, null, "3D Modeling", "النمذجة ثلاثية الأبعاد", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("4eb4b238-7d17-4295-bc1b-1a335c5efa35"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9080), null, null, null, "Email Marketing", "التسويق عبر البريد الإلكتروني", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("5247a0be-dd7a-40e1-9ff2-de2a20d24dbe"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8960), null, null, null, "Illustration", "الرسم التوضيحي", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("5b31af7f-05c6-495d-baaf-484d2ccd7585"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8940), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("5c417745-64f3-412d-8774-2be918a4719f"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9090), null, null, null, "Content Marketing", "تسويق المحتوى", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("63a537ee-456f-44ec-bc98-fe5201a0ad2d"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8950), null, null, null, "Business Cards & Stationery", "بطاقات العمل والقرطاسية", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("69666b4a-2682-4e5a-b244-54edeb494198"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9170), null, null, null, "Explainer Videos", "فيديوهات توضيحية", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("738b056f-f46b-4da4-9ce3-2dfef1ba8f88"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8950), null, null, null, "Social Media Design", "تصميم وسائل التواصل الاجتماعي", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("7c63c654-7d92-4043-be3d-8afa72e6b2b0"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9280), null, null, null, "Online Tutoring", "التدريس عبر الإنترنت", new Guid("e521c550-82db-4538-9ea4-b812e6596cf1") },
                    { new Guid("7ce54529-efc9-4ee2-b9e4-752b6b9ac1da"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9110), null, null, null, "Blog Writing", "كتابة المدونات", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("7ee3c8e6-59d4-4fe6-8db2-6158f612f72f"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9090), null, null, null, "Marketing Strategy", "استراتيجية التسويق", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("81c51b00-f42a-4c18-a001-eb5d52cd9170"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9100), null, null, null, "Influencer Marketing", "التسويق عبر المؤثرين", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("849387f5-8f8f-4447-8f1a-71847db89bc6"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9070), null, null, null, "SEO", "تحسين محركات البحث", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("8a4b4e8f-8124-4fe1-805f-84127b034466"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9210), null, null, null, "Data Entry", "إدخال البيانات", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("8c6c2229-29c6-4fc2-b36b-8ac231dfd7bf"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9150), null, null, null, "Video Editing", "تحرير الفيديو", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("903f7e2d-c465-47ef-9622-29131f78b30c"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9150), null, null, null, "Academic Writing", "الكتابة الأكاديمية", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("9194b5f6-24c8-4982-8dca-b0ab338f9468"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9130), null, null, null, "Translation", "الترجمة", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("97630147-32c4-4889-a071-c6fe01a76cd0"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9050), null, null, null, "DevOps & Cloud", "ديف أوبس والحوسبة السحابية", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("9de69c50-195d-4f6c-a512-00aab0628dc1"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8960), null, null, null, "Packaging Design", "تصميم التغليف", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("a539087b-23d8-47fc-9b91-734b8372cc37"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9160), null, null, null, "Motion Graphics", "الرسوم المتحركة", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("a85bcd68-605a-4629-adf9-93327794ac8b"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9030), null, null, null, "API Development", "تطوير واجهات برمجة التطبيقات", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("aa1e0e3d-5fb2-420e-b0c4-8e686ad17d6e"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8990), null, null, null, "Web Development", "تطوير المواقع", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("aa52ee3c-1ad3-43fc-b153-d58ce8b7b3ed"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9120), null, null, null, "Technical Writing", "الكتابة التقنية", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("aba87c41-a90b-49ea-b180-6e522b135a87"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9110), null, null, null, "Copywriting", "كتابة المحتوى الإعلاني", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("b6cf5508-4fba-4b62-a973-336667781e37"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9270), null, null, null, "Career Coaching", "التدريب المهني", new Guid("e521c550-82db-4538-9ea4-b812e6596cf1") },
                    { new Guid("b84fbf97-fed7-43de-ab32-a5fe4a971a8d"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9190), null, null, null, "YouTube Editing", "تحرير فيديوهات يوتيوب", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("c5de53c3-a7b3-4315-9411-9289c76df7de"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9180), null, null, null, "3D Animation", "الرسوم المتحركة ثلاثية الأبعاد", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("c63c1ffa-9970-4e57-8123-e0fc7c59cce3"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9000), null, null, null, "Mobile App Development", "تطوير تطبيقات الجوال", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("c7069b7d-af32-4f9b-960e-70c9fe656a81"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9240), null, null, null, "Podcast Editing", "تحرير البودكاست", new Guid("376074de-6e08-4265-9924-9932f7759626") },
                    { new Guid("cb649aeb-0f2e-432e-adfb-6884e0b44904"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8980), null, null, null, "UI/UX Design", "تصميم واجهة وتجربة المستخدم", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("d2332387-f532-4833-9685-a8d97b321c37"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8930), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("d4435ed7-ca07-4f3a-8509-5d1e62b11154"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9030), null, null, null, "AI & Machine Learning", "الذكاء الاصطناعي والتعلم الآلي", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("d5837cd0-6e96-4841-bae4-b86615a9c837"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9130), null, null, null, "Resume Writing", "كتابة السيرة الذاتية", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("d5c3f447-596f-456b-8d54-af1130e13f9b"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9250), null, null, null, "Music Production", "إنتاج الموسيقى", new Guid("376074de-6e08-4265-9924-9932f7759626") },
                    { new Guid("df3465a4-222d-40ec-bb20-f9284568ea90"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9070), null, null, null, "Paid Ads (Google/Facebook/TikTok)", "الإعلانات المدفوعة", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("ed99a096-e871-4222-9fe9-9151be98368c"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9190), null, null, null, "Business Plans", "خطط الأعمال", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("f876013d-99e6-4685-9713-fb3045512f01"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9140), null, null, null, "Proofreading", "التدقيق اللغوي", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") }
                });
        }
    }
}
