// lib/performance.ts - Performance monitoring and optimization utilities

/**
 * Performance monitoring for API calls
 */
export class APIPerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  /**
   * Track API call duration
   */
  trackAPICall(endpoint: string, durationMs: number) {
    if (!this.metrics.has(endpoint)) {
      this.metrics.set(endpoint, []);
    }
    
    const metrics = this.metrics.get(endpoint)!;
    metrics.push(durationMs);
    
    // Keep only last 100 measurements
    if (metrics.length > 100) {
      metrics.shift();
    }
    
    // Log slow requests (>3 seconds)
    if (durationMs > 3000) {
      console.warn(`[Performance] Slow API call: ${endpoint} took ${durationMs}ms`);
    }
  }

  /**
   * Get average response time for endpoint
   */
  getAverageTime(endpoint: string): number {
    const metrics = this.metrics.get(endpoint);
    if (!metrics || metrics.length === 0) return 0;
    
    const sum = metrics.reduce((a, b) => a + b, 0);
    return sum / metrics.length;
  }

  /**
   * Get all metrics
   */
  getAllMetrics() {
    const result: Record<string, { avg: number; count: number }> = {};
    
    this.metrics.forEach((times, endpoint) => {
      const avg = times.reduce((a, b) => a + b, 0) / times.length;
      result[endpoint] = {
        avg: Math.round(avg),
        count: times.length,
      };
    });
    
    return result;
  }

  /**
   * Clear metrics
   */
  clear() {
    this.metrics.clear();
  }
}

// Singleton instance
export const apiPerformance = new APIPerformanceMonitor();

/**
 * Measure component render time
 */
export function measureComponentRender(componentName: string) {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (duration > 50) {
      console.warn(`[Performance] ${componentName} render took ${duration.toFixed(2)}ms`);
    }
  };
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Lazy load images with intersection observer
 */
export function setupLazyLoading() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}

/**
 * Prefetch critical resources
 */
export function prefetchResources(urls: string[]) {
  if (typeof window === 'undefined') return;

  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Memory usage monitoring (development only)
 */
export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return;
  }

  // @ts-ignore - performance.memory is not in all browsers
  const memory = (performance as any).memory;
  
  if (memory) {
    const usedMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
    const totalMB = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
    const limitMB = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
    
    console.log(`[Memory] Used: ${usedMB}MB / Total: ${totalMB}MB / Limit: ${limitMB}MB`);
    
    // Warn if using >80% of available memory
    const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
    if (usagePercent > 80) {
      console.warn(`[Memory] High memory usage: ${usagePercent.toFixed(1)}%`);
    }
  }
}

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric.name, metric.value);
  }

  // Send to analytics in production
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

/**
 * Cache management for better performance
 */
export class CacheManager {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private maxAge: number;

  constructor(maxAgeMs: number = 5 * 60 * 1000) {
    this.maxAge = maxAgeMs;
  }

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    const age = Date.now() - cached.timestamp;
    if (age > this.maxAge) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear() {
    this.cache.clear();
  }

  getSize(): number {
    return this.cache.size;
  }
}
