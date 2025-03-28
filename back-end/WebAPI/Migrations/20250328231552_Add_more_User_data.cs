using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Add_more_User_data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("5168db79-a770-472d-82ed-061cba60f1e1"),
                columns: new[] { "User Email", "User Name" },
                values: new object[] { "nguyentrong.se11@gmail.com", "Nguyen Trong" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("5168db79-a770-472d-82ed-061cba60f1e1"),
                columns: new[] { "User Email", "User Name" },
                values: new object[] { "Bangle15092002@gmail.com", "Le Khanh Bang" });
        }
    }
}
