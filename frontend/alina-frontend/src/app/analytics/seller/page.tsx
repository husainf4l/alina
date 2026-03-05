'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Link from 'next/link';

export default function SellerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock data for revenue breakdown
  const revenueByGig = [
    { name: 'Logo Design', revenue: 4500, orders: 45, avgPrice: 100 },
    { name: 'WordPress Dev', revenue: 6400, orders: 32, avgPrice: 200 },
    { name: 'SEO Content', revenue: 2800, orders: 28, avgPrice: 100 },
    { name: 'Social Media', revenue: 2400, orders: 24, avgPrice: 100 },
    { name: 'Business Cards', revenue: 1260, orders: 18, avgPrice: 70 },
  ];

  // Mock data for revenue by category
  const revenueByCategory = [
    { category: 'Design', revenue: 5760, percentage: 36 },
    { category: 'Development', revenue: 6400, percentage: 40 },
    { category: 'Writing', revenue: 2800, percentage: 17.5 },
    { category: 'Marketing', revenue: 2400, percentage: 15 },
  ];

  // Mock data for customer insights
  const customerData = {
    totalCustomers: 156,
    newCustomers: 42,
    returningCustomers: 114,
    repeatRate: 73,
    topCountries: [
      { country: 'United States', count: 68, percentage: 44 },
      { country: 'United Kingdom', count: 32, percentage: 20 },
      { country: 'Canada', count: 24, percentage: 15 },
      { country: 'Australia', count: 18, percentage: 12 },
      { country: 'Germany', count: 14, percentage: 9 },
    ],
  };

  // Mock data for performance metrics
  const performanceMetrics = {
    responseTime: '1.2 hours',
    deliveryOnTime: 94,
    orderCompletion: 96,
    cancellationRate: 2,
    revisionRate: 18,
    avgRating: 4.8,
    totalReviews: 187,
    ratingBreakdown: [
      { stars: 5, count: 142, percentage: 76 },
      { stars: 4, count: 31, percentage: 17 },
      { stars: 3, count: 10, percentage: 5 },
      { stars: 2, count: 3, percentage: 2 },
      { stars: 1, count: 1, percentage: 0.5 },
    ],
  };

  // Mock data for revenue trend
  const revenueTrend = [
    { month: 'Sep', revenue: 3200, orders: 28 },
    { month: 'Oct', revenue: 4100, orders: 35 },
    { month: 'Nov', revenue: 4900, orders: 42 },
    { month: 'Dec', revenue: 5800, orders: 51 },
    { month: 'Jan', revenue: 6400, orders: 58 },
    { month: 'Feb', revenue: 7200, orders: 64 },
  ];

  // Platform average comparison
  const platformAverage = {
    responseTime: '2.5 hours',
    deliveryOnTime: 85,
    orderCompletion: 88,
    avgRating: 4.3,
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <Link href="/analytics" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                  ← Back to Analytics
                </Link>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Seller Performance</h1>
                <p className="text-gray-600 dark:text-gray-400">Detailed insights into your selling performance</p>
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

            {/* Performance Overview */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{performanceMetrics.responseTime}</div>
                <div className="flex items-center text-sm">
                  <span className="text-green-600 font-semibold">52% faster</span>
                  <span className="text-gray-500 ml-1">than average</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">On-Time Delivery</span>
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{performanceMetrics.deliveryOnTime}%</div>
                <div className="flex items-center text-sm">
                  <span className="text-green-600 font-semibold">+9%</span>
                  <span className="text-gray-500 ml-1">vs platform avg</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{performanceMetrics.orderCompletion}%</div>
                <div className="flex items-center text-sm">
                  <span className="text-green-600 font-semibold">+8%</span>
                  <span className="text-gray-500 ml-1">vs platform avg</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Repeat Customer Rate</span>
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{customerData.repeatRate}%</div>
                <div className="text-sm text-gray-500">
                  {customerData.returningCustomers} of {customerData.totalCustomers} customers
                </div>
              </div>
            </div>

            {/* Revenue Trend */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Revenue & Order Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    name="Orders"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Breakdown & Customer Insights */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Revenue by Gig */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Revenue by Gig</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByGig} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="name" type="category" width={100} stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: 'none', 
                        borderRadius: '12px',
                        color: '#fff'
                      }}
                      formatter={(value: number | undefined) => value ? `$${value}` : '$0'}
                    />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Customer Geography */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Top Customer Locations</h2>
                <div className="space-y-4">
                  {customerData.topCountries.map((country, index) => (
                    <div key={country.country}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">{country.country}</span>
                        <span className="text-sm text-gray-500">{country.count} customers ({country.percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                          style={{ width: `${country.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews & Rating Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Rating Analysis</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Overall Rating */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">{performanceMetrics.avgRating}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{performanceMetrics.totalReviews} reviews</p>
                </div>

                {/* Rating Breakdown */}
                <div className="md:col-span-2 space-y-3">
                  {performanceMetrics.ratingBreakdown.map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3">
                      <span className="w-12 text-sm font-medium text-gray-700 dark:text-gray-300">{rating.stars} star</span>
                      <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 rounded-full transition-all"
                          style={{ width: `${rating.percentage}%` }}
                        />
                      </div>
                      <span className="w-16 text-sm text-gray-500 text-right">{rating.count} ({rating.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Platform Comparison */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Performance vs. Platform Average</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-white/80 mb-2">Response Time</p>
                  <div className="text-3xl font-bold">{performanceMetrics.responseTime}</div>
                  <p className="text-sm text-white/60">Platform: {platformAverage.responseTime}</p>
                </div>
                <div>
                  <p className="text-white/80 mb-2">On-Time Delivery</p>
                  <div className="text-3xl font-bold">{performanceMetrics.deliveryOnTime}%</div>
                  <p className="text-sm text-white/60">Platform: {platformAverage.deliveryOnTime}%</p>
                </div>
                <div>
                  <p className="text-white/80 mb-2">Completion Rate</p>
                  <div className="text-3xl font-bold">{performanceMetrics.orderCompletion}%</div>
                  <p className="text-sm text-white/60">Platform: {platformAverage.orderCompletion}%</p>
                </div>
                <div>
                  <p className="text-white/80 mb-2">Avg. Rating</p>
                  <div className="text-3xl font-bold">{performanceMetrics.avgRating}</div>
                  <p className="text-sm text-white/60">Platform: {platformAverage.avgRating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
