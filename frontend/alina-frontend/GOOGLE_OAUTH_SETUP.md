# Google OAuth Setup Guide

This guide explains how to set up Google OAuth authentication for the ALINA marketplace platform.

## Prerequisites

- Google Cloud Platform account
- Access to ALINA frontend codebase
- Access to ALINA backend codebase (.NET)

## Frontend Setup (Already Completed ✅)

The frontend infrastructure is ready. The following files have been created:

- `/src/lib/oauth/google.ts` - Google OAuth utilities and configuration
- `/src/app/auth/callback/google/page.tsx` - OAuth callback handler
- `/src/hooks/useSessionTimeout.ts` - Session management
- Updated login and register pages with Google Sign-In buttons

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "ALINA Marketplace"
4. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click "Enable"

## Step 3: Create OAuth 2.0 Credentials

### 3.1 Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" user type
3. Click "Create"
4. Fill in the required information:
   - **App name**: ALINA Marketplace
   - **User support email**: your-email@example.com
   - **App logo**: (Optional) Upload your logo
   - **Application home page**: https://yoursite.com
   - **Authorized domains**: yoursite.com
   - **Developer contact email**: your-email@example.com
5. Click "Save and Continue"
6. **Scopes**: Add the following scopes
   - `userinfo.email`
   - `userinfo.profile`
7. Click "Save and Continue"
8. **Test users**: (Optional for development)
   - Add test user emails
9. Click "Save and Continue"

### 3.2 Create OAuth Client ID

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"
4. Configure:
   - **Name**: ALINA Frontend
   - **Authorized JavaScript origins**:
     - `http://localhost:3001` (development)
     - `https://yoursite.com` (production)
   - **Authorized redirect URIs**:
     - `http://localhost:3001/auth/callback/google` (development)
     - `https://yoursite.com/auth/callback/google` (production)
5. Click "Create"
6. **IMPORTANT**: Copy the Client ID and Client Secret - you'll need them for the next step

## Step 4: Configure Environment Variables

### 4.1 Frontend (.env.local)

Create a `.env.local` file in the frontend root directory:

```env
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_ENABLE_GOOGLE_OAUTH=true

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5602
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

Replace `your-client-id` and `your-client-secret` with the values from Step 3.2.

### 4.2 Backend (appsettings.json or User Secrets)

Add the following to your backend configuration:

```json
{
  "Authentication": {
    "Google": {
      "ClientId": "your-client-id.apps.googleusercontent.com",
      "ClientSecret": "your-client-secret"
    }
  }
}
```

**For development using User Secrets** (recommended):

```bash
cd /path/to/backend
dotnet user-secrets set "Authentication:Google:ClientId" "your-client-id.apps.googleusercontent.com"
dotnet user-secrets set "Authentication:Google:ClientSecret" "your-client-secret"
```

## Step 5: Backend Implementation (Required)

The backend needs to implement the following endpoints:

### 5.1 Google OAuth Callback Endpoint

Create a new controller or add to existing auth controller:

```csharp
[ApiController]
[Route("api/auth/google")]
public class GoogleAuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;
    private readonly IJwtService _jwtService;
    
    [HttpPost("callback")]
    public async Task<IActionResult> GoogleCallback([FromBody] GoogleCallbackRequest request)
    {
        // 1. Exchange authorization code for access token
        var tokenResponse = await ExchangeCodeForToken(
            request.Code, 
            request.RedirectUri
        );
        
        // 2. Get user info from Google
        var userInfo = await GetGoogleUserInfo(tokenResponse.AccessToken);
        
        // 3. Find or create user in database
        var user = await _userService.FindOrCreateGoogleUser(
            userInfo.Email,
            userInfo.Name,
            userInfo.Picture,
            userInfo.Sub // Google user ID
        );
        
        // 4. Generate JWT tokens
        var accessToken = _jwtService.GenerateAccessToken(user);
        var refreshToken = _jwtService.GenerateRefreshToken(user);
        
        // 5. Set HTTP-only cookies
        Response.Cookies.Append("access_token", accessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddMinutes(15)
        });
        
        Response.Cookies.Append("refresh_token", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        });
        
        return Ok(new { success = true });
    }
    
    private async Task<GoogleTokenResponse> ExchangeCodeForToken(string code, string redirectUri)
    {
        var clientId = _configuration["Authentication:Google:ClientId"];
        var clientSecret = _configuration["Authentication:Google:ClientSecret"];
        
        using var httpClient = new HttpClient();
        var tokenRequest = new Dictionary<string, string>
        {
            { "code", code },
            { "client_id", clientId },
            { "client_secret", clientSecret },
            { "redirect_uri", redirectUri },
            { "grant_type", "authorization_code" }
        };
        
        var response = await httpClient.PostAsync(
            "https://oauth2.googleapis.com/token",
            new FormUrlEncodedContent(tokenRequest)
        );
        
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<GoogleTokenResponse>();
    }
    
    private async Task<GoogleUserInfo> GetGoogleUserInfo(string accessToken)
    {
        using var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
        
        var response = await httpClient.GetAsync(
            "https://www.googleapis.com/oauth2/v2/userinfo"
        );
        
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<GoogleUserInfo>();
    }
}

