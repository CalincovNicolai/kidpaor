using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;

namespace Kidpaor.UnitTests.Doubles;

public class DummyConfiguration : IConfiguration
{
    public IChangeToken GetReloadToken()
    {
        throw new NotImplementedException();
    }

    public string this[string key] 
    {
        get 
        {
            if (key == "Token:Key") 
            {
                return "my-secret-key";
            }
            else if (key == "Token:Issuer") 
            {
                return "my-issuer";
            }
            else 
            {
                return null;
            }
        }
        set => throw new NotImplementedException();
    }

    public IEnumerable<IConfigurationSection> GetChildren()
    {
        throw new NotImplementedException();
    }

    public IConfigurationSection GetSection(string key)
    {
        throw new NotImplementedException();
    }
}
