using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class _38 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Projects_ProjectId",
                table: "Images");

            migrationBuilder.AddColumn<string>(
                name: "ThumbnailId",
                table: "Projects",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ThumbnailId",
                table: "Projects",
                column: "ThumbnailId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Projects_ProjectId",
                table: "Images",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Images_ThumbnailId",
                table: "Projects",
                column: "ThumbnailId",
                principalTable: "Images",
                principalColumn: "ImageId",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Projects_ProjectId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Images_ThumbnailId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ThumbnailId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ThumbnailId",
                table: "Projects");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Projects_ProjectId",
                table: "Images",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId");
        }
    }
}
