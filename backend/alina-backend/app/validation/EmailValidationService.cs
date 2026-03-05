using System.Net.Sockets;
using System.Text.RegularExpressions;
using DnsClient;

namespace alina_backend.app.validation;

/// <summary>
/// Server-side email validation service
/// Performs regex validation and DNS MX record verification
/// </summary>
public class EmailValidationService
{
    private readonly ILogger<EmailValidationService> _logger;
    private readonly LookupClient _dnsClient;
    
    // RFC 5322 compliant email regex
    private static readonly Regex EmailRegex = new Regex(
        @"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase
    );

    private static readonly HashSet<string> DisposableEmailDomains = new()
    {
        "tempmail.com", "guerrillamail.com", "mailinator.com", "10minutemail.com",
        "throwaway.email", "temp-mail.org", "fakeinbox.com", "maildrop.cc"
    };

    public EmailValidationService(ILogger<EmailValidationService> logger)
    {
        _logger = logger;
        _dnsClient = new LookupClient();
    }

    /// <summary>
    /// Validate email with regex, format checks, and DNS verification
    /// </summary>
    public async Task<EmailValidationResult> ValidateEmailAsync(string email)
    {
        var result = new EmailValidationResult { Email = email };

        // 1. Basic checks
        if (string.IsNullOrWhiteSpace(email))
        {
            result.IsValid = false;
            result.Errors.Add("Email is required");
            return result;
        }

        email = email.Trim().ToLower();

        // 2. Length check
        if (email.Length > 254) // RFC 5321
        {
            result.IsValid = false;
            result.Errors.Add("Email exceeds maximum length (254 characters)");
            return result;
        }

        // 3. Regex validation
        if (!EmailRegex.IsMatch(email))
        {
            result.IsValid = false;
            result.Errors.Add("Email format is invalid");
            return result;
        }

        // 4. Extract domain
        var parts = email.Split('@');
        if (parts.Length != 2)
        {
            result.IsValid = false;
            result.Errors.Add("Email must contain exactly one @ symbol");
            return result;
        }

        var localPart = parts[0];
        var domain = parts[1];

        // 5. Local part validation
        if (localPart.Length > 64) // RFC 5321
        {
            result.IsValid = false;
            result.Errors.Add("Local part exceeds maximum length (64 characters)");
            return result;
        }

        // 6. Domain validation
        if (domain.Length > 253)
        {
            result.IsValid = false;
            result.Errors.Add("Domain exceeds maximum length (253 characters)");
            return result;
        }

        // 7. Check for disposable email
        if (DisposableEmailDomains.Contains(domain))
        {
            result.IsValid = false;
            result.IsDisposable = true;
            result.Warnings.Add("Disposable email addresses are not allowed");
        }

        // 8. DNS MX record verification
        try
        {
            var mxRecords = await _dnsClient.QueryAsync(domain, DnsClient.QueryType.MX);
            
            if (mxRecords.Answers.Count == 0)
            {
                result.IsValid = false;
                result.Errors.Add("Domain has no MX records (cannot receive email)");
                return result;
            }

            result.HasValidMxRecords = true;
            _logger.LogInformation("Email validation successful: {Email}", email);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "DNS MX lookup failed for domain: {Domain}", domain);
            result.Warnings.Add("Could not verify domain MX records");
            // Don't fail validation on DNS errors (network issues, etc.)
        }

        result.IsValid = result.Errors.Count == 0;
        return result;
    }

    /// <summary>
    /// Quick regex-only validation (for performance-critical scenarios)
    /// </summary>
    public bool IsValidFormat(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        
        email = email.Trim();
        return email.Length <= 254 && EmailRegex.IsMatch(email);
    }
}

public class EmailValidationResult
{
    public string Email { get; set; } = "";
    public bool IsValid { get; set; } = true;
    public bool HasValidMxRecords { get; set; } = false;
    public bool IsDisposable { get; set; } = false;
    public List<string> Errors { get; set; } = new();
    public List<string> Warnings { get; set; } = new();
}
