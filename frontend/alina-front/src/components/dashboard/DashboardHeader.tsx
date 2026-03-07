"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { Bell, Search, ChevronDown, LogOut, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn, normalizeImageUrl } from "@/lib/utils";
import { useRouter } from "@/i18n/navigation";

interface DashboardHeaderProps {
  aiOpen: boolean;
  onAiToggle: () => void;
}

export default function DashboardHeader({ aiOpen, onAiToggle }: DashboardHeaderProps) {
  const t = useTranslations("DashboardHeader");
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Initials fallback avatar
  const initials = user?.fullName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase() ?? "?";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      {/* Search */}
      <div className="relative hidden sm:block">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder={t("searchPlaceholder")}
          className={cn(
            "w-64 rounded-xl border border-border bg-background ps-9 pe-4 py-2 text-sm",
            "placeholder:text-muted-foreground/60 outline-none",
            "focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10 transition-colors"
          )}
        />
      </div>

      {/* Right controls */}
      <div className="ms-auto flex items-center gap-2">
        <ThemeToggle />
        <LocaleSwitcher />

        {/* Notifications */}
        <button className="relative flex size-9 items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
          <Bell className="size-4" />
          <span className="absolute end-1.5 top-1.5 size-2 rounded-full bg-[#B05088]" />
        </button>

        {/* AI Chat toggle */}
        <button
          onClick={onAiToggle}
          title="AI Assistant"
          className={cn(
            "flex size-9 items-center justify-center rounded-xl transition-colors",
            aiOpen
              ? "bg-[#B05088]/15 text-[#B05088]"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <Sparkles className="size-4" />
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-muted transition-colors"
          >
            {/* Avatar circle */}
            <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-[#B05088]/15">
              {user?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={normalizeImageUrl(user.avatarUrl)!}
                  alt={user.fullName}
                  className="size-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              ) : (
                <span className="flex size-full items-center justify-center text-[#B05088] text-xs font-semibold select-none">
                  {initials}
                </span>
              )}
            </div>
            <ChevronDown className={cn("size-3.5 text-muted-foreground transition-transform", menuOpen && "rotate-180")} />
          </button>

          {menuOpen && (
            <div className="absolute end-0 top-full mt-2 w-48 rounded-2xl border border-border bg-card shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium text-foreground truncate">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="size-4" />
                {t("logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
