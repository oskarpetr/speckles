using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class Thirteen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Assets_AssetId1",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_AssetId1",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "AssetId1",
                table: "Images");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssetId1",
                table: "Images",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Images_AssetId1",
                table: "Images",
                column: "AssetId1",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Assets_AssetId1",
                table: "Images",
                column: "AssetId1",
                principalTable: "Assets",
                principalColumn: "AssetId");
        }
    }
}