public class GoogleCallbackRequest
{
    public string Code { get; set; }
    public string RedirectUri { get; set; }
}

public class GoogleTokenResponse
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; }
    
    [JsonPropertyName("refresh_token")]
    public string RefreshToken { get; set; }
    
    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }
    
    [JsonPropertyName("token_type")]
    public string TokenType { get; set; }
}

public class GoogleUserInfo
{
    public string Sub { get; set; } // Google user ID
    public string Email { get; set; }
    
    [JsonPropertyName("email_verified")]
    public bool EmailVerified { get; set; }
    
    public string Name { get; set; }
    public string Picture { get; set; }
    
    [JsonPropertyName("given_name")]
    public string GivenName { get; set; }
    
    [JsonPropertyName("family_name")]
    public string FamilyName { get; set; }
}
```

### 5.2 User Service Updates

Add method to handle Google users:

```csharp
public interface IUserService
{
    Task<User> FindOrCreateGoogleUser(
        string email, 
        string name, 
        string picture, 
        string googleId
    );
}

public class UserService : IUserService
{
    public async Task<User> FindOrCreateGoogleUser(
        string email, 
        string name, 
        string picture, 
        string googleId)
    {
        // Check if user exists with this Google ID
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.GoogleId == googleId);
        
        if (user != null)
        {
            // Update last login
            user.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return user;
        }
        
        // Check if user exists with this email
        user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);
        
        if (user != null)
        {
            // Link Google account to existing user
            user.GoogleId = googleId;
            user.ProfilePicture = picture;
            user.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return user;
        }
        
        // Create new user
        user = new User
        {
            Email = email,
            Username = GenerateUsernameFromEmail(email),
            FullName = name,
            ProfilePicture = picture,
            GoogleId = googleId,
            EmailVerified = true, // Google already verified the email
            Role = "user",
            CreatedAt = DateTime.UtcNow,
            LastLoginAt = DateTime.UtcNow
        };
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        
        return user;
    }
    
    private string GenerateUsernameFromEmail(string email)
    {
        var username = email.Split('@')[0];
        var suffix = 1;
        
        while (await _context.Users.AnyAsync(u => u.Username == username))
        {
            username = $"{email.Split('@')[0]}{suffix}";
            suffix++;
        }
        
        return username;
    }
}
```

### 5.3 Database Schema Update

Add Google ID column to Users table:

```sql
ALTER TABLE Users ADD COLUMN GoogleId VARCHAR(255) NULL;
CREATE INDEX IX_Users_GoogleId ON Users(GoogleId);
```

Or using Entity Framework migration:

```csharp
public class User
{
    // ... existing properties
    
    public string? GoogleId { get; set; }
}

