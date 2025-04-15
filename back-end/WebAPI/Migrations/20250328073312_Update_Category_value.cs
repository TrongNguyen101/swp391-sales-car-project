using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Update_Category_value : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 1,
                column: "Category Name",
                value: "All accessories");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Category ID",
                keyValue: 1,
                column: "Category Name",
                value: "New product");

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Category ID", "Is Deleted", "Category Name", "Category Parents ID" },
                values: new object[] { 2, false, "LifeStyle", 0 });
        }
    }
}
