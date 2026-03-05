// Profile types

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  country?: string;
  city?: string;
  languages?: string[];
  skills?: string[];
  website?: string;
  socialLinks?: SocialLinks;
  isVerified: boolean;
  completionPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  bio?: string;
  country?: string;
  city?: string;
  languages?: string[];
  skills?: string[];
  website?: string;
  socialLinks?: SocialLinks;
}

export interface UploadAvatarRequest {
  file: File;
}

export interface UploadCoverImageRequest {
  file: File;
}
