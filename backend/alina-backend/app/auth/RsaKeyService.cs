using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

namespace alina_backend.app.auth;

public class RsaKeyService
{
    private readonly RsaSecurityKey _securityKey;
    private readonly RSA _rsa;

    public RsaKeyService(IConfiguration configuration)
    {
        var privateKeyPath = configuration["RSA_PRIVATE_KEY_PATH"];
        if (string.IsNullOrEmpty(privateKeyPath))
        {
            throw new InvalidOperationException("RSA_PRIVATE_KEY_PATH not configured");
        }

        var privateKey = File.ReadAllText(privateKeyPath);
        _rsa = RSA.Create();
        _rsa.ImportFromPem(privateKey);
        _securityKey = new RsaSecurityKey(_rsa);
    }

    public RsaSecurityKey GetSecurityKey() => _securityKey;

    public RSA GetRsa() => _rsa;
}
