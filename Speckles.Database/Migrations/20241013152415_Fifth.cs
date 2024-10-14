using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class Fifth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MemberStudio");

            migrationBuilder.CreateTable(
                name: "StudioMembers",
                columns: table => new
                {
                    StudioMemberId = table.Column<string>(type: "text", nullable: false),
                    StudioId = table.Column<string>(type: "text", nullable: false),
                    MemberId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudioMembers", x => x.StudioMemberId);
                    table.ForeignKey(
                        name: "FK_StudioMembers_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "MemberId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudioMembers_Studios_StudioId",
                        column: x => x.StudioId,
                        principalTable: "Studios",
                        principalColumn: "StudioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudioMembers_MemberId",
                table: "StudioMembers",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_StudioMembers_StudioId",
                table: "StudioMembers",
                column: "StudioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudioMembers");

            migrationBuilder.CreateTable(
                name: "MemberStudio",
                columns: table => new
                {
                    MembersMemberId = table.Column<string>(type: "text", nullable: false),
                    StudiosStudioId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberStudio", x => new { x.MembersMemberId, x.StudiosStudioId });
                    table.ForeignKey(
                        name: "FK_MemberStudio_Members_MembersMemberId",
                        column: x => x.MembersMemberId,
                        principalTable: "Members",
                        principalColumn: "MemberId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MemberStudio_Studios_StudiosStudioId",
                        column: x => x.StudiosStudioId,
                        principalTable: "Studios",
                        principalColumn: "StudioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MemberStudio_StudiosStudioId",
                table: "MemberStudio",
                column: "StudiosStudioId");
        }
    }
}
