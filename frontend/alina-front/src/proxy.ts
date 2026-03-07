import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - /api/* routes (proxied to backend via next.config.ts rewrites)
  // - Files with extensions (e.g. favicon.ico, robots.txt)
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
