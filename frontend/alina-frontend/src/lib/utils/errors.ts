/**
 * Error Handling Utilities
 * 
 * Standardized error handling for consistent user experience and proper logging
 */

import { AxiosError } from 'axios';

export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
}

/**
 * Extract user-friendly error message from various error types
 */
export function getErrorMessage(error: unknown): string {
  if (!error) {
    return 'An unknown error occurred';
  }

  // Axios error
  if (error instanceof Error && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    
    if (axiosError.response) {
      // Server responded with error status
      const data = axiosError.response.data;
      
      if (data?.message) {
        return data.message;
      }
      
      if (data?.error) {
        return data.error;
      }
      
      // Default messages by status code
      switch (axiosError.response.status) {
        case 400:
          return 'Invalid request. Please check your input.';
        case 401:
          return 'You need to log in to continue.';
        case 403:
          return 'You do not have permission to perform this action.';
        case 404:
          return 'The requested resource was not found.';
        case 409:
          return 'This resource already exists.';
        case 422:
          return 'Validation failed. Please check your input.';
        case 429:
          return 'Too many requests. Please try again later.';
        case 500:
          return 'Server error. Please try again later.';
        case 503:
          return 'Service temporarily unavailable. Please try again later.';
        default:
          return `Request failed with status ${axiosError.response.status}`;
      }
    }
    
    if (axiosError.request) {
      // Request was made but no response received
      return 'Network error. Please check your connection.';
    }
  }

  // Standard Error object
  if (error instanceof Error) {
    return error.message;
  }

  // String error
  if (typeof error === 'string') {
    return error;
  }

  // Object with message property
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }

  return 'An unexpected error occurred';
}

/**
 * Create standardized AppError from unknown error
 */
export function createAppError(error: unknown): AppError {
  const message = getErrorMessage(error);
  
  let statusCode: number | undefined;
  let code: string | undefined;
  let details: unknown;

  if (error instanceof Error && 'isAxiosError' in error) {
    const axiosError = error as AxiosError;
    statusCode = axiosError.response?.status;
    code = axiosError.code;
    details = axiosError.response?.data;
  }

  return {
    message,
    code,
    statusCode,
    details,
  };
}

/**
 * Log error to monitoring service (Sentry, etc.)
 * TODO: Integrate with actual error monitoring service
 */
export function logError(error: unknown, context?: Record<string, unknown>): void {
  const appError = createAppError(error);
  
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', {
      ...appError,
      context,
      timestamp: new Date().toISOString(),
    });
  }
  
  // TODO: Send to error monitoring service (Sentry, LogRocket, etc.)
  // Example:
  // Sentry.captureException(error, {
  //   tags: { ...context },
  //   level: 'error',
  // });
}

/**
 * Check if error is a specific HTTP status code
 */
export function isErrorStatus(error: unknown, statusCode: number): boolean {
  if (error instanceof Error && 'isAxiosError' in error) {
    const axiosError = error as AxiosError;
    return axiosError.response?.status === statusCode;
  }
  return false;
}

/**
 * Check if error is a network error (no response from server)
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error && 'isAxiosError' in error) {
    const axiosError = error as AxiosError;
    return Boolean(axiosError.request && !axiosError.response);
  }
  return false;
}

/**
 * Check if error is a validation error (422)
 */
export function isValidationError(error: unknown): boolean {
  return isErrorStatus(error, 422);
}

/**
 * Check if error is unauthorized (401)
 */
export function isUnauthorizedError(error: unknown): boolean {
  return isErrorStatus(error, 401);
}

/**
 * Check if error is forbidden (403)
 */
export function isForbiddenError(error: unknown): boolean {
  return isErrorStatus(error, 403);
}
