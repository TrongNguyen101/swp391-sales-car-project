using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Update_temple_data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                column: "Category ID",
                value: 2);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                column: "Category ID",
                value: 5);
        }
    }
}
