using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddSearchAnalytics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0c87a00a-25cb-4fd0-84a0-4df84d863a39"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0f9523bd-363b-4e8d-be2e-5f7969abfc9a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("18de8269-6512-4863-acea-6e956f348f98"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("20de0003-d65d-4527-b4c5-c152392adbf5"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("23b8425f-16e4-463c-a6cd-185894c82a88"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("33e54cae-a3d8-4902-bc10-c98513fb6d8a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3d9145b6-db6b-486e-bbba-4d00067f5233"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("42a9b552-9620-46b9-aefe-aff244029b25"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4e12f5e8-7012-479d-ba83-74b605bf9637"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ac51c32d-24d3-4f25-8125-5189b8df3b05"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("bca1912f-8c07-454d-af21-c5301656a0fb"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c611810c-b3ac-41e8-afd1-7351d75e51c9"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("1413e2e5-3f94-406b-8532-e8864ba91938"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("1447823f-e46a-44e6-862a-adae915fba6a"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("4d018b57-795c-47d8-bbc9-334d55a27c65"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("5d4cbe35-b48d-4081-a9b4-bcd01790981f"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("646da794-ef6a-4a1c-8912-00210a502150"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("64e46d4b-21ee-413f-b45e-68825aeea8c1"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("73c00f55-de92-42f2-9990-ffae1fc01a76"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("923cc2ab-c11a-4d37-906e-8e3607bb8528"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("9e8a5739-0d81-4167-bbae-0f64515f07b6"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("bf39cf35-bd4a-413d-be2b-91904cfe0aa9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("0562a5cb-61ae-45bc-9a6d-c7a402bde347"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1c54224d-6035-4094-a20b-5c25543f4ebf"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("20f11881-72c0-4aba-a87a-5c688a74312f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("286ea299-34ac-4fb9-90f0-3ea18abd466e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("29752820-7a0f-44f4-bf73-ecb41c4cd06a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2ad30878-0139-4281-a353-e063b7f59360"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2fa00585-6f26-4585-a4b1-85016475f676"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("32331b3e-2416-42d9-8d91-eaffdff1bb05"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3302e939-3fb5-42b8-a40f-43d47919df28"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("37fd1fa5-c436-4dd1-a5ac-2501dd741ccf"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("38b07a29-7e14-4f94-b00a-23e62b810c6d"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("478fa79b-3d0d-4686-87f2-463ea61d3fec"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("529cabeb-12ee-4fb4-868e-41c80b85124d"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("77396ad1-563c-4262-a6b0-9df26d3df5c3"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("81afe858-a4ac-44a0-a6d2-8843de08f458"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8aac63c1-f6d3-4712-b4c3-2785653b6cbb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a0a86fd2-6410-42fc-87c2-c27d85656fb2"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a3b3f805-7144-48be-9a65-b62eaab62fd5"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a46f5008-7d65-42fb-b6c4-5abd601f198b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("af37c2e7-7b0a-4b22-be20-5de74c3c005c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b3c22354-1495-4aca-86cb-2da54a9ada86"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b4c591e8-3a95-4889-996b-83a84befe805"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c42483c3-afbf-4c57-a209-f17b95315786"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d022eb62-ad47-43d4-b715-5d462a486f36"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d2e368fe-609a-45c6-8471-87bc1339a85c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e8ba6a35-a7ba-4af0-8b39-d2b8067d20aa"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("eb7df5cd-39d1-4e20-b45b-446f2affd51e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f7372cdd-e900-4ba6-b97b-616bd85b8536"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f9b59233-3353-4c63-baf1-379c371de6a1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fe4263c2-6e3c-405e-a5fd-a57f60bfb5ac"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2ccafa1a-8f52-433d-a783-5d1e881a48ab"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("acf3f1ee-6371-481b-b1b6-b12219fc659b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e6e916e4-51e4-4976-813f-c655c0439292"));

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

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("55f1c59b-2ce7-4ef1-8290-448861765447"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8980), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("79bfc5dd-1170-454e-b138-4ad825c16148"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8980), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("9280dd38-349e-4522-bc45-b62e120e080b"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8980), null, null, "home", "Home Services", "خدمات المنزل", null },
                    { new Guid("d1629739-fecc-4e04-8244-5a4d0ad1fcab"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8970), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("f380eb8f-54cf-45c4-a1bc-894c01dbe7cc"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8970), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8400));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8400));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8400));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8400));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8400));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8400));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8390));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("1dabe081-ac43-42f1-8054-ef7349f0989b"), "de", "German" },
                    { new Guid("348bcb18-7cc3-4761-8f2c-3eaed8cab75c"), "es", "Spanish" },
                    { new Guid("42f876a6-c007-47bc-9f5b-872935d649fa"), "ja", "Japanese" },
                    { new Guid("49b5fbf7-8786-434a-80a9-cdadc92c2ae0"), "ru", "Russian" },
                    { new Guid("62d72e2a-3ee8-48e4-b65d-643771284a2c"), "ar", "Arabic" },
                    { new Guid("7aaf26c7-9b03-46d1-88ac-0c392d923ffe"), "pt", "Portuguese" },
                    { new Guid("91226cfd-62ca-48f2-9379-5b75d224c907"), "hi", "Hindi" },
                    { new Guid("a7ea12dc-2998-42ad-a68e-478589a09324"), "zh", "Chinese" },
                    { new Guid("ada9e196-018e-437b-85cd-e5a08cf91a78"), "en", "English" },
                    { new Guid("c625612b-832b-486d-8c95-d59369ceb926"), "fr", "French" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("019bdc2d-39bc-4969-b49e-9033a6fa99fd"), "Design", "3D Modeling" },
                    { new Guid("06f1fe1d-cf44-43ba-821a-868f8758dfe4"), "Marketing", "Content Writing" },
                    { new Guid("184c0953-0cd3-460e-9303-58b0f24d9a18"), "Business", "Data Analysis" },
                    { new Guid("204525cc-d700-4101-9d30-1b897dd48305"), "Design", "Adobe Photoshop" },
                    { new Guid("20b01f26-b550-4c9c-be59-91b434122cba"), "Video & Animation", "After Effects" },
                    { new Guid("241454be-a63d-42fe-8f24-6b1d8253fda5"), "Design", "Logo Design" },
                    { new Guid("2c82ca3a-9b5e-4eac-93f9-abe60601f8cc"), "Programming", "C#" },
                    { new Guid("2cee191e-6a90-4243-b68f-687872c2aa5e"), "Video & Animation", "Animation" },
                    { new Guid("46838c40-85c2-40af-b868-d257d7fd5885"), "Programming", "TypeScript" },
                    { new Guid("4b676f2c-b062-4a3e-8199-1bfaba494b62"), "Programming", "Java" },
                    { new Guid("5bab2e2e-183f-48f9-b8fb-1e2201bb1869"), "Marketing", "Social Media Marketing" },
                    { new Guid("5be5036b-642d-4e0f-b217-20f73e0244db"), "Programming", "Swift" },
                    { new Guid("6d82dbb0-14fd-49ef-a5ac-7560f432113b"), "Design", "Figma" },
                    { new Guid("6f37a613-769d-45b3-99f6-e3e013c0f695"), "Marketing", "Digital Marketing" },
                    { new Guid("870abe48-8cdb-4b7b-809f-2e51a0836766"), "Writing", "Translation" },
                    { new Guid("88dab051-e652-4dbc-b5f0-0cc1e33d7c50"), "Programming", "Python" },
                    { new Guid("94dea5f2-0b39-4ae1-85a3-26f88f92ed23"), "Business", "Business Consulting" },
                    { new Guid("a3c1bf75-804a-41df-b26d-53047914ed9b"), "Design", "UI/UX Design" },
                    { new Guid("adbea7b5-58a8-4e55-86ea-be406930a196"), "Programming", "Flutter" },
                    { new Guid("ae2f0e64-80ab-4d6a-bcd3-07157632558d"), "Design", "Adobe Illustrator" },
                    { new Guid("b4b09175-1a84-44b7-a165-58cd481448e7"), "Programming", "JavaScript" },
                    { new Guid("b52bd945-373e-42fb-9802-f285a547e9c8"), "Writing", "Copywriting" },
                    { new Guid("bf343780-9833-4f3b-854f-6bdacb6ebc73"), "Programming", "Kotlin" },
                    { new Guid("da30d484-0c3b-4985-8858-f9838e5f50eb"), "Programming", "React" },
                    { new Guid("dbe64a8f-b613-4536-8fbd-e3f67a779344"), "Video & Animation", "Video Editing" },
                    { new Guid("e16df6ad-b632-4feb-9ce3-3278ece82415"), "Marketing", "Email Marketing" },
                    { new Guid("e4e87868-47b7-4122-bc82-9c033d8dc9ab"), "Programming", "Node.js" },
                    { new Guid("e5ba493e-2da2-469f-a2a2-6e9b19a4946c"), "Writing", "Technical Writing" },
                    { new Guid("f2bf6f45-112a-4697-b4cb-7ee0719f62d8"), "Design", "Graphic Design" },
                    { new Guid("f7e20c0a-b31d-42d9-b273-1a9d09da8032"), "Marketing", "SEO" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("1274f08d-3c39-4b7e-989e-121db188bed7"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(9040), null, null, null, "Moving", "نقل الأثاث", new Guid("9280dd38-349e-4522-bc45-b62e120e080b") },
                    { new Guid("1b96042d-2039-40c5-94c2-1a3f82d9bada"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(9050), null, null, null, "Gardening", "تنسيق الحدائق", new Guid("9280dd38-349e-4522-bc45-b62e120e080b") },
                    { new Guid("44ba95bf-3621-4ab5-b068-34427150a31c"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(9010), null, null, null, "Mobile Apps", "تطبيقات الجوال", new Guid("d1629739-fecc-4e04-8244-5a4d0ad1fcab") },
                    { new Guid("63fe704f-d066-4e38-8447-9be3184bf86a"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(9030), null, null, null, "Handyman", "أعمال الصيانة", new Guid("9280dd38-349e-4522-bc45-b62e120e080b") },
                    { new Guid("67005bbc-62e1-4407-abd7-18a6fb3acf6a"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8990), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("f380eb8f-54cf-45c4-a1bc-894c01dbe7cc") },
                    { new Guid("7628786d-aba0-4ebd-88de-1363b3aead7b"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(9010), null, null, null, "Web Development", "تطوير المواقع", new Guid("d1629739-fecc-4e04-8244-5a4d0ad1fcab") },
                    { new Guid("99d98dc3-7ad5-4a4f-b11d-a43c8dbcaa7e"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(8990), null, null, null, "Web Design", "تصميم المواقع", new Guid("f380eb8f-54cf-45c4-a1bc-894c01dbe7cc") },
                    { new Guid("b1e3f3df-00f3-4bc9-a427-82ac0f5344e0"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(9020), null, null, null, "AI Services", "خدمات الذكاء الاصطناعي", new Guid("d1629739-fecc-4e04-8244-5a4d0ad1fcab") },
                    { new Guid("e4e235dd-3709-4180-be36-3b681835309a"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(9030), null, null, null, "Cleaning", "التنظيف", new Guid("9280dd38-349e-4522-bc45-b62e120e080b") },
                    { new Guid("e77ae5dc-b4ad-4be1-aefa-8f94b13eb806"), new DateTime(2026, 2, 16, 9, 58, 3, 873, DateTimeKind.Utc).AddTicks(9000), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("f380eb8f-54cf-45c4-a1bc-894c01dbe7cc") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_SearchAnalytics_UserId",
                table: "SearchAnalytics",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SearchAnalytics");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1274f08d-3c39-4b7e-989e-121db188bed7"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1b96042d-2039-40c5-94c2-1a3f82d9bada"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("44ba95bf-3621-4ab5-b068-34427150a31c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("55f1c59b-2ce7-4ef1-8290-448861765447"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("63fe704f-d066-4e38-8447-9be3184bf86a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("67005bbc-62e1-4407-abd7-18a6fb3acf6a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7628786d-aba0-4ebd-88de-1363b3aead7b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("79bfc5dd-1170-454e-b138-4ad825c16148"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("99d98dc3-7ad5-4a4f-b11d-a43c8dbcaa7e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b1e3f3df-00f3-4bc9-a427-82ac0f5344e0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e4e235dd-3709-4180-be36-3b681835309a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e77ae5dc-b4ad-4be1-aefa-8f94b13eb806"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("1dabe081-ac43-42f1-8054-ef7349f0989b"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("348bcb18-7cc3-4761-8f2c-3eaed8cab75c"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("42f876a6-c007-47bc-9f5b-872935d649fa"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("49b5fbf7-8786-434a-80a9-cdadc92c2ae0"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("62d72e2a-3ee8-48e4-b65d-643771284a2c"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("7aaf26c7-9b03-46d1-88ac-0c392d923ffe"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("91226cfd-62ca-48f2-9379-5b75d224c907"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a7ea12dc-2998-42ad-a68e-478589a09324"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("ada9e196-018e-437b-85cd-e5a08cf91a78"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("c625612b-832b-486d-8c95-d59369ceb926"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("019bdc2d-39bc-4969-b49e-9033a6fa99fd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("06f1fe1d-cf44-43ba-821a-868f8758dfe4"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("184c0953-0cd3-460e-9303-58b0f24d9a18"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("204525cc-d700-4101-9d30-1b897dd48305"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("20b01f26-b550-4c9c-be59-91b434122cba"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("241454be-a63d-42fe-8f24-6b1d8253fda5"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2c82ca3a-9b5e-4eac-93f9-abe60601f8cc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2cee191e-6a90-4243-b68f-687872c2aa5e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("46838c40-85c2-40af-b868-d257d7fd5885"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4b676f2c-b062-4a3e-8199-1bfaba494b62"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("5bab2e2e-183f-48f9-b8fb-1e2201bb1869"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("5be5036b-642d-4e0f-b217-20f73e0244db"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6d82dbb0-14fd-49ef-a5ac-7560f432113b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6f37a613-769d-45b3-99f6-e3e013c0f695"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("870abe48-8cdb-4b7b-809f-2e51a0836766"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("88dab051-e652-4dbc-b5f0-0cc1e33d7c50"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("94dea5f2-0b39-4ae1-85a3-26f88f92ed23"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a3c1bf75-804a-41df-b26d-53047914ed9b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("adbea7b5-58a8-4e55-86ea-be406930a196"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("ae2f0e64-80ab-4d6a-bcd3-07157632558d"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b4b09175-1a84-44b7-a165-58cd481448e7"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b52bd945-373e-42fb-9802-f285a547e9c8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("bf343780-9833-4f3b-854f-6bdacb6ebc73"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("da30d484-0c3b-4985-8858-f9838e5f50eb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("dbe64a8f-b613-4536-8fbd-e3f67a779344"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e16df6ad-b632-4feb-9ce3-3278ece82415"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e4e87868-47b7-4122-bc82-9c033d8dc9ab"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e5ba493e-2da2-469f-a2a2-6e9b19a4946c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f2bf6f45-112a-4697-b4cb-7ee0719f62d8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f7e20c0a-b31d-42d9-b273-1a9d09da8032"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("9280dd38-349e-4522-bc45-b62e120e080b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d1629739-fecc-4e04-8244-5a4d0ad1fcab"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f380eb8f-54cf-45c4-a1bc-894c01dbe7cc"));

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("18de8269-6512-4863-acea-6e956f348f98"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3510), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("2ccafa1a-8f52-433d-a783-5d1e881a48ab"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3500), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("3d9145b6-db6b-486e-bbba-4d00067f5233"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3510), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("acf3f1ee-6371-481b-b1b6-b12219fc659b"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3510), null, null, "home", "Home Services", "خدمات المنزل", null },
                    { new Guid("e6e916e4-51e4-4976-813f-c655c0439292"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3490), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(2690));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(2690));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(2690));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(2690));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(2690));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(2680));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(2680));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("1413e2e5-3f94-406b-8532-e8864ba91938"), "pt", "Portuguese" },
                    { new Guid("1447823f-e46a-44e6-862a-adae915fba6a"), "fr", "French" },
                    { new Guid("4d018b57-795c-47d8-bbc9-334d55a27c65"), "ja", "Japanese" },
                    { new Guid("5d4cbe35-b48d-4081-a9b4-bcd01790981f"), "ru", "Russian" },
                    { new Guid("646da794-ef6a-4a1c-8912-00210a502150"), "zh", "Chinese" },
                    { new Guid("64e46d4b-21ee-413f-b45e-68825aeea8c1"), "hi", "Hindi" },
                    { new Guid("73c00f55-de92-42f2-9990-ffae1fc01a76"), "en", "English" },
                    { new Guid("923cc2ab-c11a-4d37-906e-8e3607bb8528"), "de", "German" },
                    { new Guid("9e8a5739-0d81-4167-bbae-0f64515f07b6"), "es", "Spanish" },
                    { new Guid("bf39cf35-bd4a-413d-be2b-91904cfe0aa9"), "ar", "Arabic" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("0562a5cb-61ae-45bc-9a6d-c7a402bde347"), "Programming", "Node.js" },
                    { new Guid("1c54224d-6035-4094-a20b-5c25543f4ebf"), "Programming", "React" },
                    { new Guid("20f11881-72c0-4aba-a87a-5c688a74312f"), "Programming", "Kotlin" },
                    { new Guid("286ea299-34ac-4fb9-90f0-3ea18abd466e"), "Design", "Graphic Design" },
                    { new Guid("29752820-7a0f-44f4-bf73-ecb41c4cd06a"), "Marketing", "Social Media Marketing" },
                    { new Guid("2ad30878-0139-4281-a353-e063b7f59360"), "Design", "Adobe Photoshop" },
                    { new Guid("2fa00585-6f26-4585-a4b1-85016475f676"), "Programming", "Swift" },
                    { new Guid("32331b3e-2416-42d9-8d91-eaffdff1bb05"), "Marketing", "Digital Marketing" },
                    { new Guid("3302e939-3fb5-42b8-a40f-43d47919df28"), "Programming", "JavaScript" },
                    { new Guid("37fd1fa5-c436-4dd1-a5ac-2501dd741ccf"), "Writing", "Technical Writing" },
                    { new Guid("38b07a29-7e14-4f94-b00a-23e62b810c6d"), "Marketing", "Content Writing" },
                    { new Guid("478fa79b-3d0d-4686-87f2-463ea61d3fec"), "Programming", "C#" },
                    { new Guid("529cabeb-12ee-4fb4-868e-41c80b85124d"), "Video & Animation", "After Effects" },
                    { new Guid("77396ad1-563c-4262-a6b0-9df26d3df5c3"), "Design", "3D Modeling" },
                    { new Guid("81afe858-a4ac-44a0-a6d2-8843de08f458"), "Design", "Adobe Illustrator" },
                    { new Guid("8aac63c1-f6d3-4712-b4c3-2785653b6cbb"), "Marketing", "Email Marketing" },
                    { new Guid("a0a86fd2-6410-42fc-87c2-c27d85656fb2"), "Video & Animation", "Video Editing" },
                    { new Guid("a3b3f805-7144-48be-9a65-b62eaab62fd5"), "Business", "Business Consulting" },
                    { new Guid("a46f5008-7d65-42fb-b6c4-5abd601f198b"), "Design", "Logo Design" },
                    { new Guid("af37c2e7-7b0a-4b22-be20-5de74c3c005c"), "Business", "Data Analysis" },
                    { new Guid("b3c22354-1495-4aca-86cb-2da54a9ada86"), "Programming", "Python" },
                    { new Guid("b4c591e8-3a95-4889-996b-83a84befe805"), "Design", "Figma" },
                    { new Guid("c42483c3-afbf-4c57-a209-f17b95315786"), "Writing", "Translation" },
                    { new Guid("d022eb62-ad47-43d4-b715-5d462a486f36"), "Marketing", "SEO" },
                    { new Guid("d2e368fe-609a-45c6-8471-87bc1339a85c"), "Programming", "Java" },
                    { new Guid("e8ba6a35-a7ba-4af0-8b39-d2b8067d20aa"), "Design", "UI/UX Design" },
                    { new Guid("eb7df5cd-39d1-4e20-b45b-446f2affd51e"), "Writing", "Copywriting" },
                    { new Guid("f7372cdd-e900-4ba6-b97b-616bd85b8536"), "Video & Animation", "Animation" },
                    { new Guid("f9b59233-3353-4c63-baf1-379c371de6a1"), "Programming", "Flutter" },
                    { new Guid("fe4263c2-6e3c-405e-a5fd-a57f60bfb5ac"), "Programming", "TypeScript" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("0c87a00a-25cb-4fd0-84a0-4df84d863a39"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3530), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("e6e916e4-51e4-4976-813f-c655c0439292") },
                    { new Guid("0f9523bd-363b-4e8d-be2e-5f7969abfc9a"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3560), null, null, null, "AI Services", "خدمات الذكاء الاصطناعي", new Guid("2ccafa1a-8f52-433d-a783-5d1e881a48ab") },
                    { new Guid("20de0003-d65d-4527-b4c5-c152392adbf5"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3590), null, null, null, "Gardening", "تنسيق الحدائق", new Guid("acf3f1ee-6371-481b-b1b6-b12219fc659b") },
                    { new Guid("23b8425f-16e4-463c-a6cd-185894c82a88"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3540), null, null, null, "Web Development", "تطوير المواقع", new Guid("2ccafa1a-8f52-433d-a783-5d1e881a48ab") },
                    { new Guid("33e54cae-a3d8-4902-bc10-c98513fb6d8a"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3550), null, null, null, "Mobile Apps", "تطبيقات الجوال", new Guid("2ccafa1a-8f52-433d-a783-5d1e881a48ab") },
                    { new Guid("42a9b552-9620-46b9-aefe-aff244029b25"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3580), null, null, null, "Moving", "نقل الأثاث", new Guid("acf3f1ee-6371-481b-b1b6-b12219fc659b") },
                    { new Guid("4e12f5e8-7012-479d-ba83-74b605bf9637"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3520), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("e6e916e4-51e4-4976-813f-c655c0439292") },
                    { new Guid("ac51c32d-24d3-4f25-8125-5189b8df3b05"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3530), null, null, null, "Web Design", "تصميم المواقع", new Guid("e6e916e4-51e4-4976-813f-c655c0439292") },
                    { new Guid("bca1912f-8c07-454d-af21-c5301656a0fb"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3570), null, null, null, "Handyman", "أعمال الصيانة", new Guid("acf3f1ee-6371-481b-b1b6-b12219fc659b") },
                    { new Guid("c611810c-b3ac-41e8-afd1-7351d75e51c9"), new DateTime(2026, 2, 16, 8, 21, 34, 469, DateTimeKind.Utc).AddTicks(3570), null, null, null, "Cleaning", "التنظيف", new Guid("acf3f1ee-6371-481b-b1b6-b12219fc659b") }
                });
        }
    }
}
