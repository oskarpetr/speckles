using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class Sixth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_Assets_AssetId",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Tags_AssetId",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "AssetId",
                table: "Tags");

            migrationBuilder.CreateTable(
                name: "AssetsTags",
                columns: table => new
                {
                    AssetTagId = table.Column<string>(type: "text", nullable: false),
                    AssetId = table.Column<string>(type: "text", nullable: false),
                    TagId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetsTags", x => x.AssetTagId);
                    table.ForeignKey(
                        name: "FK_AssetsTags_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "AssetId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssetsTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "TagId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssetsTags_AssetId",
                table: "AssetsTags",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetsTags_TagId",
                table: "AssetsTags",
                column: "TagId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssetsTags");

            migrationBuilder.AddColumn<string>(
                name: "AssetId",
                table: "Tags",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tags_AssetId",
                table: "Tags",
                column: "AssetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_Assets_AssetId",
                table: "Tags",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "AssetId");
        }
    }
}