// Migration
protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.AddColumn<string>(
        name: "GoogleId",
        table: "Users",
        type: "varchar(255)",
        nullable: true);
    
    migrationBuilder.CreateIndex(
        name: "IX_Users_GoogleId",
        table: "Users",
        column: "GoogleId");
}
```

## Step 6: Testing

### 6.1 Development Testing

1. Start the backend server:
   ```bash
   cd /path/to/backend
   dotnet run
   ```

2. Start the frontend server:
   ```bash
   cd /path/to/frontend
   npm run dev
   ```

3. Navigate to `http://localhost:3001/login`
4. Click "Continue with Google"
5. Select your Google account
6. Grant permissions
7. Verify you're redirected to `/dashboard` and logged in

### 6.2 Test Cases

- [ ] First-time Google user creates account
- [ ] Existing user (with Google ID) logs in
- [ ] Existing user (without Google ID) links account
- [ ] Email already exists with different Google ID (should link)
- [ ] Cancelled OAuth flow (should redirect to login with error)
- [ ] Invalid state parameter (CSRF protection)

## Step 7: Production Deployment

### 7.1 Update OAuth Credentials

1. Go to Google Cloud Console → Credentials
2. Edit your OAuth Client ID
3. Add production URLs to "Authorized JavaScript origins" and "Authorized redirect URIs"
4. Update environment variables in production

### 7.2 Security Checklist

- [ ] HTTPS enabled on production domain
- [ ] HTTP-only cookies configured
- [ ] SameSite=Strict on cookies
- [ ] CSRF protection (state parameter) enabled
- [ ] Rate limiting on auth endpoints
- [ ] Error logging configured
- [ ] User activity monitoring

## Troubleshooting

### "redirect_uri_mismatch" Error

**Cause**: The redirect URI in the request doesn't match the authorized redirect URIs in Google Console.

**Solution**: 
1. Check the exact URL in the error message
2. Go to Google Cloud Console → Credentials
3. Add the exact URL to "Authorized redirect URIs"
4. Wait a few minutes for changes to propagate

### "unauthorized_client" Error

**Cause**: Client ID or Client Secret is incorrect.

**Solution**: 
1. Verify Client ID and Client Secret in `.env.local`
2. Ensure no extra spaces or quotes
3. Regenerate credentials if necessary

### Users Not Being Created

**Cause**: Backend endpoint not implemented or database connection issue.

**Solution**:
1. Check backend logs for errors
2. Verify database connection
3. Ensure `GoogleId` column exists in Users table
4. Test endpoint directly with Postman

### OAuth Flow Stuck on Callback Page

**Cause**: Frontend can't communicate with backend or cookies not being set.

**Solution**:
1. Check browser console for errors
2. Verify CORS settings allow credentials
3. Check backend logs for cookie setting
4. Ensure `withCredentials: true` in axios config

## Security Considerations

1. **Never expose Client Secret** in frontend code
2. **Always use HTTPS** in production
3. **Validate state parameter** to prevent CSRF attacks
4. **Set short expiry** on access tokens (15 minutes)
5. **Use HTTP-only cookies** for token storage
6. **Implement rate limiting** on auth endpoints
7. **Log authentication attempts** for security monitoring
8. **Verify email is verified** from Google (EmailVerified field)

## Additional Features

### Optional: One-Tap Sign-In

The Google OAuth library supports "One-Tap" sign-in that shows a popup. This is already implemented in the frontend utilities.

To enable:

```typescript
import { initializeGoogleOneTap } from '@/lib/oauth/google';

initializeGoogleOneTap({
  onSuccess: async (credential) => {
    // Send credential to backend
    await api.post('/auth/google/one-tap', { credential });
  },
  onError: (error) => {
    console.error('One-Tap error:', error);
  },
});
```

### Optional: Google Sign-In Button Widget

Use Google's official UI button:

```typescript
import { renderGoogleSignInButton } from '@/lib/oauth/google';

useEffect(() => {
  renderGoogleSignInButton('google-button-container', {
    onSuccess: (credential) => {
      // Handle sign-in
    },
    theme: 'outline',
    size: 'large',
  });
}, []);
```

## Support

For issues:
- Frontend: Check `/src/lib/oauth/google.ts` implementation
- Backend: Review this guide's Step 5
- Google OAuth: [Official Documentation](https://developers.google.com/identity/protocols/oauth2)
