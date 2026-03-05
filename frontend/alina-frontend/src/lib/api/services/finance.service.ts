// Finance service

import apiClient from '../client';
import type {
  Wallet,
  Transaction,
  WithdrawalRequest,
  CreateWithdrawalRequest,
  CurrencyRate,
  PaginatedResponse,
} from '../types';

export const financeService = {
  // Wallet
  getWallet: async (): Promise<Wallet> => {
    const response = await apiClient.get<Wallet>('/wallet');
    return response.data;
  },

  // Transactions
  getTransactions: async (params?: {
    page?: number;
    pageSize?: number;
    type?: string;
    status?: string;
  }): Promise<PaginatedResponse<Transaction>> => {
    const response = await apiClient.get<PaginatedResponse<Transaction>>('/wallet/transactions', { params });
    return response.data;
  },

  getTransaction: async (transactionId: string): Promise<Transaction> => {
    const response = await apiClient.get<Transaction>(`/wallet/transactions/${transactionId}`);
    return response.data;
  },

  // Withdrawals
  getWithdrawalRequests: async (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
  }): Promise<PaginatedResponse<WithdrawalRequest>> => {
    const response = await apiClient.get<PaginatedResponse<WithdrawalRequest>>('/withdrawal', { params });
    return response.data;
  },

  getWithdrawalRequest: async (requestId: string): Promise<WithdrawalRequest> => {
    const response = await apiClient.get<WithdrawalRequest>(`/withdrawal/${requestId}`);
    return response.data;
  },

  createWithdrawalRequest: async (data: CreateWithdrawalRequest): Promise<WithdrawalRequest> => {
    const response = await apiClient.post<WithdrawalRequest>('/withdrawal', data);
    return response.data;
  },

  cancelWithdrawalRequest: async (requestId: string): Promise<WithdrawalRequest> => {
    const response = await apiClient.post<WithdrawalRequest>(`/withdrawal/${requestId}/cancel`);
    return response.data;
  },

  // Currency rates
  getCurrencyRates: async (): Promise<CurrencyRate[]> => {
    const response = await apiClient.get<CurrencyRate[]>('/wallet/currency-rates');
    return response.data;
  },

  convertCurrency: async (amount: number, from: string, to: string): Promise<{ amount: number; rate: number }> => {
    const response = await apiClient.get<{ amount: number; rate: number }>('/wallet/convert', {
      params: { amount, from, to },
    });
    return response.data;
  },
};
