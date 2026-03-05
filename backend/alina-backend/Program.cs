using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using alina_backend;
using alina_backend.app.auth;
using alina_backend.app.profiles;
using alina_backend.app.Middleware;
using alina_backend.app.finance;
using alina_backend.app.notifications;
using alina_backend.app.validation;

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
builder.Services.AddSingleton<RsaKeyService>();
builder.Services.AddScoped<GoogleAuthService>();
builder.Services.AddScoped<TwoFactorAuthService>();
builder.Services.AddScoped<IImageStorageService, LocalImageStorageService>();
builder.Services.AddScoped<alina_backend.app.finance.ICurrencyService, alina_backend.app.finance.CurrencyService>();
builder.Services.AddScoped<alina_backend.app.notifications.NotificationService>();
builder.Services.AddScoped<alina_backend.app.analytics.AnalyticsService>();
builder.Services.AddScoped<alina_backend.app.marketplace.SellerLevelService>();

// Add background services
builder.Services.AddHostedService<alina_backend.app.marketplace.AutoReleaseService>();

// Add SignalR
builder.Services.AddSignalR();

// Add memory cache for rate limiting
builder.Services.AddMemoryCache();

// Register services
builder.Services.AddScoped<TwoFactorAuthService>();
builder.Services.AddScoped<WebhookVerificationService>();
builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<EmailValidationService>();

// Configure JWT Authentication
var privateKeyPath = builder.Configuration["RSA_PRIVATE_KEY_PATH"];
if (!string.IsNullOrEmpty(privateKeyPath))
{
    var privateKey = File.ReadAllText(privateKeyPath);
    var rsa = RSA.Create();
    rsa.ImportFromPem(privateKey);

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
                IssuerSigningKey = new RsaSecurityKey(rsa),
                ClockSkew = TimeSpan.Zero // Remove default 5 minute clock skew
            };
        });
}

// Add AWS S3 Services
var awsOptions = builder.Configuration.GetAWSOptions();
builder.Services.AddDefaultAWSOptions(awsOptions);
builder.Services.AddAWSService<Amazon.S3.IAmazonS3>();
builder.Services.AddScoped<alina_backend.app.media.IStorageService, alina_backend.app.media.S3StorageService>();

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

// Use custom middleware
app.UseRateLimiting();  // Rate limiting before authentication
app.UseCsrfProtection(); // CSRF protection after CORS

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<alina_backend.app.messaging.ChatHub>("/hubs/chat");
app.MapHub<alina_backend.app.notifications.NotificationHub>("/hubs/notifications");

// Database is already initialized, skip automatic migrations
// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
//     db.Database.Migrate();
// }

app.Run();
