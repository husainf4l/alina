/**
 * SEO Image Optimization Utilities
 * 
 * Provides utilities for optimizing images for SEO:
 * - Alt text validation
 * - Image sitemap generation
 * - Responsive image URLs
 * - Open Graph image optimization
 */

export interface ImageSEO {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}

/**
 * Validate alt text for SEO
 */
export function validateAltText(alt: string): {
  valid: boolean;
  score: number;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  let score = 100;

  // Check if alt text exists
  if (!alt || alt.trim() === '') {
    return {
      valid: false,
      score: 0,
      suggestions: ['Alt text is required for SEO and accessibility'],
    };
  }

  // Check length (optimal: 10-125 characters)
  if (alt.length < 10) {
    score -= 20;
    suggestions.push('Alt text is too short. Aim for 10-125 characters.');
  }
  
  if (alt.length > 125) {
    score -= 10;
    suggestions.push('Alt text is too long. Keep it under 125 characters.');
  }

  // Check for spam keywords
  const spamWords = ['click here', 'image', 'picture', 'photo', 'logo', 'icon'];
  const lowerAlt = alt.toLowerCase();
  spamWords.forEach((word) => {
    if (lowerAlt.includes(word)) {
      score -= 15;
      suggestions.push(`Avoid generic words like "${word}". Be more descriptive.`);
    }
  });

  // Check for keyword stuffing (repeated words)
  const words = alt.toLowerCase().split(/\s+/);
  const wordCount = new Map<string, number>();
  words.forEach((word) => {
    if (word.length > 3) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
  });
  
  Array.from(wordCount.entries()).forEach(([word, count]) => {
    if (count > 2) {
      score -= 20;
      suggestions.push(`The word "${word}" is repeated ${count} times. Avoid keyword stuffing.`);
    }
  });

  // Check if starts with "image of" or "picture of"
  if (lowerAlt.startsWith('image of ') || lowerAlt.startsWith('picture of ') || lowerAlt.startsWith('photo of ')) {
    score -= 10;
    suggestions.push('Remove redundant phrases like "image of" or "picture of".');
  }

  return {
    valid: score >= 60,
    score: Math.max(0, score),
    suggestions,
  };
}

/**
 * Generate optimized alt text from filename
 */
export function generateAltFromFilename(filename: string): string {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  // Replace hyphens, underscores with spaces
  const words = nameWithoutExt.replace(/[-_]/g, ' ');
  
  // Capitalize first letter of each word
  const capitalized = words.replace(/\b\w/g, (char) => char.toUpperCase());
  
  return capitalized;
}

/**
 * Audit page for missing alt text
 */
export function auditImageAltText(): Array<{
  src: string;
  hasAlt: boolean;
  altText: string;
  validation: ReturnType<typeof validateAltText>;
}> {
  if (typeof window === 'undefined') {
    return [];
  }

  const images = Array.from(document.querySelectorAll('img'));
  
  return images.map((img) => {
    const alt = img.alt || '';
    const validation = validateAltText(alt);
    
    return {
      src: img.src,
      hasAlt: Boolean(alt),
      altText: alt,
      validation,
    };
  });
}

/**
 * Generate Open Graph image URL with optimal dimensions
 */
export function generateOGImageUrl(
  baseUrl: string,
  options?: {
    title?: string;
    subtitle?: string;
    theme?: 'light' | 'dark';
  }
): string {
  // If using a dynamic OG image service (e.g., Vercel OG, Cloudinary)
  const params = new URLSearchParams();
  
  if (options?.title) {
    params.set('title', options.title);
  }
  
  if (options?.subtitle) {
    params.set('subtitle', options.subtitle);
  }
  
  if (options?.theme) {
    params.set('theme', options.theme);
  }
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}/api/og?${queryString}` : `${baseUrl}/og-image.png`;
}

/**
 * Get responsive image srcset for SEO
 */
export function getResponsiveSrcSet(
  baseUrl: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536]
): string {
  return widths
    .map((width) => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * Validate image dimensions for social media
 */
export function validateSocialImageDimensions(
  width: number,
  height: number,
  platform: 'og' | 'twitter'
): {
  valid: boolean;
  aspectRatio: number;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  const aspectRatio = width / height;

  if (platform === 'og') {
    // Open Graph (Facebook, LinkedIn): 1200x630 (1.91:1)
    const idealRatio = 1.91;
    const minWidth = 1200;
    const minHeight = 630;
    
    if (width < minWidth || height < minHeight) {
      suggestions.push(`Minimum dimensions: ${minWidth}x${minHeight}px`);
    }
    
    if (Math.abs(aspectRatio - idealRatio) > 0.1) {
      suggestions.push(`Ideal aspect ratio: 1.91:1 (current: ${aspectRatio.toFixed(2)}:1)`);
    }
  } else if (platform === 'twitter') {
    // Twitter: 1200x628 for summary_large_image
    const idealRatio = 1.91;
    const minWidth = 1200;
    const minHeight = 628;
    
    if (width < minWidth || height < minHeight) {
      suggestions.push(`Minimum dimensions: ${minWidth}x${minHeight}px`);
    }
    
    if (Math.abs(aspectRatio - idealRatio) > 0.1) {
      suggestions.push(`Ideal aspect ratio: 1.91:1 (current: ${aspectRatio.toFixed(2)}:1)`);
    }
  }

  return {
    valid: suggestions.length === 0,
    aspectRatio,
    suggestions,
  };
}

/**
 * Get image metadata for sitemap
 */
export function getImageMetadata(url: string): Promise<{
  width: number;
  height: number;
  format: string;
}> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Not available in server environment'));
      return;
    }

    const img = new Image();
    
    img.onload = () => {
      const format = url.split('.').pop()?.toLowerCase() || 'unknown';
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        format,
      });
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}
