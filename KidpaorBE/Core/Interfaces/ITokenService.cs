using System.Security.Claims;
using Core.Entities.Identity;

namespace Core.Interfaces;

public interface ITokenService
{
    string CreateToken(AppUser user, string role);
    List<Claim> DecodeToken(string token);
}