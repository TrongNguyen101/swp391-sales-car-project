using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDb_V44_Add_Accessory_properties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Accessory",
                type: "nvarchar(max)",
                maxLength: 5000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                column: "Description",
                value: "A convenient home charger for your VinFast electric vehicle.");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 2,
                column: "Description",
                value: "Durable rubber floor mats for the VinFast VF3.");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 3,
                column: "Description",
                value: "High-quality rearview camera for the VinFast VF3.");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 4,
                column: "Description",
                value: "Durable rubber floor mats for the VinFast VF5.");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 5,
                column: "Description",
                value: "Heat-resistant film package for the VinFast VF5.");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 6,
                column: "Description",
                value: "3D trunk mat for the VinFast VF5.");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 7,
                column: "Description",
                value: "Heat-resistant film package for the VinFast VF6.");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 8,
                column: "Description",
                value: "Durable rubber floor mats for the VinFast VF6.");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 9,
                column: "Description",
                value: "3D trunk mat for the VinFast VF6.");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Accessory");
        }
    }
}
