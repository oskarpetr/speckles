using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class Third : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_Assets_AssetId",
                table: "Licenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Members_Studios_StudioId",
                table: "Members");

            migrationBuilder.DropForeignKey(
                name: "FK_Recommendations_Tags_TagId",
                table: "Recommendations");

            migrationBuilder.DropIndex(
                name: "IX_Members_StudioId",
                table: "Members");

            migrationBuilder.DropIndex(
                name: "IX_Licenses_AssetId",
                table: "Licenses");

            migrationBuilder.DropColumn(
                name: "StudioId",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "AssetId",
                table: "Licenses");

            migrationBuilder.RenameColumn(
                name: "PaidWith",
                table: "Purchases",
                newName: "PaymentMethod");

            migrationBuilder.AlterColumn<string>(
                name: "TagId",
                table: "Recommendations",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LicenseId",
                table: "Assets",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "BasketAssets",
                columns: table => new
                {
                    BasketAssetId = table.Column<string>(type: "text", nullable: false),
                    AssetId = table.Column<string>(type: "text", nullable: false),
                    MemberId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasketAssets", x => x.BasketAssetId);
                    table.ForeignKey(
                        name: "FK_BasketAssets_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "AssetId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BasketAssets_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "MemberId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    CommentId = table.Column<string>(type: "text", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    MemberId = table.Column<string>(type: "text", nullable: false),
                    AssetId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.CommentId);
                    table.ForeignKey(
                        name: "FK_Comments_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "AssetId");
                    table.ForeignKey(
                        name: "FK_Comments_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "MemberId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SavedAssets",
                columns: table => new
                {
                    SavedAssetId = table.Column<string>(type: "text", nullable: false),
                    AssetId = table.Column<string>(type: "text", nullable: false),
                    MemberId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedAssets", x => x.SavedAssetId);
                    table.ForeignKey(
                        name: "FK_SavedAssets_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "AssetId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SavedAssets_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "MemberId",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "IX_Assets_LicenseId",
                table: "Assets",
                column: "LicenseId");

            migrationBuilder.CreateIndex(
                name: "IX_BasketAssets_AssetId",
                table: "BasketAssets",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_BasketAssets_MemberId",
                table: "BasketAssets",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AssetId",
                table: "Comments",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_MemberId",
                table: "Comments",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedAssets_AssetId",
                table: "SavedAssets",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedAssets_MemberId",
                table: "SavedAssets",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_StudioMembers_MemberId",
                table: "StudioMembers",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_StudioMembers_StudioId",
                table: "StudioMembers",
                column: "StudioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_Licenses_LicenseId",
                table: "Assets",
                column: "LicenseId",
                principalTable: "Licenses",
                principalColumn: "LicenseId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Recommendations_Tags_TagId",
                table: "Recommendations",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "TagId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assets_Licenses_LicenseId",
                table: "Assets");

            migrationBuilder.DropForeignKey(
                name: "FK_Recommendations_Tags_TagId",
                table: "Recommendations");

            migrationBuilder.DropTable(
                name: "BasketAssets");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "SavedAssets");

            migrationBuilder.DropTable(
                name: "StudioMembers");

            migrationBuilder.DropIndex(
                name: "IX_Assets_LicenseId",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "LicenseId",
                table: "Assets");

            migrationBuilder.RenameColumn(
                name: "PaymentMethod",
                table: "Purchases",
                newName: "PaidWith");

            migrationBuilder.AlterColumn<string>(
                name: "TagId",
                table: "Recommendations",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "StudioId",
                table: "Members",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AssetId",
                table: "Licenses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Members_StudioId",
                table: "Members",
                column: "StudioId");

            migrationBuilder.CreateIndex(
                name: "IX_Licenses_AssetId",
                table: "Licenses",
                column: "AssetId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Licenses_Assets_AssetId",
                table: "Licenses",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "AssetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Members_Studios_StudioId",
                table: "Members",
                column: "StudioId",
                principalTable: "Studios",
                principalColumn: "StudioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Recommendations_Tags_TagId",
                table: "Recommendations",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "TagId");
        }
    }
}
