'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CreateGigPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    tags: [] as string[],
    pricing: {
      basic: { price: '', deliveryDays: '', revisions: '', features: [''] },
      standard: { price: '', deliveryDays: '', revisions: '', features: [''] },
      premium: { price: '', deliveryDays: '', revisions: '', features: [''] },
    },
    requirements: [''],
    images: [] as File[],
  });

  const categories = [
    { name: 'Graphics & Design', subcategories: ['Logo Design', 'Brand Style Guides', 'Illustration', 'Web Design'] },
    { name: 'Digital Marketing', subcategories: ['Social Media Marketing', 'SEO', 'Content Marketing', 'Email Marketing'] },
    { name: 'Writing & Translation', subcategories: ['Articles & Blog Posts', 'Translation', 'Proofreading', 'Technical Writing'] },
    { name: 'Video & Animation', subcategories: ['Video Editing', 'Animation', 'Explainer Videos', 'Intros & Outros'] },
    { name: 'Programming & Tech', subcategories: ['Web Development', 'Mobile Apps', 'WordPress', 'E-commerce Development'] },
  ];

  const selectedCategory = categories.find(cat => cat.name === formData.category);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    console.log('Create gig:', formData);
    
    try {
      // Import gig service
      const { gigService } = await import('@/lib/api/services/gig.service');
      
      // Prepare gig data
      const gigData = {
        title: formData.title,
        category: formData.category,
        subcategory: formData.subcategory,
        description: formData.description,
        tags: formData.tags,
        pricing: {
          basic: {
            price: parseFloat(formData.pricing.basic.price),
            deliveryDays: parseInt(formData.pricing.basic.deliveryDays),
            revisions: parseInt(formData.pricing.basic.revisions),
            features: formData.pricing.basic.features.filter(f => f.trim()),
          },
          standard: {
            price: parseFloat(formData.pricing.standard.price),
            deliveryDays: parseInt(formData.pricing.standard.deliveryDays),
            revisions: parseInt(formData.pricing.standard.revisions),
            features: formData.pricing.standard.features.filter(f => f.trim()),
          },
          premium: {
            price: parseFloat(formData.pricing.premium.price),
            deliveryDays: parseInt(formData.pricing.premium.deliveryDays),
            revisions: parseInt(formData.pricing.premium.revisions),
            features: formData.pricing.premium.features.filter(f => f.trim()),
          },
        },
        requirements: formData.requirements.filter(r => r.trim()),
        images: [], // Will be populated after image upload
      };
      
      const createdGig = await gigService.createGig(gigData);
      router.push(`/gigs/${createdGig.id}`);
    } catch (error) {
      console.error('Failed to create gig:', error);
      // Error handling would show toast notification
    }
  };

  const addFeature = (tier: 'basic' | 'standard' | 'premium') => {
    setFormData({
      ...formData,
      pricing: {
        ...formData.pricing,
        [tier]: {
          ...formData.pricing[tier],
          features: [...formData.pricing[tier].features, '']
        }
      }
    });
  };

  const updateFeature = (tier: 'basic' | 'standard' | 'premium', index: number, value: string) => {
    const features = [...formData.pricing[tier].features];
    features[index] = value;
    setFormData({
      ...formData,
      pricing: {
        ...formData.pricing,
        [tier]: { ...formData.pricing[tier], features }
      }
    });
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-6">
              <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 hover:underline inline-block mb-4">
                ← Back to Dashboard
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-6 border-2 border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {s}
                    </div>
                    {s < 4 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Overview</span>
                <span>Pricing</span>
                <span>Description</span>
                <span>Gallery</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-700">
              {/* Step 1: Overview */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Gig Overview</h2>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Gig Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      placeholder="I will create a professional logo design"
                      maxLength={80}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{formData.title.length}/80 characters</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                        className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Subcategory *
                      </label>
                      <select
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                        className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        disabled={!formData.category}
                      >
                        <option value="">Select subcategory</option>
                        {selectedCategory?.subcategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Pricing */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Pricing Packages</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {(['basic', 'standard', 'premium'] as const).map((tier) => (
                      <div key={tier} className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 capitalize">{tier}</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Price ($)
                            </label>
                            <input
                              type="number"
                              value={formData.pricing[tier].price}
                              onChange={(e) => setFormData({
                                ...formData,
                                pricing: { ...formData.pricing, [tier]: { ...formData.pricing[tier], price: e.target.value }}
                              })}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                              placeholder="0"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Delivery (days)
                            </label>
                            <input
                              type="number"
                              value={formData.pricing[tier].deliveryDays}
                              onChange={(e) => setFormData({
                                ...formData,
                                pricing: { ...formData.pricing, [tier]: { ...formData.pricing[tier], deliveryDays: e.target.value }}
                              })}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                              placeholder="0"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Revisions
                            </label>
                            <input
                              type="number"
                              value={formData.pricing[tier].revisions}
                              onChange={(e) => setFormData({
                                ...formData,
                                pricing: { ...formData.pricing, [tier]: { ...formData.pricing[tier], revisions: e.target.value }}
                              })}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                              placeholder="0"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Features
                            </label>
                            {formData.pricing[tier].features.map((feature, index) => (
                              <input
                                key={index}
                                type="text"
                                value={feature}
                                onChange={(e) => updateFeature(tier, index, e.target.value)}
                                className="w-full px-4 py-2 mb-2 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm"
                                placeholder="Feature description"
                              />
                            ))}
                            <button
                              onClick={() => addFeature(tier)}
                              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              + Add feature
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Description */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Description & Requirements</h2>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={10}
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
                      placeholder="Describe your service in detail..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Requirements from Buyer
                    </label>
                    {formData.requirements.map((req, index) => (
                      <input
                        key={index}
                        type="text"
                        value={req}
                        onChange={(e) => {
                          const requirements = [...formData.requirements];
                          requirements[index] = e.target.value;
                          setFormData({ ...formData, requirements });
                        }}
                        className="w-full px-4 py-3 mb-2 bg-gray-50 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        placeholder="What do you need from the buyer?"
                      />
                    ))}
                    <button
                      onClick={() => setFormData({ ...formData, requirements: [...formData.requirements, ''] })}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      + Add requirement
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Gallery */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Gig Gallery</h2>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Upload Images (minimum 1, maximum 5)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files) {
                            setFormData({ ...formData, images: Array.from(e.target.files).slice(0, 5) });
                          }
                        }}
                        className="hidden"
                        id="images-upload"
                      />
                      <label htmlFor="images-upload" className="cursor-pointer">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">Click to upload gig images</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">PNG, JPG (max 5MB each)</p>
                      </label>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-5 gap-4">
                        {formData.images.map((img, index) => (
                          <div key={index} className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                            <img src={URL.createObjectURL(img)} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                              onClick={() => setFormData({
                                ...formData,
                                images: formData.images.filter((_, i) => i !== index)
                              })}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Back
                </Button>
                {step < 4 ? (
                  <Button onClick={handleNext}>
                    Continue
                  </Button>
                ) : (
                  <Button onClick={handleSubmit}>
                    Publish Gig
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
