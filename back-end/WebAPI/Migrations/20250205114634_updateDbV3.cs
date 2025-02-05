using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateDbV3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color Image 4",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color Image 5",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 1,
                columns: new[] { "Color Image 4", "Color Image 5", "Car Name" },
                values: new object[] { "vinfast-vf3-yellow.png", "vinfast-vf3-green.png", "Vinfast VF3" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 2,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5", "Image Banner", "Car Name", "Spec Image" },
                values: new object[] { "vinfast-vf5-white.png", "vinfast-vf5-grey.png", "vinfast-vf5-red.png", "vinfast-vf5-yellow.png", "vinfast-vf5-green.png", "vinfast-banner.png", "Vinfast VF5", "vinfast-vf5-spec.png" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 3,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5", "Image Banner", "Car Name", "Spec Image" },
                values: new object[] { "vinfast-vf6-white.png", "vinfast-vf6-black.png", "vinfast-vf6-red.png", "vinfast-vf6-green.png", "vinfast-vf6-blue.png", "vinfast-banner.png", "Vinfast VF6", "vinfast-vf6-spec.png" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 4,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5", "Image Banner", "Car Name", "Spec Image" },
                values: new object[] { "vinfast-vf7-white.png", "vinfast-vf7-black.png", "vinfast-vf7-red.png", "vinfast-vf7-green.png", "vinfast-vf7-blue.png", "vinfast-banner.png", "Vinfast VF7", "vinfast-vf7-spec.png" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 5,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5", "Image Banner", "Car Name", "Spec Image" },
                values: new object[] { "vinfast-vf8-white.png", "vinfast-vf8-black.png", "vinfast-vf8-red.png", "vinfast-vf8-green.png", "vinfast-vf8-blue.png", "vinfast-banner.png", "Vinfast VF8", "vinfast-vf8-spec.png" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 6,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5", "Image Banner", "Car Name", "Spec Image" },
                values: new object[] { "vinfast-vf9-white.png", "vinfast-vf9-black.png", "vinfast-vf9-red.png", "vinfast-vf9-green.png", "vinfast-vf9-blue.png", "vinfast-banner.png", "Vinfast VF9", "vinfast-vf9-spec.png" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color Image 4",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Color Image 5",
                table: "Cars");

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 1,
                column: "Car Name",
                value: "VF 3");

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 2,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Image Banner", "Car Name", "Spec Image" },
                values: new object[] { null, null, null, null, "VF 5", null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 3,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Image Banner", "Car Name", "Spec Image" },
                values: new object[] { null, null, null, null, "VF 6", null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 4,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Image Banner", "Car Name", "Spec Image" },
                values: new object[] { null, null, null, null, "VF 7", null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 5,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Image Banner", "Car Name", "Spec Image" },
                values: new object[] { null, null, null, null, "VF 8", null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 6,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Image Banner", "Car Name", "Spec Image" },
                values: new object[] { null, null, null, null, "VF 9", null });
        }
    }
}
