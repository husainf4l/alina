import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalises user-uploaded image URLs so they always resolve correctly:
 * - Backend sometimes returns `http://0.0.0.0:5602/...` → rewrite to real LAN IP
 * - CDN (`https://media.aqlaan.cloud/...`) may not be live yet in dev →
 *   rewrite to the local backend URL when NEXT_PUBLIC_API_URL is a local address
 */
export function normalizeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  // Fix 0.0.0.0 → real LAN IP
  let normalized = url.replace("http://0.0.0.0:", "http://192.168.1.66:");

  // Rewrite CDN URL to local backend when running in local dev
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const isLocalDev = apiUrl.startsWith("http://192.168.") || apiUrl.startsWith("http://localhost") || apiUrl.startsWith("http://127.");
  if (isLocalDev && normalized.startsWith("https://media.aqlaan.cloud/uploads/")) {
    normalized = normalized.replace("https://media.aqlaan.cloud", apiUrl);
  }

  return normalized;
}
