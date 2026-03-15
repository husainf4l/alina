"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  ShoppingBag,
  Briefcase,
  MessageSquare,
  Bell,
  Wallet,
  Settings,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Target,
  Star,
  Heart,
  Tag,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_ITEMS = [
  { key: "overview", href: "/dashboard", icon: LayoutDashboard },
  { key: "orders", href: "/dashboard/orders", icon: ShoppingBag },
  { key: "gigs", href: "/dashboard/gigs", icon: Briefcase },
  { key: "messages", href: "/dashboard/messages", icon: MessageSquare },
  { key: "notifications", href: "/dashboard/notifications", icon: Bell },
  { key: "wallet", href: "/dashboard/wallet", icon: Wallet },
  { key: "favorites", href: "/dashboard/favorites", icon: Heart },
  { key: "offers", href: "/dashboard/offers", icon: Tag },
  { key: "analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { key: "goals", href: "/dashboard/goals", icon: Target },
  { key: "reviews", href: "/dashboard/reviews", icon: Star },
  { key: "profile", href: "/dashboard/profile", icon: UserCircle },
  { key: "settings", href: "/dashboard/settings", icon: Settings },
  { key: "support", href: "/dashboard/support", icon: LifeBuoy },
] as const;

export default function DashboardSidebar() {
  const t = useTranslations("DashboardNav");
  const { user } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-e border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn("flex h-16 shrink-0 items-center border-b border-border px-4", collapsed && "justify-center")}>
        {collapsed ? (
          <Image
            src="/logo/alina-icon.png"
            alt="Alina"
            width={28}
            height={28}
            className="size-7 object-contain"
          />
        ) : (
          <>
            <Image
              src="/logo/alinalogo-lighttheme.png"
              alt="Alina"
              width={90}
              height={30}
              className="block dark:hidden"
            />
            <Image
              src="/logo/alinalogodark.png"
              alt="Alina"
              width={90}
              height={30}
              className="hidden dark:block"
            />
          </>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {NAV_ITEMS.map(({ key, href, icon: Icon }) => {
          const isActive =
            href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
          return (
            <Link
              key={key}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#B05088]/10 text-[#B05088]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{t(key)}</span>}
            </Link>
          );
        })}

        {/* Admin link — only for admins */}
        {user?.isAdmin && (
          <>
            <div className="my-1 border-t border-border" />
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                pathname.startsWith("/admin")
                  ? "bg-[#c71463]/10 text-[#c71463]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <ShieldCheck className="size-4 shrink-0" />
              {!collapsed && <span>{t("admin")}</span>}
            </Link>
          </>
        )}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className={cn(
          "absolute -end-3 top-[72px] flex size-6 items-center justify-center",
          "rounded-full border border-border bg-card text-muted-foreground shadow-sm",
          "hover:text-foreground transition-colors z-10"
        )}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="size-3" /> : <ChevronLeft className="size-3" />}
      </button>
    </aside>
  );
}
