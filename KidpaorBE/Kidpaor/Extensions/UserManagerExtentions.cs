using System.Security.Claims;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Kidpaor.Extensions;

public static class UserManagerExtentions
{
    public static async Task<AppUser> FindByEmailWithAddressAsync(this UserManager<AppUser> userManager, 
        ClaimsPrincipal user)
    {
        var email = user?.FindFirstValue(ClaimTypes.Email);
        return await userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
    }
    
    public static async Task<AppUser> FindByEmailFromClaimsPrinciple(this UserManager<AppUser> userManager, 
        ClaimsPrincipal user)
    {
        var email = user.FindFirstValue(ClaimTypes.Email);
        return await userManager.Users.SingleOrDefaultAsync(x => x.Email == email);
    }
}