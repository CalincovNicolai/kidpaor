using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace Kidpaor.Middleware;

public static class ExceptionMiddleware
{
    public static Action<IApplicationBuilder> DefaultExceptionHandler =>
        builder =>
        {
            builder.Run(
                async httpContext =>
                {
                    var context = httpContext.Features.Get<IExceptionHandlerFeature>();
                    var exception = context.Error;
                    
                    (string Message, HttpStatusCode StatusCode) error = exception switch
                    {
                        DbUpdateException => ("Failed updating data in database", HttpStatusCode.InternalServerError),
                        ArgumentNullException => ("Parameter cannot be empty", HttpStatusCode.BadRequest),
                        ArgumentException => (exception.Message, HttpStatusCode.BadRequest),
                        InvalidOperationException => (exception.Message, HttpStatusCode.BadRequest),
                        _ => ($"Unhandled exception type: {exception.GetType().Name}, with message: {exception.Message}", HttpStatusCode.InternalServerError)
                    };

                    httpContext.Response.ContentType = "application/json";
                    httpContext.Response.StatusCode = (int)error.StatusCode;
                    await httpContext.Response.WriteAsync(JsonSerializer.Serialize(error.Message));
                });
        };
}