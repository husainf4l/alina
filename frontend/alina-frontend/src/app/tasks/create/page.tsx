'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';

export default function CreateTaskPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    budget: '',
    budgetType: 'fixed' as 'fixed' | 'hourly',
    duration: '',
    skillsRequired: '',
    deadline: '',
  });

  const categories = [
    { id: '1', name: 'Web Development' },
    { id: '2', name: 'Mobile Development' },
    { id: '3', name: 'Design' },
    { id: '4', name: 'Writing' },
    { id: '5', name: 'Marketing' },
  ];

  const handleSubmit = () => {
    console.log('Create task:', formData);
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Post a Task</h1>
              <p className="text-gray-600 dark:text-gray-400">Describe your project and get bids from sellers</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Task Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Build a responsive e-commerce website"
                    className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                    placeholder="Describe your project in detail..."
                    className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Budget Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setFormData({ ...formData, budgetType: 'fixed' })}
                        className={`p-4 rounded-2xl border-2 font-semibold transition-all ${
                          formData.budgetType === 'fixed'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Fixed Price
                      </button>
                      <button
                        onClick={() => setFormData({ ...formData, budgetType: 'hourly' })}
                        className={`p-4 rounded-2xl border-2 font-semibold transition-all ${
                          formData.budgetType === 'hourly'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Hourly
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Budget ({formData.budgetType === 'hourly' ? '$/hour' : 'Total $'})
                    </label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="0.00"
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Duration & Deadline */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Duration (days)</label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="7"
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Deadline (optional)</label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Required Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.skillsRequired}
                    onChange={(e) => setFormData({ ...formData, skillsRequired: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <Link href="/tasks" className="flex-1">
                    <Button variant="outline" className="w-full">Cancel</Button>
                  </Link>
                  <Button onClick={handleSubmit} className="flex-1">Post Task</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
