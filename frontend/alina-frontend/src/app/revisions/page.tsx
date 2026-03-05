'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';

export default function RevisionsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'requested' | 'in-progress' | 'submitted'>('all');

  // Mock data
  const revisions = [
    {
      id: '1',
      order: { id: '301', title: 'Logo Design', seller: 'Jane Designer' },
      status: 'REQUESTED' as const,
      requestDate: '2026-03-03',
      description: 'Please change the color scheme to blue and green instead of red.',
      dueDate: '2026-03-05',
      filesCount: 3,
    },
    {
      id: '2',
      order: { id: '302', title: 'Website Development', seller: 'John Dev' },
      status: 'IN_PROGRESS' as const,
      requestDate: '2026-03-02',
      description: 'Need to adjust the navigation menu and add a contact form.',
      dueDate: '2026-03-04',
      filesCount: 0,
    },
    {
      id: '3',
      order: { id: '303', title: 'Content Writing', seller: 'Sarah Writer' },
      status: 'SUBMITTED' as const,
      requestDate: '2026-03-01',
      description: 'Please add more SEO keywords and extend the article to 2000 words.',
      dueDate: '2026-03-03',
      submittedDate: '2026-03-03',
      filesCount: 1,
    },
  ];

  const filteredRevisions = revisions.filter(rev => {
    if (activeTab === 'all') return true;
    return rev.status.toLowerCase().replace('_', '-') === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REQUESTED': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'SUBMITTED': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'ACCEPTED': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const days = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
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
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Revision Requests</h1>
              <p className="text-gray-600 dark:text-gray-400">Track and manage order revisions</p>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {(['all', 'requested', 'in-progress', 'submitted'] as const).map((tab) => (
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

            {/* Revisions List */}
            {filteredRevisions.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl">
                <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No revisions found</h3>
                <p className="text-gray-600 dark:text-gray-400">You don't have any revision requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRevisions.map((revision) => (
                  <div key={revision.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{revision.order.title}</h3>
                          <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${getStatusColor(revision.status)}`}>
                            {revision.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Seller: <span className="font-semibold">{revision.order.seller}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Order ID: #{revision.order.id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          getDaysRemaining(revision.dueDate) === 'Overdue' 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {getDaysRemaining(revision.dueDate)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Due {new Date(revision.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Revision Details:</p>
                      <p className="text-gray-600 dark:text-gray-400">{revision.description}</p>
                    </div>

                    {revision.filesCount > 0 && (
                      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span>{revision.filesCount} reference {revision.filesCount === 1 ? 'file' : 'files'} attached</span>
                        </div>
                      </div>
                    )}

                    {revision.submittedDate && (
                      <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl">
                        <div className="flex gap-2 items-start">
                          <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <div className="text-sm text-green-800 dark:text-green-200">
                            <p className="font-semibold">Revision submitted on {new Date(revision.submittedDate).toLocaleDateString()}</p>
                            <p>Review the updated files and accept or request further changes.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Requested {new Date(revision.requestDate).toLocaleDateString()}
                      </span>
                      <div className="flex gap-3">
                        <Link href={`/orders/${revision.order.id}`}>
                          <Button variant="outline">View Order</Button>
                        </Link>
                        {revision.status === 'SUBMITTED' && (
                          <>
                            <Button className="bg-green-600 hover:bg-green-700">Accept Revision</Button>
                            <Button variant="outline">Request Changes</Button>
                          </>
                        )}
                        {revision.status === 'REQUESTED' && (
                          <Button>Cancel Request</Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-3xl p-6">
              <div className="flex gap-3">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-semibold mb-1">About Revisions</p>
                  <p>Most sellers include a specific number of revisions with their gigs. Be clear about what you need changed to make the most of your revisions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
