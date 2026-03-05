'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock data for revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 4200, orders: 12 },
    { month: 'Feb', revenue: 5800, orders: 18 },
    { month: 'Mar', revenue: 4900, orders: 15 },
    { month: 'Apr', revenue: 6400, orders: 21 },
    { month: 'May', revenue: 7200, orders: 24 },
    { month: 'Jun', revenue: 8100, orders: 28 },
  ];

  // Mock data for category breakdown
  const categoryData = [
    { name: 'Graphics & Design', value: 3500, color: '#3b82f6' },
    { name: 'Web Development', value: 2800, color: '#10b981' },
    { name: 'Writing & Translation', value: 1900, color: '#f59e0b' },
    { name: 'Marketing', value: 1400, color: '#8b5cf6' },
    { name: 'Other', value: 900, color: '#6b7280' },
  ];

  // Mock data for top gigs
  const topGigs = [
    { id: '1', title: 'Professional Logo Design', orders: 45, revenue: 4500, rating: 4.9 },
    { id: '2', title: 'WordPress Website Development', orders: 32, revenue: 6400, rating: 4.8 },
    { id: '3', title: 'SEO Content Writing', orders: 28, revenue: 2800, rating: 4.7 },
    { id: '4', title: 'Social Media Marketing', orders: 24, revenue: 2400, rating: 4.9 },
    { id: '5', title: 'Business Card Design', orders: 18, revenue: 1260, rating: 4.6 },
  ];

  // Calculate totals
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Track your performance and earnings</p>
              </div>
              
              {/* Time Range Selector */}
              <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-2xl p-2 border border-gray-200 dark:border-gray-700">
                {(['7d', '30d', '90d', '1y'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      timeRange === range
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {range === '7d' && 'Last 7 Days'}
                    {range === '30d' && 'Last 30 Days'}
                    {range === '90d' && 'Last 90 Days'}
                    {range === '1y' && 'Last Year'}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</span>
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">${totalRevenue.toLocaleString()}</div>
                <div className="flex items-center text-sm">
                  <span className="text-green-600 font-semibold">+12.5%</span>
                  <span className="text-gray-500 ml-1">vs last period</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Orders</span>
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{totalOrders}</div>
                <div className="flex items-center text-sm">
                  <span className="text-green-600 font-semibold">+8.2%</span>
                  <span className="text-gray-500 ml-1">vs last period</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Order Value</span>
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">${avgOrderValue.toFixed(2)}</div>
                <div className="flex items-center text-sm">
                  <span className="text-green-600 font-semibold">+4.1%</span>
                  <span className="text-gray-500 ml-1">vs last period</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</span>
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">4.8</div>
                <div className="flex items-center text-sm">
                  <span className="text-green-600 font-semibold">+0.2</span>
                  <span className="text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Revenue Trend */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Revenue Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: 'none', 
                        borderRadius: '12px',
                        color: '#fff'
                      }}
                      formatter={(value: number | undefined) => value ? `$${value}` : '$0'}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Revenue by Category</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: $${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number | undefined) => value ? `$${value}` : '$0'} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orders Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Orders Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Gigs Table */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Top Performing Gigs</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Gig Title</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Orders</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Revenue</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Rating</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topGigs.map((gig, index) => (
                      <tr 
                        key={gig.id}
                        className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                            <span className="font-medium text-gray-900 dark:text-white">{gig.title}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-700 dark:text-gray-300">{gig.orders}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-green-600">${gig.revenue.toLocaleString()}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-gray-900 dark:text-white font-semibold">{gig.rating}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
