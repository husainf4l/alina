import { MetadataRoute } from 'next';

/**
 * Next.js 14+ Robots.txt Generation
 * 
 * Automatically generates robots.txt at /robots.txt
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/settings/',
          '/auth/',
          '/login',
          '/register',
          '/forgot-password',
          '/reset-password',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'GPTBot', // OpenAI crawler
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot', // Common Crawl
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai', // Claude crawler
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
