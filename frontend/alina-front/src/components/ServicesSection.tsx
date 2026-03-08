"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { 
  Code, Palette, PenTool, Smartphone, Video, Music,
  TrendingUp, Briefcase, Bot, Camera, Search, ArrowRight,
  CheckCircle2, Shield, Clock, Star, Users, Zap
} from "lucide-react";
import { useState } from "react";

export default function ServicesSection() {
  const t = useTranslations("Services");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { key: "webDev", icon: Code, color: "#3E9666" },
    { key: "graphicDesign", icon: Palette, color: "#c71463" },
    { key: "writing", icon: PenTool, color: "#3E9666" },
    { key: "mobileApps", icon: Smartphone, color: "#c71463" },
    { key: "videoAnimation", icon: Video, color: "#3E9666" },
    { key: "musicAudio", icon: Music, color: "#c71463" },
    { key: "digitalMarketing", icon: TrendingUp, color: "#3E9666" },
    { key: "businessConsulting", icon: Briefcase, color: "#c71463" },
    { key: "aiServices", icon: Bot, color: "#3E9666" },
    { key: "photography", icon: Camera, color: "#c71463" },
  ];

  const howItWorks = [
    { key: "browse", icon: Search },
    { key: "work", icon: Users },
    { key: "pay", icon: Shield },
  ];

  const guarantees = [
    { key: "quality", icon: CheckCircle2 },
    { key: "secure", icon: Shield },
    { key: "support", icon: Zap },
    { key: "fast", icon: Clock },
  ];

  const budgetRanges = [
    { key: "entry", min: "$5", max: "$50" },
    { key: "mid", min: "$50", max: "$500" },
    { key: "premium", min: "$500", max: "$5000+" },
  ];

  return (
    <main className="w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c71463]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3E9666]/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          </div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12 py-20 text-center">
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                {locale === "en" ? (
                  <>Find the <span className="text-[#c71463]">Perfect Service</span></>
                ) : (
                  <>اعثر على <span className="text-[#c71463]">الخدمة المثالية</span></>
                )}
              </span>
            </h1>
            
            <p className="mx-auto max-w-3xl text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
              {t("hero.description")}
            </p>

            {/* Search Bar */}
            <div className="mx-auto max-w-2xl pt-4">
              <div className="flex items-center gap-2 bg-card rounded-2xl border border-border p-2 shadow-lg">
                <Search className="w-6 h-6 text-muted-foreground ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("hero.searchPlaceholder")}
                  className="flex-1 bg-transparent border-0 outline-none px-2 py-3 text-foreground placeholder:text-muted-foreground"
                />
                <button className="px-6 py-3 bg-[#c71463] hover:bg-[#c71463]/90 text-white font-semibold rounded-xl transition-colors">
                  {t("hero.searchButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section className="py-20 lg:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16 lg:mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              {t("categories.title")}
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              {t("categories.subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <a
                  key={category.key}
                  href={`/services/${category.key}`}
                  className="group relative p-8 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/60 hover:border-[#c71463]/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="space-y-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: category.color }} />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-[#c71463] transition-colors">
                        {t(`categories.items.${category.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t(`categories.items.${category.key}.description`)}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {t(`categories.items.${category.key}.count`)}
                      </p>
                    </div>

                    <ArrowRight className="w-5 h-5 text-[#c71463] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              {t("howItWorks.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div
                  key={step.key}
                  className="relative p-8 text-center"
                >
                  {/* Step number */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#c71463] text-white font-bold flex items-center justify-center text-lg shadow-lg">
                    {index + 1}
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#3E9666]/10 flex items-center justify-center mx-auto">
                      <Icon className="w-8 h-8 text-[#3E9666]" />
                    </div>
                    
                    <h3 className="text-2xl font-semibold">
                      {t(`howItWorks.steps.${step.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`howItWorks.steps.${step.key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Browse by Budget */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              {t("budget.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("budget.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {budgetRanges.map((range, index) => (
              <div
                key={range.key}
                className="group p-10 rounded-3xl bg-gradient-to-br from-card to-muted/20 border-2 border-border hover:border-[#c71463]/40 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-[#c71463]">
                    {t(`budget.ranges.${range.key}.title`)}
                  </h3>
                  <div className="text-4xl font-bold">
                    {range.min} - {range.max}
                  </div>
                  <p className="text-muted-foreground">
                    {t(`budget.ranges.${range.key}.description`)}
                  </p>
                  <button className="w-full px-6 py-3 bg-[#3E9666] hover:bg-[#3E9666]/90 text-white font-semibold rounded-xl transition-colors">
                    {t("budget.browseButton")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              {t("guarantees.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("guarantees.subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              
              return (
                <div 
                  key={guarantee.key}
                  className="p-8 rounded-2xl bg-card backdrop-blur-xl border border-border/60 hover:border-[#3E9666]/40 transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#3E9666]/10 flex items-center justify-center mx-auto">
                      <Icon className="w-7 h-7 text-[#3E9666]" />
                    </div>
                    
                    <h3 className="text-lg font-semibold">
                      {t(`guarantees.items.${guarantee.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`guarantees.items.${guarantee.key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-10 rounded-3xl bg-gradient-to-br from-[#3E9666]/10 to-[#3E9666]/5 border border-[#3E9666]/20 text-center">
              <div className="text-5xl font-bold text-[#3E9666] mb-2">5M+</div>
              <div className="text-muted-foreground font-medium">{t("metrics.servicesDelivered")}</div>
            </div>
            <div className="p-10 rounded-3xl bg-gradient-to-br from-[#c71463]/10 to-[#c71463]/5 border border-[#c71463]/20 text-center">
              <div className="flex items-center justify-center gap-2 text-5xl font-bold text-[#c71463] mb-2">
                4.9 <Star className="w-10 h-10 fill-[#c71463]" />
              </div>
              <div className="text-muted-foreground font-medium">{t("metrics.averageRating")}</div>
            </div>
            <div className="p-10 rounded-3xl bg-gradient-to-br from-[#3E9666]/10 to-[#3E9666]/5 border border-[#3E9666]/20 text-center">
              <div className="text-5xl font-bold text-[#3E9666] mb-2">&lt; 2h</div>
              <div className="text-muted-foreground font-medium">{t("metrics.responseTime")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#c71463] via-[#c71463]/90 to-[#3E9666] p-12 lg:p-16 text-center text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                  {t("cta.title")}
                </h2>
                <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto font-light">
                  {t("cta.description")}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="/auth?mode=register"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#c71463] font-semibold rounded-full hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {t("cta.button1")}
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  {t("cta.button2")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
