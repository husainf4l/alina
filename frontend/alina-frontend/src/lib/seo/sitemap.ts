/**
 * Sitemap Generation Utilities
 * 
 * Provides utilities for generating XML sitemaps for SEO.
 * Includes support for:
 * - Static pages
 * - Dynamic pages (products, articles, profiles)
 * - Image sitemaps
 * - Video sitemaps
 * - Sitemap index
 */

export interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    url: string;
    title?: string;
    caption?: string;
  }>;
}

export interface SitemapConfig {
  baseUrl: string;
  entries: SitemapEntry[];
}

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com';

/**
 * Generate XML sitemap
 */
export function generateSitemap(entries: SitemapEntry[], baseUrl: string = DEFAULT_BASE_URL): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map((entry) => generateUrlEntry(entry, baseUrl)).join('\n')}
</urlset>`;

  return xml;
}

/**
 * Generate a single URL entry
 */
function generateUrlEntry(entry: SitemapEntry, baseUrl: string): string {
  const fullUrl = entry.url.startsWith('http') ? entry.url : `${baseUrl}${entry.url}`;
  const lastMod = entry.lastModified
    ? new Date(entry.lastModified).toISOString()
    : new Date().toISOString();

  let xml = `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${lastMod}</lastmod>`;

  if (entry.changeFrequency) {
    xml += `\n    <changefreq>${entry.changeFrequency}</changefreq>`;
  }

  if (entry.priority !== undefined) {
    xml += `\n    <priority>${entry.priority.toFixed(1)}</priority>`;
  }

  // Add image entries if present
  if (entry.images && entry.images.length > 0) {
    entry.images.forEach((image) => {
      const imageUrl = image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`;
      xml += `\n    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>`;
      
      if (image.title) {
        xml += `\n      <image:title>${escapeXml(image.title)}</image:title>`;
      }
      
      if (image.caption) {
        xml += `\n      <image:caption>${escapeXml(image.caption)}</image:caption>`;
      }
      
      xml += `\n    </image:image>`;
    });
  }

  xml += `\n  </url>`;
  return xml;
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate static pages sitemap entries
 */
export function generateStaticPages(): SitemapEntry[] {
  return [
    {
      url: '/',
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: '/marketplace',
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: '/about',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: '/contact',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: '/privacy',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: '/terms',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

/**
 * Generate dynamic product pages
 * In production, fetch from API
 */
export async function generateProductPages(): Promise<SitemapEntry[]> {
  // TODO: Replace with actual API call
  // const products = await fetch(`${API_URL}/products`).then(r => r.json());
  
  // Example structure:
  return [
    // {
    //   url: `/products/${product.id}`,
    //   lastModified: product.updatedAt,
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    //   images: product.images.map(img => ({
    //     url: img.url,
    //     title: product.name,
    //     caption: img.description,
    //   })),
    // }
  ];
}

/**
 * Generate dynamic article/blog pages
 */
export async function generateArticlePages(): Promise<SitemapEntry[]> {
  // TODO: Replace with actual API call
  // const articles = await fetch(`${API_URL}/articles`).then(r => r.json());
  
  return [];
}

/**
 * Generate category pages
 */
export function generateCategoryPages(categories: string[]): SitemapEntry[] {
  return categories.map((category) => ({
    url: `/marketplace?category=${encodeURIComponent(category)}`,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));
}

/**
 * Generate sitemap index for multiple sitemaps
 */
export function generateSitemapIndex(sitemaps: Array<{ url: string; lastModified?: Date }>): string {
  const baseUrl = DEFAULT_BASE_URL;
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((sitemap) => {
  const lastMod = sitemap.lastModified
    ? new Date(sitemap.lastModified).toISOString()
    : new Date().toISOString();
  
  return `  <sitemap>
    <loc>${baseUrl}${sitemap.url}</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>`;
}).join('\n')}
</sitemapindex>`;

  return xml;
}

/**
 * Split large sitemap into chunks (max 50,000 URLs per sitemap)
 */
export function splitSitemap(entries: SitemapEntry[], maxEntries: number = 50000): SitemapEntry[][] {
  const chunks: SitemapEntry[][] = [];
  
  for (let i = 0; i < entries.length; i += maxEntries) {
    chunks.push(entries.slice(i, i + maxEntries));
  }
  
  return chunks;
}

/**
 * Validate sitemap entry
 */
export function validateEntry(entry: SitemapEntry): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!entry.url) {
    errors.push('URL is required');
  }

  if (entry.priority !== undefined && (entry.priority < 0 || entry.priority > 1)) {
    errors.push('Priority must be between 0 and 1');
  }

  if (entry.images && entry.images.length > 1000) {
    errors.push('Maximum 1000 images per URL');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
