// User service

import apiClient from '../client';
import type { User } from '../types';

export const userService = {
  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  },

  // Get user by ID
  getUser: async (userId: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${userId}`);
    return response.data;
  },

  // Update current user
  updateCurrentUser: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>('/users/me', data);
    return response.data;
  },

  // Delete account
  deleteAccount: async (): Promise<void> => {
    await apiClient.delete('/users/me');
  },
};
