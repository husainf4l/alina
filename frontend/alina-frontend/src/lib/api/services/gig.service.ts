// Gig Service - Complete CRUD Operations
import { apiClient } from '../axios-config';

export interface GigPackage {
  price: number;
  deliveryDays: number;
  revisions: number;
  features: string[];
}

export interface CreateGigRequest {
  title: string;
  category: string;
  subcategory: string;
  description: string;
  tags: string[];
  pricing: {
    basic: GigPackage;
    standard: GigPackage;
    premium: GigPackage;
  };
  requirements: string[];
  images: string[]; // URLs after upload
}

export interface UpdateGigRequest extends Partial<CreateGigRequest> {
  isActive?: boolean;
}

export interface Gig {
  id: string;
  sellerId: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  tags: string[];
  pricing: {
    basic: GigPackage;
    standard: GigPackage;
    premium: GigPackage;
  };
  requirements: string[];
  images: string[];
  isActive: boolean;
  rating: number;
  reviewCount: number;
  orderCount: number;
  createdAt: string;
  updatedAt: string;
}

export const gigService = {
  /**
   * Create a new gig
   */
  createGig: async (data: CreateGigRequest): Promise<Gig> => {
    const response = await apiClient.post<Gig>('/gigs', data);
    return response.data;
  },

  /**
   * Update an existing gig
   */
  updateGig: async (gigId: string, data: UpdateGigRequest): Promise<Gig> => {
    const response = await apiClient.put<Gig>(`/gigs/${gigId}`, data);
    return response.data;
  },

  /**
   * Delete a gig
   */
  deleteGig: async (gigId: string): Promise<void> => {
    await apiClient.delete(`/gigs/${gigId}`);
  },

  /**
   * Get a single gig by ID
   */
  getGig: async (gigId: string): Promise<Gig> => {
    const response = await apiClient.get<Gig>(`/gigs/${gigId}`);
    return response.data;
  },

  /**
   * Get user's gigs
   */
  getMyGigs: async (): Promise<Gig[]> => {
    try {
      const response = await apiClient.get<Gig[]>('/gigs/my-gigs');
      return response.data;
    } catch (error) {
      return [];
    }
  },

  /**
   * Activate/deactivate a gig
   */
  toggleGigStatus: async (gigId: string, isActive: boolean): Promise<Gig> => {
    const response = await apiClient.patch<Gig>(`/gigs/${gigId}/status`, { isActive });
    return response.data;
  },

  /**
   * Search/filter gigs
   */
  searchGigs: async (params: {
    query?: string;
    category?: string;
    subcategory?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    pageSize?: number;
  }): Promise<{ items: Gig[]; totalCount: number; page: number; totalPages: number }> => {
    const response = await apiClient.get('/gigs/search', { params });
    return response.data;
  },
};
