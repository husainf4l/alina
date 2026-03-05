// Admin Dashboard types

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalGigs: number;
  activeGigs: number;
  totalOrders: number;
  completedOrders: number;
  totalRevenue: number;
  platformFees: number;
  pendingWithdrawals: number;
  openDisputes: number;
}

export interface UserManagement {
  id: string;
  username: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  totalOrders: number;
  totalSpent: number;
  totalEarned: number;
  createdAt: string;
  lastActive: string;
}

export interface ContentModeration {
  id: string;
  type: 'gig' | 'task' | 'review' | 'message';
  content: string;
  reportedBy: string;
  reportReason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface PlatformAnalytics {
  period: string;
  newUsers: number;
  newGigs: number;
  newOrders: number;
  revenue: number;
  activeConversations: number;
}
