import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5602";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // CDN — public files (avatars, covers, gig images)
        protocol: "https",
        hostname: "media.aqlaan.com",
        pathname: "/public/**",
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
