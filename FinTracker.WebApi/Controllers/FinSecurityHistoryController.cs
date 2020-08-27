using System.Threading.Tasks;
using FinTracker.Domain.Models;
using FinTracker.Domain.Models.Request;
using FinTracker.Domain.Models.Response;
using FinTracker.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FinTracker.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FinSecurityHistoryController : ControllerBase
    {
        private readonly ILogger<FinSecurityHistoryController> _logger;
        private readonly IFinSecurity _finSecurityRepository;
        
        public FinSecurityHistoryController(IFinSecurity finSecurity, ILogger<FinSecurityHistoryController> logger)
        {
            _logger = logger;
            _finSecurityRepository = finSecurity;
        }
        
        [HttpPost]
        [Route("query")]
        public async Task<QueryResult<FinSecurityPriceHistory>> QueryFinSecurity(ResourceQuery requestQuery)
        {
            return await _finSecurityRepository.QueryFinSecurityHistoryAsync(requestQuery);
        }
    }
}