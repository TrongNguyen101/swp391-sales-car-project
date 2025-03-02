using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddTestDriveRegistrationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TestDriveRegistrations",
                columns: table => new
                {
                    TestDriveID = table.Column<int>(name: "TestDrive ID", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerName = table.Column<string>(name: "Customer Name", type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(name: "Phone Number", type: "nvarchar(max)", nullable: false),
                    CustomerEmail = table.Column<string>(name: "Customer Email", type: "nvarchar(max)", nullable: false),
                    CarID = table.Column<int>(name: "Car ID", type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestDriveRegistrations", x => x.TestDriveID);
                    table.ForeignKey(
                        name: "FK_TestDriveRegistrations_Cars_Car ID",
                        column: x => x.CarID,
                        principalTable: "Cars",
                        principalColumn: "Car ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TestDriveRegistrations_Car ID",
                table: "TestDriveRegistrations",
                column: "Car ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestDriveRegistrations");
        }
    }
}
