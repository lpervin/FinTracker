using System;
using System.Collections.Generic;

namespace FinTracker.Domain.Models
{
    public partial class Portfolios
    {
        public Portfolios()
        {
            PortfolioComposition = new HashSet<PortfolioComposition>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string InvestmentStrategy { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual ICollection<PortfolioComposition> PortfolioComposition { get; set; }
    }
}
