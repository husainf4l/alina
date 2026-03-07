// Real-time Notification Service using SignalR
// Handles live notifications for orders, messages, disputes, etc.

import { getNotificationHub } from './hub.service';

export interface RealtimeNotification {
  id: string;
  userId: string;
  type: 'message' | 'order' | 'payment' | 'dispute' | 'system' | 'review';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface OrderStatusUpdate {
  orderId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED';
  message: string;
  updatedAt: string;
}

export interface PaymentNotification {
  transactionId: string;
  type: 'received' | 'sent' | 'withdrawn' | 'deposited';
  amount: number;
  currency: string;
  message: string;
}

export class RealtimeNotificationService {
  private hub = getNotificationHub();
  private isInitialized = false;

  /**
   * Initialize the notification hub connection
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.warn('Notification service already initialized');
      return;
    }

    try {
      await this.hub.start();
      this.isInitialized = true;
      console.log('✅ Realtime notifications initialized');
    } catch (error) {
      console.warn('⚠️ Failed to initialize notifications (SignalR may not be available):', error instanceof Error ? error.message : String(error));
      // Don't throw error - allow app to continue without real-time notifications
      this.isInitialized = false;
    }
  }

  /**
   * Disconnect from notification hub
   */
  async disconnect(): Promise<void> {
    await this.hub.stop();
    this.isInitialized = false;
  }

  /**
   * Subscribe to receive notifications
   */
  onNotificationReceived(callback: (notification: RealtimeNotification) => void): () => void {
    return this.hub.on<RealtimeNotification>('ReceiveNotification', callback);
  }

  /**
   * Subscribe to order status updates
   */
  onOrderStatusUpdate(callback: (update: OrderStatusUpdate) => void): () => void {
    return this.hub.on<OrderStatusUpdate>('OrderStatusUpdated', callback);
  }

  /**
   * Subscribe to payment notifications
   */
  onPaymentNotification(callback: (payment: PaymentNotification) => void): () => void {
    return this.hub.on<PaymentNotification>('PaymentReceived', callback);
  }

  /**
   * Subscribe to new message notifications
   */
  onNewMessage(callback: (data: { senderId: string; senderName: string; preview: string }) => void): () => void {
    return this.hub.on('NewMessageNotification', callback);
  }

  /**
   * Subscribe to dispute updates
   */
  onDisputeUpdate(callback: (data: { disputeId: string; status: string; message: string }) => void): () => void {
    return this.hub.on('DisputeUpdated', callback);
  }

  /**
   * Subscribe to review notifications
   */
  onNewReview(callback: (data: { gigId: string; rating: number; reviewerName: string }) => void): () => void {
    return this.hub.on('NewReview', callback);
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    if (!this.isInitialized) return;
    
    await this.hub.send('MarkNotificationAsRead', notificationId);
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    if (!this.isInitialized) return;
    
    await this.hub.send('MarkAllNotificationsAsRead');
  }

  /**
   * Subscribe to notification badge count updates
   */
  onUnreadCountUpdate(callback: (count: number) => void): () => void {
    return this.hub.on<number>('UnreadCountUpdated', callback);
  }

  /**
   * Request current unread count
   */
  async getUnreadCount(): Promise<number> {
    if (!this.isInitialized) return 0;

    // Check if hub is actually connected
    if (!this.hub.isConnected()) {
      console.warn('Cannot get unread count: SignalR not connected');
      return 0;
    }

    try {
      return await this.hub.invoke<number>('GetUnreadCount');
    } catch (error) {
      console.error('Failed to get unread count:', error);
      return 0;
    }
  }

  /**
   * Subscribe to system announcements
   */
  onSystemAnnouncement(callback: (announcement: { title: string; message: string; severity: 'info' | 'warning' | 'error' }) => void): () => void {
    return this.hub.on('SystemAnnouncement', callback);
  }

  /**
   * Check if service is connected
   */
  isConnected(): boolean {
    return this.hub.isConnected();
  }

  /**
   * Get connection state
   */
  getConnectionState() {
    return this.hub.getState();
  }
}

// Singleton instance
let notificationService: RealtimeNotificationService | null = null;

/**
 * Get the realtime notification service instance
 */
export function getRealtimeNotificationService(): RealtimeNotificationService {
  if (!notificationService) {
    notificationService = new RealtimeNotificationService();
  }
  return notificationService;
}
