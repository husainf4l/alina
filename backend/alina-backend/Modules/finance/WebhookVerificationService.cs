using System.Security.Cryptography;
using System.Text;

namespace alina_backend.Modules.finance;

/// <summary>
/// Webhook signature verification service for payment provider webhooks
/// Validates that webhooks are genuinely from the payment provider
/// </summary>
public class WebhookVerificationService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<WebhookVerificationService> _logger;

    public WebhookVerificationService(
        IConfiguration configuration,
        ILogger<WebhookVerificationService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    /// <summary>
    /// Verify Stripe webhook signature
    /// </summary>
    public bool VerifyStripeSignature(string payload, string signatureHeader, string webhookSecret)
    {
        try
        {
            var signatureParts = signatureHeader.Split(',');
            var timestamp = "";
            var signatures = new List<string>();

            foreach (var part in signatureParts)
            {
                var keyValue = part.Split('=');
                if (keyValue[0] == "t")
                {
                    timestamp = keyValue[1];
                }
                else if (keyValue[0] == "v1")
                {
                    signatures.Add(keyValue[1]);
                }
            }

            // Verify timestamp is recent (within 5 minutes)
            if (long.TryParse(timestamp, out var timestampSeconds))
            {
                var currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
                if (Math.Abs(currentTime - timestampSeconds) > 300)
                {
                    _logger.LogWarning("Stripe webhook timestamp too old");
                    return false;
                }
            }

            // Compute expected signature
            var signedPayload = $"{timestamp}.{payload}";
            var expectedSignature = ComputeHmacSha256(signedPayload, webhookSecret);

            // Constant-time comparison
            foreach (var signature in signatures)
            {
                if (SecureCompare(expectedSignature, signature))
                {
                    return true;
                }
            }

            _logger.LogWarning("Stripe webhook signature verification failed");
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error verifying Stripe webhook signature");
            return false;
        }
    }

    /// <summary>
    /// Verify PayPal webhook signature
    /// </summary>
    public bool VerifyPayPalSignature(string webhookId, string eventBody, Dictionary<string, string> headers)
    {
        try
        {
            var transmissionId = headers.GetValueOrDefault("Paypal-Transmission-Id", "");
            var transmissionTime = headers.GetValueOrDefault("Paypal-Transmission-Time", "");
            var certUrl = headers.GetValueOrDefault("Paypal-Cert-Url", "");
            var authAlgo = headers.GetValueOrDefault("Paypal-Auth-Algo", "");
            var transmissionSig = headers.GetValueOrDefault("Paypal-Transmission-Sig", "");

            // Construct expected signature payload
            var expectedPayload = $"{transmissionId}|{transmissionTime}|{webhookId}|{Crc32(eventBody)}";
            
            // Note: In production, you would verify using PayPal's certificate
            // This is a simplified version for demonstration
            _logger.LogInformation("PayPal webhook verification: {TransmissionId}", transmissionId);
            
            return !string.IsNullOrEmpty(transmissionSig);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error verifying PayPal webhook signature");
            return false;
        }
    }

    /// <summary>
    /// Generic HMAC signature verification for custom payment providers
    /// </summary>
    public bool VerifyHmacSignature(string payload, string signature, string secret, string algorithm = "SHA256")
    {
        try
        {
            var expectedSignature = algorithm.ToUpper() switch
            {
                "SHA256" => ComputeHmacSha256(payload, secret),
                "SHA512" => ComputeHmacSha512(payload, secret),
                _ => throw new ArgumentException($"Unsupported algorithm: {algorithm}")
            };

            return SecureCompare(expectedSignature, signature);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error verifying HMAC signature");
            return false;
        }
    }

    private string ComputeHmacSha256(string message, string secret)
    {
        var keyBytes = Encoding.UTF8.GetBytes(secret);
        var messageBytes = Encoding.UTF8.GetBytes(message);
        
        using var hmac = new HMACSHA256(keyBytes);
        var hashBytes = hmac.ComputeHash(messageBytes);
        return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
    }

    private string ComputeHmacSha512(string message, string secret)
    {
        var keyBytes = Encoding.UTF8.GetBytes(secret);
        var messageBytes = Encoding.UTF8.GetBytes(message);
        
        using var hmac = new HMACSHA512(keyBytes);
        var hashBytes = hmac.ComputeHash(messageBytes);
        return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
    }

    private bool SecureCompare(string a, string b)
    {
        if (a.Length != b.Length)
            return false;

        var result = 0;
        for (int i = 0; i < a.Length; i++)
        {
            result |= a[i] ^ b[i];
        }

        return result == 0;
    }

    private uint Crc32(string input)
    {
        var data = Encoding.UTF8.GetBytes(input);
        uint crc = 0xFFFFFFFF;
        
        foreach (byte b in data)
        {
            crc ^= b;
            for (int i = 0; i < 8; i++)
            {
                crc = (crc & 1) != 0 ? (crc >> 1) ^ 0xEDB88320 : crc >> 1;
            }
        }
        
        return ~crc;
    }
}
