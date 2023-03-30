using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace Kidpaor.UnitTests.Doubles;

public class SpyJwtSecurityTokenHandler : JwtSecurityTokenHandler
{
    public bool CreateTokenCalled { get; private set; }
    public SecurityTokenDescriptor CreateTokenDescriptor { get; private set; }

    public override SecurityToken CreateToken(SecurityTokenDescriptor tokenDescriptor)
    {
        CreateTokenCalled = true;
        CreateTokenDescriptor = tokenDescriptor;

        return new JwtSecurityToken("my-test-token");
    }
}
