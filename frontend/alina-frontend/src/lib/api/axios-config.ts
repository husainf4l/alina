/**
 * Axios Configuration and API Client Setup
 * 
 * This file configures axios for the Next.js frontend to communicate with the .NET backend.
 * It handles:
 * - JWT token management
 * - Automatic token refresh
 * - Request/response interceptors
 * - Error handling
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@/lib/utils/auth';
import { getCSRFHeaders } from '@/lib/security/csrf-protection';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5602/api';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000');

// Track refresh token attempts to prevent infinite loops
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Required for HTTP-only cookies
});

/**
 * Request Interceptor
 * Cookies are sent automatically with withCredentials: true
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Tokens are in HTTP-only cookies, no need to add Authorization header
    // The browser will automatically send cookies with withCredentials: true
    
    // Add CSRF token for state-changing requests (POST, PUT, PATCH, DELETE)
    if (config.method && ['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
      const csrfHeaders = getCSRFHeaders();
      Object.keys(csrfHeaders).forEach(key => {
        config.headers.set(key, csrfHeaders[key]);
      });
    }
    
    // Optionally log requests in development (disabled to reduce noise)
    // if (process.env.NODE_ENV === 'development') {
    //   console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    // }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles token refresh on 401 errors
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Optionally log successful responses in development (disabled to reduce noise)
    // if (process.env.NODE_ENV === 'development') {
    //   console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status);
    // }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    const url = originalRequest?.url || '';

    // Silent errors (don't log these - they're expected)
    const isSilentError = 
      (status === 401 && url.includes('/auth/me')) || // User not logged in yet
      (status === 404) || // Optional endpoints
      (status === 401 && url.includes('/auth/web/refresh')); // Refresh failed (expected when logged out)

    // Log errors in development (suppress expected errors)
    if (process.env.NODE_ENV === 'development' && !isSilentError && status) {
      console.error(`❌ API Error: ${originalRequest?.method?.toUpperCase()} ${url}`, status);
    }

    // Handle 401 Unauthorized errors (but not for /auth/me or refresh endpoints)
    if (status === 401 && originalRequest && !originalRequest._retry && 
        !url.includes('/auth/me') && !url.includes('/auth/web')) {
      originalRequest._retry = true;
      
      // HTTP-only cookies: The refresh token is automatically sent by the browser
      // We just need to call the refresh endpoint and retry the original request
      
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // Attempt to refresh the token (refresh_token cookie sent automatically)
        await axios.post(`${API_URL}/auth/web/refresh`, {}, {
          withCredentials: true // Send cookies
        });
        
        // New tokens are now in HTTP-only cookies
        // Process queued requests
        processQueue(null, null);
        isRefreshing = false;

        // Retry original request (new access_token cookie will be sent)
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed
        processQueue(refreshError as Error, null);
        isRefreshing = false;
        
        // Only redirect to login if we're NOT on a public route
        if (typeof window !== 'undefined') {
          const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/marketplace', '/become-seller'];
          const currentPath = window.location.pathname;
          
          // Don't redirect if already on login page or public route
          if (!publicRoutes.includes(currentPath)) {
            window.location.href = '/login';
          }
        }
        
        return Promise.reject(refreshError);
      }
    }

    // Handle other error statuses (only log critical errors)
    if (status === 500 && process.env.NODE_ENV === 'development') {
      console.error('💥 Server error:', url);
    }

    return Promise.reject(error);
  }
);

/**
 * Helper function to extract error messages from API responses
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Check for error_description (OAuth format)
    if (error.response?.data?.error_description) {
      return error.response.data.error_description;
    }
    // Check for message field
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    // Check for errors array (validation errors)
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      const firstError = Object.values(errors)[0];
      if (Array.isArray(firstError) && firstError.length > 0) {
        return firstError[0] as string;
      }
    }
    // Default to error message
    return error.message || 'An error occurred';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
};

/**
 * Helper to check if error is network related
 */
export const isNetworkError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return !error.response && error.message === 'Network Error';
  }
  return false;
};

export default apiClient;
