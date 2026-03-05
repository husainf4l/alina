/**
 * Validation Utilities
 * 
 * Comprehensive validation functions for email, password, and other user input.
 * Includes checks for disposable email domains and common authentication issues.
 */

// Common disposable email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com',
  'throwaway.email',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'maildrop.cc',
  'temp-mail.org',
  'yopmail.com',
  'sharklasers.com',
  'trashmail.com',
  'getnada.com',
  'mohmal.com',
  'emailondeck.com',
  'fakeinbox.com',
  'temp-mail.io',
  'dispostable.com',
  'mintemail.com',
  'mytemp.email',
  'tempinbox.com',
  'tempr.email',
];

/**
 * Validates email format using RFC 5322 compliant regex
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  
  // RFC 5322 simplified regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email);
}

/**
 * Checks if email domain is a known disposable email service
 */
export function isDisposableEmail(email: string): boolean {
  if (!email) return false;
  
  const domain = email.toLowerCase().split('@')[1];
  return DISPOSABLE_EMAIL_DOMAINS.includes(domain);
}

/**
 * Comprehensive email validation with detailed error messages
 * 
 * @returns Object with isValid boolean and optional error message
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }
  
  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  if (isDisposableEmail(email)) {
    return { 
      isValid: false, 
      error: 'Disposable email addresses are not allowed. Please use a permanent email address.' 
    };
  }
  
  // Check for common typos in popular domains
  const domain = email.toLowerCase().split('@')[1];
  const typoSuggestions: Record<string, string> = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'outlok.com': 'outlook.com',
    'hotmial.com': 'hotmail.com',
  };
  
  if (typoSuggestions[domain]) {
    return { 
      isValid: false, 
      error: `Did you mean ${email.split('@')[0]}@${typoSuggestions[domain]}?` 
    };
  }
  
  return { isValid: true };
}

/**
 * Validates password strength with detailed requirements
 * 
 * @returns Object with isValid boolean, strength percentage, and optional error message
 */
export function validatePassword(password: string): { 
  isValid: boolean; 
  strength: number;
  error?: string;
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
} {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  
  // Calculate strength (20% per requirement)
  const strength = Object.values(requirements).filter(Boolean).length * 20;
  
  // Find first unmet requirement
  let error: string | undefined;
  if (!requirements.minLength) {
    error = 'Password must be at least 8 characters';
  } else if (!requirements.hasUppercase) {
    error = 'Password must contain at least one uppercase letter';
  } else if (!requirements.hasLowercase) {
    error = 'Password must contain at least one lowercase letter';
  } else if (!requirements.hasNumber) {
    error = 'Password must contain at least one number';
  } else if (!requirements.hasSpecialChar) {
    error = 'Password must contain at least one special character (!@#$%^&*)';
  }
  
  return {
    isValid: strength === 100,
    strength,
    error,
    requirements,
  };
}

/**
 * Validates username format
 */
export function validateUsername(username: string): { isValid: boolean; error?: string } {
  if (!username) {
    return { isValid: false, error: 'Username is required' };
  }
  
  if (username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters' };
  }
  
  if (username.length > 30) {
    return { isValid: false, error: 'Username must be no more than 30 characters' };
  }
  
  // Allow letters, numbers, underscores, and hyphens
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { 
      isValid: false, 
      error: 'Username can only contain letters, numbers, underscores, and hyphens' 
    };
  }
  
  // Must start with a letter
  if (!/^[a-zA-Z]/.test(username)) {
    return { isValid: false, error: 'Username must start with a letter' };
  }
  
  return { isValid: true };
}

/**
 * Validates phone number (basic international format)
 */
export function validatePhoneNumber(phone: string): { isValid: boolean; error?: string } {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length < 10) {
    return { isValid: false, error: 'Phone number must be at least 10 digits' };
  }
  
  if (digitsOnly.length > 15) {
    return { isValid: false, error: 'Phone number must be no more than 15 digits' };
  }
  
  return { isValid: true };
}

/**
 * Validates URL format
 */
export function validateUrl(url: string): { isValid: boolean; error?: string } {
  if (!url) {
    return { isValid: false, error: 'URL is required' };
  }
  
  try {
    const urlObj = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'URL must use HTTP or HTTPS protocol' };
    }
    
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validates that two passwords match
 */
export function validatePasswordMatch(
  password: string, 
  confirmPassword: string
): { isValid: boolean; error?: string } {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  
  return { isValid: true };
}

/**
 * Validates card number using Luhn algorithm
 */
export function validateCardNumber(cardNumber: string): { isValid: boolean; error?: string } {
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\s-]/g, '');
  
  if (!/^\d+$/.test(cleaned)) {
    return { isValid: false, error: 'Card number must contain only digits' };
  }
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return { isValid: false, error: 'Invalid card number length' };
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) {
    return { isValid: false, error: 'Invalid card number' };
  }
  
  return { isValid: true };
}

/**
 * Validates card expiry date (MM/YY format)
 */
export function validateCardExpiry(expiry: string): { isValid: boolean; error?: string } {
  if (!expiry) {
    return { isValid: false, error: 'Expiry date is required' };
  }
  
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) {
    return { isValid: false, error: 'Invalid format. Use MM/YY' };
  }
  
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2000; // Assume 20xx
  
  if (month < 1 || month > 12) {
    return { isValid: false, error: 'Invalid month' };
  }
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { isValid: false, error: 'Card has expired' };
  }
  
  return { isValid: true };
}

/**
 * Validates CVV/CVC code
 */
export function validateCvv(cvv: string): { isValid: boolean; error?: string } {
  if (!cvv) {
    return { isValid: false, error: 'CVV is required' };
  }
  
  if (!/^\d{3,4}$/.test(cvv)) {
    return { isValid: false, error: 'CVV must be 3 or 4 digits' };
  }
  
  return { isValid: true };
}
