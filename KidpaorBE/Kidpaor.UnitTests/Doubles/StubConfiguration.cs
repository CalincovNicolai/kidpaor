using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;

namespace Kidpaor.UnitTests.Doubles;

public class StubConfiguration : IConfiguration
{
    private readonly string _tokenKey;
    private readonly string _tokenIssuer;

    public StubConfiguration(string tokenKey, string tokenIssuer)
    {
        _tokenKey = tokenKey;
        _tokenIssuer = tokenIssuer;
    }

    public IChangeToken GetReloadToken()
    {
        throw new NotImplementedException();
    }

    public string this[string key]
    {
        get => throw new NotImplementedException();
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

    // Stub implementation of the IConfiguration interface
    public string GetTokenKey() => _tokenKey;
    public string GetTokenIssuer() => _tokenIssuer;
}
