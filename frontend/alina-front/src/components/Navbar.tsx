"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-card/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Brand */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <Image
            src={mounted && resolvedTheme === "dark" ? "/logo/alinalogodark.png" : "/logo/alinalogo-lighttheme.png"}
            alt={t("brand")}
            width={120}
            height={40}
            priority
            style={{ height: "40px", width: "auto" }}
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
          <Link
            href="/auth"
            className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("login")}
          </Link>
          <Link
            href="/auth?mode=register"
            className="px-4 py-1.5 text-sm font-semibold rounded-full bg-[#B05088] hover:bg-[#B05088]/90 text-white transition-colors"
          >
            {t("register")}
          </Link>
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
              className="block text-center px-3 py-2.5 text-sm font-semibold rounded-full bg-[#B05088] hover:bg-[#B05088]/90 text-white transition-colors"
            >
              {t("register")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
