'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import { Chart } from '@/components/ui/Chart';

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive'>('all');

  // Mock data
  const customers = [
   { id: '1', name: 'John Doe', email: 'john@example.com', totalOrders: 12, totalSpent: 2450, averageRating: 4.8, lastOrderDate: '2026-02-28', status: 'active' as const },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', totalOrders: 8, totalSpent: 1680, averageRating: 5.0, lastOrderDate: '2026-03-01', status: 'active' as const },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', totalOrders: 15, totalSpent: 3200, averageRating: 4.9, lastOrderDate: '2026-03-02', status: 'active' as const },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', totalOrders: 5, totalSpent: 890, averageRating: 4.5, lastOrderDate: '2026-01-15', status: 'inactive' as const },
    { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', totalOrders: 20, totalSpent: 5400, averageRating: 5.0, lastOrderDate: '2026-03-03', status: 'active' as const },
  ];

  const segments = [
    { name: 'VIP Customers', count: 8, totalRevenue: 12500, averageOrderValue: 520 },
    { name: 'Regular Customers', count: 24, totalRevenue: 18200, averageOrderValue: 280 },
    { name: 'New Customers', count: 15, totalRevenue: 4800, averageOrderValue: 180 },
    { name: 'At Risk', count: 6, totalRevenue: 2100, averageOrderValue: 220 },
  ];

  const customerGrowthData = [
    { month: 'Jan', customers: 28 },
    { month: 'Feb', customers: 32 },
    { month: 'Mar', customers: 38 },
    { month: 'Apr', customers: 44 },
    { month: 'May', customers: 48 },
    { month: 'Jun', customers: 53 },
  ];

  const filteredCustomers = customers.filter(c =>
    activeTab === 'all' || c.status === activeTab
  );

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Customer Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Track and manage your customer relationships</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 text-white">
                <div className="text-3xl font-bold mb-1">{stats.total}</div>
                <div className="text-sm opacity-90">Total Customers</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-6 text-white">
                <div className="text-3xl font-bold mb-1">{stats.active}</div>
                <div className="text-sm opacity-90">Active Customers</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl p-6 text-white">
                <div className="text-3xl font-bold mb-1">{stats.inactive}</div>
                <div className="text-sm opacity-90">Inactive Customers</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-white">
                <div className="text-3xl font-bold mb-1">${stats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm opacity-90">Total Revenue</div>
              </div>
            </div>

            {/* Customer Growth Chart */}
            <div className="mb-8">
              <Chart
                data={customerGrowthData}
                type="area"
                dataKey="customers"
                xAxisKey="month"
                title="Customer Growth"
                color="#8b5cf6"
              />
            </div>

            {/* Customer Segments */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Customer Segments</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {segments.map((segment) => (
                  <div key={segment.name} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{segment.name}</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Count</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{segment.count}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Revenue</div>
                        <div className="text-lg font-semibold text-green-600 dark:text-green-400">${segment.totalRevenue.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Avg Order Value</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">${segment.averageOrderValue}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer List */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customer List</h2>
                <div className="flex gap-2">
                  {['all', 'active', 'inactive'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`
                        px-4 py-2 rounded-xl font-medium capitalize transition-all
                        ${activeTab === tab
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                        }
                      `}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Total Orders
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Total Spent
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Last Order
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{customer.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900 dark:text-white">{customer.totalOrders}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-green-600 dark:text-green-400">${customer.totalSpent.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-semibold text-gray-900 dark:text-white">{customer.averageRating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(customer.lastOrderDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`
                              px-3 py-1 rounded-full text-xs font-semibold
                              ${customer.status === 'active'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                              }
                            `}>
                              {customer.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button size="sm" variant="outline">View Profile</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
