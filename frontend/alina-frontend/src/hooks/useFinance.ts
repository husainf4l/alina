// React Query hooks for Finance

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financeService } from '@/lib/api/services';
import type { CreateWithdrawalRequest } from '@/lib/api/types';

export const useWallet = () => {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: () => financeService.getWallet(),
  });
};

export const useTransactions = (params?: {
  page?: number;
  pageSize?: number;
  type?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => financeService.getTransactions(params),
  });
};

export const useTransaction = (transactionId: string) => {
  return useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => financeService.getTransaction(transactionId),
    enabled: !!transactionId,
  });
};

export const useWithdrawalRequests = (params?: {
  page?: number;
  pageSize?: number;
  status?: string;
}) => {
  return useQuery({
    queryKey: ['withdrawalRequests', params],
    queryFn: () => financeService.getWithdrawalRequests(params),
  });
};

export const useCreateWithdrawalRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWithdrawalRequest) => financeService.createWithdrawalRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['withdrawalRequests'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });
};

export const useCancelWithdrawalRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => financeService.cancelWithdrawalRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['withdrawalRequests'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });
};

export const useCurrencyRates = () => {
  return useQuery({
    queryKey: ['currencyRates'],
    queryFn: () => financeService.getCurrencyRates(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
