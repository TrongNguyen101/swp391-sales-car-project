using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Update_data_categories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 10);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                column: "Category ID",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 2,
                column: "Category ID",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 3,
                column: "Category ID",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 4,
                column: "Category ID",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 5,
                column: "Category ID",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 6,
                column: "Category ID",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 7,
                column: "Category ID",
                value: 5);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 8,
                column: "Category ID",
                value: 5);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 9,
                column: "Category ID",
                value: 5);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 201,
                column: "Category ID",
                value: 5);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 202,
                column: "Category ID",
                value: 6);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 203,
                column: "Category ID",
                value: 6);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 204,
                columns: new[] { "Category ID", "Accessory Name" },
                values: new object[] { 7, "VinFast VF8 Car Roof Top Box" });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 205,
                columns: new[] { "Category ID", "Accessory Name" },
                values: new object[] { 7, "2D VF8 Plastic Floor Mats" });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 206,
                columns: new[] { "Category ID", "Dimensions" },
                values: new object[] { 7, "100x80x5cm" });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 1,
                column: "Category Name",
                value: "Common car accessories");

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 2,
                column: "Category Name",
                value: "Electric car accessories");

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 3,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Accessories of VF3", 2 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 4,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Accessories of VF5", 2 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 5,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Accessories of VF6", 2 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 6,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Accessories of VF7", 2 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 7,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Accessories of VF8", 2 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 8,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Accessories of VF9", 2 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                column: "Category ID",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 2,
                column: "Category ID",
                value: 5);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 3,
                column: "Category ID",
                value: 5);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 4,
                column: "Category ID",
                value: 6);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 5,
                column: "Category ID",
                value: 6);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 6,
                column: "Category ID",
                value: 6);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 7,
                column: "Category ID",
                value: 7);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 8,
                column: "Category ID",
                value: 7);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 9,
                column: "Category ID",
                value: 7);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 201,
                column: "Category ID",
                value: 7);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 202,
                column: "Category ID",
                value: 8);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 203,
                column: "Category ID",
                value: 8);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 204,
                columns: new[] { "Category ID", "Accessory Name" },
                values: new object[] { 9, "VinFast VF 8 Car Roof Top Box" });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 205,
                columns: new[] { "Category ID", "Accessory Name" },
                values: new object[] { 9, "2D VF 8 Plastic Floor Mats" });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 206,
                columns: new[] { "Category ID", "Dimensions" },
                values: new object[] { 9, "100x80x5 cm" });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 1,
                column: "Category Name",
                value: "All accessories");

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 2,
                column: "Category Name",
                value: "Common car accessories");

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 3,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Electric car accessories", 0 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 4,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Gasoline car accessories", 0 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 5,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Accessories of VF3", 3 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 6,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Accessories of VF5", 3 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 7,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Accessories of VF6", 3 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 8,
                columns: new[] { "Category Name", "Category Parents ID" },
                values: new object[] { "Accessories of VF7", 3 });

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Category ID", "Is Deleted", "Category Name", "Category Parents ID" },
                values: new object[,]
                {
                    { 9, false, "Accessories of VF8", 3 },
                    { 10, false, "Accessories of VF9", 3 }
                });
        }
    }
}
