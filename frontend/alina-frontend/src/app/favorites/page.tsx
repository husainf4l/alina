'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';

export default function FavoritesPage() {
  // Mock data
  const favorites = [
    { id: '1', gigId: '101', gig: { id: '101', title: 'Professional Logo Design', description: 'I will create a unique logo for your brand', price: 150, image: '/api/placeholder/400/300', sellerName: 'Jane Designer', sellerAvatar: '', rating: 4.9 }, createdAt: '2026-03-01' },
    { id: '2', gigId: '102', gig: { id: '102', title: 'Website Development', description: 'Full-stack web development services', price: 500, image: '/api/placeholder/400/300', sellerName: 'John Dev', sellerAvatar: '', rating: 5.0 }, createdAt: '2026-02-28' },
    { id: '3', gigId: '103', gig: { id: '103', title: 'SEO Optimization', description: 'Boost your search rankings', price: 200, image: '/api/placeholder/400/300', sellerName: 'Mike SEO', sellerAvatar: '', rating: 4.8 }, createdAt: '2026-02-25' },
  ];

  const handleRemove = (id: string) => {
    console.log('Remove favorite:', id);
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Favorites</h1>
              <p className="text-gray-600 dark:text-gray-400">{favorites.length} saved gigs</p>
            </div>

            {favorites.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No favorites yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Start saving gigs you love!</p>
                <Link href="/marketplace">
                  <Button>Browse Marketplace</Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((fav) => (
                  <div key={fav.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border-2 border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all group">
                    <Link href={`/gig/${fav.gigId}`}>
                      <div className="relative">
                        <img src={fav.gig.image} alt={fav.gig.title} className="w-full h-48 object-cover" />
                        <div className="absolute top-4 right-4">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemove(fav.id);
                            }}
                            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all"
                          >
                            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {fav.gig.sellerName.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{fav.gig.sellerName}</span>
                          <div className="ml-auto flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{fav.gig.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {fav.gig.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{fav.gig.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">${fav.gig.price}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Saved {new Date(fav.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </Link>
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
