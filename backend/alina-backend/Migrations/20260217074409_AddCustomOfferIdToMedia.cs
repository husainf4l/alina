using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomOfferIdToMedia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<Guid>(
                name: "CustomOfferId",
                table: "Media",
                type: "uuid",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("2698ce91-4358-47da-a35a-27ade6438847"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6370), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("798ca124-8291-4f5c-8a06-1c2dc53f271e"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6380), null, null, "home", "Home Services", "خدمات المنزل", null },
                    { new Guid("c7285295-07bb-46f4-94cb-48d3f546bae8"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6380), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("d990efbe-11db-4864-b89d-8e40998cd99f"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6370), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("ee112f02-7c1d-4203-9441-54d0bd6e12f1"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6380), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(5890));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(5890));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(5890));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(5890));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(5890));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(5890));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(5890));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("0cd400d4-953c-4d78-852d-1fd0711eea36"), "es", "Spanish" },
                    { new Guid("155ed8cd-a8be-425b-96e0-ff456053eb49"), "hi", "Hindi" },
                    { new Guid("332b5229-629f-46f1-80d6-81084d502f3c"), "pt", "Portuguese" },
                    { new Guid("3f03ce3d-a75e-450a-b702-ae0f6c2195a2"), "fr", "French" },
                    { new Guid("5674634a-3a02-4572-b7d2-e244a21726f4"), "ja", "Japanese" },
                    { new Guid("729e6a81-a475-4c01-8898-cb31f2ba42d7"), "zh", "Chinese" },
                    { new Guid("72b3ee9c-fcb2-411b-afea-2b666b232642"), "en", "English" },
                    { new Guid("82c80b94-12f8-4695-b345-ae947f2a676c"), "de", "German" },
                    { new Guid("ac290777-27da-40bc-b100-b693f0a199e0"), "ar", "Arabic" },
                    { new Guid("da246ef2-a634-4c13-bb60-f5118050a935"), "ru", "Russian" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("020d79f6-cedc-48d2-ba76-2c8c1e68d2f9"), "Programming", "Python" },
                    { new Guid("1b85d865-8ae9-4139-9955-5227a07a8e4c"), "Writing", "Translation" },
                    { new Guid("1bb0f897-4872-422e-97f6-83627107897e"), "Writing", "Technical Writing" },
                    { new Guid("1daa2649-ad98-44fa-8235-c8c1a160f45a"), "Business", "Business Consulting" },
                    { new Guid("2426b1fa-39f8-4d0b-b65f-72764c744a0c"), "Programming", "JavaScript" },
                    { new Guid("28897e2c-e197-48f3-b345-4eaa1062692a"), "Video & Animation", "After Effects" },
                    { new Guid("2ac02d0f-0df5-4b53-9641-8e267477bb95"), "Design", "Logo Design" },
                    { new Guid("311f12f1-312e-48db-93ed-699410d18425"), "Marketing", "Digital Marketing" },
                    { new Guid("36c3a59c-e03b-4d52-8a94-eca9bd76538e"), "Business", "Data Analysis" },
                    { new Guid("38d56d07-7d21-4097-addc-65086878d75a"), "Programming", "Java" },
                    { new Guid("3e915f64-0d66-4003-83e0-f3bfceaf4a9f"), "Programming", "Kotlin" },
                    { new Guid("440ee410-eee8-4eb7-b14a-36148735f955"), "Marketing", "Email Marketing" },
                    { new Guid("4b087ef6-d768-406c-b93a-53c7d259ca4d"), "Writing", "Copywriting" },
                    { new Guid("4dceeb7b-861f-4545-9c2a-13db37eed448"), "Design", "Adobe Illustrator" },
                    { new Guid("4dfb0e14-16d5-451e-a429-6d84bd6101fe"), "Design", "3D Modeling" },
                    { new Guid("4fad995f-a21e-4f85-a23e-9e0cf3be2994"), "Video & Animation", "Animation" },
                    { new Guid("6401e11d-6ae1-495a-bc57-95fdc11d2a7d"), "Marketing", "Content Writing" },
                    { new Guid("8c260b7e-b68b-4654-a33a-b74d8994249a"), "Marketing", "Social Media Marketing" },
                    { new Guid("8efb53f4-ca7a-42b2-8e96-9d2cc9644db7"), "Design", "Adobe Photoshop" },
                    { new Guid("9002d604-e751-4257-8b7a-feca685c0ad4"), "Programming", "Node.js" },
                    { new Guid("90d2283d-29b0-4d32-88cb-3fc364f7ca76"), "Design", "Figma" },
                    { new Guid("99b3dd6a-fa29-4ae5-805a-34a4267b6308"), "Programming", "C#" },
                    { new Guid("9ab06298-86ce-4feb-a714-f5846e2155dd"), "Design", "Graphic Design" },
                    { new Guid("9acfb071-d35a-464d-b579-3ecaaffcc8b3"), "Programming", "Swift" },
                    { new Guid("a6908d44-4585-4479-b50b-5567787e5dd3"), "Marketing", "SEO" },
                    { new Guid("c6916a7f-08f9-485e-9712-f022e21e5572"), "Video & Animation", "Video Editing" },
                    { new Guid("d1064750-b9ff-4797-875f-8debf9abf3ed"), "Design", "UI/UX Design" },
                    { new Guid("d7477f04-1a64-4a6d-ba70-2b9af38b4974"), "Programming", "React" },
                    { new Guid("e384b962-34e9-43fd-848e-5de19942714a"), "Programming", "Flutter" },
                    { new Guid("f3c4aff4-5063-4f08-872c-686e7e3323e6"), "Programming", "TypeScript" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("3eb51053-5c8f-4873-88b0-f94139f1d4bb"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6390), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("2698ce91-4358-47da-a35a-27ade6438847") },
                    { new Guid("66360125-3e54-4d34-bfe7-2d13a700b9f8"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6450), null, null, null, "Gardening", "تنسيق الحدائق", new Guid("798ca124-8291-4f5c-8a06-1c2dc53f271e") },
                    { new Guid("68902e55-4bbd-42cb-86a1-8ead3a9bd18d"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6430), null, null, null, "Handyman", "أعمال الصيانة", new Guid("798ca124-8291-4f5c-8a06-1c2dc53f271e") },
                    { new Guid("6b8887de-3519-48b4-91ba-61e9b894ef2f"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6440), null, null, null, "Moving", "نقل الأثاث", new Guid("798ca124-8291-4f5c-8a06-1c2dc53f271e") },
                    { new Guid("780f7b68-8caf-4a72-93c7-c67e326fa58b"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6400), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("2698ce91-4358-47da-a35a-27ade6438847") },
                    { new Guid("b39df55e-0500-4a84-8d61-864cbdb24ffc"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6430), null, null, null, "Cleaning", "التنظيف", new Guid("798ca124-8291-4f5c-8a06-1c2dc53f271e") },
                    { new Guid("d4b0eb04-5117-4e62-a882-f348a4c280f5"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6390), null, null, null, "Web Design", "تصميم المواقع", new Guid("2698ce91-4358-47da-a35a-27ade6438847") },
                    { new Guid("df6f2b80-2761-4197-9374-85e1b61a751f"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6410), null, null, null, "Web Development", "تطوير المواقع", new Guid("d990efbe-11db-4864-b89d-8e40998cd99f") },
                    { new Guid("ed70ae7f-b3ae-452f-bf3d-a1267c7e0041"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6420), null, null, null, "AI Services", "خدمات الذكاء الاصطناعي", new Guid("d990efbe-11db-4864-b89d-8e40998cd99f") },
                    { new Guid("f7cc3e16-00a1-427d-a1c2-bcd47c7eac66"), new DateTime(2026, 2, 17, 7, 44, 9, 320, DateTimeKind.Utc).AddTicks(6410), null, null, null, "Mobile Apps", "تطبيقات الجوال", new Guid("d990efbe-11db-4864-b89d-8e40998cd99f") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3eb51053-5c8f-4873-88b0-f94139f1d4bb"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("66360125-3e54-4d34-bfe7-2d13a700b9f8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("68902e55-4bbd-42cb-86a1-8ead3a9bd18d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("6b8887de-3519-48b4-91ba-61e9b894ef2f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("780f7b68-8caf-4a72-93c7-c67e326fa58b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b39df55e-0500-4a84-8d61-864cbdb24ffc"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c7285295-07bb-46f4-94cb-48d3f546bae8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d4b0eb04-5117-4e62-a882-f348a4c280f5"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("df6f2b80-2761-4197-9374-85e1b61a751f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ed70ae7f-b3ae-452f-bf3d-a1267c7e0041"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ee112f02-7c1d-4203-9441-54d0bd6e12f1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f7cc3e16-00a1-427d-a1c2-bcd47c7eac66"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("0cd400d4-953c-4d78-852d-1fd0711eea36"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("155ed8cd-a8be-425b-96e0-ff456053eb49"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("332b5229-629f-46f1-80d6-81084d502f3c"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("3f03ce3d-a75e-450a-b702-ae0f6c2195a2"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("5674634a-3a02-4572-b7d2-e244a21726f4"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("729e6a81-a475-4c01-8898-cb31f2ba42d7"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("72b3ee9c-fcb2-411b-afea-2b666b232642"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("82c80b94-12f8-4695-b345-ae947f2a676c"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("ac290777-27da-40bc-b100-b693f0a199e0"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("da246ef2-a634-4c13-bb60-f5118050a935"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("020d79f6-cedc-48d2-ba76-2c8c1e68d2f9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1b85d865-8ae9-4139-9955-5227a07a8e4c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1bb0f897-4872-422e-97f6-83627107897e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1daa2649-ad98-44fa-8235-c8c1a160f45a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2426b1fa-39f8-4d0b-b65f-72764c744a0c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("28897e2c-e197-48f3-b345-4eaa1062692a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2ac02d0f-0df5-4b53-9641-8e267477bb95"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("311f12f1-312e-48db-93ed-699410d18425"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("36c3a59c-e03b-4d52-8a94-eca9bd76538e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("38d56d07-7d21-4097-addc-65086878d75a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3e915f64-0d66-4003-83e0-f3bfceaf4a9f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("440ee410-eee8-4eb7-b14a-36148735f955"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4b087ef6-d768-406c-b93a-53c7d259ca4d"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4dceeb7b-861f-4545-9c2a-13db37eed448"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4dfb0e14-16d5-451e-a429-6d84bd6101fe"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4fad995f-a21e-4f85-a23e-9e0cf3be2994"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6401e11d-6ae1-495a-bc57-95fdc11d2a7d"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8c260b7e-b68b-4654-a33a-b74d8994249a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8efb53f4-ca7a-42b2-8e96-9d2cc9644db7"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9002d604-e751-4257-8b7a-feca685c0ad4"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("90d2283d-29b0-4d32-88cb-3fc364f7ca76"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("99b3dd6a-fa29-4ae5-805a-34a4267b6308"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9ab06298-86ce-4feb-a714-f5846e2155dd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9acfb071-d35a-464d-b579-3ecaaffcc8b3"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a6908d44-4585-4479-b50b-5567787e5dd3"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c6916a7f-08f9-485e-9712-f022e21e5572"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d1064750-b9ff-4797-875f-8debf9abf3ed"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d7477f04-1a64-4a6d-ba70-2b9af38b4974"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e384b962-34e9-43fd-848e-5de19942714a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f3c4aff4-5063-4f08-872c-686e7e3323e6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2698ce91-4358-47da-a35a-27ade6438847"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("798ca124-8291-4f5c-8a06-1c2dc53f271e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d990efbe-11db-4864-b89d-8e40998cd99f"));

            migrationBuilder.DropColumn(
                name: "CustomOfferId",
                table: "Media");

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
    }
}
