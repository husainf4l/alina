'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  highlight: string;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Founder & CEO',
      company: 'TechFlow Solutions',
      avatar: '/testimonials/sarah.jpg',
      rating: 5,
      text: "Alina transformed how we hire talent. Within 48 hours, we found a designer who perfectly understood our vision. The quality of work exceeded our expectations, and the platform's escrow system gave us complete peace of mind.",
      highlight: 'Found perfect designer in 48 hours'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Marketing Director',
      company: 'GrowthLab',
      avatar: '/testimonials/michael.jpg',
      rating: 5,
      text: "We've hired over 15 freelancers through Alina for various projects. The AI-powered matching is incredibly accurate - we save hours on screening. The 10% commission rate compared to 20% elsewhere saves us thousands monthly.",
      highlight: 'Saved thousands with lower fees'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      company: 'InnovateCo',
      avatar: '/testimonials/emily.jpg',
      rating: 5,
      text: "The quality guarantee feature is a game-changer. We requested several revisions on a complex project, and the freelancer delivered flawlessly. Alina's support team was incredibly responsive throughout the entire process.",
      highlight: 'Unlimited revisions, zero hassle'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Creative Director',
      company: 'Brand Studio',
      avatar: '/testimonials/david.jpg',
      rating: 5,
      text: "As a freelancer myself, Alina offers the best terms in the industry. Lower fees mean I can price competitively while earning more. The verification process builds client trust, and I've never had payment issues.",
      highlight: "Best platform for freelancers"
    },
    {
      id: 5,
      name: 'Lisa Wang',
      role: 'Startup Founder',
      company: 'AppVenture',
      avatar: '/testimonials/lisa.jpg',
      rating: 5,
      text: "We built our entire MVP using Alina freelancers. The platform made it easy to manage multiple projects simultaneously. From UI/UX to backend development, we found specialists for everything at 40% less cost than agencies.",
      highlight: 'Built entire MVP, saved 40%'
    },
    {
      id: 6,
      name: 'James Patterson',
      role: 'E-commerce Owner',
      company: 'ShopPro',
      avatar: '/testimonials/james.jpg',
      rating: 5,
      text: "The fastest turnaround I've seen on any platform. Posted a project in the morning, had 12 proposals by afternoon, hired by evening, and received the first draft next day. The quality was outstanding.",
      highlight: 'First draft in 24 hours'
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-purple-100/40 to-blue-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">50,000+ Five-Star Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3 tracking-tight">
            Loved by Businesses & Freelancers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've found success on Alina
          </p>
        </div>

        {/* Featured Testimonial - Compact Card */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/60 p-6 md:p-8 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 opacity-5">
              <svg className="w-20 h-20 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center space-x-1 mb-4">
              {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-base md:text-lg text-gray-900 font-medium leading-relaxed mb-5 relative z-10">
              "{activeTestimonial.text}"
            </blockquote>

            {/* Highlight Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/60 rounded-full mb-5">
              <svg className="w-4 h-4 text-blue-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs font-semibold text-blue-700">{activeTestimonial.highlight}</span>
            </div>

            {/* Author Info */}
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-base">
                {activeTestimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{activeTestimonial.name}</div>
                <div className="text-gray-600 text-xs">{activeTestimonial.role} at {activeTestimonial.company}</div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={prevTestimonial}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 group-hover:border-gray-900 flex items-center justify-center transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <span className="font-medium text-sm">Previous</span>
              </button>

              {/* Dots Indicator */}
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all ${
                      index === activeIndex
                        ? 'w-6 h-2 bg-gray-900 rounded-full'
                        : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <span className="font-medium text-sm">Next</span>
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 group-hover:border-gray-900 flex items-center justify-center transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="text-center p-4 bg-white rounded-xl border border-gray-200/60 shadow-sm">
            <div className="text-2xl font-bold text-gray-900 mb-0.5">4.8/5</div>
            <div className="text-xs text-gray-600">Average Rating</div>
            <div className="flex items-center justify-center mt-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="text-center p-4 bg-white rounded-xl border border-gray-200/60 shadow-sm">
            <div className="text-2xl font-bold text-gray-900 mb-0.5">98%</div>
            <div className="text-xs text-gray-600">Client Satisfaction</div>
            <div className="text-xs text-green-600 mt-1.5 font-medium">↑ 12% from last year</div>
          </div>

          <div className="text-center p-4 bg-white rounded-xl border border-gray-200/60 shadow-sm">
            <div className="text-2xl font-bold text-gray-900 mb-0.5">50K+</div>
            <div className="text-xs text-gray-600">Projects Completed</div>
            <div className="text-xs text-blue-600 mt-1.5 font-medium">This month</div>
          </div>

          <div className="text-center p-4 bg-white rounded-xl border border-gray-200/60 shadow-sm">
            <div className="text-2xl font-bold text-gray-900 mb-0.5">24/7</div>
            <div className="text-xs text-gray-600">Support Available</div>
            <div className="text-xs text-purple-600 mt-1.5 font-medium">Avg 2min response</div>
          </div>
        </div>
      </div>
    </section>
  );
}
