'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function SubmitBidPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [formData, setFormData] = useState({
    amount: '',
    duration: '',
    coverLetter: '',
    attachments: [] as File[],
  });

  // Mock task data
  const task = {
    id: taskId,
    title: 'Build E-commerce Website',
    budget: 5000,
    budgetType: 'fixed' as 'fixed' | 'hourly',
    duration: 30,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Import bid service
      const { bidService } = await import('@/lib/api/services/bid.service');
      
      // Submit bid
      await bidService.createBid({
        taskId,
        amount: parseFloat(formData.amount),
        deliveryDays: parseInt(formData.duration),
        proposal: formData.coverLetter,
        attachments: formData.attachments,
      });
      
      // Redirect back to task page
      router.push(`/tasks/${taskId}`);
    } catch (error) {
      console.error('Failed to submit bid:', error);
      // Error handling would show toast notification
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, attachments: Array.from(e.target.files) });
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-6">
              <Link href={`/tasks/${taskId}`} className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
                ← Back to Task
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-700">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Submit Your Bid</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">for "{task.title}"</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bid Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Bid Amount *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">$</span>
                    <input
                      type="number"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full pl-8 pr-4 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      placeholder="0.00"
                      min="1"
                      step="0.01"
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Client budget: ${task.budget.toLocaleString()} {task.budgetType === 'hourly' ? '/hour' : ''}
                  </p>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Delivery Time (days) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="Number of days"
                    min="1"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Client requested: {task.duration} days
                  </p>
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    required
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
                    placeholder="Explain why you're the best fit for this task. Highlight your relevant experience, skills, and approach to the project..."
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {formData.coverLetter.length} / 500 characters minimum
                  </p>
                </div>

                {/* Attachments */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Attachments (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 text-center">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        PDF, DOC, JPG, PNG (max 10MB)
                      </p>
                    </label>
                  </div>
                  {formData.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => setFormData({
                              ...formData,
                              attachments: formData.attachments.filter((_, i) => i !== index)
                            })}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-semibold mb-1">Tips for a winning bid:</p>
                      <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                        <li>Be competitive with your pricing</li>
                        <li>Highlight relevant experience and skills</li>
                        <li>Provide a clear delivery timeline</li>
                        <li>Ask clarifying questions if needed</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6">
                  <Link href={`/tasks/${taskId}`} className="flex-1">
                    <Button type="button" variant="outline" className="w-full">Cancel</Button>
                  </Link>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={!formData.amount || !formData.duration || formData.coverLetter.length < 50}
                  >
                    Submit Bid
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
