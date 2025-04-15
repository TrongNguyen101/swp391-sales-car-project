using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Add_more_AccessoryImage_data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AccessoryImage",
                columns: new[] { "Color ID", "Accessory ID", "Color Image", "Color Name", "Is Deleted" },
                values: new object[,]
                {
                    { 201, 201, "Tham_Cop_3D_VF7.png", "White", false },
                    { 202, 202, "Goi_Dan_Film_Cach_Nhiet_VinFast_VF7.png", "White", false },
                    { 203, 203, "Tham_San_3D_VF_7.png", "White", false },
                    { 204, 203, "Tham_San_3D_VF72.png", "White", false },
                    { 205, 204, "Cop_Noc_Phi_Thuyen_Oto_VinFast_ VF8.png", "White", false },
                    { 206, 204, "Cop_Noc_Phi_Thuyen_O_To_VinFast_VF82.png", "White", false },
                    { 207, 205, "Tham_San_Nhua_2D_VF8.png", "White", false },
                    { 208, 205, "Tham_San_Nhua_2D_VF82.png", "White", false },
                    { 209, 205, "Tham_San_Nhua_2D_VF83.png", "White", false },
                    { 210, 205, "Tham_San_Nhua_2D_VF84.png", "White", false },
                    { 211, 206, "Goi_Film_Cach_Nhiet_Dan_Tran_VinFast_VF8.png", "White", false },
                    { 212, 4, "VF5_tham_nhua.png", "White", false },
                    { 213, 4, "Tham San Nhua 2D VF 52.png", "White", false },
                    { 214, 4, "Tham San Nhua 2D VF 53.png", "White", false },
                    { 215, 4, "Tham San Nhua 2D VF 54.png", "White", false },
                    { 216, 4, "Tham San Nhua 2D VF 55.png", "White", false },
                    { 217, 9, "VF6_Tham_cop.png", "White", false },
                    { 218, 9, "Tham Cop 3D VF 62.png", "White", false },
                    { 219, 8, "VF6_tham_nhua.png", "White", false },
                    { 220, 8, "Tham San Nhua 2D VF 62.png", "White", false },
                    { 221, 7, "VF6_Goi_dan_phim_cach_nhiet.png", "White", false },
                    { 222, 5, "VF5_Goi_dan_phim_cach_nhiet.png", "White", false },
                    { 223, 6, "VF5_Tham_cop.png", "White", false }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 201);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 202);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 203);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 204);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 205);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 206);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 207);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 208);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 209);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 210);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 211);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 212);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 213);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 214);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 215);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 216);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 217);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 218);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 219);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 220);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 221);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 222);

            migrationBuilder.DeleteData(
                table: "AccessoryImage",
                keyColumn: "Color ID",
                keyValue: 223);
        }
    }
}
