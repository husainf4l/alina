/**
 * SEO Meta Tags Utilities
 * 
 * Provides utilities for generating SEO-optimized meta tags including:
 * - Basic meta tags (title, description, keywords)
 * - Open Graph tags (Facebook, LinkedIn)
 * - Twitter Card tags
 * - Canonical URLs
 * - Robots directives
 */

import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  canonical?: string;
}

export interface TwitterCardConfig {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
}

export interface OpenGraphConfig {
  siteName?: string;
  locale?: string;
  alternateLocale?: string[];
}

const DEFAULT_CONFIG = {
  siteName: 'Alina',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com',
  defaultImage: '/og-image.png',
  twitterSite: '@alina',
  locale: 'en_US',
};

/**
 * Generate complete metadata for Next.js pages
 */
export function generateMetadata(config: SEOConfig, options?: {
  twitter?: TwitterCardConfig;
  openGraph?: OpenGraphConfig;
}): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = DEFAULT_CONFIG.defaultImage,
    url,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    noIndex = false,
    noFollow = false,
    canonical,
  } = config;

  const fullTitle = title.includes('|') ? title : `${title} | ${DEFAULT_CONFIG.siteName}`;
  const fullUrl = url || DEFAULT_CONFIG.siteUrl;
  const fullImage = image.startsWith('http') ? image : `${DEFAULT_CONFIG.siteUrl}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: options?.openGraph?.siteName || DEFAULT_CONFIG.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: options?.openGraph?.locale || DEFAULT_CONFIG.locale,
      type,
      publishedTime,
      modifiedTime,
      section,
      tags,
    },

    // Twitter Card
    twitter: {
      card: options?.twitter?.card || 'summary_large_image',
      site: options?.twitter?.site || DEFAULT_CONFIG.twitterSite,
      creator: options?.twitter?.creator || DEFAULT_CONFIG.twitterSite,
      title: fullTitle,
      description,
      images: [fullImage],
    },

    // Robots
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical
    alternates: canonical ? {
      canonical,
    } : undefined,

    // Verification
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
  };

  return metadata;
}

/**
 * Generate metadata for homepage
 */
export function generateHomeMetadata(): Metadata {
  return generateMetadata({
    title: 'Home',
    description: 'Alina - Your trusted marketplace for buying and selling products and services',
    keywords: ['marketplace', 'e-commerce', 'buy', 'sell', 'products', 'services'],
    image: '/og-home.png',
  });
}

/**
 * Generate metadata for marketplace page
 */
export function generateMarketplaceMetadata(category?: string): Metadata {
  const title = category ? `${category} - Marketplace` : 'Marketplace';
  const description = category
    ? `Browse ${category.toLowerCase()} items in our marketplace`
    : 'Discover amazing products and services in our marketplace';

  return generateMetadata({
    title,
    description,
    keywords: ['marketplace', 'products', 'buy', 'sell', category].filter(Boolean) as string[],
    image: '/og-marketplace.png',
  });
}

/**
 * Generate metadata for product page
 */
export function generateProductMetadata(product: {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  seller?: string;
}): Metadata {
  return generateMetadata({
    title: product.name,
    description: product.description,
    keywords: [product.category, 'product', 'buy', product.seller].filter(Boolean) as string[],
    image: product.image || '/og-product.png',
    type: 'website', // Use 'website' type for products in Open Graph
  });
}

/**
 * Generate metadata for blog/article page
 */
export function generateArticleMetadata(article: {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  image?: string;
  category?: string;
}): Metadata {
  return generateMetadata({
    title: article.title,
    description: article.description,
    keywords: article.tags || [],
    image: article.image || '/og-article.png',
    type: 'article',
    author: article.author,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    section: article.category,
    tags: article.tags,
  });
}

/**
 * Generate metadata for user profile page
 */
export function generateProfileMetadata(profile: {
  username: string;
  bio?: string;
  avatar?: string;
}): Metadata {
  return generateMetadata({
    title: `${profile.username}'s Profile`,
    description: profile.bio || `View ${profile.username}'s profile on Alina`,
    keywords: ['profile', 'user', profile.username],
    image: profile.avatar || '/og-profile.png',
    type: 'profile',
  });
}

/**
 * Generate metadata for authentication pages
 */
export function generateAuthMetadata(type: 'login' | 'register' | 'forgot-password'): Metadata {
  const configs = {
    login: {
      title: 'Login',
      description: 'Login to your Alina account',
    },
    register: {
      title: 'Register',
      description: 'Create a new Alina account',
    },
    'forgot-password': {
      title: 'Forgot Password',
      description: 'Reset your Alina account password',
    },
  };

  const config = configs[type];
  
  return generateMetadata({
    title: config.title,
    description: config.description,
    keywords: ['auth', type, 'account'],
    noIndex: true, // Don't index auth pages
  });
}

/**
 * Generate metadata for dashboard pages
 */
export function generateDashboardMetadata(section?: string): Metadata {
  const title = section ? `${section} - Dashboard` : 'Dashboard';
  const description = section
    ? `Manage your ${section.toLowerCase()} in your Alina dashboard`
    : 'Manage your Alina account and activities';

  return generateMetadata({
    title,
    description,
    keywords: ['dashboard', section].filter(Boolean) as string[],
    noIndex: true, // Don't index private dashboard pages
  });
}

/**
 * Generate JSON-LD structured data for rich snippets
 */
export function generateStructuredData(type: 'Organization' | 'Product' | 'Article' | 'BreadcrumbList', data: any) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return JSON.stringify(baseData);
}

/**
 * Generate organization structured data
 */
export function generateOrganizationSchema() {
  return generateStructuredData('Organization', {
    name: DEFAULT_CONFIG.siteName,
    url: DEFAULT_CONFIG.siteUrl,
    logo: `${DEFAULT_CONFIG.siteUrl}/logo.png`,
    description: 'Alina - Your trusted marketplace for buying and selling products and services',
    sameAs: [
      'https://twitter.com/alina',
      'https://facebook.com/alina',
      'https://linkedin.com/company/alina',
    ],
  });
}

/**
 * Generate product structured data
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  sku?: string;
}) {
  return generateStructuredData('Product', {
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'USD',
      availability: `https://schema.org/${product.availability || 'InStock'}`,
    },
    brand: product.brand ? {
      '@type': 'Brand',
      name: product.brand,
    } : undefined,
    sku: product.sku,
  });
}

/**
 * Generate article structured data
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  return generateStructuredData('Article', {
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    image: article.image,
    publisher: {
      '@type': 'Organization',
      name: DEFAULT_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${DEFAULT_CONFIG.siteUrl}/logo.png`,
      },
    },
  });
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return generateStructuredData('BreadcrumbList', {
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${DEFAULT_CONFIG.siteUrl}${crumb.url}`,
    })),
  });
}
