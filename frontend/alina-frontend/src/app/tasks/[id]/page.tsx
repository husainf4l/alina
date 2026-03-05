'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function TaskDetailsPage() {
  const params = useParams();
  const taskId = params.id as string;

  // Mock task data
  const task = {
    id: taskId,
    title: 'Build E-commerce Website',
    description: 'I need a full-featured e-commerce website with payment integration, product catalog, shopping cart, and admin dashboard. The design should be modern and responsive. Previous experience with e-commerce platforms is required.',
    category: 'Web Development',
    budget: 5000,
    budgetType: 'fixed' as 'fixed' | 'hourly',
    duration: 30,
    deadline: '2026-04-15',
    skillsRequired: ['React', 'Node.js', 'MongoDB', 'Payment Integration'],
    status: 'OPEN' as const,
    buyer: { id: '123', name: 'Sarah Williams', avatar: '' },
    bidsCount: 12,
    createdAt: '2026-03-01T10:00:00Z',
  };

  // Mock bids data
  const bids = [
    { id: '1', seller: { id: '2', name: 'John Developer', avatar: '', rating: 4.9, completedTasks: 47 }, amount: 4500, duration: 25, coverLetter: 'I have 8+ years of experience building e-commerce platforms. I can deliver a high-quality solution within your timeline.', status: 'PENDING', createdAt: '2026-03-02T09:00:00Z' },
    { id: '2', seller: { id: '3', name: 'Jane Tech', avatar: '', rating: 5.0, completedTasks: 65 }, amount: 4800, duration: 28, coverLetter: 'Expert in React and Node.js with proven track record in e-commerce development. Portfolio available upon request.', status: 'PENDING', createdAt: '2026-03-02T11:30:00Z' },
    { id: '3', seller: { id: '4', name: 'Mike Solutions', avatar: '', rating: 4.8, completedTasks: 32 }, amount: 5200, duration: 30, coverLetter: 'Specialized in payment integrations and secure transaction systems. Can provide references from previous clients.', status: 'PENDING', createdAt: '2026-03-02T14:15:00Z' },
  ];

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-6">
              <Link href="/tasks" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
                ← Back to Tasks
              </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Task Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{task.title}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Posted {new Date(task.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{task.bidsCount} bids</span>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                      task.status === 'OPEN' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {task.status}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Description</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{task.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {task.skillsRequired.map((skill, index) => (
                        <span key={index} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Budget</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${task.budget.toLocaleString()}
                        <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
                          {task.budgetType === 'hourly' ? '/hour' : 'fixed'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{task.duration} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Deadline</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {new Date(task.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{task.category}</p>
                    </div>
                  </div>
                </div>

                {/* Bids */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Bids ({bids.length})</h2>
                  <div className="space-y-4">
                    {bids.map((bid) => (
                      <div key={bid.id} className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                              {bid.seller.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white">{bid.seller.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span>{bid.seller.rating}</span>
                                </div>
                                <span>•</span>
                                <span>{bid.seller.completedTasks} completed</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${bid.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">in {bid.duration} days</p>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{bid.coverLetter}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          Submitted {new Date(bid.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About the Buyer</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {task.buyer.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{task.buyer.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Buyer</p>
                    </div>
                  </div>
                  <Link href={`/profile/${task.buyer.id}`}>
                    <Button className="w-full" variant="outline">View Profile</Button>
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">Interested in this task?</h3>
                  <p className="text-blue-100 mb-4 text-sm">Submit your bid and stand out from the competition</p>
                  <Link href={`/tasks/${taskId}/submit-bid`}>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Submit a Bid</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
