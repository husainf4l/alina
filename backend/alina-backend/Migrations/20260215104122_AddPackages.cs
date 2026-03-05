using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddPackages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1298439a-ab00-4ede-8a58-1be9d632c84e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("19319a93-527e-478f-bef3-0b058281b4f6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("22d1a707-8cc3-4a18-9855-085ff2d91ec8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2ad95b39-8e95-44fd-9a82-2408d5f5a1e1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("78ba3877-92bb-4e9c-a82b-64d5030472f0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("866e6af0-7dbd-46f7-ab0f-63007bcd1a55"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a6bb5281-145f-4b97-89bd-cf5cf3944801"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a6ff6ef6-1186-4e0e-9b1f-0be66a0faeea"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b462e06a-de40-47e5-9c87-f07a30238b17"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ce3420f4-7ee3-4a7f-9e90-d57f3966ffd6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d00ffba4-10a9-4ec7-a20f-9292bdbe0cc4"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d6a6ccbc-ed83-4e10-902c-efee64270728"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("011996e7-90c4-4aa9-a94e-6b297242f999"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("10728772-d3e8-421b-967a-10f7c88643ee"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("3a0bb667-de35-4afe-98cf-d5e2e4d87811"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("5b4cb07c-4374-4aa0-8408-a194676737bc"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("9393ab27-4ea5-4427-9853-1a09f1ccc8f9"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("ace508d0-9a2f-4212-914c-28ab84922f82"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("ade7c93f-d01e-45db-b996-6820b1c682cd"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("b72d70c4-58ac-4d83-baa8-56b629f48ace"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("d70ba290-ee0f-4e91-bb7d-6db32422f090"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("db7ef77c-09c9-4584-9ca4-1353b4bf3319"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("023ddb2d-c290-4874-bdeb-844afdb03401"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("0c961ed0-8785-47ff-9584-036f7ac8b625"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("15d3a3e7-25fd-4ce5-995c-438d500ed727"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1b350724-360f-49d2-aaa6-64f6c20f36ca"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("21fc4e95-0170-40d9-ab55-5cecbc3c0c1b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("220fd228-2292-4da2-997b-22f749b61d8a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("286f6d30-9f00-4b89-954a-7f87364496c1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2a7fd381-ba7c-4470-b32c-31dbdfb6976e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2b4c24d4-bd60-4519-b4ac-4828e340e56f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3034f94a-40a0-493e-ad38-6d59fbe64e34"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3ad40b8f-c00b-41de-9ef2-baca3150d015"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("49c94ab9-2454-49ae-b5cd-f9362198556a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("5b3e5e62-b689-48f9-9caf-9ec2615d19df"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6981c920-5479-40c2-8ef4-320ce5a5d002"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6f60eebb-9616-492e-b779-03d7e207e1b2"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("734cfc68-69b4-4dc0-b77e-142b29d4ca88"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("793f2fd1-e8a0-42c0-a21a-028ce6069608"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7be2d4c5-7a8e-486d-b2f3-2ddc00f2d1b7"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8488094c-0478-4fd5-95a1-e2dbbf872c7c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("84e4aae9-5d35-4dd9-b43c-7524e091860c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("88e085f9-7bf0-4c45-ba10-2b7b0d935a90"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("94a42966-8e80-42f4-bb98-749deed2e4ad"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("96fe0808-a025-4750-9bc1-9323925ec724"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9e6bee49-2bf5-4845-9d2f-e06bbaeaaba0"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a27a75c8-2b92-498d-bf65-5aebc4693833"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b1b45d6e-680b-41de-98f6-f31982e89aee"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c353b99a-0966-492e-9d07-4de4f63d676e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e1dd1e01-9da7-4c77-9de5-1d154bab0d7f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e67f1577-d062-4e4f-89b0-3a2b8778e14a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e8612c80-d560-4553-9d97-b29c894aa3dc"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("006f05c8-bc88-4671-8155-8516731dc3f7"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3a925873-15cc-474f-b863-cce75158476e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("632fcb86-d3bd-4628-a7b1-7dd50fefd2a2"));

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

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("0b223ff6-ba9e-49bf-8aaa-81176402b874"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(300), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("76af8e01-6f06-458d-b237-e08a674096e6"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(320), null, null, "home", "Home Services", "خدمات المنزل", null },
                    { new Guid("7e60c2e9-66b8-4928-8704-a488ffd91d5f"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(300), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("b8c292d0-37b3-470c-91f9-97a3fa1104f0"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(310), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("dc256bb5-dbea-456e-b8dd-204eb5b3bca9"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(310), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 10, 41, 21, 788, DateTimeKind.Utc).AddTicks(9780));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 10, 41, 21, 788, DateTimeKind.Utc).AddTicks(9780));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 10, 41, 21, 788, DateTimeKind.Utc).AddTicks(9780));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 10, 41, 21, 788, DateTimeKind.Utc).AddTicks(9780));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 10, 41, 21, 788, DateTimeKind.Utc).AddTicks(9780));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 10, 41, 21, 788, DateTimeKind.Utc).AddTicks(9780));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 15, 10, 41, 21, 788, DateTimeKind.Utc).AddTicks(9770));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("02508e9f-25cf-41ac-b186-2d0fce9107da"), "ja", "Japanese" },
                    { new Guid("0362b552-99ab-4d51-bb84-80beff63ffe9"), "zh", "Chinese" },
                    { new Guid("17f2130e-8251-4721-94bc-e817ad6d2a5f"), "ru", "Russian" },
                    { new Guid("402878d5-5d6d-4e38-a750-7c2d72837984"), "hi", "Hindi" },
                    { new Guid("4c55101f-c34b-42bc-9e3a-283085e0358d"), "ar", "Arabic" },
                    { new Guid("8317741c-d9ec-4fc9-a9b3-d417f7cd864c"), "fr", "French" },
                    { new Guid("a93e7f4d-3502-4190-ad21-a66c9b1c0cbf"), "es", "Spanish" },
                    { new Guid("b6daf2ed-72b8-4d43-b9e8-bc5f7acc8857"), "de", "German" },
                    { new Guid("e8bc596f-9cf3-4251-8703-79d2ca3ba5ef"), "en", "English" },
                    { new Guid("fae0bbf7-14fb-4f4f-95a4-650001ffcf18"), "pt", "Portuguese" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("031e0c5d-377c-430f-aef3-d62a4042f033"), "Programming", "C#" },
                    { new Guid("1042eea8-967c-4cd9-984e-fe64ece8a8ef"), "Programming", "Swift" },
                    { new Guid("11913d39-1e5f-4538-8b1b-75df4c491a84"), "Marketing", "Email Marketing" },
                    { new Guid("14a78b16-f3a8-4866-92b5-507e99c9aa07"), "Design", "UI/UX Design" },
                    { new Guid("22b28bdd-2ffb-46eb-9a34-98ddf8268f25"), "Design", "Graphic Design" },
                    { new Guid("2916e6a6-3926-423b-b7d6-e844104e9128"), "Design", "Figma" },
                    { new Guid("31c5b27c-f317-478b-8710-3a83a5cfa935"), "Marketing", "Content Writing" },
                    { new Guid("3393149e-c376-4b88-872d-7ae04d93395f"), "Writing", "Copywriting" },
                    { new Guid("3ee652e3-47e0-4c9d-88be-a0a1ec00affc"), "Writing", "Translation" },
                    { new Guid("40f54a6a-babc-400a-a5fb-fd4f61f97d2c"), "Writing", "Technical Writing" },
                    { new Guid("41f2f55f-9b54-439d-b427-caffe533458a"), "Marketing", "Social Media Marketing" },
                    { new Guid("4c17ccc7-2272-420f-9c70-256286c4859c"), "Video & Animation", "Animation" },
                    { new Guid("69caad3a-77a7-471e-b8d7-c0ceeb5e26a7"), "Programming", "Kotlin" },
                    { new Guid("72e9bdb3-9cf9-4e70-90e1-a42d0aba4cd9"), "Programming", "TypeScript" },
                    { new Guid("736124ee-356f-40de-bd45-7eef55de5961"), "Video & Animation", "After Effects" },
                    { new Guid("9ba6f217-2e09-4ce3-b372-cae713fc8984"), "Video & Animation", "Video Editing" },
                    { new Guid("9c4887be-72f4-4a01-8432-721b3c255679"), "Design", "Adobe Illustrator" },
                    { new Guid("9c650c3d-76e7-429e-996f-ca1563cc5be6"), "Programming", "Java" },
                    { new Guid("a4bb488e-2d4f-4724-81c6-cc5451d2acf8"), "Marketing", "SEO" },
                    { new Guid("a7b3de43-7fdd-44a3-adad-877be00eea89"), "Design", "3D Modeling" },
                    { new Guid("af664b7e-bcb3-45a8-9112-f55c4dab2d1f"), "Marketing", "Digital Marketing" },
                    { new Guid("b4b3f932-1cc1-4b9b-b53b-2808434a7d65"), "Design", "Adobe Photoshop" },
                    { new Guid("be1853da-f45f-48b7-bbf6-354dc088a30a"), "Programming", "Node.js" },
                    { new Guid("c022230a-d304-44e3-b907-7f9685cb2988"), "Business", "Business Consulting" },
                    { new Guid("c068e6de-89d0-488f-bb92-e648751f8226"), "Business", "Data Analysis" },
                    { new Guid("cda04877-b4b9-485d-9630-d61a8b20a931"), "Programming", "JavaScript" },
                    { new Guid("d4a7f936-6cad-41c3-a9fe-59d8a3aee393"), "Programming", "React" },
                    { new Guid("d845aa50-4077-4525-83f8-1dfa367ab3fc"), "Design", "Logo Design" },
                    { new Guid("e0c47cfd-5421-4e0d-9c98-837564b27ff5"), "Programming", "Python" },
                    { new Guid("e3122c2d-6ca7-42f7-aa00-c9e5d137e62d"), "Programming", "Flutter" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("00298782-8ebd-4d1a-8b8f-96601da39a11"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(370), null, null, null, "Moving", "نقل الأثاث", new Guid("76af8e01-6f06-458d-b237-e08a674096e6") },
                    { new Guid("0a3808e0-5d91-4154-b04c-24f0d6555e33"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(330), null, null, null, "Web Design", "تصميم المواقع", new Guid("7e60c2e9-66b8-4928-8704-a488ffd91d5f") },
                    { new Guid("2aa030ee-b3cb-417d-b817-cabe852b8314"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(320), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("7e60c2e9-66b8-4928-8704-a488ffd91d5f") },
                    { new Guid("2b85a07b-8db4-47c5-b242-167b01270b91"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(340), null, null, null, "Web Development", "تطوير المواقع", new Guid("0b223ff6-ba9e-49bf-8aaa-81176402b874") },
                    { new Guid("3181bc49-4230-4838-8747-e0224800455a"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(330), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("7e60c2e9-66b8-4928-8704-a488ffd91d5f") },
                    { new Guid("41a8bf78-0da3-4ab9-bc05-6437173c3752"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(350), null, null, null, "Mobile Apps", "تطبيقات الجوال", new Guid("0b223ff6-ba9e-49bf-8aaa-81176402b874") },
                    { new Guid("5016782a-9a39-4218-b9c2-8861eacd517b"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(360), null, null, null, "Cleaning", "التنظيف", new Guid("76af8e01-6f06-458d-b237-e08a674096e6") },
                    { new Guid("687174c7-3599-4ad2-8618-787ddb592e58"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(380), null, null, null, "Gardening", "تنسيق الحدائق", new Guid("76af8e01-6f06-458d-b237-e08a674096e6") },
                    { new Guid("7c8cc85a-2cac-459d-8c80-4a3253ad696e"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(370), null, null, null, "Handyman", "أعمال الصيانة", new Guid("76af8e01-6f06-458d-b237-e08a674096e6") },
                    { new Guid("b0b46649-5439-4086-b706-512e911518fc"), new DateTime(2026, 2, 15, 10, 41, 21, 789, DateTimeKind.Utc).AddTicks(350), null, null, null, "AI Services", "خدمات الذكاء الاصطناعي", new Guid("0b223ff6-ba9e-49bf-8aaa-81176402b874") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Packages_GigId",
                table: "Packages",
                column: "GigId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Packages");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("00298782-8ebd-4d1a-8b8f-96601da39a11"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0a3808e0-5d91-4154-b04c-24f0d6555e33"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2aa030ee-b3cb-417d-b817-cabe852b8314"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2b85a07b-8db4-47c5-b242-167b01270b91"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3181bc49-4230-4838-8747-e0224800455a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("41a8bf78-0da3-4ab9-bc05-6437173c3752"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5016782a-9a39-4218-b9c2-8861eacd517b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("687174c7-3599-4ad2-8618-787ddb592e58"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7c8cc85a-2cac-459d-8c80-4a3253ad696e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b0b46649-5439-4086-b706-512e911518fc"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b8c292d0-37b3-470c-91f9-97a3fa1104f0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("dc256bb5-dbea-456e-b8dd-204eb5b3bca9"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("02508e9f-25cf-41ac-b186-2d0fce9107da"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("0362b552-99ab-4d51-bb84-80beff63ffe9"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("17f2130e-8251-4721-94bc-e817ad6d2a5f"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("402878d5-5d6d-4e38-a750-7c2d72837984"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("4c55101f-c34b-42bc-9e3a-283085e0358d"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("8317741c-d9ec-4fc9-a9b3-d417f7cd864c"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a93e7f4d-3502-4190-ad21-a66c9b1c0cbf"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("b6daf2ed-72b8-4d43-b9e8-bc5f7acc8857"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("e8bc596f-9cf3-4251-8703-79d2ca3ba5ef"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("fae0bbf7-14fb-4f4f-95a4-650001ffcf18"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("031e0c5d-377c-430f-aef3-d62a4042f033"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1042eea8-967c-4cd9-984e-fe64ece8a8ef"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("11913d39-1e5f-4538-8b1b-75df4c491a84"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("14a78b16-f3a8-4866-92b5-507e99c9aa07"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("22b28bdd-2ffb-46eb-9a34-98ddf8268f25"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2916e6a6-3926-423b-b7d6-e844104e9128"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("31c5b27c-f317-478b-8710-3a83a5cfa935"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3393149e-c376-4b88-872d-7ae04d93395f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3ee652e3-47e0-4c9d-88be-a0a1ec00affc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("40f54a6a-babc-400a-a5fb-fd4f61f97d2c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("41f2f55f-9b54-439d-b427-caffe533458a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4c17ccc7-2272-420f-9c70-256286c4859c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("69caad3a-77a7-471e-b8d7-c0ceeb5e26a7"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("72e9bdb3-9cf9-4e70-90e1-a42d0aba4cd9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("736124ee-356f-40de-bd45-7eef55de5961"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9ba6f217-2e09-4ce3-b372-cae713fc8984"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9c4887be-72f4-4a01-8432-721b3c255679"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9c650c3d-76e7-429e-996f-ca1563cc5be6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a4bb488e-2d4f-4724-81c6-cc5451d2acf8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a7b3de43-7fdd-44a3-adad-877be00eea89"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("af664b7e-bcb3-45a8-9112-f55c4dab2d1f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b4b3f932-1cc1-4b9b-b53b-2808434a7d65"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("be1853da-f45f-48b7-bbf6-354dc088a30a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c022230a-d304-44e3-b907-7f9685cb2988"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c068e6de-89d0-488f-bb92-e648751f8226"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("cda04877-b4b9-485d-9630-d61a8b20a931"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d4a7f936-6cad-41c3-a9fe-59d8a3aee393"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d845aa50-4077-4525-83f8-1dfa367ab3fc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e0c47cfd-5421-4e0d-9c98-837564b27ff5"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e3122c2d-6ca7-42f7-aa00-c9e5d137e62d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0b223ff6-ba9e-49bf-8aaa-81176402b874"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("76af8e01-6f06-458d-b237-e08a674096e6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7e60c2e9-66b8-4928-8704-a488ffd91d5f"));

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

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 12, 11, 0, 16, 908, DateTimeKind.Utc).AddTicks(110));

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
        }
    }
}
