// React Query hooks for Notifications

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/lib/api/services';
import type {
  MarkNotificationReadRequest,
  UpdateNotificationSettingsRequest,
} from '@/lib/api/types';

export const useNotifications = (params?: {
  page?: number;
  pageSize?: number;
  unreadOnly?: boolean;
}) => {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => notificationService.getNotifications(params),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ['notifications', 'unread', 'count'],
    queryFn: () => notificationService.getUnreadCount(),
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MarkNotificationReadRequest) => notificationService.markAsRead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread', 'count'] });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread', 'count'] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => notificationService.deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useNotificationSettings = () => {
  return useQuery({
    queryKey: ['notificationSettings'],
    queryFn: () => notificationService.getNotificationSettings(),
  });
};

export const useUpdateNotificationSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateNotificationSettingsRequest) =>
      notificationService.updateNotificationSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationSettings'] });
    },
  });
};
