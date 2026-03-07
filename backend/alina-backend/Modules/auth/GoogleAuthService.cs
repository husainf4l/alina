using Google.Apis.Auth;
using Microsoft.Extensions.Logging;

namespace alina_backend.Modules.auth;

public class GoogleAuthService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<GoogleAuthService> _logger;

    public GoogleAuthService(IConfiguration configuration, ILogger<GoogleAuthService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    /// <summary>
    /// Validates Google ID token from mobile apps (iOS/Android) or web
    /// Accepts tokens from Web, iOS, and Android Client IDs for security
    /// </summary>
    public async Task<GoogleJsonWebSignature.Payload?> VerifyGoogleToken(string idToken)
    {
        try
        {
            // Accept tokens from Web, iOS, and Android Client IDs
            var validAudiences = new List<string>();
            
            var webClientId = _configuration["Google:WebClientId"];
            var iosClientId = _configuration["Google:IosClientId"];
            var androidClientId = _configuration["Google:AndroidClientId"];

            if (!string.IsNullOrEmpty(webClientId)) validAudiences.Add(webClientId);
            if (!string.IsNullOrEmpty(iosClientId)) validAudiences.Add(iosClientId);
            if (!string.IsNullOrEmpty(androidClientId)) validAudiences.Add(androidClientId);

            if (validAudiences.Count == 0)
            {
                _logger.LogError("No Google Client IDs configured");
                return null;
            }

            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = validAudiences
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
            _logger.LogInformation("Google token validated successfully for {Email} (Audience: {Audience})", 
                payload.Email, payload.Audience);
            return payload;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to validate Google token");
            return null;
        }
    }

    /// <summary>
    /// Exchanges Google authorization code for tokens (for web OAuth flow)
    /// </summary>
    public async Task<GoogleJsonWebSignature.Payload?> VerifyGoogleAuthorizationCode(string authorizationCode)
    {
        // For web OAuth2 flow, you would exchange the authorization code for tokens
        // This is typically handled by ASP.NET Core's Google authentication middleware
        // For now, we'll focus on the ID token verification approach
        throw new NotImplementedException("Use ASP.NET Core Google authentication middleware for web OAuth2 flow");
    }
}
