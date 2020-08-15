using System;
using System.Threading.Tasks;
using FinTracker.Domain.Models;

namespace FinTracker.Domain.Repositories
{
    public interface IFinSecurity
    {
        Task<long> AddFinSecurityAsync(FinSecurity security);
    }
}