using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Add_more_Accessory_data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 2,
                column: "Accessory Name",
                value: "VF3 Plastic Carpet");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 3,
                column: "Accessory Name",
                value: "VF 3 Rear Camera");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 4,
                column: "Accessory Name",
                value: "VF 5 Plastic Floor Mats");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 5,
                column: "Accessory Name",
                value: "VF 5 Heat Insulation Film Package");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 6,
                column: "Accessory Name",
                value: "VF 5 3D Trunk Mat");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 7,
                column: "Accessory Name",
                value: "VF 6 Heat Insulation Film Package");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 8,
                column: "Accessory Name",
                value: "VF 6 3D Plastic Floor Mats");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 9,
                column: "Accessory Name",
                value: "VF 6 3D Trunk Mat");

            migrationBuilder.InsertData(
                table: "Accessory",
                columns: new[] { "Accessory ID", "Category ID", "Color", "Description", "Dimensions", "Accessory Image", "Is Deleted", "Is Showed", "Material", "Accessory Name", "Origin", "Accessory Price", "Quantity", "Warranty", "Weight" },
                values: new object[,]
                {
                    { 201, 7, "Black", "3D trunk mat for the VinFast VF7.", "100x80x5 cm", "Tham_Cop_3D_VF7.png", false, true, "Rubber", "VF 7 3D Trunk Mat", "Vietnam", 990000.0, 8, "6 months", 2.0 },
                    { 202, 8, "Black", "VF x 3M heat insulation film products help insulate, block infrared radiation, eliminate UV rays, effectively reduce glare to improve the customer experience in the car, protect customers from harmful rays as well as increase the durability of the car's interior. Warranty.", "100x80x5 cm", "Goi_Dan_Film_Cach_Nhiet_VinFast_VF7.png", false, true, "Rubber", "VF 7 Heat Insulation Film Package", "Vietnam", 5500000.0, 10, "6 months", 2.0 },
                    { 203, 8, "Black", "VinFast VF 7 floor mats are molded mats manufactured in Vietnam, according to Japanese production lines. Made from high-quality, non-toxic TPE plastic material.", "100x80x5 cm", "Tham_San_3D_VF_7.png", false, true, " TPE plastic", "3D Floor Mat VF 7", "Vietnam", 540000.0, 10, "6 months", 2.0 },
                    { 204, 9, "Black", "The car roof rack for VinFast VF 8 is an ideal choice to expand storage space during journeys. Modern, convenient design with superior quality, the product brings convenience and style to every trip.", "100x80x5 cm", "Cop_Noc_Phi_Thuyen_Oto_VinFast_ VF8.png", false, true, "Rubber", "VinFast VF 8 Car Roof Top Box", "Vietnam", 7000000.0, 10, "6 months", 2.0 },
                    { 205, 9, "Black", "VinFast VF 8 floor mats are molded mats manufactured in Vietnam, according to Japanese production lines. Made from high-quality, non-toxic TPE plastic material.", "100x80x5 cm", "Tham_San_Nhua_2D_VF8.png", false, true, "Plastic", "2D VF 8 Plastic Floor Mats", "Vietnam", 2210000.0, 10, "6 months", 2.0 },
                    { 206, 9, "Black", "VF x 3M heat insulation film products help insulate, block infrared radiation, eliminate UV rays, effectively reduce glare to improve the customer experience in the car, protect customers from harmful rays as well as increase the durability of the car's interior. Warranty", "100x80x5 cm", "Goi_Film_Cach_Nhiet_Dan_Tran_VinFast_VF8.png", false, true, "Ceramic is coated with Titanium Nitride technology.", "Ceiling Heat Insulation Film Package", "Vietnam", 7000000.0, 10, "6 months", 2.0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 201);

            migrationBuilder.DeleteData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 202);

            migrationBuilder.DeleteData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 203);

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

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 2,
                column: "Accessory Name",
                value: "Thảm nhựa VF3");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 3,
                column: "Accessory Name",
                value: "Camera Lùi VF3");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 4,
                column: "Accessory Name",
                value: "Thảm nhựa VF5");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 5,
                column: "Accessory Name",
                value: "Gói Dán Film Cách Nhiệt VinFast VF5");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 6,
                column: "Accessory Name",
                value: "Thảm cốp 3D VF5");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 7,
                column: "Accessory Name",
                value: "Gói dán film cách nhiệt VF6");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 8,
                column: "Accessory Name",
                value: "Thảm nhựa 3D VF6");

            migrationBuilder.UpdateData(
                table: "Accessory",
                keyColumn: "Accessory ID",
                keyValue: 9,
                column: "Accessory Name",
                value: "Thảm cốp 3D VF6");
        }
    }
}
