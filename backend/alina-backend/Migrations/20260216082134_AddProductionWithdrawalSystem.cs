using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddProductionWithdrawalSystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "RejectionReason",
                table: "WithdrawalRequests",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PendingWithdrawal",
                table: "Wallets",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "SellerLevel",
                table: "Profiles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReleasedAt",
                table: "Orders",
                type: "timestamp with time zone",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "RejectionReason",
                table: "WithdrawalRequests");

            migrationBuilder.DropColumn(
                name: "PendingWithdrawal",
                table: "Wallets");

            migrationBuilder.DropColumn(
                name: "SellerLevel",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "ReleasedAt",
                table: "Orders");

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
    }
}
