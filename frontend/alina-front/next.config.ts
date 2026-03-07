import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.1.66:5602";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Local dev — backend serves images directly
        protocol: "http",
        hostname: "192.168.1.66",
        port: "5602",
        pathname: "/uploads/**",
      },
      {
        // Production CDN (CloudFront in front of S3)
        protocol: "https",
        hostname: "media.aqlaan.cloud",
        pathname: "/uploads/**",
      },
      {
        // S3 bucket direct access (used during dev/staging)
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
        pathname: "/uploads/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Proxy all /api/* requests to the backend
        // This makes the refresh-token HttpOnly cookie same-origin (localhost:3000)
        // so the browser sends it correctly on every refresh call
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
