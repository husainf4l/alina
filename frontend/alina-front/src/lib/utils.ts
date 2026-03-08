import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the image URL from an API response as-is.
 * Public files are served from CloudFront (permanent, no expiry).
 * Private files are served through the backend proxy.
 * Both work without any rewriting — just use the `url` field directly.
 */
export function normalizeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return url;
}
