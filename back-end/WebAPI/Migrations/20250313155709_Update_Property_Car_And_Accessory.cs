using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Update_Property_Car_And_Accessory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                column: "Is Showed",
                value: true);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 2,
                column: "Is Showed",
                value: true);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 3,
                column: "Is Showed",
                value: true);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 4,
                column: "Is Showed",
                value: true);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 5,
                column: "Is Showed",
                value: true);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 6,
                column: "Is Showed",
                value: true);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 7,
                column: "Is Showed",
                value: true);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 8,
                column: "Is Showed",
                value: true);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 9,
                column: "Is Showed",
                value: true);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 1,
                column: "Is Show",
                value: true);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 2,
                column: "Is Show",
                value: true);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 3,
                column: "Is Show",
                value: true);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 4,
                column: "Is Show",
                value: true);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 5,
                column: "Is Show",
                value: true);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 6,
                column: "Is Show",
                value: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                column: "Is Showed",
                value: false);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 2,
                column: "Is Showed",
                value: false);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 3,
                column: "Is Showed",
                value: false);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 4,
                column: "Is Showed",
                value: false);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 5,
                column: "Is Showed",
                value: false);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 6,
                column: "Is Showed",
                value: false);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 7,
                column: "Is Showed",
                value: false);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 8,
                column: "Is Showed",
                value: false);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 9,
                column: "Is Showed",
                value: false);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 1,
                column: "Is Show",
                value: false);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 2,
                column: "Is Show",
                value: false);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 3,
                column: "Is Show",
                value: false);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 4,
                column: "Is Show",
                value: false);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 5,
                column: "Is Show",
                value: false);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 6,
                column: "Is Show",
                value: false);
        }
    }
}
