import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/query-provider";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import { ToastProvider } from "@/contexts/ToastContext";
import { ToastContainer } from "@/components/ui/Toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ApiHealthMonitor } from "@/components/ui/ApiHealthMonitor";
import { OrderStatusToast } from "@/components/realtime/OrderStatusToast";
import { PerformanceDashboard } from "@/components/performance/PerformanceDashboard";
import { SecurityInitializer } from "@/components/security/SecurityInitializer";
import { SkipLink } from "@/components/accessibility/SkipLink";
import { GlobalA11yAnnouncer } from "@/components/accessibility/A11yAnnouncer";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";

// Primary font for Latin scripts - Inter with variable weight
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Primary font for Arabic scripts - Cairo with variable weight
const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Alina - Your Marketplace",
    template: "%s | Alina",
  },
  description: "Connect with talented freelancers and grow your business. Find professional services for design, development, marketing, and more.",
  keywords: ["marketplace", "freelancers", "services", "hire professionals", "gigs"],
  authors: [{ name: "Alina" }],
  creator: "Alina",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Alina",
  },
  twitter: {
    card: "summary_large_image",
    site: "@alina",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="js-loading">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            html.js-loading *::before,html.js-loading *::after{animation:none!important;transition:none!important}
            *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            html,body{margin:0;padding:0;overflow-x:hidden;visibility:visible!important;opacity:1!important}
            html.js-loading a,html.js-loading button,html.js-loading input,html.js-loading [role="button"]{pointer-events:auto!important;cursor:pointer!important}
          `
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Remove js-loading after React hydration completes
            window.addEventListener('load',function(){
              setTimeout(function(){document.documentElement.classList.remove('js-loading')},200);
            });
          `
        }} />
      </head>
      <body
        className={`${inter.variable} ${cairo.variable} antialiased`}
      >
        <OrganizationSchema />
        <WebsiteSchema />
        <SkipLink />
        <ErrorBoundary>
          <QueryProvider>
            <AuthProvider>
              <ToastProvider>
                <main id="main-content" tabIndex={-1}>
                  {children}
                </main>
                <ToastContainer />
                <OrderStatusToast />
                <PerformanceDashboard />
                <SecurityInitializer />
                <GlobalA11yAnnouncer />
              </ToastProvider>
            </AuthProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
