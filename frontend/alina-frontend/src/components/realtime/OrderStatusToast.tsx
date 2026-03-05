// Order Status Update Toast Component
'use client';

import { useEffect, useState } from 'react';
import { useOrderStatusUpdates } from '@/hooks/useSignalR';
import type { OrderStatusUpdate } from '@/lib/signalr/notification.service';

export function OrderStatusToast() {
  const [toasts, setToasts] = useState<Array<OrderStatusUpdate & { id: string }>>([]);

  const { } = useOrderStatusUpdates((update) => {
    // Add new toast
    const toast = { ...update, id: Math.random().toString() };
    setToasts((prev) => [...prev, toast]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 5000);
  });

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-[320px] max-w-md animate-slide-in-right"
        >
          <div className="flex items-start gap-3">
            {/* Status Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                toast.status === 'COMPLETED'
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : toast.status === 'CANCELLED'
                  ? 'bg-red-100 dark:bg-red-900/30'
                  : toast.status === 'DELIVERED'
                  ? 'bg-blue-100 dark:bg-blue-900/30'
                  : 'bg-yellow-100 dark:bg-yellow-900/30'
              }`}
            >
              {toast.status === 'COMPLETED' && (
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {toast.status === 'CANCELLED' && (
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {toast.status === 'DELIVERED' && (
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
              )}
              {(toast.status === 'IN_PROGRESS' || toast.status === 'PENDING') && (
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Order #{toast.orderId.substring(0, 8)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {toast.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {new Date(toast.updatedAt).toLocaleTimeString()}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
