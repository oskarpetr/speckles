using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class _34 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Assets_AssetId",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Assets_AssetId",
                table: "Images",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "AssetId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Assets_AssetId",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Assets_AssetId",
                table: "Images",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "AssetId");
        }
    }
}
