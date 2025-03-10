using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDb_V43_Add_Accessory_properties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Accessory Name",
                table: "Accessory",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Accessory Image",
                table: "Accessory",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Accessory",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Dimensions",
                table: "Accessory",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Material",
                table: "Accessory",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Origin",
                table: "Accessory",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Accessory",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Warranty",
                table: "Accessory",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "Accessory",
                type: "float",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                columns: new[] { "Color", "Dimensions", "Material", "Origin", "Quantity", "Warranty", "Weight" },
                values: new object[] { "White", "30x20x10 cm", "Plastic", "Vietnam", 10, "1 year", 2.5 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 2,
                columns: new[] { "Color", "Dimensions", "Material", "Origin", "Quantity", "Warranty", "Weight" },
                values: new object[] { "Black", "50x40x5 cm", "Rubber", "Vietnam", 10, "6 months", 1.2 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 3,
                columns: new[] { "Color", "Dimensions", "Material", "Origin", "Quantity", "Warranty", "Weight" },
                values: new object[] { "Black", "10x5x5 cm", "Metal", "Japan", 10, "2 years", 0.29999999999999999 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 4,
                columns: new[] { "Color", "Dimensions", "Material", "Origin", "Quantity", "Warranty", "Weight" },
                values: new object[] { "Black", "50x40x5 cm", "Rubber", "Vietnam", 10, "6 months", 1.2 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 5,
                columns: new[] { "Color", "Dimensions", "Material", "Origin", "Quantity", "Warranty", "Weight" },
                values: new object[] { "Transparent", "100x50x0.1 cm", "Film", "Vietnam", 10, "1 year", 0.5 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 6,
                columns: new[] { "Color", "Dimensions", "Material", "Origin", "Quantity", "Warranty", "Weight" },
                values: new object[] { "Black", "100x80x5 cm", "Rubber", "Vietnam", 10, "6 months", 2.0 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 7,
                columns: new[] { "Color", "Dimensions", "Material", "Origin", "Quantity", "Warranty", "Weight" },
                values: new object[] { "Transparent", "100x50x0.1 cm", "Film", "Vietnam", 10, "1 year", 0.5 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 8,
                columns: new[] { "Color", "Dimensions", "Material", "Origin", "Quantity", "Warranty", "Weight" },
                values: new object[] { "Black", "50x40x5 cm", "Rubber", "Vietnam", 10, "6 months", 1.2 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 9,
                columns: new[] { "Color", "Dimensions", "Material", "Origin", "Quantity", "Warranty", "Weight" },
                values: new object[] { "Black", "100x80x5 cm", "Rubber", "Vietnam", 10, "6 months", 2.0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Accessory");

            migrationBuilder.DropColumn(
                name: "Dimensions",
                table: "Accessory");

            migrationBuilder.DropColumn(
                name: "Material",
                table: "Accessory");

            migrationBuilder.DropColumn(
                name: "Origin",
                table: "Accessory");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Accessory");

            migrationBuilder.DropColumn(
                name: "Warranty",
                table: "Accessory");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Accessory");

            migrationBuilder.AlterColumn<string>(
                name: "Accessory Name",
                table: "Accessory",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "Accessory Image",
                table: "Accessory",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);
        }
    }
}
