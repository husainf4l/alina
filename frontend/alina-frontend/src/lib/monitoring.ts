// lib/monitoring.ts - Centralized monitoring and error tracking

interface MonitoringConfig {
  enabled: boolean;
  environment: string;
  sentryDsn?: string;
  gaId?: string;
}

class MonitoringService {
  private config: MonitoringConfig;
  private initialized = false;

  constructor() {
    this.config = {
      enabled: process.env.NODE_ENV === 'production',
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
      sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    };
  }

  /**
   * Initialize monitoring services
   */
  async initialize() {
    if (this.initialized || !this.config.enabled) return;

    try {
      // Initialize Sentry (if configured)
      if (this.config.sentryDsn) {
        await this.initializeSentry();
      }

      // Initialize Google Analytics (if configured)
      if (this.config.gaId) {
        this.initializeGA();
      }

      this.initialized = true;
      console.log('[Monitoring] Services initialized');
    } catch (error) {
      console.error('[Monitoring] Initialization failed:', error);
    }
  }

  /**
   * Initialize Sentry error tracking
   */
  private async initializeSentry() {
    // Note: Install @sentry/nextjs first
    // npm install --save @sentry/nextjs
    
    /*
    const Sentry = await import('@sentry/nextjs');
    
    Sentry.init({
      dsn: this.config.sentryDsn,
      environment: this.config.environment,
      tracesSampleRate: 0.1,
      
      // Don't capture errors in development
      integrations: [
        new Sentry.BrowserTracing(),
      ],
      
      // Filter out sensitive data
      beforeSend(event) {
        // Remove sensitive headers
        if (event.request?.headers) {
          delete event.request.headers['Authorization'];
          delete event.request.headers['Cookie'];
        }
        
        // Remove sensitive query params
        if (event.request?.query_string) {
          const params = new URLSearchParams(event.request.query_string);
          if (params.has('token')) params.delete('token');
          if (params.has('password')) params.delete('password');
          event.request.query_string = params.toString();
        }
        
        return event;
      },
    });
    */
  }

  /**
   * Initialize Google Analytics
   */
  private initializeGA() {
    if (typeof window === 'undefined') return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.gaId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', this.config.gaId, {
      page_path: window.location.pathname,
    });

    // Make gtag available globally
    (window as any).gtag = gtag;
  }

  /**
   * Track page view
   */
  trackPageView(url: string) {
    if (!this.initialized || typeof window === 'undefined') return;

    if ((window as any).gtag) {
      (window as any).gtag('config', this.config.gaId, {
        page_path: url,
      });
    }
  }

  /**
   * Track custom event
   */
  trackEvent(eventName: string, params?: Record<string, any>) {
    if (!this.initialized || typeof window === 'undefined') return;

    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }

    // Also log to console in development
    if (this.config.environment === 'development') {
      console.log('[Analytics]', eventName, params);
    }
  }

  /**
   * Capture error
   */
  captureError(error: Error, context?: Record<string, any>) {
    if (!this.initialized) {
      console.error('[Error]', error, context);
      return;
    }

    // Log to Sentry
    /*
    const Sentry = require('@sentry/nextjs');
    Sentry.captureException(error, {
      contexts: context,
    });
    */

    // Also log to console in development
    if (this.config.environment === 'development') {
      console.error('[Error]', error, context);
    }
  }

  /**
   * Capture message/warning
   */
  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    if (!this.initialized) {
      const logMethod = level === 'warning' ? 'warn' : level;
      console[logMethod]('[Message]', message);
      return;
    }

    // Log to Sentry
    /*
    const Sentry = require('@sentry/nextjs');
    Sentry.captureMessage(message, level);
    */

    if (this.config.environment === 'development') {
      const logMethod = level === 'warning' ? 'warn' : level;
      console[logMethod]('[Message]', message);
    }
  }

  /**
   * Track user
   */
  identifyUser(userId: string, traits?: Record<string, any>) {
    if (!this.initialized) return;

    // Set user context in Sentry
    /*
    const Sentry = require('@sentry/nextjs');
    Sentry.setUser({
      id: userId,
      ...traits,
    });
    */

    // Set user in GA
    if ((window as any).gtag) {
      (window as any).gtag('set', { user_id: userId });
    }
  }

  /**
   * Performance monitoring
   */
  trackTiming(category: string, variable: string, timeMs: number) {
    if (!this.initialized || typeof window === 'undefined') return;

    if ((window as any).gtag) {
      (window as any).gtag('event', 'timing_complete', {
        name: variable,
        value: timeMs,
        event_category: category,
      });
    }
  }
}

// Export singleton instance
export const monitoring = new MonitoringService();

// React hook for monitoring
export function useMonitoring() {
  return {
    trackEvent: (eventName: string, params?: Record<string, any>) => 
      monitoring.trackEvent(eventName, params),
    trackPageView: (url: string) => 
      monitoring.trackPageView(url),
    captureError: (error: Error, context?: Record<string, any>) => 
      monitoring.captureError(error, context),
  };
}

// Error boundary helper
export function logErrorToMonitoring(error: Error, errorInfo: React.ErrorInfo) {
  monitoring.captureError(error, {
    componentStack: errorInfo.componentStack,
  });
}

// Declare global window type
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}
