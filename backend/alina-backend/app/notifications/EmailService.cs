using System.Net;
using System.Net.Mail;

namespace alina_backend.app.notifications;

/// <summary>
/// Email service for sending notifications
/// Supports password changes, account security, and general notifications
/// </summary>
public class EmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;
    
    private readonly string _smtpHost;
    private readonly int _smtpPort;
    private readonly string _smtpUsername;
    private readonly string _smtpPassword;
    private readonly string _fromEmail;
    private readonly string _fromName;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
        
        // Load SMTP configuration
        _smtpHost = configuration["Email:SmtpHost"] ?? "smtp.gmail.com";
        _smtpPort = configuration.GetValue("Email:SmtpPort", 587);
        _smtpUsername = configuration["Email:Username"] ?? "";
        _smtpPassword = configuration["Email:Password"] ?? "";
        _fromEmail = configuration["Email:FromEmail"] ?? "noreply@alina.com";
        _fromName = configuration["Email:FromName"] ?? "Alina Marketplace";
    }

    /// <summary>
    /// Send password change notification
    /// </summary>
    public async Task<bool> SendPasswordChangeNotificationAsync(string toEmail, string userName, DateTime changedAt, string ipAddress)
    {
        var subject = "Password Changed - Alina";
        var body = $@"
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #1f2937; color: white; padding: 20px; text-align: center; }}
        .content {{ background: #f9fafb; padding: 30px; }}
        .alert {{ background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }}
        .button {{ display: inline-block; padding: 12px 30px; background: #1f2937; color: white; text-decoration: none; border-radius: 5px; }}
        .footer {{ text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🔐 Password Changed</h1>
        </div>
        <div class='content'>
            <p>Hello {userName},</p>
            
            <div class='alert'>
                <strong>⚠️ Your password was recently changed</strong>
            </div>
            
            <p>We're writing to let you know that your Alina account password was changed on <strong>{changedAt:MMMM dd, yyyy 'at' HH:mm UTC}</strong>.</p>
            
            <p><strong>Details:</strong></p>
            <ul>
                <li>IP Address: {ipAddress}</li>
                <li>Time: {changedAt:yyyy-MM-dd HH:mm:ss UTC}</li>
            </ul>
            
            <p><strong>If you made this change:</strong><br>
            No further action is required. Your account is secure.</p>
            
            <p><strong>If you did NOT make this change:</strong><br>
            Your account may be compromised. Please take the following steps immediately:</p>
            <ol>
                <li>Reset your password immediately</li>
                <li>Enable two-factor authentication</li>
                <li>Review your recent account activity</li>
                <li>Contact our support team</li>
            </ol>
            
           <p style='text-align: center; margin: 30px 0;'>
                <a href='https://alina.com/reset-password' class='button'>Reset Password</a>
            </p>
            
            <p>For assistance, contact us at <a href='mailto:security@alina.com'>security@alina.com</a></p>
        </div>
        <div class='footer'>
            <p>© 2026 Alina Marketplace. All rights reserved.</p>
            <p>This is an automated security notification.</p>
        </div>
    </div>
</body>
</html>";

    return await SendEmailAsync(toEmail, subject, body);
    }

    /// <summary>
    /// Send 2FA verification code
    /// </summary>
    public async Task<bool> Send2FACodeAsync(string toEmail, string code, int expiryMinutes = 10)
    {
        var subject = "Your Verification Code - Alina";
        var body = $@"
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #1f2937; color: white; padding: 20px; text-align: center; }}
        .content {{ background: #f9fafb; padding: 30px; text-align: center; }}
        .code {{ font-size: 36px; font-weight: bold; letter-spacing: 5px; color: #1f2937; margin: 30px 0; }}
        .footer {{ text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🔒 Verification Code</h1>
        </div>
        <div class='content'>
            <p>Your verification code is:</p>
            <div class='code'>{code}</div>
            <p>This code will expire in <strong>{expiryMinutes} minutes</strong>.</p>
            <p>If you didn't request this code, please ignore this email or contact support.</p>
        </div>
        <div class='footer'>
            <p>© 2026 Alina Marketplace. All rights reserved.</p>
        </div>
    </div>
</body>
</html>";

        return await SendEmailAsync(toEmail, subject, body);
    }

    /// <summary>
    /// Send generic email
    /// </summary>
    public async Task<bool> SendEmailAsync(string toEmail, string subject, string htmlBody)
    {
        try
        {
            using var smtpClient = new SmtpClient(_smtpHost, _smtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(_smtpUsername, _smtpPassword)
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_fromEmail, _fromName),
                Subject = subject,
                Body = htmlBody,
                IsBodyHtml = true
            };

            mailMessage.To.Add(toEmail);

            await smtpClient.SendMailAsync(mailMessage);
            
            _logger.LogInformation("Email sent successfully to {Email}", toEmail);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {Email}", toEmail);
            return false;
        }
    }
}
