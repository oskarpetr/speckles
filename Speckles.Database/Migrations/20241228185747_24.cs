using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class _24 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BasketAssets_Members_MemberId",
                table: "BasketAssets");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Members_AuthorId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Members_MemberId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Recommendations_Members_MemberId",
                table: "Recommendations");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedAssets_Members_MemberId",
                table: "SavedAssets");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFollows_Members_UserId",
                table: "UserFollows");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLikes_Members_MemberId",
                table: "UserLikes");

            migrationBuilder.DropTable(
                name: "StudioMembers");

            migrationBuilder.DropTable(
                name: "Members");

            migrationBuilder.DropIndex(
                name: "IX_UserLikes_MemberId",
                table: "UserLikes");

            migrationBuilder.DropIndex(
                name: "IX_SavedAssets_MemberId",
                table: "SavedAssets");

            migrationBuilder.DropIndex(
                name: "IX_Orders_MemberId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_BasketAssets_MemberId",
                table: "BasketAssets");

            migrationBuilder.RenameColumn(
                name: "MemberId",
                table: "Recommendations",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Recommendations_MemberId",
                table: "Recommendations",
                newName: "IX_Recommendations_UserId");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "UserLikes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "SavedAssets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Orders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "BasketAssets",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    AddressId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudioUsers",
                columns: table => new
                {
                    StudioUserId = table.Column<string>(type: "text", nullable: false),
                    StudioId = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudioUsers", x => x.StudioUserId);
                    table.ForeignKey(
                        name: "FK_StudioUsers_Studios_StudioId",
                        column: x => x.StudioId,
                        principalTable: "Studios",
                        principalColumn: "StudioId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudioUsers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserLikes_UserId",
                table: "UserLikes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedAssets_UserId",
                table: "SavedAssets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BasketAssets_UserId",
                table: "BasketAssets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_StudioUsers_StudioId",
                table: "StudioUsers",
                column: "StudioId");

            migrationBuilder.CreateIndex(
                name: "IX_StudioUsers_UserId",
                table: "StudioUsers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AddressId",
                table: "Users",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_BasketAssets_Users_UserId",
                table: "BasketAssets",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_AuthorId",
                table: "Comments",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recommendations_Users_UserId",
                table: "Recommendations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_SavedAssets_Users_UserId",
                table: "SavedAssets",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserFollows_Users_UserId",
                table: "UserFollows",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLikes_Users_UserId",
                table: "UserLikes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BasketAssets_Users_UserId",
                table: "BasketAssets");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_AuthorId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Recommendations_Users_UserId",
                table: "Recommendations");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedAssets_Users_UserId",
                table: "SavedAssets");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFollows_Users_UserId",
                table: "UserFollows");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLikes_Users_UserId",
                table: "UserLikes");

            migrationBuilder.DropTable(
                name: "StudioUsers");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_UserLikes_UserId",
                table: "UserLikes");

            migrationBuilder.DropIndex(
                name: "IX_SavedAssets_UserId",
                table: "SavedAssets");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UserId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_BasketAssets_UserId",
                table: "BasketAssets");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserLikes");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SavedAssets");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "BasketAssets");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Recommendations",
                newName: "MemberId");

            migrationBuilder.RenameIndex(
                name: "IX_Recommendations_UserId",
                table: "Recommendations",
                newName: "IX_Recommendations_MemberId");

            migrationBuilder.CreateTable(
                name: "Members",
                columns: table => new
                {
                    MemberId = table.Column<string>(type: "text", nullable: false),
                    AddressId = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Members", x => x.MemberId);
                    table.ForeignKey(
                        name: "FK_Members_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudioMembers",
                columns: table => new
                {
                    StudioMemberId = table.Column<string>(type: "text", nullable: false),
                    MemberId = table.Column<string>(type: "text", nullable: false),
                    StudioId = table.Column<string>(type: "text", nullable: false)
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
                name: "IX_UserLikes_MemberId",
                table: "UserLikes",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedAssets_MemberId",
                table: "SavedAssets",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_MemberId",
                table: "Orders",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_BasketAssets_MemberId",
                table: "BasketAssets",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_Members_AddressId",
                table: "Members",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_StudioMembers_MemberId",
                table: "StudioMembers",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_StudioMembers_StudioId",
                table: "StudioMembers",
                column: "StudioId");

            migrationBuilder.AddForeignKey(
                name: "FK_BasketAssets_Members_MemberId",
                table: "BasketAssets",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "MemberId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Members_AuthorId",
                table: "Comments",
                column: "AuthorId",
                principalTable: "Members",
                principalColumn: "MemberId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Members_MemberId",
                table: "Orders",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "MemberId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Recommendations_Members_MemberId",
                table: "Recommendations",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_SavedAssets_Members_MemberId",
                table: "SavedAssets",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "MemberId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFollows_Members_UserId",
                table: "UserFollows",
                column: "UserId",
                principalTable: "Members",
                principalColumn: "MemberId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLikes_Members_MemberId",
                table: "UserLikes",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "MemberId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
