'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTopSellers } from '@/hooks';

export default function TopSellers() {
  const { data: sellers, isLoading, isError } = useTopSellers();

  // Handle error or empty data - show empty state
  if (isError || (!isLoading && (!sellers || sellers.length === 0))) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4 tracking-tight">Top Sellers</h2>
            <p className="text-xl text-gray-600">Meet our highest-rated freelancers</p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">No top sellers available at the moment.</p>
            <Link href="/marketplace" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
              Explore marketplace →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4 tracking-tight">Top Sellers</h2>
            <p className="text-xl text-gray-600">Meet our highest-rated freelancers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-sm animate-pulse">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4 tracking-tight">Top Sellers</h2>
          <p className="text-xl text-gray-600">Meet our highest-rated freelancers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers?.slice(0, 4).map((seller) => (
            <Link
              key={seller.id}
              href={`/users/${seller.id}`}
              className="group bg-gradient-to-b from-gray-50 to-white hover:from-white hover:to-gray-50 border border-gray-200/60 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src={seller.avatar || '/default-avatar.png'}
                    alt={seller.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="64px"
                  />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors text-lg">
                    {seller.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">{seller.specialty}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(seller.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-900 ml-1">
                      {Number(seller.rating || 0).toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    {seller.ordersCompleted} orders
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {seller.skills?.slice(0, 3).map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Response time</span>
                    <span className="font-semibold text-gray-900">{seller.responseTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/sellers"
            className="inline-flex items-center px-10 py-4 bg-white border-2 border-gray-300 rounded-full text-gray-900 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-105 shadow-sm"
          >
            View All Sellers
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}