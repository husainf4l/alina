"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Zap, Headphones, Globe, BadgeCheck, Repeat } from "lucide-react";

const FEATURES = [
  { key: "secure",    icon: ShieldCheck, color: "#3E9666" },
  { key: "fast",      icon: Zap,         color: "#c71463" },
  { key: "support",   icon: Headphones,  color: "#3E9666" },
  { key: "global",    icon: Globe,       color: "#c71463" },
  { key: "vetted",    icon: BadgeCheck,  color: "#3E9666" },
  { key: "guarantee", icon: Repeat,      color: "#c71463" },
] as const;

export default function WhyAlina() {
  const t = useTranslations("Home.whyAlina");

  return (
    <section className="w-full py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">{t("title")}</h2>
          <p className="mt-2 text-muted-foreground text-base max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ key, icon: Icon, color }) => (
            <div
              key={key}
              className="flex gap-4 items-start rounded-2xl border border-border bg-card p-5 hover:shadow-sm transition-shadow"
            >
              <div
                className="flex shrink-0 size-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${color}18` }}
              >
                <Icon className="size-6" style={{ color }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{t(`items.${key}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`items.${key}.description`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
