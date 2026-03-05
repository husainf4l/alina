'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import { Chart } from '@/components/ui/Chart';
import Link from 'next/link';

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<'promotions' | 'ads' | 'insights'>('promotions');

  // Mock data (will be replaced with real API)
  const promotions = [
    {
      id: '1',
      title: 'Summer Sale Promotion',
      type: 'Discount',
      status: 'Active',
      startDate: '2026-03-01',
      endDate: '2026-03-31',
      budget: 500,
      impressions: 12500,
      clicks: 850,
      conversions: 45,
    },
    {
      id: '2',
      title: 'New Customer Campaign',
      type: 'Featured',
      status: 'Active',
      startDate: '2026-03-01',
      endDate: '2026-04-01',
      budget: 300,
      impressions: 8200,
      clicks: 520,
      conversions: 28,
    },
  ];

  const ads = [
    {
      id: '1',
      title: 'Google Search Ad - Logo Design',
      platform: 'Google',
      status: 'Active',
      budget: 200,
      spent: 145.50,
      impressions: 5400,
      clicks: 320,
      conversions: 18,
    },
    {
      id: '2',
      title: 'Facebook Ad - Web Development',
      platform: 'Facebook',
      status: 'Active',
      budget: 150,
      spent: 89.20,
      impressions: 3200,
      clicks: 180,
      conversions: 12,
    },
  ];

  const insights = {
    totalImpressions: 29300,
    totalClicks: 1870,
    totalConversions: 103,
    clickThroughRate: 6.4,
    conversionRate: 5.5,
    costPerClick: 1.25,
    costPerConversion: 22.77,
    returnOnAdSpend: 3.2,
  };

  const impressionsData = [
    { date: 'Mon', impressions: 4200 },
    { date: 'Tue', impressions: 4800 },
    { date: 'Wed', impressions: 3900 },
    { date: 'Thu', impressions: 5200 },
    { date: 'Fri', impressions: 5800 },
    { date: 'Sat', impressions: 3100 },
    { date: 'Sun', impressions: 2300 },
  ];

  const conversionsData = [
    { date: 'Mon', conversions: 15 },
    { date: 'Tue', conversions: 18 },
    { date: 'Wed', conversions: 12 },
    { date: 'Thu', conversions: 22 },
    { date: 'Fri', conversions: 21 },
    { date: 'Sat', conversions: 9 },
    { date: 'Sun', conversions: 6 },
  ];

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Marketing Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your promotions and advertising campaigns</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-4 mb-6">
              {['promotions', 'ads', 'insights'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`
                    px-6 py-3 rounded-2xl font-semibold transition-all capitalize
                    ${activeTab === tab
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Promotions Tab */}
            {activeTab === 'promotions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Promotions</h2>
                  <Button>Create Promotion</Button>
                </div>

                <div className="grid gap-4">
                  {promotions.map((promo) => (
                    <div key={promo.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{promo.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{promo.type} • {promo.status}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Pause</Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Budget</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">${promo.budget}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Impressions</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{promo.impressions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Clicks</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{promo.clicks}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Conversions</div>
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">{promo.conversions}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          CTR: {((promo.clicks / promo.impressions) * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ads Tab */}
            {activeTab === 'ads' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Ads</h2>
                  <Button>Create Ad</Button>
                </div>

                <div className="grid gap-4">
                  {ads.map((ad) => (
                    <div key={ad.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{ad.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                              {ad.platform}
                            </span>
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                              {ad.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Pause</Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Budget</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">${ad.budget}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Spent</div>
                          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">${ad.spent}</div>
                        </div>
                        <div>
                          <div className=" text-xs text-gray-500 dark:text-gray-400">Impressions</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{ad.impressions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Clicks</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{ad.clicks}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Conversions</div>
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">{ad.conversions}</div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                          style={{ width: `${(ad.spent / ad.budget) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {((ad.spent / ad.budget) * 100).toFixed(1)}% of budget used
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights Tab */}
            {activeTab === 'insights' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Marketing Insights</h2>

                {/* KPI Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 text-white">
                    <div className="text-3xl font-bold mb-1">{insights.totalImpressions.toLocaleString()}</div>
                    <div className="text-sm opacity-90">Total Impressions</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-white">
                    <div className="text-3xl font-bold mb-1">{insights.totalClicks.toLocaleString()}</div>
                    <div className="text-sm opacity-90">Total Clicks</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-6 text-white">
                    <div className="text-3xl font-bold mb-1">{insights.totalConversions}</div>
                    <div className="text-sm opacity-90">Conversions</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl p-6 text-white">
                    <div className="text-3xl font-bold mb-1">{insights.returnOnAdSpend}x</div>
                    <div className="text-sm opacity-90">ROAS</div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Chart
                    data={impressionsData}
                    type="area"
                    dataKey="impressions"
                    xAxisKey="date"
                    title="Impressions (Last 7 Days)"
                    color="#6366f1"
                  />
                  <Chart
                    data={conversionsData}
                    type="bar"
                    dataKey="conversions"
                    xAxisKey="date"
                    title="Conversions (Last 7 Days)"
                    color="#10b981"
                  />
                </div>

                {/* Performance Metrics */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{insights.clickThroughRate}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Click-Through Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{insights.conversionRate}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">${insights.costPerClick}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Cost Per Click</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">${insights.costPerConversion}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Cost Per Conversion</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
