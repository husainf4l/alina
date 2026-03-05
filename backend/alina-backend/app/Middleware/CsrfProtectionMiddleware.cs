using Microsoft.AspNetCore.Http;
using System.Security.Cryptography;
using System.Text;

namespace alina_backend.app.Middleware;

/// <summary>
/// CSRF (Cross-Site Request Forgery) protection middleware
/// Generates and validates CSRF tokens for state-changing requests
/// </summary>
public class CsrfProtectionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<CsrfProtectionMiddleware> _logger;
    
    private const string CSRF_TOKEN_KEY = "X-CSRF-Token";
    private const string CSRF_COOKIE_NAME = "XSRF-TOKEN";
    private static readonly string[] SafeMethods = { "GET", "HEAD", "OPTIONS", "TRACE" };
    
    // Paths that don't require CSRF protection
    private static readonly string[] ExemptPaths = 
    {
        "/api/health",
        "/api/auth/login",
        "/api/auth/register",
        "/api/auth/google",
        "/hubs/", // SignalR hubs
        "/openapi/"
    };

    public CsrfProtectionMiddleware(
        RequestDelegate next,
        ILogger<CsrfProtectionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value ?? "";
        
        // Skip exempt paths
        if (ExemptPaths.Any(p => path.StartsWith(p, StringComparison.OrdinalIgnoreCase)))
        {
            await _next(context);
            return;
        }

        // Generate and set CSRF token for safe methods
        if (SafeMethods.Contains(context.Request.Method.ToUpper()))
        {
            // Get or generate CSRF token
            var token = context.Request.Cookies[CSRF_COOKIE_NAME];
            if (string.IsNullOrEmpty(token))
            {
                token = GenerateCsrfToken();
                
                // Set cookie (accessible to JavaScript)
                context.Response.Cookies.Append(CSRF_COOKIE_NAME, token, new CookieOptions
                {
                    HttpOnly = false, // Must be accessible to JavaScript
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    MaxAge = TimeSpan.FromHours(24)
                });
            }

            await _next(context);
            return;
        }

        // Validate CSRF token for state-changing methods (POST, PUT, DELETE, PATCH)
        var cookieToken = context.Request.Cookies[CSRF_COOKIE_NAME];
        var headerToken = context.Request.Headers[CSRF_TOKEN_KEY].FirstOrDefault();

        if (string.IsNullOrEmpty(cookieToken) || string.IsNullOrEmpty(headerToken))
        {
            _logger.LogWarning(
                "CSRF token missing for {Method} {Path} from {IpAddress}",
                context.Request.Method,
                path,
                context.Connection.RemoteIpAddress);

            await ReturnCsrfError(context, "CSRF token missing");
            return;
        }

        if (!ValidateCsrfToken(cookieToken, headerToken))
        {
            _logger.LogWarning(
                "CSRF token mismatch for {Method} {Path} from {IpAddress}",
                context.Request.Method,
                path,
                context.Connection.RemoteIpAddress);

            await ReturnCsrfError(context, "CSRF token validation failed");
            return;
        }

        await _next(context);
    }

    private string GenerateCsrfToken()
    {
        var randomBytes = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
        }
        return Convert.ToBase64String(randomBytes);
    }

    private bool ValidateCsrfToken(string cookieToken, string headerToken)
    {
        // Use constant-time comparison to prevent timing attacks
        if (cookieToken.Length != headerToken.Length)
        {
            return false;
        }

        var cookieBytes = Encoding.UTF8.GetBytes(cookieToken);
        var headerBytes = Encoding.UTF8.GetBytes(headerToken);

        var result = 0;
        for (int i = 0; i < cookieBytes.Length; i++)
        {
            result |= cookieBytes[i] ^ headerBytes[i];
        }

        return result == 0;
    }

    private async Task ReturnCsrfError(HttpContext context, string message)
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        context.Response.Headers.Append("Content-Type", "application/json");

        var response = new
        {
            error = "CSRF Validation Failed",
            message = message,
            details = "Include X-CSRF-Token header with the value from the XSRF-TOKEN cookie"
        };

        await context.Response.WriteAsJsonAsync(response);
    }
}

/// <summary>
/// Extension methods for adding CSRF protection middleware
/// </summary>
public static class CsrfProtectionMiddlewareExtensions
{
    public static IApplicationBuilder UseCsrfProtection(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<CsrfProtectionMiddleware>();
    }
}
