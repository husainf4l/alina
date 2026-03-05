'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';

export default function SavedSearchesPage() {
  // Mock data
  const savedSearches = [
    { 
      id: '1', 
      name: 'Logo Design Projects', 
      query: { 
        category: 'Graphics & Design', 
        subcategory: 'Logo Design', 
        minPrice: 100, 
        maxPrice: 500,
        deliveryTime: 7 
      },
      resultCount: 142,
      createdAt: '2026-03-01',
      lastChecked: '2026-03-03',
      notificationsEnabled: true
    },
    { 
      id: '2', 
      name: 'Web Development Gigs', 
      query: { 
        category: 'Programming & Tech', 
        subcategory: 'Web Development', 
        minPrice: 500, 
        maxPrice: 2000 
      },
      resultCount: 89,
      createdAt: '2026-02-28',
      lastChecked: '2026-03-03',
      notificationsEnabled: false
    },
    { 
      id: '3', 
      name: 'Content Writing',
      query: { 
        category: 'Writing & Translation', 
        subcategory: 'Articles & Blog Posts', 
        maxPrice: 200 
      },
      resultCount: 234,
      createdAt: '2026-02-25',
      lastChecked: '2026-03-02',
      notificationsEnabled: true
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      // Import saved search service
      const { savedSearchService } = await import('@/lib/api/services/saved-search.service');
      
      // Delete saved search
      await savedSearchService.deleteSavedSearch(id);
      
      // In a real implementation, refresh the list or remove from state
      console.log('Saved search deleted');
    } catch (error) {
      console.error('Failed to delete saved search:', error);
      // Error handling would show toast notification
    }
  };

  const handleToggleNotifications = async (id: string) => {
    try {
      // Import saved search service
      const { savedSearchService } = await import('@/lib/api/services/saved-search.service');
      
      // Find current state (would come from actual data)
      const currentSearch = savedSearches.find((s: any) => s.id === id);
      if (!currentSearch) return;
      
      // Toggle notifications
      await savedSearchService.toggleNotifications(id, !currentSearch.notificationsEnabled);
      
      // In a real implementation, update local state
      console.log('Notifications toggled');
    } catch (error) {
      console.error('Failed to toggle notifications:', error);
      // Error handling would show toast notification
    }
  };

  const formatQuery = (query: any) => {
    const parts = [];
    if (query.category) parts.push(query.category);
    if (query.subcategory) parts.push(`• ${query.subcategory}`);
    if (query.minPrice || query.maxPrice) {
      parts.push(`• $${query.minPrice || 0} - $${query.maxPrice || '∞'}`);
    }
    if (query.deliveryTime) parts.push(`• ${query.deliveryTime} days delivery`);
    return parts.join(' ');
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Saved Searches</h1>
              <p className="text-gray-600 dark:text-gray-400">Quick access to your favorite search filters</p>
            </div>

            {savedSearches.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl">
                <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No saved searches yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Save your search filters for quick access later</p>
                <Link href="/marketplace">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors">
                    Browse Marketplace
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {savedSearches.map((search) => (
                  <div key={search.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{search.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{formatQuery(search.query)}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="font-semibold text-blue-600 dark:text-blue-400">{search.resultCount} results</span>
                          </div>
                          <span>•</span>
                          <span>Saved {new Date(search.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Updated {new Date(search.lastChecked).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleToggleNotifications(search.id)}
                          className={`p-2 rounded-xl transition-colors ${
                            search.notificationsEnabled
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}
                          title={search.notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled'}
                        >
                          <svg className="w-5 h-5" fill={search.notificationsEnabled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(search.id)}
                          className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                          title="Delete search"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link href={`/marketplace?search=${encodeURIComponent(JSON.stringify(search.query))}`} className="flex-1">
                        <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors">
                          View Results
                        </button>
                      </Link>
                      <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Edit
                      </button>
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
                  <p className="font-semibold mb-1">💡 Pro Tip</p>
                  <p>Enable notifications for saved searches to get alerts when new gigs matching your criteria are posted!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
