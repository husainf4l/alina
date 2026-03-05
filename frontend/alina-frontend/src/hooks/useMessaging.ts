// React Query hooks for Messaging

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagingService } from '@/lib/api/services';
import type { SendMessageRequest } from '@/lib/api/types';

// Get all chats (user-to-user conversations)
export const useChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: () => messagingService.getChats(),
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};

// Get chat history with a specific user
export const useChatHistory = (otherUserId: string) => {
  return useQuery({
    queryKey: ['chat-history', otherUserId],
    queryFn: () => messagingService.getChatHistory(otherUserId),
    enabled: !!otherUserId,
    refetchInterval: 5000, // Refetch every 5 seconds
  });
};

// Send message to a user
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendMessageRequest) => messagingService.sendMessage(data),
    onSuccess: (_, variables) => {
      // Invalidate chat history with the receiver
      queryClient.invalidateQueries({ queryKey: ['chat-history', variables.receiverId] });
      // Invalidate chats list
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
};

// Legacy hooks (for backward compatibility - will be removed)
export const useConversations = useChats;
export const useMessages = (userId: string) => useChatHistory(userId);
