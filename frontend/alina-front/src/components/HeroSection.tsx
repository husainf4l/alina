"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const [searchQuery, setSearchQuery] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  const popularSearches = [
    { key: "websiteDesign", query: "website-design" },
    { key: "wordpress", query: "wordpress" },
    { key: "logoDesign", query: "logo-design" },
    { key: "aiServices", query: "ai-services" },
    { key: "videoEditing", query: "video-editing" },
    { key: "seo", query: "seo" },
    { key: "socialMedia", query: "social-media" },
    { key: "voiceOver", query: "voice-over" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative flex min-h-[600px] lg:min-h-[680px] flex-col items-start justify-center overflow-hidden px-6 lg:px-12 py-20 lg:py-24">

      {/* Video background — first in DOM so it's naturally behind all siblings */}
      <div className="pointer-events-none absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-[center_30%]"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 dark:from-black/80 dark:via-black/60 dark:to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Main Heading */}
          <h1
            className="animate-fade-up text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white mb-8 lg:mb-10 leading-tight"
            style={{ animationDelay: "0ms" }}
          >
            {t("heading")}{" "}
            <span className="italic font-light">{t("headingHighlight")}</span>
            <br />
            {t("headingEnd")}
          </h1>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="animate-fade-up mb-6"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full h-14 pl-12 pr-4 rounded-lg sm:rounded-r-none bg-white dark:bg-card text-foreground placeholder:text-muted-foreground border-0 focus:outline-none focus:ring-2 focus:ring-[#B05088] text-base"
                />
              </div>
              <button
                type="submit"
                className="h-14 px-8 bg-[#B05088] hover:bg-[#B05088]/90 text-white font-semibold rounded-lg sm:rounded-l-none transition-colors text-base whitespace-nowrap"
              >
                {t("searchButton")}
              </button>
            </div>
          </form>

          {/* Popular Searches */}
          <div
            className="animate-fade-up flex flex-wrap items-center gap-2 sm:gap-3"
            style={{ animationDelay: "200ms" }}
          >
            <span className="text-white/90 font-medium text-sm sm:text-base">{t("popularLabel")}</span>
            {popularSearches.map((search, index) => {
              const isFirst = index === 0;
              const baseClasses = "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors text-xs sm:text-sm font-medium";
              const pinkClasses = "bg-[#B05088] hover:bg-[#B05088]/90 text-white";
              const defaultClasses = "border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm";
              
              return (
                <Link
                  key={index}
                  href={`/search?q=${search.query}`}
                  className={`${baseClasses} ${isFirst ? pinkClasses : defaultClasses}`}
                >
                  {t(`popularSearches.${search.key}`)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

