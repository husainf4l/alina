'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/sections/Navbar';
import Link from 'next/link';

interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatar?: string;
  bio: string;
  location?: string;
  memberSince: string;
  verified: boolean;
  rating: number;
  totalReviews: number;
  completedOrders: number;
  responseTime: string;
  skills: string[];
  languages: { language: string; level: string }[];
}

interface Gig {
  id: string;
  title: string;
  image?: string;
  price: number;
  rating: number;
  reviews: number;
}

interface Review {
  id: string;
  author: string;
  authorAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  gigTitle: string;
}

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  
  const [activeTab, setActiveTab] = useState<'gigs' | 'reviews' | 'about'>('gigs');
  
  // Mock data - replace with actual API calls
  const profile: UserProfile = {
    id: '1',
    username,
    fullName: 'John Designer',
    avatar: '',
    bio: 'Professional graphic designer with 8+ years of experience. Specialized in brand identity, logo design, and digital illustrations. I help businesses create stunning visual identities that stand out.',
    location: 'San Francisco, CA',
    memberSince: 'January 2022',
    verified: true,
    rating: 4.9,
    totalReviews: 234,
    completedOrders: 567,
    responseTime: '1 hour',
    skills: ['Logo Design', 'Brand Identity', 'Illustration', 'Adobe Illustrator', 'Figma'],
    languages: [
      { language: 'English', level: 'Native' },
      { language: 'Spanish', level: 'Fluent' },
    ],
  };

  const gigs: Gig[] = [
    {
      id: '1',
      title: 'I will design a professional logo for your business',
      image: '',
      price: 150,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: '2',
      title: 'I will create a complete brand identity package',
      image: '',
      price: 500,
      rating: 5.0,
      reviews: 45,
    },
    {
      id: '3',
      title: 'I will design custom illustrations for your project',
      image: '',
      price: 200,
      rating: 4.8,
      reviews: 67,
    },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      author: 'Sarah Johnson',
      authorAvatar: '',
      rating: 5,
      comment: 'Absolutely amazing work! The designer understood my vision perfectly and delivered beyond expectations. Highly recommended!',
      date: '2 weeks ago',
      gigTitle: 'Professional Logo Design',
    },
    {
      id: '2',
      author: 'Michael Chen',
      authorAvatar: '',
      rating: 5,
      comment: 'Great communication, fast delivery, and excellent quality. Will definitely work with again!',
      date: '1 month ago',
      gigTitle: 'Brand Identity Package',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/60 p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.fullName}
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {profile.fullName.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                    {profile.fullName}
                  </h1>
                  {profile.verified && (
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <p className="text-lg text-gray-600 mb-4">@{profile.username}</p>
                
                <p className="text-gray-700 mb-6 leading-relaxed">{profile.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border border-gray-200/60">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-2xl font-bold text-gray-900">{profile.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">{profile.totalReviews} reviews</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border border-gray-200/60">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{profile.completedOrders}</div>
                    <p className="text-xs text-gray-600 font-medium">Orders completed</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border border-gray-200/60">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{profile.responseTime}</div>
                    <p className="text-xs text-gray-600 font-medium">Response time</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border border-gray-200/60">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{profile.memberSince}</div>
                    <p className="text-xs text-gray-600 font-medium">Member since</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold shadow-lg hover:shadow-2xl hover:bg-gray-800 transition-all duration-200 hover:scale-105">
                    Contact Me
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/60 mb-8">
            <div className="border-b border-gray-200">
              <div className="flex gap-8 px-8">
                <button
                  onClick={() => setActiveTab('gigs')}
                  className={`py-4 font-semibold transition-colors relative ${
                    activeTab === 'gigs'
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Gigs
                  {activeTab === 'gigs' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 font-semibold transition-colors relative ${
                    activeTab === 'reviews'
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews
                  {activeTab === 'reviews' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`py-4 font-semibold transition-colors relative ${
                    activeTab === 'about'
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  About
                  {activeTab === 'about' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* Gigs Tab */}
              {activeTab === 'gigs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gigs.map((gig) => (
                    <Link
                      key={gig.id}
                      href={`/gig/${gig.id}`}
                      className="group bg-white border border-gray-200/60 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
                    >
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-3 line-clamp-2 text-gray-900 group-hover:text-primary-600 transition-colors leading-snug">
                          {gig.title}
                        </h3>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm font-bold text-gray-900">{gig.rating}</span>
                            <span className="ml-1 text-sm text-gray-500 font-medium">({gig.reviews})</span>
                          </div>
                          <div className="text-xl font-bold text-gray-900">${gig.price}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200/60">
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
                          <div className="flex items-center gap-1 mb-2">
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
                          <p className="text-gray-700 mb-2 leading-relaxed">{review.comment}</p>
                          <div className="text-sm text-gray-500 font-medium">
                            For: {review.gigTitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="space-y-8">
                  {/* Skills */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full text-sm font-medium text-gray-900 border border-gray-200/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Languages</h3>
                    <div className="space-y-3">
                      {profile.languages.map((lang) => (
                        <div key={lang.language} className="flex items-center justify-between py-3 border-b border-gray-200">
                          <span className="font-medium text-gray-900">{lang.language}</span>
                          <span className="text-sm text-gray-600">{lang.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  {profile.location && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
                      <div className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium">{profile.location}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
