using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateV1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("e4b8a1e1-5d4b-5c4b-9a1e-2d4b5c4b9a1e"),
                column: "User Password",
                value: "616104ebd93e67ae20bac90c86483da3cae1ee5b1c1483f739372a88ff1e79f9");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("e4b8a1e1-5d4b-5c4b-9a1e-2d4b5c4b9a1e"),
                column: "User Password",
                value: "18a36f4a07fa44a6e098f2adabe1ab281881776dff03d2960d47981168cfa8d0");
        }
    }
}
