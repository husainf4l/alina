// Dispute service

import apiClient from '../client';
import type {
  Dispute,
  CreateDisputeRequest,
  ResolveDisputeRequest,
} from '../types';

export const disputeService = {
  // Get disputes
  getMyDisputes: async (): Promise<Dispute[]> => {
    const response = await apiClient.get<Dispute[]>('/disputes/me');
    return response.data;
  },

  getDispute: async (disputeId: string): Promise<Dispute> => {
    const response = await apiClient.get<Dispute>(`/disputes/${disputeId}`);
    return response.data;
  },

  // Create dispute
  createDispute: async (data: CreateDisputeRequest): Promise<Dispute> => {
    const response = await apiClient.post<Dispute>('/disputes', data);
    return response.data;
  },

  // Add message to dispute
  addDisputeMessage: async (disputeId: string, message: string): Promise<Dispute> => {
    const response = await apiClient.post<Dispute>(`/disputes/${disputeId}/messages`, { message });
    return response.data;
  },

  // Close dispute (admin only)
  closeDispute: async (disputeId: string, data: ResolveDisputeRequest): Promise<Dispute> => {
    const response = await apiClient.post<Dispute>(`/disputes/${disputeId}/resolve`, data);
    return response.data;
  },
};
