using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddPlatformFeeAndSellerAmountToOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<string>(
                name: "CancellationReason",
                table: "Orders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CancelledAt",
                table: "Orders",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PlatformFee",
                table: "Orders",
                type: "numeric(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SellerAmount",
                table: "Orders",
                type: "numeric(18,2)",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "CancellationReason",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CancelledAt",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PlatformFee",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SellerAmount",
                table: "Orders");

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
        }
    }
}
