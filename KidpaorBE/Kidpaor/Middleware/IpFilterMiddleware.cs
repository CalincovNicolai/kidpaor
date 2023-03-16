using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Kidpaor.Middleware;
public class IpFilterMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string[] _allowedIps;

    public IpFilterMiddleware(RequestDelegate next, string[] allowedIps)
    {
        _next = next;
        _allowedIps = allowedIps;
    }

    public async Task Invoke(HttpContext context)
    {
        // retrieve the client's IP address
        string clientIp = context.Connection.RemoteIpAddress.ToString();

        // check if the client's IP address is in the list of allowed IP addresses
        if (_allowedIps.Contains(clientIp))
        {
            // allow access to the next middleware or endpoint
            await _next.Invoke(context);
        }
        else
        {
            // deny access and show an error message
            context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
            await context.Response.WriteAsync("Access denied.");
        }
    }
}