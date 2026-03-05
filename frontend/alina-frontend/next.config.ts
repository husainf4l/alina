import type { NextConfig } from "next";

// Bundle Analyzer (run with ANALYZE=true npm run build)
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* Performance Optimizations */
  compress: true,
  poweredByHeader: false,
  
  /* Compiler Options */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  /* Security Headers */
  async headers() {
    // Determine if running in development
    const isDev = process.env.NODE_ENV === 'development';
    
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: isDev
              ? [
                  // Development CSP (more permissive)
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://www.googletagmanager.com",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                  "img-src 'self' data: https: blob:",
                  "font-src 'self' data: https://fonts.gstatic.com",
                  "connect-src 'self' http://localhost:* ws://localhost:* https://accounts.google.com https://oauth2.googleapis.com",
                  "frame-src 'self' https://accounts.google.com",
                  "object-src 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                  "frame-ancestors 'none'",
                ].join('; ')
              : [
                  // Production CSP (strict)
                  "default-src 'self'",
                  "script-src 'self' 'nonce-RANDOM' https://accounts.google.com https://www.googletagmanager.com",
                  "style-src 'self' 'nonce-RANDOM' https://fonts.googleapis.com",
                  "img-src 'self' data: https://*.cloudinary.com https://*.amazonaws.com https:",
                  "font-src 'self' data: https://fonts.gstatic.com",
                  "connect-src 'self' https://api.yourdomain.com wss://api.yourdomain.com https://accounts.google.com https://oauth2.googleapis.com",
                  "frame-src 'self' https://accounts.google.com https://js.stripe.com",
                  "object-src 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                  "frame-ancestors 'none'",
                  "upgrade-insecure-requests",
                  "block-all-mixed-content",
                ].join('; '),
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // XSS Protection (legacy browsers)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // DNS Prefetch Control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'interest-cohort=()',
              'payment=(self)',
              'usb=()',
            ].join(', '),
          },
          // Strict Transport Security (HTTPS only in production)
          ...(isDev
            ? []
            : [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains; preload',
                },
              ]),
          // Cross-Origin Policies
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
  
  /* Image Configuration */
  images: {
    domains: ['via.placeholder.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
  
  /* Environment Variables */
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://alina.com',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5602',
  },

  /* Experimental Features for Performance */
  experimental: {
    optimizePackageImports: ['recharts', '@stripe/stripe-js', '@tanstack/react-query'],
  },
};

export default withBundleAnalyzer(nextConfig);
