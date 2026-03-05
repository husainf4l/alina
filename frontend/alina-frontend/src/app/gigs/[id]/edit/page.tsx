'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function EditGigPage() {
  const params = useParams();
  const router = useRouter();
  const gigId = params.id as string;
  const [step, setStep] = useState(1);

  // Mock existing gig data
  const existingGig = {
    id: gigId,
    title: 'Professional Logo Design',
    category: 'Graphics & Design',
    subcategory: 'Logo & Brand Identity',
    basicPrice: 50,
    basicDelivery: 3,
    basicRevisions: 2,
    basicFeatures: ['1 Logo Concept', 'Source Files'],
    standardPrice: 100,
    standardDelivery: 5,
    standardRevisions: 3,
    standardFeatures: ['3 Logo Concepts', 'Source Files', 'Social Media Kit'],
    premiumPrice: 200,
    premiumDelivery: 7,
    premiumRevisions: 5,
    premiumFeatures: ['5 Logo Concepts', 'Source Files', 'Social Media Kit', 'Brand Guidelines'],
    description: 'I will create a professional and unique logo for your business...',
    requirements: ['Company name', 'Preferred colors', 'Industry/niche'],
    images: ['https://via.placeholder.com/600x400'],
  };

  const [formData, setFormData] = useState({
    title: existingGig.title,
    category: existingGig.category,
    subcategory: existingGig.subcategory,
    basicPrice: existingGig.basicPrice,
    basicDelivery: existingGig.basicDelivery,
    basicRevisions: existingGig.basicRevisions,
    basicFeatures: existingGig.basicFeatures,
    standardPrice: existingGig.standardPrice,
    standardDelivery: existingGig.standardDelivery,
    standardRevisions: existingGig.standardRevisions,
    standardFeatures: existingGig.standardFeatures,
    premiumPrice: existingGig.premiumPrice,
    premiumDelivery: existingGig.premiumDelivery,
    premiumRevisions: existingGig.premiumRevisions,
    premiumFeatures: existingGig.premiumFeatures,
    description: existingGig.description,
    requirements: existingGig.requirements,
    images: existingGig.images,
  });

  const categories = [
    { name: 'Graphics & Design', subcategories: ['Logo & Brand Identity', 'Web & App Design', 'Illustration', 'Packaging Design', 'Book Design'] },
    { name: 'Programming & Tech', subcategories: ['Web Development', 'Mobile Apps', 'Desktop Apps', 'Game Development', 'Database'] },
    { name: 'Digital Marketing', subcategories: ['Social Media', 'SEO', 'Content Marketing', 'Email Marketing', 'Video Marketing'] },
    { name: 'Writing & Translation', subcategories: ['Content Writing', 'Copywriting', 'Translation', 'Proofreading', 'Technical Writing'] },
    { name: 'Video & Animation', subcategories: ['Video Editing', 'Animation', 'Whiteboard Videos', 'Video Ads', 'Intros & Outros'] },
  ];

  const currentCategory = categories.find(c => c.name === formData.category);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    console.log('Update gig:', formData);
    
    try {
      // Import gig service
      const { gigService } = await import('@/lib/api/services/gig.service');
      
      // Prepare update data
      const updateData = {
        title: formData.title,
        category: formData.category,
        subcategory: formData.subcategory,
        description: formData.description,
        pricing: {
          basic: {
            price: formData.basicPrice,
            deliveryDays: formData.basicDelivery,
            revisions: formData.basicRevisions,
            features: formData.basicFeatures,
          },
          standard: {
            price: formData.standardPrice,
            deliveryDays: formData.standardDelivery,
            revisions: formData.standardRevisions,
            features: formData.standardFeatures,
          },
          premium: {
            price: formData.premiumPrice,
            deliveryDays: formData.premiumDelivery,
            revisions: formData.premiumRevisions,
            features: formData.premiumFeatures,
          },
        },
        requirements: formData.requirements,
        images: formData.images,
      };
      
      await gigService.updateGig(gigId, updateData);
      router.push(`/gigs/${gigId}`);
    } catch (error) {
      console.error('Failed to update gig:', error);
      // Error handling would show toast notification
    }
  };

  const addFeature = (tier: 'basic' | 'standard' | 'premium') => {
    const key = `${tier}Features` as keyof typeof formData;
    setFormData({ ...formData, [key]: [...(formData[key] as string[]), ''] });
  };

  const removeFeature = (tier: 'basic' | 'standard' | 'premium', index: number) => {
    const key = `${tier}Features` as keyof typeof formData;
    const features = [...(formData[key] as string[])];
    features.splice(index, 1);
    setFormData({ ...formData, [key]: features });
  };

  const updateFeature = (tier: 'basic' | 'standard' | 'premium', index: number, value: string) => {
    const key = `${tier}Features` as keyof typeof formData;
    const features = [...(formData[key] as string[])];
    features[index] = value;
    setFormData({ ...formData, [key]: features });
  };

  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ''] });
  };

  const removeRequirement = (index: number) => {
    const reqs = [...formData.requirements];
    reqs.splice(index, 1);
    setFormData({ ...formData, requirements: reqs });
  };

  const updateRequirement = (index: number, value: string) => {
    const reqs = [...formData.requirements];
    reqs[index] = value;
    setFormData({ ...formData, requirements: reqs });
  };

  const removeImage = (index: number) => {
    const imgs = [...formData.images];
    imgs.splice(index, 1);
    setFormData({ ...formData, images: imgs });
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Edit Gig</h1>
                <p className="text-gray-600 dark:text-gray-400">Update your service details</p>
              </div>
              <Link href={`/gigs/${gigId}`}>
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}>
                      {s}
                    </div>
                    {s < 4 && <div className={`flex-1 h-1 mx-2 ${s < step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
                <span>Overview</span>
                <span>Pricing</span>
                <span>Description</span>
                <span>Gallery</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8">
              {/* Step 1: Overview */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gig Overview</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Gig Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        maxLength={80}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="I will..."
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.title.length}/80 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Subcategory <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                        disabled={!formData.category}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <option value="">Select a subcategory</option>
                        {currentCategory?.subcategories.map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Pricing */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pricing & Packages</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Basic Package */}
                    <div className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Basic</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Price ($)</label>
                          <input
                            type="number"
                            value={formData.basicPrice}
                            onChange={(e) => setFormData({ ...formData, basicPrice: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Delivery (days)</label>
                          <input
                            type="number"
                            value={formData.basicDelivery}
                            onChange={(e) => setFormData({ ...formData, basicDelivery: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Revisions</label>
                          <input
                            type="number"
                            value={formData.basicRevisions}
                            onChange={(e) => setFormData({ ...formData, basicRevisions: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Features</label>
                          {formData.basicFeatures.map((feature, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => updateFeature('basic', idx, e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                              />
                              <button onClick={() => removeFeature('basic', idx)} className="text-red-600 hover:text-red-700">×</button>
                            </div>
                          ))}
                          <button onClick={() => addFeature('basic')} className="text-sm text-blue-600 hover:text-blue-700">+ Add Feature</button>
                        </div>
                      </div>
                    </div>

                    {/* Standard Package */}
                    <div className="border-2 border-blue-600 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Standard</h3>
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Popular</span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Price ($)</label>
                          <input
                            type="number"
                            value={formData.standardPrice}
                            onChange={(e) => setFormData({ ...formData, standardPrice: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Delivery (days)</label>
                          <input
                            type="number"
                            value={formData.standardDelivery}
                            onChange={(e) => setFormData({ ...formData, standardDelivery: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Revisions</label>
                          <input
                            type="number"
                            value={formData.standardRevisions}
                            onChange={(e) => setFormData({ ...formData, standardRevisions: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Features</label>
                          {formData.standardFeatures.map((feature, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => updateFeature('standard', idx, e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                              />
                              <button onClick={() => removeFeature('standard', idx)} className="text-red-600 hover:text-red-700">×</button>
                            </div>
                          ))}
                          <button onClick={() => addFeature('standard')} className="text-sm text-blue-600 hover:text-blue-700">+ Add Feature</button>
                        </div>
                      </div>
                    </div>

                    {/* Premium Package */}
                    <div className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Premium</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Price ($)</label>
                          <input
                            type="number"
                            value={formData.premiumPrice}
                            onChange={(e) => setFormData({ ...formData, premiumPrice: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Delivery (days)</label>
                          <input
                            type="number"
                            value={formData.premiumDelivery}
                            onChange={(e) => setFormData({ ...formData, premiumDelivery: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Revisions</label>
                          <input
                            type="number"
                            value={formData.premiumRevisions}
                            onChange={(e) => setFormData({ ...formData, premiumRevisions: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Features</label>
                          {formData.premiumFeatures.map((feature, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => updateFeature('premium', idx, e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                              />
                              <button onClick={() => removeFeature('premium', idx)} className="text-red-600 hover:text-red-700">×</button>
                            </div>
                          ))}
                          <button onClick={() => addFeature('premium')} className="text-sm text-blue-600 hover:text-blue-700">+ Add Feature</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Description */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Description & Requirements</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Gig Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={8}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your service in detail..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Requirements from Buyer
                      </label>
                      {formData.requirements.map((req, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => updateRequirement(idx, e.target.value)}
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="e.g., Company name"
                          />
                          <button onClick={() => removeRequirement(idx)} className="text-red-600 hover:text-red-700 px-3">×</button>
                        </div>
                      ))}
                      <button onClick={addRequirement} className="text-sm text-blue-600 hover:text-blue-700">+ Add Requirement</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Gallery */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gig Gallery</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Upload 1-5 images showcasing your work</p>
                      
                      {formData.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                          {formData.images.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-40 object-cover rounded-xl" />
                              <button
                                onClick={() => removeImage(idx)}
                                className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {formData.images.length < 5 && (
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center">
                          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">Click to upload or drag and drop</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Back
                </Button>
                <Button onClick={handleNext}>
                  {step === 4 ? 'Save Changes' : 'Continue'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
