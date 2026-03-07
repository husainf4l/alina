using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Concurrent;
using System.Net;

namespace alina_backend.Modules.Middleware;

/// <summary>
/// Rate limiting middleware to prevent API abuse
/// Implements sliding window rate limiting per IP address
/// </summary>
public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IMemoryCache _cache;
    private readonly ILogger<RateLimitingMiddleware> _logger;
    
    // Configuration
    private readonly int _requestsPerWindow;
    private readonly TimeSpan _windowDuration;
    private readonly TimeSpan _blockDuration;
    
    // Track blocked IPs — value is the DateTime when the block expires
    private static readonly ConcurrentDictionary<string, DateTime> _blockedIps = new();

    // Cleanup: remove expired block entries every 5 minutes to prevent unbounded growth
    private static DateTime _lastCleanup = DateTime.UtcNow;
    private static readonly TimeSpan _cleanupInterval = TimeSpan.FromMinutes(5);

    public RateLimitingMiddleware(
        RequestDelegate next,
        IMemoryCache cache,
        ILogger<RateLimitingMiddleware> logger,
        IConfiguration configuration)
    {
        _next = next;
        _cache = cache;
        _logger = logger;
        
        // Load configuration with defaults
        _requestsPerWindow = configuration.GetValue("RateLimit:RequestsPerWindow", 100);
        _windowDuration = TimeSpan.FromMinutes(configuration.GetValue("RateLimit:WindowMinutes", 1));
        _blockDuration = TimeSpan.FromMinutes(configuration.GetValue("RateLimit:BlockMinutes", 15));
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Skip rate limiting for health checks
        if (context.Request.Path.StartsWithSegments("/api/health"))
        {
            await _next(context);
            return;
        }

        var ipAddress = GetClientIpAddress(context);
        var cacheKey = $"rate_limit_{ipAddress}";

        // Periodic cleanup of expired block entries to prevent unbounded dictionary growth
        var now = DateTime.UtcNow;
        if (now - _lastCleanup > _cleanupInterval)
        {
            _lastCleanup = now;
            var expiredKeys = _blockedIps
                .Where(kv => kv.Value <= now)
                .Select(kv => kv.Key)
                .ToList();
            foreach (var key in expiredKeys)
                _blockedIps.TryRemove(key, out _);
        }

        // Check if IP is currently blocked
        if (_blockedIps.TryGetValue(ipAddress, out var blockedUntil))
        {
            if (now < blockedUntil)
            {
                await ReturnTooManyRequests(context, blockedUntil);
                return;
            }
            
            // Block expired, remove from blocked list
            _blockedIps.TryRemove(ipAddress, out _);
        }

        // Get or create request counter
        var requestCount = _cache.GetOrCreate(cacheKey, entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = _windowDuration;
            return new RequestCounter
            {
                Count = 0,
                WindowStart = DateTime.UtcNow
            };
        });

        if (requestCount == null)
        {
            requestCount = new RequestCounter
            {
                Count = 0,
                WindowStart = DateTime.UtcNow
            };
        }

        // Increment request count
        requestCount.Count++;
        _cache.Set(cacheKey, requestCount, _windowDuration);

        // Check if limit exceeded
        if (requestCount.Count > _requestsPerWindow)
        {
            // Block the IP
            var blockUntil = DateTime.UtcNow.Add(_blockDuration);
            _blockedIps[ipAddress] = blockUntil;
            
            _logger.LogWarning(
                "Rate limit exceeded for IP {IpAddress}. Blocked until {BlockUntil}. Requests: {Count}/{Limit}",
                ipAddress,
                blockUntil,
                requestCount.Count,
                _requestsPerWindow);

            await ReturnTooManyRequests(context, blockUntil);
            return;
        }

        // Add rate limit headers
        context.Response.Headers.Append("X-RateLimit-Limit", _requestsPerWindow.ToString());
        context.Response.Headers.Append("X-RateLimit-Remaining", 
            Math.Max(0, _requestsPerWindow - requestCount.Count).ToString());
        context.Response.Headers.Append("X-RateLimit-Reset", 
            requestCount.WindowStart.Add(_windowDuration).ToString("o"));

        await _next(context);
    }

    private string GetClientIpAddress(HttpContext context)
    {
        // Check for forwarded IP (when behind proxy/load balancer)
        var forwardedFor = context.Request.Headers["X-Forwarded-For"].FirstOrDefault();
        if (!string.IsNullOrEmpty(forwardedFor))
        {
            return forwardedFor.Split(',')[0].Trim();
        }

        // Check for real IP header
        var realIp = context.Request.Headers["X-Real-IP"].FirstOrDefault();
        if (!string.IsNullOrEmpty(realIp))
        {
            return realIp;
        }

        // Fall back to remote IP
        return context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
    }

    private async Task ReturnTooManyRequests(HttpContext context, DateTime blockedUntil)
    {
        var retryAfter = (int)(blockedUntil - DateTime.UtcNow).TotalSeconds;
        
        context.Response.StatusCode = (int)HttpStatusCode.TooManyRequests;
        context.Response.Headers.Append("Retry-After", retryAfter.ToString());
        context.Response.Headers.Append("Content-Type", "application/json");

        var response = new
        {
            error = "Too Many Requests",
            message = $"Rate limit exceeded. Please try again after {retryAfter} seconds.",
            retryAfter = retryAfter,
            blockedUntil = blockedUntil.ToString("o")
        };

        await context.Response.WriteAsJsonAsync(response);
    }

    private class RequestCounter
    {
        public int Count { get; set; }
        public DateTime WindowStart { get; set; }
    }
}

/// <summary>
/// Extension methods for adding rate limiting middleware
/// </summary>
public static class RateLimitingMiddlewareExtensions
{
    public static IApplicationBuilder UseRateLimiting(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RateLimitingMiddleware>();
    }
}
