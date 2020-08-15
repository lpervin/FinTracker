namespace FinTracker.Domain.Models.Response
{
    public class FinSecurityResource : FinSecurity
    {
        public bool FinSecurityHistoryExists { get; set; }
    }
}