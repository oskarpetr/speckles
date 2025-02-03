﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class _27 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assets_Studios_StudioId",
                table: "Assets");

            migrationBuilder.AlterColumn<string>(
                name: "StudioId",
                table: "Assets",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_Studios_StudioId",
                table: "Assets",
                column: "StudioId",
                principalTable: "Studios",
                principalColumn: "StudioId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assets_Studios_StudioId",
                table: "Assets");

            migrationBuilder.AlterColumn<string>(
                name: "StudioId",
                table: "Assets",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_Studios_StudioId",
                table: "Assets",
                column: "StudioId",
                principalTable: "Studios",
                principalColumn: "StudioId");
        }
    }
}
