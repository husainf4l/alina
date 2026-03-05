// Marketplace service

import apiClient from '../client';
import type {
  Gig,
  Category,
  Review,
  Favorite,
  CustomOffer,
  CreateGigRequest,
  UpdateGigRequest,
  SearchGigsRequest,
  PaginatedResponse,
  UserTask,
  TaskStatus,
  TaskPriority,
} from '../types';

export const marketplaceService = {
  // Gigs
  searchGigs: async (params: SearchGigsRequest): Promise<PaginatedResponse<Gig>> => {
    const response = await apiClient.get<PaginatedResponse<Gig>>('/marketplace/gigs', { params });
    return response.data;
  },

  getGig: async (gigId: string): Promise<Gig> => {
    const response = await apiClient.get<Gig>(`/marketplace/gigs/${gigId}`);
    return response.data;
  },

  getMyGigs: async (): Promise<Gig[]> => {
    const response = await apiClient.get<Gig[]>('/marketplace/gigs/me');
    return response.data;
  },

  createGig: async (data: CreateGigRequest): Promise<Gig> => {
    const response = await apiClient.post<Gig>('/marketplace/gigs', data);
    return response.data;
  },

  updateGig: async (gigId: string, data: UpdateGigRequest): Promise<Gig> => {
    const response = await apiClient.put<Gig>(`/marketplace/gigs/${gigId}`, data);
    return response.data;
  },

  deleteGig: async (gigId: string): Promise<void> => {
    await apiClient.delete(`/marketplace/gigs/${gigId}`);
  },

  toggleGigStatus: async (gigId: string): Promise<Gig> => {
    const response = await apiClient.patch<Gig>(`/marketplace/gigs/${gigId}/toggle-status`);
    return response.data;
  },

  // Featured Services
  getFeaturedServices: async (): Promise<Gig[]> => {
    try {
      const response = await apiClient.get<Gig[]>('/marketplace/featured');
      return response.data;
    } catch (error) {
      return []; // Return empty array if endpoint doesn't exist
    }
  },

  // Top Sellers
  getTopSellers: async (): Promise<any[]> => {
    try {
      const response = await apiClient.get<any[]>('/marketplace/top-sellers');
      return response.data;
    } catch (error) {
      return []; // Return empty array if endpoint doesn't exist
    }
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.get<Category[]>('/marketplace/categories');
      return response.data;
    } catch (error) {
      return []; // Return empty array if endpoint doesn't exist
    }
  },

  getCategory: async (categoryId: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`/marketplace/categories/${categoryId}`);
    return response.data;
  },

  // Reviews
  getGigReviews: async (gigId: string): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>(`/marketplace/gigs/${gigId}/reviews`);
    return response.data;
  },

  createReview: async (gigId: string, data: { rating: number; comment: string }): Promise<Review> => {
    const response = await apiClient.post<Review>(`/marketplace/gigs/${gigId}/reviews`, data);
    return response.data;
  },

  updateReview: async (reviewId: string, data: { rating: number; comment: string }): Promise<Review> => {
    const response = await apiClient.put<Review>(`/marketplace/reviews/${reviewId}`, data);
    return response.data;
  },

  replyToReview: async (reviewId: string, reply: string): Promise<Review> => {
    const response = await apiClient.post<Review>(`/marketplace/reviews/${reviewId}/reply`, { reply });
    return response.data;
  },

  // Favorites
  getFavorites: async (): Promise<Favorite[]> => {
    const response = await apiClient.get<Favorite[]>('/favorites');
    return response.data;
  },

  addToFavorites: async (gigId: string): Promise<Favorite> => {
    const response = await apiClient.post<Favorite>('/favorites', { gigId });
    return response.data;
  },

  removeFromFavorites: async (gigId: string): Promise<void> => {
    await apiClient.delete(`/favorites/${gigId}`);
  },

  isFavorite: async (gigId: string): Promise<boolean> => {
    const response = await apiClient.get<{ isFavorite: boolean }>(`/favorites/${gigId}/check`);
    return response.data.isFavorite;
  },

  // Custom Offers
  getCustomOffers: async (): Promise<CustomOffer[]> => {
    const response = await apiClient.get<CustomOffer[]>('/customoffers');
    return response.data;
  },

  getCustomOffer: async (offerId: string): Promise<CustomOffer> => {
    const response = await apiClient.get<CustomOffer>(`/customoffers/${offerId}`);
    return response.data;
  },

  createCustomOffer: async (data: Omit<CustomOffer, 'id' | 'sellerId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<CustomOffer> => {
    const response = await apiClient.post<CustomOffer>('/customoffers', data);
    return response.data;
  },

  acceptCustomOffer: async (offerId: string): Promise<CustomOffer> => {
    const response = await apiClient.post<CustomOffer>(`/customoffers/${offerId}/accept`);
    return response.data;
  },

  declineCustomOffer: async (offerId: string): Promise<CustomOffer> => {
    const response = await apiClient.post<CustomOffer>(`/customoffers/${offerId}/decline`);
    return response.data;
  },

  cancelCustomOffer: async (offerId: string): Promise<void> => {
    await apiClient.delete(`/customoffers/${offerId}`);
  },

  // Tasks
  getTasks: async (): Promise<UserTask[]> => {
    const response = await apiClient.get<UserTask[]>('/task');
    return response.data;
  },

  getTask: async (taskId: string): Promise<UserTask> => {
    const response = await apiClient.get<UserTask>(`/task/${taskId}`);
    return response.data;
  },

  createTask: async (data: { title: string; description: string; priority?: TaskPriority; dueDate?: string }): Promise<UserTask> => {
    const response = await apiClient.post<UserTask>('/task', data);
    return response.data;
  },

  updateTask: async (taskId: string, data: Partial<UserTask>): Promise<UserTask> => {
    const response = await apiClient.put<UserTask>(`/task/${taskId}`, data);
    return response.data;
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await apiClient.delete(`/task/${taskId}`);
  },

  updateTaskStatus: async (taskId: string, status: TaskStatus): Promise<UserTask> => {
    const response = await apiClient.patch<UserTask>(`/task/${taskId}/status`, { status });
    return response.data;
  },
};
