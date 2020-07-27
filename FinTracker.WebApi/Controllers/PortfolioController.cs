using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinTracker.Domain.Models;
using FinTracker.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace FinTracker.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PortfolioController : ControllerBase
    {
       
        private readonly ILogger<PortfolioController> _logger;
        private readonly IPortfolio _portfolioRepo; 
        public PortfolioController(IPortfolio portfolioRepo, ILogger<PortfolioController> logger)
        {
            _portfolioRepo = portfolioRepo;
            _logger = logger;
        }

        [HttpGet]
        public async Task<List<Portfolios>> Get()
        {
            return await  _portfolioRepo.GetPortfolios();
        }
    }
}
