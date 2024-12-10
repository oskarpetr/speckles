using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class Eleven : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assets_Images_ThumbnailId",
                table: "Assets");

            migrationBuilder.DropIndex(
                name: "IX_Assets_ThumbnailId",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "ThumbnailId",
                table: "Assets");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ThumbnailId",
                table: "Assets",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Assets_ThumbnailId",
                table: "Assets",
                column: "ThumbnailId");

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_Images_ThumbnailId",
                table: "Assets",
                column: "ThumbnailId",
                principalTable: "Images",
                principalColumn: "ImageId",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
