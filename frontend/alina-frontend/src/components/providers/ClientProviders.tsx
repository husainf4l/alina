'use client';

import { type ReactNode, useState, useEffect } from 'react';
import { QueryProvider } from '@/lib/providers/query-provider';
import { AuthProvider } from '@/lib/providers/AuthProvider';
import { ToastProvider } from '@/contexts/ToastContext';
import { ToastContainer } from '@/components/ui/Toast';
import { OrderStatusToast } from '@/components/realtime/OrderStatusToast';
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard';
import { SecurityInitializer } from '@/components/security/SecurityInitializer';
import { GlobalA11yAnnouncer } from '@/components/accessibility/A11yAnnouncer';

/**
 * Client-side providers wrapper
 * Wraps all client components and context providers
 */
export function ClientProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent any React Query initialization during SSR
  if (!mounted) {
    return null; // Don't render anything until mounted
  }

  return (
    <QueryProvider>
      <AuthProvider>
        <ToastProvider>
          {children}
          <ToastContainer />
          <OrderStatusToast />
          <PerformanceDashboard />
          <SecurityInitializer />
          <GlobalA11yAnnouncer />
        </ToastProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
