'use client';

import { useCurrentUser } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';
import { SessionTimeoutModal } from '@/components/ui/SessionTimeoutModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: string;
  fallbackUrl?: string;
  /** Disable session timeout for this route (e.g., for public pages) */
  disableSessionTimeout?: boolean;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requiredRole,
  fallbackUrl = '/login',
  disableSessionTimeout = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useCurrentUser();
  
  // Session timeout (only enabled for authenticated routes)
  const { showWarning, secondsRemaining, extendSession, logout } = useSessionTimeout({
    enabled: requireAuth && !disableSessionTimeout,
    idleTimeout: 30 * 60 * 1000, // 30 minutes
    absoluteTimeout: 24 * 60 * 60 * 1000, // 24 hours
    warningTime: 2 * 60 * 1000, // 2 minutes warning
  });

  useEffect(() => {
    if (!isLoading) {
      // Check if authentication is required
      // With HTTP-only cookies, we check if the /auth/me call succeeded
      if (requireAuth && (isError || !user)) {
        router.push(fallbackUrl);
        return;
      }

      // Check if user has required role
      if (requiredRole && user && user.role !== requiredRole) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isLoading, user, isError, requireAuth, requiredRole, router, fallbackUrl]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If auth is required but user is not authenticated, don't render
  if (requireAuth && (isError || !user)) {
    return null;
  }

  // If role is required but user doesn't have it, don't render
  if (requiredRole && user && user.role !== requiredRole) {
    return null;
  }

  return (
    <>
      {children}
      
      {/* Session Timeout Warning Modal */}
      {showWarning && (
        <SessionTimeoutModal
          secondsRemaining={secondsRemaining}
          onExtend={extendSession}
          onLogout={logout}
        />
      )}
    </>
  );
}
