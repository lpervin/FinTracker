using System;
using System.Collections.Generic;

namespace FinTracker.Domain.Models
{
    public partial class FinSecurity
    {
        public FinSecurity()
        {
            FinSecurityPriceHistory = new HashSet<FinSecurityPriceHistory>();
            PortfolioComposition = new HashSet<PortfolioComposition>();
        }

        public long Id { get; set; }
        public string SecurityType { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public decimal LastPrice { get; set; }

        public virtual ICollection<FinSecurityPriceHistory> FinSecurityPriceHistory { get; set; }
        public virtual ICollection<PortfolioComposition> PortfolioComposition { get; set; }
    }
}
