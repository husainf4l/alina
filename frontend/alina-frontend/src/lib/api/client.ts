/**
 * API Client - Main export
 * 
 * This re-exports the configured axios client from axios-config.ts
 * for backward compatibility with existing code.
 */

export { default, getErrorMessage, isNetworkError } from './axios-config';
export { apiClient } from './axios-config';
