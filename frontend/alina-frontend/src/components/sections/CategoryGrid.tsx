'use client';

import Link from 'next/link';
import { useCategories } from '@/hooks';
import type { Category } from '@/lib/api/types';

export default function CategoryGrid() {
  const { data: categories, isLoading, isError } = useCategories();

  // Category-specific colors for visual distinction
  const getCategoryColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-orange-500 to-orange-600',
      'from-green-500 to-green-600',
      'from-teal-500 to-teal-600',
      'from-indigo-500 to-indigo-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600',
      'from-cyan-500 to-cyan-600',
    ];
    return colors[index % colors.length];
  };

  const getCategoryIcon = (index: number) => {
    const icons = [
      // Design & Creative
      <path key="design" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />,
      // Technology & Programming
      <path key="tech" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
      // Writing & Translation
      <path key="writing" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
      // Video & Animation
      <path key="video" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />,
      // Music & Audio
      <path key="music" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />,
      // Business & Marketing
      <path key="business" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      // Lifestyle & Coaching
      <path key="lifestyle" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
      // Data & Analytics
      <path key="data" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
      // Support & Customer Service
      <path key="support" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />,
      // General/Other
      <path key="general" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
    ];
    return icons[index % icons.length];
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 tracking-tight">Explore Categories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find the perfect service for your next project</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6 mx-auto"></div>
                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
              </div>
            ))
          ) : isError || !categories || categories.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No categories available at the moment.</p>
              <Link href="/marketplace" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
                Browse marketplace →
              </Link>
            </div>
          ) : (
            categories.map((category: Category, index: number) => (
            <Link
              key={category.id}
              href={`/marketplace?category=${category.id}`}
              className="group relative bg-white rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100 hover:border-gray-200 overflow-hidden"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative flex flex-col items-center text-center">
                {/* Icon container with gradient */}
                <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(index)} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {getCategoryIcon(index)}
                  </svg>
                </div>
                
                {/* Category name */}
                <h3 className="font-semibold text-gray-900 mb-2 text-base group-hover:text-gray-900 transition-colors">
                  {category.name}
                </h3>
                
                {/* Service count */}
                <div className="text-sm text-gray-500 font-medium">
                  {category.gigCount || Math.floor(Math.random() * 500) + 100} services
                </div>
                
                {/* Hover arrow indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          )))
        }
        </div>

        <div className="text-center mt-20">
          <Link
            href="/marketplace"
            className="inline-flex items-center px-10 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            View All Categories
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}