'use client';

import { useEffect } from 'react';
import { Button } from './Button';

interface SessionTimeoutModalProps {
  /** Seconds remaining before automatic logout */
  secondsRemaining: number;
  /** Callback to extend the session */
  onExtend: () => void;
  /** Callback to logout immediately */
  onLogout: () => void;
}

/**
 * Session Timeout Warning Modal
 * 
 * Displays a warning when the user's session is about to expire,
 * giving them the option to extend or logout.
 */
export function SessionTimeoutModal({
  secondsRemaining,
  onExtend,
  onLogout,
}: SessionTimeoutModalProps) {
  // Format seconds as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Play warning sound effect (optional)
  useEffect(() => {
    // Only play sound when modal appears
    if (secondsRemaining > 0) {
      // You can add an audio element here if desired
      // const audio = new Audio('/sounds/warning.mp3');
      // audio.play().catch(() => {});
    }
  }, []);
  
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Modal */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-200">
          {/* Warning Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Session Expiring Soon
          </h2>
          
          {/* Message */}
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 leading-relaxed">
            Your session is about to expire due to inactivity. You will be automatically logged out in:
          </p>
          
          {/* Countdown Timer */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 mb-8 border-2 border-yellow-200 dark:border-yellow-700">
            <div className="text-6xl font-bold text-center bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              {formatTime(secondsRemaining)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
              minutes remaining
            </p>
          </div>
          
          {/* Info Message */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mb-6 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-300">
              💡 <strong>Tip:</strong> Any activity (clicking, typing, scrolling) will automatically extend your session.
            </p>
          </div>
          
          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={onExtend}
              variant="default"
              className="w-full py-4 text-lg font-semibold"
            >
              Stay Logged In
            </Button>
            
            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full py-4 text-lg font-semibold"
            >
              Logout Now
            </Button>
          </div>
          
          {/* Security Note */}
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-6">
            🔒 For your security, inactive sessions are automatically logged out after 30 minutes.
          </p>
        </div>
      </div>
    </>
  );
}
