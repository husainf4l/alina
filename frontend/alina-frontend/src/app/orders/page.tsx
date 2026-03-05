'use client';

import React, { useState, useMemo } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { useBuyerOrders, useSellerOrders, useStartOrder, useDeliverOrder, useAcceptDelivery } from '@/hooks/useOrders';
import { useToast } from '@/contexts/ToastContext';
import { InfiniteScroll } from '@/hooks/useInfiniteScroll';
import Link from 'next/link';
import { OrderStatus } from '@/lib/api/types';
import type { Order } from '@/lib/api/types';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'buying' | 'selling'>('buying');
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [page, setPage] = useState(1);
  const toast = useToast();

  // API Hooks
  const { data: buyingData, isLoading: buyingLoading, error: buyingError } = useBuyerOrders({ 
    status: filterStatus, 
    page, 
    pageSize: 10 
  });
  
  const { data: sellingData, isLoading: sellingLoading, error: sellingError } = useSellerOrders({ 
    status: filterStatus, 
    page, 
    pageSize: 10 
  });

  const startOrder = useStartOrder();
  const deliverOrder = useDeliverOrder();
  const acceptDelivery = useAcceptDelivery();

  // Data based on active tab
  const data = activeTab === 'buying' ? buyingData : sellingData;
  const isLoading = activeTab === 'buying' ? buyingLoading : sellingLoading;
  const error = activeTab === 'buying' ? buyingError : sellingError;
  const allOrders = data?.items || [];

  // Filter orders by date range
  const orders = useMemo(() => {
    if (dateRange === 'all') return allOrders;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return allOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      
      switch (dateRange) {
        case 'today':
          const orderDay = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate());
          return orderDay.getTime() === today.getTime();
        
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= weekAgo;
        
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDate >= monthAgo;
        
        default:
          return true;
      }
    });
  }, [allOrders, dateRange]);

  const hasMore = data ? data.page < data.totalPages : false;

  // Actions
  const handleStartOrder = async (orderId: string) => {
    try {
      await startOrder.mutateAsync(orderId);
      toast.success('Order started successfully!');
    } catch (error) {
      toast.error('Failed to start order');
    }
  };

  const handleAcceptDelivery = async (orderId: string) => {
    try {
      await acceptDelivery.mutateAsync(orderId);
      toast.success('Delivery accepted!');
    } catch (error) {
      toast.error('Failed to accept delivery');
    }
  };

  const loadMore = () => {
    if (hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending:
        return 'bg-gradient-to-br from-yellow-500 to-orange-500';
      case OrderStatus.RequirementsSubmitted:
      case OrderStatus.InProgress:
        return 'bg-gradient-to-br from-blue-500 to-cyan-500';
      case OrderStatus.Delivered:
        return 'bg-gradient-to-br from-purple-500 to-pink-500';
      case OrderStatus.Revision:
        return 'bg-gradient-to-br from-orange-500 to-yellow-500';
      case OrderStatus.Completed:
        return 'bg-gradient-to-br from-green-500 to-emerald-500';
      case OrderStatus.Cancelled:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
      case OrderStatus.Disputed:
        return 'bg-gradient-to-br from-red-500 to-red-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    return status.replace(/([A-Z])/g, ' $1').trim();
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  const getDaysRemaining = (deliveryDate: string) => {
    const now = new Date();
    const due = new Date(deliveryDate);
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  return (
    <ProtectedRoute>
      <PageTransition>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
            <div className="max-w-7xl mx-auto px-6">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Orders</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your buying and selling activities</p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => {
                    setActiveTab('buying');
                    setPage(1);
                    setFilterStatus(undefined);
                    setDateRange('all');
                  }}
                  className={`
                    px-6 py-3 rounded-2xl font-semibold transition-all
                    ${activeTab === 'buying' 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  Buying ({buyingData?.totalCount || 0})
                </button>
                <button
                  onClick={() => {
                    setActiveTab('selling');
                    setPage(1);
                    setFilterStatus(undefined);
                    setDateRange('all');
                  }}
                  className={`
                    px-6 py-3 rounded-2xl font-semibold transition-all
                    ${activeTab === 'selling' 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  Selling ({sellingData?.totalCount || 0})
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 mb-6 border border-gray-100 dark:border-gray-700">
                {/* Status Filters */}
                <div className="flex items-center gap-3 flex-wrap mb-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                  {[
                    { value: undefined, label: 'All Orders' },
                    { value: OrderStatus.Pending.toString(), label: 'Pending' },
                    { value: OrderStatus.InProgress.toString(), label: 'In Progress' },
                    { value: OrderStatus.Delivered.toString(), label: 'Delivered' },
                    { value: OrderStatus.Completed.toString(), label: 'Completed' }
                  ].map((filter) => (
                    <button
                      key={filter.label}
                      onClick={() => {
                        setFilterStatus(filter.value);
                        setPage(1);
                      }}
                      className={`
                        px-4 py-2 rounded-xl text-sm font-medium transition-all
                        ${filterStatus === filter.value
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }
                      `}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Date Range Filters */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Date:</span>
                  {[
                    { value: 'all' as const, label: 'All Time' },
                    { value: 'today' as const, label: 'Today' },
                    { value: 'week' as const, label: 'This Week' },
                    { value: 'month' as const, label: 'This Month' }
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setDateRange(filter.value);
                        setPage(1);
                      }}
                      className={`
                        px-4 py-2 rounded-xl text-sm font-medium transition-all
                        ${dateRange === filter.value
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }
                      `}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error State */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-3xl p-6 mb-6">
                  <p className="text-red-800 dark:text-red-200">Failed to load orders. Please try again.</p>
                </div>
              )}

              {/* Loading State */}
              {isLoading && page === 1 ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
                      <div className="flex gap-6">
                        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                          <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((j) => (
                              <div key={j} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 border border-gray-100 dark:border-gray-700">
                  <EmptyState
                    icon={
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    }
                    title={`No ${filterStatus ? 'matching ' : ''} orders`}
                    description={activeTab === 'buying' 
                      ? 'Start exploring services to place your first order'
                      : 'No orders yet. Promote your services to get started'
                    }
                    action={{
                      label: activeTab === 'buying' ? 'Browse Marketplace' : 'View Dashboard',
                      onClick: () => window.location.href = activeTab === 'buying' ? '/marketplace' : '/dashboard',
                    }}
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-6">
                          {/* Order Image */}
                          <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                            {order.gigImage ? (
                              <img src={order.gigImage} alt={order.gigTitle} className="w-full h-full object-cover" />
                            ) : (
                              <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>

                          {/* Order Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{order.gigTitle}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {activeTab === 'buying' ? 'Seller: ' : 'Buyer: '}
                                  <span className="font-medium">
                                    {activeTab === 'buying' ? order.sellerName : order.buyerName}
                                  </span>
                                </p>
                              </div>
                              <div className={`${getStatusColor(order.status)} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                                {getStatusLabel(order.status)}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Order ID</div>
                                <div className="font-medium text-gray-900 dark:text-white">#{order.id.slice(0, 8)}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price</div>
                                <div className="font-bold text-gray-900 dark:text-white">${order.price.toFixed(2)}</div>
                                {activeTab === 'selling' && order.commissionAmount !== undefined && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Fee: ${order.commissionAmount.toFixed(2)} ({order.platformFeePercentage}%)
                                  </div>
                                )}
                              </div>
                              {activeTab === 'selling' && order.sellerReceives !== undefined ? (
                                <div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">You Receive</div>
                                  <div className="font-bold text-green-600 dark:text-green-400">${order.sellerReceives.toFixed(2)}</div>
                                </div>
                              ) : (
                                <div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Order Date</div>
                                  <div className="font-medium text-gray-900 dark:text-white">{formatDate(order.createdAt)}</div>
                                </div>
                              )}
                              <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  {order.status === OrderStatus.Completed ? 'Completed' : 'Due Date'}
                                </div>
                                <div className={`font-medium ${order.status === OrderStatus.InProgress ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-white'}`}>
                                  {order.completedAt ? formatDate(order.completedAt) : (order.deliveryDate ? getDaysRemaining(order.deliveryDate) : (order.deadline ? getDaysRemaining(order.deadline) : 'N/A'))}
                                </div>
                              </div>
                            </div>

                            {/* File Attachments */}
                            {order.attachments && order.attachments.length > 0 && (
                              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Attachments ({order.attachments.length})</div>
                                <div className="flex gap-2 flex-wrap">
                                  {order.attachments.slice(0, 3).map((attachment) => (
                                    <a 
                                      key={attachment.id}
                                      href={attachment.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-2 rounded-lg text-xs transition-colors"
                                    >
                                      {attachment.fileType.startsWith('image/') ? (
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                      ) : (
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                      )}
                                      <span className="text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                                        {attachment.fileName}
                                      </span>
                                      <span className="text-gray-400 dark:text-gray-500 text-xs">
                                        {(attachment.fileSize / 1024).toFixed(0)}KB
                                      </span>
                                    </a>
                                  ))}
                                  {order.attachments.length > 3 && (
                                    <div className="flex items-center px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
                                      +{order.attachments.length - 3} more
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Delivery Message */}
                            {order.deliveryMessage && (
                              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Delivery Message</div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                  {order.deliveryMessage}
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 flex-wrap">
                              <Link href={`/orders/${order.id}`}>
                                <Button size="sm">View Details</Button>
                              </Link>
                              
                              {activeTab === 'buying' && order.status === OrderStatus.Delivered && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="secondary"
                                    onClick={() => handleAcceptDelivery(order.id)}
                                    disabled={acceptDelivery.isPending}
                                  >
                                    Accept Delivery
                                  </Button>
                                  <Button size="sm" variant="outline">Request Revision</Button>
                                </>
                              )}
                              
                              {activeTab === 'selling' && order.status === OrderStatus.Pending && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="secondary"
                                    onClick={() => handleStartOrder(order.id)}
                                    disabled={startOrder.isPending}
                                  >
                                    Accept Order
                                  </Button>
                                  <Button size="sm" variant="outline">Decline</Button>
                                </>
                              )}
                              
                              {activeTab === 'selling' && order.status === OrderStatus.InProgress && (
                                <Link href={`/orders/${order.id}/deliver`}>
                                  <Button size="sm" variant="secondary">Deliver Order</Button>
                                </Link>
                              )}
                              
                              <Link href={`/messages?conversation=${activeTab === 'buying' ? order.sellerId : order.buyerId}`}>
                                <Button size="sm" variant="ghost">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                  </svg>
                                  Message
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Infinite Scroll */}
                  <InfiniteScroll
                    onLoadMore={loadMore}
                    hasMore={hasMore}
                    isLoading={isLoading}
                    loader={
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
                      </div>
                    }
                    endMessage={
                      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                        You've seen all orders!
                      </p>
                    }
                  />
                </>
              )}
            </div>
          </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
