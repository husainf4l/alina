using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddComprehensiveCategoryStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Attachments",
                table: "CustomOffers");

            // Drop and recreate CustomOfferId with correct type (int instead of Guid)
            migrationBuilder.DropColumn(
                name: "CustomOfferId",
                table: "Media");

            migrationBuilder.AddColumn<int>(
                name: "CustomOfferId",
                table: "Media",
                type: "integer",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8920), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8910), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("376074de-6e08-4265-9924-9932f7759626"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8920), null, null, "music_note", "Music & Audio", "الموسيقى والصوتيات", null },
                    { new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8910), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("a73396fe-29d6-499c-893e-22094d98ba80"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8910), null, null, "trending_up", "Digital Marketing", "التسويق الرقمي", null },
                    { new Guid("a831e920-e480-4569-b319-84e3e859ac9d"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8920), null, null, "business", "Business Services", "الخدمات التجارية", null },
                    { new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8900), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("e521c550-82db-4538-9ea4-b812e6596cf1"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8930), null, null, "self_improvement", "Lifestyle & Coaching", "نمط الحياة والتدريب", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8420));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8430));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8420));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8420));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8430));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8420));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8420));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("129cb6f2-4717-4879-861f-f018d0522700"), "es", "Spanish" },
                    { new Guid("12ec1336-eb3e-430e-8f27-7b47b10ed77c"), "fr", "French" },
                    { new Guid("3f2e54c0-ee8a-4bf3-aa0f-4e509721bcf0"), "ru", "Russian" },
                    { new Guid("468d1af3-aecc-4998-8dda-eb4cbdf50e52"), "de", "German" },
                    { new Guid("604770d4-4406-4350-8df0-988db0bbad65"), "zh", "Chinese" },
                    { new Guid("84290f07-0603-4259-b957-513aac135c24"), "hi", "Hindi" },
                    { new Guid("af6fcf4a-a5f7-4815-872a-0dd884878f3f"), "ar", "Arabic" },
                    { new Guid("b6d2b81c-db70-4492-a51d-841176d9c155"), "pt", "Portuguese" },
                    { new Guid("bcdfb73c-a157-4cb7-ab1f-efa56a3efd13"), "ja", "Japanese" },
                    { new Guid("d8b5a8e6-d033-4b7e-82ff-470d03d6eb49"), "en", "English" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("0557a54f-0ad6-428c-ab9d-ef4318708118"), "Video & Animation", "Video Editing" },
                    { new Guid("055c2963-09bd-4035-b56e-2c9aa54de537"), "Programming", "React" },
                    { new Guid("05aa9ea4-5ea0-4cfe-ae4f-f19d71cdc95c"), "Programming", "Kotlin" },
                    { new Guid("089cae6f-3ed7-4638-b46f-9519fa067848"), "Programming", "Java" },
                    { new Guid("0eadd30c-2d1a-4a49-bce3-22fb5d87375f"), "Design", "Adobe Illustrator" },
                    { new Guid("1af5b112-a8ff-4b09-b123-48b6a455e3c8"), "Marketing", "Email Marketing" },
                    { new Guid("29f07305-2e88-435b-ac72-0047e50b7fd6"), "Business", "Data Analysis" },
                    { new Guid("3cdfa400-6a7a-4d04-a16a-fdfb793f2fd1"), "Design", "Graphic Design" },
                    { new Guid("41dc7bea-d282-4186-98c3-5a8de04e74c6"), "Marketing", "Social Media Marketing" },
                    { new Guid("422fcdb1-21c4-418c-bf5b-050a2e4ac143"), "Programming", "C#" },
                    { new Guid("48a9314e-fe06-4991-baf8-2d431b699b07"), "Programming", "TypeScript" },
                    { new Guid("48c6175a-be29-4188-8eba-47f8ab0d6489"), "Marketing", "Digital Marketing" },
                    { new Guid("4d5a6e17-8dd6-427a-bb7c-471e1ceedf31"), "Writing", "Translation" },
                    { new Guid("51d6983d-3058-448a-a90d-a97ef5619661"), "Design", "Logo Design" },
                    { new Guid("646ecd62-bd30-4809-8cdc-87b7b94bef1e"), "Programming", "Node.js" },
                    { new Guid("6dbf259e-9bd5-49e2-8aa1-e4024b585e90"), "Business", "Business Consulting" },
                    { new Guid("6e2393a6-d1e8-4f95-81dd-a86c42a392d1"), "Programming", "JavaScript" },
                    { new Guid("72a33aa9-8a65-428e-8334-aa9faf75482b"), "Video & Animation", "Animation" },
                    { new Guid("7c747f44-1805-4e8d-a3c0-f337d6529f72"), "Design", "Adobe Photoshop" },
                    { new Guid("82d20169-3815-4e01-a6ea-878fc92a75b4"), "Design", "Figma" },
                    { new Guid("89fa3ae4-2326-4366-9305-180680f225bf"), "Marketing", "Content Writing" },
                    { new Guid("8bfddbe5-2c89-4461-9d5e-c34575b3d715"), "Programming", "Python" },
                    { new Guid("8c40371c-1b33-46f9-af2d-d3c03f7f8473"), "Design", "UI/UX Design" },
                    { new Guid("8ed135e4-37c0-47a5-bbc5-9219daa4c0d1"), "Marketing", "SEO" },
                    { new Guid("99869206-fa9d-41e8-a6ee-b30622dfd577"), "Programming", "Swift" },
                    { new Guid("b7912454-aaed-4102-81ad-dbffd9dbafdb"), "Writing", "Copywriting" },
                    { new Guid("c4d0a4c6-6505-4c3b-8a57-28eb8a9f2a77"), "Design", "3D Modeling" },
                    { new Guid("d0425e6e-8cde-4e45-95f7-094496c68deb"), "Writing", "Technical Writing" },
                    { new Guid("d2971dac-65c7-48ca-ae19-35397a9c4834"), "Video & Animation", "After Effects" },
                    { new Guid("ff5ea79f-e511-4a52-8fd7-d22744432874"), "Programming", "Flutter" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("0a68ca0b-a3f3-406d-ba7a-a0e0463d8f75"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9060), null, null, null, "Social Media Marketing", "التسويق عبر وسائل التواصل الاجتماعي", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("0c2e550e-b1b1-4021-80a6-b911cd1d6081"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9260), null, null, null, "Fitness Coaching", "التدريب على اللياقة البدنية", new Guid("e521c550-82db-4538-9ea4-b812e6596cf1") },
                    { new Guid("0ea7228e-e679-4f25-b23f-49c5f3f23218"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9230), null, null, null, "Accounting", "المحاسبة", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("11200732-5cea-463b-83a0-a910f2ce6a87"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9020), null, null, null, "E-commerce Development", "تطوير التجارة الإلكترونية", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("1126ed79-3f1a-41b3-928a-888508797b3d"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9200), null, null, null, "Market Research", "أبحاث السوق", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("118c8420-e6f3-4ad6-a2e6-fb4a6dd6336b"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9270), null, null, null, "Life Coaching", "تدريب الحياة", new Guid("e521c550-82db-4538-9ea4-b812e6596cf1") },
                    { new Guid("12605776-3f9a-459b-be2d-fcef854fb3d2"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9250), null, null, null, "Audio Mixing", "مزج الصوت", new Guid("376074de-6e08-4265-9924-9932f7759626") },
                    { new Guid("16d582bc-11e0-4522-9e7b-9d48046ab357"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9230), null, null, null, "Voice Over", "التعليق الصوتي", new Guid("376074de-6e08-4265-9924-9932f7759626") },
                    { new Guid("1970fda0-67a9-46e0-a6c1-970d7f7b1ccf"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9040), null, null, null, "Automation & Bots", "الأتمتة والروبوتات", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("28e50cd8-e897-4fed-b16d-51813eb2be94"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9170), null, null, null, "2D Animation", "الرسوم المتحركة ثنائية الأبعاد", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("2ade5dd2-8e41-4674-a8fa-5a0aeb3bebd2"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9200), null, null, null, "Virtual Assistant", "المساعد الافتراضي", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("30bdf5f1-7f83-43e3-89d1-7ab88b642677"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9050), null, null, null, "Cybersecurity", "الأمن السيبراني", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("3882ccaf-2a35-4df4-9c9c-2585cdfcb24f"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9220), null, null, null, "Financial Consulting", "الاستشارات المالية", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("40dfe7d0-8068-4bbe-a1c6-49f71cb31ad8"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8970), null, null, null, "Book Cover Design", "تصميم أغلفة الكتب", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("495abc51-b04f-4d7d-a042-e0a84fd0ccf1"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8980), null, null, null, "3D Modeling", "النمذجة ثلاثية الأبعاد", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("4eb4b238-7d17-4295-bc1b-1a335c5efa35"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9080), null, null, null, "Email Marketing", "التسويق عبر البريد الإلكتروني", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("5247a0be-dd7a-40e1-9ff2-de2a20d24dbe"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8960), null, null, null, "Illustration", "الرسم التوضيحي", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("5b31af7f-05c6-495d-baaf-484d2ccd7585"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8940), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("5c417745-64f3-412d-8774-2be918a4719f"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9090), null, null, null, "Content Marketing", "تسويق المحتوى", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("63a537ee-456f-44ec-bc98-fe5201a0ad2d"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8950), null, null, null, "Business Cards & Stationery", "بطاقات العمل والقرطاسية", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("69666b4a-2682-4e5a-b244-54edeb494198"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9170), null, null, null, "Explainer Videos", "فيديوهات توضيحية", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("738b056f-f46b-4da4-9ce3-2dfef1ba8f88"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8950), null, null, null, "Social Media Design", "تصميم وسائل التواصل الاجتماعي", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("7c63c654-7d92-4043-be3d-8afa72e6b2b0"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9280), null, null, null, "Online Tutoring", "التدريس عبر الإنترنت", new Guid("e521c550-82db-4538-9ea4-b812e6596cf1") },
                    { new Guid("7ce54529-efc9-4ee2-b9e4-752b6b9ac1da"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9110), null, null, null, "Blog Writing", "كتابة المدونات", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("7ee3c8e6-59d4-4fe6-8db2-6158f612f72f"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9090), null, null, null, "Marketing Strategy", "استراتيجية التسويق", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("81c51b00-f42a-4c18-a001-eb5d52cd9170"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9100), null, null, null, "Influencer Marketing", "التسويق عبر المؤثرين", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("849387f5-8f8f-4447-8f1a-71847db89bc6"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9070), null, null, null, "SEO", "تحسين محركات البحث", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("8a4b4e8f-8124-4fe1-805f-84127b034466"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9210), null, null, null, "Data Entry", "إدخال البيانات", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("8c6c2229-29c6-4fc2-b36b-8ac231dfd7bf"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9150), null, null, null, "Video Editing", "تحرير الفيديو", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("903f7e2d-c465-47ef-9622-29131f78b30c"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9150), null, null, null, "Academic Writing", "الكتابة الأكاديمية", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("9194b5f6-24c8-4982-8dca-b0ab338f9468"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9130), null, null, null, "Translation", "الترجمة", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("97630147-32c4-4889-a071-c6fe01a76cd0"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9050), null, null, null, "DevOps & Cloud", "ديف أوبس والحوسبة السحابية", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("9de69c50-195d-4f6c-a512-00aab0628dc1"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8960), null, null, null, "Packaging Design", "تصميم التغليف", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("a539087b-23d8-47fc-9b91-734b8372cc37"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9160), null, null, null, "Motion Graphics", "الرسوم المتحركة", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("a85bcd68-605a-4629-adf9-93327794ac8b"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9030), null, null, null, "API Development", "تطوير واجهات برمجة التطبيقات", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("aa1e0e3d-5fb2-420e-b0c4-8e686ad17d6e"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8990), null, null, null, "Web Development", "تطوير المواقع", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("aa52ee3c-1ad3-43fc-b153-d58ce8b7b3ed"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9120), null, null, null, "Technical Writing", "الكتابة التقنية", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("aba87c41-a90b-49ea-b180-6e522b135a87"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9110), null, null, null, "Copywriting", "كتابة المحتوى الإعلاني", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("b6cf5508-4fba-4b62-a973-336667781e37"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9270), null, null, null, "Career Coaching", "التدريب المهني", new Guid("e521c550-82db-4538-9ea4-b812e6596cf1") },
                    { new Guid("b84fbf97-fed7-43de-ab32-a5fe4a971a8d"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9190), null, null, null, "YouTube Editing", "تحرير فيديوهات يوتيوب", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("c5de53c3-a7b3-4315-9411-9289c76df7de"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9180), null, null, null, "3D Animation", "الرسوم المتحركة ثلاثية الأبعاد", new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6") },
                    { new Guid("c63c1ffa-9970-4e57-8123-e0fc7c59cce3"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9000), null, null, null, "Mobile App Development", "تطوير تطبيقات الجوال", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("c7069b7d-af32-4f9b-960e-70c9fe656a81"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9240), null, null, null, "Podcast Editing", "تحرير البودكاست", new Guid("376074de-6e08-4265-9924-9932f7759626") },
                    { new Guid("cb649aeb-0f2e-432e-adfb-6884e0b44904"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8980), null, null, null, "UI/UX Design", "تصميم واجهة وتجربة المستخدم", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("d2332387-f532-4833-9685-a8d97b321c37"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(8930), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699") },
                    { new Guid("d4435ed7-ca07-4f3a-8509-5d1e62b11154"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9030), null, null, null, "AI & Machine Learning", "الذكاء الاصطناعي والتعلم الآلي", new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a") },
                    { new Guid("d5837cd0-6e96-4841-bae4-b86615a9c837"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9130), null, null, null, "Resume Writing", "كتابة السيرة الذاتية", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") },
                    { new Guid("d5c3f447-596f-456b-8d54-af1130e13f9b"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9250), null, null, null, "Music Production", "إنتاج الموسيقى", new Guid("376074de-6e08-4265-9924-9932f7759626") },
                    { new Guid("df3465a4-222d-40ec-bb20-f9284568ea90"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9070), null, null, null, "Paid Ads (Google/Facebook/TikTok)", "الإعلانات المدفوعة", new Guid("a73396fe-29d6-499c-893e-22094d98ba80") },
                    { new Guid("ed99a096-e871-4222-9fe9-9151be98368c"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9190), null, null, null, "Business Plans", "خطط الأعمال", new Guid("a831e920-e480-4569-b319-84e3e859ac9d") },
                    { new Guid("f876013d-99e6-4685-9713-fb3045512f01"), new DateTime(2026, 2, 22, 11, 5, 55, 147, DateTimeKind.Utc).AddTicks(9140), null, null, null, "Proofreading", "التدقيق اللغوي", new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Media_CustomOfferId",
                table: "Media",
                column: "CustomOfferId");

            migrationBuilder.AddForeignKey(
                name: "FK_Media_CustomOffers_CustomOfferId",
                table: "Media",
                column: "CustomOfferId",
                principalTable: "CustomOffers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_CustomOffers_CustomOfferId",
                table: "Media");

            migrationBuilder.DropIndex(
                name: "IX_Media_CustomOfferId",
                table: "Media");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0a68ca0b-a3f3-406d-ba7a-a0e0463d8f75"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0c2e550e-b1b1-4021-80a6-b911cd1d6081"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0ea7228e-e679-4f25-b23f-49c5f3f23218"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("11200732-5cea-463b-83a0-a910f2ce6a87"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1126ed79-3f1a-41b3-928a-888508797b3d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("118c8420-e6f3-4ad6-a2e6-fb4a6dd6336b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("12605776-3f9a-459b-be2d-fcef854fb3d2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("16d582bc-11e0-4522-9e7b-9d48046ab357"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1970fda0-67a9-46e0-a6c1-970d7f7b1ccf"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("28e50cd8-e897-4fed-b16d-51813eb2be94"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2ade5dd2-8e41-4674-a8fa-5a0aeb3bebd2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("30bdf5f1-7f83-43e3-89d1-7ab88b642677"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3882ccaf-2a35-4df4-9c9c-2585cdfcb24f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("40dfe7d0-8068-4bbe-a1c6-49f71cb31ad8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("495abc51-b04f-4d7d-a042-e0a84fd0ccf1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4eb4b238-7d17-4295-bc1b-1a335c5efa35"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5247a0be-dd7a-40e1-9ff2-de2a20d24dbe"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5b31af7f-05c6-495d-baaf-484d2ccd7585"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5c417745-64f3-412d-8774-2be918a4719f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("63a537ee-456f-44ec-bc98-fe5201a0ad2d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("69666b4a-2682-4e5a-b244-54edeb494198"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("738b056f-f46b-4da4-9ce3-2dfef1ba8f88"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7c63c654-7d92-4043-be3d-8afa72e6b2b0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7ce54529-efc9-4ee2-b9e4-752b6b9ac1da"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7ee3c8e6-59d4-4fe6-8db2-6158f612f72f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("81c51b00-f42a-4c18-a001-eb5d52cd9170"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("849387f5-8f8f-4447-8f1a-71847db89bc6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8a4b4e8f-8124-4fe1-805f-84127b034466"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8c6c2229-29c6-4fc2-b36b-8ac231dfd7bf"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("903f7e2d-c465-47ef-9622-29131f78b30c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("9194b5f6-24c8-4982-8dca-b0ab338f9468"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("97630147-32c4-4889-a071-c6fe01a76cd0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("9de69c50-195d-4f6c-a512-00aab0628dc1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a539087b-23d8-47fc-9b91-734b8372cc37"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a85bcd68-605a-4629-adf9-93327794ac8b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("aa1e0e3d-5fb2-420e-b0c4-8e686ad17d6e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("aa52ee3c-1ad3-43fc-b153-d58ce8b7b3ed"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("aba87c41-a90b-49ea-b180-6e522b135a87"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b6cf5508-4fba-4b62-a973-336667781e37"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b84fbf97-fed7-43de-ab32-a5fe4a971a8d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c5de53c3-a7b3-4315-9411-9289c76df7de"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c63c1ffa-9970-4e57-8123-e0fc7c59cce3"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c7069b7d-af32-4f9b-960e-70c9fe656a81"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("cb649aeb-0f2e-432e-adfb-6884e0b44904"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d2332387-f532-4833-9685-a8d97b321c37"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d4435ed7-ca07-4f3a-8509-5d1e62b11154"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d5837cd0-6e96-4841-bae4-b86615a9c837"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d5c3f447-596f-456b-8d54-af1130e13f9b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("df3465a4-222d-40ec-bb20-f9284568ea90"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ed99a096-e871-4222-9fe9-9151be98368c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f876013d-99e6-4685-9713-fb3045512f01"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("129cb6f2-4717-4879-861f-f018d0522700"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("12ec1336-eb3e-430e-8f27-7b47b10ed77c"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("3f2e54c0-ee8a-4bf3-aa0f-4e509721bcf0"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("468d1af3-aecc-4998-8dda-eb4cbdf50e52"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("604770d4-4406-4350-8df0-988db0bbad65"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("84290f07-0603-4259-b957-513aac135c24"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("af6fcf4a-a5f7-4815-872a-0dd884878f3f"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("b6d2b81c-db70-4492-a51d-841176d9c155"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("bcdfb73c-a157-4cb7-ab1f-efa56a3efd13"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("d8b5a8e6-d033-4b7e-82ff-470d03d6eb49"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("0557a54f-0ad6-428c-ab9d-ef4318708118"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("055c2963-09bd-4035-b56e-2c9aa54de537"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("05aa9ea4-5ea0-4cfe-ae4f-f19d71cdc95c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("089cae6f-3ed7-4638-b46f-9519fa067848"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("0eadd30c-2d1a-4a49-bce3-22fb5d87375f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1af5b112-a8ff-4b09-b123-48b6a455e3c8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("29f07305-2e88-435b-ac72-0047e50b7fd6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3cdfa400-6a7a-4d04-a16a-fdfb793f2fd1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("41dc7bea-d282-4186-98c3-5a8de04e74c6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("422fcdb1-21c4-418c-bf5b-050a2e4ac143"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("48a9314e-fe06-4991-baf8-2d431b699b07"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("48c6175a-be29-4188-8eba-47f8ab0d6489"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4d5a6e17-8dd6-427a-bb7c-471e1ceedf31"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("51d6983d-3058-448a-a90d-a97ef5619661"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("646ecd62-bd30-4809-8cdc-87b7b94bef1e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6dbf259e-9bd5-49e2-8aa1-e4024b585e90"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6e2393a6-d1e8-4f95-81dd-a86c42a392d1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("72a33aa9-8a65-428e-8334-aa9faf75482b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7c747f44-1805-4e8d-a3c0-f337d6529f72"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("82d20169-3815-4e01-a6ea-878fc92a75b4"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("89fa3ae4-2326-4366-9305-180680f225bf"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8bfddbe5-2c89-4461-9d5e-c34575b3d715"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8c40371c-1b33-46f9-af2d-d3c03f7f8473"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8ed135e4-37c0-47a5-bbc5-9219daa4c0d1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("99869206-fa9d-41e8-a6ee-b30622dfd577"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b7912454-aaed-4102-81ad-dbffd9dbafdb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c4d0a4c6-6505-4c3b-8a57-28eb8a9f2a77"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d0425e6e-8cde-4e45-95f7-094496c68deb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d2971dac-65c7-48ca-ae19-35397a9c4834"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("ff5ea79f-e511-4a52-8fd7-d22744432874"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("22c79735-0b69-4927-b136-2cc1bfd974a6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2796c895-c2e2-4153-8e4e-bb3682116d9a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("376074de-6e08-4265-9924-9932f7759626"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5fb14b97-7e40-4cdc-b9c6-9aede98be3e0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a73396fe-29d6-499c-893e-22094d98ba80"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a831e920-e480-4569-b319-84e3e859ac9d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("bdbe6d9b-063a-4cb6-b6d4-2f1ee360e699"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e521c550-82db-4538-9ea4-b812e6596cf1"));

            // Drop and recreate CustomOfferId back to Guid type (reverting the change)
            migrationBuilder.DropColumn(
                name: "CustomOfferId",
                table: "Media");

            migrationBuilder.AddColumn<Guid>(
                name: "CustomOfferId",
                table: "Media",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Attachments",
                table: "CustomOffers",
                type: "text",
                nullable: true);

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
    }
}
