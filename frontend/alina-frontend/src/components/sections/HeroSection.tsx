'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/hooks';
import type { Category } from '@/lib/api/types';
import Image from 'next/image';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { data: categories } = useCategories();

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <section className="relative min-h-[85vh] lg:min-h-[90vh] bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh] lg:min-h-[90vh] py-12 lg:py-20">
          
          {/* Left Content */}
          <div className={`space-y-8 lg:space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                <span className="block animate-fade-in-up animation-delay-0">
                  Find the perfect
                </span>
                <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
                  freelance services
                </span>
                <span className="block mt-2 animate-fade-in-up animation-delay-400">
                  for your business
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                Work with talented people at the most affordable price to get the most out of your time and cost
              </p>
            </div>

            {/* Search Bar - Modern Style */}
            <form onSubmit={handleSearch} className="space-y-4 w-full">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative flex items-center bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="flex-1 flex items-center">
                    <svg className="ml-5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Try 'building mobile app'"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-4 py-4 focus:outline-none bg-transparent text-gray-900 placeholder-gray-400 text-base"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="m-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Trending Tags */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500">Popular:</p>
              <div className="flex flex-wrap gap-2">
                {trendingTags.slice(0, 6).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 bg-white border border-gray-200 hover:border-blue-500 rounded-full text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 hover:shadow-md"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className={`relative hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Main Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full blur-2xl opacity-60 animate-pulse"></div>
              <div className="absolute bottom-1/4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-60 animate-pulse delay-700"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}