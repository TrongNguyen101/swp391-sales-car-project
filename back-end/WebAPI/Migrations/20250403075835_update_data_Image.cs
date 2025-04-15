using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class update_data_Image : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 8,
                column: "Color Image",
                value: "VF3_camera_lui_2.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 8,
                column: "Color Image",
                value: "VF3_camera_lui_1.jpg");
        }
    }
}
