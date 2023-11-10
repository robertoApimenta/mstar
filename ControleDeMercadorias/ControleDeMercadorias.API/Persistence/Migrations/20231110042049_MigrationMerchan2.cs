using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleDeMercadorias.API.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class MigrationMerchan2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    manufacturer = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    type = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    description = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    quantity_in_stock = table.Column<int>(type: "integer", nullable: false),
                    is_required = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductEntrys",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    quantity = table.Column<int>(type: "integer", nullable: false),
                    date_entry = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductEntrys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductEntrys_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductOutputs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    quantity = table.Column<int>(type: "integer", nullable: false),
                    date_output = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOutputs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductOutputs_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductEntrys_ProductId",
                table: "ProductEntrys",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOutputs_ProductId",
                table: "ProductOutputs",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductEntrys");

            migrationBuilder.DropTable(
                name: "ProductOutputs");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
