using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FinTracker.Domain.Models;
using FinTracker.Domain.Models.Request;
using FinTracker.Domain.Models.Response;

namespace FinTracker.Domain.Repositories
{
    public interface IFinSecurity
    {
        Task<List<FinSecurityResource>> GetAllAsync();
        Task<long> AddFinSecurityAsync(FinSecurity security);
        Task<QueryResult<FinSecurityResource>> QueryFinSecuritiesAsync(ResourceQuery requestQuery);
        Task<bool> DeleteFinSecurityAsync(long id);

        Task<QueryResult<FinSecurityPriceHistory>> QueryFinSecurityHistoryAsync(ResourceQuery requestQuery);

    }
}