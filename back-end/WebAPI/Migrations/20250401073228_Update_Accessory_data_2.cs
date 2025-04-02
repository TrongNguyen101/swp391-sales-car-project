using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Update_Accessory_data_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Accessory",
                columns: new[] { "Accessory ID", "Category ID", "Color", "Description", "Dimensions", "Accessory Image", "Is Deleted", "Is Showed", "Material", "Accessory Name", "Origin", "Accessory Price", "Quantity", "Warranty", "Weight" },
                values: new object[,]
                {
                    { 204, 7, "Black", "The car roof rack for VinFast VF 8 is an ideal choice to expand storage space during journeys. Modern, convenient design with superior quality, the product brings convenience and style to every trip.", "100x80x5 cm", "Cop_Noc_Phi_Thuyen_Oto_VinFast_ VF8.png", false, true, "Rubber", "VinFast VF8 Car Roof Top Box", "Vietnam", 7000000.0, 10, "6 months", 2.0 },
                    { 205, 7, "Black", "VinFast VF 8 floor mats are molded mats manufactured in Vietnam, according to Japanese production lines. Made from high-quality, non-toxic TPE plastic material.", "100x80x5 cm", "Tham_San_Nhua_2D_VF8.png", false, true, "Plastic", "2D VF8 Plastic Floor Mats", "Vietnam", 2210000.0, 10, "6 months", 2.0 },
                    { 206, 7, "Black", "VF x 3M heat insulation film products help insulate, block infrared radiation, eliminate UV rays, effectively reduce glare to improve the customer experience in the car, protect customers from harmful rays as well as increase the durability of the car's interior. Warranty", "100x80x5cm", "Goi_Film_Cach_Nhiet_Dan_Tran_VinFast_VF8.png", false, true, "Ceramic is coated with Titanium Nitride technology.", "Ceiling Heat Insulation Film Package", "Vietnam", 7000000.0, 10, "6 months", 2.0 }
                });

            migrationBuilder.InsertData(
                table: "AccessoryImage",
                columns: new[] { "Color ID", "Accessory ID", "Color Image", "Color Name", "Is Deleted" },
                values: new object[,]
                {
                    { 205, 204, "Cop_Noc_Phi_Thuyen_Oto_VinFast_ VF8.png", "White", false },
                    { 206, 204, "Cop_Noc_Phi_Thuyen_O_To_VinFast_VF82.png", "White", false },
                    { 207, 205, "Tham_San_Nhua_2D_VF8.png", "White", false },
                    { 208, 205, "Tham_San_Nhua_2D_VF82.png", "White", false },
                    { 209, 205, "Tham_San_Nhua_2D_VF83.png", "White", false },
                    { 210, 205, "Tham_San_Nhua_2D_VF84.png", "White", false },
                    { 211, 206, "Goi_Film_Cach_Nhiet_Dan_Tran_VinFast_VF8.png", "White", false }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 204);

            migrationBuilder.DeleteData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 205);

            migrationBuilder.DeleteData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 206);
        }
    }
}
