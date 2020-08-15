namespace FinTracker.Domain.Models.Request
{
    public class FinSecurityQuery
    {
                public string SearchTerm { get; set; }
                public string SortBy { get; set; }
                public bool IsSortAscending { get; set; }
                public int Page { get; set; }
                public int PageSize { get; set; }
    }
}