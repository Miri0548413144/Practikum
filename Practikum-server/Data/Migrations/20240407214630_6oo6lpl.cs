using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class _6oo6lpl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkerRole_Roles_RoleId",
                table: "WorkerRole");

            migrationBuilder.DropIndex(
                name: "IX_WorkerRole_RoleId",
                table: "WorkerRole");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_WorkerRole_RoleId",
                table: "WorkerRole",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerRole_Roles_RoleId",
                table: "WorkerRole",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
