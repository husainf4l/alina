'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/hooks';
import type { Category } from '@/lib/api/types';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();
  const { data: categories } = useCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/marketplace?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
    }
  };

  const trendingTags = [
    'Logo Design', 'WordPress', 'Voice Over', 'Video Editing',
    'SEO', 'Social Media', 'Illustration', 'Mobile App'
  ];

  return (
    <section className="relative min-h-[90vh] bg-white overflow-hidden">
      {/* Background Gradient - Apple Style */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-white"></div>
      
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[90vh] py-20 text-center">
          
          {/* Main Content */}
          <div className="space-y-10 w-full">
            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Find your next
                <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  dream project
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Connect with world-class freelancers and agencies. Get work done with confidence.
              </p>
            </div>

            {/* Search Bar - Apple Style */}
            <form onSubmit={handleSearch} className="space-y-4 max-w-3xl mx-auto w-full">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="hidden sm:block px-5 py-5 bg-transparent border-r border-gray-200/80 focus:outline-none text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    {categories?.map((category: Category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  
                  <div className="flex-1 flex items-center">
                    <svg className="ml-5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search for any service..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-4 py-5 focus:outline-none bg-transparent text-gray-900 placeholder-gray-500 text-base"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Trending Tags */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-sm font-semibold text-gray-700">Popular searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-all duration-200 hover:scale-105"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Indicators - Apple Style */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-100 max-w-2xl mx-auto">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900">500K+</div>
                <div className="text-sm text-gray-600">Active freelancers</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">Average rating</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Secure payments</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Ambient Background Effects */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </section>
  );
}