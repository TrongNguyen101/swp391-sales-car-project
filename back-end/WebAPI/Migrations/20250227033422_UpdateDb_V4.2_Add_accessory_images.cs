using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDb_V42_Add_accessory_images : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccessoryColor",
                columns: table => new
                {
                    ColorID = table.Column<int>(name: "Color ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ColorName = table.Column<string>(name: "Color Name", type: "nvarchar(max)", nullable: true),
                    ColorImage = table.Column<string>(name: "Color Image", type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(name: "Is Deleted", type: "bit", nullable: false),
                    AccessoryID = table.Column<int>(name: "Accessory ID", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessoryColor", x => x.ColorID);
                    table.ForeignKey(
                        name: "FK_AccessoryColor_Accessory_Accessory ID",
                        column: x => x.AccessoryID,
                        principalTable: "Accessory",
                        principalColumn: "Accessory ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                column: "Accessory Name",
                value: "VinFast Home Charger");

            migrationBuilder.InsertData(
                table: "AccessoryColor",
                columns: new[] { "Color ID", "Accessory ID", "Color Image", "Color Name", "Is Deleted" },
                values: new object[,]
                {
                    { 1, 1, "homecharger-1.png", "White", false },
                    { 2, 1, "homecharger-2.png", "White", false },
                    { 3, 1, "homecharger-3.png", "White", false },
                    { 4, 1, "homecharger-4.png", "White", false },
                    { 5, 2, "VF3_tham_nhua_detail1.png", "White", false },
                    { 6, 2, "VF3_tham_nhua_detail2.png", "White", false },
                    { 7, 3, "VF3_camera_lui_1.jpg", "White", false },
                    { 8, 3, "VF3_camera_lui_1.jpg", "White", false }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccessoryColor_Accessory ID",
                table: "AccessoryColor",
                column: "Accessory ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccessoryColor");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                column: "Accessory Name",
                value: "Sạc tại nhà");
        }
    }
}
