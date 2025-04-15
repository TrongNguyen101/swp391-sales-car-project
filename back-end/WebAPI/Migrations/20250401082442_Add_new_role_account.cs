using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Add_new_role_account : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User Roles",
                keyColumn: "Role ID",
                keyValue: 2,
                column: "Role Name",
                value: "Customer");

            migrationBuilder.InsertData(
                table: "User Roles",
                columns: new[] { "Role ID", "Role Name" },
                values: new object[] { 3, "Staff" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "User ID", "User Address", "Created At", "User Email", "Is Deleted", "Last Change", "User Password", "Phone Number", "User Role", "User Name" },
                values: new object[] { new Guid("1f2628eb-34bf-4e4b-a9d2-308827bed09a"), "456 User St", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "staff@gmail.com", false, new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "fbef4e8b28be6c2d65f3a0ddaebee28001d9e33743b7dc8e2843dea8c1129362", "0987654321", 3, "Nguyen Duong Phu Trong" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("1f2628eb-34bf-4e4b-a9d2-308827bed09a"));

            migrationBuilder.DeleteData(
                table: "User Roles",
                keyColumn: "Role ID",
                keyValue: 3);

            migrationBuilder.UpdateData(
                table: "User Roles",
                keyColumn: "Role ID",
                keyValue: 2,
                column: "Role Name",
                value: "User");
        }
    }
}
