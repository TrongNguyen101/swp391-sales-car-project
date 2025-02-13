using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDbV111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("d3b8a1e1-4d3b-4c3b-8a1e-1d3b4c3b8a1e"),
                column: "User Password",
                value: "5f906f7241ecb0badc32dba89d16b09ca3c9f550aec06a15a4d0c2f1e57f8ed2");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User ID",
                keyValue: new Guid("e4b8a1e1-5d4b-5c4b-9a1e-2d4b5c4b9a1e"),
                column: "User Password",
                value: "e7f5c00bfc7067a49da98fa9b1eacd8d428a4632197edaa84c9dacd40ca35050");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
