using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Security.Cryptography;
using alina_backend;
using alina_backend.Modules.auth;
using alina_backend.Modules.profiles;
using alina_backend.Modules.Middleware;
using alina_backend.Modules.finance;
using alina_backend.Modules.notifications;
using alina_backend.Modules.validation;

// Load .env file into environment variables before building the host.
// .NET configuration picks these up automatically via Environment variable provider.
var envFile = Path.Combine(Directory.GetCurrentDirectory(), ".env");
if (File.Exists(envFile))
{
    foreach (var line in File.ReadAllLines(envFile))
    {
        var trimmed = line.Trim();
        if (string.IsNullOrEmpty(trimmed) || trimmed.StartsWith('#')) continue;
        var idx = trimmed.IndexOf('=');
        if (idx < 0) continue;
        var key = trimmed[..idx].Trim();
        var value = trimmed[(idx + 1)..].Trim();
        Environment.SetEnvironmentVariable(key, value);
    }
}

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(
                "http://149.200.251.12", 
                "https://149.200.251.12", 
                "http://149.200.251.14", 
                "https://149.200.251.14", 
                "https://alina-backend.aqloon.cloud",
                "http://localhost:5602",
                "http://192.168.1.66:5602",
                "http://localhost:3000",
                "http://localhost:3001",  // Added for dev server on alternate port
                "http://192.168.1.66:3000"
            )
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();  // Required for HTTP-only cookies
    });
});

// Configure DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register services
builder.Services.AddScoped<GoogleAuthService>();
builder.Services.AddScoped<TwoFactorAuthService>();
builder.Services.AddScoped<WebhookVerificationService>();
builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<EmailValidationService>();
// Always use S3 — CdnBaseUrl is configured in appsettings.json for all environments.
// LocalImageStorageService exists only for fully offline development without AWS credentials.
builder.Services.AddScoped<IImageStorageService, S3ImageStorageService>();
builder.Services.AddScoped<alina_backend.Modules.finance.ICurrencyService, alina_backend.Modules.finance.CurrencyService>();
builder.Services.AddScoped<alina_backend.Modules.notifications.NotificationService>();
builder.Services.AddScoped<alina_backend.Modules.analytics.AnalyticsService>();
builder.Services.AddScoped<alina_backend.Modules.marketplace.SellerLevelService>();

// Add background services
builder.Services.AddHostedService<alina_backend.Modules.marketplace.AutoReleaseService>();
builder.Services.AddHostedService<alina_backend.Modules.finance.CurrencyRateRefreshService>();
builder.Services.AddHttpClient("currency", c =>
{
    c.Timeout = TimeSpan.FromSeconds(10);
    c.DefaultRequestHeaders.Add("User-Agent", "alina-backend/1.0");
});

// Add SignalR
builder.Services.AddSignalR();

// Add memory cache for rate limiting and currency caching
builder.Services.AddMemoryCache();
builder.Services.AddResponseCaching();

// SEC-10: Configure ForwardedHeaders to only trust X-Forwarded-For from known/trusted proxies.
// After UseForwardedHeaders(), context.Connection.RemoteIpAddress will be the real client IP.
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
    // Trust requests from the configured trusted proxy ranges (e.g. internal load balancer).
    // Add real proxy IPs here; leave empty to only trust RemoteIpAddress (no proxy).
    var trustedProxies = builder.Configuration.GetSection("RateLimit:TrustedProxies").Get<string[]>() ?? [];
    foreach (var proxy in trustedProxies)
    {
        if (IPAddress.TryParse(proxy, out var ip))
            options.KnownProxies.Add(ip);
    }
});

// Configure JWT Authentication — use RsaKeyService as single RSA source of truth
var privateKeyPath = builder.Configuration["RSA_PRIVATE_KEY_PATH"];
if (!string.IsNullOrEmpty(privateKeyPath))
{
    var rsaKeyService = new RsaKeyService(builder.Configuration);
    builder.Services.AddSingleton(rsaKeyService);

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = rsaKeyService.GetSecurityKey(),
                ClockSkew = TimeSpan.Zero // Remove default 5 minute clock skew
            };
            
            // Allow reading JWT from query string for SignalR
            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    var accessToken = context.Request.Query["access_token"];
                    if (!string.IsNullOrEmpty(accessToken))
                    {
                        context.Token = accessToken;
                    }
                    
                    return Task.CompletedTask;
                }
            };
        });
}

// Add AWS S3 Services
// Build AWSOptions manually — GetAWSOptions() does not read AccessKeyId/SecretAccessKey from config.
// Credentials come from .env → Environment.SetEnvironmentVariable → AWS:* config keys.
var awsAccessKey = builder.Configuration["AWS:AccessKeyId"];
var awsSecretKey = builder.Configuration["AWS:SecretAccessKey"];
var awsRegion = builder.Configuration["AWS:Region"] ?? "me-central-1";

Amazon.Runtime.AWSCredentials awsCredentials;
if (!string.IsNullOrEmpty(awsAccessKey) && !string.IsNullOrEmpty(awsSecretKey))
{
    awsCredentials = new Amazon.Runtime.BasicAWSCredentials(awsAccessKey, awsSecretKey);
}
else if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID"))
      && !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY")))
{
    awsCredentials = new Amazon.Runtime.EnvironmentVariablesAWSCredentials();
}
else
{
    // No credentials configured — S3 ops will fail at runtime but app can still start
    awsCredentials = new Amazon.Runtime.AnonymousAWSCredentials();
}

var s3Config = new Amazon.S3.AmazonS3Config
{
    RegionEndpoint = Amazon.RegionEndpoint.GetBySystemName(awsRegion)
};

builder.Services.AddSingleton<Amazon.S3.IAmazonS3>(_ => new Amazon.S3.AmazonS3Client(awsCredentials, s3Config));
builder.Services.AddScoped<alina_backend.Modules.media.IStorageService, alina_backend.Modules.media.S3StorageService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "v1");
    });
}

// Serve static files (for uploaded images)
app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigins");

// SEC-10: Process forwarded headers from trusted proxies only — must run before rate limiting
app.UseForwardedHeaders();

// Use custom middleware
app.UseRateLimiting();  // Rate limiting before authentication
app.UseCsrfProtection(); // CSRF protection after CORS

app.UseResponseCaching();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<alina_backend.Modules.messaging.ChatHub>("/api/hubs/chat");
app.MapHub<alina_backend.Modules.notifications.NotificationHub>("/api/hubs/notifications");

// Database is already initialized, skip automatic migrations
// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
//     db.Database.Migrate();
// }

app.Run();
