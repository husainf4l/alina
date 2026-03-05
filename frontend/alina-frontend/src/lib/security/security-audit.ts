/**
 * Security Audit Utilities
 * Tools for auditing and monitoring security
 */

import { containsXSS, containsSQLInjection } from './input-sanitization';

/**
 * Security audit result
 */
export interface SecurityAuditResult {
  passed: boolean;
  score: number;
  issues: SecurityIssue[];
  warnings: string[];
  recommendations: string[];
}

/**
 * Security issue
 */
export interface SecurityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  description: string;
  location?: string;
}

/**
 * Audit client-side security
 */
export function auditClientSecurity(): SecurityAuditResult {
  const issues: SecurityIssue[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Check if running over HTTPS (in production)
  if (typeof window !== 'undefined') {
    const isProduction = process.env.NODE_ENV === 'production';
    const isHTTPS = window.location.protocol === 'https:';

    if (isProduction && !isHTTPS) {
      issues.push({
        severity: 'critical',
        category: 'Transport Security',
        description: 'Application is not served over HTTPS in production',
        location: 'window.location.protocol',
      });
    }

    // Check for mixed content
    if (isHTTPS) {
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach((script) => {
        const src = script.getAttribute('src');
        if (src && src.startsWith('http:')) {
          issues.push({
            severity: 'high',
            category: 'Mixed Content',
            description: `Insecure script loaded over HTTP: ${src}`,
            location: 'script[src]',
          });
        }
      });
    }

    // Check for inline event handlers
    const elementsWithEvents = document.querySelectorAll(
      '[onclick], [onerror], [onload], [onmouseover]'
    );
    if (elementsWithEvents.length > 0) {
      warnings.push(
        `Found ${elementsWithEvents.length} inline event handlers. Consider using addEventListener instead.`
      );
    }

    // Check localStorage usage
    try {
      const storageKeys = Object.keys(localStorage);
      const sensitivePatterns = [
        'password',
        'token',
        'secret',
        'api_key',
        'private_key',
        'credit_card',
        'ssn',
      ];

      storageKeys.forEach((key) => {
        const lowerKey = key.toLowerCase();
        if (sensitivePatterns.some((pattern) => lowerKey.includes(pattern))) {
          issues.push({
            severity: 'high',
            category: 'Data Storage',
            description: `Potentially sensitive data stored in localStorage: ${key}`,
            location: 'localStorage',
          });
        }
      });
    } catch (e) {
      // localStorage not available
    }

    // Check for console.log in production
    if (isProduction) {
      const originalLog = console.log;
      if (originalLog.toString().includes('native code')) {
        warnings.push(
          'console.log is not disabled in production. Consider removing debug statements.'
        );
      }
    }

    // Check CSP
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!cspMeta && isProduction) {
      warnings.push(
        'No Content-Security-Policy meta tag found. Ensure CSP is set via headers.'
      );
    }

    // Recommendations
    recommendations.push('Use HTTP-only cookies for sensitive tokens');
    recommendations.push('Implement CSRF protection on all state-changing requests');
    recommendations.push('Enable rate limiting on authentication endpoints');
    recommendations.push('Regularly update dependencies to patch security vulnerabilities');
    recommendations.push('Use environment variables for API endpoints and keys');
  }

  // Calculate score (100 - (critical*25 + high*15 + medium*5 + low*2))
  const criticalCount = issues.filter((i) => i.severity === 'critical').length;
  const highCount = issues.filter((i) => i.severity === 'high').length;
  const mediumCount = issues.filter((i) => i.severity === 'medium').length;
  const lowCount = issues.filter((i) => i.severity === 'low').length;

  const score = Math.max(
    0,
    100 - (criticalCount * 25 + highCount * 15 + mediumCount * 5 + lowCount * 2)
  );

  return {
    passed: issues.filter((i) => i.severity === 'critical' || i.severity === 'high').length === 0,
    score,
    issues,
    warnings,
    recommendations,
  };
}

