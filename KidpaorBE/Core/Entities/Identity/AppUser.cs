using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity;

public class AppUser : IdentityUser
{
    public int Id { get; set; }
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
    public Address Address { get; set; }
}