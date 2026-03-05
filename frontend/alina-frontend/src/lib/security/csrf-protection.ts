/**
 * CSRF (Cross-Site Request Forgery) Protection
 * Utilities for generating and validating CSRF tokens
 */

/**
 * Generate a random CSRF token
 */
export function generateCSRFToken(): string {
  if (typeof window === 'undefined') return '';

  // Use crypto.randomUUID if available (modern browsers)
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback to random bytes
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Store CSRF token in sessionStorage
 */
export function storeCSRFToken(token: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('csrf-token', token);
}

/**
 * Get CSRF token from sessionStorage
 */
export function getCSRFToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('csrf-token');
}

/**
 * Initialize CSRF token (call on app mount)
 */
export function initializeCSRFToken(): string {
  let token = getCSRFToken();
  
  if (!token) {
    token = generateCSRFToken();
    storeCSRFToken(token);
  }
  
  return token;
}

/**
 * Add CSRF token to request headers
 */
export function getCSRFHeaders(): Record<string, string> {
  const token = getCSRFToken();
  
  if (!token) return {};
  
  return {
    'X-CSRF-Token': token,
  };
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  const storedToken = getCSRFToken();
  return storedToken === token && token !== '';
}

/**
 * Clear CSRF token (call on logout)
 */
export function clearCSRFToken(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('csrf-token');
}
