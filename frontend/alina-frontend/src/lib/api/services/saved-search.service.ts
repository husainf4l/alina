// Saved searches service

import apiClient from '../client';

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  query: {
    category?: string;
    subcategory?: string;
    minPrice?: number;
    maxPrice?: number;
    keywords?: string;
    deliveryTime?: number;
    rating?: number;
  };
  notificationsEnabled: boolean;
  resultsCount: number;
  lastChecked: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSavedSearchRequest {
  name: string;
  query: SavedSearch['query'];
  notificationsEnabled?: boolean;
}

export interface UpdateSavedSearchRequest {
  name?: string;
  query?: SavedSearch['query'];
  notificationsEnabled?: boolean;
}

export const savedSearchService = {
  /**
   * Get all saved searches for current user
   */
  async getMySavedSearches(): Promise<SavedSearch[]> {
    const response = await apiClient.get<SavedSearch[]>('/saved-searches');
    return response.data;
  },

  /**
   * Get a specific saved search
   */
  async getSavedSearch(searchId: string): Promise<SavedSearch> {
    const response = await apiClient.get<SavedSearch>(`/saved-searches/${searchId}`);
    return response.data;
  },

  /**
   * Create a new saved search
   */
  async createSavedSearch(data: CreateSavedSearchRequest): Promise<SavedSearch> {
    const response = await apiClient.post<SavedSearch>('/saved-searches', data);
    return response.data;
  },

  /**
   * Update a saved search
   */
  async updateSavedSearch(
    searchId: string,
    data: UpdateSavedSearchRequest
  ): Promise<SavedSearch> {
    const response = await apiClient.put<SavedSearch>(
      `/saved-searches/${searchId}`,
      data
    );
    return response.data;
  },

  /**
   * Delete a saved search
   */
  async deleteSavedSearch(searchId: string): Promise<void> {
    await apiClient.delete(`/saved-searches/${searchId}`);
  },

  /**
   * Toggle notifications for a saved search
   */
  async toggleNotifications(searchId: string, enabled: boolean): Promise<SavedSearch> {
    const response = await apiClient.patch<SavedSearch>(
      `/saved-searches/${searchId}/notifications`,
      { enabled }
    );
    return response.data;
  },

  /**
   * Run a saved search and get results
   */
  async runSavedSearch(searchId: string): Promise<any[]> {
    const response = await apiClient.get<any[]>(`/saved-searches/${searchId}/run`);
    return response.data;
  },
};
