using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Invoice_Payment_InvoiceItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Invoice",
                columns: table => new
                {
                    InvoiceID = table.Column<string>(name: "Invoice ID", type: "nvarchar(450)", nullable: false),
                    TypeofProduct = table.Column<string>(name: "Type of Product", type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UserID = table.Column<Guid>(name: "User ID", type: "uniqueidentifier", nullable: false),
                    CustomerName = table.Column<string>(name: "Customer Name", type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCreate = table.Column<DateTime>(name: "Date Create", type: "datetime2", nullable: false),
                    TotalAmount = table.Column<double>(name: "Total Amount", type: "float", nullable: false),
                    IsPaid = table.Column<bool>(name: "Is Paid", type: "bit", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoice", x => x.InvoiceID);
                    table.ForeignKey(
                        name: "FK_Invoice_Users_User ID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "User ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InvoiceItem",
                columns: table => new
                {
                    ItemID = table.Column<int>(name: "Item ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceID = table.Column<string>(name: "Invoice ID", type: "nvarchar(450)", nullable: false),
                    ProductName = table.Column<string>(name: "Product Name", type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<double>(name: "Unit Price", type: "float", nullable: false),
                    CarId = table.Column<int>(type: "int", nullable: false),
                    AccessoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceItem", x => x.ItemID);
                    table.ForeignKey(
                        name: "FK_InvoiceItem_Accessory_AccessoryId",
                        column: x => x.AccessoryId,
                        principalTable: "Accessory",
                        principalColumn: "Accessory ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InvoiceItem_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Car ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InvoiceItem_Invoice_Invoice ID",
                        column: x => x.InvoiceID,
                        principalTable: "Invoice",
                        principalColumn: "Invoice ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    PaymentID = table.Column<int>(name: "Payment ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AmountPaid = table.Column<double>(name: "Amount Paid", type: "float", nullable: false),
                    PaymentDate = table.Column<DateTime>(name: "Payment Date", type: "datetime2", nullable: false),
                    PaymentMethod = table.Column<string>(name: "Payment Method", type: "nvarchar(50)", maxLength: 50, nullable: false),
                    VNPayTransactionID = table.Column<string>(name: "VNPay Transaction ID", type: "nvarchar(50)", maxLength: 50, nullable: false),
                    VNPayResponseCode = table.Column<string>(name: "VNPay Response Code", type: "nvarchar(10)", maxLength: 10, nullable: true),
                    VNPayPaymentURL = table.Column<string>(name: "VNPay Payment URL", type: "nvarchar(255)", maxLength: 255, nullable: true),
                    IsSuccess = table.Column<bool>(name: "Is Success", type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment", x => x.PaymentID);
                    table.ForeignKey(
                        name: "FK_Payment_Invoice_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoice",
                        principalColumn: "Invoice ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_User ID",
                table: "Invoice",
                column: "User ID");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceItem_AccessoryId",
                table: "InvoiceItem",
                column: "AccessoryId");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceItem_CarId",
                table: "InvoiceItem",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceItem_Invoice ID",
                table: "InvoiceItem",
                column: "Invoice ID");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_InvoiceId",
                table: "Payment",
                column: "InvoiceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InvoiceItem");

            migrationBuilder.DropTable(
                name: "Payment");

            migrationBuilder.DropTable(
                name: "Invoice");
        }
    }
}
