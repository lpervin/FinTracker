using System;
using System.Threading.Tasks;
using FinTracker.Domain.Data;
using FinTracker.Domain.Models;

namespace FinTracker.Domain.Repositories
{
    public class FinSecurityRepository : IFinSecurity
    {
        private readonly FinTrackerContext _dbContext;

        public FinSecurityRepository(FinTrackerContext finDbContext)
        {
            _dbContext = finDbContext;
        }
        public async Task<long> AddFinSecurityAsync(FinSecurity security)
        {
            try
            {
                var results = await _dbContext.FinSecurity.AddAsync(security);
                await _dbContext.SaveChangesAsync();
                return results.Entity.Id;
            }
            catch (Exception e)
            {
               // Console.WriteLine(e);
               return -1;
            }
        }
    }
}