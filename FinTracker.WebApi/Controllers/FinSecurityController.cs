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
    public class FinSecurityController : ControllerBase
    {
        private readonly ILogger<FinSecurityController> _logger;
        private readonly IFinSecurity _finSecurityRepository;
        public FinSecurityController(IFinSecurity finSecurity, ILogger<FinSecurityController> logger)
        {
            _logger = logger;
            _finSecurityRepository = finSecurity;
        }

        [HttpPost]
        public async Task<long> AddFinSecurity(FinSecurity finSecurity)
        {
            return await _finSecurityRepository.AddFinSecurityAsync(finSecurity);
        }

        [HttpPost]
        [Route("query")]
        public async Task<QueryResult<FinSecurityResource>> QueryFinSecurity(ResourceQuery requestQuery)
        {
            return await _finSecurityRepository.QueryFinSecuritiesAsync(requestQuery);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteFinSecurity(long id)
        {
            var results = await _finSecurityRepository.DeleteFinSecurityAsync(id);
            if (!results)
                return NotFound();

            return Ok();
        }

    }
}