'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';
import { useForgotPassword } from '@/hooks/useAuth';
import { getErrorMessage, logError } from '@/lib/utils/errors';
import { useToast } from '@/contexts/ToastContext';
import { validateEmail } from '@/lib/utils/validation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const forgotPassword = useForgotPassword();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      toast.error(emailValidation.error || 'Invalid email');
      return;
    }
    
    try {
      await forgotPassword.mutateAsync({ email });
      setSubmitted(true);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      logError(error, { action: 'forgot-password', email });
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-b from-gray-50 to-white px-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>

              {/* Success Message */}
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-4 tracking-tight">
                Check your email
              </h2>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                We've sent a password reset link to
              </p>
              <p className="text-gray-900 font-semibold text-center mb-8 text-lg">
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
                    <span>Click the reset password link in the email</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">3.</span>
                    <span>The link will expire in 1 hour for security</span>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-semibold rounded-2xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
                >
                  Back to login
                </Link>
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full flex justify-center items-center px-6 py-4 border-2 border-gray-200 text-base font-semibold rounded-2xl text-gray-900 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200"
                >
                  Resend email
                </button>
              </div>

              {/* Support */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive the email?{' '}
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex pt-16 bg-gradient-to-b from-gray-50 to-white">
        {/* Left Side - Hero */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
            <div className="max-w-md">
              <h1 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight">Forgot Password?</h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                No worries! We'll send you instructions to reset your password via email.
              </p>
              <div className="space-y-5">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium text-white/90">Secure password reset process</span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium text-white/90">Link expires in 1 hour</span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="font-medium text-white/90">Check your email inbox</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3 tracking-tight">
                Reset password
              </h2>
              <p className="text-lg text-gray-600">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-6 py-4 border-2 border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="you@example.com"
                />
              </div>

              {/* Error Message */}
              {forgotPassword.isError && (
                <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm font-medium text-red-800">
                      {forgotPassword.error?.message || 'Failed to send reset email. Please try again.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={forgotPassword.isPending}
                className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-semibold rounded-2xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                {forgotPassword.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending reset link...
                  </>
                ) : (
                  'Send reset link'
                )}
              </button>

              {/* Back to Login */}
              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to login
                </Link>
              </div>
            </form>

            {/* Help */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500 font-medium">
                Remember your password?{' '}
                <Link href="/register" className="text-gray-900 hover:text-gray-700 underline underline-offset-4 decoration-2">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
