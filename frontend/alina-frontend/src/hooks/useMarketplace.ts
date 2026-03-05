// React Query hooks for Marketplace

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { marketplaceService } from '@/lib/api/services';
import type {
  SearchGigsRequest,
  CreateGigRequest,
  UpdateGigRequest,
  TaskStatus,
} from '@/lib/api/types';

export const useSearchGigs = (params: SearchGigsRequest) => {
  return useQuery({
    queryKey: ['gigs', 'search', params],
    queryFn: () => marketplaceService.searchGigs(params),
  });
};

export const useGig = (gigId: string) => {
  return useQuery({
    queryKey: ['gig', gigId],
    queryFn: () => marketplaceService.getGig(gigId),
    enabled: !!gigId,
  });
};

export const useMyGigs = () => {
  return useQuery({
    queryKey: ['gigs', 'me'],
    queryFn: () => marketplaceService.getMyGigs(),
  });
};

export const useCreateGig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGigRequest) => marketplaceService.createGig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigs', 'me'] });
    },
  });
};

export const useUpdateGig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gigId, data }: { gigId: string; data: UpdateGigRequest }) =>
      marketplaceService.updateGig(gigId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gig', variables.gigId] });
      queryClient.invalidateQueries({ queryKey: ['gigs', 'me'] });
    },
  });
};

export const useDeleteGig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gigId: string) => marketplaceService.deleteGig(gigId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigs', 'me'] });
    },
  });
};

export const useToggleGigStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gigId: string) => marketplaceService.toggleGigStatus(gigId),
    onSuccess: (_, gigId) => {
      queryClient.invalidateQueries({ queryKey: ['gig', gigId] });
      queryClient.invalidateQueries({ queryKey: ['gigs', 'me'] });
    },
  });
};

// Categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => marketplaceService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: false, // Don't retry on error to prevent infinite loading
  });
};

export const useCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => marketplaceService.getCategory(categoryId),
    enabled: !!categoryId,
  });
};

// Reviews
export const useGigReviews = (gigId: string) => {
  return useQuery({
    queryKey: ['gig', gigId, 'reviews'],
    queryFn: () => marketplaceService.getGigReviews(gigId),
    enabled: !!gigId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gigId, data }: { gigId: string; data: { rating: number; comment: string } }) =>
      marketplaceService.createReview(gigId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gig', variables.gigId, 'reviews'] });
      queryClient.invalidateQueries({ queryKey: ['gig', variables.gigId] });
    },
  });
};

export const useReplyToReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, reply }: { reviewId: string; reply: string }) =>
      marketplaceService.replyToReview(reviewId, reply),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gig'] });
    },
  });
};

// Favorites
export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => marketplaceService.getFavorites(),
  });
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gigId: string) => marketplaceService.addToFavorites(gigId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gigId: string) => marketplaceService.removeFromFavorites(gigId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

// Custom Offers
export const useCustomOffers = () => {
  return useQuery({
    queryKey: ['customOffers'],
    queryFn: () => marketplaceService.getCustomOffers(),
  });
};

export const useAcceptCustomOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (offerId: string) => marketplaceService.acceptCustomOffer(offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customOffers'] });
    },
  });
};

// Featured Services
export const useFeaturedServices = () => {
  return useQuery({
    queryKey: ['featuredServices'],
    queryFn: () => marketplaceService.getFeaturedServices(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: false, // Don't retry on error to prevent infinite loading
  });
};

// Top Sellers
export const useTopSellers = () => {
  return useQuery({
    queryKey: ['topSellers'],
    queryFn: () => marketplaceService.getTopSellers(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: false, // Don't retry on error to prevent infinite loading
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; description: string; priority?: any; dueDate?: string }) =>
      marketplaceService.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      marketplaceService.updateTaskStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
