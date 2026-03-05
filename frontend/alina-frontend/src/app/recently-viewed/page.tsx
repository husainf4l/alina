'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';

export default function RecentlyViewedPage() {
  const [activeTab, setActiveTab] = useState<'gigs' | 'sellers'>('gigs');

  // Mock data
  const recentlyViewedGigs = [
    { id: '1', gigId: '101', gig: { id: '101', title: 'Professional Logo Design', price: 150, image: '/api/placeholder/400/300', sellerName: 'Jane Designer', rating: 4.9 }, viewedAt: '2026-03-03T14:30:00Z' },
    { id: '2', gigId: '102', gig: { id: '102', title: 'Website Development', price: 500, image: '/api/placeholder/400/300', sellerName: 'John Dev', rating: 5.0 }, viewedAt: '2026-03-03T12:15:00Z' },
    { id: '3', gigId: '103', gig: { id: '103', title: 'SEO Optimization', price: 200, image: '/api/placeholder/400/300', sellerName: 'Mike SEO', rating: 4.8 }, viewedAt: '2026-03-02T18:45:00Z' },
    { id: '4', gigId: '104', gig: { id: '104', title: 'Social Media Marketing', price: 300, image: '/api/placeholder/400/300', sellerName: 'Sarah Marketing', rating: 4.7 }, viewedAt: '2026-03-02T10:20:00Z' },
  ];

  const recentlyViewedSellers = [
    { id: '1', sellerId: '201', seller: { id: '201', name: 'Jane Designer', avatar: '', rating: 4.9, gigsCount: 24, description: 'Professional graphic designer with 10+ years experience' }, viewedAt: '2026-03-03T14:00:00Z' },
    { id: '2', sellerId: '202', seller: { id: '202', name: 'John Dev', avatar: '', rating: 5.0, gigsCount: 18, description: 'Full-stack developer specializing in web applications' }, viewedAt: '2026-03-03T11:30:00Z' },
  ];

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Recently Viewed</h1>
              <p className="text-gray-600 dark:text-gray-400">Your browsing history</p>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2">
              <button
                onClick={() => setActiveTab('gigs')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
                  activeTab === 'gigs'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Gigs ({recentlyViewedGigs.length})
              </button>
              <button
                onClick={() => setActiveTab('sellers')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
                  activeTab === 'sellers'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Sellers ({recentlyViewedSellers.length})
              </button>
            </div>

            {/* Gigs Tab */}
            {activeTab === 'gigs' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentlyViewedGigs.map((item) => (
                  <Link key={item.id} href={`/gig/${item.gigId}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border-2 border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all group">
                      <div className="relative">
                        <img src={item.gig.image} alt={item.gig.title} className="w-full h-48 object-cover" />
                        <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-xs rounded-full">
                          {getTimeAgo(item.viewedAt)}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {item.gig.sellerName.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.gig.sellerName}</span>
                          <div className="ml-auto flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.gig.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {item.gig.title}
                        </h3>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">${item.gig.price}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Sellers Tab */}
            {activeTab === 'sellers' && (
              <div className="space-y-4">
                {recentlyViewedSellers.map((item) => (
                  <Link key={item.id} href={`/profile/${item.sellerId}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                          {item.seller.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{item.seller.name}</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{getTimeAgo(item.viewedAt)}</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">{item.seller.description}</p>
                          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-semibold text-gray-900 dark:text-white">{item.seller.rating}</span>
                            </div>
                            <span>{item.seller.gigsCount} active gigs</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Clear History */}
            <div className="mt-8 text-center">
              <button className="text-red-600 dark:text-red-400 hover:underline font-semibold">
                Clear All History
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
