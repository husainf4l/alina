/**
 * Web Vitals Performance Monitoring
 * Tracks Core Web Vitals for performance optimization
 */

export type Metric = {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
};

/**
 * Report Web Vitals to analytics
 * @param metric - The web vital metric to report
 */
export function reportWebVitals(metric: Metric): void {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
    });
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to your analytics service (Google Analytics, Vercel Analytics, etc.)
    // Example: window.gtag?.('event', metric.name, { value: metric.value });
  }

  // Optional: Send to custom API endpoint
  try {
    if (typeof window !== 'undefined' && 'sendBeacon' in navigator) {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
        url: window.location.href,
      });

      // Uncomment to send to your API
      // navigator.sendBeacon('/api/metrics', body);
    }
  } catch (error) {
    // Silently fail - don't impact user experience
    console.error('Failed to send web vitals:', error);
  }
}

/**
 * Performance mark for custom measurements
 */
export function performanceMark(name: string): void {
  if (typeof window !== 'undefined' && window.performance) {
    window.performance.mark(name);
  }
}

/**
 * Measure time between two performance marks
 */
export function performanceMeasure(name: string, startMark: string, endMark?: string): void {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      if (endMark) {
        window.performance.measure(name, startMark, endMark);
      } else {
        window.performance.measure(name, startMark);
      }

      const measure = window.performance.getEntriesByName(name)[0];
      if (measure && process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${name}: ${Math.round(measure.duration)}ms`);
      }
    } catch (error) {
      // Mark might not exist
      console.warn(`Performance mark ${startMark} not found`);
    }
  }
}

/**
 * Get Core Web Vitals thresholds
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
  INP: { good: 200, poor: 500 },   // Interaction to Next Paint
} as const;

/**
 * Rate a metric value
 */
export function rateMetric(name: keyof typeof WEB_VITALS_THRESHOLDS, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = WEB_VITALS_THRESHOLDS[name];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}
