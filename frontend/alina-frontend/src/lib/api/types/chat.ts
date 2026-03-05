// Chat and Messaging types

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName?: string;
  senderAvatar?: string;
  message: string;
  attachments?: ChatAttachment[];
  isRead: boolean;
  createdAt: string;
}

export interface ChatAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export interface Conversation {
  id: string;
  participants: ConversationParticipant[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  orderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationParticipant {
  userId: string;
  userName: string;
  userAvatar?: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface SendMessageRequest {
  conversationId: string;
  message: string;
  attachments?: File[];
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  userName: string;
  isTyping: boolean;
}
