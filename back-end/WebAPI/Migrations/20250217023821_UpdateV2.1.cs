using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateV21 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color Image 1",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Color Image 2",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Color Image 3",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Color Image 4",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Color Image 5",
                table: "Cars");

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

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("e4b8a1e1-5d4b-5c4b-9a1e-2d4b5c4b9a1e"),
                column: "User Name",
                value: "User A");

            migrationBuilder.CreateIndex(
                name: "IX_CarDeposit_Car ID",
                table: "CarDeposit",
                column: "Car ID");

            migrationBuilder.CreateIndex(
                name: "IX_CarDeposit_User ID",
                table: "CarDeposit",
                column: "User ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarDeposit");

            migrationBuilder.AddColumn<string>(
                name: "Color Image 1",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color Image 2",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color Image 3",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color Image 4",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color Image 5",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 1,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 2,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 3,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 4,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 5,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Car ID",
                keyValue: 6,
                columns: new[] { "Color Image 1", "Color Image 2", "Color Image 3", "Color Image 4", "Color Image 5" },
                values: new object[] { null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("e4b8a1e1-5d4b-5c4b-9a1e-2d4b5c4b9a1e"),
                column: "User Name",
                value: "user");
        }
    }
}
