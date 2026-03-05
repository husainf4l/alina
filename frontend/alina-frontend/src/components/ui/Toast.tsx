'use client';

import React, { useEffect, useState } from 'react';
import { useToast, Toast as ToastType } from '@/contexts/ToastContext';

const Toast: React.FC<{ toast: ToastType }> = ({ toast }) => {
  const { removeToast } = useToast();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => removeToast(toast.id), 300);
      }, toast.duration - 300);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, removeToast]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-gradient-to-br from-green-500 to-emerald-500 text-white';
      case 'error':
        return 'bg-gradient-to-br from-red-500 to-pink-500 text-white';
      case 'warning':
        return 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white';
      case 'info':
        return 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white';
      default:
        return 'bg-gray-900 text-white';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`
        ${getToastStyles()}
        ${isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'}
        backdrop-blur-xl shadow-2xl rounded-2xl p-4 pr-12 mb-3 
        flex items-center gap-3 min-w-[320px] max-w-md
        relative overflow-hidden
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {getIcon()}
      </div>

      {/* Message */}
      <p className="text-sm font-medium flex-1">{toast.message}</p>

      {/* Close button */}
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => removeToast(toast.id), 300);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Progress bar */}
      {toast.duration && toast.duration > 0 && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-white/30"
          style={{
            animation: `progress ${toast.duration}ms linear`,
          }}
        />
      )}
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
};
