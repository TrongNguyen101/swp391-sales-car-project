using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class createDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.InsertData(
                table: "User Roles",
                columns: new[] { "Role ID", "Role Name" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "User" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "User ID", "User Address", "Created At", "User Email", "Is Deleted", "Last Change", "User Password", "Phone Number", "User Role", "User Name" },
                values: new object[,]
                {
                    { new Guid("d3b8a1e1-4d3b-4c3b-8a1e-1d3b4c3b8a1e"), "123 Admin St", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "admin@example.com", false, new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "a314c216b44f59e8098f0bebb12ea204b3952294b06f14be75a898179b80b6a8", "1234567890", 1, "admin" },
                    { new Guid("e4b8a1e1-5d4b-5c4b-9a1e-2d4b5c4b9a1e"), "456 User St", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "user@example.com", false, new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "18a36f4a07fa44a6e098f2adabe1ab281881776dff03d2960d47981168cfa8d0", "0987654321", 2, "user" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_User Role",
                table: "Users",
                column: "User Role");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "User Roles");
        }
    }
}
