using System.IdentityModel.Tokens.Jwt;
using Core.Entities.Identity;
using Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Moq;
using Xunit;

namespace Kidpaor.UnitTests.Doubles
{
    public class TokenServiceMock
    {
        [Fact]
        public void CreateToken_ValidUser_ReturnsToken()
        {
            var mockConfiguration = new Mock<IConfiguration>();
            mockConfiguration.SetupGet(x => x["Token:Key"]).Returns("test_key");
            mockConfiguration.SetupGet(x => x["Token:Issuer"]).Returns("test_issuer");

            var mockUser = new Mock<AppUser>();
            mockUser.SetupGet(x => x.Email).Returns("test@test.com");
            mockUser.SetupGet(x => x.DisplayName).Returns("Test User");

            var mockSigningCredentials = new Mock<SigningCredentials>(new object[] { It.IsAny<SymmetricSecurityKey>(), It.IsAny<string>() });
            var mockSecurityTokenDescriptor = new Mock<SecurityTokenDescriptor>();
            mockSecurityTokenDescriptor.SetupProperty(x => x.Subject);
            mockSecurityTokenDescriptor.SetupProperty(x => x.Expires);
            mockSecurityTokenDescriptor.SetupProperty(x => x.SigningCredentials, mockSigningCredentials.Object);
            mockSecurityTokenDescriptor.SetupSet(x => x.Issuer = It.IsAny<string>());

            var mockJwtSecurityTokenHandler = new Mock<JwtSecurityTokenHandler>();
            mockJwtSecurityTokenHandler.Setup(x => x.CreateToken(It.IsAny<SecurityTokenDescriptor>())).Returns(new JwtSecurityToken());

            var tokenService = new TokenService(mockConfiguration.Object);

            var token = tokenService.CreateToken(mockUser.Object);

            Assert.NotNull(token);
        }
    }
}
