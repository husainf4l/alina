// Profile service

import apiClient from '../client';
import type {
  Profile,
  UpdateProfileRequest,
  UploadAvatarRequest,
  UploadCoverImageRequest,
} from '../types';

export const profileService = {
  // Get own profile
  getMyProfile: async (): Promise<Profile> => {
    const response = await apiClient.get<Profile>('/profiles/me');
    return response.data;
  },

  // Get profile by user ID
  getProfile: async (userId: string): Promise<Profile> => {
    const response = await apiClient.get<Profile>(`/profiles/${userId}`);
    return response.data;
  },

  // Update profile
  updateProfile: async (data: UpdateProfileRequest): Promise<Profile> => {
    const response = await apiClient.put<Profile>('/profiles/me', data);
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post<{ avatarUrl: string }>(
      '/profiles/me/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Upload cover image
  uploadCoverImage: async (file: File): Promise<{ coverImageUrl: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post<{ coverImageUrl: string }>(
      '/profiles/me/cover',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Delete avatar
  deleteAvatar: async (): Promise<void> => {
    await apiClient.delete('/profiles/me/avatar');
  },

  // Delete cover image
  deleteCoverImage: async (): Promise<void> => {
    await apiClient.delete('/profiles/me/cover');
  },
};
