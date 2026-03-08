using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace alina_backend.Migrations
{
    /// <inheritdoc />
    public partial class IncreaseMediaFileNameLength : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "FileName",
                table: "Media",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000001"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6580));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000002"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6580));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000003"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6590));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000004"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6590));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000005"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6580));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000006"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6590));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000007"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6590));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000008"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6600));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000001"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6600));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000002"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6600));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000003"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6610));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000004"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6610));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000005"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6610));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000006"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6610));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000007"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6620));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000008"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6620));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000009"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6620));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000010"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6630));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000011"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6630));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000012"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6630));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000013"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6640));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000014"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6650));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000015"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6650));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000016"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6650));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000017"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6660));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000018"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6660));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000019"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6660));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000020"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6660));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000021"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6670));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000022"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6670));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000023"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6670));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000024"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6680));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000025"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6680));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000026"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6680));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000027"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6680));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000028"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6690));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000029"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6690));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000030"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6690));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000031"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6700));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000032"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6700));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000033"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6700));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000034"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6700));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000035"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6710));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000036"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6710));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000037"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6710));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000038"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6720));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000039"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6720));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000040"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6720));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000041"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6720));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000042"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6730));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000043"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6730));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000044"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6730));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000045"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6740));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000046"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6740));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000047"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6740));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000048"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6740));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000049"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6750));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000050"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6750));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000051"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6750));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6320));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6320));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6320));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6320));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6320));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6320));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 8, 11, 11, 14, 140, DateTimeKind.Utc).AddTicks(6320));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "FileName",
                table: "Media",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000001"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6330));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000002"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6340));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000003"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6350));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000004"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6350));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000005"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6340));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000006"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6350));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000007"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6350));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000008"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6360));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000001"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6360));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000002"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6360));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000003"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6370));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000004"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6370));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000005"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6370));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000006"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6370));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000007"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6380));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000008"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6380));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000009"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6380));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000010"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6390));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000011"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6390));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000012"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6390));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000013"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6390));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000014"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6400));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000015"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6400));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000016"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6400));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000017"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6410));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000018"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6410));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000019"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6410));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000020"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6410));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000021"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6420));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000022"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6420));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000023"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6420));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000024"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6430));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000025"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6430));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000026"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6430));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000027"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6440));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000028"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6440));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000029"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6440));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000030"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6440));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000031"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6450));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000032"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6450));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000033"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6450));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000034"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6460));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000035"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6460));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000036"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6460));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000037"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6470));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000038"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6480));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000039"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6480));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000040"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6490));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000041"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6490));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000042"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6490));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000043"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6500));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000044"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6500));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000045"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6500));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000046"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6500));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000047"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6510));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000048"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6510));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000049"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6510));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000050"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6520));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000051"),
                column: "CreatedAt",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6520));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "AED",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "BHD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "JOD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "KWD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "OMR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "SAR",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));

            migrationBuilder.UpdateData(
                table: "CurrencyRates",
                keyColumn: "Code",
                keyValue: "USD",
                column: "LastUpdated",
                value: new DateTime(2026, 3, 7, 9, 49, 51, 66, DateTimeKind.Utc).AddTicks(6070));
        }
    }
}
