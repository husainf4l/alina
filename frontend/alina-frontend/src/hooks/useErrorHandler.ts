'use client';

import { useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { getErrorMessage } from '@/lib/api/client';

export const useErrorHandler = () => {
  const toast = useToast();

  const handleError = (error: unknown, customMessage?: string) => {
    const message = customMessage || getErrorMessage(error);
    toast.error(message);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught:', error);
    }
  };

  return { handleError };
};

// Hook for API call with automatic error handling
export const useApiCall = <T,>(
  apiFunction: () => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
    successMessage?: string;
    errorMessage?: string;
  }
) => {
  const toast = useToast();
  const { handleError } = useErrorHandler();

  const execute = async () => {
    try {
      const data = await apiFunction();
      
      if (options?.successMessage) {
        toast.success(options.successMessage);
      }
      
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
      
      return data;
    } catch (error) {
      handleError(error, options?.errorMessage);
      
      if (options?.onError) {
        options.onError(error);
      }
      
      throw error;
    }
  };

  return { execute };
};

// Global error handler for unhandled promise rejections
export const GlobalErrorHandler: React.FC = () => {
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      handleError(event.reason, 'An unexpected error occurred');
    };

    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleGlobalError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleGlobalError);
    };
  }, [handleError]);

  return null;
};
