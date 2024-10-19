using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Speckles.Database.Migrations
{
    /// <inheritdoc />
    public partial class Two : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Assets_AssetId",
                table: "Purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Members_MemberId",
                table: "Purchases");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Purchases",
                table: "Purchases");

            migrationBuilder.RenameTable(
                name: "Purchases",
                newName: "Purchase");

            migrationBuilder.RenameIndex(
                name: "IX_Purchases_MemberId",
                table: "Purchase",
                newName: "IX_Purchase_MemberId");

            migrationBuilder.RenameIndex(
                name: "IX_Purchases_AssetId",
                table: "Purchase",
                newName: "IX_Purchase_AssetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Purchase",
                table: "Purchase",
                column: "PurchaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchase_Assets_AssetId",
                table: "Purchase",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "AssetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Purchase_Members_MemberId",
                table: "Purchase",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "MemberId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchase_Assets_AssetId",
                table: "Purchase");

            migrationBuilder.DropForeignKey(
                name: "FK_Purchase_Members_MemberId",
                table: "Purchase");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Purchase",
                table: "Purchase");

            migrationBuilder.RenameTable(
                name: "Purchase",
                newName: "Purchases");

            migrationBuilder.RenameIndex(
                name: "IX_Purchase_MemberId",
                table: "Purchases",
                newName: "IX_Purchases_MemberId");

            migrationBuilder.RenameIndex(
                name: "IX_Purchase_AssetId",
                table: "Purchases",
                newName: "IX_Purchases_AssetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Purchases",
                table: "Purchases",
                column: "PurchaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Assets_AssetId",
                table: "Purchases",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "AssetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Members_MemberId",
                table: "Purchases",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "MemberId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
