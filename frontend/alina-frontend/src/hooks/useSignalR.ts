// React Hooks for SignalR Real-time Features
// Makes it easy to use SignalR in React components

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import {  getRealtimeMessagingService,
  type ChatMessage,
  type UserPresence,
  type TypingIndicator,
} from '@/lib/signalr/messaging.service';
import {
  getRealtimeNotificationService,
  type RealtimeNotification,
  type OrderStatusUpdate,
  type PaymentNotification,
} from '@/lib/signalr/notification.service';

/**
 * Hook for managing real-time messaging connection
 */
export function useRealtimeMessaging() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<string>('Disconnected');
  const messagingService = useRef(getRealtimeMessagingService());

  useEffect(() => {
    const service = messagingService.current;

    // Initialize connection
    service.initialize()
      .then(() => {
        setIsConnected(true);
        setConnectionState(service.getConnectionState());
      })
      .catch((error) => {
        console.error('Failed to connect to messaging:', error);
        setIsConnected(false);
      });

    // Cleanup on unmount
    return () => {
      service.disconnect();
      setIsConnected(false);
    };
  }, []);

  return {
    isConnected,
    connectionState,
    service: messagingService.current,
  };
}

/**
 * Hook for receiving chat messages
 */
export function useChatMessages(onMessageReceived?: (message: ChatMessage) => void) {
  const { service, isConnected } = useRealtimeMessaging();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = service.onMessageReceived((message) => {
      setMessages((prev) => [...prev, message]);
      onMessageReceived?.(message);
    });

    return unsubscribe;
  }, [isConnected, service, onMessageReceived]);

  const sendMessage = useCallback(
    async (receiverId: string, content: string, attachmentUrl?: string) => {
      if (!isConnected) {
        console.warn('Cannot send message: Not connected');
        return;
      }
      await service.sendMessage(receiverId, content, attachmentUrl);
    },
    [isConnected, service]
  );

  return {
    messages,
    sendMessage,
    isConnected,
  };
}

/**
 * Hook for typing indicators
 */
export function useTypingIndicator(conversationUserId?: string) {
  const { service, isConnected } = useRealtimeMessaging();
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = service.onTypingIndicator((indicator) => {
      if (indicator.isTyping) {
        setTypingUsers((prev) => new Set(prev).add(indicator.userId));
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
          setTypingUsers((prev) => {
            const next = new Set(prev);
            next.delete(indicator.userId);
            return next;
          });
        }, 3000);
      } else {
        setTypingUsers((prev) => {
          const next = new Set(prev);
          next.delete(indicator.userId);
          return next;
        });
      }
    });

    return unsubscribe;
  }, [isConnected, service]);

  const setTyping = useCallback(
    (isTyping: boolean) => {
      if (!isConnected || !conversationUserId) return;

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      service.sendTypingIndicator(conversationUserId, isTyping);

      // Auto-stop typing after 3 seconds
      if (isTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          service.sendTypingIndicator(conversationUserId, false);
        }, 3000);
      }
    },
    [isConnected, conversationUserId, service]
  );

  return {
    typingUsers: Array.from(typingUsers),
    setTyping,
    isTyping: typingUsers.size > 0,
  };
}

/**
 * Hook for user presence (online/offline status)
 */
export function useUserPresence() {
  const { service, isConnected } = useRealtimeMessaging();
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isConnected) return;

    // Get initial online users
    service.getOnlineUsers().then((users) => {
      setOnlineUsers(new Set(users));
    });

    // Subscribe to presence changes
    const unsubscribe = service.onUserPresenceChanged((presence) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        if (presence.isOnline) {
          next.add(presence.userId);
        } else {
          next.delete(presence.userId);
        }
        return next;
      });
    });

    return unsubscribe;
  }, [isConnected, service]);

  const isUserOnline = useCallback(
    (userId: string) => onlineUsers.has(userId),
    [onlineUsers]
  );

  return {
    onlineUsers: Array.from(onlineUsers),
    isUserOnline,
  };
}

/**
 * Hook for managing real-time notifications
 */
export function useRealtimeNotifications() {
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<RealtimeNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationService = useRef(getRealtimeNotificationService());

  useEffect(() => {
    const service = notificationService.current;

    // Initialize connection
    service.initialize()
      .then(() => {
        setIsConnected(true);
        
        // Get initial unread count
        service.getUnreadCount().then(setUnreadCount);
      })
      .catch((error) => {
        console.error('Failed to connect to notifications:', error);
        setIsConnected(false);
      });

    // Subscribe to notifications
    const unsubscribeNotification = service.onNotificationReceived((notification) => {
      setNotifications((prev) => [notification, ...prev]);
      if (!notification.isRead) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    const unsubscribeCount = service.onUnreadCountUpdate((count) => {
      setUnreadCount(count);
    });

    // Cleanup on unmount
    return () => {
      unsubscribeNotification();
      unsubscribeCount();
      service.disconnect();
      setIsConnected(false);
    };
  }, []);

  const markAsRead = useCallback(
    async (notificationId: string) => {
      await notificationService.current.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    },
    []
  );

  const markAllAsRead = useCallback(async () => {
    await notificationService.current.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  }, []);

  return {
    isConnected,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    service: notificationService.current,
  };
}

/**
 * Hook for order status updates
 */
export function useOrderStatusUpdates(
  onStatusUpdate?: (update: OrderStatusUpdate) => void
) {
  const { service, isConnected } = useRealtimeNotifications();
  const [orderUpdates, setOrderUpdates] = useState<Map<string, OrderStatusUpdate>>(
    new Map()
  );

  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = service.onOrderStatusUpdate((update) => {
      setOrderUpdates((prev) => new Map(prev).set(update.orderId, update));
      onStatusUpdate?.(update);
    });

    return unsubscribe;
  }, [isConnected, service, onStatusUpdate]);

  const getOrderStatus = useCallback(
    (orderId: string) => orderUpdates.get(orderId),
    [orderUpdates]
  );

  return {
    orderUpdates: Array.from(orderUpdates.values()),
    getOrderStatus,
    isConnected,
  };
}

/**
 * Hook for payment notifications
 */
export function usePaymentNotifications(
  onPayment?: (payment: PaymentNotification) => void
) {
  const { service, isConnected } = useRealtimeNotifications();
  const [payments, setPayments] = useState<PaymentNotification[]>([]);

  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = service.onPaymentNotification((payment) => {
      setPayments((prev) => [payment, ...prev]);
      onPayment?.(payment);
    });

    return unsubscribe;
  }, [isConnected, service, onPayment]);

  return {
    payments,
    isConnected,
  };
}

/**
 * Hook for system announcements
 */
export function useSystemAnnouncements() {
  const { service, isConnected } = useRealtimeNotifications();
  const [announcements, setAnnouncements] = useState<
    Array<{ title: string; message: string; severity: 'info' | 'warning' | 'error'; timestamp: string }>
  >([]);

  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = service.onSystemAnnouncement((announcement) => {
      setAnnouncements((prev) => [
        { ...announcement, timestamp: new Date().toISOString() },
        ...prev.slice(0, 4), // Keep last 5 announcements
      ]);
    });

    return unsubscribe;
  }, [isConnected, service]);

  const dismissAnnouncement = useCallback((timestamp: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.timestamp !== timestamp));
  }, []);

  return {
    announcements,
    dismissAnnouncement,
    isConnected,
  };
}
