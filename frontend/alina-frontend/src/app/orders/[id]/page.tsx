'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [activeTab, setActiveTab] = useState<'details' | 'activity' | 'files'>('details');

  // Mock order data
  const order = {
    id: orderId,
    gigTitle: 'Professional Logo Design - Standard Package',
    gigImage: 'https://via.placeholder.com/400x300',
    seller: { id: '2', name: 'Jane Designer', avatar: '', rating: 4.9, responseTime: '1 hour' },
    buyer: { id: '1', name: 'John Doe', avatar: '' },
    status: 'IN_PROGRESS' as 'PENDING' | 'IN_PROGRESS' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED',
    packageType: 'Standard',
    price: 100,
    delivery: 5,
    revisions: 3,
    revisionsUsed: 1,
    features: ['3 Logo Concepts', 'Source Files', 'Social Media Kit'],
    createdAt: '2026-03-01T10:00:00Z',
    dueDate: '2026-03-06T10:00:00Z',
    description: 'I need a modern logo for my tech startup. Colors: Blue and white. Style: Minimalist.',
    requirements: [
      { question: 'Company name', answer: 'TechFlow' },
      { question: 'Preferred colors', answer: 'Blue and white' },
      { question: 'Industry/niche', answer: 'Technology/SaaS' },
    ],
    deliverables: [
      { id: '1', name: 'logo-concept-1.png', url: '#', uploadedAt: '2026-03-03T14:00:00Z' },
      { id: '2', name: 'logo-concept-2.png', url: '#', uploadedAt: '2026-03-03T14:00:00Z' },
    ],
    activity: [
      { id: '1', type: 'order_created', user: 'John Doe', message: 'Order placed', timestamp: '2026-03-01T10:00:00Z' },
      { id: '2', type: 'order_started', user: 'Jane Designer', message: 'Started working on the order', timestamp: '2026-03-01T11:30:00Z' },
      { id: '3', type: 'delivery', user: 'Jane Designer', message: 'Delivered initial concepts', timestamp: '2026-03-03T14:00:00Z' },
      { id: '4', type: 'revision', user: 'John Doe', message: 'Requested revision', timestamp: '2026-03-03T16:00:00Z' },
    ],
  };

  const currentUserIsBuyer = true; // Mock - would check auth context
  const canRequestRevision = order.revisionsUsed < order.revisions && order.status === 'IN_PROGRESS';
  const canAcceptDelivery = currentUserIsBuyer && order.deliverables.length > 0;

  const handleAcceptDelivery = async () => {
    try {
      // Import order service
      const { orderService } = await import('@/lib/api/services/order.service');
      
      // Accept delivery (completes the order)
      await orderService.acceptDelivery(orderId);
      
      // Redirect to completed orders or show success message
      router.push('/orders?status=completed');
    } catch (error) {
      console.error('Failed to accept delivery:', error);
      // Error handling would show toast notification
    }
  };

  const handleRequestRevision = () => {
    router.push(`/orders/${orderId}/revision`);
  };

  const handleOpenDispute = () => {
    router.push(`/disputes/create?orderId=${orderId}`);
  };

  const daysRemaining = Math.ceil((new Date(order.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <Link href="/orders" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                ← Back to Orders
              </Link>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Order #{order.id}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{order.gigTitle}</p>
                </div>
                <div className={`px-4 py-2 rounded-xl font-semibold ${
                  order.status === 'COMPLETED' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                  order.status === 'IN_PROGRESS' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                  order.status === 'PENDING' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                  'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  {order.status.replace('_', ' ')}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tabs */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="flex border-b border-gray-100 dark:border-gray-700">
                    {(['details', 'activity', 'files'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-6 py-4 font-semibold capitalize transition-colors ${
                          activeTab === tab
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="p-6">
                    {/* Details Tab */}
                    {activeTab === 'details' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Details</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                              <span className="text-gray-600 dark:text-gray-400">Package</span>
                              <span className="font-semibold text-gray-900 dark:text-white">{order.packageType}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                              <span className="text-gray-600 dark:text-gray-400">Price</span>
                              <span className="font-semibold text-gray-900 dark:text-white">${order.price}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                              <span className="text-gray-600 dark:text-gray-400">Delivery Time</span>
                              <span className="font-semibold text-gray-900 dark:text-white">{order.delivery} days</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                              <span className="text-gray-600 dark:text-gray-400">Revisions</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {order.revisionsUsed}/{order.revisions} used
                              </span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-gray-600 dark:text-gray-400">Due Date</span>
                              <span className={`font-semibold ${daysRemaining < 2 ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                                {new Date(order.dueDate).toLocaleDateString()} ({daysRemaining} days)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Package Features</h3>
                          <ul className="space-y-2">
                            {order.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Requirements</h3>
                          <div className="space-y-3">
                            {order.requirements.map((req, idx) => (
                              <div key={idx} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">{req.question}</p>
                                <p className="text-gray-900 dark:text-white">{req.answer}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Description</h3>
                          <p className="text-gray-700 dark:text-gray-300">{order.description}</p>
                        </div>
                      </div>
                    )}

                    {/* Activity Tab */}
                    {activeTab === 'activity' && (
                      <div className="space-y-4">
                        {order.activity.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-900 dark:text-white font-medium">{item.message}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.user} · {new Date(item.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Files Tab */}
                    {activeTab === 'files' && (
                      <div className="space-y-4">
                        {order.deliverables.length > 0 ? (
                          <>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Delivered Files</h3>
                            {order.deliverables.map((file) => (
                              <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                  </svg>
                                  <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <a href={file.url} download>
                                  <Button size="sm">Download</Button>
                                </a>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-600 dark:text-gray-400">No files delivered yet</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {currentUserIsBuyer && canAcceptDelivery && (
                  <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-3xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-1">Delivery Ready</h3>
                        <p className="text-sm text-green-700 dark:text-green-300">Review the files and accept or request changes</p>
                      </div>
                      <div className="flex gap-3">
                        {canRequestRevision && (
                          <Button variant="outline" onClick={handleRequestRevision}>
                            Request Revision
                          </Button>
                        )}
                        <Button onClick={handleAcceptDelivery}>
                          Accept & Complete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Seller/Buyer Info */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {currentUserIsBuyer ? 'Seller' : 'Buyer'}
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {currentUserIsBuyer ? order.seller.name : order.buyer.name}
                      </p>
                      {currentUserIsBuyer && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {order.seller.rating}
                        </div>
                      )}
                    </div>
                  </div>
                  {currentUserIsBuyer && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Avg. response time: {order.seller.responseTime}
                    </div>
                  )}
                  <Link href={`/chat?user=${currentUserIsBuyer ? order.seller.id : order.buyer.id}`}>
                    <Button className="w-full">Message</Button>
                  </Link>
                </div>

                {/* Gig Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <img src={order.gigImage} alt={order.gigTitle} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">{order.gigTitle}</p>
                    <Link href={`/gigs/${order.id}`}>
                      <Button variant="outline" size="sm" className="w-full">View Gig</Button>
                    </Link>
                  </div>
                </div>

                {/* Help */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-6">
                  <h3 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">Need Help?</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
                    Having issues with this order? We're here to help.
                  </p>
                  <div className="space-y-2">
                    <Link href="/support">
                      <Button variant="outline" size="sm" className="w-full">Contact Support</Button>
                    </Link>
                    {currentUserIsBuyer && (
                      <Button variant="outline" size="sm" className="w-full" onClick={handleOpenDispute}>
                        Open Dispute
                      </Button>
                    )}
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
