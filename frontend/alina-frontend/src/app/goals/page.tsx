'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import { Chart } from '@/components/ui/Chart';

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  // Mock data (will be replaced with real API)
  const goals = [
    {
      id: '1',
      type: 'revenue' as const,
      title: 'Monthly Revenue Goal',
      description: 'Reach $10,000 in revenue this month',
      targetValue: 10000,
      currentValue: 7500,
      period: 'monthly' as const,
      status: 'active' as const,
      startDate: '2026-03-01',
      endDate: '2026-03-31',
      progress: 75,
    },
    {
      id: '2',
      type: 'orders' as const,
      title: 'Complete 50 Orders',
      description: 'Process 50 orders this month',
      targetValue: 50,
      currentValue: 38,
      period: 'monthly' as const,
      status: 'active' as const,
      startDate: '2026-03-01',
      endDate: '2026-03-31',
      progress: 76,
    },
    {
      id: '3',
      type: 'rating' as const,
      title: 'Maintain 4.5+ Rating',
      description: 'Keep average rating above 4.5 stars',
      targetValue: 4.5,
      currentValue: 4.8,
      period: 'monthly' as const,
      status: 'active' as const,
      startDate: '2026-03-01',
      endDate: '2026-03-31',
      progress: 100,
    },
    {
      id: '4',
      type: 'orders' as const,
      title: 'February Goal',
      description: 'Complete 40 orders in February',
      targetValue: 40,
      currentValue: 45,
      period: 'monthly' as const,
      status: 'completed' as const,
      startDate: '2026-02-01',
      endDate: '2026-02-28',
      progress: 100,
    },
  ];

  const achievements = [
    { id: '1', title: 'First Sale', description: 'Made your first sale', icon: '🎉', earnedAt: '2026-01-15', tier: 'bronze' },
    { id: '2', title: '10 Orders', description: 'Completed 10 orders', icon: '🏅', earnedAt: '2026-01-28', tier: 'bronze' },
    { id: '3', title: '5-Star Seller', description: 'Maintained 5.0 rating for a month', icon: '⭐', earnedAt: '2026-02-15', tier: 'gold' },
    { id: '4', title: 'Revenue Milestone', description: 'Earned $5,000 in total', icon: '💰', earnedAt: '2026-02-28', tier: 'silver' },
    { id: '5', title: 'Fast Responder', description: 'Response time under 1 hour', icon: '⚡', earnedAt: '2026-03-01', tier: 'silver' },
  ];

  const progressData = [
    { day: 'Mon', revenue: 850 },
    { day: 'Tue', revenue: 1200 },
    { day: 'Wed', revenue: 980 },
    { day: 'Thu', revenue: 1400 },
    { day: 'Fri', revenue: 1650 },
    { day: 'Sat', revenue: 1100 },
    { day: 'Sun', revenue: 320 },
  ];

  const filteredGoals = goals.filter(g => g.status === activeTab);

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'revenue': return '💰';
      case 'orders': return '📦';
      case 'rating': return '⭐';
      case 'customers': return '👥';
      default: return '🎯';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold': return 'bg-gradient-to-br from-yellow-500 to-orange-500';
      case 'silver': return 'bg-gradient-to-br from-gray-400 to-gray-500';
      case 'bronze': return 'bg-gradient-to-br from-orange-700 to-amber-700';
      default: return 'bg-gradient-to-br from-gray-400 to-gray-500';
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Goals & Achievements</h1>
              <p className="text-gray-600 dark:text-gray-400">Track your progress and earn badges</p>
            </div>

            {/* Revenue Progress Chart */}
            <div className="mb-8">
              <Chart
                data={progressData}
                type="bar"
                dataKey="revenue"
                xAxisKey="day"
                title="This Week's Revenue Progress"
                color="#10b981"
                valuePrefix="$"
              />
            </div>

            {/* Goals Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Goals</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`
                      px-4 py-2 rounded-xl font-medium transition-all
                      ${activeTab === 'active'
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                      }
                    `}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`
                      px-4 py-2 rounded-xl font-medium transition-all
                      ${activeTab === 'completed'
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                      }
                    `}
                  >
                    Completed
                  </button>
                  <Button>Create Goal</Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredGoals.map((goal) => (
                  <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{getGoalIcon(goal.type)}</div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{goal.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{goal.description}</p>
                        </div>
                      </div>
                      {goal.status === 'completed' && (
                        <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                          Completed
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {goal.type === 'revenue' ? `$${goal.currentValue.toLocaleString()}` : goal.currentValue}
                          {' / '}
                          {goal.type === 'revenue' ? `$${goal.targetValue.toLocaleString()}` : goal.targetValue}
                          {' '}({goal.progress}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            goal.progress >= 100
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                          }`}
                          style={{ width: `${Math.min(goal.progress, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}</span>
                      </div>
                      {goal.status === 'active' && (
                        <Button size="sm" variant="outline">Edit</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Achievements</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`${getTierColor(achievement.tier)} rounded-3xl p-6 text-white text-center`}
                  >
                    <div className="text-5xl mb-3">{achievement.icon}</div>
                    <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{achievement.description}</p>
                    <div className="text-xs opacity-75">
                      Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
