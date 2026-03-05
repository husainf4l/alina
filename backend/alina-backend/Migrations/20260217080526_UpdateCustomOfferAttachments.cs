using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCustomOfferAttachments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("51a0a5bc-0601-4cd1-b3a2-d3b2d7354c8a"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3750), null, null, "home", "Home Services", "خدمات المنزل", null },
                    { new Guid("87013797-7602-4939-80f7-a1e057bd31fd"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3750), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("b8541b9f-ff51-4647-958d-67ce311ad0ff"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3740), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("d285d3bc-cf1b-4ff4-81a8-f021f5875373"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3740), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("de077909-8a5f-4ab1-979a-ff460ae3e487"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3750), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3190));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3190));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3190));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3190));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3190));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3190));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3180));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("053505e7-caa1-4d35-91db-b7dc14bf955d"), "hi", "Hindi" },
                    { new Guid("1c052f91-dac6-48ce-b1b3-b4b4f3548b99"), "ar", "Arabic" },
                    { new Guid("21820034-fc00-4f48-8bc6-c2e8821801c9"), "ru", "Russian" },
                    { new Guid("2d253003-c6e1-49d8-9e40-04b161bb446b"), "zh", "Chinese" },
                    { new Guid("39e6216b-9bde-4f36-9bc3-4b0895090cb9"), "ja", "Japanese" },
                    { new Guid("733cda4f-bedc-4ce1-95b9-43daff090297"), "pt", "Portuguese" },
                    { new Guid("85d3dd0e-1eb6-4df0-9f88-d6653556596b"), "de", "German" },
                    { new Guid("c7f93ef2-46a9-4000-b487-bd091e2cc08b"), "es", "Spanish" },
                    { new Guid("e0593158-1e45-4c63-bd36-8c9997fc8903"), "en", "English" },
                    { new Guid("e67abf33-f09b-4202-9b3f-9ab084cb83c0"), "fr", "French" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("04f2f7c9-578d-4392-bb6b-9e58a3947038"), "Marketing", "SEO" },
                    { new Guid("0b17ba05-4a8f-4241-be7d-b88c8f80ca0c"), "Business", "Business Consulting" },
                    { new Guid("0c018b5b-3286-4533-a0dd-9664226bc6db"), "Programming", "TypeScript" },
                    { new Guid("0c900d02-e569-4623-a16a-494113fc7da9"), "Marketing", "Email Marketing" },
                    { new Guid("17a65e40-9bba-4899-9daf-21da5e801e3d"), "Programming", "React" },
                    { new Guid("1e017769-4c7e-40ed-b7f8-7fa5b8b0e134"), "Programming", "JavaScript" },
                    { new Guid("2392b60b-76db-459c-bb3a-e003fbc19c15"), "Design", "Adobe Illustrator" },
                    { new Guid("2a5297b4-a977-4e04-8e04-fb897320e7f1"), "Business", "Data Analysis" },
                    { new Guid("32897b17-18d2-4ca8-a2fc-7ddf94768e82"), "Design", "Adobe Photoshop" },
                    { new Guid("4ca0678a-7c15-470e-aeb4-46ace6c0000c"), "Writing", "Translation" },
                    { new Guid("58be5bdb-cedc-406e-a2c5-3dc7c7fbec53"), "Video & Animation", "After Effects" },
                    { new Guid("5c1e3119-7ac6-4e9b-9147-84d414d62500"), "Programming", "Flutter" },
                    { new Guid("646c2db4-f9e6-43b0-a902-49a30a344e92"), "Marketing", "Social Media Marketing" },
                    { new Guid("7375e22f-0475-4edf-b901-dff9f8ab829d"), "Programming", "C#" },
                    { new Guid("73fb92ae-9a66-431b-a6f5-5b6cbee4f569"), "Design", "3D Modeling" },
                    { new Guid("7c650c25-df0b-4a23-a8d0-52199bf53004"), "Marketing", "Digital Marketing" },
                    { new Guid("81f835bc-32dc-4675-a370-8c95f5141739"), "Writing", "Technical Writing" },
                    { new Guid("917e75cf-4363-4e72-91b4-7a78b6999f1b"), "Design", "Logo Design" },
                    { new Guid("9cd93b38-221f-457b-a5b8-ca43c2ddc451"), "Programming", "Python" },
                    { new Guid("9d316d31-47e5-4c92-918f-87926dbeeeb2"), "Programming", "Node.js" },
                    { new Guid("9f2e1b75-6e7b-4a75-91d4-47b69ebb2e77"), "Marketing", "Content Writing" },
                    { new Guid("a168514f-2a24-4cc7-942c-e5e62ce18614"), "Programming", "Java" },
                    { new Guid("b498c526-8ac7-49e9-903e-e97184bda7e2"), "Design", "Figma" },
                    { new Guid("bbc962dd-abf7-4fb5-9f5e-1a75fc6727bb"), "Programming", "Swift" },
                    { new Guid("c429373d-f469-43a2-a071-514799d283e9"), "Design", "UI/UX Design" },
                    { new Guid("d0e393c7-23de-44ea-9084-9f9091816fad"), "Programming", "Kotlin" },
                    { new Guid("d3cfc84e-0623-48f0-b6f4-75a546fb88f8"), "Video & Animation", "Video Editing" },
                    { new Guid("d6ee631d-cd93-4425-b156-6f20b8c4cf43"), "Writing", "Copywriting" },
                    { new Guid("d717e887-a886-4919-961e-f81a88ac0c96"), "Video & Animation", "Animation" },
                    { new Guid("fa47d805-0a5c-447d-a001-e270b4cd035d"), "Design", "Graphic Design" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("15b5bd57-d715-425b-ac79-919e7d20b060"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3810), null, null, null, "Moving", "نقل الأثاث", new Guid("51a0a5bc-0601-4cd1-b3a2-d3b2d7354c8a") },
                    { new Guid("30d27215-6a86-433f-bc8c-2562ba5fc626"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3820), null, null, null, "Gardening", "تنسيق الحدائق", new Guid("51a0a5bc-0601-4cd1-b3a2-d3b2d7354c8a") },
                    { new Guid("409cc8ff-ea73-4285-80ca-bab598dacdea"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3800), null, null, null, "Cleaning", "التنظيف", new Guid("51a0a5bc-0601-4cd1-b3a2-d3b2d7354c8a") },
                    { new Guid("43463f64-f77a-4ab3-86ee-dc4cfdca58f3"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3810), null, null, null, "Handyman", "أعمال الصيانة", new Guid("51a0a5bc-0601-4cd1-b3a2-d3b2d7354c8a") },
                    { new Guid("827fb46c-4944-402f-be28-e23319506970"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3790), null, null, null, "AI Services", "خدمات الذكاء الاصطناعي", new Guid("d285d3bc-cf1b-4ff4-81a8-f021f5875373") },
                    { new Guid("863abcdb-7567-476d-ad30-cd792d746c65"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3770), null, null, null, "Web Design", "تصميم المواقع", new Guid("b8541b9f-ff51-4647-958d-67ce311ad0ff") },
                    { new Guid("8f692628-c815-4cab-b2c9-f4e6ee4dd8f9"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3770), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("b8541b9f-ff51-4647-958d-67ce311ad0ff") },
                    { new Guid("b4cff0e6-2be8-4fe2-9af4-b33fcf24d81f"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3790), null, null, null, "Mobile Apps", "تطبيقات الجوال", new Guid("d285d3bc-cf1b-4ff4-81a8-f021f5875373") },
                    { new Guid("d34a1c80-6595-4669-8625-b86d12515145"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3780), null, null, null, "Web Development", "تطوير المواقع", new Guid("d285d3bc-cf1b-4ff4-81a8-f021f5875373") },
                    { new Guid("fd222e6a-8fd1-489a-8e1a-bb975fa6012d"), new DateTime(2026, 2, 17, 8, 5, 25, 896, DateTimeKind.Utc).AddTicks(3760), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("b8541b9f-ff51-4647-958d-67ce311ad0ff") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("15b5bd57-d715-425b-ac79-919e7d20b060"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("30d27215-6a86-433f-bc8c-2562ba5fc626"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("409cc8ff-ea73-4285-80ca-bab598dacdea"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("43463f64-f77a-4ab3-86ee-dc4cfdca58f3"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("827fb46c-4944-402f-be28-e23319506970"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("863abcdb-7567-476d-ad30-cd792d746c65"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("87013797-7602-4939-80f7-a1e057bd31fd"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8f692628-c815-4cab-b2c9-f4e6ee4dd8f9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b4cff0e6-2be8-4fe2-9af4-b33fcf24d81f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d34a1c80-6595-4669-8625-b86d12515145"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("de077909-8a5f-4ab1-979a-ff460ae3e487"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("fd222e6a-8fd1-489a-8e1a-bb975fa6012d"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("053505e7-caa1-4d35-91db-b7dc14bf955d"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("1c052f91-dac6-48ce-b1b3-b4b4f3548b99"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("21820034-fc00-4f48-8bc6-c2e8821801c9"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("2d253003-c6e1-49d8-9e40-04b161bb446b"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("39e6216b-9bde-4f36-9bc3-4b0895090cb9"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("733cda4f-bedc-4ce1-95b9-43daff090297"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("85d3dd0e-1eb6-4df0-9f88-d6653556596b"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("c7f93ef2-46a9-4000-b487-bd091e2cc08b"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("e0593158-1e45-4c63-bd36-8c9997fc8903"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("e67abf33-f09b-4202-9b3f-9ab084cb83c0"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("04f2f7c9-578d-4392-bb6b-9e58a3947038"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("0b17ba05-4a8f-4241-be7d-b88c8f80ca0c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("0c018b5b-3286-4533-a0dd-9664226bc6db"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("0c900d02-e569-4623-a16a-494113fc7da9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("17a65e40-9bba-4899-9daf-21da5e801e3d"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1e017769-4c7e-40ed-b7f8-7fa5b8b0e134"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2392b60b-76db-459c-bb3a-e003fbc19c15"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("2a5297b4-a977-4e04-8e04-fb897320e7f1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("32897b17-18d2-4ca8-a2fc-7ddf94768e82"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4ca0678a-7c15-470e-aeb4-46ace6c0000c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("58be5bdb-cedc-406e-a2c5-3dc7c7fbec53"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("5c1e3119-7ac6-4e9b-9147-84d414d62500"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("646c2db4-f9e6-43b0-a902-49a30a344e92"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7375e22f-0475-4edf-b901-dff9f8ab829d"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("73fb92ae-9a66-431b-a6f5-5b6cbee4f569"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7c650c25-df0b-4a23-a8d0-52199bf53004"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("81f835bc-32dc-4675-a370-8c95f5141739"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("917e75cf-4363-4e72-91b4-7a78b6999f1b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9cd93b38-221f-457b-a5b8-ca43c2ddc451"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9d316d31-47e5-4c92-918f-87926dbeeeb2"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9f2e1b75-6e7b-4a75-91d4-47b69ebb2e77"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a168514f-2a24-4cc7-942c-e5e62ce18614"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b498c526-8ac7-49e9-903e-e97184bda7e2"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("bbc962dd-abf7-4fb5-9f5e-1a75fc6727bb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c429373d-f469-43a2-a071-514799d283e9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d0e393c7-23de-44ea-9084-9f9091816fad"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d3cfc84e-0623-48f0-b6f4-75a546fb88f8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d6ee631d-cd93-4425-b156-6f20b8c4cf43"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d717e887-a886-4919-961e-f81a88ac0c96"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fa47d805-0a5c-447d-a001-e270b4cd035d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("51a0a5bc-0601-4cd1-b3a2-d3b2d7354c8a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b8541b9f-ff51-4647-958d-67ce311ad0ff"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d285d3bc-cf1b-4ff4-81a8-f021f5875373"));

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
    }
}
