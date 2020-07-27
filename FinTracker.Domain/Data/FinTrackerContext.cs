using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using FinTracker.Domain.Models;

namespace FinTracker.Domain.Data
{
    public partial class FinTrackerContext : DbContext
    {
        public FinTrackerContext()
        {
        }

        public FinTrackerContext(DbContextOptions<FinTrackerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<FinSecurity> FinSecurity { get; set; }
        public virtual DbSet<FinSecurityPriceHistory> FinSecurityPriceHistory { get; set; }
        public virtual DbSet<PortfolioComposition> PortfolioComposition { get; set; }
        public virtual DbSet<Portfolios> Portfolios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=Default");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FinSecurity>(entity =>
            {
                entity.Property(e => e.LastPrice).HasColumnType("decimal(16, 4)");

                entity.Property(e => e.Name).HasMaxLength(1500);

                entity.Property(e => e.SecurityType)
                    .IsRequired()
                    .HasMaxLength(25);

                entity.Property(e => e.Symbol)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<FinSecurityPriceHistory>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("FinSecurityPriceHistory_pk")
                    .IsClustered(false);

                entity.HasIndex(e => e.Id)
                    .HasName("FinSecurityPriceHistory_Id_uindex")
                    .IsUnique();

                entity.Property(e => e.Adj).HasColumnType("decimal(16, 4)");

                entity.Property(e => e.Close).HasColumnType("decimal(16, 4)");

                entity.Property(e => e.High).HasColumnType("decimal(16, 4)");

                entity.Property(e => e.Low).HasColumnType("decimal(16, 4)");

                entity.Property(e => e.Open).HasColumnType("decimal(14, 6)");

                entity.Property(e => e.TradeDate).HasColumnType("date");

                entity.HasOne(d => d.Security)
                    .WithMany(p => p.FinSecurityPriceHistory)
                    .HasForeignKey(d => d.SecurityId)
                    .HasConstraintName("FinSecurityPriceHistory_FinSecurity__fk");
            });

            modelBuilder.Entity<PortfolioComposition>(entity =>
            {
                entity.Property(e => e.CostBasis)
                    .HasColumnType("decimal(16, 4)")
                    .HasDefaultValueSql("((0.0))");

                entity.Property(e => e.CurrentMarketValue)
                    .HasColumnType("decimal(16, 4)")
                    .HasDefaultValueSql("((0.0))");

                entity.Property(e => e.DateAdded).HasColumnType("datetime");

                entity.Property(e => e.Price).HasColumnType("decimal(16, 4)");

                entity.Property(e => e.Units).HasColumnType("decimal(16, 4)");

                entity.HasOne(d => d.FinSecurity)
                    .WithMany(p => p.PortfolioComposition)
                    .HasForeignKey(d => d.FinSecurityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PortfolioComposition_FinSecurity");

                entity.HasOne(d => d.Portfolio)
                    .WithMany(p => p.PortfolioComposition)
                    .HasForeignKey(d => d.PortfolioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PortfolioComposition_Portfolio");
            });

            modelBuilder.Entity<Portfolios>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.InvestmentStrategy).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);
            });
            OnModelCreatingPartial(modelBuilder);    
            modelBuilder.Seed();
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
