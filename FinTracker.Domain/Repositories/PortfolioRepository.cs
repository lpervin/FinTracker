using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FinTracker.Domain.Data;
using FinTracker.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Domain.Repositories
{
    public class PortfolioRepository : IPortfolio
    {
      //  private readonly  IServiceProvider _serviceProvider;
      private readonly FinTrackerContext _dbContext;
        public PortfolioRepository(FinTrackerContext finDbContext)
        {
                _dbContext = finDbContext;
        }
        public async Task<List<Portfolios>> GetPortfolios()
        {
            var results = await _dbContext.Portfolios.ToListAsync();
            return results;
        }

        public async Task<Portfolios> GetPortfolioComposition(int portfolioId)
        {
            var portfolio = await _dbContext.Portfolios
                                .Include(p => p.PortfolioComposition)
                                .FirstOrDefaultAsync(p=>p.Id == portfolioId);
            return portfolio;

        }
    }
}