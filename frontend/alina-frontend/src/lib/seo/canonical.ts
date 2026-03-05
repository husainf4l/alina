/**
 * Canonical URL Utilities
 * 
 * Manages canonical URLs to prevent duplicate content issues.
 * Handles query parameters, trailing slashes, and URL normalization.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com';

/**
 * Generate canonical URL for a given path
 */
export function getCanonicalUrl(path: string, params?: Record<string, string | string[]>): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Build base URL
  let canonicalUrl = `${BASE_URL}/${cleanPath}`;
  
  // Remove trailing slash (except for root)
  if (canonicalUrl.endsWith('/') && canonicalUrl !== `${BASE_URL}/`) {
    canonicalUrl = canonicalUrl.slice(0, -1);
  }
  
  // Add important query parameters (if needed)
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    
    // Only include SEO-relevant parameters (e.g., page, category, sort)
    const allowedParams = ['page', 'category', 'sort', 'q'];
    
    Object.entries(params).forEach(([key, value]) => {
      if (allowedParams.includes(key)) {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, v));
        } else {
          searchParams.set(key, value);
        }
      }
    });
    
    const queryString = searchParams.toString();
    if (queryString) {
      canonicalUrl += `?${queryString}`;
    }
  }
  
  return canonicalUrl;
}

/**
 * Normalize URL by removing tracking parameters and session IDs
 */
export function normalizeUrl(url: string): string {
  const urlObj = new URL(url, BASE_URL);
  
  // Parameters to remove (tracking, session, etc.)
  const paramsToRemove = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'fbclid',
    'gclid',
    'ref',
    'source',
    'sessionid',
    'session_id',
    '_ga',
    '_gl',
  ];
  
  paramsToRemove.forEach((param) => {
    urlObj.searchParams.delete(param);
  });
  
  // Remove trailing slash
  let pathname = urlObj.pathname;
  if (pathname.endsWith('/') && pathname !== '/') {
    pathname = pathname.slice(0, -1);
  }
  
  // Rebuild URL
  let normalized = `${urlObj.origin}${pathname}`;
  const queryString = urlObj.searchParams.toString();
  if (queryString) {
    normalized += `?${queryString}`;
  }
  
  return normalized;
}

/**
 * Check if URL is canonical
 */
export function isCanonical(url: string, expectedCanonical: string): boolean {
  return normalizeUrl(url) === normalizeUrl(expectedCanonical);
}

/**
 * Get alternate language URLs
 */
export function getAlternateUrls(
  path: string,
  languages: Array<{ code: string; name: string }>
): Array<{ hreflang: string; href: string }> {
  return languages.map((lang) => ({
    hreflang: lang.code,
    href: `${BASE_URL}/${lang.code}${path}`,
  }));
}

/**
 * Generate pagination canonical URLs
 */
export function getPaginationCanonical(basePath: string, page: number): {
  canonical: string;
  prev?: string;
  next?: string;
  first?: string;
  last?: string;
} {
  const canonical = page === 1
    ? getCanonicalUrl(basePath)
    : getCanonicalUrl(basePath, { page: page.toString() });
  
  const result: ReturnType<typeof getPaginationCanonical> = { canonical };
  
  if (page > 1) {
    result.prev = page === 2
      ? getCanonicalUrl(basePath)
      : getCanonicalUrl(basePath, { page: (page - 1).toString() });
    
    result.first = getCanonicalUrl(basePath);
  }
  
  // Note: next and last require knowing total pages
  // Implement based on your pagination logic
  
  return result;
}
