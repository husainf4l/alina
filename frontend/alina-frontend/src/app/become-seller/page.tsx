'use client';

import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';

export default function BecomeSellerPage() {
  const benefits = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      title: 'Earn More',
      description: 'Keep 90% of your earnings. We charge only 10% commission, compared to industry average of 20-25%.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      ),
      title: 'Secure Payments',
      description: 'Protected escrow system ensures you get paid on time, every time. No payment disputes.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      title: 'Instant Payouts',
      description: 'Withdraw your earnings instantly to your bank account or PayPal. No waiting periods.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
      title: 'Grow Your Business',
      description: 'Access to thousands of clients actively looking for your skills. Build your brand and reputation.',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      ),
      title: '24/7 Support',
      description: 'Dedicated seller support team available around the clock to help you succeed.',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      title: 'Verified Badge',
      description: 'Get a verified seller badge to increase trust and stand out from the competition.',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Create Your Profile',
      description: 'Sign up and build your professional profile in minutes. Showcase your skills and portfolio.'
    },
    {
      number: '2',
      title: 'List Your Services',
      description: 'Create service listings with clear pricing, delivery times, and what you offer.'
    },
    {
      number: '3',
      title: 'Start Earning',
      description: 'Get matched with clients, deliver quality work, and build your reputation.'
    }
  ];

  const stats = [
    { value: '15,000+', label: 'Active Sellers' },
    { value: '$5M+', label: 'Earned by Sellers' },
    { value: '4.8★', label: 'Average Rating' },
    { value: '98%', label: 'Payment Success' }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 pt-28 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight">
              Turn Your Skills Into
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Income</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Join thousands of freelancers earning on their terms. Work from anywhere, set your own rates, and build the career you deserve.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/register"
                className="px-10 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                Start Selling Today
              </Link>
              <Link
                href="/marketplace"
                className="px-10 py-4 border-2 border-gray-300 text-gray-900 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">Why Sell on Alina?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to succeed as a freelancer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {benefit.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">Get Started in 3 Steps</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">It's simple to start selling on Alina</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gray-900 rounded-3xl shadow-lg flex items-center justify-center mx-auto relative z-10">
                    <span className="text-3xl font-semibold text-white">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-px bg-gray-200 z-0"></div>
                  )}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">Ready to Start Earning?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join Alina today and start making money doing what you love. No hidden fees, no commitments.
          </p>
          
          <Link
            href="/register"
            className="inline-block px-12 py-5 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 text-lg"
          >
            Create Your Free Account
          </Link>
          
          <p className="text-gray-400 mt-8 text-sm">
            No credit card required • Free forever • Start earning today
          </p>

          {/* Trust Indicators */}
          <div className="mt-16 pt-16 border-t border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="text-gray-300">
                <svg className="w-8 h-8 text-green-500 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="font-semibold text-white mb-1">Verified Payments</div>
                <div className="text-sm">Secure escrow protection</div>
              </div>
              <div className="text-gray-300">
                <svg className="w-8 h-8 text-green-500 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="font-semibold text-white mb-1">Global Reach</div>
                <div className="text-sm">Clients from 150+ countries</div>
              </div>
              <div className="text-gray-300">
                <svg className="w-8 h-8 text-green-500 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="font-semibold text-white mb-1">Low Fees</div>
                <div className="text-sm">Only 10% commission</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
