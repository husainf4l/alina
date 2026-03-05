// Bid service for task bidding

import apiClient from '../client';

export interface Bid {
  id: string;
  taskId: string;
  freelancerId: string;
  amount: number;
  deliveryDays: number;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface CreateBidRequest {
  taskId: string;
  amount: number;
  deliveryDays: number;
  proposal: string;
  attachments?: File[];
}

export const bidService = {
  /**
   * Get all bids for a task
   */
  async getTaskBids(taskId: string): Promise<Bid[]> {
    const response = await apiClient.get<Bid[]>(`/tasks/${taskId}/bids`);
    return response.data;
  },

  /**
   * Get my submitted bids
   */
  async getMyBids(): Promise<Bid[]> {
    const response = await apiClient.get<Bid[]>('/bids/me');
    return response.data;
  },

  /**
   * Submit a bid for a task
   */
  async createBid(data: CreateBidRequest): Promise<Bid> {
    const formData = new FormData();
    formData.append('amount', data.amount.toString());
    formData.append('deliveryDays', data.deliveryDays.toString());
    formData.append('proposal', data.proposal);

    if (data.attachments) {
      data.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }

    const response = await apiClient.post<Bid>(
      `/tasks/${data.taskId}/bids`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  /**
   * Accept a bid (task owner)
   */
  async acceptBid(bidId: string): Promise<Bid> {
    const response = await apiClient.post<Bid>(`/bids/${bidId}/accept`);
    return response.data;
  },

  /**
   * Reject a bid (task owner)
   */
  async rejectBid(bidId: string): Promise<Bid> {
    const response = await apiClient.post<Bid>(`/bids/${bidId}/reject`);
    return response.data;
  },

  /**
   * Withdraw a bid (freelancer)
   */
  async withdrawBid(bidId: string): Promise<void> {
    await apiClient.delete(`/bids/${bidId}`);
  },
};
