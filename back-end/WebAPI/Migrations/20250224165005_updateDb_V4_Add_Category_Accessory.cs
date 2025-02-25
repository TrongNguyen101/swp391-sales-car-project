using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateDb_V4_Add_Category_Accessory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    CategoryID = table.Column<int>(name: "Category ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(name: "Category Name", type: "nvarchar(max)", nullable: true),
                    CategoryParentsID = table.Column<int>(name: "Category Parents ID", type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(name: "Is Deleted", type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.CategoryID);
                });

            migrationBuilder.CreateTable(
                name: "Accessory",
                columns: table => new
                {
                    AccessoryID = table.Column<int>(name: "Accessory ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccessoryName = table.Column<string>(name: "Accessory Name", type: "nvarchar(max)", nullable: true),
                    AccessoryImage = table.Column<string>(name: "Accessory Image", type: "nvarchar(max)", nullable: true),
                    AccessoryPrice = table.Column<double>(name: "Accessory Price", type: "float", nullable: false),
                    IsDeleted = table.Column<bool>(name: "Is Deleted", type: "bit", nullable: false),
                    CategoryID = table.Column<int>(name: "Category ID", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accessory", x => x.AccessoryID);
                    table.ForeignKey(
                        name: "FK_Accessory_Category_Category ID",
                        column: x => x.CategoryID,
                        principalTable: "Category",
                        principalColumn: "Category ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Category ID", "Is Deleted", "Category Name", "Category Parents ID" },
                values: new object[,]
                {
                    { 1, false, "New product", 0 },
                    { 2, false, "LifeStyle", 0 },
                    { 3, false, "Electric car accessories", 0 },
                    { 4, false, "Gasoline car accessories", 0 },
                    { 5, false, "Accessories of VF3", 3 },
                    { 6, false, "Accessories of VF5", 3 },
                    { 7, false, "Accessories of VF6", 3 },
                    { 8, false, "Accessories of VF7", 3 },
                    { 9, false, "Accessories of VF8", 3 },
                    { 10, false, "Accessories of VF9", 3 }
                });

            migrationBuilder.InsertData(
                table: "Accessory",
                columns: new[] { "Accessory ID", "Category ID", "Accessory Image", "Is Deleted", "Accessory Name", "Accessory Price" },
                values: new object[,]
                {
                    { 1, 5, "vinfast-vf3.png", false, "Vinfast VF3", 100000000.0 },
                    { 2, 6, "vinfast-vf5.png", false, "Vinfast VF5", 200000000.0 },
                    { 3, 7, "vinfast-vf6.png", false, "Vinfast VF6", 300000000.0 },
                    { 4, 8, "vinfast-vf7.png", false, "Vinfast VF7", 400000000.0 },
                    { 5, 1, "vinfast-vf8.png", false, "Vinfast VF8", 500000000.0 },
                    { 6, 2, "vinfast-vf9.png", false, "Vinfast VF9", 600000000.0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accessory_Category ID",
                table: "Accessory",
                column: "Category ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accessory");

            migrationBuilder.DropTable(
                name: "Category");
        }
    }
}
