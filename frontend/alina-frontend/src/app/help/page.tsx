'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import Link from 'next/link';

type Category = 'all' | 'getting-started' | 'buying' | 'selling' | 'payments' | 'disputes';

interface Article {
  id: string;
  title: string;
  category: Category;
  excerpt: string;
  views: number;
  helpful: number;
}

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  // Mock articles data
  const articles: Article[] = [
    {
      id: '1',
      title: 'How to create your first gig',
      category: 'getting-started',
      excerpt: 'Learn how to create and publish your first gig on the platform...',
      views: 1234,
      helpful: 95,
    },
    {
      id: '2',
      title: 'Understanding service fees',
      category: 'payments',
      excerpt: 'Everything you need to know about platform fees and commissions...',
      views: 2156,
      helpful: 89,
    },
    {
      id: '3',
      title: 'How to place an order',
      category: 'buying',
      excerpt: 'Step-by-step guide to placing your first order...',
      views: 1876,
      helpful: 92,
    },
    {
      id: '4',
      title: 'Setting up your seller profile',
      category: 'selling',
      excerpt: 'Tips for creating a professional seller profile that attracts buyers...',
      views: 1543,
      helpful: 87,
    },
    {
      id: '5',
      title: 'What to do if you have an issue with an order',
      category: 'disputes',
      excerpt: 'How to resolve conflicts and open disputes if needed...',
      views: 987,
      helpful: 78,
    },
    {
      id: '6',
      title: 'Withdrawal methods and timing',
      category: 'payments',
      excerpt: 'Learn about available withdrawal methods and processing times...',
      views: 1654,
      helpful: 85,
    },
    {
      id: '7',
      title: 'Best practices for sellers',
      category: 'selling',
      excerpt: 'Tips to maximize your success as a seller on the platform...',
      views: 2345,
      helpful: 94,
    },
    {
      id: '8',
      title: 'How to request a revision',
      category: 'buying',
      excerpt: 'Guide to requesting revisions on delivered work...',
      views: 1432,
      helpful: 91,
    },
    {
      id: '9',
      title: 'Payment security and protection',
      category: 'payments',
      excerpt: 'How we keep your payments secure and protected...',
      views: 1765,
      helpful: 96,
    },
  ];

  const categories = [
    { key: 'all', label: 'All Articles', icon: '📚' },
    { key: 'getting-started', label: 'Getting Started', icon: '🚀' },
    { key: 'buying', label: 'Buying', icon: '🛒' },
    { key: 'selling', label: 'Selling', icon: '💼' },
    { key: 'payments', label: 'Payments', icon: '💳' },
    { key: 'disputes', label: 'Disputes', icon: '⚖️' },
  ] as const;

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                How can we help you?
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Find answers to common questions and learn how to get the most out of Alina
              </p>
              
              {/* Search */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    activeCategory === category.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Articles */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {activeCategory === 'all' ? 'All Articles' : categories.find(c => c.key === activeCategory)?.label}
                  <span className="text-gray-500 text-lg ml-2">({filteredArticles.length})</span>
                </h2>

                {filteredArticles.length === 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400">No articles found matching your search</p>
                  </div>
                )}

                {filteredArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/help/${article.id}`}
                    className="block bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex-1">
                        {article.title}
                      </h3>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {article.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        {article.helpful}% helpful
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Popular Articles */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Popular Articles
                  </h3>
                  <div className="space-y-3">
                    {popularArticles.map((article, index) => (
                      <Link
                        key={article.id}
                        href={`/help/${article.id}`}
                        className="block p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                              {article.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{article.views} views</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact Support */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Still need help?</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Our support team is here to assist you
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full px-4 py-2 bg-white text-blue-600 rounded-xl font-semibold text-center hover:bg-gray-100 transition-colors"
                  >
                    Contact Support
                  </Link>
                </div>

                {/* Quick Links */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link
                      href="/terms"
                      className="block p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm"
                    >
                      Terms of Service →
                    </Link>
                    <Link
                      href="/privacy"
                      className="block p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm"
                    >
                      Privacy Policy →
                    </Link>
                    <Link
                      href="/community-guidelines"
                      className="block p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm"
                    >
                      Community Guidelines →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
