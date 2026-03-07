using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using alina_backend.Modules.users;
using alina_backend.Modules.profiles;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace alina_backend.Modules.auth;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly RsaKeyService _rsaKeyService;
    private readonly ILogger<AuthController> _logger;
    private readonly GoogleAuthService _googleAuthService;

    public AuthController(
        AppDbContext context, 
        IConfiguration configuration, 
        RsaKeyService rsaKeyService,
        ILogger<AuthController> logger,
        GoogleAuthService googleAuthService)
    {
        _context = context;
        _configuration = configuration;
        _rsaKeyService = rsaKeyService;
        _logger = logger;
        _googleAuthService = googleAuthService;
    }

    /// <summary>
    /// Mobile Register - Returns access token and refresh token in response body
    /// </summary>
    [HttpPost("mobile/register")]
    public async Task<IActionResult> MobileRegister([FromBody] RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
        {
            return BadRequest(new { error = "invalid_request", error_description = "An account with this email already exists" });
        }

        if (!IsValidPassword(request.Password))
        {
            return BadRequest(new { error = "invalid_request", error_description = "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character" });
        }

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        _logger.LogInformation("User registered successfully (mobile): {Email}", user.Email);

        // Get or create profile to include role in token
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == user.Id);
        var userRole = profile?.UserRole ?? "buyer";

        // Auto-login after registration
        var accessToken = GenerateAccessToken(user, profile);
        var refreshToken = await GenerateAndStoreRefreshToken(user.Id);

        return Ok(new
        {
            access_token = accessToken,
            token_type = "Bearer",
            expires_in = 3600, // 1 hour
            refresh_token = refreshToken,
            scope = "read write",
            user_id = user.Id,
            user_full_name = user.FullName,
            user_email = user.Email,
            user_role = userRole,
            message = "User registered and logged in successfully"
        });
    }

    /// <summary>
    /// Web Register - Sets HTTP-only cookies for tokens
    /// </summary>
    [HttpPost("web/register")]
    public async Task<IActionResult> WebRegister([FromBody] RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
        {
            return BadRequest(new { error = "invalid_request", error_description = "An account with this email already exists" });
        }

        if (!IsValidPassword(request.Password))
        {
            return BadRequest(new { error = "invalid_request", error_description = "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character" });
        }

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        _logger.LogInformation("User registered successfully (web): {Email}", user.Email);

        // Get or create profile to include role in token
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == user.Id);
        var userRole = profile?.UserRole ?? "buyer";

        // Auto-login after registration
        var accessToken = GenerateAccessToken(user, profile);
        var refreshToken = await GenerateAndStoreRefreshToken(user.Id);

        // Set HTTP-only cookies
        SetAuthCookies(accessToken, refreshToken);

        return Ok(new
        {
            user_id = user.Id,
            user_full_name = user.FullName,
            user_email = user.Email,
            user_role = userRole,
            message = "User registered and logged in successfully"
        });
    }

    /// <summary>
    /// Mobile Login - Returns access token and refresh token in response body
    /// </summary>
    [HttpPost("mobile/login")]
    public async Task<IActionResult> MobileLogin([FromBody] LoginRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null)
        {
            // Perform dummy BCrypt verification to prevent timing attacks
            BCrypt.Net.BCrypt.Verify("dummy", "$2a$11$dummy.hash.to.prevent.timing.attack.detection");
            _logger.LogWarning("Login failed: Invalid email {Email}", request.Email);
            return Unauthorized(new { error = "invalid_credentials", error_description = "Invalid email or password" });
        }
        
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            _logger.LogWarning("Login failed: Invalid password for user {Email}", user.Email);
            return Unauthorized(new { error = "invalid_credentials", error_description = "Invalid email or password" });
        }

        _logger.LogInformation("User logged in successfully (mobile): {Email}", user.Email);

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == user.Id);
        var accessToken = GenerateAccessToken(user, profile);
        var refreshToken = await GenerateAndStoreRefreshToken(user.Id);

        return Ok(new
        {
            access_token = accessToken,
            token_type = "Bearer",
            expires_in = 3600, // 1 hour
            refresh_token = refreshToken,
            scope = "read write",
            user_id = user.Id,
            user_full_name = user.FullName,
            user_email = user.Email,
            user_role = profile?.UserRole ?? "buyer"
        });
    }

    /// <summary>
    /// Web Login - Sets HTTP-only cookies for tokens
    /// </summary>
    [HttpPost("web/login")]
    public async Task<IActionResult> WebLogin([FromBody] LoginRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null)
        {
            BCrypt.Net.BCrypt.Verify("dummy", "$2a$11$dummy.hash.to.prevent.timing.attack.detection");
            _logger.LogWarning("Login failed (web): Invalid email {Email}", request.Email);
            return Unauthorized(new { error = "invalid_credentials", error_description = "Invalid email or password" });
        }
        
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            _logger.LogWarning("Login failed (web): Invalid password for user {Email}", user.Email);
            return Unauthorized(new { error = "invalid_credentials", error_description = "Invalid email or password" });
        }

        _logger.LogInformation("User logged in successfully (web): {Email}", user.Email);

        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == user.Id);
        var accessToken = GenerateAccessToken(user, profile);
        var refreshToken = await GenerateAndStoreRefreshToken(user.Id);

        // Set HTTP-only cookies
        SetAuthCookies(accessToken, refreshToken);

        return Ok(new
        {
            user_id = user.Id,
            user_full_name = user.FullName,
            user_email = user.Email,
            user_role = profile?.UserRole ?? "buyer",
            message = "Logged in successfully"
        });
    }

    /// <summary>
    /// Generates JWT access token.
    /// Token includes user claims and role, signed with RSA private key.
    /// </summary>
    private string GenerateAccessToken(User user, Profile? profile = null)
    {
        var key = _rsaKeyService.GetSecurityKey();
        var creds = new SigningCredentials(key, SecurityAlgorithms.RsaSha256);

        var claimsList = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("name", user.FullName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        if (profile != null)
        {
            claimsList.Add(new Claim(ClaimTypes.Role, profile.IsAdmin ? "Admin" : profile.UserRole));
        }

        var claims = claimsList.ToArray();

        var now = DateTime.UtcNow;
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            notBefore: now,
            expires: now.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private async Task<string> GenerateAndStoreRefreshToken(Guid userId)
    {
        var refreshToken = new RefreshToken
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            UserId = userId,
            ExpiresAt = DateTime.UtcNow.AddDays(7), // 7 days
            CreatedAt = DateTime.UtcNow
        };

        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();

        return refreshToken.Token;
    }

    private void SetAuthCookies(string accessToken, string refreshToken)
    {
        var accessCookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true, // HTTPS only
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddHours(1)
        };

        var refreshCookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true, // HTTPS only
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(7)
        };

        Response.Cookies.Append("access_token", accessToken, accessCookieOptions);
        Response.Cookies.Append("refresh_token", refreshToken, refreshCookieOptions);
    }

    /// <summary>
    /// Mobile Refresh Token - Get new access token using refresh token
    /// </summary>
    [HttpPost("mobile/refresh")]
    public async Task<IActionResult> MobileRefresh([FromBody] RefreshTokenRequest request)
    {
        var storedToken = await _context.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == request.refresh_token);

        if (storedToken == null || !storedToken.IsActive)
        {
            _logger.LogWarning("Refresh token failed: Invalid or expired token");
            return Unauthorized(new { error = "invalid_grant", error_description = "Invalid or expired refresh token" });
        }

        // Generate new access token (with role)
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == storedToken.UserId);
        var accessToken = GenerateAccessToken(storedToken.User, profile);
        
        // Rotate refresh token (more secure)
        storedToken.RevokedAt = DateTime.UtcNow;
        var newRefreshToken = await GenerateAndStoreRefreshToken(storedToken.UserId);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Tokens refreshed successfully for user {Email}", storedToken.User.Email);

        return Ok(new
        {
            access_token = accessToken,
            token_type = "Bearer",
            expires_in = 3600,
            refresh_token = newRefreshToken
        });
    }

    /// <summary>
    /// Web Refresh Token - Get new tokens using HTTP-only cookie
    /// </summary>
    [HttpPost("web/refresh")]
    public async Task<IActionResult> WebRefresh()
    {
        if (!Request.Cookies.TryGetValue("refresh_token", out var refreshToken))
        {
            return Unauthorized(new { error = "invalid_grant", error_description = "Refresh token not found" });
        }

        var storedToken = await _context.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

        if (storedToken == null || !storedToken.IsActive)
        {
            _logger.LogWarning("Web refresh token failed: Invalid or expired token");
            return Unauthorized(new { error = "invalid_grant", error_description = "Invalid or expired refresh token" });
        }

        // Generate new tokens (with role)
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == storedToken.UserId);
        var accessToken = GenerateAccessToken(storedToken.User, profile);
        storedToken.RevokedAt = DateTime.UtcNow;
        var newRefreshToken = await GenerateAndStoreRefreshToken(storedToken.UserId);
        await _context.SaveChangesAsync();

        // Update cookies
        SetAuthCookies(accessToken, newRefreshToken);

        _logger.LogInformation("Web tokens refreshed successfully for user {Email}", storedToken.User.Email);

        return Ok(new { message = "Tokens refreshed successfully" });
    }

    /// <summary>
    /// Logout - Revoke refresh token and clear cookies
    /// </summary>
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] LogoutRequest? request)
    {
        // For mobile - revoke refresh token from body
        if (request?.refresh_token != null)
        {
            var token = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == request.refresh_token);
            
            if (token != null && token.IsActive)
            {
                token.RevokedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }

        // For web - revoke token from cookie and clear cookies
        if (Request.Cookies.TryGetValue("refresh_token", out var cookieToken))
        {
            var token = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == cookieToken);
            
            if (token != null && token.IsActive)
            {
                token.RevokedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }

            Response.Cookies.Delete("access_token");
            Response.Cookies.Delete("refresh_token");
        }

        _logger.LogInformation("User logged out successfully");

        return Ok(new { message = "Logged out successfully" });
    }

    /// <summary>
    /// Mobile Google Sign-In - Verify Google ID token from mobile app
    /// Mobile apps (Android/iOS) use Google Sign-In SDK to get ID token
    /// </summary>
    [HttpPost("mobile/google")]
    public async Task<IActionResult> MobileGoogleSignIn([FromBody] GoogleSignInRequest request)
    {
        var googlePayload = await _googleAuthService.VerifyGoogleToken(request.id_token);
        
        if (googlePayload == null)
        {
            _logger.LogWarning("Invalid Google ID token");
            return Unauthorized(new { error = "invalid_token", error_description = "Invalid Google ID token" });
        }

        // Find or create user
        var user = await _context.Users.FirstOrDefaultAsync(u => u.GoogleId == googlePayload.Subject);
        
        if (user == null)
        {
            // Check if email already exists with different provider
            user = await _context.Users.FirstOrDefaultAsync(u => u.Email == googlePayload.Email);
            
            if (user != null && user.Provider != "google")
            {
                return BadRequest(new { error = "email_exists", error_description = "Email already registered with different provider" });
            }

            // Create new user
            user = new User
            {
                FullName = googlePayload.Name,
                Email = googlePayload.Email,
                GoogleId = googlePayload.Subject,
                Provider = "google",
                PasswordHash = string.Empty // No password for Google users
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            _logger.LogInformation("New user created via Google Sign-In: {Email}", user.Email);
        }

        // Generate tokens (with role)
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == user.Id);
        var accessToken = GenerateAccessToken(user, profile);
        var refreshToken = await GenerateAndStoreRefreshToken(user.Id);

        _logger.LogInformation("User authenticated via Google (mobile): {Email}", user.Email);

        var userRole = profile?.UserRole ?? "buyer";

        return Ok(new
        {
            access_token = accessToken,
            token_type = "Bearer",
            expires_in = 3600,
            refresh_token = refreshToken,
            scope = "read write",
            user_id = user.Id,
            user_full_name = user.FullName,
            user_email = user.Email,
            user_role = userRole
        });
    }

    /// <summary>
    /// Web Google Sign-In - Verify Google ID token and set HTTP-only cookies
    /// Web apps can use Google Sign-In JavaScript library to get ID token
    /// </summary>
    [HttpPost("web/google")]
    public async Task<IActionResult> WebGoogleSignIn([FromBody] GoogleSignInRequest request)
    {
        var googlePayload = await _googleAuthService.VerifyGoogleToken(request.id_token);
        
        if (googlePayload == null)
        {
            _logger.LogWarning("Invalid Google ID token (web)");
            return Unauthorized(new { error = "invalid_token", error_description = "Invalid Google ID token" });
        }

        // Find or create user
        var user = await _context.Users.FirstOrDefaultAsync(u => u.GoogleId == googlePayload.Subject);
        
        if (user == null)
        {
            // Check if email already exists with different provider
            user = await _context.Users.FirstOrDefaultAsync(u => u.Email == googlePayload.Email);
            
            if (user != null && user.Provider != "google")
            {
                return BadRequest(new { error = "email_exists", error_description = "Email already registered with different provider" });
            }

            // Create new user
            user = new User
            {
                FullName = googlePayload.Name,
                Email = googlePayload.Email,
                GoogleId = googlePayload.Subject,
                Provider = "google",
                PasswordHash = string.Empty
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            _logger.LogInformation("New user created via Google Sign-In (web): {Email}", user.Email);
        }

        // Generate tokens and set cookies (with role)
        var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == user.Id);
        var accessToken = GenerateAccessToken(user, profile);
        var refreshToken = await GenerateAndStoreRefreshToken(user.Id);
        SetAuthCookies(accessToken, refreshToken);

        _logger.LogInformation("User authenticated via Google (web): {Email}", user.Email);

        var userRole = profile?.UserRole ?? "buyer";

        return Ok(new
        {
            user_id = user.Id,
            user_full_name = user.FullName,
            user_email = user.Email,
            user_role = userRole,
            message = "Signed in with Google successfully"
        });
    }

    private bool IsValidPassword(string password)
    {
        if (string.IsNullOrEmpty(password) || password.Length < 8)
            return false;

        bool hasUpper = password.Any(char.IsUpper);
        bool hasLower = password.Any(char.IsLower);
        bool hasDigit = password.Any(char.IsDigit);
        bool hasSpecial = password.Any(ch => !char.IsLetterOrDigit(ch));

        return hasUpper && hasLower && hasDigit && hasSpecial;
    }

    /// <summary>
    /// Change user password
    /// </summary>
    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
        {
            return Unauthorized();
        }

        // Verify current password
        if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
        {
            return BadRequest(new { error = "invalid_password", error_description = "Current password is incorrect" });
        }

        // Validate new password
        if (!IsValidPassword(request.NewPassword))
        {
            return BadRequest(new { error = "weak_password", error_description = "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character" });
        }

        // Hash new password
        var newPasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);

        // Update password
        user.PasswordHash = newPasswordHash;
        await _context.SaveChangesAsync();

        _logger.LogInformation("Password changed for user: {UserId}", userId);

        return Ok(new { message = "Password changed successfully" });
    }
}

public class RegisterRequest
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class RefreshTokenRequest
{
    public string refresh_token { get; set; } = string.Empty;
}

public class LogoutRequest
{
    public string? refresh_token { get; set; }
}

public class GoogleSignInRequest
{
    public string id_token { get; set; } = string.Empty;
}

public class ChangePasswordRequest
{
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}