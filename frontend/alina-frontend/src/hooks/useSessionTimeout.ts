import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogout } from './useAuth';

interface SessionTimeoutConfig {
  /** Idle timeout in milliseconds (default: 30 minutes) */
  idleTimeout?: number;
  /** Absolute session timeout in milliseconds (default: 24 hours) */
  absoluteTimeout?: number;
  /** Warning time before logout in milliseconds (default: 2 minutes) */
  warningTime?: number;
  /** Whether to enable session timeout (default: true) */
  enabled?: boolean;
}

interface SessionTimeoutState {
  /** Whether a timeout warning is being shown */
  showWarning: boolean;
  /** Seconds remaining before automatic logout */
  secondsRemaining: number;
  /** Extends the session by resetting idle timer */
  extendSession: () => void;
  /** Manually trigger logout */
  logout: () => void;
}

const DEFAULT_CONFIG: Required<SessionTimeoutConfig> = {
  idleTimeout: 30 * 60 * 1000, // 30 minutes
  absoluteTimeout: 24 * 60 * 60 * 1000, // 24 hours
  warningTime: 2 * 60 * 1000, // 2 minutes
  enabled: true,
};

/**
 * Session Timeout Hook
 * 
 * Monitors user activity and handles automatic logout after:
 * 1. Idle timeout: No user activity for specified duration
 * 2. Absolute timeout: Maximum session duration regardless of activity
 * 
 * Shows a warning modal before logout to allow session extension.
 * 
 * @example
 * ```tsx
 * function App() {
 *   const { showWarning, secondsRemaining, extendSession, logout } = useSessionTimeout({
 *     idleTimeout: 30 * 60 * 1000, // 30 minutes
 *     absoluteTimeout: 24 * 60 * 60 * 1000, // 24 hours
 *   });
 * 
 *   if (showWarning) {
 *     return <SessionTimeoutModal seconds={secondsRemaining} onExtend={extendSession} />;
 *   }
 * }
 * ```
 */
export function useSessionTimeout(config: SessionTimeoutConfig = {}): SessionTimeoutState {
  const {
    idleTimeout,
    absoluteTimeout,
    warningTime,
    enabled,
  } = { ...DEFAULT_CONFIG, ...config };

  const router = useRouter();
  const logout = useLogout();
  
  const [showWarning, setShowWarning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const absoluteTimerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartTimeRef = useRef<number>(Date.now());
  
  /**
   * Reset idle timer when user activity is detected
   */
  const resetIdleTimer = () => {
    if (!enabled) return;
    
    // Clear existing timers
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    
    // Hide warning if showing
    setShowWarning(false);
    
    // Check if absolute timeout has passed
    const sessionDuration = Date.now() - sessionStartTimeRef.current;
    if (sessionDuration >= absoluteTimeout) {
      handleLogout('Session expired (maximum duration reached)');
      return;
    }
    
    // Set warning timer (show warning before idle timeout)
    const timeUntilWarning = idleTimeout - warningTime;
    warningTimerRef.current = setTimeout(() => {
      showTimeoutWarning();
    }, timeUntilWarning);
    
    // Set idle timeout timer
    idleTimerRef.current = setTimeout(() => {
      handleLogout('Session expired (idle timeout)');
    }, idleTimeout);
  };
  
  /**
   * Show timeout warning with countdown
   */
  const showTimeoutWarning = () => {
    setShowWarning(true);
    setSecondsRemaining(Math.floor(warningTime / 1000));
    
    // Start countdown
    countdownIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  /**
   * Handle logout with optional reason
   */
  const handleLogout = async (reason?: string) => {
    if (reason) {
      console.log('Session timeout:', reason);
    }
    
    // Clear all timers
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (absoluteTimerRef.current) clearTimeout(absoluteTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    
    try {
      await logout.mutateAsync();
      router.push('/login?timeout=true');
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/login?timeout=true');
    }
  };
  
  /**
   * Extend session by resetting idle timer
   */
  const extendSession = () => {
    resetIdleTimer();
  };
  
  /**
   * Set up activity listeners
   */
  useEffect(() => {
    if (!enabled) return;
    
    // Activity events to monitor
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];
    
    // Throttle activity detection to avoid excessive timer resets
    let lastActivity = Date.now();
    const throttleDelay = 1000; // 1 second
    
    const handleActivity = () => {
      const now = Date.now();
      if (now - lastActivity > throttleDelay) {
        lastActivity = now;
        resetIdleTimer();
      }
    };
    
    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });
    
    // Initialize timers
    resetIdleTimer();
    
    // Set absolute timeout
    const remainingAbsoluteTime = absoluteTimeout - (Date.now() - sessionStartTimeRef.current);
    if (remainingAbsoluteTime > 0) {
      absoluteTimerRef.current = setTimeout(() => {
        handleLogout('Session expired (maximum duration reached)');
      }, remainingAbsoluteTime);
    } else {
      handleLogout('Session expired (maximum duration reached)');
    }
    
    // Cleanup
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (absoluteTimerRef.current) clearTimeout(absoluteTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [enabled, idleTimeout, absoluteTimeout, warningTime]);
  
  /**
   * Handle visibility change (browser tab hidden/shown)
   * When user returns to tab, check if session has expired
   */
  useEffect(() => {
    if (!enabled) return;
    
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // User returned to tab, check session validity
        const sessionDuration = Date.now() - sessionStartTimeRef.current;
        if (sessionDuration >= absoluteTimeout) {
          handleLogout('Session expired (maximum duration reached)');
        } else {
          // Reset idle timer as user has returned
          resetIdleTimer();
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, absoluteTimeout]);
  
  return {
    showWarning,
    secondsRemaining,
    extendSession,
    logout: () => handleLogout('User initiated logout'),
  };
}
