"use client";

import { useTranslations } from "next-intl";
import { Search, Users, ShieldCheck } from "lucide-react";

const STEPS = [
  { key: "browse", icon: Search,      step: "01", color: "#c71463" },
  { key: "work",   icon: Users,       step: "02", color: "#3E9666" },
  { key: "pay",    icon: ShieldCheck, step: "03", color: "#c71463" },
] as const;

export default function HowItWorks() {
  const t = useTranslations("Home.howItWorks");

  return (
    <section className="w-full py-16 lg:py-20 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">{t("title")}</h2>
          <p className="mt-2 text-muted-foreground text-base max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {/* Connector line — desktop only */}
          <div className="hidden sm:block absolute top-10 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px bg-border" />

          {STEPS.map(({ key, icon: Icon, step, color }) => (
            <div key={key} className="relative flex flex-col items-center text-center gap-4">
              {/* Step bubble */}
              <div
                className="relative z-10 flex size-20 items-center justify-center rounded-full border-2 bg-card shadow-sm"
                style={{ borderColor: color }}
              >
                <Icon className="size-8" style={{ color }} />
                <span
                  className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {step}
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">{t(`steps.${key}.title`)}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
                  {t(`steps.${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
