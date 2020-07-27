using System.Collections.Generic;
using System.Threading.Tasks;
using FinTracker.Domain.Models;

namespace FinTracker.Domain.Repositories
{
    public interface IPortfolio
    {
         Task<List<Portfolios>> GetPortfolios();
         Task<Portfolios> GetPortfolioComposition(int portfolioId);
    }
}