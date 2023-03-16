using Microsoft.EntityFrameworkCore;

namespace Kidpaor.Middleware;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly DbContext _dbContext;

    public RequestLoggingMiddleware(RequestDelegate next, DbContext dbContext)
    {
        _next = next;
        _dbContext = dbContext;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // log the request data to the database
        var requestLog = new RequestLog
        {
            Timestamp = DateTime.UtcNow,
            IpAddress = context.Connection.RemoteIpAddress?.ToString(),
            Url = context.Request.Path.ToString()
        };

        _dbContext.RequestLogs.Add(requestLog);
        await _dbContext.SaveChangesAsync();

        // call the next middleware or endpoint in the pipeline
        await _next(context);
    }
}
