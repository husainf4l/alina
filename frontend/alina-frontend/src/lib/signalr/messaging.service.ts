// Real-time Messaging Service using SignalR
// Handles chat messages, typing indicators, and user presence

import { getMessagingHub } from './hub.service';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  receiverId: string;
  content: string;
  attachmentUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface UserPresence {
  userId: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface TypingIndicator {
  userId: string;
  userName: string;
  isTyping: boolean;
}

export class RealtimeMessagingService {
  private hub = getMessagingHub();
  private isInitialized = false;

  /**
   * Initialize the messaging hub connection
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.warn('Messaging service already initialized');
      return;
    }

    try {
      await this.hub.start();
      this.isInitialized = true;
      console.log('✅ Realtime messaging initialized');
    } catch (error) {
      console.error('Failed to initialize messaging:', error);
      throw error;
    }
  }

  /**
   * Disconnect from messaging hub
   */
  async disconnect(): Promise<void> {
    await this.hub.stop();
    this.isInitialized = false;
  }

  /**
   * Send a chat message
   */
  async sendMessage(receiverId: string, content: string, attachmentUrl?: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Messaging service not initialized');
    }

    await this.hub.invoke('SendMessage', {
      receiverId,
      content,
      attachmentUrl,
    });
  }

  /**
   * Subscribe to receive new messages
   */
  onMessageReceived(callback: (message: ChatMessage) => void): () => void {
    return this.hub.on<ChatMessage>('ReceiveMessage', callback);
  }

  /**
   * Mark message as read
   */
  async markAsRead(messageId: string): Promise<void> {
    if (!this.isInitialized) return;
    
    await this.hub.send('MarkAsRead', messageId);
  }

  /**
   * Subscribe to message read status updates
   */
  onMessageRead(callback: (data: { messageId: string; readAt: string }) => void): () => void {
    return this.hub.on('MessageRead', callback);
  }

  /**
   * Send typing indicator
   */
  async sendTypingIndicator(receiverId: string, isTyping: boolean): Promise<void> {
    if (!this.isInitialized) return;
    
    await this.hub.send('SendTypingIndicator', receiverId, isTyping);
  }

  /**
   * Subscribe to typing indicators
   */
  onTypingIndicator(callback: (indicator: TypingIndicator) => void): () => void {
    return this.hub.on<TypingIndicator>('UserTyping', callback);
  }

  /**
   * Join a conversation/room
   */
  async joinConversation(otherUserId: string): Promise<void> {
    if (!this.isInitialized) return;
    
    await this.hub.invoke('JoinConversation', otherUserId);
  }

  /**
   * Leave a conversation/room
   */
  async leaveConversation(otherUserId: string): Promise<void> {
    if (!this.isInitialized) return;
    
    await this.hub.invoke('LeaveConversation', otherUserId);
  }

  /**
   * Subscribe to user presence updates (online/offline)
   */
  onUserPresenceChanged(callback: (presence: UserPresence) => void): () => void {
    return this.hub.on<UserPresence>('UserPresenceChanged', callback);
  }

  /**
   * Get online users in conversation
   */
  async getOnlineUsers(): Promise<string[]> {
    if (!this.isInitialized) return [];
    
    return await this.hub.invoke<string[]>('GetOnlineUsers');
  }

  /**
   * Subscribe to conversation events (user joined/left)
   */
  onUserJoinedConversation(callback: (userId: string) => void): () => void {
    return this.hub.on<string>('UserJoinedConversation', callback);
  }

  onUserLeftConversation(callback: (userId: string) => void): () => void {
    return this.hub.on<string>('UserLeftConversation', callback);
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
let messagingService: RealtimeMessagingService | null = null;

/**
 * Get the realtime messaging service instance
 */
export function getRealtimeMessagingService(): RealtimeMessagingService {
  if (!messagingService) {
    messagingService = new RealtimeMessagingService();
  }
  return messagingService;
}
