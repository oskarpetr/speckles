using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class _29 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Portfolios_PortfolioId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Studios_Portfolios_PortfolioId",
                table: "Studios");

            migrationBuilder.DropTable(
                name: "Portfolios");

            migrationBuilder.DropIndex(
                name: "IX_Studios_PortfolioId",
                table: "Studios");

            migrationBuilder.RenameColumn(
                name: "PortfolioId",
                table: "Studios",
                newName: "About");

            migrationBuilder.RenameColumn(
                name: "PortfolioId",
                table: "Projects",
                newName: "StudioId");

            migrationBuilder.RenameIndex(
                name: "IX_Projects_PortfolioId",
                table: "Projects",
                newName: "IX_Projects_StudioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Studios_StudioId",
                table: "Projects",
                column: "StudioId",
                principalTable: "Studios",
                principalColumn: "StudioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Studios_StudioId",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "About",
                table: "Studios",
                newName: "PortfolioId");

            migrationBuilder.RenameColumn(
                name: "StudioId",
                table: "Projects",
                newName: "PortfolioId");

            migrationBuilder.RenameIndex(
                name: "IX_Projects_StudioId",
                table: "Projects",
                newName: "IX_Projects_PortfolioId");

            migrationBuilder.CreateTable(
                name: "Portfolios",
                columns: table => new
                {
                    PortfolioId = table.Column<string>(type: "text", nullable: false),
                    About = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Portfolios", x => x.PortfolioId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Studios_PortfolioId",
                table: "Studios",
                column: "PortfolioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Portfolios_PortfolioId",
                table: "Projects",
                column: "PortfolioId",
                principalTable: "Portfolios",
                principalColumn: "PortfolioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Studios_Portfolios_PortfolioId",
                table: "Studios",
                column: "PortfolioId",
                principalTable: "Portfolios",
                principalColumn: "PortfolioId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
