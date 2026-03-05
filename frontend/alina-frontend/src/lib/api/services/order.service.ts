// Order service

import apiClient from '../client';
import type {
  Order,
  Revision,
  CreateOrderRequest,
  SubmitRequirementsRequest,
  DeliverOrderRequest,
  RequestRevisionRequest,
  PaginatedResponse,
} from '../types';

export const orderService = {
  // Get all orders (buyer + seller combined)
  getMyOrders: async (params?: { status?: string; page?: number; pageSize?: number }): Promise<PaginatedResponse<Order>> => {
    const response = await apiClient.get<PaginatedResponse<Order>>('/marketplaceops/orders', { params });
    return response.data;
  },

  // Get orders as buyer (uses same endpoint with role filtering)
  getBuyerOrders: async (params?: { status?: string; page?: number; pageSize?: number }): Promise<PaginatedResponse<Order>> => {
    const response = await apiClient.get<PaginatedResponse<Order>>('/marketplaceops/orders', { params });
    return response.data;
  },

  // Get orders as seller (uses same endpoint with role filtering)
  getSellerOrders: async (params?: { status?: string; page?: number; pageSize?: number }): Promise<PaginatedResponse<Order>> => {
    const response = await apiClient.get<PaginatedResponse<Order>>('/marketplaceops/orders', { params });
    return response.data;
  },

  // Get single order
  getOrder: async (orderId: string): Promise<Order> => {
    const response = await apiClient.get<Order>(`/marketplaceops/orders/${orderId}`);
    return response.data;
  },

  // Create order
  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await apiClient.post<Order>('/marketplaceops/orders', data);
    return response.data;
  },

  // Submit requirements (not in backend yet)
  submitRequirements: async (orderId: string, data: SubmitRequirementsRequest): Promise<Order> => {
    const response = await apiClient.post<Order>(`/marketplaceops/orders/${orderId}/requirements`, data);
    return response.data;
  },

  // Start order (not in backend yet - orders auto-start on creation)
  startOrder: async (orderId: string): Promise<Order> => {
    const response = await apiClient.post<Order>(`/marketplaceops/orders/${orderId}/start`);
    return response.data;
  },

  // Deliver order
  deliverOrder: async (orderId: string, data: DeliverOrderRequest): Promise<Order> => {
    const response = await apiClient.put<Order>(
      `/marketplaceops/orders/${orderId}/deliver`,
      {
        deliveryMessage: data.message,
        attachmentUrls: data.attachments?.map(f => f.name) || [] // TODO: Upload files first
      }
    );
    return response.data;
  },

  // Request revision (not in backend yet)
  requestRevision: async (orderId: string, data: RequestRevisionRequest): Promise<Order> => {
    const response = await apiClient.post<Order>(`/marketplaceops/orders/${orderId}/revision`, data);
    return response.data;
  },

  // Accept delivery (complete order in backend)
  acceptDelivery: async (orderId: string): Promise<Order> => {
    const response = await apiClient.put<Order>(`/marketplaceops/orders/${orderId}/complete`);
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId: string, reason: string): Promise<Order> => {
    const response = await apiClient.put<Order>(`/marketplaceops/orders/${orderId}/cancel`, { reason });
    return response.data;
  },

  // Get revisions for an order (use RevisionsController)
  getOrderRevisions: async (orderId: string): Promise<Revision[]> => {
    const response = await apiClient.get<Revision[]>(`/revisions/order/${orderId}`);
    return response.data;
  },

  // Submit revision (use RevisionsController)
  submitRevision: async (revisionId: string, data: DeliverOrderRequest): Promise<Revision> => {
    const formData = new FormData();
    formData.append('message', data.message);
    
    if (data.attachments) {
      data.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }

    const response = await apiClient.post<Revision>(
      `/revisions/${revisionId}/submit`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};
