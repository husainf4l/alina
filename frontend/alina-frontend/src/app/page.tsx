import { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import TrustStrip from '@/components/sections/TrustStrip';
import FeaturedServices from '@/components/sections/FeaturedServices';
import HowItWorks from '@/components/sections/HowItWorks';
import TopSellers from '@/components/sections/TopSellers';
import Testimonials from '@/components/sections/Testimonials';
import Differentiation from '@/components/sections/Differentiation';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Alina - Find the Perfect Service for Your Business | Professional Freelancers',
  description: 'Connect with top-rated freelancers for design, development, marketing, and more. Secure payments, fast delivery, and 4.8-star rated services. Start your project today.',
  keywords: 'freelancers, design, development, marketing, writing, business services, hire professionals',
  authors: [{ name: 'Alina Marketplace' }],
  creator: 'Alina',
  publisher: 'Alina',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3001'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Alina - Find the Perfect Service for Your Business',
    description: 'Connect with top-rated freelancers for design, development, marketing, and more. Secure payments, fast delivery, and 4.8-star rated services.',
    url: '/',
    siteName: 'Alina Marketplace',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alina Marketplace - Professional Freelance Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alina - Find the Perfect Service for Your Business',
    description: 'Connect with top-rated freelancers for design, development, marketing, and more.',
    images: ['/og-image.jpg'],
    creator: '@alina_marketplace',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function HomePage() {
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
