// Messaging service

import apiClient from '../client';
import type {
  Message,
  ChatSummary,
  SendMessageRequest,
} from '../types';

export const messagingService = {
  // Get all chats (user-to-user conversations)
  getChats: async (): Promise<ChatSummary[]> => {
    const response = await apiClient.get<ChatSummary[]>('/messaging/chats');
    return response.data;
  },

  // Get chat history with a specific user
  getChatHistory: async (otherUserId: string): Promise<Message[]> => {
    const response = await apiClient.get<Message[]>(`/messaging/messages/${otherUserId}`);
    return response.data;
  },

  // Send message to a user
  sendMessage: async (data: SendMessageRequest): Promise<Message> => {
    const response = await apiClient.post<Message>('/messaging/messages', data);
    return response.data;
  },
};
