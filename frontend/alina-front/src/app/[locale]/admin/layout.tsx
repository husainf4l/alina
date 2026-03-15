"use client";

import { useAuth } from "@/context/AuthContext";
import { Link, usePathname } from "@/i18n/navigation";
import { LayoutDashboard, Wallet, AlertTriangle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/withdrawals", label: "Withdrawals", icon: Wallet, exact: false },
  { href: "/admin/disputes", label: "Disputes", icon: AlertTriangle, exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  if (!user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
        <div className="text-center max-w-md">
          <ShieldAlert className="w-16 h-16 mx-auto text-red-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            You do not have permission to access the admin panel.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c71463] text-white text-sm font-medium hover:bg-[#a0105a] transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-e border-border bg-card flex flex-col">
        <div className="flex h-16 items-center border-b border-border px-5 gap-2">
          <Image
            src="/logo/alina-icon.png"
            alt="Alina Admin"
            width={24}
            height={24}
            className="size-6 object-contain"
          />
          <span className="text-sm font-bold text-gray-900 dark:text-white">Admin Panel</span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-[#c71463]/10 text-[#c71463]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
