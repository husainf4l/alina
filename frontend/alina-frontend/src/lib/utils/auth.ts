/**
 * Authentication utilities
 * 
 * SECURITY: This app uses HTTP-only cookies for authentication.
 * Tokens are NOT stored in localStorage to prevent XSS attacks.
 * All functions below are no-ops or return safe defaults.
 */

// These functions are kept for backwards compatibility but do nothing
// Authentication state is managed via HTTP-only cookies sent by the backend

export const getAccessToken = (): string | null => {
  // Tokens are in HTTP-only cookies, not accessible via JavaScript
  return null;
};

export const getRefreshToken = (): string | null => {
  // Tokens are in HTTP-only cookies, not accessible via JavaScript
  return null;
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  // No-op: Backend sets HTTP-only cookies automatically
  // Tokens should never be stored in localStorage
  return;
};

export const clearTokens = (): void => {
  // No-op: Logout endpoint on backend clears HTTP-only cookies
  // Nothing to clear in localStorage
  return;
};

export const isAuthenticated = (): boolean => {
  // Cannot determine auth state from cookies (they're HTTP-only)
  // Components should use useCurrentUser() hook instead
  return false;
};
