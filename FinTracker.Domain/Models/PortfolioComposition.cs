using System;
using System.Collections.Generic;

namespace FinTracker.Domain.Models
{
    public partial class PortfolioComposition
    {
        public long Id { get; set; }
        public int PortfolioId { get; set; }
        public long FinSecurityId { get; set; }
        public decimal Units { get; set; }
        public decimal Price { get; set; }
        public decimal? CostBasis { get; set; }
        public decimal? CurrentMarketValue { get; set; }
        public DateTime? DateAdded { get; set; }

        public virtual FinSecurity FinSecurity { get; set; }
        public virtual Portfolios Portfolio { get; set; }
    }
}
