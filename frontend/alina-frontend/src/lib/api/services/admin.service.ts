// Admin service for administrative functions

import apiClient from '../client';

export interface AdminStats {
  totalUsers: number;
  totalGigs: number;
  totalOrders: number;
  totalRevenue: number;
  activeDisputes: number;
  pendingSupport: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  status: 'active' | 'suspended' | 'banned';
  role: 'user' | 'seller' | 'admin';
  createdAt: string;
  lastActive: string;
}

export interface FlaggedContent {
  id: string;
  type: 'gig' | 'user' | 'review' | 'message';
  contentId: string;
  reason: string;
  reportedBy: string;
  reportedAt: string;
  status: 'pending' | 'reviewed' | 'removed' | 'dismissed';
}

export interface AdminSupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface PlatformSettings {
  platformFee: number;
  minWithdrawal: number;
  maxWithdrawal: number;
  maintenanceMode: boolean;
  allowNewSignups: boolean;
}

export const adminService = {
  /**
   * Get admin dashboard statistics
   */
  async getStats(): Promise<AdminStats> {
    const response = await apiClient.get<AdminStats>('/admin/stats');
    return response.data;
  },

  /**
   * User Management
   */
  async getUsers(params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    search?: string;
  }): Promise<{ users: User[]; total: number }> {
    const response = await apiClient.get<{ users: User[]; total: number }>(
      '/admin/users',
      { params }
    );
    return response.data;
  },

  async getUser(userId: string): Promise<User> {
    const response = await apiClient.get<User>(`/admin/users/${userId}`);
    return response.data;
  },

  async suspendUser(userId: string, reason: string): Promise<User> {
    const response = await apiClient.post<User>(`/admin/users/${userId}/suspend`, {
      reason,
    });
    return response.data;
  },

  async banUser(userId: string, reason: string): Promise<User> {
    const response = await apiClient.post<User>(`/admin/users/${userId}/ban`, { reason });
    return response.data;
  },

  async reactivateUser(userId: string): Promise<User> {
    const response = await apiClient.post<User>(`/admin/users/${userId}/reactivate`);
    return response.data;
  },

  /**
   * Flagged Content Management
   */
  async getFlaggedContent(params?: {
    type?: string;
    status?: string;
  }): Promise<FlaggedContent[]> {
    const response = await apiClient.get<FlaggedContent[]>('/admin/flagged', {
      params,
    });
    return response.data;
  },

  async reviewFlaggedContent(
    flagId: string,
    action: 'dismiss' | 'remove'
  ): Promise<FlaggedContent> {
    const response = await apiClient.post<FlaggedContent>(
      `/admin/flagged/${flagId}/${action}`
    );
    return response.data;
  },

  async removeFlaggedContent(flagId: string): Promise<void> {
    await apiClient.delete(`/admin/flagged/${flagId}/content`);
  },

  /**
   * Support Ticket Management
   */
  async getSupportTickets(params?: {
    status?: string;
    priority?: string;
  }): Promise<AdminSupportTicket[]> {
    const response = await apiClient.get<AdminSupportTicket[]>('/admin/support', {
      params,
    });
    return response.data;
  },

  async assignSupportTicket(ticketId: string, adminId: string): Promise<AdminSupportTicket> {
    const response = await apiClient.post<AdminSupportTicket>(
      `/admin/support/${ticketId}/assign`,
      { adminId }
    );
    return response.data;
  },

  async updateSupportTicketPriority(
    ticketId: string,
    priority: 'low' | 'medium' | 'high'
  ): Promise<AdminSupportTicket> {
    const response = await apiClient.patch<AdminSupportTicket>(
      `/admin/support/${ticketId}/priority`,
      { priority }
    );
    return response.data;
  },

  async closeSupportTicket(ticketId: string): Promise<AdminSupportTicket> {
    const response = await apiClient.post<AdminSupportTicket>(
      `/admin/support/${ticketId}/close`
    );
    return response.data;
  },

  /**
   * Platform Settings
   */
  async getSettings(): Promise<PlatformSettings> {
    const response = await apiClient.get<PlatformSettings>('/admin/settings');
    return response.data;
  },

  async updateSettings(settings: Partial<PlatformSettings>): Promise<PlatformSettings> {
    const response = await apiClient.put<PlatformSettings>('/admin/settings', settings);
    return response.data;
  },

  /**
   * Analytics & Reports
   */
  async getAnalyticsReport(params: {
    startDate: string;
    endDate: string;
    metrics: string[];
  }): Promise<any> {
    const response = await apiClient.get('/admin/analytics', { params });
    return response.data;
  },

  /**
   * Featured Content Management
   */
  async featureGig(gigId: string): Promise<void> {
    await apiClient.post(`/admin/gigs/${gigId}/feature`);
  },

  async unfeatureGig(gigId: string): Promise<void> {
    await apiClient.delete(`/admin/gigs/${gigId}/feature`);
  },
};
