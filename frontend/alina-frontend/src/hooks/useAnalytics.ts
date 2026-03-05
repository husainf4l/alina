// React Query hooks for Analytics

import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/lib/api/services';
import type { DateRangeRequest } from '@/lib/api/types';

export const useSellerAnalytics = (params?: DateRangeRequest) => {
  return useQuery({
    queryKey: ['analytics', 'seller', params],
    queryFn: () => analyticsService.getSellerAnalytics(params),
  });
};

export const usePlatformMetrics = (params?: DateRangeRequest) => {
  return useQuery({
    queryKey: ['analytics', 'platform', params],
    queryFn: () => analyticsService.getPlatformMetrics(params),
  });
};
