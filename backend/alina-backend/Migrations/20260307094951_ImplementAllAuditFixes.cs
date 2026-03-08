using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class ImplementAllAuditFixes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Gigs_GigId1",
                table: "Media");

            migrationBuilder.DropForeignKey(
                name: "FK_Media_UserTasks_UserTaskId1",
                table: "Media");

            migrationBuilder.DropIndex(
                name: "IX_Media_GigId1",
                table: "Media");

            migrationBuilder.DropIndex(
                name: "IX_Media_UserTaskId1",
                table: "Media");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_User1Id",
                table: "Conversations");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("072cbd88-c7cb-4ab0-824a-6162d988779a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0acce8d0-ffd9-456f-a8dd-c89618256f55"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0cf5376e-5d7b-43b0-8009-c4a6398c92c6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0e2db012-9999-4ae0-aac0-84ec156771d1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1042a430-cb14-403b-849c-cc6247ebfd9c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("14118e05-9609-4e95-8978-fb143f2a83ff"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("27fc2a17-a81f-448f-9d47-b9fa74e2d69e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2965ef40-053f-489c-aee3-a9ac3018539b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2f628461-b7d3-4967-927c-3d45257583a6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3055d3a8-418d-47c5-ab0b-368a7fd5d8b5"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("42e8ade3-9bb9-4c14-8631-4a4d7a131e39"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("450655da-ad34-4f2a-9667-4742255e6e9e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("495fc4a6-78ac-4c4b-9212-57081e466857"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4a191d2e-0523-4a71-88ca-063254bb58e7"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("56e13769-7481-4c92-ab5a-5a2f1ac54a39"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5b76c789-4431-4a1c-85ec-030427319051"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5de2095b-6bce-44f4-82a4-0f54e4a94dc7"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5f8a5e30-cfa1-48fb-9639-cf9406394ba6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("648285bb-f19a-4213-9f75-9eec464bf549"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("6aeb1939-bb41-46cf-b871-207253855276"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7b19e965-220e-4801-8049-b190467f6edb"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7c4a7a8c-7489-4818-9b28-739dbb2a488d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7ea55299-95cc-4e3a-a6b4-c8f9ddb904cc"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8941e532-cf6a-4ec5-b98b-e36985d68e9d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8bacd4a3-1f3b-471b-acff-43785254ba14"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("99aa230b-2037-4c1e-b6c0-6e8dca45a68a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("9bad3bf9-e3fb-4f82-abe9-28e4c1204b24"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a75cb7a0-8c07-4679-ae97-2e42d624df8e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a8720fcc-e136-4727-b905-2db94cb027ce"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a9fbde2d-e5b2-4db2-92a1-1a702bf9af9b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ab6a5438-6bd8-4278-8559-b55ad8b1e636"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("abc5cc6b-03b0-485d-adf8-af677bca905f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ace342bb-ed82-426b-8f8f-9f63eb9c5444"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b255f7f7-6ea8-4db9-94ed-5a8e75fee203"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b31a626b-d3c4-4dee-aed4-562ef00bddf9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("bb17e712-80ea-437a-a17a-2e4e81ea2a22"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c0d378d5-57c4-4852-90d2-6268dbac84ba"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c167b700-7630-41c8-8b45-20227d4d4e80"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c396eda9-dec2-465f-b3b6-0c89a3f612d9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c5743cde-7e66-43c8-9e0e-9b47db29a1a9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c8e1a18b-bce7-47d2-8511-8519f98edd6f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c915a8fd-5468-4b84-9aef-e323411f4e81"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d66ec561-ae9f-4d7f-ab79-4cfb35173020"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d7c753c6-d8fc-42e8-9c44-862d9b688bd6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("dc675f84-1b88-4eef-ab81-4685fe81c500"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("dea829c2-84a1-4338-9d69-727ecf1f2e86"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("df00a879-d38d-4850-a21a-c3be720bd3d3"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e84bf9cc-88b6-4a23-9e15-020ec905a19d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ed0619de-4ddb-47c9-b81f-8cf47256a0a5"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ed27a3c0-ad0d-4b6f-9ed1-f73c19fb42cf"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f4629e2b-3eff-4373-9206-541fbbe85557"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("239fd628-0f15-4f52-9ee0-bca991b21fcc"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("28f652c7-6da6-4b26-9275-dcbe1cafd0bb"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("2c9ac24e-acf3-4576-9bf9-2adf4b80f475"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("54a7e467-2a97-46a8-96de-2beac36951c1"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("88db11f8-d752-45f5-911e-8c64a833f034"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("9b48f3a1-c4a1-4f02-9bd0-d3a2d482b73b"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("9ee9dd42-2613-4808-86df-1fec52e723d5"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("cec23111-c562-4dd4-a231-8c4df0efaaf6"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("f4100e4c-bfb9-4201-83e5-ac1ee857a832"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("f46cf590-9b58-4ecd-bf49-b34b38fecce5"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("18f44bc1-7352-4183-b6d5-af2cb12324d6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1c4aa6d4-359b-4225-bc5a-d3e452844232"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1e1088bf-fea6-4bfb-837e-675c27178439"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("26fc3ada-4b94-4b84-b89d-6f9779272a44"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("27c41e01-b4f2-4272-9695-3e1e0dfe69fa"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3243071a-ff3c-414e-a1d3-a833f8198172"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("32e9e558-7fdd-410c-8e15-9f5e6a21a890"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("34a83878-4534-45c3-9868-94cb15e29972"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3a3b3e69-173f-4ec9-abf0-47a8d5d287ea"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("44cc95fa-670b-47af-8cb9-63a97b784887"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("48b68c20-ab94-43fe-a974-c09e06dcda5c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4adc2e34-285e-488d-973a-4deb96d4b8a3"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("51d52918-e305-4785-94e7-1400576b866a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("77bcbdcc-778e-4116-90ca-2c89f29b9fcf"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7ac3710c-7d6d-48c1-ae78-6fe5113680cb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8d323392-a1f9-4950-a278-7addb9128b53"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9bb7edea-9762-43e0-b1de-1402ce1bce49"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9c848612-9b09-4f60-8be9-5d3fdcb71313"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a5e69395-0ed0-4aa1-a783-ddee7659f4f6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("aed7b026-2bc8-4a14-b235-c462cdeda41e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b5e1db2c-2199-41d4-90f9-49700b64ec81"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b6bc7c5e-635c-4339-ad84-ed937b577f4a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b6d783ba-7c1c-4826-ae4e-150d801566e8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("cb2c0b36-fb82-43b7-ad57-133df8657474"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("cc5ada2a-54de-495b-a81c-53e2f6f305cd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d2d8a24c-2049-4ea8-b6c2-1108a8423617"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d6616daf-4443-4511-9254-da54850f4634"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e16a8631-96e4-4376-a2f5-e06f8cda2a4f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fb31ce6b-2b7f-4117-abe5-d31e75be15fb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fd26f176-10ac-4177-b7ef-9f44a1648aa2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4daaff93-31ce-4237-86c6-f2b118901181"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("610daf90-ff0b-446d-9de6-dea2328bc204"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("997abec4-ef5e-4251-8942-ebc62b632f85"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ef586437-9061-4183-a074-6457757cf700"));

            migrationBuilder.DropColumn(
                name: "GigId1",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "UserTaskId1",
                table: "Media");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "TwoFactorVerifications",
                newName: "CodeHash");

            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Wallets",
                type: "bytea",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Purpose",
                table: "TwoFactorVerifications",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FailedAttempts",
                table: "TwoFactorVerifications",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<Guid>(
                name: "WalletId",
                table: "Transactions",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.Sql(@"ALTER TABLE ""Revisions"" ALTER COLUMN ""OrderId"" TYPE uuid USING NULL::uuid;");

            migrationBuilder.Sql(@"ALTER TABLE ""Revisions"" ALTER COLUMN ""Id"" DROP IDENTITY IF EXISTS;");
            migrationBuilder.Sql(@"ALTER TABLE ""Revisions"" ALTER COLUMN ""Id"" TYPE uuid USING NULL::uuid;");

            migrationBuilder.CreateTable(
                name: "PasswordResetTokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    TokenHash = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsUsed = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UsedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PasswordResetTokens", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("a3000000-0000-0000-0000-000000000001"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6330), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("a3000000-0000-0000-0000-000000000002"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6340), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("a3000000-0000-0000-0000-000000000003"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6350), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("a3000000-0000-0000-0000-000000000004"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6350), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("a3000000-0000-0000-0000-000000000005"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6340), null, null, "trending_up", "Digital Marketing", "التسويق الرقمي", null },
                    { new Guid("a3000000-0000-0000-0000-000000000006"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6350), null, null, "business", "Business Services", "الخدمات التجارية", null },
                    { new Guid("a3000000-0000-0000-0000-000000000007"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6350), null, null, "music_note", "Music & Audio", "الموسيقى والصوتيات", null },
                    { new Guid("a3000000-0000-0000-0000-000000000008"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6360), null, null, "self_improvement", "Lifestyle & Coaching", "نمط الحياة والتدريب", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("a1000000-0000-0000-0000-000000000001"), "en", "English" },
                    { new Guid("a1000000-0000-0000-0000-000000000002"), "ar", "Arabic" },
                    { new Guid("a1000000-0000-0000-0000-000000000003"), "es", "Spanish" },
                    { new Guid("a1000000-0000-0000-0000-000000000004"), "fr", "French" },
                    { new Guid("a1000000-0000-0000-0000-000000000005"), "de", "German" },
                    { new Guid("a1000000-0000-0000-0000-000000000006"), "zh", "Chinese" },
                    { new Guid("a1000000-0000-0000-0000-000000000007"), "ja", "Japanese" },
                    { new Guid("a1000000-0000-0000-0000-000000000008"), "pt", "Portuguese" },
                    { new Guid("a1000000-0000-0000-0000-000000000009"), "ru", "Russian" },
                    { new Guid("a1000000-0000-0000-0000-000000000010"), "hi", "Hindi" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("a2000000-0000-0000-0000-000000000001"), "Programming", "React" },
                    { new Guid("a2000000-0000-0000-0000-000000000002"), "Programming", "Node.js" },
                    { new Guid("a2000000-0000-0000-0000-000000000003"), "Programming", "Python" },
                    { new Guid("a2000000-0000-0000-0000-000000000004"), "Programming", "JavaScript" },
                    { new Guid("a2000000-0000-0000-0000-000000000005"), "Programming", "TypeScript" },
                    { new Guid("a2000000-0000-0000-0000-000000000006"), "Programming", "C#" },
                    { new Guid("a2000000-0000-0000-0000-000000000007"), "Programming", "Java" },
                    { new Guid("a2000000-0000-0000-0000-000000000008"), "Programming", "Flutter" },
                    { new Guid("a2000000-0000-0000-0000-000000000009"), "Programming", "Swift" },
                    { new Guid("a2000000-0000-0000-0000-000000000010"), "Programming", "Kotlin" },
                    { new Guid("a2000000-0000-0000-0000-000000000011"), "Design", "UI/UX Design" },
                    { new Guid("a2000000-0000-0000-0000-000000000012"), "Design", "Figma" },
                    { new Guid("a2000000-0000-0000-0000-000000000013"), "Design", "Adobe Photoshop" },
                    { new Guid("a2000000-0000-0000-0000-000000000014"), "Design", "Adobe Illustrator" },
                    { new Guid("a2000000-0000-0000-0000-000000000015"), "Design", "Graphic Design" },
                    { new Guid("a2000000-0000-0000-0000-000000000016"), "Design", "Logo Design" },
                    { new Guid("a2000000-0000-0000-0000-000000000017"), "Design", "3D Modeling" },
                    { new Guid("a2000000-0000-0000-0000-000000000018"), "Marketing", "SEO" },
                    { new Guid("a2000000-0000-0000-0000-000000000019"), "Marketing", "Social Media Marketing" },
                    { new Guid("a2000000-0000-0000-0000-000000000020"), "Marketing", "Content Writing" },
                    { new Guid("a2000000-0000-0000-0000-000000000021"), "Marketing", "Email Marketing" },
                    { new Guid("a2000000-0000-0000-0000-000000000022"), "Marketing", "Digital Marketing" },
                    { new Guid("a2000000-0000-0000-0000-000000000023"), "Video & Animation", "Video Editing" },
                    { new Guid("a2000000-0000-0000-0000-000000000024"), "Video & Animation", "After Effects" },
                    { new Guid("a2000000-0000-0000-0000-000000000025"), "Video & Animation", "Animation" },
                    { new Guid("a2000000-0000-0000-0000-000000000026"), "Writing", "Copywriting" },
                    { new Guid("a2000000-0000-0000-0000-000000000027"), "Writing", "Technical Writing" },
                    { new Guid("a2000000-0000-0000-0000-000000000028"), "Writing", "Translation" },
                    { new Guid("a2000000-0000-0000-0000-000000000029"), "Business", "Data Analysis" },
                    { new Guid("a2000000-0000-0000-0000-000000000030"), "Business", "Business Consulting" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("a4000000-0000-0000-0000-000000000001"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6360), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("a3000000-0000-0000-0000-000000000001") },
                    { new Guid("a4000000-0000-0000-0000-000000000002"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6360), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("a3000000-0000-0000-0000-000000000001") },
                    { new Guid("a4000000-0000-0000-0000-000000000003"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6370), null, null, null, "Business Cards & Stationery", "بطاقات العمل والقرطاسية", new Guid("a3000000-0000-0000-0000-000000000001") },
                    { new Guid("a4000000-0000-0000-0000-000000000004"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6370), null, null, null, "Social Media Design", "تصميم وسائل التواصل الاجتماعي", new Guid("a3000000-0000-0000-0000-000000000001") },
                    { new Guid("a4000000-0000-0000-0000-000000000005"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6370), null, null, null, "Packaging Design", "تصميم التغليف", new Guid("a3000000-0000-0000-0000-000000000001") },
                    { new Guid("a4000000-0000-0000-0000-000000000006"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6370), null, null, null, "Illustration", "الرسم التوضيحي", new Guid("a3000000-0000-0000-0000-000000000001") },
                    { new Guid("a4000000-0000-0000-0000-000000000007"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6380), null, null, null, "Book Cover Design", "تصميم أغلفة الكتب", new Guid("a3000000-0000-0000-0000-000000000001") },
                    { new Guid("a4000000-0000-0000-0000-000000000008"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6380), null, null, null, "UI/UX Design", "تصميم واجهة وتجربة المستخدم", new Guid("a3000000-0000-0000-0000-000000000001") },
                    { new Guid("a4000000-0000-0000-0000-000000000009"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6380), null, null, null, "3D Modeling", "النمذجة ثلاثية الأبعاد", new Guid("a3000000-0000-0000-0000-000000000001") },
                    { new Guid("a4000000-0000-0000-0000-000000000010"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6390), null, null, null, "Web Development", "تطوير المواقع", new Guid("a3000000-0000-0000-0000-000000000002") },
                    { new Guid("a4000000-0000-0000-0000-000000000011"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6390), null, null, null, "Mobile App Development", "تطوير تطبيقات الجوال", new Guid("a3000000-0000-0000-0000-000000000002") },
                    { new Guid("a4000000-0000-0000-0000-000000000012"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6390), null, null, null, "E-commerce Development", "تطوير التجارة الإلكترونية", new Guid("a3000000-0000-0000-0000-000000000002") },
                    { new Guid("a4000000-0000-0000-0000-000000000013"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6390), null, null, null, "API Development", "تطوير واجهات برمجة التطبيقات", new Guid("a3000000-0000-0000-0000-000000000002") },
                    { new Guid("a4000000-0000-0000-0000-000000000014"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6400), null, null, null, "AI & Machine Learning", "الذكاء الاصطناعي والتعلم الآلي", new Guid("a3000000-0000-0000-0000-000000000002") },
                    { new Guid("a4000000-0000-0000-0000-000000000015"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6400), null, null, null, "Automation & Bots", "الأتمتة والروبوتات", new Guid("a3000000-0000-0000-0000-000000000002") },
                    { new Guid("a4000000-0000-0000-0000-000000000016"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6400), null, null, null, "DevOps & Cloud", "ديف أوبس والحوسبة السحابية", new Guid("a3000000-0000-0000-0000-000000000002") },
                    { new Guid("a4000000-0000-0000-0000-000000000017"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6410), null, null, null, "Cybersecurity", "الأمن السيبراني", new Guid("a3000000-0000-0000-0000-000000000002") },
                    { new Guid("a4000000-0000-0000-0000-000000000018"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6410), null, null, null, "Social Media Marketing", "التسويق عبر وسائل التواصل الاجتماعي", new Guid("a3000000-0000-0000-0000-000000000005") },
                    { new Guid("a4000000-0000-0000-0000-000000000019"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6410), null, null, null, "SEO", "تحسين محركات البحث", new Guid("a3000000-0000-0000-0000-000000000005") },
                    { new Guid("a4000000-0000-0000-0000-000000000020"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6410), null, null, null, "Paid Ads (Google/Facebook/TikTok)", "الإعلانات المدفوعة", new Guid("a3000000-0000-0000-0000-000000000005") },
                    { new Guid("a4000000-0000-0000-0000-000000000021"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6420), null, null, null, "Email Marketing", "التسويق عبر البريد الإلكتروني", new Guid("a3000000-0000-0000-0000-000000000005") },
                    { new Guid("a4000000-0000-0000-0000-000000000022"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6420), null, null, null, "Content Marketing", "تسويق المحتوى", new Guid("a3000000-0000-0000-0000-000000000005") },
                    { new Guid("a4000000-0000-0000-0000-000000000023"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6420), null, null, null, "Marketing Strategy", "استراتيجية التسويق", new Guid("a3000000-0000-0000-0000-000000000005") },
                    { new Guid("a4000000-0000-0000-0000-000000000024"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6430), null, null, null, "Influencer Marketing", "التسويق عبر المؤثرين", new Guid("a3000000-0000-0000-0000-000000000005") },
                    { new Guid("a4000000-0000-0000-0000-000000000025"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6430), null, null, null, "Blog Writing", "كتابة المدونات", new Guid("a3000000-0000-0000-0000-000000000003") },
                    { new Guid("a4000000-0000-0000-0000-000000000026"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6430), null, null, null, "Copywriting", "كتابة المحتوى الإعلاني", new Guid("a3000000-0000-0000-0000-000000000003") },
                    { new Guid("a4000000-0000-0000-0000-000000000027"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6440), null, null, null, "Technical Writing", "الكتابة التقنية", new Guid("a3000000-0000-0000-0000-000000000003") },
                    { new Guid("a4000000-0000-0000-0000-000000000028"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6440), null, null, null, "Resume Writing", "كتابة السيرة الذاتية", new Guid("a3000000-0000-0000-0000-000000000003") },
                    { new Guid("a4000000-0000-0000-0000-000000000029"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6440), null, null, null, "Translation", "الترجمة", new Guid("a3000000-0000-0000-0000-000000000003") },
                    { new Guid("a4000000-0000-0000-0000-000000000030"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6440), null, null, null, "Proofreading", "التدقيق اللغوي", new Guid("a3000000-0000-0000-0000-000000000003") },
                    { new Guid("a4000000-0000-0000-0000-000000000031"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6450), null, null, null, "Academic Writing", "الكتابة الأكاديمية", new Guid("a3000000-0000-0000-0000-000000000003") },
                    { new Guid("a4000000-0000-0000-0000-000000000032"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6450), null, null, null, "Video Editing", "تحرير الفيديو", new Guid("a3000000-0000-0000-0000-000000000004") },
                    { new Guid("a4000000-0000-0000-0000-000000000033"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6450), null, null, null, "Motion Graphics", "الرسوم المتحركة", new Guid("a3000000-0000-0000-0000-000000000004") },
                    { new Guid("a4000000-0000-0000-0000-000000000034"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6460), null, null, null, "Explainer Videos", "فيديوهات توضيحية", new Guid("a3000000-0000-0000-0000-000000000004") },
                    { new Guid("a4000000-0000-0000-0000-000000000035"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6460), null, null, null, "2D Animation", "الرسوم المتحركة ثنائية الأبعاد", new Guid("a3000000-0000-0000-0000-000000000004") },
                    { new Guid("a4000000-0000-0000-0000-000000000036"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6460), null, null, null, "3D Animation", "الرسوم المتحركة ثلاثية الأبعاد", new Guid("a3000000-0000-0000-0000-000000000004") },
                    { new Guid("a4000000-0000-0000-0000-000000000037"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6470), null, null, null, "YouTube Editing", "تحرير فيديوهات يوتيوب", new Guid("a3000000-0000-0000-0000-000000000004") },
                    { new Guid("a4000000-0000-0000-0000-000000000038"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6480), null, null, null, "Business Plans", "خطط الأعمال", new Guid("a3000000-0000-0000-0000-000000000006") },
                    { new Guid("a4000000-0000-0000-0000-000000000039"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6480), null, null, null, "Market Research", "أبحاث السوق", new Guid("a3000000-0000-0000-0000-000000000006") },
                    { new Guid("a4000000-0000-0000-0000-000000000040"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6490), null, null, null, "Virtual Assistant", "المساعد الافتراضي", new Guid("a3000000-0000-0000-0000-000000000006") },
                    { new Guid("a4000000-0000-0000-0000-000000000041"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6490), null, null, null, "Data Entry", "إدخال البيانات", new Guid("a3000000-0000-0000-0000-000000000006") },
                    { new Guid("a4000000-0000-0000-0000-000000000042"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6490), null, null, null, "Financial Consulting", "الاستشارات المالية", new Guid("a3000000-0000-0000-0000-000000000006") },
                    { new Guid("a4000000-0000-0000-0000-000000000043"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6500), null, null, null, "Accounting", "المحاسبة", new Guid("a3000000-0000-0000-0000-000000000006") },
                    { new Guid("a4000000-0000-0000-0000-000000000044"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6500), null, null, null, "Voice Over", "التعليق الصوتي", new Guid("a3000000-0000-0000-0000-000000000007") },
                    { new Guid("a4000000-0000-0000-0000-000000000045"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6500), null, null, null, "Podcast Editing", "تحرير البودكاست", new Guid("a3000000-0000-0000-0000-000000000007") },
                    { new Guid("a4000000-0000-0000-0000-000000000046"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6500), null, null, null, "Audio Mixing", "مزج الصوت", new Guid("a3000000-0000-0000-0000-000000000007") },
                    { new Guid("a4000000-0000-0000-0000-000000000047"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6510), null, null, null, "Music Production", "إنتاج الموسيقى", new Guid("a3000000-0000-0000-0000-000000000007") },
                    { new Guid("a4000000-0000-0000-0000-000000000048"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6510), null, null, null, "Fitness Coaching", "التدريب على اللياقة البدنية", new Guid("a3000000-0000-0000-0000-000000000008") },
                    { new Guid("a4000000-0000-0000-0000-000000000049"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6510), null, null, null, "Life Coaching", "تدريب الحياة", new Guid("a3000000-0000-0000-0000-000000000008") },
                    { new Guid("a4000000-0000-0000-0000-000000000050"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6520), null, null, null, "Career Coaching", "التدريب المهني", new Guid("a3000000-0000-0000-0000-000000000008") },
                    { new Guid("a4000000-0000-0000-0000-000000000051"), new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6520), null, null, null, "Online Tutoring", "التدريس عبر الإنترنت", new Guid("a3000000-0000-0000-0000-000000000008") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_TwoFactorVerifications_UserId_Purpose",
                table: "TwoFactorVerifications",
                columns: new[] { "UserId", "Purpose", "IsUsed" });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ConversationId_CreatedAt",
                table: "Messages",
                columns: new[] { "ConversationId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_UpdatedAt",
                table: "Conversations",
                column: "UpdatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_User1Id_User2Id",
                table: "Conversations",
                columns: new[] { "User1Id", "User2Id" });

            migrationBuilder.CreateIndex(
                name: "IX_PasswordResetTokens_TokenHash",
                table: "PasswordResetTokens",
                column: "TokenHash");

            migrationBuilder.CreateIndex(
                name: "IX_PasswordResetTokens_UserId",
                table: "PasswordResetTokens",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PasswordResetTokens");

            migrationBuilder.DropIndex(
                name: "IX_TwoFactorVerifications_UserId_Purpose",
                table: "TwoFactorVerifications");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ConversationId_CreatedAt",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_UpdatedAt",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_User1Id_User2Id",
                table: "Conversations");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000006"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000007"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000008"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000009"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000010"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000011"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000012"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000013"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000014"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000015"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000016"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000017"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000018"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000019"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000020"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000021"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000022"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000023"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000024"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000025"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000026"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000027"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000028"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000029"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000030"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000031"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000032"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000033"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000034"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000035"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000036"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000037"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000038"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000039"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000040"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000041"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000042"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000043"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000044"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000045"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000046"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000047"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000048"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000049"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000050"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000051"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000006"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000007"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000008"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000009"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000010"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000006"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000007"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000008"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000009"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000010"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000011"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000012"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000013"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000014"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000015"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000016"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000017"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000018"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000019"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000020"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000021"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000022"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000023"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000024"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000025"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000026"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000027"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000028"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000029"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000030"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000006"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000007"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000008"));

            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Wallets");

            migrationBuilder.DropColumn(
                name: "FailedAttempts",
                table: "TwoFactorVerifications");

            migrationBuilder.RenameColumn(
                name: "CodeHash",
                table: "TwoFactorVerifications",
                newName: "Code");

            migrationBuilder.AlterColumn<string>(
                name: "Purpose",
                table: "TwoFactorVerifications",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<Guid>(
                name: "WalletId",
                table: "Transactions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "Revisions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Revisions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<Guid>(
                name: "GigId1",
                table: "Media",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserTaskId1",
                table: "Media",
                type: "uuid",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5510), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("4daaff93-31ce-4237-86c6-f2b118901181"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5500), null, null, "trending_up", "Digital Marketing", "التسويق الرقمي", null },
                    { new Guid("610daf90-ff0b-446d-9de6-dea2328bc204"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5500), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("997abec4-ef5e-4251-8942-ebc62b632f85"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5500), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5510), null, null, "music_note", "Music & Audio", "الموسيقى والصوتيات", null },
                    { new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5510), null, null, "business", "Business Services", "الخدمات التجارية", null },
                    { new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5510), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("ef586437-9061-4183-a074-6457757cf700"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5520), null, null, "self_improvement", "Lifestyle & Coaching", "نمط الحياة والتدريب", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5160));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("239fd628-0f15-4f52-9ee0-bca991b21fcc"), "pt", "Portuguese" },
                    { new Guid("28f652c7-6da6-4b26-9275-dcbe1cafd0bb"), "en", "English" },
                    { new Guid("2c9ac24e-acf3-4576-9bf9-2adf4b80f475"), "ja", "Japanese" },
                    { new Guid("54a7e467-2a97-46a8-96de-2beac36951c1"), "de", "German" },
                    { new Guid("88db11f8-d752-45f5-911e-8c64a833f034"), "ar", "Arabic" },
                    { new Guid("9b48f3a1-c4a1-4f02-9bd0-d3a2d482b73b"), "ru", "Russian" },
                    { new Guid("9ee9dd42-2613-4808-86df-1fec52e723d5"), "es", "Spanish" },
                    { new Guid("cec23111-c562-4dd4-a231-8c4df0efaaf6"), "zh", "Chinese" },
                    { new Guid("f4100e4c-bfb9-4201-83e5-ac1ee857a832"), "hi", "Hindi" },
                    { new Guid("f46cf590-9b58-4ecd-bf49-b34b38fecce5"), "fr", "French" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("18f44bc1-7352-4183-b6d5-af2cb12324d6"), "Marketing", "Email Marketing" },
                    { new Guid("1c4aa6d4-359b-4225-bc5a-d3e452844232"), "Programming", "Swift" },
                    { new Guid("1e1088bf-fea6-4bfb-837e-675c27178439"), "Design", "Adobe Illustrator" },
                    { new Guid("26fc3ada-4b94-4b84-b89d-6f9779272a44"), "Programming", "TypeScript" },
                    { new Guid("27c41e01-b4f2-4272-9695-3e1e0dfe69fa"), "Design", "Adobe Photoshop" },
                    { new Guid("3243071a-ff3c-414e-a1d3-a833f8198172"), "Design", "Figma" },
                    { new Guid("32e9e558-7fdd-410c-8e15-9f5e6a21a890"), "Marketing", "Social Media Marketing" },
                    { new Guid("34a83878-4534-45c3-9868-94cb15e29972"), "Writing", "Copywriting" },
                    { new Guid("3a3b3e69-173f-4ec9-abf0-47a8d5d287ea"), "Video & Animation", "After Effects" },
                    { new Guid("44cc95fa-670b-47af-8cb9-63a97b784887"), "Marketing", "Content Writing" },
                    { new Guid("48b68c20-ab94-43fe-a974-c09e06dcda5c"), "Business", "Data Analysis" },
                    { new Guid("4adc2e34-285e-488d-973a-4deb96d4b8a3"), "Video & Animation", "Animation" },
                    { new Guid("51d52918-e305-4785-94e7-1400576b866a"), "Marketing", "Digital Marketing" },
                    { new Guid("77bcbdcc-778e-4116-90ca-2c89f29b9fcf"), "Programming", "Kotlin" },
                    { new Guid("7ac3710c-7d6d-48c1-ae78-6fe5113680cb"), "Programming", "Node.js" },
                    { new Guid("8d323392-a1f9-4950-a278-7addb9128b53"), "Programming", "JavaScript" },
                    { new Guid("9bb7edea-9762-43e0-b1de-1402ce1bce49"), "Design", "Logo Design" },
                    { new Guid("9c848612-9b09-4f60-8be9-5d3fdcb71313"), "Video & Animation", "Video Editing" },
                    { new Guid("a5e69395-0ed0-4aa1-a783-ddee7659f4f6"), "Programming", "React" },
                    { new Guid("aed7b026-2bc8-4a14-b235-c462cdeda41e"), "Programming", "Python" },
                    { new Guid("b5e1db2c-2199-41d4-90f9-49700b64ec81"), "Design", "3D Modeling" },
                    { new Guid("b6bc7c5e-635c-4339-ad84-ed937b577f4a"), "Marketing", "SEO" },
                    { new Guid("b6d783ba-7c1c-4826-ae4e-150d801566e8"), "Writing", "Translation" },
                    { new Guid("cb2c0b36-fb82-43b7-ad57-133df8657474"), "Programming", "Java" },
                    { new Guid("cc5ada2a-54de-495b-a81c-53e2f6f305cd"), "Design", "UI/UX Design" },
                    { new Guid("d2d8a24c-2049-4ea8-b6c2-1108a8423617"), "Business", "Business Consulting" },
                    { new Guid("d6616daf-4443-4511-9254-da54850f4634"), "Writing", "Technical Writing" },
                    { new Guid("e16a8631-96e4-4376-a2f5-e06f8cda2a4f"), "Programming", "C#" },
                    { new Guid("fb31ce6b-2b7f-4117-abe5-d31e75be15fb"), "Programming", "Flutter" },
                    { new Guid("fd26f176-10ac-4177-b7ef-9f44a1648aa2"), "Design", "Graphic Design" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("072cbd88-c7cb-4ab0-824a-6162d988779a"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5680), null, null, null, "Video Editing", "تحرير الفيديو", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") },
                    { new Guid("0acce8d0-ffd9-456f-a8dd-c89618256f55"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5750), null, null, null, "Podcast Editing", "تحرير البودكاست", new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2") },
                    { new Guid("0cf5376e-5d7b-43b0-8009-c4a6398c92c6"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5570), null, null, null, "3D Modeling", "النمذجة ثلاثية الأبعاد", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("0e2db012-9999-4ae0-aac0-84ec156771d1"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5730), null, null, null, "Virtual Assistant", "المساعد الافتراضي", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("1042a430-cb14-403b-849c-cc6247ebfd9c"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5710), null, null, null, "YouTube Editing", "تحرير فيديوهات يوتيوب", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") },
                    { new Guid("14118e05-9609-4e95-8978-fb143f2a83ff"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5670), null, null, null, "Proofreading", "التدقيق اللغوي", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("27fc2a17-a81f-448f-9d47-b9fa74e2d69e"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5780), null, null, null, "Career Coaching", "التدريب المهني", new Guid("ef586437-9061-4183-a074-6457757cf700") },
                    { new Guid("2965ef40-053f-489c-aee3-a9ac3018539b"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5570), null, null, null, "UI/UX Design", "تصميم واجهة وتجربة المستخدم", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("2f628461-b7d3-4967-927c-3d45257583a6"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5620), null, null, null, "SEO", "تحسين محركات البحث", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("3055d3a8-418d-47c5-ab0b-368a7fd5d8b5"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5730), null, null, null, "Financial Consulting", "الاستشارات المالية", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("42e8ade3-9bb9-4c14-8631-4a4d7a131e39"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5760), null, null, null, "Audio Mixing", "مزج الصوت", new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2") },
                    { new Guid("450655da-ad34-4f2a-9667-4742255e6e9e"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5660), null, null, null, "Technical Writing", "الكتابة التقنية", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("495fc4a6-78ac-4c4b-9212-57081e466857"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5520), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("4a191d2e-0523-4a71-88ca-063254bb58e7"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5730), null, null, null, "Data Entry", "إدخال البيانات", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("56e13769-7481-4c92-ab5a-5a2f1ac54a39"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5620), null, null, null, "Social Media Marketing", "التسويق عبر وسائل التواصل الاجتماعي", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("5b76c789-4431-4a1c-85ec-030427319051"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5560), null, null, null, "Book Cover Design", "تصميم أغلفة الكتب", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("5de2095b-6bce-44f4-82a4-0f54e4a94dc7"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5740), null, null, null, "Voice Over", "التعليق الصوتي", new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2") },
                    { new Guid("5f8a5e30-cfa1-48fb-9639-cf9406394ba6"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5580), null, null, null, "Web Development", "تطوير المواقع", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("648285bb-f19a-4213-9f75-9eec464bf549"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5630), null, null, null, "Email Marketing", "التسويق عبر البريد الإلكتروني", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("6aeb1939-bb41-46cf-b871-207253855276"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5650), null, null, null, "Copywriting", "كتابة المحتوى الإعلاني", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("7b19e965-220e-4801-8049-b190467f6edb"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5770), null, null, null, "Life Coaching", "تدريب الحياة", new Guid("ef586437-9061-4183-a074-6457757cf700") },
                    { new Guid("7c4a7a8c-7489-4818-9b28-739dbb2a488d"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5780), null, null, null, "Online Tutoring", "التدريس عبر الإنترنت", new Guid("ef586437-9061-4183-a074-6457757cf700") },
                    { new Guid("7ea55299-95cc-4e3a-a6b4-c8f9ddb904cc"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5630), null, null, null, "Content Marketing", "تسويق المحتوى", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("8941e532-cf6a-4ec5-b98b-e36985d68e9d"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5640), null, null, null, "Influencer Marketing", "التسويق عبر المؤثرين", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("8bacd4a3-1f3b-471b-acff-43785254ba14"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5560), null, null, null, "Illustration", "الرسم التوضيحي", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("99aa230b-2037-4c1e-b6c0-6e8dca45a68a"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5600), null, null, null, "Automation & Bots", "الأتمتة والروبوتات", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("9bad3bf9-e3fb-4f82-abe9-28e4c1204b24"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5770), null, null, null, "Fitness Coaching", "التدريب على اللياقة البدنية", new Guid("ef586437-9061-4183-a074-6457757cf700") },
                    { new Guid("a75cb7a0-8c07-4679-ae97-2e42d624df8e"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5690), null, null, null, "Explainer Videos", "فيديوهات توضيحية", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") },
                    { new Guid("a8720fcc-e136-4727-b905-2db94cb027ce"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5610), null, null, null, "DevOps & Cloud", "ديف أوبس والحوسبة السحابية", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("a9fbde2d-e5b2-4db2-92a1-1a702bf9af9b"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5690), null, null, null, "Motion Graphics", "الرسوم المتحركة", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") },
                    { new Guid("ab6a5438-6bd8-4278-8559-b55ad8b1e636"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5590), null, null, null, "E-commerce Development", "تطوير التجارة الإلكترونية", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("abc5cc6b-03b0-485d-adf8-af677bca905f"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5640), null, null, null, "Marketing Strategy", "استراتيجية التسويق", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("ace342bb-ed82-426b-8f8f-9f63eb9c5444"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5660), null, null, null, "Resume Writing", "كتابة السيرة الذاتية", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("b255f7f7-6ea8-4db9-94ed-5a8e75fee203"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5760), null, null, null, "Music Production", "إنتاج الموسيقى", new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2") },
                    { new Guid("b31a626b-d3c4-4dee-aed4-562ef00bddf9"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5720), null, null, null, "Business Plans", "خطط الأعمال", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("bb17e712-80ea-437a-a17a-2e4e81ea2a22"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5680), null, null, null, "Academic Writing", "الكتابة الأكاديمية", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("c0d378d5-57c4-4852-90d2-6268dbac84ba"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5550), null, null, null, "Packaging Design", "تصميم التغليف", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("c167b700-7630-41c8-8b45-20227d4d4e80"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5590), null, null, null, "API Development", "تطوير واجهات برمجة التطبيقات", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("c396eda9-dec2-465f-b3b6-0c89a3f612d9"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5550), null, null, null, "Social Media Design", "تصميم وسائل التواصل الاجتماعي", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("c5743cde-7e66-43c8-9e0e-9b47db29a1a9"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5720), null, null, null, "Market Research", "أبحاث السوق", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("c8e1a18b-bce7-47d2-8511-8519f98edd6f"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5580), null, null, null, "Mobile App Development", "تطوير تطبيقات الجوال", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("c915a8fd-5468-4b84-9aef-e323411f4e81"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5530), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("d66ec561-ae9f-4d7f-ab79-4cfb35173020"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5650), null, null, null, "Blog Writing", "كتابة المدونات", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("d7c753c6-d8fc-42e8-9c44-862d9b688bd6"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5610), null, null, null, "Cybersecurity", "الأمن السيبراني", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("dc675f84-1b88-4eef-ab81-4685fe81c500"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5540), null, null, null, "Business Cards & Stationery", "بطاقات العمل والقرطاسية", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("dea829c2-84a1-4338-9d69-727ecf1f2e86"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5600), null, null, null, "AI & Machine Learning", "الذكاء الاصطناعي والتعلم الآلي", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("df00a879-d38d-4850-a21a-c3be720bd3d3"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5740), null, null, null, "Accounting", "المحاسبة", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("e84bf9cc-88b6-4a23-9e15-020ec905a19d"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5700), null, null, null, "3D Animation", "الرسوم المتحركة ثلاثية الأبعاد", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") },
                    { new Guid("ed0619de-4ddb-47c9-b81f-8cf47256a0a5"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5670), null, null, null, "Translation", "الترجمة", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("ed27a3c0-ad0d-4b6f-9ed1-f73c19fb42cf"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5630), null, null, null, "Paid Ads (Google/Facebook/TikTok)", "الإعلانات المدفوعة", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("f4629e2b-3eff-4373-9206-541fbbe85557"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5700), null, null, null, "2D Animation", "الرسوم المتحركة ثنائية الأبعاد", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Media_GigId1",
                table: "Media",
                column: "GigId1");

            migrationBuilder.CreateIndex(
                name: "IX_Media_UserTaskId1",
                table: "Media",
                column: "UserTaskId1");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_User1Id",
                table: "Conversations",
                column: "User1Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Gigs_GigId1",
                table: "Media",
                column: "GigId1",
                principalTable: "Gigs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Media_UserTasks_UserTaskId1",
                table: "Media",
                column: "UserTaskId1",
                principalTable: "UserTasks",
                principalColumn: "Id");
        }
    }
}
