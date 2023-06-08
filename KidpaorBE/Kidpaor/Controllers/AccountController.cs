using Core.Entities.Identity;
using Core.Interfaces;
using Kidpaor.Dtos;
using Kidpaor.Errors;
using Kidpaor.ViewModels.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Kidpaor.Controllers;

public class AccountController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
        ITokenService tokenService, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _roleManager = roleManager;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserViewModel>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        
        if (user == null) return Unauthorized(new ApiResponse(401));
        
        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
        
        if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

        return Ok(new UserViewModel
            {
                Email = user.Email,
                Role = (await _userManager.GetRolesAsync(user))[0],
                Token = _tokenService.CreateToken(user, (await _userManager.GetRolesAsync(user))[0]),
                DisplayName = user.UserName
            }
        );
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserViewModel>> Register(RegisterDto registerDto)
    {
        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.DisplayName
        };
        
        var result = await _userManager.CreateAsync(user, registerDto.Password);
        
        if (!result.Succeeded) return BadRequest(new ApiResponse(400));

        if (!await _roleManager.RoleExistsAsync(registerDto.Role))
        {
            await _roleManager.CreateAsync(new IdentityRole(registerDto.Role));
        }
        await _userManager.AddToRoleAsync(user, registerDto.Role);

        return Ok(new UserViewModel
        {
            DisplayName = user.DisplayName,
            Email = user.Email,
            Role = registerDto.Role,
            Token = _tokenService.CreateToken(user, registerDto.Role)
        });
    }
}