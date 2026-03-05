/**
 * Structured Data Component
 * 
 * Injects JSON-LD structured data into the page for rich snippets.
 * Use in page components or layouts to add Schema.org markup.
 */

interface StructuredDataProps {
  data: object | string;
}

export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = typeof data === 'string' ? data : JSON.stringify(data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}

/**
 * Organization Schema Component
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alina',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com'}/logo.png`,
    description: 'Your trusted marketplace for buying and selling products and services',
    sameAs: [
      'https://twitter.com/alina',
      'https://facebook.com/alina',
      'https://linkedin.com/company/alina',
      'https://instagram.com/alina',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'Customer Service',
      areaServed: 'US',
      availableLanguage: ['English'],
    },
  };

  return <StructuredData data={schema} />;
}

/**
 * Website Schema Component
 */
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Alina',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com'}/marketplace?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <StructuredData data={schema} />;
}

/**
 * Breadcrumb Schema Component
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com';
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };

  return <StructuredData data={schema} />;
}

/**
 * Product Schema Component
 */
interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  sku?: string;
  rating?: {
    value: number;
    count: number;
  };
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  currency = 'USD',
  availability = 'InStock',
  brand,
  sku,
  rating,
}: ProductSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com';
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: fullImage,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: typeof window !== 'undefined' ? window.location.href : baseUrl,
    },
  };

  if (brand) {
    schema.brand = {
      '@type': 'Brand',
      name: brand,
    };
  }

  if (sku) {
    schema.sku = sku;
  }

  if (rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.value,
      reviewCount: rating.count,
    };
  }

  return <StructuredData data={schema} />;
}

/**
 * Article Schema Component
 */
interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}

export function ArticleSchema({
  title,
  description,
  author,
  publishedAt,
  updatedAt,
  image,
}: ArticleSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com';
  const fullImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : undefined;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    image: fullImage,
    publisher: {
      '@type': 'Organization',
      name: 'Alina',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  };

  return <StructuredData data={schema} />;
}

/**
 * FAQ Schema Component
 */
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <StructuredData data={schema} />;
}
