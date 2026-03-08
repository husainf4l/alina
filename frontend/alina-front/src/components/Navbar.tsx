"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, ChevronDown, LayoutDashboard, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn, normalizeImageUrl } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    setMenuOpen(false);
    await logout();
    router.push("/");
  };

  const initials = user?.fullName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-card/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Brand */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo/alinalogo-lighttheme.png"
            alt={t("brand")}
            width={120}
            height={40}
            priority
            className="block dark:hidden"
          />
          <Image
            src="/logo/alinalogodark.png"
            alt={t("brand")}
            width={120}
            height={40}
            priority
            className="hidden dark:block"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className={cn(
                  "block rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />

          {user ? (
            /* ── Logged-in: avatar dropdown ── */
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-muted transition-colors"
              >
                <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-[#c71463]/15">
                  {user.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={normalizeImageUrl(user.avatarUrl)!}
                      alt={user.fullName}
                      className="size-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : (
                    <span className="flex size-full items-center justify-center text-[#c71463] text-xs font-semibold select-none">
                      {initials}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-foreground max-w-28 truncate">
                  {user.displayName ?? user.fullName.split(" ")[0]}
                </span>
                <ChevronDown className={cn("size-3.5 text-muted-foreground transition-transform", menuOpen && "rotate-180")} />
              </button>

              {menuOpen && (
                <div className="absolute end-0 top-full mt-2 w-52 rounded-2xl border border-border bg-card shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground truncate">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <LayoutDashboard className="size-4 text-[#c71463]" />
                    {t("dashboard")}
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <User className="size-4 text-muted-foreground" />
                    {t("profile")}
                  </Link>
                  <div className="border-t border-border" />
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
          ) : (
            /* ── Logged-out: login / register ── */
            <>
              <Link
                href="/auth"
                className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("login")}
              </Link>
              <Link
                href="/auth?mode=register"
                className="px-4 py-1.5 text-sm font-semibold rounded-full bg-[#c71463] hover:bg-[#c71463]/90 text-white transition-colors"
              >
                {t("register")}
              </Link>
            </>
          )}
        </div>

        {/* Mobile: actions + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="size-9"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border/60 bg-card/95 px-4 pb-4 pt-2">
          <ul className="flex flex-col gap-0.5">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === href
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  )}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2 border-t border-border/60 pt-3">
            {user ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-foreground">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent/60 transition-colors"
                >
                  <LayoutDashboard className="size-4 text-[#c71463]" />
                  {t("dashboard")}
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-colors"
                >
                  <User className="size-4" />
                  {t("profile")}
                </Link>
                <button
                  onClick={async () => { setIsOpen(false); await handleLogout(); }}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="size-4" />
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-colors"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/auth?mode=register"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-3 py-2.5 text-sm font-semibold rounded-full bg-[#c71463] hover:bg-[#c71463]/90 text-white transition-colors"
                >
                  {t("register")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}



