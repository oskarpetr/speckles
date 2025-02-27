using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class _39 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Studios_StudioId",
                table: "Projects");

            migrationBuilder.AlterColumn<string>(
                name: "StudioId",
                table: "Projects",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Studios_StudioId",
                table: "Projects",
                column: "StudioId",
                principalTable: "Studios",
                principalColumn: "StudioId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Studios_StudioId",
                table: "Projects");

            migrationBuilder.AlterColumn<string>(
                name: "StudioId",
                table: "Projects",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Studios_StudioId",
                table: "Projects",
                column: "StudioId",
                principalTable: "Studios",
                principalColumn: "StudioId");
        }
    }
}
