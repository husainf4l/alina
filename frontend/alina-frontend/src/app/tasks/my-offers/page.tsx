'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';

export default function MyOffersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  // Mock data - bids submitted by the user
  const offers = [
    { id: '1', task: { id: '101', title: 'Build E-commerce Website', buyer: 'Sarah Williams' }, amount: 4500, duration: 25, status: 'PENDING' as const, createdAt: '2026-03-02', coverLetter: 'I have 8+ years of experience...' },
    { id: '2', task: { id: '102', title: 'Mobile App Development', buyer: 'John Smith' }, amount: 8000, duration: 45, status: 'ACCEPTED' as const, createdAt: '2026-03-01', coverLetter: 'Expert in React Native...' },
    { id: '3', task: { id: '103', title: 'Website Redesign', buyer: 'Emily Johnson' }, amount: 2000, duration: 15, status: 'REJECTED' as const, createdAt: '2026-02-28', coverLetter: 'Specialized in modern UI/UX...' },
  ];

  const filteredOffers = offers.filter(offer => {
    if (activeTab === 'all') return true;
    return offer.status.toLowerCase() === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'ACCEPTED': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'REJECTED': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Offers</h1>
              <p className="text-gray-600 dark:text-gray-400">Bids you've submitted</p>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {(['all', 'pending', 'accepted', 'rejected'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Offers Grid */}
            {filteredOffers.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl">
                <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No offers found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Browse tasks and submit your first bid</p>
                <Link href="/tasks">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors">
                    Browse Tasks
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOffers.map((offer) => (
                  <div key={offer.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link href={`/tasks/${offer.task.id}`}>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                              {offer.task.title}
                            </h3>
                          </Link>
                          <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${getStatusColor(offer.status)}`}>
                            {offer.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Buyer: <span className="font-semibold">{offer.task.buyer}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                          ${offer.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          in {offer.duration} days
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{offer.coverLetter}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Submitted {new Date(offer.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-3">
                        <Link href={`/tasks/${offer.task.id}`}>
                          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            View Task
                          </button>
                        </Link>
                        {offer.status === 'PENDING' && (
                          <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                            Withdraw Bid
                          </button>
                        )}
                        {offer.status === 'ACCEPTED' && (
                          <Link href={`/orders/${offer.task.id}`}>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
                              View Order
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
