/**
 * API Response Caching Strategies
 * Optimizes API performance with intelligent caching
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * React Query default configuration with optimized caching
 */
export const queryClientConfig = {
  defaultOptions: {
    queries: {
      // Cache for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      
      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      
      // Retry failed requests
      retry: 2,
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Don't refetch on window focus for static data
      refetchOnWindowFocus: false,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
      
      // Don't refetch on mount if data is fresh
      refetchOnMount: false,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
    },
  },
};

/**
 * Cache keys for different data types
 * Helps organize and invalidate caches efficiently
 */
export const CacheKeys = {
  // User data
  currentUser: ['user', 'current'],
  userProfile: (username: string) => ['user', 'profile', username],
  
  // Marketplace
  gigs: (params?: Record<string, any>) => ['gigs', params],
  gigDetail: (id: string) => ['gig', id],
  categories: ['categories'],
  
  // Orders
  orders: (filter?: string) => ['orders', filter],
  orderDetail: (id: string) => ['order', id],
  
  // Messages
  conversations: ['conversations'],
  messages: (conversationId: string) => ['messages', conversationId],
  
  // Notifications
  notifications: ['notifications'],
  unreadCount: ['notifications', 'unread-count'],
  
  // Finance
  wallet: ['wallet'],
  transactions: (params?: Record<string, any>) => ['transactions', params],
  
  // Analytics
  analytics: (type: string, params?: Record<string, any>) => ['analytics', type, params],
} as const;

/**
 * Cache time configurations for different data types
 */
export const CacheDuration = {
  // Very static data - cache for 1 hour
  STATIC: 60 * 60 * 1000,
  
  // Semi-static data - cache for 15 minutes
  SEMI_STATIC: 15 * 60 * 1000,
  
  // Dynamic data - cache for 5 minutes
  DYNAMIC: 5 * 60 * 1000,
  
  // Real-time data - cache for 30 seconds
  REALTIME: 30 * 1000,
  
  // No cache - always fresh
  NONE: 0,
} as const;

/**
 * Prefetch strategy for anticipating user navigation
 */
export function prefetchRoute(queryClient: QueryClient, route: string): void {
  // Prefetch data based on route
  switch (route) {
    case '/dashboard':
      // Prefetch user stats, orders, notifications
      break;
    case '/marketplace':
      // Prefetch popular gigs, categories
      break;
    case '/messages':
      // Prefetch conversations
      break;
    // Add more routes as needed
  }
}

/**
 * Browser-level caching using Cache API
 */
export class BrowserCache {
  private cacheName = 'alina-api-cache-v1';

  /**
   * Cache an API response
   */
  async set(key: string, data: any, ttl: number = 5 * 60 * 1000): Promise<void> {
    if (typeof window === 'undefined' || !('caches' in window)) return;

    try {
      const cache = await caches.open(this.cacheName);
      const response = new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'X-Cache-Timestamp': Date.now().toString(),
          'X-Cache-TTL': ttl.toString(),
        },
      });
      
      await cache.put(key, response);
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }

  /**
   * Get cached data
   */
  async get(key: string): Promise<any | null> {
    if (typeof window === 'undefined' || !('caches' in window)) return null;

    try {
      const cache = await caches.open(this.cacheName);
      const response = await cache.match(key);
      
      if (!response) return null;

      // Check if cache is expired
      const timestamp = parseInt(response.headers.get('X-Cache-Timestamp') || '0');
      const ttl = parseInt(response.headers.get('X-Cache-TTL') || '0');
      
      if (Date.now() - timestamp > ttl) {
        await cache.delete(key);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.warn('Failed to get cached data:', error);
      return null;
    }
  }

  /**
   * Clear all cached data
   */
  async clear(): Promise<void> {
    if (typeof window === 'undefined' || !('caches' in window)) return;

    try {
      await caches.delete(this.cacheName);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
}

export const browserCache = new BrowserCache();
