'use client';

import Link from 'next/link';
import { useCurrentUser } from '@/hooks/useAuth';

export default function CTASection() {
  const { data: currentUser } = useCurrentUser();

  return (
    <section className="py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-600/20 to-secondary-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-secondary-600/20 to-primary-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {currentUser ? (
          <div className="text-white">
            <h2 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight">Ready to Post Your Project?</h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Share your project details and get matched with top freelancers who can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/post-project"
                className="inline-block px-10 py-5 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-2xl"
              >
                Post Your Project
              </Link>
              <Link
                href="/dashboard"
                className="inline-block px-10 py-5 border-2 border-white/40 text-white rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-105"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-white">
            <h2 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight">Join Alina Today</h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Create your account and start hiring top freelancers or offer your services to clients worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-block px-10 py-5 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-2xl"
              >
                Get Started Free
              </Link>
              <Link
                href="/become-seller"
                className="inline-block px-10 py-5 border-2 border-white/40 text-white rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-105"
              >
                Become a Seller
              </Link>
            </div>
            <p className="text-gray-400 mt-10 text-sm font-medium">
              No credit card required • Free to post projects • 24/7 support
            </p>
          </div>
        )}

        {/* Trust indicators */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          <div className="text-gray-300">
            <div className="text-4xl md:text-5xl font-semibold text-white mb-2">50,000+</div>
            <div className="text-sm font-medium">Projects Completed</div>
          </div>
          <div className="text-gray-300">
            <div className="text-4xl md:text-5xl font-semibold text-white mb-2">15,000+</div>
            <div className="text-sm font-medium">Active Freelancers</div>
          </div>
          <div className="text-gray-300">
            <div className="text-4xl md:text-5xl font-semibold text-white mb-2">98%</div>
            <div className="text-sm font-medium">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}