using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomOffers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("149c280e-cd4d-433d-a5c1-2849566f4e15"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("263bcf0a-72db-4cf5-802c-54a88422a015"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("356dcd5d-edf2-4ca7-97dd-c75e965a5464"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("56ca8261-f754-4a51-81e6-8a61710a3c79"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("669aace8-2b55-4d05-8232-83eb1b721951"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("71eb5645-212c-4f11-b78a-a0276d2ea17e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8d93de44-ea35-4bbc-b9a1-2a687d3388c1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("9633fb93-81f0-452c-bd3b-2979a4626213"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("9ef9356b-83a5-4356-b1a5-70e1fe10a3b9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3b77d05-5e81-483b-91ae-2bed9cc0a54d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d4eafd38-bd26-4946-800d-7c9f9693c9cb"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e2387fab-a208-4d0f-bfcb-0d574d08d860"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("33ac6195-0990-4e8d-bbce-29ea6ca35a75"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("68fa71be-4645-4610-9f54-44f3cb89b37d"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("72b7810a-ee98-4b10-a352-a5dd01cf8a42"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("7e7248ef-f9a8-4427-8adc-3b85073326d0"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("97257379-f220-407a-8be2-5054e8419f77"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("a85b7a89-418e-458e-a634-34a425c5774b"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("c59f2d3b-eff9-4835-a66c-7ef4bf094df8"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("d7794c13-7539-4019-8473-982e9dd16097"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("de705a6d-2f13-458d-82e2-2ccd43a2f329"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("f5c82e93-1d9a-40c8-90f1-213270ce0b7d"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("040eb669-7ec3-4af2-a36e-81e032ce4c24"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1d8b8668-aea7-4902-9163-c02a66e811b3"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1fd3d71a-b2dd-4b40-87e5-77194205fc14"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("293d071e-feb5-406f-8dd9-10493f189cb5"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("29bbf5e9-b3e4-4493-9193-1b8897c471da"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2a7e3051-61eb-4be9-80dc-30a819c07aab"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("36154402-fdae-4ba8-bfd0-0c28775935c4"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("43b231ed-a2f2-4c5e-8c30-ccde856d9df7"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("43d55dd5-911a-489f-82bf-956d1b587c7d"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4c968f5c-6bac-4d07-ac6c-4b028b662cb1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("61701521-83d4-4b50-a27e-1b08c488f27d"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("659dfe69-279e-4de6-b03f-ed9501031247"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("674a3274-08a2-4274-b14a-ea9be59e34a3"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("75a7cf47-1a35-4833-a766-13ded328b5ad"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7bc68723-ca4f-451a-94c4-ce97296f1b14"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7d4dc021-01f8-4f72-ab35-e85ce023d1e4"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("812e7be1-5c59-43f9-a767-1b1a16735c57"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("922e2cbb-5590-4e07-9983-80e7b05a7f94"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("abb43eaa-c04d-43fb-b9d4-19ec609ab248"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b20d4152-c653-4e47-a3fe-61d5d66e32bc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b37f7fe0-7c4b-494c-b1e9-a97af8f79816"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c7fbd7e0-b3a8-4a59-8376-1801ffb631fd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d0e089c8-aeda-4686-b6f5-61279d352185"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d9f7b615-ddcd-4539-9d8f-aba1f8098f08"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("da19045d-1a50-4c9c-b8c8-d3a7f58353eb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("de3f0b4d-71c0-40b6-a4da-d4e054752894"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e46ebf19-eb18-4755-bd16-d3f20ae10c85"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e4c50e60-22ad-4914-be82-7a937aeace9f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("ecd0af05-6629-472e-92a9-4530895b56ba"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f7504825-d58d-4ddb-8d45-c0b9ba76858a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2c24a5be-48df-4564-b47d-6b7fa2165943"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("62396ff6-dd3b-46bf-b9ae-120ceccdbaf2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("88384db2-0bbf-44f8-b887-621dd28c8b7d"));

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("1987d6fa-fb87-4733-b094-09e87d9f6b5e"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(540), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("2d321e63-322a-42ca-b1c3-fdd09cbc545c"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(540), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("b68beb79-b454-4e13-8021-32457b767356"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(530), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("b6d7aae8-820f-486e-a2bc-1f950ae859ba"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(550), null, null, "home", "Home Services", "خدمات المنزل", null },
                    { new Guid("d69140d8-96de-4e1d-904b-bd7d1c79082a"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(540), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(60));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(60));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(60));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(60));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(60));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(60));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(50));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("1d4395a4-a042-4682-aac7-875628f33b1c"), "de", "German" },
                    { new Guid("6be4a19c-38b5-4488-8ce8-477346eb15df"), "fr", "French" },
                    { new Guid("77ab8490-7361-4836-995c-3fc4a2d29310"), "es", "Spanish" },
                    { new Guid("9789c9cc-671e-428e-b304-ae72f9aae37a"), "ru", "Russian" },
                    { new Guid("9ed1d857-c998-483d-b40c-547a52fbb6e1"), "ar", "Arabic" },
                    { new Guid("bf5159e9-0a83-4c57-a8a7-60849dac8617"), "hi", "Hindi" },
                    { new Guid("c9ec78b4-849a-4896-8228-c1b7a9ee75f6"), "pt", "Portuguese" },
                    { new Guid("d5103576-1070-44dd-b99a-ff5eabaebac5"), "ja", "Japanese" },
                    { new Guid("d7186d97-4dad-4a5a-968a-faa001fbec1c"), "en", "English" },
                    { new Guid("f7a96ef9-8920-4413-aa77-594d6805e7e8"), "zh", "Chinese" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("1a996719-0cfa-4356-b4f5-53c12646ef5c"), "Writing", "Technical Writing" },
                    { new Guid("1f3f668c-619c-493e-ad86-2ac32ad0920e"), "Programming", "Python" },
                    { new Guid("2b2d5e1e-d956-4e2f-a578-4720b5a5f640"), "Video & Animation", "Animation" },
                    { new Guid("2bd54558-2243-4ce3-85ae-8480d2a6b9a0"), "Design", "Graphic Design" },
                    { new Guid("33de08d9-191d-46c3-b7dd-a84765231eba"), "Programming", "Java" },
                    { new Guid("4c07c807-bbdd-450a-ab26-4fda45c0016f"), "Design", "Logo Design" },
                    { new Guid("4dc81588-4a1a-45bf-93f2-b255de91aec6"), "Business", "Business Consulting" },
                    { new Guid("4de1df5a-2407-4943-bdcc-beaee6572a86"), "Programming", "Node.js" },
                    { new Guid("58417f78-8760-4979-954d-10eacd8c0f3e"), "Marketing", "SEO" },
                    { new Guid("5e9f5eaf-0acc-495d-b9fc-bd77e4adcfd9"), "Design", "Adobe Illustrator" },
                    { new Guid("622aded3-a106-4c8e-8355-49b602194815"), "Programming", "C#" },
                    { new Guid("684d6452-ddbc-442c-960a-8918c1aa15dd"), "Design", "Figma" },
                    { new Guid("73dd18f9-d410-43b6-9147-2c4390e12a4b"), "Marketing", "Email Marketing" },
                    { new Guid("89eb04ca-abd9-414b-ba47-5f9eee5ae89a"), "Business", "Data Analysis" },
                    { new Guid("934c44b1-1084-4010-bf12-795443fa66b9"), "Programming", "Kotlin" },
                    { new Guid("9480036d-fc46-4e5e-88e5-53fd4bc586fc"), "Video & Animation", "After Effects" },
                    { new Guid("9674a2bb-8c2a-4b23-9a87-273abf661dce"), "Video & Animation", "Video Editing" },
                    { new Guid("a5985497-4a94-4032-b7e0-d8c0cd9b66cc"), "Programming", "Swift" },
                    { new Guid("aec94bf2-988a-4191-baab-9f1665a517d8"), "Marketing", "Social Media Marketing" },
                    { new Guid("b69db9f5-87d1-4c57-bcac-db2fa00255d9"), "Marketing", "Content Writing" },
                    { new Guid("bacdc122-71ac-4b2a-a6f0-5e0974452ce7"), "Marketing", "Digital Marketing" },
                    { new Guid("bc3120af-5d24-47af-88a8-9811730e5e9b"), "Design", "UI/UX Design" },
                    { new Guid("cd1706f8-f1f6-4a5d-be49-92b6f10a9fc0"), "Programming", "JavaScript" },
                    { new Guid("d629eb0b-7147-409e-96fc-a1e3404c8a78"), "Programming", "React" },
                    { new Guid("d9d77ab7-6fe7-4723-8a79-9d1b927b7e04"), "Programming", "Flutter" },
                    { new Guid("dc279327-5460-4888-9902-0b40da7b752a"), "Design", "3D Modeling" },
                    { new Guid("dc7a2834-d4a4-47ac-bd69-dca729a8f627"), "Programming", "TypeScript" },
                    { new Guid("f5c34d9d-1351-450b-8863-3e6b83aedd89"), "Writing", "Translation" },
                    { new Guid("fa8ab7ae-e625-48f6-977d-7a64e4c67bb6"), "Design", "Adobe Photoshop" },
                    { new Guid("fe946ec8-690b-4813-bb30-cfdc559771dd"), "Writing", "Copywriting" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("08bb5190-1521-4b88-a4af-f8ba542157ab"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(550), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("b68beb79-b454-4e13-8021-32457b767356") },
                    { new Guid("2f36d298-149e-4b1f-9bb8-252c0cf00b11"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(580), null, null, null, "AI Services", "خدمات الذكاء الاصطناعي", new Guid("1987d6fa-fb87-4733-b094-09e87d9f6b5e") },
                    { new Guid("5948db22-62ab-48b3-8a9c-c98766246952"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(600), null, null, null, "Moving", "نقل الأثاث", new Guid("b6d7aae8-820f-486e-a2bc-1f950ae859ba") },
                    { new Guid("62a541af-f34c-47d8-94db-712aa2a0b782"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(590), null, null, null, "Cleaning", "التنظيف", new Guid("b6d7aae8-820f-486e-a2bc-1f950ae859ba") },
                    { new Guid("92b09d3e-c4f1-4a75-a893-f31e3575b298"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(610), null, null, null, "Gardening", "تنسيق الحدائق", new Guid("b6d7aae8-820f-486e-a2bc-1f950ae859ba") },
                    { new Guid("a2a824cb-fddf-479d-8f9f-a9a7f1372774"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(600), null, null, null, "Handyman", "أعمال الصيانة", new Guid("b6d7aae8-820f-486e-a2bc-1f950ae859ba") },
                    { new Guid("b0b1541e-594d-4069-8577-afc707b76e4c"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(560), null, null, null, "Web Design", "تصميم المواقع", new Guid("b68beb79-b454-4e13-8021-32457b767356") },
                    { new Guid("eb65279c-a4cc-4c4c-acce-1da04e28b64e"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(560), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("b68beb79-b454-4e13-8021-32457b767356") },
                    { new Guid("f66545c3-d415-489d-84e5-808fa80e0402"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(570), null, null, null, "Web Development", "تطوير المواقع", new Guid("1987d6fa-fb87-4733-b094-09e87d9f6b5e") },
                    { new Guid("f8d79e09-4858-4423-9fb3-c01d09f14a29"), new DateTime(2026, 2, 17, 7, 8, 7, 831, DateTimeKind.Utc).AddTicks(580), null, null, null, "Mobile Apps", "تطبيقات الجوال", new Guid("1987d6fa-fb87-4733-b094-09e87d9f6b5e") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("08bb5190-1521-4b88-a4af-f8ba542157ab"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2d321e63-322a-42ca-b1c3-fdd09cbc545c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2f36d298-149e-4b1f-9bb8-252c0cf00b11"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5948db22-62ab-48b3-8a9c-c98766246952"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("62a541af-f34c-47d8-94db-712aa2a0b782"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("92b09d3e-c4f1-4a75-a893-f31e3575b298"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a2a824cb-fddf-479d-8f9f-a9a7f1372774"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b0b1541e-594d-4069-8577-afc707b76e4c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d69140d8-96de-4e1d-904b-bd7d1c79082a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("eb65279c-a4cc-4c4c-acce-1da04e28b64e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f66545c3-d415-489d-84e5-808fa80e0402"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f8d79e09-4858-4423-9fb3-c01d09f14a29"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("1d4395a4-a042-4682-aac7-875628f33b1c"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("6be4a19c-38b5-4488-8ce8-477346eb15df"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("77ab8490-7361-4836-995c-3fc4a2d29310"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("9789c9cc-671e-428e-b304-ae72f9aae37a"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("9ed1d857-c998-483d-b40c-547a52fbb6e1"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("bf5159e9-0a83-4c57-a8a7-60849dac8617"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("c9ec78b4-849a-4896-8228-c1b7a9ee75f6"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("d5103576-1070-44dd-b99a-ff5eabaebac5"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("d7186d97-4dad-4a5a-968a-faa001fbec1c"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("f7a96ef9-8920-4413-aa77-594d6805e7e8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1a996719-0cfa-4356-b4f5-53c12646ef5c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1f3f668c-619c-493e-ad86-2ac32ad0920e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2b2d5e1e-d956-4e2f-a578-4720b5a5f640"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2bd54558-2243-4ce3-85ae-8480d2a6b9a0"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("33de08d9-191d-46c3-b7dd-a84765231eba"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4c07c807-bbdd-450a-ab26-4fda45c0016f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4dc81588-4a1a-45bf-93f2-b255de91aec6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4de1df5a-2407-4943-bdcc-beaee6572a86"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("58417f78-8760-4979-954d-10eacd8c0f3e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("5e9f5eaf-0acc-495d-b9fc-bd77e4adcfd9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("622aded3-a106-4c8e-8355-49b602194815"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("684d6452-ddbc-442c-960a-8918c1aa15dd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("73dd18f9-d410-43b6-9147-2c4390e12a4b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("89eb04ca-abd9-414b-ba47-5f9eee5ae89a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("934c44b1-1084-4010-bf12-795443fa66b9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9480036d-fc46-4e5e-88e5-53fd4bc586fc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9674a2bb-8c2a-4b23-9a87-273abf661dce"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a5985497-4a94-4032-b7e0-d8c0cd9b66cc"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("aec94bf2-988a-4191-baab-9f1665a517d8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b69db9f5-87d1-4c57-bcac-db2fa00255d9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("bacdc122-71ac-4b2a-a6f0-5e0974452ce7"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("bc3120af-5d24-47af-88a8-9811730e5e9b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("cd1706f8-f1f6-4a5d-be49-92b6f10a9fc0"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d629eb0b-7147-409e-96fc-a1e3404c8a78"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d9d77ab7-6fe7-4723-8a79-9d1b927b7e04"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("dc279327-5460-4888-9902-0b40da7b752a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("dc7a2834-d4a4-47ac-bd69-dca729a8f627"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f5c34d9d-1351-450b-8863-3e6b83aedd89"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fa8ab7ae-e625-48f6-977d-7a64e4c67bb6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fe946ec8-690b-4813-bb30-cfdc559771dd"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1987d6fa-fb87-4733-b094-09e87d9f6b5e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b68beb79-b454-4e13-8021-32457b767356"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b6d7aae8-820f-486e-a2bc-1f950ae859ba"));

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("2c24a5be-48df-4564-b47d-6b7fa2165943"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(440), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("62396ff6-dd3b-46bf-b9ae-120ceccdbaf2"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(460), null, null, "home", "Home Services", "خدمات المنزل", null },
                    { new Guid("71eb5645-212c-4f11-b78a-a0276d2ea17e"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(450), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("88384db2-0bbf-44f8-b887-621dd28c8b7d"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(450), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("8d93de44-ea35-4bbc-b9a1-2a687d3388c1"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(450), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 13, 15, 34, 473, DateTimeKind.Utc).AddTicks(9960));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 13, 15, 34, 473, DateTimeKind.Utc).AddTicks(9970));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 13, 15, 34, 473, DateTimeKind.Utc).AddTicks(9970));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 13, 15, 34, 473, DateTimeKind.Utc).AddTicks(9970));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 13, 15, 34, 473, DateTimeKind.Utc).AddTicks(9970));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 13, 15, 34, 473, DateTimeKind.Utc).AddTicks(9960));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 16, 13, 15, 34, 473, DateTimeKind.Utc).AddTicks(9960));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("33ac6195-0990-4e8d-bbce-29ea6ca35a75"), "ar", "Arabic" },
                    { new Guid("68fa71be-4645-4610-9f54-44f3cb89b37d"), "de", "German" },
                    { new Guid("72b7810a-ee98-4b10-a352-a5dd01cf8a42"), "ru", "Russian" },
                    { new Guid("7e7248ef-f9a8-4427-8adc-3b85073326d0"), "es", "Spanish" },
                    { new Guid("97257379-f220-407a-8be2-5054e8419f77"), "fr", "French" },
                    { new Guid("a85b7a89-418e-458e-a634-34a425c5774b"), "hi", "Hindi" },
                    { new Guid("c59f2d3b-eff9-4835-a66c-7ef4bf094df8"), "zh", "Chinese" },
                    { new Guid("d7794c13-7539-4019-8473-982e9dd16097"), "en", "English" },
                    { new Guid("de705a6d-2f13-458d-82e2-2ccd43a2f329"), "ja", "Japanese" },
                    { new Guid("f5c82e93-1d9a-40c8-90f1-213270ce0b7d"), "pt", "Portuguese" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("040eb669-7ec3-4af2-a36e-81e032ce4c24"), "Marketing", "Content Writing" },
                    { new Guid("1d8b8668-aea7-4902-9163-c02a66e811b3"), "Design", "Graphic Design" },
                    { new Guid("1fd3d71a-b2dd-4b40-87e5-77194205fc14"), "Writing", "Technical Writing" },
                    { new Guid("293d071e-feb5-406f-8dd9-10493f189cb5"), "Design", "UI/UX Design" },
                    { new Guid("29bbf5e9-b3e4-4493-9193-1b8897c471da"), "Marketing", "Email Marketing" },
                    { new Guid("2a7e3051-61eb-4be9-80dc-30a819c07aab"), "Programming", "JavaScript" },
                    { new Guid("36154402-fdae-4ba8-bfd0-0c28775935c4"), "Design", "Logo Design" },
                    { new Guid("43b231ed-a2f2-4c5e-8c30-ccde856d9df7"), "Writing", "Copywriting" },
                    { new Guid("43d55dd5-911a-489f-82bf-956d1b587c7d"), "Programming", "Kotlin" },
                    { new Guid("4c968f5c-6bac-4d07-ac6c-4b028b662cb1"), "Programming", "Swift" },
                    { new Guid("61701521-83d4-4b50-a27e-1b08c488f27d"), "Marketing", "Social Media Marketing" },
                    { new Guid("659dfe69-279e-4de6-b03f-ed9501031247"), "Business", "Business Consulting" },
                    { new Guid("674a3274-08a2-4274-b14a-ea9be59e34a3"), "Programming", "C#" },
                    { new Guid("75a7cf47-1a35-4833-a766-13ded328b5ad"), "Marketing", "SEO" },
                    { new Guid("7bc68723-ca4f-451a-94c4-ce97296f1b14"), "Programming", "TypeScript" },
                    { new Guid("7d4dc021-01f8-4f72-ab35-e85ce023d1e4"), "Video & Animation", "Video Editing" },
                    { new Guid("812e7be1-5c59-43f9-a767-1b1a16735c57"), "Programming", "Node.js" },
                    { new Guid("922e2cbb-5590-4e07-9983-80e7b05a7f94"), "Design", "Adobe Illustrator" },
                    { new Guid("abb43eaa-c04d-43fb-b9d4-19ec609ab248"), "Business", "Data Analysis" },
                    { new Guid("b20d4152-c653-4e47-a3fe-61d5d66e32bc"), "Programming", "Flutter" },
                    { new Guid("b37f7fe0-7c4b-494c-b1e9-a97af8f79816"), "Programming", "React" },
                    { new Guid("c7fbd7e0-b3a8-4a59-8376-1801ffb631fd"), "Design", "3D Modeling" },
                    { new Guid("d0e089c8-aeda-4686-b6f5-61279d352185"), "Marketing", "Digital Marketing" },
                    { new Guid("d9f7b615-ddcd-4539-9d8f-aba1f8098f08"), "Video & Animation", "Animation" },
                    { new Guid("da19045d-1a50-4c9c-b8c8-d3a7f58353eb"), "Design", "Figma" },
                    { new Guid("de3f0b4d-71c0-40b6-a4da-d4e054752894"), "Programming", "Java" },
                    { new Guid("e46ebf19-eb18-4755-bd16-d3f20ae10c85"), "Writing", "Translation" },
                    { new Guid("e4c50e60-22ad-4914-be82-7a937aeace9f"), "Video & Animation", "After Effects" },
                    { new Guid("ecd0af05-6629-472e-92a9-4530895b56ba"), "Design", "Adobe Photoshop" },
                    { new Guid("f7504825-d58d-4ddb-8d45-c0b9ba76858a"), "Programming", "Python" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("149c280e-cd4d-433d-a5c1-2849566f4e15"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(510), null, null, null, "Handyman", "أعمال الصيانة", new Guid("62396ff6-dd3b-46bf-b9ae-120ceccdbaf2") },
                    { new Guid("263bcf0a-72db-4cf5-802c-54a88422a015"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(470), null, null, null, "Web Design", "تصميم المواقع", new Guid("2c24a5be-48df-4564-b47d-6b7fa2165943") },
                    { new Guid("356dcd5d-edf2-4ca7-97dd-c75e965a5464"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(480), null, null, null, "Web Development", "تطوير المواقع", new Guid("88384db2-0bbf-44f8-b887-621dd28c8b7d") },
                    { new Guid("56ca8261-f754-4a51-81e6-8a61710a3c79"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(470), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("2c24a5be-48df-4564-b47d-6b7fa2165943") },
                    { new Guid("669aace8-2b55-4d05-8232-83eb1b721951"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(520), null, null, null, "Moving", "نقل الأثاث", new Guid("62396ff6-dd3b-46bf-b9ae-120ceccdbaf2") },
                    { new Guid("9633fb93-81f0-452c-bd3b-2979a4626213"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(500), null, null, null, "Cleaning", "التنظيف", new Guid("62396ff6-dd3b-46bf-b9ae-120ceccdbaf2") },
                    { new Guid("9ef9356b-83a5-4356-b1a5-70e1fe10a3b9"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(460), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("2c24a5be-48df-4564-b47d-6b7fa2165943") },
                    { new Guid("a3b77d05-5e81-483b-91ae-2bed9cc0a54d"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(500), null, null, null, "AI Services", "خدمات الذكاء الاصطناعي", new Guid("88384db2-0bbf-44f8-b887-621dd28c8b7d") },
                    { new Guid("d4eafd38-bd26-4946-800d-7c9f9693c9cb"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(490), null, null, null, "Mobile Apps", "تطبيقات الجوال", new Guid("88384db2-0bbf-44f8-b887-621dd28c8b7d") },
                    { new Guid("e2387fab-a208-4d0f-bfcb-0d574d08d860"), new DateTime(2026, 2, 16, 13, 15, 34, 474, DateTimeKind.Utc).AddTicks(520), null, null, null, "Gardening", "تنسيق الحدائق", new Guid("62396ff6-dd3b-46bf-b9ae-120ceccdbaf2") }
                });
        }
    }
}
