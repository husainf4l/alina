'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function DisputeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const disputeId = params.id as string;
  const [newEvidence, setNewEvidence] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  // Mock dispute data
  const dispute = {
    id: disputeId,
    orderId: '12345',
    gigTitle: 'Professional Logo Design - Standard Package',
    status: 'UNDER_REVIEW' as 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'CLOSED',
    reason: 'Quality Issues',
    amount: 100,
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-02T14:30:00Z',
    buyer: { id: '1', name: 'John Doe', avatar: '' },
    seller: { id: '2', name: 'Jane Designer', avatar: '' },
    description: 'The delivered logo does not match the requirements. The colors are different from what I requested, and the style is not minimalist as discussed.',
    evidence: [
      {
        id: '1',
        userId: '1',
        userName: 'John Doe',
        message: 'Initial complaint: The logo colors are completely different from my brand guidelines.',
        files: [{ name: 'brand-guidelines.pdf', url: '#' }],
        timestamp: '2026-03-01T10:00:00Z',
      },
      {
        id: '2',
        userId: '2',
        userName: 'Jane Designer',
        message: 'I followed the requirements provided. The client approved the color palette during our chat conversation.',
        files: [{ name: 'chat-screenshot.png', url: '#' }],
        timestamp: '2026-03-01T16:30:00Z',
      },
      {
        id: '3',
        userId: 'admin',
        userName: 'Support Team',
        message: 'We are reviewing both sides of the dispute. Please provide any additional evidence within 48 hours.',
        files: [],
        timestamp: '2026-03-02T10:00:00Z',
      },
    ],
    resolution: null,
  };

  const currentUserId = '1'; // Mock - would come from auth context

  const handleSubmitEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvidence.trim()) return;

    try {
      // Import dispute service
      const { disputeService } = await import('@/lib/api/services/dispute.service');
      
      // Add evidence message to dispute
      await disputeService.addDisputeMessage(disputeId, newEvidence);
      
      // Clear form
      setNewEvidence('');
      setFiles([]);
      
      // In a real implementation, refresh dispute data
    } catch (error) {
      console.error('Failed to submit evidence:', error);
      // Error handling would show toast notification
    }
  };

  const handleCloseDispute = async () => {
    if (confirm('Are you sure you want to close this dispute?')) {
      try {
        // Import dispute service
        const { disputeService } = await import('@/lib/api/services/dispute.service');
        
        // Close dispute
        await disputeService.closeDispute(disputeId, {
          resolution: 'Dispute closed by user',
          outcome: 'SellerFavor', // API expects outcome field
        });
        
        router.push('/disputes');
      } catch (error) {
        console.error('Failed to close dispute:', error);
        // Error handling would show toast notification
      }
    }
  };

  const handleEscalate = async () => {
    try {
      // Import dispute service
      const { disputeService } = await import('@/lib/api/services/dispute.service');
      
      // Add escalation message
      await disputeService.addDisputeMessage(
        disputeId,
        'User has requested escalation to admin review'
      );
      
      // In a real implementation, this would update dispute status to escalated
      console.log('Dispute escalated');
    } catch (error) {
      console.error('Failed to escalate dispute:', error);
      // Error handling would show toast notification
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <Link href="/disputes" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                ← Back to Disputes
              </Link>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Dispute #{dispute.id}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{dispute.gigTitle}</p>
                </div>
                <div className={`px-4 py-2 rounded-xl font-semibold ${
                  dispute.status === 'RESOLVED' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                  dispute.status === 'UNDER_REVIEW' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                  dispute.status === 'OPEN' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                  'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                }`}>
                  {dispute.status.replace('_', ' ')}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Dispute Details */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dispute Details</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Order ID</span>
                      <Link href={`/orders/${dispute.orderId}`} className="font-semibold text-blue-600 hover:text-blue-700">
                        #{dispute.orderId}
                      </Link>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Reason</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{dispute.reason}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Amount</span>
                      <span className="font-semibold text-gray-900 dark:text-white">${dispute.amount}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Created</span>
                      <span className="text-gray-900 dark:text-white">{new Date(dispute.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                      <span className="text-gray-900 dark:text-white">{new Date(dispute.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                      {dispute.description}
                    </p>
                  </div>
                </div>

                {/* Evidence Thread */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Evidence & Communication</h2>
                  
                  <div className="space-y-6 mb-6">
                    {dispute.evidence.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-xl ${
                          item.userId === 'admin'
                            ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                            : item.userId === currentUserId
                            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                            : 'bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-gray-900 dark:text-white">{item.userName}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(item.timestamp).toLocaleString()}
                              </span>
                            </div>
                            {item.userId === 'admin' && (
                              <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Support Team</span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-900 dark:text-white mb-3">{item.message}</p>
                        
                        {item.files.length > 0 && (
                          <div className="space-y-2">
                            {item.files.map((file, idx) => (
                              <a
                                key={idx}
                                href={file.url}
                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                                download
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                                </svg>
                                {file.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Evidence Form */}
                  {dispute.status !== 'RESOLVED' && dispute.status !== 'CLOSED' && (
                    <form onSubmit={handleSubmitEvidence} className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add Evidence</h3>
                      
                      <textarea
                        value={newEvidence}
                        onChange={(e) => setNewEvidence(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 mb-4"
                        placeholder="Provide additional evidence or explanation..."
                      />

                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer">
                          <input type="file" multiple className="hidden" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
                          <div className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            Attach Files ({files.length})
                          </div>
                        </label>
                        
                        <Button type="submit" disabled={!newEvidence.trim()}>
                          Submit Evidence
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Resolution */}
                {dispute.resolution && (
                  <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-3xl p-6">
                    <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">Resolution</h2>
                    <p className="text-green-800 dark:text-green-200">{dispute.resolution}</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Parties Involved */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Parties Involved</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-2">BUYER</p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{dispute.buyer.name}</p>
                          <Link href={`/chat?user=${dispute.buyer.id}`} className="text-sm text-blue-600 hover:text-blue-700">
                            Message
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="text-xs text-gray-500 mb-2">SELLER</p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{dispute.seller.name}</p>
                          <Link href={`/chat?user=${dispute.seller.id}`} className="text-sm text-blue-600 hover:text-blue-700">
                            Message
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {dispute.status !== 'RESOLVED' && dispute.status !== 'CLOSED' && (
                  <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Actions</h3>
                    
                    <div className="space-y-3">
                      {dispute.status === 'OPEN' && (
                        <Button variant="outline" className="w-full" onClick={handleEscalate}>
                          Escalate to Admin
                        </Button>
                      )}
                      
                      <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50" onClick={handleCloseDispute}>
                        Close Dispute
                      </Button>
                    </div>
                  </div>
                )}

                {/* Help */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-6">
                  <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Need Help?</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                    Our support team is here to help resolve this dispute fairly.
                  </p>
                  <Link href="/support">
                    <Button variant="outline" size="sm" className="w-full">Contact Support</Button>
                  </Link>
                </div>

                {/* Guidelines */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">Dispute Guidelines</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Provide clear, detailed evidence
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Be professional and respectful
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Respond within 48 hours
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Attach relevant screenshots
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
