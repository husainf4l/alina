/**
 * Rate Limiting Utilities
 * Client-side rate limiting to prevent abuse
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

/**
 * Client-side rate limiter
 * Prevents too many requests from the same client
 */
export class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 }) {
    this.config = config;
    
    // Clean up expired entries every minute
    if (typeof window !== 'undefined') {
      setInterval(() => this.cleanup(), 60000);
    }
  }

  /**
   * Check if request should be allowed
   */
  check(key: string): boolean {
    const now = Date.now();
    const entry = this.limits.get(key);

    // No previous requests or window expired
    if (!entry || now > entry.resetTime) {
      this.limits.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs,
      });
      return true;
    }

    // Within window
    if (entry.count < this.config.maxRequests) {
      entry.count++;
      return true;
    }

    // Rate limit exceeded
    return false;
  }

  /**
   * Get remaining requests for a key
   */
  getRemaining(key: string): number {
    const entry = this.limits.get(key);
    if (!entry || Date.now() > entry.resetTime) {
      return this.config.maxRequests;
    }
    return Math.max(0, this.config.maxRequests - entry.count);
  }

  /**
   * Get time until reset (in milliseconds)
   */
  getResetTime(key: string): number {
    const entry = this.limits.get(key);
    if (!entry) return 0;
    return Math.max(0, entry.resetTime - Date.now());
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }

  /**
   * Reset rate limit for a specific key
   */
  reset(key: string): void {
    this.limits.delete(key);
  }
}

/**
 * Predefined rate limiters for different actions
 */
export const rateLimiters = {
  // Login attempts: 5 per 15 minutes
  login: new RateLimiter({ maxRequests: 5, windowMs: 15 * 60 * 1000 }),

  // Registration: 3 per hour
  registration: new RateLimiter({ maxRequests: 3, windowMs: 60 * 60 * 1000 }),

  // Password reset: 3 per hour
  passwordReset: new RateLimiter({ maxRequests: 3, windowMs: 60 * 60 * 1000 }),

  // API calls: 100 per minute
  api: new RateLimiter({ maxRequests: 100, windowMs: 60 * 1000 }),

  // File uploads: 10 per 5 minutes
  fileUpload: new RateLimiter({ maxRequests: 10, windowMs: 5 * 60 * 1000 }),

  // Message sending: 20 per minute
  messaging: new RateLimiter({ maxRequests: 20, windowMs: 60 * 1000 }),

  // Search queries: 30 per minute
  search: new RateLimiter({ maxRequests: 30, windowMs: 60 * 1000 }),
};

/**
 * Rate limit middleware for API calls
 */
export function withRateLimit<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  limiter: RateLimiter,
  key: string
): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (!limiter.check(key)) {
      const resetTime = limiter.getResetTime(key);
      const resetInSeconds = Math.ceil(resetTime / 1000);
      
      throw new Error(
        `Rate limit exceeded. Please try again in ${resetInSeconds} seconds.`
      );
    }

    return fn(...args);
  }) as T;
}

/**
 * Debounced rate limiter
 * Useful for search inputs, form submissions, etc.
 */
export function createDebouncedRateLimiter(
  callback: (...args: any[]) => void,
  delay: number = 500
): (...args: any[]) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Throttled rate limiter
 * Ensures function is called at most once per interval
 */
export function createThrottledRateLimiter(
  callback: (...args: any[]) => void,
  interval: number = 1000
): (...args: any[]) => void {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= interval) {
      callback(...args);
      lastCall = now;
    } else {
      // Schedule for later
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        callback(...args);
        lastCall = Date.now();
        timeoutId = null;
      }, interval - timeSinceLastCall);
    }
  };
}

/**
 * Track failed attempts (e.g., login failures)
 */
export class FailureTracker {
  private failures: Map<string, { count: number; lockUntil: number }> = new Map();
  private maxAttempts: number;
  private lockDuration: number;

  constructor(maxAttempts: number = 5, lockDurationMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.lockDuration = lockDurationMs;
  }

  /**
   * Record a failed attempt
   */
  recordFailure(key: string): void {
    const entry = this.failures.get(key) || { count: 0, lockUntil: 0 };
    entry.count++;

    if (entry.count >= this.maxAttempts) {
      entry.lockUntil = Date.now() + this.lockDuration;
    }

    this.failures.set(key, entry);
  }

  /**
   * Check if key is locked
   */
  isLocked(key: string): boolean {
    const entry = this.failures.get(key);
    if (!entry) return false;

    if (Date.now() < entry.lockUntil) {
      return true;
    }

    // Lock expired, reset
    this.failures.delete(key);
    return false;
  }

  /**
   * Get remaining attempts
   */
  getRemainingAttempts(key: string): number {
    const entry = this.failures.get(key);
    if (!entry) return this.maxAttempts;
    return Math.max(0, this.maxAttempts - entry.count);
  }

  /**
   * Get lock time remaining (in seconds)
   */
  getLockTimeRemaining(key: string): number {
    const entry = this.failures.get(key);
    if (!entry) return 0;
    return Math.max(0, Math.ceil((entry.lockUntil - Date.now()) / 1000));
  }

  /**
   * Reset failures for a key (after successful action)
   */
  reset(key: string): void {
    this.failures.delete(key);
  }
}

/**
 * Login failure tracker
 */
export const loginFailureTracker = new FailureTracker(5, 15 * 60 * 1000);
