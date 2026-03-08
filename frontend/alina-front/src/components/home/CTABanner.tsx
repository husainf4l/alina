"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Briefcase, Search } from "lucide-react";

export default function CTABanner() {
  const t = useTranslations("Home.cta");

  return (
    <section className="w-full py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] dark:from-[#0a0a0a] dark:via-[#111] dark:to-[#0a0a0a] px-8 py-14 sm:px-14 lg:py-16">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-24 -left-24 size-64 rounded-full bg-[#c71463]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 size-64 rounded-full bg-[#3E9666]/20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {t("heading")}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-white/60 max-w-xl mx-auto">
                {t("description")}
              </p>
            </div>

            {/* Two CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/services"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#c71463] hover:bg-[#c71463]/90 text-white font-semibold text-sm transition-colors"
              >
                <Search className="size-4" />
                {t("findWork")}
              </Link>
              <Link
                href="/auth?mode=register"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-colors"
              >
                <Briefcase className="size-4" />
                {t("becomeFreelancer")}
              </Link>
            </div>

            {/* Trust line */}
            <p className="text-xs text-white/40">{t("trust")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
