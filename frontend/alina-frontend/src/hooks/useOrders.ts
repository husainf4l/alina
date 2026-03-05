// React Query hooks for Orders

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/lib/api/services';
import type {
  CreateOrderRequest,
  SubmitRequirementsRequest,
  DeliverOrderRequest,
  RequestRevisionRequest,
} from '@/lib/api/types';

export const useMyOrders = (params?: { status?: string; page?: number; pageSize?: number }) => {
  return useQuery({
    queryKey: ['orders', 'me', params],
    queryFn: () => orderService.getMyOrders(params),
  });
};

export const useBuyerOrders = (params?: { status?: string; page?: number; pageSize?: number }) => {
  return useQuery({
    queryKey: ['orders', 'buyer', params],
    queryFn: () => orderService.getBuyerOrders(params),
  });
};

export const useSellerOrders = (params?: { status?: string; page?: number; pageSize?: number }) => {
  return useQuery({
    queryKey: ['orders', 'seller', params],
    queryFn: () => orderService.getSellerOrders(params),
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getOrder(orderId),
    enabled: !!orderId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderRequest) => orderService.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useSubmitRequirements = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, data }: { orderId: string; data: SubmitRequirementsRequest }) =>
      orderService.submitRequirements(orderId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['order', variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useStartOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => orderService.startOrder(orderId),
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useDeliverOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, data }: { orderId: string; data: DeliverOrderRequest }) =>
      orderService.deliverOrder(orderId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['order', variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useRequestRevision = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, data }: { orderId: string; data: RequestRevisionRequest }) =>
      orderService.requestRevision(orderId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['order', variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useAcceptDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => orderService.acceptDelivery(orderId),
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
      orderService.cancelOrder(orderId, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['order', variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useOrderRevisions = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId, 'revisions'],
    queryFn: () => orderService.getOrderRevisions(orderId),
    enabled: !!orderId,
  });
};
