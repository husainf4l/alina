"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative flex h-[75svh] max-h-[75svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center [isolation:isolate]">

      {/* ── Video background (first in DOM = lowest layer) ───────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Fallback dot grid — visible when video hasn't loaded yet */}
        <div className="absolute inset-0 [background-image:radial-gradient(oklch(0.836_0_0/0.6)_1px,transparent_1px)] [background-size:28px_28px] dark:[background-image:radial-gradient(oklch(0.249_0_0/0.6)_1px,transparent_1px)]" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Theme-aware scrim: softens video in light mode, deepens in dark */}
        <div className="absolute inset-0 bg-background/55 dark:bg-background/70" />
      </div>

      {/* ── Badge ────────────────────────────────────────────────── */}
      <div
        className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-muted-foreground shadow-sm backdrop-blur-sm"
        style={{ animationDelay: "0ms" }}
      >
        <span className="size-1.5 rounded-full bg-muted-foreground/50" />
        {t("badge")}
      </div>

      {/* ── Heading — Instrument Serif italic + Jakarta Sans light ── */}
      <h1
        className="animate-fade-up mx-auto max-w-4xl text-5xl tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl"
        style={{ animationDelay: "80ms" }}
      >
        <span className="font-[family-name:var(--font-display)] italic font-normal">
          {t("title")}
        </span>{" "}
        <span className="font-light text-muted-foreground">
          {t("titleHighlight")}
        </span>
      </h1>

      {/* ── Editorial dot-rule separator ─────────────────────────── */}
      <div
        className="animate-fade-in mt-10 flex items-center justify-center gap-3"
        style={{ animationDelay: "180ms" }}
      >
        <span className="size-1 rounded-full bg-border" />
        <span className="h-px w-16 bg-border" />
        <span className="size-1 rounded-full bg-border" />
      </div>

      {/* ── Description ──────────────────────────────────────────── */}
      <p
        className="animate-fade-up mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        style={{ animationDelay: "240ms" }}
      >
        {t("description")}
      </p>

      {/* ── CTA Buttons ──────────────────────────────────────────── */}
      <div
        className="animate-fade-up mt-12 flex flex-wrap items-center justify-center gap-3"
        style={{ animationDelay: "340ms" }}
      >
        <Link
          href="/get-started"
          className={cn(
            buttonVariants({ size: "lg" }),
            "rounded-full px-8 gap-2 shadow-sm"
          )}
        >
          {t("ctaPrimary")}
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/learn"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "rounded-full px-8 bg-card/80 backdrop-blur-sm shadow-sm"
          )}
        >
          {t("ctaSecondary")}
        </Link>
      </div>

      {/* ── Bottom page-blend fade ───────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
