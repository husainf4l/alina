'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'order' | 'message' | 'payment' | 'review' | 'system';
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Mock data - Replace with actual API calls
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'New Order Received',
      description: 'John Smith placed an order for "Custom Web Application"',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isRead: false,
      actionUrl: '/orders/4',
      actionLabel: 'View Order',
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      description: 'Sarah Johnson sent you a message about your logo design project',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      isRead: false,
      actionUrl: '/messages?conversation=user1',
      actionLabel: 'Reply',
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      description: 'You received $500 for "Modern Website Development"',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      isRead: true,
      actionUrl: '/dashboard',
      actionLabel: 'View Earnings',
    },
    {
      id: '4',
      type: 'review',
      title: 'New Review',
      description: 'Emily Davis left a 5-star review on your SEO service',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isRead: true,
      actionUrl: '/profile/me',
      actionLabel: 'View Review',
    },
    {
      id: '5',
      type: 'order',
      title: 'Order Delivered',
      description: 'Mike Chen delivered your website project',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      isRead: true,
      actionUrl: '/orders/2',
      actionLabel: 'Review Delivery',
    },
    {
      id: '6',
      type: 'system',
      title: 'Welcome to Alina!',
      description: 'Complete your profile to start receiving orders',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      isRead: true,
      actionUrl: '/settings',
      actionLabel: 'Complete Profile',
    },
  ]);

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter((n) => !n.isRead);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        );
      case 'message':
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'payment':
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'review':
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        );
      case 'system':
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <ProtectedRoute>
      <PageTransition>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-6">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">Notifications</h1>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <p className="text-gray-600">
                  {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : "You're all caught up!"}
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setFilter('all')}
                  className={`
                    px-6 py-3 rounded-2xl font-semibold transition-all
                    ${filter === 'all'
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-100'
                    }
                  `}
                >
                  All ({notifications.length})
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`
                    px-6 py-3 rounded-2xl font-semibold transition-all relative
                    ${filter === 'unread'
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-100'
                    }
                  `}
                >
                  Unread
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Notifications List */}
              {filteredNotifications.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 border border-gray-100">
                  <EmptyState
                    icon={
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    }
                    title="No notifications"
                    description={filter === 'unread' ? "You've read all your notifications" : "No notifications yet"}
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        bg-white rounded-3xl p-6 border transition-all hover:shadow-lg
                        ${notification.isRead ? 'border-gray-100' : 'border-blue-200 bg-blue-50/30'}
                      `}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        {getNotificationIcon(notification.type)}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-bold text-gray-900">{notification.title}</h3>
                            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{formatTime(notification.timestamp)}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{notification.description}</p>

                          {/* Actions */}
                          <div className="flex items-center gap-3">
                            {notification.actionUrl && notification.actionLabel && (
                              <Link href={notification.actionUrl}>
                                <Button size="sm" onClick={() => markAsRead(notification.id)}>
                                  {notification.actionLabel}
                                </Button>
                              </Link>
                            )}
                            
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                              >
                                Mark as read
                              </button>
                            )}
                            
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-sm font-medium text-gray-500 hover:text-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Unread Indicator */}
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
