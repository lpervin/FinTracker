using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FinTracker.Domain.Data;
using FinTracker.Domain.Extensions;
using FinTracker.Domain.Models;
using FinTracker.Domain.Models.Request;
using FinTracker.Domain.Models.Response;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Domain.Repositories
{
    public class FinSecurityRepository : IFinSecurity
    {
        private readonly FinTrackerContext _dbContext;

        public FinSecurityRepository(FinTrackerContext finDbContext)
        {
            _dbContext = finDbContext;
        }

        public async Task<List<FinSecurityResource>> GetAllAsync()
        {
            var results = await _dbContext.FinSecurity
                .Select(fs => new FinSecurityResource
                {
                    Id =  fs.Id,
                    Name = fs.Name,
                    Symbol = fs.Symbol,
                    FinSecurityHistoryExists = fs.FinSecurityPriceHistory.Any()
                })
                .ToListAsync();

            return results;
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

        public async Task<QueryResult<FinSecurityResource>> QueryFinSecuritiesAsync(ResourceQuery requestQuery)
        {
            var results = new QueryResult<FinSecurityResource>();
            //Apply Search 
            var query = _dbContext
                .FinSecurity
                .AsQueryable();
            query = query.ApplyFiltering(requestQuery);
            //Apply Sort
            var columnsMap = new Dictionary<string, Expression<Func<FinSecurity, object>>>()
            {
                ["Id"] = fs => fs.Id,
                ["Name"] = fs => fs.Name,
                ["Symbol"] = fs => fs.Symbol
            };
            query = query.ApplySorting(requestQuery, columnsMap);
            //Get Total Counts before paging
            results.TotalItems = await query.CountAsync();
            //Apply Paging
            query = query.ApplyPaging(requestQuery);
           // Project to FinSecurityResource
           results.Items = await query.Select(fs => new FinSecurityResource()
           {
               Id = fs.Id,
               Name = fs.Name,
               Symbol = fs.Symbol,
               SecurityType = fs.SecurityType,
               LastPrice = fs.LastPrice,
               FinSecurityHistoryExists = fs.FinSecurityPriceHistory.Any()
           }).ToListAsync();
            return results;
        }
        
        public async Task<QueryResult<FinSecurityPriceHistory>> QueryFinSecurityHistoryAsync(ResourceQuery requestQuery)
        {
            var results = new QueryResult<FinSecurityPriceHistory>();
            
            var query = _dbContext.FinSecurityPriceHistory.AsQueryable();
            query = query.ApplyFiltering(requestQuery);
            results.TotalItems = await query.CountAsync();
            
            //Apply Sort
            var columnsMap = new Dictionary<string, Expression<Func<FinSecurityPriceHistory, object>>>()
            {
                ["Id"] = fs => fs.Id,
                ["TradeDate"] = fs => fs.TradeDate,
                ["Close"] = fs => fs.Close
            };
            query = query.ApplySorting(requestQuery, columnsMap);
            query = query.ApplyPaging(requestQuery);
            results.Items = await query.ToListAsync();
            return results;
        }

        public async Task<bool> DeleteFinSecurityAsync(long id)
        {
            var finSecuirtyToDelete = await _dbContext.FinSecurity.FindAsync(id);
            if (finSecuirtyToDelete == null)
                return false;
        
            _dbContext.Remove(finSecuirtyToDelete);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        
    }
}