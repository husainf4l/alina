'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';

export default function MyTasksPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in-progress' | 'completed'>('all');

  // Mock data - tasks posted by the user
  const tasks = [
    { id: '1', title: 'Build E-commerce Website', budget: 5000, budgetType: 'fixed' as const, status: 'OPEN' as const, bidsCount: 12, createdAt: '2026-03-01', duration: 30 },
    { id: '2', title: 'Mobile App UI Design', budget: 80, budgetType: 'hourly' as const, status: 'IN_PROGRESS' as const, bidsCount: 8, createdAt: '2026-02-28', duration: 15, assignedTo: 'Jane Designer' },
    { id: '3', title: 'SEO Optimization', budget: 1200, budgetType: 'fixed' as const, status: 'COMPLETED' as const, bidsCount: 15, createdAt: '2026-02-20', duration: 20, assignedTo: 'Mike SEO' },
  ];

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    return task.status.toLowerCase().replace('_', '-') === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'COMPLETED': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Tasks</h1>
                <p className="text-gray-600 dark:text-gray-400">Tasks you've posted</p>
              </div>
              <Link href="/tasks/create">
                <Button>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Post New Task
                </Button>
              </Link>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {(['all', 'open', 'in-progress', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>

            {/* Tasks Grid */}
            {filteredTasks.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl">
                <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No tasks found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Post a task to get started</p>
                <Link href="/tasks/create">
                  <Button>Post Your First Task</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <Link key={task.id} href={`/tasks/${task.id}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h3>
                            <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${getStatusColor(task.status)}`}>
                              {task.status.replace('_', ' ')}
                            </span>
                          </div>
                          {task.assignedTo && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Assigned to: <span className="font-semibold">{task.assignedTo}</span>
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            ${task.budget.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {task.budgetType === 'hourly' ? '/hour' : 'fixed'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{task.bidsCount} bids</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{task.duration} days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Posted {new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
