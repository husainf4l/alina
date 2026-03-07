'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFeaturedServices } from '@/hooks';

export default function FeaturedServices() {
  const { data: services, isLoading, isError } = useFeaturedServices();

  // Handle error or empty data - show empty state
  if (isError || (!isLoading && (!services || services.length === 0))) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4 tracking-tight">Featured Services</h2>
            <p className="text-xl text-gray-600">Hand-picked services by our experts</p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">No featured services available at the moment.</p>
            <Link href="/marketplace" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
              Browse all services →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4 tracking-tight">Featured Services</h2>
            <p className="text-xl text-gray-600">Hand-picked services by our experts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-52 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4 tracking-tight">Featured Services</h2>
          <p className="text-xl text-gray-600">Hand-picked services by our experts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services?.map((service) => (
            <Link
              key={service.id}
              href={`/marketplace/${service.id}`}
              className="group bg-white border border-gray-200/60 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-gray-300"
            >
              <div className="relative h-52 bg-gray-100">
                {service.mainImage ? (
                  <Image
                    src={service.mainImage}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <span className="text-4xl">🎨</span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    Featured
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative w-10 h-10">
                    <Image
                      src={service.sellerAvatar || '/default-avatar.png'}
                      alt={service.sellerName}
                      fill
                      className="rounded-full object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {service.sellerName}
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(service.sellerRating || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1 font-medium">
                        {Number(service.sellerRating || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                  {service.title}
                </h3>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="text-lg font-bold text-gray-900">
                    ${service.packages?.[0]?.price || service.startingPrice || 0}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {service.deliveryTimeInDays}d delivery
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/marketplace"
            className="inline-flex items-center px-10 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 font-semibold hover:scale-105 shadow-lg"
          >
            Explore All Services
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}