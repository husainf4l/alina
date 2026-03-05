'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AdminFlaggedContentPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'gigs' | 'profiles' | 'reviews'>('all');

  // Mock flagged content data
  const flaggedItems = [
    {
      id: '1',
      type: 'gig',
      title: 'Professional Logo Design',
      flaggedBy: 'User #1234',
      reason: 'Inappropriate content',
      description: 'Contains copyrighted material',
      reportedAt: '2026-03-03T10:00:00Z',
      status: 'pending',
      priority: 'high',
      contentOwner: 'Jane Designer',
      url: '/gigs/1',
    },
    {
      id: '2',
      type: 'review',
      title: 'Review for "Website Development"',
      flaggedBy: 'User #5678',
      reason: 'Spam or fake',
      description: 'Contains promotional links',
      reportedAt: '2026-03-02T14:30:00Z',
      status: 'pending',
      priority: 'medium',
      contentOwner: 'Mike Developer',
      url: '/orders/12345',
    },
    {
      id: '3',
      type: 'profile',
      title: 'Profile: Tom Writer',
      flaggedBy: 'User #9012',
      reason: 'Offensive language',
      description: 'Profile description contains inappropriate language',
      reportedAt: '2026-03-01T09:15:00Z',
      status: 'reviewed',
      priority: 'low',
      contentOwner: 'Tom Writer',
      url: '/users/tom',
    },
    {
      id: '4',
      type: 'gig',
      title: 'SEO Services',
      flaggedBy: 'User #3456',
      reason: 'Misleading information',
      description: 'Promises unrealistic results',
      reportedAt: '2026-02-28T16:45:00Z',
      status: 'resolved',
      priority: 'medium',
      contentOwner: 'Sarah Marketing',
      url: '/gigs/4',
    },
  ];

  const filteredItems = activeFilter === 'all' 
    ? flaggedItems 
    : flaggedItems.filter(item => item.type === activeFilter.slice(0, -1));

  const handleApprove = async (id: string) => {
    try {
      // Import admin service
      const { adminService } = await import('@/lib/api/services/admin.service');
      
      // Dismiss flagged content (approve it)
      await adminService.reviewFlaggedContent(id, 'dismiss');
      
      // In a real implementation, refresh flagged content list
      console.log('Content approved');
    } catch (error) {
      console.error('Failed to approve content:', error);
      // Error handling would show toast notification
    }
  };

  const handleRemove = async (id: string) => {
    if (confirm('Are you sure you want to remove this content? This action cannot be undone.')) {
      try {
        // Import admin service
        const { adminService } = await import('@/lib/api/services/admin.service');
        
        // Remove flagged content
        await adminService.reviewFlaggedContent(id, 'remove');
        
        // In a real implementation, refresh flagged content list
        console.log('Content removed');
      } catch (error) {
        console.error('Failed to remove content:', error);
        // Error handling would show toast notification
      }
    }
  };

  const handleWarning = async (id: string) => {
    try {
      // Import admin service
      const { adminService } = await import('@/lib/api/services/admin.service');
      
      // Dismiss with warning (approve but send warning to user)
      await adminService.reviewFlaggedContent(id, 'dismiss');
      
      // In a real implementation, also send warning notification
      console.log('Warning sent to user');
    } catch (error) {
      console.error('Failed to send warning:', error);
      // Error handling would show toast notification
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <Link href="/admin" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                ← Back to Admin Dashboard
              </Link>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Content Moderation</h1>
                  <p className="text-gray-600 dark:text-gray-400">Review and manage flagged content</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl font-semibold">
                    {flaggedItems.filter(i => i.status === 'pending').length} Pending
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Flagged</span>
                  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{flaggedItems.length}</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pending Review</span>
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {flaggedItems.filter(i => i.status === 'pending').length}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">High Priority</span>
                  <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {flaggedItems.filter(i => i.priority === 'high').length}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Resolved Today</span>
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {flaggedItems.filter(i => i.status === 'resolved').length}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 mb-6">
              <div className="flex gap-2">
                {['all', 'gigs', 'profiles', 'reviews'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter as any)}
                    className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${
                      activeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Flagged Items List */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.type === 'gig' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                          item.type === 'profile' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                          'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        }`}>
                          {item.type}
                        </span>
                        
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                          item.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                          'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}>
                          {item.priority} priority
                        </span>

                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                          item.status === 'reviewed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                          'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Flagged by: {item.flaggedBy}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Content owner: {item.contentOwner}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Reason: {item.reason}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Reported: {new Date(item.reportedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Report Details:</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Content
                      </Button>
                    </a>

                    {item.status === 'pending' && (
                      <>
                        <Button size="sm" onClick={() => handleApprove(item.id)}>
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Approve
                        </Button>

                        <Button size="sm" variant="outline" onClick={() => handleWarning(item.id)}>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Send Warning
                        </Button>

                        <Button size="sm" variant="outline" className="text-red-600 border-red-200" onClick={() => handleRemove(item.id)}>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove Content
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-12 text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400">No flagged content in this category</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