/**
 * Scan text for security vulnerabilities
 */
export function scanTextForVulnerabilities(text: string): {
  hasXSS: boolean;
  hasSQLInjection: boolean;
  hasSecrets: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  const hasXSS = containsXSS(text);
  if (hasXSS) {
    issues.push('Potential XSS attack detected');
  }

  const hasSQLInjection = containsSQLInjection(text);
  if (hasSQLInjection) {
    issues.push('Potential SQL injection detected');
  }

  // Check for hardcoded secrets
  const secretPatterns = [
    /api[_-]?key["\s:=]+[a-zA-Z0-9]{20,}/i,
    /secret["\s:=]+[a-zA-Z0-9]{20,}/i,
    /password["\s:=]+[^\s]{8,}/i,
    /token["\s:=]+[a-zA-Z0-9]{20,}/i,
    /private[_-]?key["\s:=]+[a-zA-Z0-9]{20,}/i,
    /aws[_-]?access/i,
    /-----BEGIN (RSA |DSA )?PRIVATE KEY-----/,
  ];

  const hasSecrets = secretPatterns.some((pattern) => pattern.test(text));
  if (hasSecrets) {
    issues.push('Potential hardcoded secret detected');
  }

  return {
    hasXSS,
    hasSQLInjection,
    hasSecrets,
    issues,
  };
}

/**
 * Check password strength
 */
export function checkPasswordStrength(password: string): {
  strength: 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';
  score: number;
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];

  // Length check
  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters long');
  } else if (password.length < 12) {
    score += 1;
  } else if (password.length < 16) {
    score += 2;
  } else {
    score += 3;
  }

  // Uppercase letters
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add uppercase letters');
  }

  // Lowercase letters
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add lowercase letters');
  }

  // Numbers
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add numbers');
  }

  // Special characters
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 2;
  } else {
    feedback.push('Add special characters (!@#$%^&*)');
  }

  // Common patterns (decrease score)
  const commonPatterns = [
    /^password/i,
    /123456/,
    /qwerty/i,
    /abc123/i,
    /111111/,
    /admin/i,
  ];

  if (commonPatterns.some((pattern) => pattern.test(password))) {
    score = Math.max(0, score - 3);
    feedback.push('Avoid common passwords and patterns');
  }

  // Sequential characters (decrease score)
  if (/(.)\1{2,}/.test(password)) {
    score = Math.max(0, score - 1);
    feedback.push('Avoid repeating characters');
  }

  // Determine strength
  let strength: 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';
  if (score < 3) {
    strength = 'weak';
  } else if (score < 5) {
    strength = 'fair';
  } else if (score < 7) {
    strength = 'good';
  } else if (score < 9) {
    strength = 'strong';
  } else {
    strength = 'very-strong';
  }

  return {
    strength,
    score: Math.min(10, score),
    feedback,
  };
}

/**
 * Security logger (development only)
 */
export const securityLogger = {
  log(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Security] ${message}`, data || '');
    }
  },

  warn(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Security Warning] ${message}`, data || '');
    }
  },

  error(message: string, data?: any): void {
    console.error(`[Security Error] ${message}`, data || '');
  },

  audit(result: SecurityAuditResult): void {
    if (process.env.NODE_ENV === 'development') {
      console.group('🔒 Security Audit Report');
      console.log(`Score: ${result.score}/100 - ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
      
      if (result.issues.length > 0) {
        console.group('Issues:');
        result.issues.forEach((issue) => {
          console.log(`[${issue.severity.toUpperCase()}] ${issue.category}: ${issue.description}`);
        });
        console.groupEnd();
      }

      if (result.warnings.length > 0) {
        console.group('Warnings:');
        result.warnings.forEach((warning) => console.warn(warning));
        console.groupEnd();
      }

      if (result.recommendations.length > 0) {
        console.group('Recommendations:');
        result.recommendations.forEach((rec) => console.log(`💡 ${rec}`));
        console.groupEnd();
      }

      console.groupEnd();
    }
  },
};
