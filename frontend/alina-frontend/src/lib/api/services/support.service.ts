// Support service

import apiClient from '../client';
import type {
  SupportTicket,
  CreateSupportTicketRequest,
  AddTicketResponseRequest,
  PaginatedResponse,
} from '../types';

export const supportService = {
  // Get tickets
  getMyTickets: async (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
  }): Promise<PaginatedResponse<SupportTicket>> => {
    const response = await apiClient.get<PaginatedResponse<SupportTicket>>('/support/tickets', { params });
    return response.data;
  },

  getTicket: async (ticketId: string): Promise<SupportTicket> => {
    const response = await apiClient.get<SupportTicket>(`/support/tickets/${ticketId}`);
    return response.data;
  },

  // Create ticket
  createTicket: async (data: CreateSupportTicketRequest): Promise<SupportTicket> => {
    const response = await apiClient.post<SupportTicket>('/support/tickets', data);
    return response.data;
  },

  // Add response to ticket
  addResponse: async (ticketId: string, data: AddTicketResponseRequest): Promise<SupportTicket> => {
    const formData = new FormData();
    formData.append('message', data.message);
    
    if (data.attachments) {
      data.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }

    const response = await apiClient.post<SupportTicket>(
      `/support/tickets/${ticketId}/responses`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Close ticket
  closeTicket: async (ticketId: string): Promise<SupportTicket> => {
    const response = await apiClient.post<SupportTicket>(`/support/tickets/${ticketId}/close`);
    return response.data;
  },

  // Reopen ticket
  reopenTicket: async (ticketId: string): Promise<SupportTicket> => {
    const response = await apiClient.post<SupportTicket>(`/support/tickets/${ticketId}/reopen`);
    return response.data;
  },
};
