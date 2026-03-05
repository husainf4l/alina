/**
 * Image Optimization Utilities
 * Helpers for optimizing images in the application
 */

/**
 * Generate Next.js Image props for common use cases
 */
export const ImageSizes = {
  // Avatar sizes
  avatar: {
    small: { width: 40, height: 40 },
    medium: { width: 80, height: 80 },
    large: { width: 120, height: 120 },
  },
  
  // Gig/Product images
  gig: {
    thumbnail: { width: 300, height: 200 },
    card: { width: 400, height: 300 },
    hero: { width: 1200, height: 600 },
  },
  
  // Banner images
  banner: {
    mobile: { width: 640, height: 320 },
    tablet: { width: 1024, height: 512 },
    desktop: { width: 1920, height: 600 },
  },
} as const;

/**
 * Generate responsive sizes attribute for Next/Image
 */
export function generateSizes(breakpoints: Record<string, string>): string {
  return Object.entries(breakpoints)
    .map(([bp, size]) => `${bp} ${size}`)
    .join(', ');
}

/**
 * Common responsive sizes for different image types
 */
export const ResponsiveSizes = {
  avatar: '(max-width: 640px) 40px, 80px',
  gigCard: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  hero: '100vw',
  banner: '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px',
} as const;

/**
 * Image loader for CDN optimization
 */
export function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // If using Cloudinary or similar CDN
  if (src.includes('cloudinary.com')) {
    const baseUrl = src.split('/upload/')[0];
    const imagePath = src.split('/upload/')[1];
    return `${baseUrl}/upload/w_${width},q_${quality || 75},f_auto/${imagePath}`;
  }

  // If using AWS S3
  if (src.includes('amazonaws.com')) {
    // You can add AWS CloudFront transforms here
    return src;
  }

  // Default: return original
  return src;
}

/**
 * Blur data URL generator for placeholder images
 */
export function getBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = typeof document !== 'undefined' 
    ? document.createElement('canvas') 
    : null;
    
  if (!canvas) {
    // Server-side: return a simple gray SVG
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="#f3f4f6"/></svg>`
    )}`;
  }

  // Client-side: generate a gradient
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  return canvas.toDataURL();
}

/**
 * Check if image should use priority loading
 */
export function shouldPrioritize(position: 'hero' | 'above-fold' | 'below-fold'): boolean {
  return position === 'hero' || position === 'above-fold';
}

/**
 * Optimize external image URL
 */
export function optimizeImageUrl(url: string, options?: {
  width?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
}): string {
  const { width, quality = 75, format = 'auto' } = options || {};

  // For placeholder images
  if (url.includes('placeholder.com')) {
    return url;
  }

  // For already optimized URLs
  if (url.includes('/_next/image')) {
    return url;
  }

  // For external URLs, use Next.js image optimization
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  params.set('q', quality.toString());
  
  return `/api/image?url=${encodeURIComponent(url)}&${params.toString()}`;
}
