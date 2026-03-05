// Messaging types

// Backend-aligned types
export interface ChatSummary {
  userId: string;
  userName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  attachmentUrl?: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface SendMessageRequest {
  receiverId: string;
  content: string;
  attachmentUrl?: string;
}

// Legacy types (for future conversation-based messaging)
export interface Conversation {
  id: string;
  participants: ConversationParticipant[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationParticipant {
  userId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

export enum MessageType {
  Text = 'Text',
  File = 'File',
  Image = 'Image',
  CustomOffer = 'CustomOffer',
  System = 'System',
}

export interface CreateConversationRequest {
  participantId: string;
  initialMessage?: string;
}

