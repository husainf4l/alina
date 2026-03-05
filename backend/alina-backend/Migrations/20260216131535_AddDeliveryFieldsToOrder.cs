using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddDeliveryFieldsToOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<List<string>>(
                name: "AttachmentUrls",
                table: "Orders",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryMessage",
                table: "Orders",
                type: "text",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "AttachmentUrls",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryMessage",
                table: "Orders");

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
        }
    }
}
