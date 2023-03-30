using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;

namespace Kidpaor.UnitTests.Doubles;

public class FakeConfiguration : IConfiguration
{
    private readonly string _tokenKey;
    private readonly string _tokenIssuer;

    public FakeConfiguration(string tokenKey, string tokenIssuer)
    {
        _tokenKey = tokenKey;
        _tokenIssuer = tokenIssuer;
    }

    public IChangeToken GetReloadToken()
    {
        throw new NotImplementedException();
    }

    public string? this[string key]
    {
        get =>
            key switch
            {
                "Token:Key" => _tokenKey,
                "Token:Issuer" => _tokenIssuer,
                _ => null
            };
        set => throw new NotImplementedException();
    }

    public IConfigurationSection GetSection(string key)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<IConfigurationSection> GetChildren()
    {
        throw new NotImplementedException();
    }
}
