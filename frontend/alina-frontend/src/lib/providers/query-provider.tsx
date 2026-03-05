// React Query provider and configuration

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { queryClientConfig } from '@/lib/performance/cache-strategy';

// Lazy load devtools only in development
const ReactQueryDevtools =
  process.env.NODE_ENV === 'development'
    ? require('@tanstack/react-query-devtools').ReactQueryDevtools
    : () => null;

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient(queryClientConfig)
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
