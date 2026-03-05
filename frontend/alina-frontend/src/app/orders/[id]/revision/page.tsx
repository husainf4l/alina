'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function RevisionRequestPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [formData, setFormData] = useState({
    description: '',
    files: [] as File[],
  });

  // Mock order data
  const order = {
    id: orderId,
    gigTitle: 'Professional Logo Design - Standard Package',
    seller: { name: 'Jane Designer', avatar: '' },
    revisions: 3,
    revisionsUsed: 1,
    deliveredFiles: [
      { id: '1', name: 'logo-concept-1.png', url: '#' },
      { id: '2', name: 'logo-concept-2.png', url: '#' },
    ],
  };

  const revisionsRemaining = order.revisions - order.revisionsUsed;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, files: Array.from(e.target.files) });
    }
  };

  const removeFile = (index: number) => {
    const files = [...formData.files];
    files.splice(index, 1);
    setFormData({ ...formData, files });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Import order service
      const { orderService } = await import('@/lib/api/services/order.service');
      
      // Request revision (API only expects reason field, not attachments)
      await orderService.requestRevision(orderId, {
        reason: formData.description,
      });
      
      router.push(`/orders/${orderId}`);
    } catch (error) {
      console.error('Failed to request revision:', error);
      // Error handling would show toast notification
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <Link href={`/orders/${orderId}`} className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                ← Back to Order
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Request Revision</h1>
              <p className="text-gray-600 dark:text-gray-400">{order.gigTitle}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Revision Details */}
                  <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Revision Details</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          What needs to be changed? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={8}
                          required
                          minLength={50}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          placeholder="Be specific about what you'd like changed. The more details you provide, the better the seller can address your concerns..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {formData.description.length}/50 characters minimum
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Reference Files (Optional)
                        </label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Upload examples, mockups, or any files that help explain your revision request
                        </p>
                        
                        {formData.files.length > 0 && (
                          <div className="space-y-2 mb-4">
                            {formData.files.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                  </svg>
                                  <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{file.name}</p>
                                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                  </div>
                                </div>
                                <button type="button" onClick={() => removeFile(idx)} className="text-red-600 hover:text-red-700">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <label className="cursor-pointer">
                          <input
                            type="file"
                            multiple
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">Click to upload or drag and drop</p>
                            <p className="text-sm text-gray-500">PNG, JPG, PDF up to 10MB</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Delivered Files Reference */}
                  <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Current Delivery</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      These are the files that were delivered. Download them to review before requesting changes.
                    </p>
                    
                    <div className="space-y-2">
                      {order.deliveredFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{file.name}</span>
                          </div>
                          <a href={file.url} download>
                            <Button size="sm" variant="outline">Download</Button>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Link href={`/orders/${orderId}`} className="flex-1">
                      <Button variant="outline" type="button" className="w-full">Cancel</Button>
                    </Link>
                    <Button type="submit" className="flex-1" disabled={formData.description.length < 50}>
                      Submit Revision Request
                    </Button>
                  </div>
                </form>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Revisions Info */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Revisions</h3>
                  
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-blue-600 mb-2">{revisionsRemaining}</div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {revisionsRemaining === 1 ? 'Revision' : 'Revisions'} Remaining
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Used</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{order.revisionsUsed}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Total</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{order.revisions}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(order.revisionsUsed / order.revisions) * 100}%` }}
                      />
                    </div>
                  </div>

                  {revisionsRemaining === 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        You've used all your revisions. Additional revisions may incur extra charges.
                      </p>
                    </div>
                  )}
                </div>

                {/* Seller Info */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Seller</h3>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{order.seller.name}</p>
                      <Link href="/chat" className="text-sm text-blue-600 hover:text-blue-700">
                        Message Seller
                      </Link>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Communicate clearly to help the seller understand your needs.
                  </p>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-6">
                  <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Revision Tips</h3>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Be specific about what to change
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                     Provide visual references
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Keep feedback constructive
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Avoid scope creep
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
