// Analytics service

import apiClient from '../client';
import type {
  SellerAnalytics,
  PlatformMetrics,
  DateRangeRequest,
} from '../types';

export const analyticsService = {
  // Seller analytics
  getSellerAnalytics: async (params?: DateRangeRequest): Promise<SellerAnalytics> => {
    const response = await apiClient.get<SellerAnalytics>('/analytics/seller', { params });
    return response.data;
  },

  // Platform analytics (admin only)
  getPlatformMetrics: async (params?: DateRangeRequest): Promise<PlatformMetrics> => {
    const response = await apiClient.get<PlatformMetrics>('/analytics/platform', { params });
    return response.data;
  },

  // Export analytics data
  exportSellerAnalytics: async (params?: DateRangeRequest): Promise<Blob> => {
    const response = await apiClient.get('/analytics/seller/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};
