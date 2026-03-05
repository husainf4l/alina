'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';
import { useVerifyEmail, useResendVerification } from '@/hooks/useAuth';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [errorMessage, setErrorMessage] = useState('');
  
  const verifyEmail = useVerifyEmail();
  const resendVerification = useResendVerification();

  useEffect(() => {
    if (token) {
      // Automatically verify when token is present
      verifyEmail.mutateAsync({ token })
        .then(() => {
          setVerificationStatus('success');
          setTimeout(() => {
            router.push('/login?verified=true');
          }, 3000);
        })
        .catch((error: any) => {
          setVerificationStatus('error');
          setErrorMessage(error?.message || 'Verification failed. The link may have expired.');
        });
    } else if (!email) {
      // No token or email, redirect to register
      router.push('/register');
    }
  }, [token, email, router]);

  const handleResend = async () => {
    if (!email) return;
    
    try {
      await resendVerification.mutateAsync({ email });
    } catch (error) {
      console.error('Failed to resend verification email:', error);
    }
  };

  // Success State
  if (verificationStatus === 'success') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-b from-gray-50 to-white px-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Success Message */}
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-4 tracking-tight">
                Email verified!
              </h2>
              <p className="text-gray-600 text-center mb-8 leading-relaxed">
                Your email has been successfully verified. You can now log in to your account.
              </p>

              {/* Redirect Info */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-6">
                <p className="text-sm text-gray-700 text-center">
                  Redirecting to login page in 3 seconds...
                </p>
              </div>

              {/* Action Button */}
              <Link
                href="/login"
                className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-semibold rounded-2xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                Go to login
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error State
  if (verificationStatus === 'error') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-b from-gray-50 to-white px-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              {/* Error Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              {/* Error Message */}
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-4 tracking-tight">
                Verification failed
              </h2>
              <p className="text-gray-600 text-center mb-8 leading-relaxed">
                {errorMessage}
              </p>

              {/* Actions */}
              <div className="space-y-3">
                {email && (
                  <button
                    onClick={handleResend}
                    disabled={resendVerification.isPending}
                    className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-semibold rounded-2xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
                  >
                    {resendVerification.isPending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Resend verification email'
                    )}
                  </button>
                )}
                <Link
                  href="/register"
                  className="w-full flex justify-center items-center px-6 py-4 border-2 border-gray-200 text-base font-semibold rounded-2xl text-gray-900 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200"
                >
                  Create new account
                </Link>
              </div>

              {/* Support */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Need help?{' '}
                  <Link href="/help" className="font-semibold text-gray-900 hover:text-gray-700 underline underline-offset-4 decoration-2">
                    Contact support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Awaiting Verification State (no token)
  if (!token && email) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-b from-gray-50 to-white px-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              {/* Email Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Message */}
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-4 tracking-tight">
                Check your email
              </h2>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                We've sent a verification link to
              </p>
              <p className="text-gray-900 font-semibold text-center mb-8 text-lg break-all">
                {email}
              </p>

              {/* Instructions */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  What to do next:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">1.</span>
                    <span>Check your email inbox and spam folder</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">2.</span>
                    <span>Click the verification link in the email</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">3.</span>
                    <span>The link will expire in 24 hours</span>
                  </li>
                </ul>
              </div>

              {/* Resend Option */}
              {resendVerification.isSuccess ? (
                <div className="rounded-2xl bg-green-50 border-2 border-green-200 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm font-medium text-green-800">
                      Verification email sent! Check your inbox.
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={resendVerification.isPending}
                  className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-semibold rounded-2xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 mb-4"
                >
                  {resendVerification.isPending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Resend verification email
                    </>
                  )}
                </button>
              )}

              {/* Error Message */}
              {resendVerification.isError && (
                <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm font-medium text-red-800">
                      {resendVerification.error?.message || 'Failed to resend email. Please try again.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="space-y-3 text-center">
                <Link
                  href="/login"
                  className="block text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Already verified? Log in
                </Link>
                <div className="text-sm text-gray-600">
                  Wrong email?{' '}
                  <Link href="/register" className="font-semibold text-gray-900 hover:text-gray-700 underline underline-offset-4 decoration-2">
                    Create new account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Loading State (verifying)
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-b from-gray-50 to-white px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            {/* Loading Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="animate-spin h-10 w-10 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>

            {/* Loading Message */}
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-4 tracking-tight">
              Verifying email...
            </h2>
            <p className="text-gray-600 text-center leading-relaxed">
              Please wait while we verify your email address.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
