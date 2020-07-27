using System;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Domain.Models
{
    public static class ModelBuilderExtension
    {
                public static void Seed(this ModelBuilder modelBuilder)
                {
                     modelBuilder.Entity<Portfolios>().HasData(
                                new Portfolios() { Id = 1, Name = "Default", InvestmentStrategy = "Conservative", Description = "Default Portfolio", CreatedDate = DateTime.Now},
                                        new Portfolios() { Id = 2, Name = "Moderate", InvestmentStrategy = "Moderate", Description = "Moderate Portfolio", CreatedDate = DateTime.Now},
                                        new Portfolios() { Id = 3, Name = "Aggressive", InvestmentStrategy = "Aggressive", Description = "Aggressive Portfolio", CreatedDate = DateTime.Now}
                                   
                                );
                    // modelBuilder.Entity<Book>().HasData(
                    //     new Book { BookId = 1, AuthorId = 1, Title = "Hamlet" },
                    //     new Book { BookId = 2, AuthorId = 1, Title = "King Lear" },
                    //     new Book { BookId = 3, AuthorId = 1, Title = "Othello" }
                    // );
                
            }
    }
}