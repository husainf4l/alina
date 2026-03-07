'use client';

import { useState } from 'react';
import { useRegister } from '@/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';
import { getErrorMessage, logError } from '@/lib/utils/errors';
import { useToast } from '@/contexts/ToastContext';
import { validateEmail, validatePassword, validateUsername, validatePasswordMatch } from '@/lib/utils/validation';
import { initiateGoogleOAuth, isGoogleOAuthEnabled } from '@/lib/oauth/google';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [accountType, setAccountType] = useState<'client' | 'freelancer'>('client');
  
  const router = useRouter();
  const register = useRegister();
  const toast = useToast();

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    terms: ''
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ email: '', username: '', password: '', confirmPassword: '', terms: '' });
    
    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setErrors(prev => ({ ...prev, email: emailValidation.error || '' }));
      toast.error(emailValidation.error || 'Invalid email');
      return;
    }
    
    // Validate username
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      setErrors(prev => ({ ...prev, username: usernameValidation.error || '' }));
      toast.error(usernameValidation.error || 'Invalid username');
      return;
    }
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setErrors(prev => ({ ...prev, password: passwordValidation.error || '' }));
      toast.error(passwordValidation.error || 'Invalid password');
      return;
    }
    
    // Validate password match
    const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);
    if (!passwordMatchValidation.isValid) {
      setErrors(prev => ({ ...prev, confirmPassword: passwordMatchValidation.error || '' }));
      toast.error(passwordMatchValidation.error || 'Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setErrors(prev => ({ ...prev, terms: 'You must agree to the terms and conditions' }));
      toast.error('You must agree to the terms and conditions');
      return;
    }

    try {
      await register.mutateAsync({ email, username, password });
      toast.success('Registration successful! Please log in.');
      router.push('/login?registered=true');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      logError(error, { action: 'register', email, username });
    }
  };

  const handleGoogleRegister = () => {
    if (!isGoogleOAuthEnabled()) {
      toast.error('Google Sign-In is not configured. Please contact support.');
      return;
    }
    
    initiateGoogleOAuth({
      onError: (error) => {
        toast.error(error.message);
        logError(error, { action: 'google-oauth-register' });
      },
    });
  };

  const passwordStrength = () => {
    const validation = validatePassword(password);
    return validation.strength;
  };

  const getStrengthColor = () => {
    const strength = passwordStrength();
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-warning-500';
    if (strength <= 75) return 'bg-primary-500';
    return 'bg-success-500';
  };

  const getStrengthText = () => {
    const strength = passwordStrength();
    if (strength <= 25) return 'Weak';
    if (strength <= 50) return 'Fair';
    if (strength <= 75) return 'Good';
    return 'Strong';
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex pt-16 bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
        {/* Left Side - Hero Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10"></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 animate-fade-in-up">
            <div className="max-w-md">
              <h1 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight animate-slide-in-left">
                Start Your Journey
              </h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed animate-slide-in-left animation-delay-200">
                Join our growing community of freelancers and clients. Build your career or find the perfect talent for your project.
              </p>
              <div className="space-y-5 animate-slide-in-left animation-delay-400">
                <div className="flex items-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium text-white/90">Free to join, no hidden fees</span>
                </div>
                <div className="flex items-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg animate-bounce" style={{ animationDelay: '0.7s' }}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium text-white/90">Get started in 30 seconds</span>
                </div>
                <div className="flex items-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg animate-bounce" style={{ animationDelay: '0.9s' }}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium text-white/90">Access to thousands of opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-md space-y-6 animate-fade-in-up animation-delay-300">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3 tracking-tight animate-slide-in-right">
                Create your account
              </h2>
              <p className="text-lg text-gray-600 animate-slide-in-right animation-delay-100">
                Join thousands of freelancers and clients
              </p>
            </div>

            {/* Account Type Toggle */}
            <div className="animate-slide-in-right animation-delay-200">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType('client')}
                  className={`p-4 border-2 rounded-2xl transition-all duration-300 font-medium transform hover:scale-105 active:scale-95 ${
                    accountType === 'client'
                      ? 'border-gray-900 bg-gray-900 text-white shadow-lg shadow-gray-900/25'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="font-semibold text-sm">Hire Talent</div>
                  <div className="text-xs opacity-75 mt-1">Find freelancers for projects</div>
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType('freelancer')}
                  className={`p-4 border-2 rounded-2xl transition-all duration-300 font-medium transform hover:scale-105 active:scale-95 ${
                    accountType === 'freelancer'
                      ? 'border-gray-900 bg-gray-900 text-white shadow-lg shadow-gray-900/25'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="font-semibold text-sm">Offer Services</div>
                  <div className="text-xs opacity-75 mt-1">Start your freelance career</div>
                </button>
              </div>
            </div>

          <form className="space-y-5 animate-slide-in-right animation-delay-300" onSubmit={handleRegister}>
            {/* Username Field */}
            <div className="group">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-900 mb-3 transition-colors group-focus-within:text-gray-700">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-6 py-4 border-2 border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 bg-white hover:border-gray-300 focus:scale-[1.02] focus:shadow-lg"
                  placeholder="Choose a username"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3 transition-colors group-focus-within:text-gray-700">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-6 py-4 border-2 border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 bg-white hover:border-gray-300 focus:scale-[1.02] focus:shadow-lg"
                  placeholder="you@example.com"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-3 transition-colors group-focus-within:text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                 required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: '' });
                  }}
                  className="appearance-none block w-full px-6 py-4 pr-12 border-2 border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 bg-white hover:border-gray-300 focus:scale-[1.02] focus:shadow-lg"
                  placeholder="Create a strong password"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {password && (
                <div className="mt-3 animate-fade-in">
                  <div className="flex justify-between text-xs text-gray-700 mb-2">
                    <span className="font-medium">Password strength</span>
                    <span className={`font-bold ${getStrengthColor().includes('red') ? 'text-red-500' : getStrengthColor().includes('warning') ? 'text-yellow-500' : getStrengthColor().includes('primary') ? 'text-blue-500' : 'text-green-500'}`}>{getStrengthText()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ease-out ${getStrengthColor()}`}
                      style={{ width: `${passwordStrength()}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="mt-2 text-sm font-medium text-red-600 animate-shake">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="group">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-3 transition-colors group-focus-within:text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: '' });
                }}
                className="appearance-none block w-full px-6 py-4 border-2 border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 bg-white hover:border-gray-300 focus:scale-[1.02] focus:shadow-lg"
                placeholder="Confirm your password"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm font-medium text-red-600 animate-shake">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="animate-fade-in animation-delay-400">
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    setErrors({ ...errors, terms: '' });
                  }}
                  className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded transition-all duration-200 hover:scale-110 mt-1"
                />
                <label htmlFor="terms" className="ml-2 block text-sm font-medium text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-gray-900 hover:text-gray-700 font-semibold underline underline-offset-4 decoration-2 hover:decoration-gray-700 transition-all duration-200">
                    Terms &amp; Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-gray-900 hover:text-gray-700 font-semibold underline underline-offset-4 decoration-2 hover:decoration-gray-700 transition-all duration-200">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="mt-2 text-sm font-medium text-red-600 animate-shake">{errors.terms}</p>
              )}
            </div>

            {/* Error Message */}
            {register.isError && (
              <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-4 animate-shake">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm font-medium text-red-800">
                    {register.error?.message || 'Registration failed. Please try again.'}
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={register.isPending}
              className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {register.isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                <span className="relative z-10">Create account</span>
              )}
            </button>

            {/* Divider */}
            <div className="relative animate-fade-in animation-delay-500">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or sign up with</span>
              </div>
            </div>

            {/* Social Register */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full flex justify-center items-center px-6 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-300 font-medium shadow-sm hover:shadow-md hover:scale-105 active:scale-95 group animate-fade-in animation-delay-600"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <svg className="w-5 h-5 mr-2 relative z-10" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="relative z-10">Continue with Google</span>
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center animate-fade-in animation-delay-700">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-gray-900 hover:text-gray-700 transition-all duration-200 underline underline-offset-4 decoration-2 hover:decoration-gray-700">
                Sign in
              </Link>
            </p>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-8 text-center animate-fade-in animation-delay-800">
            <p className="text-xs text-gray-500 font-medium">
              No credit card required • Free forever plan • Get started in 30 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
