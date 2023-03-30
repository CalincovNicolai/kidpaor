using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Core.Entities.Identity;
using Core.Interfaces;
using Kidpaor.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using Shouldly;
using Xunit;

namespace Kidpaor.IntegrationTests;

public class AccountControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly ITokenService _tokenService;

    public AccountControllerIntegrationTests(WebApplicationFactory<Program> factory, ITokenService tokenService)
    {
        _factory = factory;
        _tokenService = tokenService;
    }

    [Fact]
    public async Task GetCurrentUser_ReturnsCurrentUser()
    {
        var client = _factory.CreateClient();
        var userManager = _factory.Services.GetService<UserManager<AppUser>>();
        var user = new AppUser { Email = "test@test.com", UserName = "test@test.com" };
        await userManager.CreateAsync(user, "Pa$$w0rd");
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _tokenService.CreateToken(user));
        var response = await client.GetAsync("/account");
        var content = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<UserDto>(content);
        response.StatusCode.ShouldBe(HttpStatusCode.OK);
        result.Email.ShouldBe(user.Email);
        result.DisplayName.ShouldBe(user.DisplayName);
    }
    
    [Fact]
    public async Task GetCurrentUser_ShouldReturnUnauthorized_WhenUserIsNotAuthenticated()
    {
        var client = _factory.CreateClient();
        var response = await client.GetAsync("/account");
        var content = await response.Content.ReadAsStringAsync();
        response.StatusCode.ShouldBe(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task CheckEmailExistsAsync_ReturnsTrueIfEmailExists()
    {
        var client = _factory.CreateClient();
        var userManager = _factory.Services.GetService<UserManager<AppUser>>();
        var user = new AppUser { Email = "test@test.com", UserName = "test@test.com" };
        await userManager.CreateAsync(user, "Pa$$w0rd");
        var response = await client.GetAsync($"/account/emailexists?email={user.Email}");
        response.StatusCode.ShouldBe(HttpStatusCode.OK);
        var content = await response.Content.ReadAsStringAsync();
        content.ShouldBe("True");
    }
    
    [Fact]
    public async Task CheckEmailExistsAsync_ShouldReturnFalse_WhenEmailDoesNotExist()
    {
        var client = _factory.CreateClient();
        var email = "nonexistentuser@example.com";
        var response = await client.GetAsync($"/account/emailexists?email={email}");
        var content = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<bool>(content);
        response.StatusCode.ShouldBe(HttpStatusCode.OK);
        result.ShouldBeFalse();
    }

    [Fact]
    public async Task GetUserAddress_ReturnsUserAddress()
    {
        var client = _factory.CreateClient();
        var userManager = _factory.Services.GetService<UserManager<AppUser>>();
        var user = new AppUser { Email = "test@test.com", UserName = "test@test.com" };
        await userManager.CreateAsync(user, "Pa$$w0rd");
        user.Address = new Address { City = "Test City" };
        await userManager.UpdateAsync(user);
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _tokenService.CreateToken(user));
        var response = await client.GetAsync("/account/address");
        var content = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<AddressDto>(content);
        response.StatusCode.ShouldBe(HttpStatusCode.OK);
        result.City.ShouldBe(user.Address.City);
    }
    
    [Fact]
    public async Task UpdateUserAddress_ShouldReturnUpdatedAddress()
    {
        var client = _factory.CreateClient();
        var userManager = _factory.Services.GetService<UserManager<AppUser>>();
        var user = new AppUser { Email = "test@test.com", UserName = "test@test.com" };
        await userManager.CreateAsync(user, "Pa$$w0rd");
        var newAddress = new AddressDto
        {
            Street = "123 New Street",
            City = "New City",
            ZipCode = "12345"
        };
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _tokenService.CreateToken(user));
        var content = new StringContent(JsonConvert.SerializeObject(newAddress), Encoding.UTF8, "application/json");
        var response = await client.PutAsync("/account/address", content);
        var responseContent = await response.Content.ReadAsStringAsync();
        var updatedAddress = JsonConvert.DeserializeObject<AddressDto>(responseContent);
        response.StatusCode.ShouldBe(HttpStatusCode.OK);
        updatedAddress.ShouldNotBeNull();
        updatedAddress.Street.ShouldBe(newAddress.Street);
        updatedAddress.City.ShouldBe(newAddress.City);
        updatedAddress.ZipCode.ShouldBe(newAddress.ZipCode);
    }
}