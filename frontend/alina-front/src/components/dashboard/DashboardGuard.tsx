"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Wraps dashboard pages: waits for the silent session-restore to finish,
 * then redirects unauthenticated users to /auth.
 */
export default function DashboardGuard({ children }: { children: React.ReactNode }) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isInitialized) return;
    if (!user) {
      // Preserve the attempted URL so we can redirect back after login
      const locale = pathname.split("/")[1] ?? "en";
      router.replace(`/${locale}/auth`);
    }
  }, [isInitialized, user, router, pathname]);

  // While restoring session, show a full-screen spinner
  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#B05088] border-t-transparent" />
      </div>
    );
  }

  // Redirect is in-flight; don't flash the dashboard
  if (!user) return null;

  return <>{children}</>;
}
