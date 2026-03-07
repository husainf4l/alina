"use client";

import { useTranslations } from "next-intl";
import { Users, Target, Award, Globe, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const t = useTranslations("About");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { key: "freelancers", icon: Users, color: "#B05088" },
    { key: "projects", icon: Target, color: "#3E9666" },
    { key: "satisfaction", icon: Award, color: "#B05088" },
    { key: "countries", icon: Globe, color: "#3E9666" }
  ];

  const values = [
    { key: "quality", icon: Award },
    { key: "trust", icon: Users },
    { key: "innovation", icon: Sparkles },
    { key: "global", icon: Globe }
  ];

  return (
    <main className="w-full bg-background">
      {/* Hero Section - Apple Style */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B05088]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3E9666]/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          </div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12 py-20 text-center">
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
            </h1>
            
            <p className="mx-auto max-w-3xl text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - Glassmorphism Cards */}
      <section ref={sectionRef} className="py-20 lg:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.key}
                  className={`group relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 p-8 hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 space-y-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <Icon className="size-7" style={{ color: stat.color }} />
                    </div>
                    
                    <div className="text-4xl lg:text-5xl font-bold tracking-tight">
                      {t(`stats.${stat.key}.number`)}
                    </div>
                    
                    <div className="text-sm text-muted-foreground font-medium">
                      {t(`stats.${stat.key}.label`)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section - Split Layout */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                  {t("mission.title")}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[#B05088] to-[#3E9666] rounded-full" />
              </div>
              
              <div className="space-y-6 text-base lg:text-lg text-muted-foreground leading-relaxed font-light">
                <p>{t("mission.paragraph1")}</p>
                <p>{t("mission.paragraph2")}</p>
                <p>{t("mission.paragraph3")}</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#B05088]/10 via-background to-[#3E9666]/10 p-12 flex items-center justify-center backdrop-blur-xl border border-border/50">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#B05088]/20 rounded-full blur-3xl" />
                    <Target className="relative size-32 mx-auto text-[#B05088]" />
                  </div>
                  <p className="text-2xl lg:text-3xl font-semibold leading-tight">
                    {t("mission.tagline")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Modern Cards */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16 lg:mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              {t("values.title")}
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              {t("values.description")}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={value.key}
                  className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:border-border/0 p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${isEven ? '#B05088' : '#3E9666'}05, ${isEven ? '#B05088' : '#3E9666'}15)`
                    }}
                  />
                  
                  <div className="relative z-10 space-y-6">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundColor: isEven ? "#B0508815" : "#3E966615" }}
                    >
                      <Icon 
                        className="size-8 transition-transform duration-500 group-hover:scale-110"
                        style={{ color: isEven ? "#B05088" : "#3E9666" }}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl lg:text-2xl font-semibold">
                        {t(`values.items.${value.key}.title`)}
                      </h3>
                      <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                        {t(`values.items.${value.key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Apple-style Elevated Card */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#B05088] via-[#B05088]/90 to-[#3E9666] p-12 lg:p-16 text-center text-white shadow-2xl">
            {/* Decorative elements */}
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
                  href="/signup"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#B05088] font-semibold rounded-full hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {t("cta.button1")}
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/browse"
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

