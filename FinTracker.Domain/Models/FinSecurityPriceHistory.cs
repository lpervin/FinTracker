using System;
using System.Collections.Generic;

namespace FinTracker.Domain.Models
{
    public partial class FinSecurityPriceHistory
    {
        public long Id { get; set; }
        public long SecurityId { get; set; }
        public DateTime? TradeDate { get; set; }
        public decimal? Open { get; set; }
        public decimal? High { get; set; }
        public decimal? Low { get; set; }
        public decimal? Close { get; set; }
        public decimal? Adj { get; set; }
        public long? Volume { get; set; }

        public virtual FinSecurity Security { get; set; }
    }
}
