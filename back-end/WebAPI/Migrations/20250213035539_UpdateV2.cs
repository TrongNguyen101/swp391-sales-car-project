using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Is Deleted",
                table: "Cars",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CarColor",
                columns: table => new
                {
                    ColorID = table.Column<int>(name: "Color ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ColorName = table.Column<string>(name: "Color Name", type: "nvarchar(max)", nullable: true),
                    ColorImage = table.Column<string>(name: "Color Image", type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(name: "Is Deleted", type: "bit", nullable: false),
                    CarID = table.Column<int>(name: "Car ID", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarColor", x => x.ColorID);
                    table.ForeignKey(
                        name: "FK_CarColor_Cars_Car ID",
                        column: x => x.CarID,
                        principalTable: "Cars",
                        principalColumn: "Car ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "CarColor",
                columns: new[] { "Color ID", "Car ID", "Color Image", "Color Name", "Is Deleted" },
                values: new object[,]
                {
                    { 1, 1, "vinfast-vf3-white.png", "White", false },
                    { 2, 1, "vinfast-vf3-grey.png", "Grey", false },
                    { 3, 1, "vinfast-vf3-red.png", "Red", false },
                    { 4, 1, "vinfast-vf3-yellow.png", "Yellow", false },
                    { 5, 1, "vinfast-vf3-green.png", "Green", false },
                    { 6, 2, "vinfast-vf5-white.png", "White", false },
                    { 7, 2, "vinfast-vf5-grey.png", "Grey", false },
                    { 8, 2, "vinfast-vf5-red.png", "Red", false },
                    { 9, 2, "vinfast-vf5-yellow.png", "Yellow", false },
                    { 10, 2, "vinfast-vf5-green.png", "Green", false },
                    { 11, 3, "vinfast-vf6-white.png", "White", false },
                    { 12, 3, "vinfast-vf6-black.png", "Black", false },
                    { 13, 3, "vinfast-vf6-red.png", "Red", false },
                    { 14, 3, "vinfast-vf6-green.png", "Green", false },
                    { 15, 3, "vinfast-vf6-blue.png", "Blue", false },
                    { 16, 4, "vinfast-vf7-white.png", "White", false },
                    { 17, 4, "vinfast-vf7-black.png", "Black", false },
                    { 18, 4, "vinfast-vf7-red.png", "Red", false },
                    { 19, 4, "vinfast-vf7-green.png", "Green", false },
                    { 20, 4, "vinfast-vf7-blue.png", "Blue", false },
                    { 21, 5, "vinfast-vf8-white.png", "White", false },
                    { 22, 5, "vinfast-vf8-black.png", "Black", false },
                    { 23, 5, "vinfast-vf8-red.png", "Red", false },
                    { 24, 5, "vinfast-vf8-green.png", "Green", false },
                    { 25, 5, "vinfast-vf8-blue.png", "Blue", false },
                    { 26, 6, "vinfast-vf9-white.png", "White", false },
                    { 27, 6, "vinfast-vf9-black.png", "Black", false },
                    { 28, 6, "vinfast-vf9-red.png", "Red", false },
                    { 29, 6, "vinfast-vf9-green.png", "Green", false },
                    { 30, 6, "vinfast-vf9-blue.png", "Blue", false }
                });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 1,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5", "Is Deleted", "Quantity" },
                values: new object[] { null, null, null, null, null, false, 10 });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 2,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5", "Is Deleted", "Quantity" },
                values: new object[] { null, null, null, null, null, false, 10 });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 3,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5", "Is Deleted", "Quantity" },
                values: new object[] { null, null, null, null, null, false, 10 });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 4,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5", "Is Deleted", "Quantity" },
                values: new object[] { null, null, null, null, null, false, 10 });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 5,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5", "Is Deleted", "Quantity" },
                values: new object[] { null, null, null, null, null, false, 10 });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 6,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5", "Is Deleted", "Quantity" },
                values: new object[] { null, null, null, null, null, false, 10 });

            migrationBuilder.CreateIndex(
                name: "IX_CarColor_Car ID",
                table: "CarColor",
                column: "Car ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarColor");

            migrationBuilder.DropColumn(
                name: "Is Deleted",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Cars");

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 1,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { "vinfast-vf3-white.png", "vinfast-vf3-grey.png", "vinfast-vf3-red.png", "vinfast-vf3-yellow.png", "vinfast-vf3-green.png" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 2,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { "vinfast-vf5-white.png", "vinfast-vf5-grey.png", "vinfast-vf5-red.png", "vinfast-vf5-yellow.png", "vinfast-vf5-green.png" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 3,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { "vinfast-vf6-white.png", "vinfast-vf6-black.png", "vinfast-vf6-red.png", "vinfast-vf6-green.png", "vinfast-vf6-blue.png" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 4,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { "vinfast-vf7-white.png", "vinfast-vf7-black.png", "vinfast-vf7-red.png", "vinfast-vf7-green.png", "vinfast-vf7-blue.png" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 5,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { "vinfast-vf8-white.png", "vinfast-vf8-black.png", "vinfast-vf8-red.png", "vinfast-vf8-green.png", "vinfast-vf8-blue.png" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 6,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { "vinfast-vf9-white.png", "vinfast-vf9-black.png", "vinfast-vf9-red.png", "vinfast-vf9-green.png", "vinfast-vf9-blue.png" });
        }
    }
}
