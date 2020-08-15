using System.Collections.Generic;

namespace FinTracker.Domain.Models.Response
{
    public class QueryResult<T>
    {
        public int TotalItems { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}