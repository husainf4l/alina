/**
 * Input Sanitization Utilities
 * Prevents XSS attacks and malicious input
 */

/**
 * Sanitize HTML string to prevent XSS attacks
 * Removes potentially dangerous HTML tags and attributes
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';

  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Remove data: protocol (can be used for XSS)
  sanitized = sanitized.replace(/data:text\/html/gi, '');
  
  // Remove dangerous tags
  const dangerousTags = ['iframe', 'embed', 'object', 'applet', 'link', 'style', 'meta'];
  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<${tag}\\b[^<]*(?:(?!<\\/${tag}>)<[^<]*)*<\\/${tag}>`, 'gi');
    sanitized = sanitized.replace(regex, '');
    sanitized = sanitized.replace(new RegExp(`<${tag}[^>]*>`, 'gi'), '');
  });

  return sanitized;
}

/**
 * Sanitize user input for safe display
 * Escapes HTML special characters
 */
export function escapeHTML(text: string): string {
  if (!text) return '';

  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char);
}

/**
 * Sanitize URL to prevent JavaScript injection
 */
export function sanitizeURL(url: string): string {
  if (!url) return '';

  // Remove javascript: protocol
  if (url.toLowerCase().startsWith('javascript:')) {
    return '';
  }

  // Remove data: URLs that could contain scripts
  if (url.toLowerCase().startsWith('data:')) {
    // Only allow safe data URLs (images)
    if (!url.toLowerCase().startsWith('data:image/')) {
      return '';
    }
  }

  // Only allow http, https, mailto, tel
  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:', '/'];
  const hasAllowedProtocol = allowedProtocols.some(protocol => 
    url.startsWith(protocol) || url.startsWith('//')
  );

  if (!hasAllowedProtocol && url.includes(':')) {
    return '';
  }

  return url;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  
  // RFC 5322 compliant regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Additional checks
  if (email.length > 254) return false; // Max email length
  if (email.includes('..')) return false; // No consecutive dots
  if (email.startsWith('.') || email.endsWith('.')) return false;
  
  return emailRegex.test(email);
}

/**
 * Sanitize and validate username
 */
export function sanitizeUsername(username: string): string {
  if (!username) return '';

  // Remove special characters, keep only alphanumeric, underscore, hyphen
  const sanitized = username.replace(/[^a-zA-Z0-9_-]/g, '');
  
  // Limit length
  return sanitized.slice(0, 30);
}

/**
 * Sanitize file name
 */
export function sanitizeFileName(fileName: string): string {
  if (!fileName) return '';

  // Remove path traversal attempts
  let sanitized = fileName.replace(/\.\.\//g, '');
  sanitized = sanitized.replace(/\.\.\\/g, '');
  
  // Remove special characters except dots, underscores, hyphens
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '_');
  
  // Prevent hidden files
  if (sanitized.startsWith('.')) {
    sanitized = sanitized.slice(1);
  }
  
  // Limit length
  return sanitized.slice(0, 255);
}

/**
 * Validate and sanitize phone number
 */
export function sanitizePhoneNumber(phone: string): string {
  if (!phone) return '';

  // Remove all non-numeric characters except + at the start
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Ensure + is only at the start
  if (cleaned.includes('+')) {
    const parts = cleaned.split('+');
    return '+' + parts.filter(p => p).join('');
  }
  
  return cleaned;
}

/**
 * Sanitize search query
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';

  // Remove HTML tags
  let sanitized = query.replace(/<[^>]*>/g, '');
  
  // Remove special SQL/NoSQL injection attempts
  sanitized = sanitized.replace(/[;'"\\]/g, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  // Limit length
  return sanitized.slice(0, 200);
}

/**
 * Validate and sanitize credit card number (for display only)
 */
export function maskCreditCard(cardNumber: string): string {
  if (!cardNumber) return '';

  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return '****';
  }

  // Show only last 4 digits
  return '****' + cleaned.slice(-4);
}

/**
 * Sanitize price/amount input
 */
export function sanitizeAmount(amount: string): string {
  if (!amount) return '0';

  // Remove all except numbers and decimal point
  const cleaned = amount.replace(/[^\d.]/g, '');
  
  // Ensure only one decimal point
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Limit decimal places to 2
  if (parts[1]) {
    parts[1] = parts[1].slice(0, 2);
  }
  
  return parts.join('.');
}

/**
 * Check if string contains SQL injection patterns
 */
export function containsSQLInjection(input: string): boolean {
  if (!input) return false;

  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(UNION.*SELECT)/i,
    /(OR\s+1\s*=\s*1)/i,
    /(AND\s+1\s*=\s*1)/i,
    /('.*OR.*'.*=.*')/i,
    /(;.*--)/i,
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Check if string contains XSS patterns
 */
export function containsXSS(input: string): boolean {
  if (!input) return false;

  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<embed/i,
    /<object/i,
    /eval\(/i,
    /expression\(/i,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Comprehensive input validator
 */
export function validateInput(input: string, type: 'text' | 'email' | 'url' | 'phone' | 'username'): {
  isValid: boolean;
  sanitized: string;
  errors: string[];
} {
  const errors: string[] = [];
  let sanitized = input;

  // Check for XSS
  if (containsXSS(input)) {
    errors.push('Input contains potentially malicious content');
  }

  // Check for SQL injection
  if (type === 'text' && containsSQLInjection(input)) {
    errors.push('Input contains invalid characters');
  }

  // Type-specific validation
  switch (type) {
    case 'email':
      if (!isValidEmail(input)) {
        errors.push('Invalid email format');
      }
      sanitized = input.toLowerCase().trim();
      break;

    case 'url':
      sanitized = sanitizeURL(input);
      if (!sanitized) {
        errors.push('Invalid URL');
      }
      break;

    case 'phone':
      sanitized = sanitizePhoneNumber(input);
      if (sanitized.length < 10) {
        errors.push('Phone number too short');
      }
      break;

    case 'username':
      sanitized = sanitizeUsername(input);
      if (sanitized.length < 3) {
        errors.push('Username must be at least 3 characters');
      }
      break;

    case 'text':
    default:
      sanitized = escapeHTML(input);
      break;
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  };
}
