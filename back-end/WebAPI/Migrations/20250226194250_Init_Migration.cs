using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Init_Migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    CarID = table.Column<int>(name: "Car ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarName = table.Column<string>(name: "Car Name", type: "nvarchar(max)", nullable: true),
                    Seats = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpecImage = table.Column<string>(name: "Spec Image", type: "nvarchar(max)", nullable: true),
                    ImageBanner = table.Column<string>(name: "Image Banner", type: "nvarchar(max)", nullable: true),
                    PriceBatteryRental = table.Column<double>(name: "Price Battery Rental", type: "float", nullable: false),
                    PriceBatteryOwn = table.Column<double>(name: "Price Battery Own", type: "float", nullable: false),
                    PriceDeposite = table.Column<double>(name: "Price Deposite", type: "float", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(name: "Is Deleted", type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.CarID);
                });

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
                name: "User Roles",
                columns: table => new
                {
                    RoleID = table.Column<int>(name: "Role ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(name: "Role Name", type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User Roles", x => x.RoleID);
                });

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

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<Guid>(name: "User ID", type: "uniqueidentifier", nullable: false),
                    UserName = table.Column<string>(name: "User Name", type: "nvarchar(max)", nullable: true),
                    UserAddress = table.Column<string>(name: "User Address", type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(name: "Phone Number", type: "nvarchar(max)", nullable: true),
                    UserEmail = table.Column<string>(name: "User Email", type: "nvarchar(max)", nullable: true),
                    UserPassword = table.Column<string>(name: "User Password", type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(name: "Created At", type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(name: "Is Deleted", type: "bit", nullable: false),
                    LastChange = table.Column<DateTime>(name: "Last Change", type: "datetime2", nullable: false),
                    UserRole = table.Column<int>(name: "User Role", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Users_User Roles_User Role",
                        column: x => x.UserRole,
                        principalTable: "User Roles",
                        principalColumn: "Role ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarDeposit",
                columns: table => new
                {
                    DepositPaymentID = table.Column<Guid>(name: "Deposit Payment ID", type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderInfo = table.Column<string>(name: "Order Info", type: "nvarchar(max)", nullable: true),
                    TransactionStatus = table.Column<string>(name: "Transaction Status", type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(name: "Created At", type: "datetime2", nullable: false),
                    CarID = table.Column<int>(name: "Car ID", type: "int", nullable: false),
                    UserID = table.Column<Guid>(name: "User ID", type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarDeposit", x => x.DepositPaymentID);
                    table.ForeignKey(
                        name: "FK_CarDeposit_Cars_Car ID",
                        column: x => x.CarID,
                        principalTable: "Cars",
                        principalColumn: "Car ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarDeposit_Users_User ID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "User ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "Car ID", "Image", "Image Banner", "Is Deleted", "Car Name", "Price Battery Own", "Price Battery Rental", "Price Deposite", "Quantity", "Seats", "Spec Image" },
                values: new object[,]
                {
                    { 1, "vinfast-vf3.png", "vinfast-banner.png", false, "Vinfast VF3", 322000000.0, 240000000.0, 15000000.0, 10, 4, "vinfast-vf3-spec.png" },
                    { 2, "vinfast-vf5.png", "vinfast-banner.png", false, "Vinfast VF5", 540000000.0, 460000000.0, 20000000.0, 10, 5, "vinfast-vf5-spec.png" },
                    { 3, "vinfast-vf6.png", "vinfast-banner.png", false, "Vinfast VF6", 765000000.0, 675000000.0, 30000000.0, 10, 5, "vinfast-vf6-spec.png" },
                    { 4, "vinfast-vf7.png", "vinfast-banner.png", false, "Vinfast VF7", 999000000.0, 850000000.0, 50000000.0, 10, 5, "vinfast-vf7-spec.png" },
                    { 5, "vinfast-vf8.png", "vinfast-banner.png", false, "Vinfast VF8", 1359000000.0, 1170000000.0, 50000000.0, 10, 5, "vinfast-vf8-spec.png" },
                    { 6, "vinfast-vf9.png", "vinfast-banner.png", false, "Vinfast VF9", 2129000000.0, 1604000000.0, 50000000.0, 10, 7, "vinfast-vf9-spec.png" }
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
                table: "User Roles",
                columns: new[] { "Role ID", "Role Name" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "User" }
                });

            migrationBuilder.InsertData(
                table: "Accessory",
                columns: new[] { "Accessory ID", "Category ID", "Accessory Image", "Is Deleted", "Accessory Name", "Accessory Price" },
                values: new object[,]
                {
                    { 1, 5, "Sac_tai_nha.png", false, "Sạc tại nhà", 6000000.0 },
                    { 2, 5, "VF3_tham_nhua.png", false, "Thảm nhựa VF3", 1668000.0 },
                    { 3, 5, "VF3_Camera_lui.png", false, "Camera Lùi VF3", 26720000.0 },
                    { 4, 6, "VF5_tham_nhua.png", false, "Thảm nhựa VF5", 1969000.0 },
                    { 5, 6, "VF5_Goi_dan_phim_cach_nhiet.png", false, "Gói Dán Film Cách Nhiệt VinFast VF5", 5500000.0 },
                    { 6, 6, "VF5_Tham_cop.png", false, "Thảm cốp 3D VF5", 990000.0 },
                    { 7, 7, "VF6_Goi_dan_phim_cach_nhiet.png", false, "Gói dán film cách nhiệt VF6", 5500000.0 },
                    { 8, 7, "VF6_tham_nhua.png", false, "Thảm nhựa 3D VF6", 1990000.0 },
                    { 9, 7, "VF6_Tham_cop.png", false, "Thảm cốp 3D VF6", 990000.0 }
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

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "User ID", "User Address", "Created At", "User Email", "Is Deleted", "Last Change", "User Password", "Phone Number", "User Role", "User Name" },
                values: new object[,]
                {
                    { new Guid("d3b8a1e1-4d3b-4c3b-8a1e-1d3b4c3b8a1e"), "123 Admin St", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "admin@example.com", false, new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "5f906f7241ecb0badc32dba89d16b09ca3c9f550aec06a15a4d0c2f1e57f8ed2", "1234567890", 1, "admin" },
                    { new Guid("e4b8a1e1-5d4b-5c4b-9a1e-2d4b5c4b9a1e"), "456 User St", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "user@example.com", false, new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "e7f5c00bfc7067a49da98fa9b1eacd8d428a4632197edaa84c9dacd40ca35050", "0987654321", 2, "User A" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accessory_Category ID",
                table: "Accessory",
                column: "Category ID");

            migrationBuilder.CreateIndex(
                name: "IX_CarColor_Car ID",
                table: "CarColor",
                column: "Car ID");

            migrationBuilder.CreateIndex(
                name: "IX_CarDeposit_Car ID",
                table: "CarDeposit",
                column: "Car ID");

            migrationBuilder.CreateIndex(
                name: "IX_CarDeposit_User ID",
                table: "CarDeposit",
                column: "User ID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_User Role",
                table: "Users",
                column: "User Role");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accessory");

            migrationBuilder.DropTable(
                name: "CarColor");

            migrationBuilder.DropTable(
                name: "CarDeposit");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "User Roles");
        }
    }
}
