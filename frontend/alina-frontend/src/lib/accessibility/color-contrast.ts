/**
 * Color Contrast Utilities
 * WCAG 2.1 color contrast checker for accessibility
 */

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance
 * Based on WCAG 2.1 formula
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WCAG 2.1 compliance levels
 */
export type WCAGLevel = 'AA' | 'AAA';
export type TextSize = 'normal' | 'large';

export interface ContrastRequirements {
  AA: {
    normal: number;
    large: number;
  };
  AAA: {
    normal: number;
    large: number;
  };
}

export const WCAG_CONTRAST_REQUIREMENTS: ContrastRequirements = {
  AA: {
    normal: 4.5,
    large: 3,
  },
  AAA: {
    normal: 7,
    large: 4.5,
  },
};

/**
 * Check if contrast ratio meets WCAG requirements
 */
export function meetsWCAG(
  foreground: string,
  background: string,
  level: WCAGLevel = 'AA',
  textSize: TextSize = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const required = WCAG_CONTRAST_REQUIREMENTS[level][textSize];
  return ratio >= required;
}

/**
 * Get contrast rating
 */
export function getContrastRating(
  foreground: string,
  background: string,
  textSize: TextSize = 'normal'
): {
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  rating: 'fail' | 'AA' | 'AAA';
} {
  const ratio = getContrastRatio(foreground, background);
  const meetsAA = ratio >= WCAG_CONTRAST_REQUIREMENTS.AA[textSize];
  const meetsAAA = ratio >= WCAG_CONTRAST_REQUIREMENTS.AAA[textSize];

  let rating: 'fail' | 'AA' | 'AAA' = 'fail';
  if (meetsAAA) rating = 'AAA';
  else if (meetsAA) rating = 'AA';

  return {
    ratio: Math.round(ratio * 100) / 100,
    meetsAA,
    meetsAAA,
    rating,
  };
}

/**
 * Suggest accessible color
 * Adjusts lightness to meet minimum contrast ratio
 */
export function suggestAccessibleColor(
  foreground: string,
  background: string,
  targetRatio: number = 4.5
): string {
  const bgRgb = hexToRgb(background);
  if (!bgRgb) return foreground;

  const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  const targetLum =
    bgLum < 0.5
      ? (bgLum + 0.05) * targetRatio - 0.05
      : (bgLum + 0.05) / targetRatio - 0.05;

  // Simple adjustment - increase/decrease lightness
  const fgRgb = hexToRgb(foreground);
  if (!fgRgb) return foreground;

  let factor = targetLum > bgLum ? 1.2 : 0.8;
  let adjusted = {
    r: Math.min(255, Math.max(0, fgRgb.r * factor)),
    g: Math.min(255, Math.max(0, fgRgb.g * factor)),
    b: Math.min(255, Math.max(0, fgRgb.b * factor)),
  };

  return rgbToHex(adjusted.r, adjusted.g, adjusted.b);
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((c) => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * Check if color is light or dark
 */
export function isLightColor(color: string): boolean {
  const rgb = hexToRgb(color);
  if (!rgb) return false;

  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  return luminance > 0.5;
}

/**
 * Get readable text color for background
 */
export function getReadableTextColor(background: string): string {
  return isLightColor(background) ? '#000000' : '#FFFFFF';
}

/**
 * Audit page colors for contrast issues
 */
export function auditPageContrasts(): Array<{
  element: HTMLElement;
  foreground: string;
  background: string;
  ratio: number;
  passes: boolean;
}> {
  if (typeof window === 'undefined') return [];

  const results: Array<{
    element: HTMLElement;
    foreground: string;
    background: string;
    ratio: number;
    passes: boolean;
  }> = [];

  // Get all text elements
  const textElements = document.querySelectorAll<HTMLElement>(
    'p, h1, h2, h3, h4, h5, h6, span, a, button, label, li'
  );

  textElements.forEach((element) => {
    const style = window.getComputedStyle(element);
    const color = style.color;
    const backgroundColor = style.backgroundColor;

    // Skip if transparent background
    if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
      return;
    }

    // Convert to hex (simplified - works for rgb() format)
    const fgHex = rgbStringToHex(color);
    const bgHex = rgbStringToHex(backgroundColor);

    if (fgHex && bgHex) {
      const ratio = getContrastRatio(fgHex, bgHex);
      const fontSize = parseFloat(style.fontSize);
      const isBold = style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 700;
      const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);

      const requiredRatio = isLargeText ? 3 : 4.5;
      const passes = ratio >= requiredRatio;

      if (!passes) {
        results.push({
          element,
          foreground: fgHex,
          background: bgHex,
          ratio: Math.round(ratio * 100) / 100,
          passes,
        });
      }
    }
  });

  return results;
}

/**
 * Convert CSS rgb() string to hex
 */
function rgbStringToHex(rgb: string): string | null {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return null;

  return rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
}
