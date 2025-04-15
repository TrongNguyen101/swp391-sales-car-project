using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Add_User_Data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "User ID", "User Address", "Created At", "User Email", "Is Deleted", "Last Change", "User Password", "Phone Number", "User Role", "User Name" },
                values: new object[] { new Guid("5168db79-a770-472d-82ed-061cba60f1e1"), "456 User St", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Bangle15092002@gmail.com", false, new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "e7f5c00bfc7067a49da98fa9b1eacd8d428a4632197edaa84c9dacd40ca35050", "0987654321", 2, "Le Khanh Bang" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("5168db79-a770-472d-82ed-061cba60f1e1"));
        }
    }
}
