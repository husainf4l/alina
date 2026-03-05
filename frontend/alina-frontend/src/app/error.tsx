'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center mx-auto shadow-lg border-4 border-red-200 dark:border-red-700">
            <svg 
              className="w-16 h-16 text-red-600 dark:text-red-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Something Went Wrong
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            We encountered an unexpected error.
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Don't worry, our team has been notified and we're working on it.
          </p>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 mb-8 border-2 border-red-200 dark:border-red-700 text-left">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-3">
              Development Error Details:
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 overflow-auto">
              <p className="text-sm text-red-600 dark:text-red-400 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={reset}
            variant="default"
            size="lg"
            className="min-w-[200px]"
          >
            Try Again
          </Button>
          
          <Link href="/">
            <Button variant="outline" size="lg" className="min-w-[200px] w-full sm:w-auto">
              Go to Homepage
            </Button>
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
            Need Immediate Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                📧 Email Support
              </h4>
              <a 
                href="mailto:support@alina.com" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                support@alina.com
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                💬 Live Chat
              </h4>
              <Link 
                href="/support" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Open live chat
              </Link>
            </div>
          </div>
        </div>

        {/* Status Page Link */}
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-500">
          Check our <a href="https://status.alina.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">status page</a> for any ongoing issues.
        </div>
      </div>
    </div>
  );
}
