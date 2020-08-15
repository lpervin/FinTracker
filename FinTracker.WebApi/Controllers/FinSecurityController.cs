using System.Threading.Tasks;
using FinTracker.Domain.Models;
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

    }
}