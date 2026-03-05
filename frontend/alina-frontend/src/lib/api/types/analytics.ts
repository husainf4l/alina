// Analytics types

export interface SellerAnalytics {
  totalEarnings: number;
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  averageRating: number;
  totalReviews: number;
  responseTime: number;
  completionRate: number;
  earnings: EarningsData[];
  orders: OrdersData[];
  topGigs: TopGig[];
}

export interface EarningsData {
  date: string;
  amount: number;
}

export interface OrdersData {
  date: string;
  count: number;
}

export interface TopGig {
  gigId: string;
  gigTitle: string;
  orders: number;
  earnings: number;
  rating: number;
}

export interface PlatformMetrics {
  totalUsers: number;
  totalSellers: number;
  totalOrders: number;
  totalRevenue: number;
  activeOrders: number;
  userGrowth: GrowthData[];
  orderGrowth: GrowthData[];
  revenueGrowth: GrowthData[];
  topCategories: CategoryMetric[];
  topSellers: SellerMetric[];
}

export interface GrowthData {
  date: string;
  value: number;
}

export interface CategoryMetric {
  categoryId: string;
  categoryName: string;
  gigCount: number;
  orderCount: number;
  revenue: number;
}

export interface SellerMetric {
  sellerId: string;
  sellerName: string;
  orders: number;
  revenue: number;
  rating: number;
}

export interface DateRangeRequest {
  startDate: string;
  endDate: string;
}
