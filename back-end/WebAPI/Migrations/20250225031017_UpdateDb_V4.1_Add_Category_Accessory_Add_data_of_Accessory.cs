using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDb_V41_Add_Category_Accessory_Add_data_of_Accessory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                columns: new[] { "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { "Sac_tai_nha.png", "Sạc tại nhà", 6000000.0 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 2,
                columns: new[] { "Category ID", "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { 5, "VF3_tham_nhua.png", "Thảm nhựa VF3", 1668000.0 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 3,
                columns: new[] { "Category ID", "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { 5, "VF3_Camera_lui.png", "Camera Lùi VF3", 26720000.0 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 4,
                columns: new[] { "Category ID", "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { 6, "VF5_tham_nhua.png", "Thảm nhựa VF5", 1969000.0 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 5,
                columns: new[] { "Category ID", "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { 6, "VF5_Goi_dan_phim_cach_nhiet.png", "Gói Dán Film Cách Nhiệt VinFast VF5", 5500000.0 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 6,
                columns: new[] { "Category ID", "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { 6, "VF5_Tham_cop.png", "Thảm cốp 3D VF5", 990000.0 });

            migrationBuilder.InsertData(
                table: "Accessory",
                columns: new[] { "Accessory ID", "Category ID", "Accessory Image", "Is Deleted", "Accessory Name", "Accessory Price" },
                values: new object[,]
                {
                    { 7, 7, "VF6_Goi_dan_phim_cach_nhiet.png", false, "Gói dán film cách nhiệt VF6", 5500000.0 },
                    { 8, 7, "VF6_tham_nhua.png", false, "Thảm nhựa 3D VF6", 1990000.0 },
                    { 9, 7, "VF6_Tham_cop.png", false, "Thảm cốp 3D VF6", 990000.0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 9);

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 1,
                columns: new[] { "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { "vinfast-vf3.png", "Vinfast VF3", 100000000.0 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 2,
                columns: new[] { "Category ID", "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { 6, "vinfast-vf5.png", "Vinfast VF5", 200000000.0 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 3,
                columns: new[] { "Category ID", "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { 7, "vinfast-vf6.png", "Vinfast VF6", 300000000.0 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 4,
                columns: new[] { "Category ID", "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { 8, "vinfast-vf7.png", "Vinfast VF7", 400000000.0 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 5,
                columns: new[] { "Category ID", "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { 1, "vinfast-vf8.png", "Vinfast VF8", 500000000.0 });

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 6,
                columns: new[] { "Category ID", "Accessory Image", "Accessory Name", "Accessory Price" },
                values: new object[] { 2, "vinfast-vf9.png", "Vinfast VF9", 600000000.0 });
        }
    }
}
