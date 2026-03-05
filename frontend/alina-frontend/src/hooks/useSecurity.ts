/**
 * Security Initialization Hook
 * Initializes CSRF protection and runs security audits
 */

'use client';

import { useEffect } from 'react';
import { initializeCSRFToken } from '@/lib/security/csrf-protection';
import { auditClientSecurity, securityLogger } from '@/lib/security/security-audit';

/**
 * Initialize security features
 */
export function useSecurity() {
  useEffect(() => {
    // Initialize CSRF token
    initializeCSRFToken();

    // Run security audit in development
    if (process.env.NODE_ENV === 'development') {
      // Run audit after a short delay to allow app to fully mount
      const timer = setTimeout(() => {
        const auditResult = auditClientSecurity();
        securityLogger.audit(auditResult);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);
}

/**
 * Hook for input validation with security checks
 */
export function useSecureInput() {
  const validateInput = (
    value: string,
    type: 'text' | 'email' | 'url' | 'phone' | 'username'
  ): { isValid: boolean; sanitized: string; errors: string[] } => {
    const { validateInput: validate } = require('@/lib/security/input-sanitization');
    return validate(value, type);
  };

  return { validateInput };
}

/**
 * Hook for password strength checking
 */
export function usePasswordStrength() {
  const checkStrength = (password: string) => {
    const { checkPasswordStrength } = require('@/lib/security/security-audit');
    return checkPasswordStrength(password);
  };

  return { checkStrength };
}
