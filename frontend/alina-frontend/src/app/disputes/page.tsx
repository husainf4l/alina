'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';

export default function DisputesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'under-review' | 'resolved'>('all');

  // Mock data
  const disputes = [
    { 
      id: '1', 
      order: { id: '201', title: 'Logo Design', seller: 'Jane Designer' },
      reason: 'QUALITY_ISSUE',
      status: 'OPEN' as const,
      createdAt: '2026-03-03',
      description: 'The delivered logo does not match the requirements discussed.',
      amount: 150
    },
    { 
      id: '2', 
      order: { id: '202', title: 'Website Development', seller: 'John Dev' },
      reason: 'LATE_DELIVERY',
      status: 'UNDER_REVIEW' as const,
      createdAt: '2026-03-01',
      description: 'Project was delivered 5 days late without prior notice.',
      amount: 500,
      adminResponse: 'We are reviewing your case and will respond within 24 hours.'
    },
    { 
      id: '3', 
      order: { id: '203', title: 'SEO Services', seller: 'Mike SEO' },
      reason: 'NOT_AS_DESCRIBED',
      status: 'RESOLVED' as const,
      createdAt: '2026-02-25',
      description: 'Services provided were different from the gig description.',
      amount: 200,
      resolution: 'Partial refund of $100 issued to buyer.'
    },
  ];

  const filteredDisputes = disputes.filter(dispute => {
    if (activeTab === 'all') return true;
    return dispute.status.toLowerCase().replace('_', '-') === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'UNDER_REVIEW': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'RESOLVED': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getReasonLabel = (reason: string) => {
    return reason.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Disputes</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your order disputes and resolutions</p>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {(['all', 'open', 'under-review', 'resolved'] as const).map((tab) => (
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

            {/* Disputes List */}
            {filteredDisputes.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl">
                <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No disputes found</h3>
                <p className="text-gray-600 dark:text-gray-400">You don't have any active disputes</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDisputes.map((dispute) => (
                  <div key={dispute.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {dispute.order.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${getStatusColor(dispute.status)}`}>
                            {dispute.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Seller: <span className="font-semibold">{dispute.order.seller}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Reason: <span className="font-semibold text-red-600 dark:text-red-400">{getReasonLabel(dispute.reason)}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${dispute.amount}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Order amount
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Description:</p>
                        <p className="text-gray-600 dark:text-gray-400">{dispute.description}</p>
                      </div>

                      {dispute.adminResponse && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                          <div className="flex gap-2 items-start">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">Admin Response:</p>
                              <p className="text-sm text-blue-700 dark:text-blue-300">{dispute.adminResponse}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {dispute.resolution && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                          <div className="flex gap-2 items-start">
                            <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <p className="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">Resolution:</p>
                              <p className="text-sm text-green-700 dark:text-green-300">{dispute.resolution}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Opened {new Date(dispute.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-3">
                        <Link href={`/disputes/${dispute.id}`}>
                          <Button variant="outline">View Details</Button>
                        </Link>
                        {dispute.status === 'OPEN' && (
                          <Button>Add Evidence</Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Help Section */}
            <div className="mt-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Need Help with a Dispute?</h3>
                  <p className="text-blue-100 mb-4">
                    Our support team is here to help resolve issues fairly and quickly. Provide clear evidence and communication for the best outcome.
                  </p>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">Contact Support</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
