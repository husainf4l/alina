/**
 * Security Initializer Component
 * Client component that initializes security features
 */

'use client';

import { useEffect } from 'react';
import { initializeCSRFToken } from '@/lib/security/csrf-protection';
import { auditClientSecurity, securityLogger } from '@/lib/security/security-audit';

export function SecurityInitializer() {
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

  return null; // This component doesn't render anything
}
