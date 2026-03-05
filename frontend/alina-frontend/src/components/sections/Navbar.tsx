'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCategories } from '@/hooks';
import { useCurrentUser, useLogout } from '@/hooks/useAuth';
import type { Category } from '@/lib/api/types';
import { NotificationBadge } from '@/components/realtime/NotificationBadge';

// Public routes that don't need auth check
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password', '/', '/marketplace', '/become-seller'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { data: categories } = useCategories();
  
  // Skip auth fetch on public pages to prevent flashing
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const { data: currentUser } = useCurrentUser({ enabled: !isPublicRoute });
  const logout = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isProfileMenuOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-profile-menu]')) {
          setIsProfileMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileMenuOpen]);

  const handleLogout = async () => {
    await logout.mutateAsync();
    setIsProfileMenuOpen(false);
    router.push('/');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-2xl bg-white/90 border-b border-gray-200/80 shadow-lg shadow-gray-200/50' 
          : 'backdrop-blur-xl bg-white/70 border-b border-gray-200/40'
      }`}
      style={{ willChange: 'auto', transform: 'translateZ(0)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          
          {/* Logo - Apple Style */}
          <Link href="/" className="flex items-center space-x-3 group relative z-10">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-base">A</span>
              </div>
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">Alina</span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-12">
            <div className="flex items-center space-x-1 bg-gray-100/50 backdrop-blur-sm rounded-full p-1">
              
              {/* Explore Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 px-5 py-2 rounded-full text-[15px] font-medium flex items-center space-x-1.5 transition-all duration-200 hover:bg-white/80">
                  <span>Explore</span>
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mega Menu - Apple Style */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] backdrop-blur-3xl bg-white/95 rounded-3xl shadow-2xl border border-gray-200/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-2">
                      {categories?.slice(0, 8).map((category: Category) => (
                        <Link
                          key={category.id}
                          href={`/marketplace?category=${category.id}`}
                          className="group/item flex items-start p-4 rounded-2xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100/80 transition-all duration-200"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 text-[15px] truncate">{category.name}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{category.gigCount || 0} services</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200/60">
                      <Link
                        href="/marketplace"
                        className="group/all inline-flex items-center text-gray-900 hover:text-blue-600 font-semibold text-sm transition-colors"
                      >
                        Browse all categories
                        <svg className="w-4 h-4 ml-1 transition-transform group-hover/all:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/marketplace"
                className={`px-5 py-2 rounded-full text-[15px] font-medium transition-all duration-200 ${
                  pathname === '/marketplace'
                    ? 'text-gray-900 bg-white/80 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                Marketplace
              </Link>

              <Link
                href="/become-seller"
                className={`px-5 py-2 rounded-full text-[15px] font-medium transition-all duration-200 ${
                  pathname === '/become-seller'
                    ? 'text-gray-900 bg-white/80 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                Become Seller
              </Link>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            
            {/* Messages - Only show when logged in */}
            {currentUser && (
              <>
                <button 
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-xl transition-all relative hidden md:block"
                  aria-label="Messages"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
                </button>

                {/* Notifications - Real-time */}
                <NotificationBadge />
              </>
            )}

            {/* Profile/Auth */}
            {currentUser ? (
              <div className="relative ml-1" data-profile-menu>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                  }}
                  className="flex items-center space-x-2 p-1.5 pr-3 rounded-full hover:bg-gray-100/80 transition-all group"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 ring-2 ring-white">
                    <span className="text-white text-sm font-semibold">
                      {currentUser.fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 hidden md:block ${isProfileMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown - Apple Style */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 backdrop-blur-3xl bg-white/95 rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-gray-200/60 bg-gradient-to-br from-gray-50/50 to-transparent">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-lg font-semibold">
                            {currentUser.fullName?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 truncate">{currentUser.fullName || 'User'}</div>
                          <div className="text-xs text-gray-500 truncate mt-0.5">{currentUser.email}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-1.5">
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="font-medium">Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium">Settings</span>
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-200/60 py-1.5">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/80 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl text-[15px] font-medium transition-all duration-200 hover:bg-gray-100/80"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-full text-[15px] font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-xl transition-all ml-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/60 py-4 animate-in slide-in-from-top duration-200">
            <div className="space-y-1">
              <Link
                href="/marketplace"
                className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-100/80 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                href="/become-seller"
                className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-100/80 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become Seller
              </Link>
              {currentUser && (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-100/80 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50/80 rounded-xl transition-colors"
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}