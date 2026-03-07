import { Metadata } from 'next';
import { HomePageContent } from '@/components/home/HomePageContent';

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
  return <HomePageContent />;
}
