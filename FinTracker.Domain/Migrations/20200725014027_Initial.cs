using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Fintracker.Domain.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FinSecurity",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SecurityType = table.Column<string>(maxLength: 25, nullable: false),
                    Symbol = table.Column<string>(maxLength: 100, nullable: false),
                    Name = table.Column<string>(maxLength: 1500, nullable: true),
                    LastPrice = table.Column<decimal>(type: "decimal(16, 4)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinSecurity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Portfolios",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(maxLength: 255, nullable: true),
                    InvestmentStrategy = table.Column<string>(maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Portfolios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FinSecurityPriceHistory",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SecurityId = table.Column<long>(nullable: false),
                    TradeDate = table.Column<DateTime>(type: "date", nullable: true),
                    Open = table.Column<decimal>(type: "decimal(14, 6)", nullable: true),
                    High = table.Column<decimal>(type: "decimal(16, 4)", nullable: true),
                    Low = table.Column<decimal>(type: "decimal(16, 4)", nullable: true),
                    Close = table.Column<decimal>(type: "decimal(16, 4)", nullable: true),
                    Adj = table.Column<decimal>(type: "decimal(16, 4)", nullable: true),
                    Volume = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("FinSecurityPriceHistory_pk", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FinSecurityPriceHistory_FinSecurity__fk",
                        column: x => x.SecurityId,
                        principalTable: "FinSecurity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PortfolioComposition",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PortfolioId = table.Column<int>(nullable: false),
                    FinSecurityId = table.Column<long>(nullable: false),
                    Units = table.Column<decimal>(type: "decimal(16, 4)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(16, 4)", nullable: false),
                    CostBasis = table.Column<decimal>(type: "decimal(16, 4)", nullable: true, defaultValueSql: "((0.0))"),
                    CurrentMarketValue = table.Column<decimal>(type: "decimal(16, 4)", nullable: true, defaultValueSql: "((0.0))"),
                    DateAdded = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioComposition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PortfolioComposition_FinSecurity",
                        column: x => x.FinSecurityId,
                        principalTable: "FinSecurity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PortfolioComposition_Portfolio",
                        column: x => x.PortfolioId,
                        principalTable: "Portfolios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Portfolios",
                columns: new[] { "Id", "CreatedDate", "Description", "InvestmentStrategy", "Name" },
                values: new object[] { 1, new DateTime(2020, 7, 24, 21, 40, 26, 813, DateTimeKind.Local).AddTicks(7620), "Default Portfolio", "Conservative", "Default" });

            migrationBuilder.InsertData(
                table: "Portfolios",
                columns: new[] { "Id", "CreatedDate", "Description", "InvestmentStrategy", "Name" },
                values: new object[] { 2, new DateTime(2020, 7, 24, 21, 40, 26, 827, DateTimeKind.Local).AddTicks(4130), "Moderate Portfolio", "Moderate", "Moderate" });

            migrationBuilder.InsertData(
                table: "Portfolios",
                columns: new[] { "Id", "CreatedDate", "Description", "InvestmentStrategy", "Name" },
                values: new object[] { 3, new DateTime(2020, 7, 24, 21, 40, 26, 827, DateTimeKind.Local).AddTicks(4170), "Aggressive Portfolio", "Aggressive", "Aggressive" });

            migrationBuilder.CreateIndex(
                name: "FinSecurityPriceHistory_Id_uindex",
                table: "FinSecurityPriceHistory",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FinSecurityPriceHistory_SecurityId",
                table: "FinSecurityPriceHistory",
                column: "SecurityId");

            migrationBuilder.CreateIndex(
                name: "IX_PortfolioComposition_FinSecurityId",
                table: "PortfolioComposition",
                column: "FinSecurityId");

            migrationBuilder.CreateIndex(
                name: "IX_PortfolioComposition_PortfolioId",
                table: "PortfolioComposition",
                column: "PortfolioId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FinSecurityPriceHistory");

            migrationBuilder.DropTable(
                name: "PortfolioComposition");

            migrationBuilder.DropTable(
                name: "FinSecurity");

            migrationBuilder.DropTable(
                name: "Portfolios");
        }
    }
}
