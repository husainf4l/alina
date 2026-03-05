using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace alina_backend.app.legal;

[ApiController]
[Route("api/legal")]
public class LegalController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<LegalController> _logger;

    public LegalController(AppDbContext context, ILogger<LegalController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("{type}")]
    public async Task<IActionResult> GetLegalDocument(string type)
    {
        if (string.IsNullOrWhiteSpace(type) ||
            (type.ToLower() != "privacypolicy" && type.ToLower() != "terms" && type.ToLower() != "termsofservice"))
        {
            return BadRequest(new { error = "invalid_type", error_description = "Type must be PrivacyPolicy, Terms, or TermsOfService" });
        }

        // Normalize type
        var normalizedType = type.ToLower() switch
        {
            "privacypolicy" => "PrivacyPolicy",
            "terms" or "termsofservice" => "TermsOfService",
            _ => type
        };

        var document = await _context.LegalDocuments
            .Where(d => d.Type == normalizedType)
            .OrderByDescending(d => d.UpdatedAt)
            .FirstOrDefaultAsync();

        if (document == null)
        {
            // Return default content if no document exists
            var defaultContent = GetDefaultContent(normalizedType);
            return Ok(new
            {
                Type = normalizedType,
                Content = defaultContent,
                UpdatedAt = DateTime.UtcNow
            });
        }

        return Ok(new
        {
            document.Type,
            document.Content,
            document.UpdatedAt
        });
    }

    private string GetDefaultContent(string type)
    {
        return type switch
        {
            "PrivacyPolicy" => @"
<h1>Privacy Policy</h1>
<p>This privacy policy explains how we collect, use, and protect your personal information.</p>
<p><strong>Last updated:</strong> " + DateTime.UtcNow.ToString("yyyy-MM-dd") + @"</p>

<h2>Information We Collect</h2>
<p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>

<h2>How We Use Your Information</h2>
<p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>

<h2>Information Sharing</h2>
<p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>

<h2>Data Security</h2>
<p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

<h2>Contact Us</h2>
<p>If you have any questions about this privacy policy, please contact our support team.</p>
",
            "TermsOfService" => @"
<h1>Terms of Service</h1>
<p>These terms of service outline the rules and regulations for the use of our platform.</p>
<p><strong>Last updated:</strong> " + DateTime.UtcNow.ToString("yyyy-MM-dd") + @"</p>

<h2>Acceptance of Terms</h2>
<p>By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement.</p>

<h2>Use License</h2>
<p>Permission is granted to temporarily access the materials on our platform for personal, non-commercial transitory viewing only.</p>

<h2>User Responsibilities</h2>
<p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>

<h2>Prohibited Uses</h2>
<p>You may not use our services for any illegal or unauthorized purpose, nor may you violate any laws in your jurisdiction.</p>

<h2>Service Availability</h2>
<p>We reserve the right to withdraw or amend our service, and any service or material we provide on the platform, in our sole discretion without notice.</p>

<h2>Contact Information</h2>
<p>If you have any questions about these terms, please contact our support team.</p>
",
            _ => "<p>Document content not available.</p>"
        };
    }
}