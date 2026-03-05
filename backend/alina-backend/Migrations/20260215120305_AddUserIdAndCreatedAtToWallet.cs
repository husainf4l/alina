using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdAndCreatedAtToWallet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0ee945ae-2f7c-4e8c-a47d-5b986c616d78"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("146f9d1f-65ef-449f-aa5e-92c66f38302e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("27022bf3-2d4c-4f50-b81c-a62c953768d1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3aafb5aa-6483-4cfd-9436-59ecb17ddedd"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4057a7b2-8eb0-40e6-8320-28553f409fb1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("47f0f8bc-f2eb-477a-ad69-64f551c4d087"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4f310557-8899-4b42-bf14-0df40934b089"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("522089da-eea0-4639-be32-92cd80e005fe"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("889f1df2-c709-42ab-b608-dcf0820fe41b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a24056c7-9e88-462a-b3e3-1bbaf1369c11"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("cc1ae1c5-b5a2-4e92-83e7-41f6b7a74707"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("fbc50c61-35f6-4dfc-8824-01f1a81a4519"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("1c928af9-7848-4957-8405-74a5f675903b"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("58bf834b-056a-4e7f-a4aa-1ae373798bc2"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("7fbdddcc-98b2-43d5-bdf1-2841efea6095"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a15ab431-3853-4e86-b420-833720357fb5"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("b4312fee-69c2-4413-b657-ec59e8b7282b"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("c6d04f21-299e-4bc4-986d-fe683f216d63"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("e1484c80-c70d-4ee4-8982-529c93a2eedc"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("f99bfefe-ceb3-401e-9c64-139dd45066d6"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("fe7abead-ffe4-4549-94e7-6259cf2977f1"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("ffb60958-1e70-4067-97ec-d28d38c223ea"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("0c07389e-948f-4b53-9d5d-3f613ffbaadc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1c54b074-3b56-410e-a035-f4b0137e8566"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1e0e57f4-2388-4244-a81f-2619d56c0ba3"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("23d7bad2-68b7-492f-a15a-6ed7116dd31a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2864520f-5aa5-4366-a639-f7b2b9d0be69"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3875df9c-b86d-4c86-95cb-b61b93610fdc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4bd38ef8-1cf7-4831-a6fd-b4032f98e532"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4f3a6947-bbd8-449f-b75e-b1515d34f58a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("5f7109ab-e132-41ec-b9cf-95e6641905f2"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("63a22b4e-5a3c-44de-82f0-bb42c2be9dfe"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6824ed39-c64e-4aca-9648-70d597c7f896"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("71dff129-04c1-422f-81e3-b72d9f9593ef"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("75ee38b8-f27b-4fff-af58-1aecdb4229c1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7e161c66-87d4-4b46-96c0-e9d59862fdfe"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8f959c21-10c6-49b6-bd31-c2c28c2d3e93"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9e02fde1-4133-411e-bd8f-0b0dc85b086c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a35ef0d5-1839-4ece-b86a-c2f4bec71fbc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("ad312740-8d95-491c-a501-870417fbe2d9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b0dca3f0-6d38-433a-a6dc-4348bf0007f8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b7269af8-200d-4b9f-965d-5e6108adb5f8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("bfcc9633-cc45-438e-957b-2eb0649bcc02"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d4909820-9995-4d51-ac38-9b5f3c89a325"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("dee58ed9-e5a5-4a47-99e5-4282d1850bde"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e2e2146e-8409-47af-998a-4ef9b5cc0c8d"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e9f7c002-2e68-4642-98fd-d46469cae8ae"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("eb292055-1d72-4295-b672-889919f30b10"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("eba624a4-e7bc-4ee5-bc2a-126b5d536ab5"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("edcc0575-001d-4c61-b7b2-4f01f7c85f01"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f3fe76e4-a089-4e33-b34b-6e02e60bcd9b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fd4c8140-4c00-41b7-9281-4aab3a9e7242"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("6e93f25d-b82f-4fc7-b0c0-b23af2c411e1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("938178c6-6514-4da7-9877-9d374eb7b4ad"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("dbff7de0-7633-4997-a864-e004c7d923de"));

            migrationBuilder.AlterColumn<Guid>(
                name: "ProfileId",
                table: "Wallets",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Wallets",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Wallets",
                type: "uuid",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("15cd7934-59a8-41e6-b90c-a08905f96750"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(10), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("3d389326-3136-4124-9603-3e60b9cee518"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("3eded8ff-5181-4e98-8c57-8e708ba7d168"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("73b798b8-d3d1-4dab-882e-e9da86d3d3b5"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(10), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("7fc6bb9a-2aa8-4b90-a645-e2a2955e5c98"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(10), null, null, "home", "Home Services", "خدمات المنزل", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 12, 3, 5, 92, DateTimeKind.Utc).AddTicks(9370));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 12, 3, 5, 92, DateTimeKind.Utc).AddTicks(9380));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 12, 3, 5, 92, DateTimeKind.Utc).AddTicks(9370));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 12, 3, 5, 92, DateTimeKind.Utc).AddTicks(9380));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 12, 3, 5, 92, DateTimeKind.Utc).AddTicks(9380));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 12, 3, 5, 92, DateTimeKind.Utc).AddTicks(9370));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 12, 3, 5, 92, DateTimeKind.Utc).AddTicks(9370));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("09a29d95-fde5-45d6-8773-929ec35e8f20"), "de", "German" },
                    { new Guid("1736a0a6-bdb3-48dd-b067-14fe0f9ddf26"), "ru", "Russian" },
                    { new Guid("1a8a5079-0aba-41a9-8e28-36b8f72c9cc8"), "ja", "Japanese" },
                    { new Guid("3770601a-ac97-4662-a580-7fefce1c3700"), "zh", "Chinese" },
                    { new Guid("42bd78c7-7902-4025-bd0f-841996e04ce5"), "ar", "Arabic" },
                    { new Guid("82b0aa5b-ac3c-403f-bf4e-a7d7a30bde88"), "hi", "Hindi" },
                    { new Guid("871b533a-8783-4ef5-a21b-7e43f2330905"), "fr", "French" },
                    { new Guid("9beef803-29ab-46db-bbd3-2a834d047a56"), "es", "Spanish" },
                    { new Guid("a4ff96bb-54db-4cef-aa3a-ca9247f740e8"), "en", "English" },
                    { new Guid("f3add990-2b24-4829-a9dd-d8f644437bdd"), "pt", "Portuguese" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("08f7a1b1-6d9c-4dfd-b8fa-4478640cafc7"), "Programming", "Python" },
                    { new Guid("145d1dfd-a738-41d0-ae47-0a1b9e0d0b81"), "Programming", "C#" },
                    { new Guid("1870f32d-838f-483c-8471-1f9fd0beff82"), "Design", "Adobe Illustrator" },
                    { new Guid("19c1f32e-2dfc-400f-8d07-d3e67ac14222"), "Writing", "Translation" },
                    { new Guid("297c09c9-9de0-4971-b3bd-ca8cf82a168e"), "Programming", "Flutter" },
                    { new Guid("2ae390ed-738b-4080-b0da-7dfd2d386d88"), "Programming", "Node.js" },
                    { new Guid("3505827e-4216-4e14-b3e6-a68774ab67f6"), "Business", "Business Consulting" },
                    { new Guid("399e66b9-b166-477f-9e3f-fb0285636b07"), "Programming", "Swift" },
                    { new Guid("55c62ffa-2c45-403f-bab5-ad53b578741b"), "Marketing", "Email Marketing" },
                    { new Guid("60eb0921-6a9e-47d0-bcf9-84b322784a83"), "Design", "Graphic Design" },
                    { new Guid("6d5b827b-2f79-4daf-bca0-e064a829bea9"), "Design", "UI/UX Design" },
                    { new Guid("7bbfee3f-e853-4b20-9b0d-be0c968dbbde"), "Writing", "Copywriting" },
                    { new Guid("8297086b-2e67-4b1d-95ed-48bc0c68d6dc"), "Marketing", "Social Media Marketing" },
                    { new Guid("847e6c0e-2fee-4b07-8200-3f756e961e6c"), "Programming", "React" },
                    { new Guid("91b26704-7e62-47cb-8eca-4e40821058bf"), "Video & Animation", "Animation" },
                    { new Guid("9336a944-7f6d-42dd-9d0d-133d181b929a"), "Programming", "TypeScript" },
                    { new Guid("9506bcec-a605-4783-8846-24ff1d1d3381"), "Programming", "Java" },
                    { new Guid("bbd0fde9-ea1f-426e-9446-b5c42cea1fe8"), "Video & Animation", "After Effects" },
                    { new Guid("bfee105a-988d-4c9c-998d-f582838015fc"), "Business", "Data Analysis" },
                    { new Guid("c54bd846-a8ed-43a0-bf2c-cb776e9afb15"), "Design", "Adobe Photoshop" },
                    { new Guid("c9329ff5-3ef4-445d-a108-14bd0ea838be"), "Marketing", "Content Writing" },
                    { new Guid("cde8b508-8613-4658-b486-58c56fc525e8"), "Design", "3D Modeling" },
                    { new Guid("ce94b33c-8ffd-426b-b4fd-e70d82379e5c"), "Design", "Figma" },
                    { new Guid("d3132b5e-f703-43d5-86c9-51fcd4e4bd7e"), "Marketing", "SEO" },
                    { new Guid("d64e5734-7559-4f92-a81d-49e7cae910f3"), "Design", "Logo Design" },
                    { new Guid("eccd7971-56d4-4660-8685-340f2b3cf78a"), "Marketing", "Digital Marketing" },
                    { new Guid("eeb8ecba-17f6-4a55-8879-befe97110c09"), "Programming", "Kotlin" },
                    { new Guid("f1dbb88b-16fe-4d57-80e4-e90dee0cdd49"), "Programming", "JavaScript" },
                    { new Guid("f2e1fd06-937d-4510-b92d-d6e7edf6bedd"), "Video & Animation", "Video Editing" },
                    { new Guid("f4c29478-c6c2-41f0-a3c6-a715dda1379b"), "Writing", "Technical Writing" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("18678614-b29d-44c7-be73-bdaf764116b2"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(20), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("3eded8ff-5181-4e98-8c57-8e708ba7d168") },
                    { new Guid("1930a9cb-041c-4ff7-97e6-c5d06d0059e3"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(60), null, null, null, "Cleaning", "التنظيف", new Guid("7fc6bb9a-2aa8-4b90-a645-e2a2955e5c98") },
                    { new Guid("261ba990-2e9a-4a8c-8c57-933ac0d6bd5d"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(30), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("3eded8ff-5181-4e98-8c57-8e708ba7d168") },
                    { new Guid("413c95d6-abdb-4f3d-b975-6cdbab30fb73"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(70), null, null, null, "Handyman", "أعمال الصيانة", new Guid("7fc6bb9a-2aa8-4b90-a645-e2a2955e5c98") },
                    { new Guid("962b5459-16c4-4a52-8c86-e91ab327a993"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(20), null, null, null, "Web Design", "تصميم المواقع", new Guid("3eded8ff-5181-4e98-8c57-8e708ba7d168") },
                    { new Guid("a323738e-2c4b-49f1-8463-14e85d861d8a"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(40), null, null, null, "Web Development", "تطوير المواقع", new Guid("3d389326-3136-4124-9603-3e60b9cee518") },
                    { new Guid("cc03ebc2-dfa3-46f1-b0d7-98aef9344890"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(80), null, null, null, "Gardening", "تنسيق الحدائق", new Guid("7fc6bb9a-2aa8-4b90-a645-e2a2955e5c98") },
                    { new Guid("ccb9add0-d01f-4105-bfe9-c11b6f214181"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(40), null, null, null, "Mobile Apps", "تطبيقات الجوال", new Guid("3d389326-3136-4124-9603-3e60b9cee518") },
                    { new Guid("d8a9922b-f163-4909-af7e-5f3ce8c326d2"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(70), null, null, null, "Moving", "نقل الأثاث", new Guid("7fc6bb9a-2aa8-4b90-a645-e2a2955e5c98") },
                    { new Guid("eb37f8b6-a695-4079-9304-22374a83da76"), new DateTime(2026, 2, 15, 12, 3, 5, 93, DateTimeKind.Utc).AddTicks(50), null, null, null, "AI Services", "خدمات الذكاء الاصطناعي", new Guid("3d389326-3136-4124-9603-3e60b9cee518") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("15cd7934-59a8-41e6-b90c-a08905f96750"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("18678614-b29d-44c7-be73-bdaf764116b2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1930a9cb-041c-4ff7-97e6-c5d06d0059e3"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("261ba990-2e9a-4a8c-8c57-933ac0d6bd5d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("413c95d6-abdb-4f3d-b975-6cdbab30fb73"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("73b798b8-d3d1-4dab-882e-e9da86d3d3b5"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("962b5459-16c4-4a52-8c86-e91ab327a993"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a323738e-2c4b-49f1-8463-14e85d861d8a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("cc03ebc2-dfa3-46f1-b0d7-98aef9344890"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ccb9add0-d01f-4105-bfe9-c11b6f214181"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d8a9922b-f163-4909-af7e-5f3ce8c326d2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("eb37f8b6-a695-4079-9304-22374a83da76"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("09a29d95-fde5-45d6-8773-929ec35e8f20"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("1736a0a6-bdb3-48dd-b067-14fe0f9ddf26"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("1a8a5079-0aba-41a9-8e28-36b8f72c9cc8"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("3770601a-ac97-4662-a580-7fefce1c3700"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("42bd78c7-7902-4025-bd0f-841996e04ce5"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("82b0aa5b-ac3c-403f-bf4e-a7d7a30bde88"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("871b533a-8783-4ef5-a21b-7e43f2330905"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("9beef803-29ab-46db-bbd3-2a834d047a56"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a4ff96bb-54db-4cef-aa3a-ca9247f740e8"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("f3add990-2b24-4829-a9dd-d8f644437bdd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("08f7a1b1-6d9c-4dfd-b8fa-4478640cafc7"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("145d1dfd-a738-41d0-ae47-0a1b9e0d0b81"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1870f32d-838f-483c-8471-1f9fd0beff82"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("19c1f32e-2dfc-400f-8d07-d3e67ac14222"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("297c09c9-9de0-4971-b3bd-ca8cf82a168e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2ae390ed-738b-4080-b0da-7dfd2d386d88"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3505827e-4216-4e14-b3e6-a68774ab67f6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("399e66b9-b166-477f-9e3f-fb0285636b07"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("55c62ffa-2c45-403f-bab5-ad53b578741b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("60eb0921-6a9e-47d0-bcf9-84b322784a83"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6d5b827b-2f79-4daf-bca0-e064a829bea9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7bbfee3f-e853-4b20-9b0d-be0c968dbbde"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8297086b-2e67-4b1d-95ed-48bc0c68d6dc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("847e6c0e-2fee-4b07-8200-3f756e961e6c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("91b26704-7e62-47cb-8eca-4e40821058bf"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9336a944-7f6d-42dd-9d0d-133d181b929a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9506bcec-a605-4783-8846-24ff1d1d3381"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("bbd0fde9-ea1f-426e-9446-b5c42cea1fe8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("bfee105a-988d-4c9c-998d-f582838015fc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c54bd846-a8ed-43a0-bf2c-cb776e9afb15"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c9329ff5-3ef4-445d-a108-14bd0ea838be"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("cde8b508-8613-4658-b486-58c56fc525e8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("ce94b33c-8ffd-426b-b4fd-e70d82379e5c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d3132b5e-f703-43d5-86c9-51fcd4e4bd7e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d64e5734-7559-4f92-a81d-49e7cae910f3"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("eccd7971-56d4-4660-8685-340f2b3cf78a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("eeb8ecba-17f6-4a55-8879-befe97110c09"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f1dbb88b-16fe-4d57-80e4-e90dee0cdd49"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f2e1fd06-937d-4510-b92d-d6e7edf6bedd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f4c29478-c6c2-41f0-a3c6-a715dda1379b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3d389326-3136-4124-9603-3e60b9cee518"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3eded8ff-5181-4e98-8c57-8e708ba7d168"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7fc6bb9a-2aa8-4b90-a645-e2a2955e5c98"));

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Wallets");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Wallets");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProfileId",
                table: "Wallets",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("0ee945ae-2f7c-4e8c-a47d-5b986c616d78"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1340), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("6e93f25d-b82f-4fc7-b0c0-b23af2c411e1"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1330), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("938178c6-6514-4da7-9877-9d374eb7b4ad"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1340), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("a24056c7-9e88-462a-b3e3-1bbaf1369c11"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1340), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("dbff7de0-7633-4997-a864-e004c7d923de"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1350), null, null, "home", "Home Services", "خدمات المنزل", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(800));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(800));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(800));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(800));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(800));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(800));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(800));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("1c928af9-7848-4957-8405-74a5f675903b"), "fr", "French" },
                    { new Guid("58bf834b-056a-4e7f-a4aa-1ae373798bc2"), "ja", "Japanese" },
                    { new Guid("7fbdddcc-98b2-43d5-bdf1-2841efea6095"), "ar", "Arabic" },
                    { new Guid("a15ab431-3853-4e86-b420-833720357fb5"), "hi", "Hindi" },
                    { new Guid("b4312fee-69c2-4413-b657-ec59e8b7282b"), "de", "German" },
                    { new Guid("c6d04f21-299e-4bc4-986d-fe683f216d63"), "pt", "Portuguese" },
                    { new Guid("e1484c80-c70d-4ee4-8982-529c93a2eedc"), "ru", "Russian" },
                    { new Guid("f99bfefe-ceb3-401e-9c64-139dd45066d6"), "es", "Spanish" },
                    { new Guid("fe7abead-ffe4-4549-94e7-6259cf2977f1"), "en", "English" },
                    { new Guid("ffb60958-1e70-4067-97ec-d28d38c223ea"), "zh", "Chinese" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("0c07389e-948f-4b53-9d5d-3f613ffbaadc"), "Design", "Logo Design" },
                    { new Guid("1c54b074-3b56-410e-a035-f4b0137e8566"), "Programming", "Node.js" },
                    { new Guid("1e0e57f4-2388-4244-a81f-2619d56c0ba3"), "Marketing", "SEO" },
                    { new Guid("23d7bad2-68b7-492f-a15a-6ed7116dd31a"), "Marketing", "Email Marketing" },
                    { new Guid("2864520f-5aa5-4366-a639-f7b2b9d0be69"), "Programming", "C#" },
                    { new Guid("3875df9c-b86d-4c86-95cb-b61b93610fdc"), "Marketing", "Content Writing" },
                    { new Guid("4bd38ef8-1cf7-4831-a6fd-b4032f98e532"), "Programming", "Python" },
                    { new Guid("4f3a6947-bbd8-449f-b75e-b1515d34f58a"), "Design", "3D Modeling" },
                    { new Guid("5f7109ab-e132-41ec-b9cf-95e6641905f2"), "Programming", "JavaScript" },
                    { new Guid("63a22b4e-5a3c-44de-82f0-bb42c2be9dfe"), "Writing", "Copywriting" },
                    { new Guid("6824ed39-c64e-4aca-9648-70d597c7f896"), "Programming", "React" },
                    { new Guid("71dff129-04c1-422f-81e3-b72d9f9593ef"), "Writing", "Technical Writing" },
                    { new Guid("75ee38b8-f27b-4fff-af58-1aecdb4229c1"), "Video & Animation", "Animation" },
                    { new Guid("7e161c66-87d4-4b46-96c0-e9d59862fdfe"), "Business", "Business Consulting" },
                    { new Guid("8f959c21-10c6-49b6-bd31-c2c28c2d3e93"), "Design", "Graphic Design" },
                    { new Guid("9e02fde1-4133-411e-bd8f-0b0dc85b086c"), "Programming", "TypeScript" },
                    { new Guid("a35ef0d5-1839-4ece-b86a-c2f4bec71fbc"), "Programming", "Swift" },
                    { new Guid("ad312740-8d95-491c-a501-870417fbe2d9"), "Marketing", "Digital Marketing" },
                    { new Guid("b0dca3f0-6d38-433a-a6dc-4348bf0007f8"), "Design", "Adobe Illustrator" },
                    { new Guid("b7269af8-200d-4b9f-965d-5e6108adb5f8"), "Design", "Adobe Photoshop" },
                    { new Guid("bfcc9633-cc45-438e-957b-2eb0649bcc02"), "Programming", "Kotlin" },
                    { new Guid("d4909820-9995-4d51-ac38-9b5f3c89a325"), "Programming", "Flutter" },
                    { new Guid("dee58ed9-e5a5-4a47-99e5-4282d1850bde"), "Video & Animation", "Video Editing" },
                    { new Guid("e2e2146e-8409-47af-998a-4ef9b5cc0c8d"), "Marketing", "Social Media Marketing" },
                    { new Guid("e9f7c002-2e68-4642-98fd-d46469cae8ae"), "Design", "Figma" },
                    { new Guid("eb292055-1d72-4295-b672-889919f30b10"), "Programming", "Java" },
                    { new Guid("eba624a4-e7bc-4ee5-bc2a-126b5d536ab5"), "Design", "UI/UX Design" },
                    { new Guid("edcc0575-001d-4c61-b7b2-4f01f7c85f01"), "Business", "Data Analysis" },
                    { new Guid("f3fe76e4-a089-4e33-b34b-6e02e60bcd9b"), "Writing", "Translation" },
                    { new Guid("fd4c8140-4c00-41b7-9281-4aab3a9e7242"), "Video & Animation", "After Effects" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("146f9d1f-65ef-449f-aa5e-92c66f38302e"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1410), null, null, null, "Handyman", "أعمال الصيانة", new Guid("dbff7de0-7633-4997-a864-e004c7d923de") },
                    { new Guid("27022bf3-2d4c-4f50-b81c-a62c953768d1"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1400), null, null, null, "AI Services", "خدمات الذكاء الاصطناعي", new Guid("938178c6-6514-4da7-9877-9d374eb7b4ad") },
                    { new Guid("3aafb5aa-6483-4cfd-9436-59ecb17ddedd"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1410), null, null, null, "Cleaning", "التنظيف", new Guid("dbff7de0-7633-4997-a864-e004c7d923de") },
                    { new Guid("4057a7b2-8eb0-40e6-8320-28553f409fb1"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1380), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("6e93f25d-b82f-4fc7-b0c0-b23af2c411e1") },
                    { new Guid("47f0f8bc-f2eb-477a-ad69-64f551c4d087"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1390), null, null, null, "Mobile Apps", "تطبيقات الجوال", new Guid("938178c6-6514-4da7-9877-9d374eb7b4ad") },
                    { new Guid("4f310557-8899-4b42-bf14-0df40934b089"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1420), null, null, null, "Moving", "نقل الأثاث", new Guid("dbff7de0-7633-4997-a864-e004c7d923de") },
                    { new Guid("522089da-eea0-4639-be32-92cd80e005fe"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1350), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("6e93f25d-b82f-4fc7-b0c0-b23af2c411e1") },
                    { new Guid("889f1df2-c709-42ab-b608-dcf0820fe41b"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1430), null, null, null, "Gardening", "تنسيق الحدائق", new Guid("dbff7de0-7633-4997-a864-e004c7d923de") },
                    { new Guid("cc1ae1c5-b5a2-4e92-83e7-41f6b7a74707"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1390), null, null, null, "Web Development", "تطوير المواقع", new Guid("938178c6-6514-4da7-9877-9d374eb7b4ad") },
                    { new Guid("fbc50c61-35f6-4dfc-8824-01f1a81a4519"), new DateTime(2026, 2, 15, 11, 27, 12, 550, DateTimeKind.Utc).AddTicks(1360), null, null, null, "Web Design", "تصميم المواقع", new Guid("6e93f25d-b82f-4fc7-b0c0-b23af2c411e1") }
                });
        }
    }
}
