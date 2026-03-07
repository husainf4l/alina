'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR to prevent QueryClient issues
const Navbar = dynamic(() => import('@/components/sections/Navbar'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), { ssr: false });
const TrustStrip = dynamic(() => import('@/components/sections/TrustStrip'), { ssr: false });
const FeaturedServices = dynamic(() => import('@/components/sections/FeaturedServices'), { ssr: false });
const HowItWorks = dynamic(() => import('@/components/sections/HowItWorks'), { ssr: false });
const TopSellers = dynamic(() => import('@/components/sections/TopSellers'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: false });
const Differentiation = dynamic(() => import('@/components/sections/Differentiation'), { ssr: false });
const CTASection = dynamic(() => import('@/components/sections/CTASection'), { ssr: false });
const Footer = dynamic(() => import('@/components/sections/Footer'), { ssr: false });

export function HomePageContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Loading skeleton */}
        <div className="animate-pulse">
          <div className="h-16 bg-gray-100 border-b border-gray-200"></div>
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="h-12 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-12 bg-gray-300 rounded w-64"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <HeroSection />
        <TrustStrip />
        <FeaturedServices />
        <HowItWorks />
        <TopSellers />
        <Testimonials />
        <Differentiation />
        <CTASection />
        <Footer />
      </main>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Alina Marketplace",
            "description": "Professional freelance marketplace connecting businesses with top-rated freelancers",
            "url": process.env.NEXT_PUBLIC_SITE_URL || "https://alina.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://alina.com"}/marketplace?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Alina",
              "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://alina.com"}/logo.png`
              }
            }
          })
        }}
      />
    </div>
  );
}
