'use client';

import Link from 'next/link';

export default function Differentiation() {
  const advantages = [
    {
      title: 'AI-Powered Matching',
      description: 'Our smart algorithm connects you with the perfect freelancer based on your project requirements, budget, and timeline.',
      color: 'from-primary-500 to-secondary-500'
    },
    {
      title: 'Secure Escrow Payments',
      description: 'Your money is protected until you approve the work. No upfront payments, no risk of fraud.',
      color: 'from-secondary-500 to-primary-500'
    },
    {
      title: 'Verified Freelancers',
      description: 'Every freelancer undergoes identity verification and skills assessment before joining our platform.',
      color: 'from-primary-500 to-primary-600'
    },
    {
      title: 'Lower Commission Rates',
      description: 'We charge only 10% commission compared to industry average of 20-25%, saving you money.',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      title: 'Lightning Fast Delivery',
      description: 'Average delivery time of 3 days with priority support for urgent projects.',
      color: 'from-primary-600 to-secondary-600'
    },
    {
      title: 'Quality Guarantee',
      description: 'Not satisfied? Get unlimited revisions or a full refund. Your satisfaction is guaranteed.',
      color: 'from-secondary-600 to-primary-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">Why Choose Alina?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're not just another marketplace. Here's what makes us different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-gray-50 hover:bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${advantage.color} mb-6`}>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {advantage.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gray-900 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-semibold mb-4">Ready to Get Started?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who trust Alina for their project needs.
            Post your project today and get matched with top freelancers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/post-project"
              className="px-8 py-3.5 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all duration-200 inline-block text-center"
            >
              Post a Project
            </Link>
            <Link
              href="/marketplace"
              className="px-8 py-3.5 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-200 inline-block text-center"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}