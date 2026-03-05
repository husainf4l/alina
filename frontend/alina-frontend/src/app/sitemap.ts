import { MetadataRoute } from 'next';
import { generateStaticPages, generateCategoryPages } from '@/lib/seo/sitemap';

/**
 * Next.js 14+ Sitemap Generation
 * 
 * Automatically generates sitemap.xml at /sitemap.xml
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com';

  // Static pages
  const staticPages = generateStaticPages();

  // Category pages
  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Toys',
    'Health & Beauty',
    'Automotive',
  ];
  const categoryPages = generateCategoryPages(categories);

  // Combine all pages
  const allPages = [...staticPages, ...categoryPages];

  // Convert to Next.js sitemap format
  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified ? new Date(page.lastModified) : new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
