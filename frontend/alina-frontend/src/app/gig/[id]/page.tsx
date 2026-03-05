'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/sections/Navbar';
import Link from 'next/link';

interface Package {
  name: string;
  price: number;
  deliveryTime: string;
  revisions: number;
  features: string[];
}

interface Review {
  id: string;
  author: string;
  authorAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface GigDetail {
  id: string;
  title: string;
  description: string;
  images: string[];
  seller: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    verified: boolean;
    rating: number;
    reviews: number;
    level: string;
  };
  category: string;
  rating: number;
  totalReviews: number;
  completedOrders: number;
  packages: {
    basic: Package;
    standard?: Package;
    premium?: Package;
  };
  tags: string[];
}

export default function GigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gigId = params.id as string;
  
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('basic');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock data - replace with actual API call
  const gig: GigDetail = {
    id: gigId,
    title: 'I will design a professional and modern logo for your business',
    description: `I'm a professional graphic designer with 8+ years of experience in logo design and brand identity. I specialize in creating unique, memorable logos that perfectly represent your brand's values and vision.

**What you'll get:**
- Custom logo design tailored to your brand
- Multiple initial concepts to choose from
- Unlimited revisions until you're 100% satisfied
- All source files (AI, PSD, PDF, PNG, JPG)
- Full commercial rights
- Professional communication throughout the process

**My design process:**
1. Brand research and competitor analysis
2. Initial concept sketches
3. Digital refinement and color exploration
4. Final delivery with all file formats

I work with businesses of all sizes, from startups to established companies. Let's create something amazing together!`,
    images: [],
    seller: {
      id: '1',
      name: 'John Designer',
      username: 'johndesigner',
      avatar: '',
      verified: true,
      rating: 4.9,
      reviews: 234,
      level: 'Top Rated Seller',
    },
    category: 'Graphics & Design',
    rating: 4.9,
    totalReviews: 156,
    completedOrders: 423,
    packages: {
      basic: {
        name: 'Basic',
        price: 150,
        deliveryTime: '3 days',
        revisions: 3,
        features: [
          '1 logo concept',
          '3 revisions',
          'Basic source files (PNG, JPG)',
          'Commercial use',
        ],
      },
      standard: {
        name: 'Standard',
        price: 300,
        deliveryTime: '5 days',
        revisions: 5,
        features: [
          '3 logo concepts',
          '5 revisions',
          'All source files (AI, PSD, PDF, PNG, JPG)',
          'Vector files',
          'Commercial use',
          'Social media kit',
        ],
      },
      premium: {
        name: 'Premium',
        price: 500,
        deliveryTime: '7 days',
        revisions: -1, // unlimited
        features: [
          '5 logo concepts',
          'Unlimited revisions',
          'All source files + fonts',
          'Vector files',
          'Commercial use',
          'Social media kit',
          'Brand style guide',
          '24-hour support',
        ],
      },
    },
    tags: ['Logo Design', 'Brand Identity', 'Minimalist', 'Modern', 'Professional'],
  };

  const reviews: Review[] = [
    {
      id: '1',
      author: 'Sarah Johnson',
      authorAvatar: '',
      rating: 5,
      comment: 'Absolutely phenomenal work! John took the time to understand my brand and delivered a logo that exceeded all my expectations. The communication was excellent, and he was very responsive to feedback. Highly recommended!',
      date: '2 weeks ago',
      helpful: 12,
    },
    {
      id: '2',
      author: 'Michael Chen',
      authorAvatar: '',
      rating: 5,
      comment: 'Perfect! Fast delivery, great quality, and very professional. Will definitely work with again.',
      date: '1 month ago',
      helpful: 8,
    },
    {
      id: '3',
      author: 'Emily Rodriguez',
      authorAvatar: '',
      rating: 4,
      comment: 'Very good experience overall. The designer was creative and patient with revisions. Minor delays but worth the wait.',
      date: '1 month ago',
      helpful: 5,
    },
  ];

  const currentPackage = gig.packages[selectedPackage];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/marketplace" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
                Marketplace
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-semibold">{gig.category}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight leading-tight">
                  {gig.title}
                </h1>
                
                {/* Seller Info */}
                <div className="flex items-center gap-4">
                  <Link href={`/profile/${gig.seller.username}`} className="flex items-center gap-3 group">
                    {gig.seller.avatar ? (
                      <img src={gig.seller.avatar} alt={gig.seller.name} className="w-12 h-12 rounded-full" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold">
                        {gig.seller.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {gig.seller.name}
                        </span>
                        {gig.seller.verified && (
                          <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-bold text-gray-900">{gig.seller.rating}</span>
                          <span className="text-gray-500">({gig.seller.reviews})</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600 font-medium">{gig.seller.level}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Images */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200/60">
                <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/60 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Gig</h2>
                <div className="prose prose-gray max-w-none">
                  {gig.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/60 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Reviews ({gig.totalReviews})
                  </h2>
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-3xl font-bold text-gray-900">{gig.rating}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {review.authorAvatar ? (
                            <img src={review.authorAvatar} alt={review.author} className="w-12 h-12 rounded-full" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-semibold">
                              {review.author.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">{review.author}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                          <button className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing Sticky Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 p-6">
                {/* Package Tabs */}
                {gig.packages.standard && (
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setSelectedPackage('basic')}
                      className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                        selectedPackage === 'basic'
                          ? 'bg-gray-900 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Basic
                    </button>
                    <button
                      onClick={() => setSelectedPackage('standard')}
                      className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                        selectedPackage === 'standard'
                          ? 'bg-gray-900 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Standard
                    </button>
                    {gig.packages.premium && (
                      <button
                        onClick={() => setSelectedPackage('premium')}
                        className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                          selectedPackage === 'premium'
                            ? 'bg-gray-900 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Premium
                      </button>
                    )}
                  </div>
                )}

                {/* Package Details */}
                {currentPackage && (
                  <>
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold text-gray-900">${currentPackage.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">{currentPackage.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span className="font-medium">
                            {currentPackage.revisions === -1 ? 'Unlimited' : currentPackage.revisions} revisions
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {currentPackage.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold shadow-lg hover:shadow-2xl hover:bg-gray-800 transition-all duration-200 hover:scale-105 mb-3">
                      Continue (${currentPackage.price})
                    </button>
                    
                    <button className="w-full py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                      Contact Seller
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
