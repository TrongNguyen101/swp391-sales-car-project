using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateDb : Migration
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
                    CarPrice = table.Column<string>(name: "Car Price", type: "nvarchar(max)", nullable: true),
                    CarSeat = table.Column<int>(name: "Car Seat", type: "int", nullable: false),
                    CarImage = table.Column<string>(name: "Car Image", type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.CarID);
                });

            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "Car ID", "Car Image", "Car Name", "Car Price", "Car Seat" },
                values: new object[,]
                {
                    { 1, "vinfast-vf3.png", "VF 3", "240,000,000", 4 },
                    { 2, "vinfast-vf5.png", "VF 5", "460,000,000", 5 },
                    { 3, "vinfast-vf6.png", "VF 6", "675,000,000", 5 },
                    { 4, "vinfast-vf7.png", "VF 7", "850,000,000", 5 },
                    { 5, "vinfast-vf8.png", "VF 8", "1,170,000,000", 5 },
                    { 6, "vinfast-vf9.png", "VF 9", "1,604,000,000", 7 }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("d3b8a1e1-4d3b-4c3b-8a1e-1d3b4c3b8a1e"),
                column: "User Password",
                value: "393a5cc22f47320f9d3108feb381652d79974a58e58ec0a68a0de3b289d8a5ef");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("e4b8a1e1-5d4b-5c4b-9a1e-2d4b5c4b9a1e"),
                column: "User Password",
                value: "24e13074bec3f7bb03bc30280399bede77eb49cef89d44581a90ec24463c2ba6");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("d3b8a1e1-4d3b-4c3b-8a1e-1d3b4c3b8a1e"),
                column: "User Password",
                value: "a314c216b44f59e8098f0bebb12ea204b3952294b06f14be75a898179b80b6a8");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("e4b8a1e1-5d4b-5c4b-9a1e-2d4b5c4b9a1e"),
                column: "User Password",
                value: "616104ebd93e67ae20bac90c86483da3cae1ee5b1c1483f739372a88ff1e79f9");
        }
    }
}
