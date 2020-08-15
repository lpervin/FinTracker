using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using FinTracker.Domain.Models;
using FinTracker.Domain.Models.Request;

namespace FinTracker.Domain.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<FinSecurity> ApplyFiltering(this IQueryable<FinSecurity> query,
            FinSecurityQuery requestQuery)
        {
            if (string.IsNullOrEmpty(requestQuery.SearchTerm))
                return query;

            return query.Where(r =>
                r.Name.Contains(requestQuery.SearchTerm) || r.Symbol.Contains(requestQuery.SearchTerm));
        }

        public static IQueryable<T> ApplySorting<T>(this IQueryable<T> query, FinSecurityQuery requestQuery, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (string.IsNullOrWhiteSpace(requestQuery.SortBy) || !columnsMap.ContainsKey(requestQuery.SortBy))
                return query;

            return requestQuery.IsSortAscending ? query.OrderBy(columnsMap[requestQuery.SortBy]) 
                : query.OrderByDescending(columnsMap[requestQuery.SortBy]);
        }

        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, FinSecurityQuery requestQuery)
        {
            if (requestQuery.Page <= 0)
                requestQuery.Page = 1;
            
            if (requestQuery.PageSize <= 0)
                requestQuery.PageSize = 10;

            return query.Skip((requestQuery.Page - 1) * requestQuery.PageSize).Take(requestQuery.PageSize);
        }
    }
}