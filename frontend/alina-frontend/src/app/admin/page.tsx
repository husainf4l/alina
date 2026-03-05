'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Mock data
  const stats = {
    totalUsers: 12845,
    activeUsers: 8932,
    totalGigs: 3421,
    totalOrders: 9876,
    totalRevenue: 456789,
    pendingDisputes: 23,
    flaggedContent: 12,
    activeSupport: 5,
  };

  const revenueData = [
    { month: 'Jan', revenue: 35000 },
    { month: 'Feb', revenue: 42000 },
    { month: 'Mar', revenue: 38000 },
    { month: 'Apr', revenue: 51000 },
    { month: 'May', revenue: 48000 },
    { month: 'Jun', revenue: 62000 },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 8500 },
    { month: 'Feb', users: 9200 },
    { month: 'Mar', users: 10100 },
    { month: 'Apr', users: 11000 },
    { month: 'May', users: 11800 },
    { month: 'Jun', users: 12845 },
  ];

  const recentUsers = [
    { id: '1', name: 'John Smith', email: 'john@example.com', joinedAt: '2026-03-03', status: 'active', type: 'buyer' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com', joinedAt: '2026-03-03', status: 'active', type: 'seller' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', joinedAt: '2026-03-02', status: 'pending', type: 'seller' },
  ];

  const flaggedItems = [
    { id: '1', type: 'gig', title: 'Suspicious Service Offering', reporter: 'User #234', reason: 'Inappropriate content', createdAt: '2026-03-03' },
    { id: '2', type: 'user', title: 'Spam Account', reporter: 'System', reason: 'Automated detection', createdAt: '2026-03-03' },
  ];

  return (
    <ProtectedRoute requiredRole="admin">
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Platform overview and management</p>
              </div>
              <div className="flex gap-2">
                {(['7d', '30d', '90d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                      timeRange === range
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold opacity-90">Total Users</h3>
                  <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-4xl font-bold mb-1">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm opacity-80">{stats.activeUsers.toLocaleString()} active</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold opacity-90">Total Gigs</h3>
                  <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-4xl font-bold mb-1">{stats.totalGigs.toLocaleString()}</p>
                <p className="text-sm opacity-80">Active listings</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold opacity-90">Total Revenue</h3>
                  <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-4xl font-bold mb-1">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm opacity-80">Platform earnings</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold opacity-90">Total Orders</h3>
                  <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-4xl font-bold mb-1">{stats.totalOrders.toLocaleString()}</p>
                <p className="text-sm opacity-80">Completed orders</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Revenue Over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">User Growth</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alerts */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <Link href="/admin/disputes" className="bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl p-6 text-white hover:opacity-90 transition-opacity">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Pending Disputes</h3>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-5xl font-bold">{stats.pendingDisputes}</p>
                <p className="text-sm opacity-80 mt-2">Require attention</p>
              </Link>

              <Link href="/admin/flagged" className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl p-6 text-white hover:opacity-90 transition-opacity">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Flagged Content</h3>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-5xl font-bold">{stats.flaggedContent}</p>
                <p className="text-sm opacity-80 mt-2">Awaiting review</p>
              </Link>

              <Link href="/admin/support" className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 text-white hover:opacity-90 transition-opacity">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Active Support</h3>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
                <p className="text-5xl font-bold">{stats.activeSupport}</p>
                <p className="text-sm opacity-80 mt-2">Open tickets</p>
              </Link>
            </div>

            {/* Tables */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Users</h3>
                  <Link href="/admin/users" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    View all
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          user.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {user.status}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{user.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flagged Content */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Flagged Content</h3>
                  <Link href="/admin/flagged" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    View all
                  </Link>
                </div>
                <div className="space-y-3">
                  {flaggedItems.map((item) => (
                    <div key={item.id} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
                      <div className="flex items-start justify-between mb-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          item.type === 'gig' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                          'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {item.type}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reported by: {item.reporter}</p>
                      <p className="text-xs text-red-600 dark:text-red-400">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
