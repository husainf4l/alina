"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Code, Palette, PenTool, Smartphone, Video, Music,
  TrendingUp, Briefcase, Bot, Camera, ArrowRight,
} from "lucide-react";

const CATEGORIES = [
  { key: "webDev",             icon: Code,        color: "#3E9666", bg: "bg-emerald-50 dark:bg-emerald-950/30",  border: "border-emerald-200 dark:border-emerald-800" },
  { key: "graphicDesign",      icon: Palette,      color: "#c71463", bg: "bg-pink-50 dark:bg-pink-950/30",       border: "border-pink-200 dark:border-pink-800" },
  { key: "writing",            icon: PenTool,      color: "#3E9666", bg: "bg-emerald-50 dark:bg-emerald-950/30",  border: "border-emerald-200 dark:border-emerald-800" },
  { key: "mobileApps",         icon: Smartphone,   color: "#c71463", bg: "bg-pink-50 dark:bg-pink-950/30",       border: "border-pink-200 dark:border-pink-800" },
  { key: "videoAnimation",     icon: Video,        color: "#3E9666", bg: "bg-emerald-50 dark:bg-emerald-950/30",  border: "border-emerald-200 dark:border-emerald-800" },
  { key: "musicAudio",         icon: Music,        color: "#c71463", bg: "bg-pink-50 dark:bg-pink-950/30",       border: "border-pink-200 dark:border-pink-800" },
  { key: "digitalMarketing",   icon: TrendingUp,   color: "#3E9666", bg: "bg-emerald-50 dark:bg-emerald-950/30",  border: "border-emerald-200 dark:border-emerald-800" },
  { key: "businessConsulting", icon: Briefcase,    color: "#c71463", bg: "bg-pink-50 dark:bg-pink-950/30",       border: "border-pink-200 dark:border-pink-800" },
  { key: "aiServices",         icon: Bot,          color: "#3E9666", bg: "bg-emerald-50 dark:bg-emerald-950/30",  border: "border-emerald-200 dark:border-emerald-800" },
  { key: "photography",        icon: Camera,       color: "#c71463", bg: "bg-pink-50 dark:bg-pink-950/30",       border: "border-pink-200 dark:border-pink-800" },
] as const;

export default function FeaturedCategories() {
  const t = useTranslations("Home.categories");

  return (
    <section className="w-full py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {t("title")}
            </h2>
            <p className="mt-2 text-muted-foreground text-base">{t("subtitle")}</p>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-1.5 text-sm font-medium text-[#c71463] hover:gap-2.5 transition-all whitespace-nowrap"
          >
            {t("viewAll")} <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIES.map(({ key, icon: Icon, color, bg, border }) => (
            <Link
              key={key}
              href={`/services?category=${key}`}
              className={`group flex flex-col items-center gap-3 rounded-2xl border ${bg} ${border} p-4 sm:p-5 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
            >
              <div
                className="flex size-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${color}18` }}
              >
                <Icon className="size-6" style={{ color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-snug">{t(`items.${key}.title`)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t(`items.${key}.count`)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
