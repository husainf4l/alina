// Enhanced marketplace page with advanced search and filtering

'use client';

import { useState, useEffect } from 'react';
import { useSearchGigs, useCategories } from '@/hooks';
import type { Category } from '@/lib/api/types';
import Navbar from '@/components/sections/Navbar';
import { Pagination, PaginationInfo, ItemsPerPageSelector } from '@/components/ui/Pagination';

interface Filters {
  minPrice?: number;
  maxPrice?: number;
  deliveryTime?: string;
  minRating?: number;
  sellerLevel?: string;
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState<Filters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { data: categories } = useCategories();
  const { data: gigsResponse, isLoading, isError } = useSearchGigs({
    query: searchQuery,
    categoryId: selectedCategory || undefined,
    page: currentPage,
    pageSize: itemsPerPage,
  });

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Save search to history
  const saveSearch = (query: string) => {
    if (!query.trim()) return;
    const newHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Handle search submission
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    saveSearch(query);
    setShowSuggestions(false);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({});
    setSelectedCategory('');
    setCurrentPage(1);
  };

  // Remove individual filter
  const removeFilter = (filterKey: keyof Filters) => {
    const newFilters = { ...filters };
    delete newFilters[filterKey];
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Count active filters
  const activeFilterCount = Object.keys(filters).length + (selectedCategory ? 1 : 0);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-3 tracking-tight">Marketplace</h1>
            <p className="text-xl text-gray-600">Discover amazing services from talented freelancers</p>
          </div>
        
        {/* Search Bar with Suggestions */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-gray-200/60 mb-6">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search for services... (e.g., logo design, video editing)"
                className="w-full px-6 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white"
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Search Suggestions */}
              {showSuggestions && searchHistory.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-10 overflow-hidden">
                  <div className="p-3 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Recent Searches</span>
                  </div>
                  {searchHistory.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(query)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{query}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-gray-200/60 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Category Filter */}
              <div className="min-w-[200px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white font-medium text-sm"
                >
                  <option value="">All Categories</option>
                  {categories?.map((category: Category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="min-w-[180px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white font-medium text-sm"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-5 py-2.5 border-2 rounded-xl font-semibold text-sm transition-all flex items-center space-x-2 ${
                  showFilters || activeFilterCount > 0
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-white text-gray-900 rounded-full text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Items per page */}
            <ItemsPerPageSelector
              value={itemsPerPage}
              onChange={(value) => {
                setItemsPerPage(value);
                setCurrentPage(1);
              }}
              options={[12, 24, 36, 48]}
            />
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice || ''}
                      onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) || undefined })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice || ''}
                      onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) || undefined })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                    />
                  </div>
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Delivery Time
                  </label>
                  <select
                    value={filters.deliveryTime || ''}
                    onChange={(e) => setFilters({ ...filters, deliveryTime: e.target.value || undefined })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-medium text-sm"
                  >
                    <option value="">Any Time</option>
                    <option value="24">24 Hours</option>
                    <option value="72">3 Days</option>
                    <option value="168">1 Week</option>
                    <option value="336">2 Weeks</option>
                  </select>
                </div>

                {/* Minimum Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.minRating || ''}
                    onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) || undefined })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-medium text-sm"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5★ & above</option>
                    <option value="4">4.0★ & above</option>
                    <option value="3.5">3.5★ & above</option>
                    <option value="3">3.0★ & above</option>
                  </select>
                </div>

                {/* Seller Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Seller Level
                  </label>
                  <select
                    value={filters.sellerLevel || ''}
                    onChange={(e) => setFilters({ ...filters, sellerLevel: e.target.value || undefined })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-medium text-sm"
                  >
                    <option value="">All Sellers</option>
                    <option value="top">Top Rated</option>
                    <option value="level2">Level 2+</option>
                    <option value="level1">Level 1+</option>
                    <option value="new">New Sellers</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={clearAllFilters}
                  className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && !showFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-600">Active filters:</span>
            
            {selectedCategory && (
              <span className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium">
                Category: {categories?.find((c: Category) => c.id === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}

            {filters.minPrice && (
              <span className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium">
                Min Price: ${filters.minPrice}
                <button
                  onClick={() => removeFilter('minPrice')}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}

            {filters.maxPrice && (
              <span className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium">
                Max Price: ${filters.maxPrice}
                <button
                  onClick={() => removeFilter('maxPrice')}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}

            {filters.deliveryTime && (
              <span className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium">
                Delivery: {filters.deliveryTime === '24' ? '24 Hours' : filters.deliveryTime === '72' ? '3 Days' : filters.deliveryTime === '168' ? '1 Week' : '2 Weeks'}
                <button
                  onClick={() => removeFilter('deliveryTime')}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}

            {filters.minRating && (
              <span className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium">
                Rating: {filters.minRating}★+
                <button
                  onClick={() => removeFilter('minRating')}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}

            {filters.sellerLevel && (
              <span className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium">
                Seller: {filters.sellerLevel}
                <button
                  onClick={() => removeFilter('sellerLevel')}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Results */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 font-medium">Loading amazing services...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-600 font-semibold mb-2">Failed to load services</p>
            <p className="text-gray-500 text-sm">Please try again later</p>
          </div>
        )}

        {gigsResponse && gigsResponse.items.length === 0 && !isLoading && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200/60">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {gigsResponse && gigsResponse.items.length > 0 && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <PaginationInfo
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={gigsResponse.totalCount}
              />
              <p className="text-sm text-gray-500">
                Sorted by: <span className="font-semibold text-gray-700">{sortBy}</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gigsResponse.items.map((gig) => (
                <div key={gig.id} className="group bg-white border border-gray-200/60 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  {gig.images && gig.images.length > 0 ? (
                    <div className="relative h-56 bg-gray-100 overflow-hidden">
                      <img
                        src={gig.images[0]}
                        alt={gig.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {gig.sellerAvatar ? (
                        <img
                          src={gig.sellerAvatar}
                          alt={gig.sellerName}
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full mr-3 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold">
                          {gig.sellerName.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm font-semibold text-gray-900">{gig.sellerName}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2 text-gray-900 group-hover:text-primary-600 transition-colors leading-snug">
                      {gig.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {gig.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm font-bold text-gray-900">
                          {gig.averageRating.toFixed(1)}
                        </span>
                        <span className="ml-1 text-sm text-gray-500 font-medium">
                          ({gig.totalReviews})
                        </span>
                      </div>
                      
                      <div className="text-xl font-bold text-gray-900">
                        ${gig.packages[0]?.price || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {gigsResponse.totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={gigsResponse.totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
}
