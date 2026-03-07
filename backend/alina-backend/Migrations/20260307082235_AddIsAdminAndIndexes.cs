using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddIsAdminAndIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0311a6db-c13b-4295-a88a-1c714131ca37"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("058eb4b6-31b4-49f7-a995-714014a8c5d2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("074ca8ea-0dc6-4742-a0c6-f30f1162c81c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("077a6d57-d69d-4efb-a82d-64dde9de0877"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0811a81f-fb58-4b56-8d16-209a09708b41"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("11a0ecc5-e038-439a-b511-57caea3ac8fe"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1216379d-2f7d-48eb-8df2-9f1b56d730ad"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1389cf63-5b14-4741-a546-9e4bb4a95340"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("157ac9e0-d00f-4a13-8ddf-585b14b5d97a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("17135922-edaa-47cb-bf63-d7e4f3b48c64"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1f26b9f3-e6d2-4049-a267-9b0af9d41976"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("27587cc3-7592-4aef-ad10-1aecb8f8d41d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("27ee01d4-075a-4bdb-aa36-b535c34dcb85"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2d19f988-fc5b-4075-ba5e-af0bec63e7ad"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2e6b4d6c-569b-42d3-a2e3-7d2d1910ded7"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2ed31f34-0ef3-4546-8bc2-a49bc0c03208"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3fd553bc-519b-47bc-80f7-3d9179df049b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("40b82e7c-42af-47ef-a13a-ab0b7c6e5a59"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5ff7395a-e65b-4f09-b3bf-7522e03d6bef"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("62855717-995b-4b9d-892b-52976189c847"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("6536eb2b-8e3c-481e-a9f0-3cccb546b3de"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("6cfacf43-b793-44b1-b9e0-a12114e4f490"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("77edc9c0-c049-4f35-900b-9533d3dabfad"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7c68acc3-b84f-41c5-9bbd-bcb9644b482d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("860a23ae-a4e4-43bc-980e-7f363a7477e7"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8a59f3cf-8276-486b-9c7b-88ad896e468b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8d63cb3e-216a-4236-ac08-e2d3d1141ead"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("92377ee9-f2ce-4bbc-a011-1157c8381951"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("952ff931-b0af-4b3e-95d5-e6b4fa25834f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a03830fa-4cd9-46cf-b50b-c41a0abf1997"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a2e364bc-a984-40e2-8898-57c41be68dc8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a642c56d-1973-4459-89bc-9782410d4c05"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a72b84c6-14fc-43b9-88a0-f840ec2b8c24"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ab2f1e32-0ef4-448b-a81a-0dc65667866f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ab8a6c68-41c4-445a-9d4e-73cb6fca4f18"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ab9f7c34-2925-4464-8549-c34d564303ba"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b91362fd-f7c5-41f7-8cee-f81ac4d59efd"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("bc257127-937f-4894-8246-71f6b2f2a5f9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("bf9df5d9-4140-4f17-81b0-8f4cb45327df"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c0e179a2-5a8e-4965-814e-3b85e4668bc6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c6a6cd78-d3b1-455c-aa4b-543f25bf8d2c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("cac018e6-c9e4-4c1a-bb86-360228c1f5d7"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d0b828b0-426c-4b82-8151-7d4aa6fe93ed"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("db835309-8069-4c02-9f6a-df0e0f61b02c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("dffa0d88-0cbb-44a7-a378-b5f9f98efa66"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e90d921f-84e6-4197-b65a-f581feb6657c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("eefcb683-c27e-483c-b169-7c4712d6e264"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f790c98e-b431-4f32-a161-a260b0aee170"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("fa3c4ce7-a263-47af-b478-9a1dbf566882"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("fc00136c-0dc4-418b-99b1-5c53d6c001c4"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("fdce20e3-9a0c-4312-8564-5502eb7fa8e8"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("2d7ff158-99a7-448e-946d-a92c4e6f6c34"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("30769768-6849-4b51-b90a-5eeb7e1a8473"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("32e64943-64d4-4e3e-9ed3-a3bc744d5dfe"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("34d12973-e2fc-41f7-b905-4c9099699508"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("64b18ef6-8f21-40f4-b48d-d77e7d420107"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("712da8ad-a323-411d-b247-1d7a40457d86"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("73d7e9dd-d17d-40e0-8ac2-2d2826a2a3b1"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("7d2a960e-105c-4955-a265-80bd56f79925"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("8c8c18bb-9a8e-4ed5-8532-0a9b7a0e5fb0"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("d9983742-d037-4c61-acf8-af5b447e26bd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("17517908-434b-4a00-b462-9ca23ed7873b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("211d7131-f450-4b07-aedb-9474a7715cba"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("386925e3-5a37-43b3-82cc-e8e577cf5964"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3e101772-71e3-4ec4-bbaf-fdf5ecdbf27b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("5273aa01-a444-4541-b6d3-b8224084ffb5"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("5547ee3a-7388-419d-9fd5-74aca2674409"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("595a83b9-2fc6-4e44-a438-6b0a1339f3e4"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("5a7d9c78-7d00-44ed-8542-1609ccd15582"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("6d18143d-07de-4868-94f6-eac5da714d24"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7b3e7a0a-6f7c-4d46-be12-06e0f277c40b"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7c148b09-baea-4f2e-9fe4-99c7ddfaa6d9"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8038a4b3-8e7a-4e51-b6e0-ff6770e554ec"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a0122dee-5a4a-4fdd-b444-c4023a52f6b7"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a2825b0b-ecf2-49f2-82c3-c3aec7393ed6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a45816b5-de0f-4096-abc0-dafd80778da6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a538d5e6-43e1-4410-a9a2-b37763094646"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a7171cca-2452-4ccf-a870-75b0cb2350aa"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b56ae3b2-e008-478f-b4af-4e33246be8b7"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c28573da-f1c0-498a-af84-cad1e24c1fcf"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c434e0b6-ae0e-40df-8d22-916e9a5d70cb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("c4b35056-0be4-4170-8b9b-ec934c3672da"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("ce105a77-bc7c-4ee4-a370-c6d39c4d52bd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e1075a59-b517-43aa-b7f6-cc61be73632a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("ee11583e-6bcb-4906-b389-5fdd086ee533"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f093bde3-b8e9-4724-84e2-4a1cef5091d1"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f5ebb989-b72d-43ca-899d-7bd33a3b62c2"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("f94540d4-2c94-4abf-b992-51f40c4d1dfa"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fc23e18a-90b1-4231-9839-698357dcea8e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fd1905b2-b62f-4cbf-a0b6-8c94a611c9c3"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fdfd315a-5640-4900-8055-b4addaa7200e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("01a3e221-575b-41c1-bef6-ea51510675d8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("768acba4-7483-415f-9396-f4a4003b01c9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f3ccf4c9-a49a-467a-91c3-8faebbaa9d3e"));

            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "Profiles",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5510), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("4daaff93-31ce-4237-86c6-f2b118901181"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5500), null, null, "trending_up", "Digital Marketing", "التسويق الرقمي", null },
                    { new Guid("610daf90-ff0b-446d-9de6-dea2328bc204"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5500), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("997abec4-ef5e-4251-8942-ebc62b632f85"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5500), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5510), null, null, "music_note", "Music & Audio", "الموسيقى والصوتيات", null },
                    { new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5510), null, null, "business", "Business Services", "الخدمات التجارية", null },
                    { new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5510), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("ef586437-9061-4183-a074-6457757cf700"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5520), null, null, "self_improvement", "Lifestyle & Coaching", "نمط الحياة والتدريب", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5170));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5160));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("239fd628-0f15-4f52-9ee0-bca991b21fcc"), "pt", "Portuguese" },
                    { new Guid("28f652c7-6da6-4b26-9275-dcbe1cafd0bb"), "en", "English" },
                    { new Guid("2c9ac24e-acf3-4576-9bf9-2adf4b80f475"), "ja", "Japanese" },
                    { new Guid("54a7e467-2a97-46a8-96de-2beac36951c1"), "de", "German" },
                    { new Guid("88db11f8-d752-45f5-911e-8c64a833f034"), "ar", "Arabic" },
                    { new Guid("9b48f3a1-c4a1-4f02-9bd0-d3a2d482b73b"), "ru", "Russian" },
                    { new Guid("9ee9dd42-2613-4808-86df-1fec52e723d5"), "es", "Spanish" },
                    { new Guid("cec23111-c562-4dd4-a231-8c4df0efaaf6"), "zh", "Chinese" },
                    { new Guid("f4100e4c-bfb9-4201-83e5-ac1ee857a832"), "hi", "Hindi" },
                    { new Guid("f46cf590-9b58-4ecd-bf49-b34b38fecce5"), "fr", "French" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("18f44bc1-7352-4183-b6d5-af2cb12324d6"), "Marketing", "Email Marketing" },
                    { new Guid("1c4aa6d4-359b-4225-bc5a-d3e452844232"), "Programming", "Swift" },
                    { new Guid("1e1088bf-fea6-4bfb-837e-675c27178439"), "Design", "Adobe Illustrator" },
                    { new Guid("26fc3ada-4b94-4b84-b89d-6f9779272a44"), "Programming", "TypeScript" },
                    { new Guid("27c41e01-b4f2-4272-9695-3e1e0dfe69fa"), "Design", "Adobe Photoshop" },
                    { new Guid("3243071a-ff3c-414e-a1d3-a833f8198172"), "Design", "Figma" },
                    { new Guid("32e9e558-7fdd-410c-8e15-9f5e6a21a890"), "Marketing", "Social Media Marketing" },
                    { new Guid("34a83878-4534-45c3-9868-94cb15e29972"), "Writing", "Copywriting" },
                    { new Guid("3a3b3e69-173f-4ec9-abf0-47a8d5d287ea"), "Video & Animation", "After Effects" },
                    { new Guid("44cc95fa-670b-47af-8cb9-63a97b784887"), "Marketing", "Content Writing" },
                    { new Guid("48b68c20-ab94-43fe-a974-c09e06dcda5c"), "Business", "Data Analysis" },
                    { new Guid("4adc2e34-285e-488d-973a-4deb96d4b8a3"), "Video & Animation", "Animation" },
                    { new Guid("51d52918-e305-4785-94e7-1400576b866a"), "Marketing", "Digital Marketing" },
                    { new Guid("77bcbdcc-778e-4116-90ca-2c89f29b9fcf"), "Programming", "Kotlin" },
                    { new Guid("7ac3710c-7d6d-48c1-ae78-6fe5113680cb"), "Programming", "Node.js" },
                    { new Guid("8d323392-a1f9-4950-a278-7addb9128b53"), "Programming", "JavaScript" },
                    { new Guid("9bb7edea-9762-43e0-b1de-1402ce1bce49"), "Design", "Logo Design" },
                    { new Guid("9c848612-9b09-4f60-8be9-5d3fdcb71313"), "Video & Animation", "Video Editing" },
                    { new Guid("a5e69395-0ed0-4aa1-a783-ddee7659f4f6"), "Programming", "React" },
                    { new Guid("aed7b026-2bc8-4a14-b235-c462cdeda41e"), "Programming", "Python" },
                    { new Guid("b5e1db2c-2199-41d4-90f9-49700b64ec81"), "Design", "3D Modeling" },
                    { new Guid("b6bc7c5e-635c-4339-ad84-ed937b577f4a"), "Marketing", "SEO" },
                    { new Guid("b6d783ba-7c1c-4826-ae4e-150d801566e8"), "Writing", "Translation" },
                    { new Guid("cb2c0b36-fb82-43b7-ad57-133df8657474"), "Programming", "Java" },
                    { new Guid("cc5ada2a-54de-495b-a81c-53e2f6f305cd"), "Design", "UI/UX Design" },
                    { new Guid("d2d8a24c-2049-4ea8-b6c2-1108a8423617"), "Business", "Business Consulting" },
                    { new Guid("d6616daf-4443-4511-9254-da54850f4634"), "Writing", "Technical Writing" },
                    { new Guid("e16a8631-96e4-4376-a2f5-e06f8cda2a4f"), "Programming", "C#" },
                    { new Guid("fb31ce6b-2b7f-4117-abe5-d31e75be15fb"), "Programming", "Flutter" },
                    { new Guid("fd26f176-10ac-4177-b7ef-9f44a1648aa2"), "Design", "Graphic Design" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("072cbd88-c7cb-4ab0-824a-6162d988779a"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5680), null, null, null, "Video Editing", "تحرير الفيديو", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") },
                    { new Guid("0acce8d0-ffd9-456f-a8dd-c89618256f55"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5750), null, null, null, "Podcast Editing", "تحرير البودكاست", new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2") },
                    { new Guid("0cf5376e-5d7b-43b0-8009-c4a6398c92c6"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5570), null, null, null, "3D Modeling", "النمذجة ثلاثية الأبعاد", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("0e2db012-9999-4ae0-aac0-84ec156771d1"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5730), null, null, null, "Virtual Assistant", "المساعد الافتراضي", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("1042a430-cb14-403b-849c-cc6247ebfd9c"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5710), null, null, null, "YouTube Editing", "تحرير فيديوهات يوتيوب", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") },
                    { new Guid("14118e05-9609-4e95-8978-fb143f2a83ff"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5670), null, null, null, "Proofreading", "التدقيق اللغوي", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("27fc2a17-a81f-448f-9d47-b9fa74e2d69e"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5780), null, null, null, "Career Coaching", "التدريب المهني", new Guid("ef586437-9061-4183-a074-6457757cf700") },
                    { new Guid("2965ef40-053f-489c-aee3-a9ac3018539b"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5570), null, null, null, "UI/UX Design", "تصميم واجهة وتجربة المستخدم", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("2f628461-b7d3-4967-927c-3d45257583a6"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5620), null, null, null, "SEO", "تحسين محركات البحث", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("3055d3a8-418d-47c5-ab0b-368a7fd5d8b5"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5730), null, null, null, "Financial Consulting", "الاستشارات المالية", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("42e8ade3-9bb9-4c14-8631-4a4d7a131e39"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5760), null, null, null, "Audio Mixing", "مزج الصوت", new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2") },
                    { new Guid("450655da-ad34-4f2a-9667-4742255e6e9e"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5660), null, null, null, "Technical Writing", "الكتابة التقنية", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("495fc4a6-78ac-4c4b-9212-57081e466857"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5520), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("4a191d2e-0523-4a71-88ca-063254bb58e7"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5730), null, null, null, "Data Entry", "إدخال البيانات", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("56e13769-7481-4c92-ab5a-5a2f1ac54a39"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5620), null, null, null, "Social Media Marketing", "التسويق عبر وسائل التواصل الاجتماعي", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("5b76c789-4431-4a1c-85ec-030427319051"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5560), null, null, null, "Book Cover Design", "تصميم أغلفة الكتب", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("5de2095b-6bce-44f4-82a4-0f54e4a94dc7"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5740), null, null, null, "Voice Over", "التعليق الصوتي", new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2") },
                    { new Guid("5f8a5e30-cfa1-48fb-9639-cf9406394ba6"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5580), null, null, null, "Web Development", "تطوير المواقع", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("648285bb-f19a-4213-9f75-9eec464bf549"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5630), null, null, null, "Email Marketing", "التسويق عبر البريد الإلكتروني", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("6aeb1939-bb41-46cf-b871-207253855276"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5650), null, null, null, "Copywriting", "كتابة المحتوى الإعلاني", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("7b19e965-220e-4801-8049-b190467f6edb"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5770), null, null, null, "Life Coaching", "تدريب الحياة", new Guid("ef586437-9061-4183-a074-6457757cf700") },
                    { new Guid("7c4a7a8c-7489-4818-9b28-739dbb2a488d"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5780), null, null, null, "Online Tutoring", "التدريس عبر الإنترنت", new Guid("ef586437-9061-4183-a074-6457757cf700") },
                    { new Guid("7ea55299-95cc-4e3a-a6b4-c8f9ddb904cc"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5630), null, null, null, "Content Marketing", "تسويق المحتوى", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("8941e532-cf6a-4ec5-b98b-e36985d68e9d"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5640), null, null, null, "Influencer Marketing", "التسويق عبر المؤثرين", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("8bacd4a3-1f3b-471b-acff-43785254ba14"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5560), null, null, null, "Illustration", "الرسم التوضيحي", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("99aa230b-2037-4c1e-b6c0-6e8dca45a68a"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5600), null, null, null, "Automation & Bots", "الأتمتة والروبوتات", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("9bad3bf9-e3fb-4f82-abe9-28e4c1204b24"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5770), null, null, null, "Fitness Coaching", "التدريب على اللياقة البدنية", new Guid("ef586437-9061-4183-a074-6457757cf700") },
                    { new Guid("a75cb7a0-8c07-4679-ae97-2e42d624df8e"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5690), null, null, null, "Explainer Videos", "فيديوهات توضيحية", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") },
                    { new Guid("a8720fcc-e136-4727-b905-2db94cb027ce"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5610), null, null, null, "DevOps & Cloud", "ديف أوبس والحوسبة السحابية", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("a9fbde2d-e5b2-4db2-92a1-1a702bf9af9b"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5690), null, null, null, "Motion Graphics", "الرسوم المتحركة", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") },
                    { new Guid("ab6a5438-6bd8-4278-8559-b55ad8b1e636"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5590), null, null, null, "E-commerce Development", "تطوير التجارة الإلكترونية", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("abc5cc6b-03b0-485d-adf8-af677bca905f"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5640), null, null, null, "Marketing Strategy", "استراتيجية التسويق", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("ace342bb-ed82-426b-8f8f-9f63eb9c5444"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5660), null, null, null, "Resume Writing", "كتابة السيرة الذاتية", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("b255f7f7-6ea8-4db9-94ed-5a8e75fee203"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5760), null, null, null, "Music Production", "إنتاج الموسيقى", new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2") },
                    { new Guid("b31a626b-d3c4-4dee-aed4-562ef00bddf9"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5720), null, null, null, "Business Plans", "خطط الأعمال", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("bb17e712-80ea-437a-a17a-2e4e81ea2a22"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5680), null, null, null, "Academic Writing", "الكتابة الأكاديمية", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("c0d378d5-57c4-4852-90d2-6268dbac84ba"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5550), null, null, null, "Packaging Design", "تصميم التغليف", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("c167b700-7630-41c8-8b45-20227d4d4e80"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5590), null, null, null, "API Development", "تطوير واجهات برمجة التطبيقات", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("c396eda9-dec2-465f-b3b6-0c89a3f612d9"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5550), null, null, null, "Social Media Design", "تصميم وسائل التواصل الاجتماعي", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("c5743cde-7e66-43c8-9e0e-9b47db29a1a9"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5720), null, null, null, "Market Research", "أبحاث السوق", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("c8e1a18b-bce7-47d2-8511-8519f98edd6f"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5580), null, null, null, "Mobile App Development", "تطوير تطبيقات الجوال", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("c915a8fd-5468-4b84-9aef-e323411f4e81"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5530), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("d66ec561-ae9f-4d7f-ab79-4cfb35173020"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5650), null, null, null, "Blog Writing", "كتابة المدونات", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("d7c753c6-d8fc-42e8-9c44-862d9b688bd6"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5610), null, null, null, "Cybersecurity", "الأمن السيبراني", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("dc675f84-1b88-4eef-ab81-4685fe81c500"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5540), null, null, null, "Business Cards & Stationery", "بطاقات العمل والقرطاسية", new Guid("610daf90-ff0b-446d-9de6-dea2328bc204") },
                    { new Guid("dea829c2-84a1-4338-9d69-727ecf1f2e86"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5600), null, null, null, "AI & Machine Learning", "الذكاء الاصطناعي والتعلم الآلي", new Guid("997abec4-ef5e-4251-8942-ebc62b632f85") },
                    { new Guid("df00a879-d38d-4850-a21a-c3be720bd3d3"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5740), null, null, null, "Accounting", "المحاسبة", new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4") },
                    { new Guid("e84bf9cc-88b6-4a23-9e15-020ec905a19d"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5700), null, null, null, "3D Animation", "الرسوم المتحركة ثلاثية الأبعاد", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") },
                    { new Guid("ed0619de-4ddb-47c9-b81f-8cf47256a0a5"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5670), null, null, null, "Translation", "الترجمة", new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db") },
                    { new Guid("ed27a3c0-ad0d-4b6f-9ed1-f73c19fb42cf"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5630), null, null, null, "Paid Ads (Google/Facebook/TikTok)", "الإعلانات المدفوعة", new Guid("4daaff93-31ce-4237-86c6-f2b118901181") },
                    { new Guid("f4629e2b-3eff-4373-9206-541fbbe85557"), new DateTime(2026, 3, 7, 8, 22, 34, 763, DateTimeKind.Utc).AddTicks(5700), null, null, null, "2D Animation", "الرسوم المتحركة ثنائية الأبعاد", new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_WithdrawalRequests_Status",
                table: "WithdrawalRequests",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_OrderId",
                table: "Transactions",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_SearchAnalytics_SearchTerm",
                table: "SearchAnalytics",
                column: "SearchTerm");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_Token",
                table: "RefreshTokens",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_SellerId_Status",
                table: "Orders",
                columns: new[] { "SellerId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Status",
                table: "Orders",
                column: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_WithdrawalRequests_Status",
                table: "WithdrawalRequests");

            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_OrderId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_SearchAnalytics_SearchTerm",
                table: "SearchAnalytics");

            migrationBuilder.DropIndex(
                name: "IX_RefreshTokens_Token",
                table: "RefreshTokens");

            migrationBuilder.DropIndex(
                name: "IX_Orders_SellerId_Status",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_Status",
                table: "Orders");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("072cbd88-c7cb-4ab0-824a-6162d988779a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0acce8d0-ffd9-456f-a8dd-c89618256f55"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0cf5376e-5d7b-43b0-8009-c4a6398c92c6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("0e2db012-9999-4ae0-aac0-84ec156771d1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("1042a430-cb14-403b-849c-cc6247ebfd9c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("14118e05-9609-4e95-8978-fb143f2a83ff"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("27fc2a17-a81f-448f-9d47-b9fa74e2d69e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2965ef40-053f-489c-aee3-a9ac3018539b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("2f628461-b7d3-4967-927c-3d45257583a6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("3055d3a8-418d-47c5-ab0b-368a7fd5d8b5"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("42e8ade3-9bb9-4c14-8631-4a4d7a131e39"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("450655da-ad34-4f2a-9667-4742255e6e9e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("495fc4a6-78ac-4c4b-9212-57081e466857"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4a191d2e-0523-4a71-88ca-063254bb58e7"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("56e13769-7481-4c92-ab5a-5a2f1ac54a39"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5b76c789-4431-4a1c-85ec-030427319051"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5de2095b-6bce-44f4-82a4-0f54e4a94dc7"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("5f8a5e30-cfa1-48fb-9639-cf9406394ba6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("648285bb-f19a-4213-9f75-9eec464bf549"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("6aeb1939-bb41-46cf-b871-207253855276"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7b19e965-220e-4801-8049-b190467f6edb"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7c4a7a8c-7489-4818-9b28-739dbb2a488d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("7ea55299-95cc-4e3a-a6b4-c8f9ddb904cc"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8941e532-cf6a-4ec5-b98b-e36985d68e9d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8bacd4a3-1f3b-471b-acff-43785254ba14"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("99aa230b-2037-4c1e-b6c0-6e8dca45a68a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("9bad3bf9-e3fb-4f82-abe9-28e4c1204b24"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a75cb7a0-8c07-4679-ae97-2e42d624df8e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a8720fcc-e136-4727-b905-2db94cb027ce"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a9fbde2d-e5b2-4db2-92a1-1a702bf9af9b"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ab6a5438-6bd8-4278-8559-b55ad8b1e636"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("abc5cc6b-03b0-485d-adf8-af677bca905f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ace342bb-ed82-426b-8f8f-9f63eb9c5444"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b255f7f7-6ea8-4db9-94ed-5a8e75fee203"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("b31a626b-d3c4-4dee-aed4-562ef00bddf9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("bb17e712-80ea-437a-a17a-2e4e81ea2a22"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c0d378d5-57c4-4852-90d2-6268dbac84ba"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c167b700-7630-41c8-8b45-20227d4d4e80"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c396eda9-dec2-465f-b3b6-0c89a3f612d9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c5743cde-7e66-43c8-9e0e-9b47db29a1a9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c8e1a18b-bce7-47d2-8511-8519f98edd6f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("c915a8fd-5468-4b84-9aef-e323411f4e81"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d66ec561-ae9f-4d7f-ab79-4cfb35173020"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d7c753c6-d8fc-42e8-9c44-862d9b688bd6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("dc675f84-1b88-4eef-ab81-4685fe81c500"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("dea829c2-84a1-4338-9d69-727ecf1f2e86"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("df00a879-d38d-4850-a21a-c3be720bd3d3"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("e84bf9cc-88b6-4a23-9e15-020ec905a19d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ed0619de-4ddb-47c9-b81f-8cf47256a0a5"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ed27a3c0-ad0d-4b6f-9ed1-f73c19fb42cf"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("f4629e2b-3eff-4373-9206-541fbbe85557"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("239fd628-0f15-4f52-9ee0-bca991b21fcc"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("28f652c7-6da6-4b26-9275-dcbe1cafd0bb"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("2c9ac24e-acf3-4576-9bf9-2adf4b80f475"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("54a7e467-2a97-46a8-96de-2beac36951c1"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("88db11f8-d752-45f5-911e-8c64a833f034"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("9b48f3a1-c4a1-4f02-9bd0-d3a2d482b73b"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("9ee9dd42-2613-4808-86df-1fec52e723d5"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("cec23111-c562-4dd4-a231-8c4df0efaaf6"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("f4100e4c-bfb9-4201-83e5-ac1ee857a832"));

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: new Guid("f46cf590-9b58-4ecd-bf49-b34b38fecce5"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("18f44bc1-7352-4183-b6d5-af2cb12324d6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1c4aa6d4-359b-4225-bc5a-d3e452844232"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("1e1088bf-fea6-4bfb-837e-675c27178439"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("26fc3ada-4b94-4b84-b89d-6f9779272a44"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("27c41e01-b4f2-4272-9695-3e1e0dfe69fa"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3243071a-ff3c-414e-a1d3-a833f8198172"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("32e9e558-7fdd-410c-8e15-9f5e6a21a890"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("34a83878-4534-45c3-9868-94cb15e29972"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("3a3b3e69-173f-4ec9-abf0-47a8d5d287ea"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("44cc95fa-670b-47af-8cb9-63a97b784887"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("48b68c20-ab94-43fe-a974-c09e06dcda5c"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("4adc2e34-285e-488d-973a-4deb96d4b8a3"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("51d52918-e305-4785-94e7-1400576b866a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("77bcbdcc-778e-4116-90ca-2c89f29b9fcf"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("7ac3710c-7d6d-48c1-ae78-6fe5113680cb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("8d323392-a1f9-4950-a278-7addb9128b53"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9bb7edea-9762-43e0-b1de-1402ce1bce49"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("9c848612-9b09-4f60-8be9-5d3fdcb71313"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("a5e69395-0ed0-4aa1-a783-ddee7659f4f6"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("aed7b026-2bc8-4a14-b235-c462cdeda41e"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b5e1db2c-2199-41d4-90f9-49700b64ec81"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b6bc7c5e-635c-4339-ad84-ed937b577f4a"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("b6d783ba-7c1c-4826-ae4e-150d801566e8"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("cb2c0b36-fb82-43b7-ad57-133df8657474"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("cc5ada2a-54de-495b-a81c-53e2f6f305cd"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d2d8a24c-2049-4ea8-b6c2-1108a8423617"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("d6616daf-4443-4511-9254-da54850f4634"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("e16a8631-96e4-4376-a2f5-e06f8cda2a4f"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fb31ce6b-2b7f-4117-abe5-d31e75be15fb"));

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: new Guid("fd26f176-10ac-4177-b7ef-9f44a1648aa2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("013c5e48-471d-4cf8-9475-7af75e54c7db"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4daaff93-31ce-4237-86c6-f2b118901181"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("610daf90-ff0b-446d-9de6-dea2328bc204"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("997abec4-ef5e-4251-8942-ebc62b632f85"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("aa030182-be1c-46f0-b229-6cbc34cb8bb2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("baedca52-5579-4010-b8e6-0d86a5a6fcd4"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("d3bd6aad-7f9a-43b7-9a79-f1eea3926366"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ef586437-9061-4183-a074-6457757cf700"));

            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "Profiles");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1600), null, null, "brush", "Graphics & Design", "الجرافيك والتصميم", null },
                    { new Guid("01a3e221-575b-41c1-bef6-ea51510675d8"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1640), null, null, "music_note", "Music & Audio", "الموسيقى والصوتيات", null },
                    { new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1640), null, null, "business", "Business Services", "الخدمات التجارية", null },
                    { new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1600), null, null, "code", "Programming & Tech", "البرمجة والتكنولوجيا", null },
                    { new Guid("768acba4-7483-415f-9396-f4a4003b01c9"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1620), null, null, "trending_up", "Digital Marketing", "التسويق الرقمي", null },
                    { new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1630), null, null, "video", "Video & Animation", "الفيديو والأنيميشن", null },
                    { new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1620), null, null, "pen", "Writing & Translation", "الكتابة والترجمة", null },
                    { new Guid("f3ccf4c9-a49a-467a-91c3-8faebbaa9d3e"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1650), null, null, "self_improvement", "Lifestyle & Coaching", "نمط الحياة والتدريب", null }
                });

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1080));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1070));

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("2d7ff158-99a7-448e-946d-a92c4e6f6c34"), "fr", "French" },
                    { new Guid("30769768-6849-4b51-b90a-5eeb7e1a8473"), "pt", "Portuguese" },
                    { new Guid("32e64943-64d4-4e3e-9ed3-a3bc744d5dfe"), "hi", "Hindi" },
                    { new Guid("34d12973-e2fc-41f7-b905-4c9099699508"), "ru", "Russian" },
                    { new Guid("64b18ef6-8f21-40f4-b48d-d77e7d420107"), "en", "English" },
                    { new Guid("712da8ad-a323-411d-b247-1d7a40457d86"), "ja", "Japanese" },
                    { new Guid("73d7e9dd-d17d-40e0-8ac2-2d2826a2a3b1"), "ar", "Arabic" },
                    { new Guid("7d2a960e-105c-4955-a265-80bd56f79925"), "zh", "Chinese" },
                    { new Guid("8c8c18bb-9a8e-4ed5-8532-0a9b7a0e5fb0"), "es", "Spanish" },
                    { new Guid("d9983742-d037-4c61-acf8-af5b447e26bd"), "de", "German" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "CategoryName", "Name" },
                values: new object[,]
                {
                    { new Guid("17517908-434b-4a00-b462-9ca23ed7873b"), "Video & Animation", "Video Editing" },
                    { new Guid("211d7131-f450-4b07-aedb-9474a7715cba"), "Marketing", "SEO" },
                    { new Guid("386925e3-5a37-43b3-82cc-e8e577cf5964"), "Writing", "Translation" },
                    { new Guid("3e101772-71e3-4ec4-bbaf-fdf5ecdbf27b"), "Programming", "React" },
                    { new Guid("5273aa01-a444-4541-b6d3-b8224084ffb5"), "Design", "Adobe Illustrator" },
                    { new Guid("5547ee3a-7388-419d-9fd5-74aca2674409"), "Marketing", "Digital Marketing" },
                    { new Guid("595a83b9-2fc6-4e44-a438-6b0a1339f3e4"), "Video & Animation", "Animation" },
                    { new Guid("5a7d9c78-7d00-44ed-8542-1609ccd15582"), "Programming", "C#" },
                    { new Guid("6d18143d-07de-4868-94f6-eac5da714d24"), "Marketing", "Email Marketing" },
                    { new Guid("7b3e7a0a-6f7c-4d46-be12-06e0f277c40b"), "Programming", "TypeScript" },
                    { new Guid("7c148b09-baea-4f2e-9fe4-99c7ddfaa6d9"), "Programming", "Flutter" },
                    { new Guid("8038a4b3-8e7a-4e51-b6e0-ff6770e554ec"), "Programming", "JavaScript" },
                    { new Guid("a0122dee-5a4a-4fdd-b444-c4023a52f6b7"), "Design", "Figma" },
                    { new Guid("a2825b0b-ecf2-49f2-82c3-c3aec7393ed6"), "Programming", "Python" },
                    { new Guid("a45816b5-de0f-4096-abc0-dafd80778da6"), "Design", "Adobe Photoshop" },
                    { new Guid("a538d5e6-43e1-4410-a9a2-b37763094646"), "Writing", "Copywriting" },
                    { new Guid("a7171cca-2452-4ccf-a870-75b0cb2350aa"), "Marketing", "Content Writing" },
                    { new Guid("b56ae3b2-e008-478f-b4af-4e33246be8b7"), "Design", "UI/UX Design" },
                    { new Guid("c28573da-f1c0-498a-af84-cad1e24c1fcf"), "Writing", "Technical Writing" },
                    { new Guid("c434e0b6-ae0e-40df-8d22-916e9a5d70cb"), "Programming", "Swift" },
                    { new Guid("c4b35056-0be4-4170-8b9b-ec934c3672da"), "Design", "Logo Design" },
                    { new Guid("ce105a77-bc7c-4ee4-a370-c6d39c4d52bd"), "Design", "Graphic Design" },
                    { new Guid("e1075a59-b517-43aa-b7f6-cc61be73632a"), "Business", "Data Analysis" },
                    { new Guid("ee11583e-6bcb-4906-b389-5fdd086ee533"), "Marketing", "Social Media Marketing" },
                    { new Guid("f093bde3-b8e9-4724-84e2-4a1cef5091d1"), "Design", "3D Modeling" },
                    { new Guid("f5ebb989-b72d-43ca-899d-7bd33a3b62c2"), "Programming", "Java" },
                    { new Guid("f94540d4-2c94-4abf-b992-51f40c4d1dfa"), "Programming", "Node.js" },
                    { new Guid("fc23e18a-90b1-4231-9839-698357dcea8e"), "Business", "Business Consulting" },
                    { new Guid("fd1905b2-b62f-4cbf-a0b6-8c94a611c9c3"), "Video & Animation", "After Effects" },
                    { new Guid("fdfd315a-5640-4900-8055-b4addaa7200e"), "Programming", "Kotlin" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "DescriptionAr", "Icon", "Name", "NameAr", "ParentId" },
                values: new object[,]
                {
                    { new Guid("0311a6db-c13b-4295-a88a-1c714131ca37"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1800), null, null, null, "Marketing Strategy", "استراتيجية التسويق", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("058eb4b6-31b4-49f7-a995-714014a8c5d2"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1770), null, null, null, "SEO", "تحسين محركات البحث", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("074ca8ea-0dc6-4742-a0c6-f30f1162c81c"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1910), null, null, null, "Market Research", "أبحاث السوق", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("077a6d57-d69d-4efb-a82d-64dde9de0877"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1740), null, null, null, "AI & Machine Learning", "الذكاء الاصطناعي والتعلم الآلي", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("0811a81f-fb58-4b56-8d16-209a09708b41"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1850), null, null, null, "Proofreading", "التدقيق اللغوي", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("11a0ecc5-e038-439a-b511-57caea3ac8fe"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1970), null, null, null, "Music Production", "إنتاج الموسيقى", new Guid("01a3e221-575b-41c1-bef6-ea51510675d8") },
                    { new Guid("1216379d-2f7d-48eb-8df2-9f1b56d730ad"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1980), null, null, null, "Life Coaching", "تدريب الحياة", new Guid("f3ccf4c9-a49a-467a-91c3-8faebbaa9d3e") },
                    { new Guid("1389cf63-5b14-4741-a546-9e4bb4a95340"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1990), null, null, null, "Career Coaching", "التدريب المهني", new Guid("f3ccf4c9-a49a-467a-91c3-8faebbaa9d3e") },
                    { new Guid("157ac9e0-d00f-4a13-8ddf-585b14b5d97a"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1750), null, null, null, "DevOps & Cloud", "ديف أوبس والحوسبة السحابية", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("17135922-edaa-47cb-bf63-d7e4f3b48c64"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1790), null, null, null, "Content Marketing", "تسويق المحتوى", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("1f26b9f3-e6d2-4049-a267-9b0af9d41976"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1810), null, null, null, "Influencer Marketing", "التسويق عبر المؤثرين", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("27587cc3-7592-4aef-ad10-1aecb8f8d41d"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1690), null, null, null, "Book Cover Design", "تصميم أغلفة الكتب", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("27ee01d4-075a-4bdb-aa36-b535c34dcb85"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1890), null, null, null, "3D Animation", "الرسوم المتحركة ثلاثية الأبعاد", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("2d19f988-fc5b-4075-ba5e-af0bec63e7ad"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1930), null, null, null, "Data Entry", "إدخال البيانات", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("2e6b4d6c-569b-42d3-a2e3-7d2d1910ded7"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1860), null, null, null, "Academic Writing", "الكتابة الأكاديمية", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("2ed31f34-0ef3-4546-8bc2-a49bc0c03208"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1660), null, null, null, "Brand Identity", "هوية العلامة التجارية", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("3fd553bc-519b-47bc-80f7-3d9179df049b"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1680), null, null, null, "Packaging Design", "تصميم التغليف", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("40b82e7c-42af-47ef-a13a-ab0b7c6e5a59"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1880), null, null, null, "2D Animation", "الرسوم المتحركة ثنائية الأبعاد", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("5ff7395a-e65b-4f09-b3bf-7522e03d6bef"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1950), null, null, null, "Voice Over", "التعليق الصوتي", new Guid("01a3e221-575b-41c1-bef6-ea51510675d8") },
                    { new Guid("62855717-995b-4b9d-892b-52976189c847"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1670), null, null, null, "Social Media Design", "تصميم وسائل التواصل الاجتماعي", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("6536eb2b-8e3c-481e-a9f0-3cccb546b3de"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1680), null, null, null, "Illustration", "الرسم التوضيحي", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("6cfacf43-b793-44b1-b9e0-a12114e4f490"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1940), null, null, null, "Financial Consulting", "الاستشارات المالية", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("77edc9c0-c049-4f35-900b-9533d3dabfad"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1700), null, null, null, "UI/UX Design", "تصميم واجهة وتجربة المستخدم", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("7c68acc3-b84f-41c5-9bbd-bcb9644b482d"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1830), null, null, null, "Technical Writing", "الكتابة التقنية", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("860a23ae-a4e4-43bc-980e-7f363a7477e7"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1740), null, null, null, "Automation & Bots", "الأتمتة والروبوتات", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("8a59f3cf-8276-486b-9c7b-88ad896e468b"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1840), null, null, null, "Translation", "الترجمة", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("8d63cb3e-216a-4236-ac08-e2d3d1141ead"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1720), null, null, null, "E-commerce Development", "تطوير التجارة الإلكترونية", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("92377ee9-f2ce-4bbc-a011-1157c8381951"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1940), null, null, null, "Accounting", "المحاسبة", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("952ff931-b0af-4b3e-95d5-e6b4fa25834f"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1650), null, null, null, "Logo Design", "تصميم الشعارات", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("a03830fa-4cd9-46cf-b50b-c41a0abf1997"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1730), null, null, null, "API Development", "تطوير واجهات برمجة التطبيقات", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("a2e364bc-a984-40e2-8898-57c41be68dc8"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1960), null, null, null, "Podcast Editing", "تحرير البودكاست", new Guid("01a3e221-575b-41c1-bef6-ea51510675d8") },
                    { new Guid("a642c56d-1973-4459-89bc-9782410d4c05"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1770), null, null, null, "Social Media Marketing", "التسويق عبر وسائل التواصل الاجتماعي", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("a72b84c6-14fc-43b9-88a0-f840ec2b8c24"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1920), null, null, null, "Virtual Assistant", "المساعد الافتراضي", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("ab2f1e32-0ef4-448b-a81a-0dc65667866f"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1870), null, null, null, "Motion Graphics", "الرسوم المتحركة", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("ab8a6c68-41c4-445a-9d4e-73cb6fca4f18"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1760), null, null, null, "Cybersecurity", "الأمن السيبراني", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("ab9f7c34-2925-4464-8549-c34d564303ba"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1790), null, null, null, "Email Marketing", "التسويق عبر البريد الإلكتروني", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("b91362fd-f7c5-41f7-8cee-f81ac4d59efd"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1910), null, null, null, "Business Plans", "خطط الأعمال", new Guid("15808ecd-2352-4fcb-9ca3-48bf4975dcca") },
                    { new Guid("bc257127-937f-4894-8246-71f6b2f2a5f9"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(2000), null, null, null, "Online Tutoring", "التدريس عبر الإنترنت", new Guid("f3ccf4c9-a49a-467a-91c3-8faebbaa9d3e") },
                    { new Guid("bf9df5d9-4140-4f17-81b0-8f4cb45327df"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1820), null, null, null, "Copywriting", "كتابة المحتوى الإعلاني", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("c0e179a2-5a8e-4965-814e-3b85e4668bc6"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1880), null, null, null, "Explainer Videos", "فيديوهات توضيحية", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("c6a6cd78-d3b1-455c-aa4b-543f25bf8d2c"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1860), null, null, null, "Video Editing", "تحرير الفيديو", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("cac018e6-c9e4-4c1a-bb86-360228c1f5d7"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1840), null, null, null, "Resume Writing", "كتابة السيرة الذاتية", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("d0b828b0-426c-4b82-8151-7d4aa6fe93ed"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1780), null, null, null, "Paid Ads (Google/Facebook/TikTok)", "الإعلانات المدفوعة", new Guid("768acba4-7483-415f-9396-f4a4003b01c9") },
                    { new Guid("db835309-8069-4c02-9f6a-df0e0f61b02c"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1960), null, null, null, "Audio Mixing", "مزج الصوت", new Guid("01a3e221-575b-41c1-bef6-ea51510675d8") },
                    { new Guid("dffa0d88-0cbb-44a7-a378-b5f9f98efa66"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1660), null, null, null, "Business Cards & Stationery", "بطاقات العمل والقرطاسية", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("e90d921f-84e6-4197-b65a-f581feb6657c"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1720), null, null, null, "Mobile App Development", "تطوير تطبيقات الجوال", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("eefcb683-c27e-483c-b169-7c4712d6e264"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1700), null, null, null, "3D Modeling", "النمذجة ثلاثية الأبعاد", new Guid("00d77ed3-bfba-4c19-9e71-1e70ab3ba57d") },
                    { new Guid("f790c98e-b431-4f32-a161-a260b0aee170"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1820), null, null, null, "Blog Writing", "كتابة المدونات", new Guid("d2c9af66-b32e-4ffd-859d-c1f415fe6061") },
                    { new Guid("fa3c4ce7-a263-47af-b478-9a1dbf566882"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1900), null, null, null, "YouTube Editing", "تحرير فيديوهات يوتيوب", new Guid("b2b1b0c9-cdfe-476b-9e22-0a28ae17b9c8") },
                    { new Guid("fc00136c-0dc4-418b-99b1-5c53d6c001c4"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1710), null, null, null, "Web Development", "تطوير المواقع", new Guid("4481aeb8-ad87-4d52-8a69-219bb844f2c4") },
                    { new Guid("fdce20e3-9a0c-4312-8564-5502eb7fa8e8"), new DateTime(2026, 3, 5, 10, 44, 36, 476, DateTimeKind.Utc).AddTicks(1980), null, null, null, "Fitness Coaching", "التدريب على اللياقة البدنية", new Guid("f3ccf4c9-a49a-467a-91c3-8faebbaa9d3e") }
                });
        }
    }
}
