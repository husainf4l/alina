// Media service

import apiClient from '../client';
import type {
  Media,
  UploadMediaResponse,
} from '../types';

export const mediaService = {
  // Upload media file with optional associations
  uploadMedia: async (
    file: File,
    metadata?: {
      gigId?: string;
      taskId?: string;
      customOfferId?: number;
    }
  ): Promise<UploadMediaResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    // Build query params for associations
    const params = new URLSearchParams();
    if (metadata?.gigId) params.append('gigId', metadata.gigId);
    if (metadata?.taskId) params.append('taskId', metadata.taskId);
    if (metadata?.customOfferId) params.append('customOfferId', metadata.customOfferId.toString());

    const queryString = params.toString();
    const url = queryString ? `/media/upload?${queryString}` : '/media/upload';

    const response = await apiClient.post<UploadMediaResponse>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete media
  deleteMedia: async (mediaId: string): Promise<void> => {
    await apiClient.delete(`/media/${mediaId}`);
  },
};
