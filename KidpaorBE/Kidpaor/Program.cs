using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Kidpaor.Extensions;
using Kidpaor.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;
using Serilog.Formatting.Json;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File(new JsonFormatter(),
        "important-logs.json",
        restrictedToMinimumLevel: LogEventLevel.Warning)
    .WriteTo.File("all-daily-.logs",
        rollingInterval: RollingInterval.Day)
    .MinimumLevel.Debug()
    .CreateLogger();
try
{
    Log.Information("Starting web application");
    var builder = WebApplication.CreateBuilder(args);
    builder.Host.UseSerilog();
    builder.Services.AddControllers();
    builder.Services.AddApplicationServices(builder.Configuration);
    builder.Services.AddIdentityService(builder.Configuration);
    var app = builder.Build();
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<StoreContext>();
        var identityContext = services.GetRequiredService<AppIdentityDbContext>();
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        var loggerFactory = services.GetRequiredService<ILoggerFactory>();
        try
        {
            await identityContext.Database.MigrateAsync();
            await context.Database.MigrateAsync();
            await AppIdentityDbContextSeed.SeedUsersAsync(userManager);
        }
        catch (Exception ex)
        {
            var logger = loggerFactory.CreateLogger<Program>();
            logger.LogError(ex, "An error occurred during migration");
        }
    }

// Configure the HTTP request pipeline.
    // app.UseMiddleware<IpFilterMiddleware>(new string[] { "192.168.0.1", "10.0.0.1", "172.16.0.1" });
    app.UseMiddleware<ExceptionMiddleware>();

    app.UseStatusCodePagesWithReExecute("errors/{0}");

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseRouting();

    app.UseStaticFiles();

    app.UseCors("CorsPolicy");

    app.UseAuthentication();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}