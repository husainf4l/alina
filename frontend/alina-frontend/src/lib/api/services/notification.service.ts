// Notification service

import apiClient from '../client';
import type {
  Notification,
  UserNotificationSettings,
  UpdateNotificationSettingsRequest,
  MarkNotificationReadRequest,
  PaginatedResponse,
} from '../types';

export const notificationService = {
  // Get notifications
  getNotifications: async (params?: {
    page?: number;
    pageSize?: number;
    unreadOnly?: boolean;
  }): Promise<PaginatedResponse<Notification>> => {
    const response = await apiClient.get<PaginatedResponse<Notification>>('/notifications', { params });
    return response.data;
  },

  // Get unread count
  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get<{ count: number }>('/notifications/unread/count');
    return response.data.count;
  },

  // Mark as read
  markAsRead: async (data: MarkNotificationReadRequest): Promise<void> => {
    await apiClient.post('/notifications/read', data);
  },

  // Mark all as read
  markAllAsRead: async (): Promise<void> => {
    await apiClient.post('/notifications/read-all');
  },

  // Delete notification
  deleteNotification: async (notificationId: string): Promise<void> => {
    await apiClient.delete(`/notifications/${notificationId}`);
  },

  // Delete all notifications
  deleteAllNotifications: async (): Promise<void> => {
    await apiClient.delete('/notifications');
  },

  // Settings
  getNotificationSettings: async (): Promise<UserNotificationSettings> => {
    const response = await apiClient.get<UserNotificationSettings>('/notifications/settings');
    return response.data;
  },

  updateNotificationSettings: async (data: UpdateNotificationSettingsRequest): Promise<UserNotificationSettings> => {
    const response = await apiClient.put<UserNotificationSettings>('/notifications/settings', data);
    return response.data;
  },
};
