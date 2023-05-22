using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Entities.Identity;
using Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Moq;
using Xunit;

namespace Kidpaor.UnitTests
{
    public class TokenServiceTests
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;

        public TokenServiceTests()
        {
            var config = new Mock<IConfiguration>();
            config.Setup(x => x["Token:Key"]).Returns("my-very-strong-secret");
            config.Setup(x => x["Token:Issuer"]).Returns("kidpaor");

            _config = config.Object;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));
        }

        [Fact]
        public void CreateToken_Returns_Valid_JWT()
        {
            var user = new AppUser { Email = "test@example.com", DisplayName = "Test User" };
            var service = new TokenService(_config);

            var token = service.CreateToken(user, "");
            var tokenHandler = new JwtSecurityTokenHandler();
            var decodedToken = tokenHandler.ReadJwtToken(token);

            Assert.NotNull(token);
            Assert.NotEmpty(token);
            Assert.Equal("kidpaor", decodedToken.Issuer);
            Assert.Equal("Test User", decodedToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName)?.Value);
            Assert.Equal("test@example.com", decodedToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value);
        }

        [Fact]
        public void CreateToken_Throws_Exception_When_User_Null()
        {
            var service = new TokenService(_config);

            Assert.Throws<ArgumentNullException>(() => service.CreateToken(null, ""));
        }
    }
}
