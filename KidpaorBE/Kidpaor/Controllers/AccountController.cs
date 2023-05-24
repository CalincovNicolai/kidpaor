﻿using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Kidpaor.Dtos;
using Kidpaor.Errors;
using Kidpaor.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Kidpaor.Controllers;

public class AccountController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
        ITokenService tokenService, IMapper mapper, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _mapper = mapper;
        _roleManager = roleManager;
    }

    [HttpGet("emailexists")]
    public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
    {
        return await _userManager.FindByEmailAsync(email) != null;
    }
    
    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<AddressDto>> GetUserAddress()
    {
        var user = await _userManager.FindByEmailWithAddressAsync(User);
        
        return _mapper.Map<AddressDto>(user.Address);
    }
    
    [HttpPut("address")]
    public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
    {
        var user = await _userManager.FindByEmailWithAddressAsync(User);
        
        user.Address = _mapper.Map<Address>(address);
        
        var result = await _userManager.UpdateAsync(user);
        
        if (result.Succeeded) return Ok(_mapper.Map<AddressDto>(user.Address));
        
        return BadRequest("Problem updating the user");
    }
    
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        
        if (user == null) return Unauthorized(new ApiResponse(401));
        
        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
        
        if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

        return Ok(new UserDto
            {
                Email = user.Email,
                Role = (await _userManager.GetRolesAsync(user))[0],
                Token = _tokenService.CreateToken(user, (await _userManager.GetRolesAsync(user))[0]),
                DisplayName = user.UserName
            }
        );
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.Email
        };
        
        var result = await _userManager.CreateAsync(user, registerDto.Password);
        
        if (!result.Succeeded) return BadRequest(new ApiResponse(400));

        if (!await _roleManager.RoleExistsAsync(registerDto.Role))
        {
            await _roleManager.CreateAsync(new IdentityRole(registerDto.Role));
        }
        await _userManager.AddToRoleAsync(user, registerDto.Role);

        return Ok(new UserDto
        {
            DisplayName = user.DisplayName,
            Email = user.Email,
            Role = registerDto.Role,
            Token = _tokenService.CreateToken(user, registerDto.Role)
        });
    }
}