using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class _33 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudioUsers_Studios_StudioId",
                table: "StudioUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_StudioUsers_Users_UserId",
                table: "StudioUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudioUsers",
                table: "StudioUsers");

            migrationBuilder.RenameTable(
                name: "StudioUsers",
                newName: "StudioMembers");

            migrationBuilder.RenameIndex(
                name: "IX_StudioUsers_UserId",
                table: "StudioMembers",
                newName: "IX_StudioMembers_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_StudioUsers_StudioId",
                table: "StudioMembers",
                newName: "IX_StudioMembers_StudioId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudioMembers",
                table: "StudioMembers",
                column: "StudioMemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudioMembers_Studios_StudioId",
                table: "StudioMembers",
                column: "StudioId",
                principalTable: "Studios",
                principalColumn: "StudioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudioMembers_Users_UserId",
                table: "StudioMembers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudioMembers_Studios_StudioId",
                table: "StudioMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_StudioMembers_Users_UserId",
                table: "StudioMembers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudioMembers",
                table: "StudioMembers");

            migrationBuilder.RenameTable(
                name: "StudioMembers",
                newName: "StudioUsers");

            migrationBuilder.RenameIndex(
                name: "IX_StudioMembers_UserId",
                table: "StudioUsers",
                newName: "IX_StudioUsers_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_StudioMembers_StudioId",
                table: "StudioUsers",
                newName: "IX_StudioUsers_StudioId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudioUsers",
                table: "StudioUsers",
                column: "StudioMemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudioUsers_Studios_StudioId",
                table: "StudioUsers",
                column: "StudioId",
                principalTable: "Studios",
                principalColumn: "StudioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudioUsers_Users_UserId",
                table: "StudioUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
