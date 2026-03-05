'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import { TaskStatus } from '@/lib/api/types';

export default function TasksPage() {
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress'>('all');
  const [search, setSearch] = useState('');

  // Mock data
  const tasks = [
    { id: '1', title: 'Build E-commerce Website', description: 'Need a full-stack developer to build a modern e-commerce platform', categoryName: 'Web Development', budget: 5000, budgetType: 'fixed' as const, duration: 30, skillsRequired: ['React', 'Node.js', 'MongoDB'], status: TaskStatus.OPEN, buyerName: 'John Doe', buyerAvatar: '', bidsCount: 12, createdAt: '2026-03-03T08:00:00Z' },
    { id: '2', title: 'Mobile App UI/UX Design', description: 'Looking for a talented designer to create app mockups', categoryName: 'Design', budget: 80, budgetType: 'hourly' as const, duration: 14, skillsRequired: ['Figma', 'UI/UX'], status: TaskStatus.OPEN, buyerName: 'Sarah Smith', buyerAvatar: '', bidsCount: 8, createdAt: '2026-03-02T15:30:00Z' },
    { id: '3', title: 'SEO Optimization', description: 'Need expert to optimize website for search engines', categoryName: 'Marketing', budget: 1200, budgetType: 'fixed' as const, duration: 21, skillsRequired: ['SEO', 'Analytics'], status: TaskStatus.OPEN, buyerName: 'Mike Johnson', buyerAvatar: '', bidsCount: 15, createdAt: '2026-03-01T10:15:00Z' },
    { id: '4', title: 'Content Writing', description: 'Looking for writers to create blog articles', categoryName: 'Writing', budget: 50, budgetType: 'hourly' as const, duration: 7, skillsRequired: ['Content Writing', 'SEO'], status: TaskStatus.IN_PROGRESS, buyerName: 'Emma Wilson', buyerAvatar: '', bidsCount: 20, createdAt: '2026-02-28T12:00:00Z' },
  ];

  const filteredTasks = tasks.filter(t => {
    if (filter !== 'all' && t.status.toLowerCase() !== filter.replace('-', '')) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Browse Tasks</h1>
                <p className="text-gray-600 dark:text-gray-400">Find projects to bid on</p>
              </div>
              <Link href="/tasks/create">
                <Button>Post a Task</Button>
              </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 flex gap-4 flex-wrap">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="flex-1 min-w-[300px] px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
              />
              <div className="flex gap-2">
                {['all', 'open', 'in-progress'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                      filter === f
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {f.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Tasks Grid */}
            <div className="grid gap-6">
              {filteredTasks.map((task) => (
                <Link key={task.id} href={`/tasks/${task.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            task.status === TaskStatus.OPEN
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {task.skillsRequired.map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Budget</div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${task.budget.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{task.budgetType}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{task.buyerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{task.duration} days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{task.bidsCount} bids</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Posted {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
