// Enhanced dashboard page with buyer/seller views

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth';
import { useCurrentUser, useSellerOrders, useBuyerOrders, useWallet, useMyGigs } from '@/hooks';
import { useSellerAnalytics } from '@/hooks/useAnalytics';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import { Chart } from '@/components/ui/Chart';
import { ProfileCompletionWidget } from '@/components/ui/ProfileCompletionWidget';
import Navbar from '@/components/sections/Navbar';
import type { OrderStatus } from '@/lib/api/types';

function DashboardContent() {
  const [viewMode, setViewMode] = useState<'seller' | 'buyer'>('seller');
  const { data: user } = useCurrentUser();
  const { data: sellerOrdersResponse } = useSellerOrders({ page: 1, pageSize: 5 });
  const { data: buyerOrdersResponse } = useBuyerOrders({ page: 1, pageSize: 5 });
  const { data: wallet } = useWallet();
  const { data: myGigs } = useMyGigs();
  const { data: analytics } = useSellerAnalytics();

  const ordersResponse = viewMode === 'seller' ? sellerOrdersResponse : buyerOrdersResponse;
  const activeGigs = myGigs?.filter(gig => gig.isActive) || [];

  // Calculate total spending for buyer view
  const totalSpending = buyerOrdersResponse?.items.reduce((sum, order) => sum + order.price, 0) || 0;
  const activeOrdersCount = buyerOrdersResponse?.items.filter((o: any) => 
    o.status !== 'Completed' && o.status !== 'Cancelled'
  ).length || 0;

  // Mock chart data (will be replaced with real API data)
  const revenueData = [
    { date: 'Mon', revenue: 1200 },
    { date: 'Tue', revenue: 1800 },
    { date: 'Wed', revenue: 1500 },
    { date: 'Thu', revenue: 2200 },
    { date: 'Fri', revenue: 2800 },
    { date: 'Sat', revenue: 3200 },
    { date: 'Sun', revenue: 2600 },
  ];

  const orderVolumeData = [
    { date: 'Mon', orders: 12 },
    { date: 'Tue', orders: 18 },
    { date: 'Wed', orders: 15 },
    { date: 'Thu', orders: 22 },
    { date: 'Fri', orders: 28 },
    { date: 'Sat', orders: 32 },
    { date: 'Sun', orders: 26 },
  ];

  const sellerStats = [
    {
      label: 'Available Balance',
      value: `$${wallet?.availableBalance.toFixed(2) || '0.00'}`,
      gradient: 'from-green-500 to-emerald-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      ),
      trend: analytics?.totalEarnings ? `+${((analytics.totalEarnings / 30) * 100).toFixed(1)}%` : null
    },
    {
      label: 'Total Earnings',
      value: `$${analytics?.totalEarnings.toFixed(2) || '0.00'}`,
      gradient: 'from-purple-500 to-pink-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      trend: '+12.5%'
    },
    {
      label: 'Active Orders',
      value: analytics?.activeOrders || sellerOrdersResponse?.totalCount || 0,
      gradient: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
      trend: analytics?.completionRate ? `${analytics.completionRate.toFixed(0)}% completion` : null
    },
    {
      label: 'Average Rating',
      value: analytics?.averageRating ? analytics.averageRating.toFixed(1) : '0.0',
      gradient: 'from-yellow-500 to-orange-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      trend: `${analytics?.totalReviews || 0} reviews`
    }
  ];

  const buyerStats = [
    {
      label: 'Total Spent',
      value: `$${totalSpending.toFixed(2)}`,
      gradient: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      ),
      trend: `${buyerOrdersResponse?.totalCount || 0} orders`
    },
    {
      label: 'Active Orders',
      value: activeOrdersCount,
      gradient: 'from-purple-500 to-pink-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
      trend: 'In progress'
    },
    {
      label: 'Completed Orders',
      value: buyerOrdersResponse?.items.filter((o: any) => o.status === 'Completed').length || 0,
      gradient: 'from-green-500 to-emerald-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      trend: 'Success rate'
    },
    {
      label: 'Favorites',
      value: '0',
      gradient: 'from-red-500 to-pink-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ),
      trend: 'Saved'
    }
  ];

  const stats = viewMode === 'seller' ? sellerStats : buyerStats;

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with View Toggle */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">Dashboard</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">Welcome back, <span className="font-semibold text-gray-900 dark:text-white">{user?.username}</span>!</p>
              </div>
              
              {/* View Mode Toggle */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-lg border border-gray-200/60 dark:border-gray-700">
                <button
                  onClick={() => setViewMode('seller')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    viewMode === 'seller'
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Seller View
                </button>
                <button
                  onClick={() => setViewMode('buyer')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    viewMode === 'buyer'
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Buyer View
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-gray-200/60 dark:border-gray-700/60 hover:shadow-2xl transition-all duration-500 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    {stat.trend && (
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-lg">
                        {stat.trend}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">{stat.label}</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/60 dark:border-gray-700/60 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href={viewMode === 'seller' ? '/gigs/create' : '/marketplace'}>
                  <Button className="w-full" variant="outline">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {viewMode === 'seller' ? 'Create Gig' : 'Browse Services'}
                  </Button>
                </Link>
                <Link href="/messages">
                  <Button className="w-full" variant="outline">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Messages
                  </Button>
                </Link>
                <Link href="/orders">
                  <Button className="w-full" variant="outline">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    View Orders
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button className="w-full" variant="outline">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.065 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.065c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.065-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Settings
                  </Button>
                </Link>
              </div>
            </div>

            {/* Profile Completion Widget */}
            <ProfileCompletionWidget className="mb-8" />

            {/* Seller Management Tools - Only visible in seller view */}
            {viewMode === 'seller' && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/60 dark:border-gray-700/60 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Seller Tools</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/marketing">
                    <Button className="w-full" variant="outline">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                      Marketing
                    </Button>
                  </Link>
                  <Link href="/business">
                    <Button className="w-full" variant="outline">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Business
                    </Button>
                  </Link>
                  <Link href="/customers">
                    <Button className="w-full" variant="outline">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Customers
                    </Button>
                  </Link>
                  <Link href="/goals">
                    <Button className="w-full" variant="outline">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      Goals
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Recent Orders */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/60 dark:border-gray-700/60 overflow-hidden">
                <div className="p-6 border-b border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
                  <Link href="/orders" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    View All →
                  </Link>
                </div>
                
                <div className="divide-y divide-gray-200/60 dark:divide-gray-700/60">
                  {ordersResponse?.items?.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">No orders yet</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Your recent orders will appear here</p>
                    </div>
                  ) : (
                    ordersResponse?.items?.slice(0, 5).map((order: any) => (
                      <Link key={order.id} href={`/orders/${order.id}`} className="block p-5 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{order.gigTitle}</h3>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">${order.price}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {viewMode === 'seller' ? 'Buyer' : 'Seller'}: <span className="font-medium">{viewMode === 'seller' ? order.buyerName : order.sellerName}</span>
                          </p>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            order.status === 'Completed' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : order.status === 'InProgress'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Active Gigs (Seller View) or Recent Notifications (Buyer View) */}
              {viewMode === 'seller' ? (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/60 dark:border-gray-700/60 overflow-hidden">
                  <div className="p-6 border-b border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Gigs</h2>
                    <Link href="/gigs/manage" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      Manage →
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-gray-200/60 dark:divide-gray-700/60 max-h-96 overflow-y-auto">
                    {activeGigs.length === 0 ? (
                      <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No active gigs</p>
                        <Link href="/gigs/create">
                          <Button className="mt-4" size="sm">Create Your First Gig</Button>
                        </Link>
                      </div>
                    ) : (
                      activeGigs.slice(0, 5).map((gig: any) => (
                        <Link key={gig.id} href={`/gigs/${gig.id}/edit`} className="block p-5 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded-xl flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">{gig.title}</h3>
                              <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                                <span className="flex items-center">
                                  <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  {(gig.averageRating || 0).toFixed(1)}
                                </span>
                                <span>•</span>
                                <span>{gig.orderCount || 0} orders</span>
                                <span>•</span>
                                <span className="font-semibold text-gray-900 dark:text-white">${gig.basePrice}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/60 dark:border-gray-700/60 overflow-hidden">
                  <div className="p-6 border-b border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                    <Link href="/notifications" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      View All →
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-gray-200/60 dark:divide-gray-700/60 max-h-96 overflow-y-auto">
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">No recent activity</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Charts Section (Seller Only) */}
            {viewMode === 'seller' && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Chart
                  data={revenueData}
                  type="area"
                  dataKey="revenue"
                  xAxisKey="date"
                  title="Revenue Trend (Last 7 Days)"
                  color="#8b5cf6"
                  valuePrefix="$"
                />
                <Chart
                  data={orderVolumeData}
                  type="bar"
                  dataKey="orders"
                  xAxisKey="date"
                  title="Order Volume (Last 7 Days)"
                  color="#3b82f6"
                />
              </div>
            )}

            {/* Performance Metrics (Seller Only) */}
            {viewMode === 'seller' && analytics && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/60 dark:border-gray-700/60 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Performance Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {analytics?.completionRate?.toFixed(1) || 0}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: `${analytics?.completionRate || 0}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {analytics?.responseTime || 0}h
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Response Time</div>
                    <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-semibold">Fast Response</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {analytics?.totalReviews || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Reviews</div>
                    <div className="mt-2 flex items-center justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className={`w-4 h-4 ${star <= (analytics?.averageRating || 0) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
