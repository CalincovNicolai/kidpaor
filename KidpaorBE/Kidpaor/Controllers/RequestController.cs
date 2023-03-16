using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kidpaor.Controllers;

public class RequestController : BaseApiController
{
    private readonly StoreContext _context;

    public RequestController(StoreContext context)
    {
        _context = context;
    }
    
    [HttpGet("request")]
    public async Task<int> GetRequestsPerDay([FromQuery] DateTime date)
    {
        // count the number of requests for the specified day
        var count = await _context.RequestLogs
            .Where(log => log.Timestamp.Date == date.Date)
            .CountAsync();

        return count;
    }

}