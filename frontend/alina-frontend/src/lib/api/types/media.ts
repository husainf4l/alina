// Media types

export interface Media {
  id: string;
  userId: string;
  fileName: string;
  url: string;
  thumbnailUrl?: string;
  size: number;
  mimeType: string;
  type: MediaType;
  metadata?: Record<string, any>;
  createdAt: string;
}

export enum MediaType {
  Image = 'Image',
  Video = 'Video',
  Document = 'Document',
  Audio = 'Audio',
  Other = 'Other',
}

export interface UploadMediaRequest {
  file: File;
  type?: MediaType;
  metadata?: Record<string, any>;
}

export interface UploadMediaResponse {
  id: string;
  url: string;
  thumbnailUrl?: string;
}
