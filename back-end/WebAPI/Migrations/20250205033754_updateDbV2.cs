using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateDbV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Car Image",
                table: "Cars",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "Car Seat",
                table: "Cars",
                newName: "Seats");

            migrationBuilder.RenameColumn(
                name: "Car Price",
                table: "Cars",
                newName: "Spec Image");

            migrationBuilder.AddColumn<string>(
                name: "Color Image 1",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color Image 2",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color Image 3",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image Banner",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Price Battery Own",
                table: "Cars",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Price Battery Rental",
                table: "Cars",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Price Deposite",
                table: "Cars",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 1,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Image Banner", "Price Battery Own", "Price Battery Rental", "Price Deposite", "Spec Image" },
                values: new object[] { "vinfast-vf3-white.png", "vinfast-vf3-grey.png", "vinfast-vf3-red.png", "vinfast-vf3-banner.png", 322000000.0, 240000000.0, 15000000.0, "vinfast-vf3-spec.png" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 2,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Image Banner", "Price Battery Own", "Price Battery Rental", "Price Deposite", "Spec Image" },
                values: new object[] { null, null, null, null, 540000000.0, 460000000.0, 20000000.0, null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 3,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Image Banner", "Price Battery Own", "Price Battery Rental", "Price Deposite", "Spec Image" },
                values: new object[] { null, null, null, null, 765000000.0, 675000000.0, 30000000.0, null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 4,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Image Banner", "Price Battery Own", "Price Battery Rental", "Price Deposite", "Spec Image" },
                values: new object[] { null, null, null, null, 999000000.0, 850000000.0, 50000000.0, null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 5,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Image Banner", "Price Battery Own", "Price Battery Rental", "Price Deposite", "Spec Image" },
                values: new object[] { null, null, null, null, 1359000000.0, 1170000000.0, 50000000.0, null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 6,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Image Banner", "Price Battery Own", "Price Battery Rental", "Price Deposite", "Spec Image" },
                values: new object[] { null, null, null, null, 2129000000.0, 1604000000.0, 50000000.0, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color Image 1",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Color Image 2",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Color Image 3",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Image Banner",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Price Battery Own",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Price Battery Rental",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Price Deposite",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Cars",
                newName: "Car Image");

            migrationBuilder.RenameColumn(
                name: "Spec Image",
                table: "Cars",
                newName: "Car Price");

            migrationBuilder.RenameColumn(
                name: "Seats",
                table: "Cars",
                newName: "Car Seat");

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 1,
                column: "Car Price",
                value: "240,000,000");

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 2,
                column: "Car Price",
                value: "460,000,000");

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 3,
                column: "Car Price",
                value: "675,000,000");

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 4,
                column: "Car Price",
                value: "850,000,000");

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 5,
                column: "Car Price",
                value: "1,170,000,000");

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 6,
                column: "Car Price",
                value: "1,604,000,000");
        }
    }
}
