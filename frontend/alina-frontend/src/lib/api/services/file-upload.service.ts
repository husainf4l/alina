// File Upload Service - Cloudinary Integration
import { apiClient } from '../axios-config';

export interface FileUploadResponse {
  url: string;
  publicId: string;
  format: string;
  size: number;
  width?: number;
  height?: number;
}

export interface FileUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export const fileUploadService = {
  /**
   * Upload a single file
   */
  uploadFile: async (
    file: File,
    onProgress?: (progress: FileUploadProgress) => void
  ): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<FileUploadResponse>(
      '/upload/file',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress({
              loaded: progressEvent.loaded,
              total: progressEvent.total,
              percentage,
            });
          }
        },
      }
    );

    return response.data;
  },

  /**
   * Upload multiple files
   */
  uploadMultipleFiles: async (
    files: File[],
    onProgress?: (fileIndex: number, progress: FileUploadProgress) => void
  ): Promise<FileUploadResponse[]> => {
    const uploadPromises = files.map((file, index) =>
      fileUploadService.uploadFile(file, (progress) => {
        if (onProgress) {
          onProgress(index, progress);
        }
      })
    );

    return Promise.all(uploadPromises);
  },

  /**
   * Upload image (with validation)
   */
  uploadImage: async (
    file: File,
    options?: {
      maxSizeMB?: number;
      allowedFormats?: string[];
      onProgress?: (progress: FileUploadProgress) => void;
    }
  ): Promise<FileUploadResponse> => {
    const maxSizeMB = options?.maxSizeMB || 10;
    const allowedFormats = options?.allowedFormats || ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      throw new Error(`File size exceeds ${maxSizeMB}MB limit`);
    }

    // Validate file format
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !allowedFormats.includes(fileExtension)) {
      throw new Error(`Invalid file format. Allowed: ${allowedFormats.join(', ')}`);
    }

    return fileUploadService.uploadFile(file, options?.onProgress);
  },

  /**
   * Delete uploaded file
   */
  deleteFile: async (publicId: string): Promise<void> => {
    await apiClient.delete(`/upload/file/${publicId}`);
  },

  /**
   * Upload gig images
   */
  uploadGigImages: async (
    files: File[],
    gigId?: string,
    onProgress?: (fileIndex: number, progress: FileUploadProgress) => void
  ): Promise<FileUploadResponse[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    
    if (gigId) {
      formData.append('gigId', gigId);
    }

    const response = await apiClient.post<FileUploadResponse[]>(
      '/upload/gig-images',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // Assuming uniform distribution across files
            const fileIndex = Math.floor((progressEvent.loaded / progressEvent.total) * files.length);
            onProgress(fileIndex, {
              loaded: progressEvent.loaded,
              total: progressEvent.total,
              percentage,
            });
          }
        },
      }
    );

    return response.data;
  },
};

// Helper function to validate image before upload
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSizeMB = 10;
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPG, PNG, WEBP, or GIF images.',
    };
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB. Please choose a smaller image.`,
    };
  }

  return { valid: true };
};
