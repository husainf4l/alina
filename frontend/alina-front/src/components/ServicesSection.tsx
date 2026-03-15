"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import {
  Code, Palette, PenTool, Smartphone, Video, Music,
  TrendingUp, Briefcase, Bot, Camera, Search, ArrowRight,
  CheckCircle2, Shield, Clock, Star, Users, Zap,
  ChevronLeft, ChevronRight, Package, SlidersHorizontal, X,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import apiClient from "@/lib/apiClient";
import { normalizeImageUrl } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

interface GigListItem {
  id: string;
  title: string;
  sellerName: string;
  sellerLevel?: string;
  averageRating: number;
  reviewCount: number;
  packages: { price: { amount: number; currency: string } }[];
  startingPrice?: number;
  mainImage: string | null;
  galleryImages: string[];
  categoryName: string;
  deliveryTimeInDays: number;
}

interface PagedResult {
  items: GigListItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

interface CategoryItem {
  id: string;
  name: string;
}

const PAGE_SIZE = 12;

function GigCard({ gig }: { gig: GigListItem }) {
  const thumb =
    (gig.mainImage && normalizeImageUrl(gig.mainImage)) ||
    (gig.galleryImages?.[0] && normalizeImageUrl(gig.galleryImages[0])) ||
    null;

  const startingPrice =
    gig.startingPrice ??
    (gig.packages?.length
      ? Math.min(...gig.packages.map((p) => p.price?.amount ?? 0))
      : null);

  return (
    <Link
      href={`/services/${gig.id}`}
      className="group flex flex-col bg-card border border-border/60 rounded-2xl overflow-hidden hover:border-[#c71463]/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {thumb ? (
          <img src={thumb} alt={gig.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-10 h-10 text-muted-foreground/30" />
          </div>
        )}
        {gig.categoryName && (
          <span className="absolute top-2 start-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
            {gig.categoryName}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c71463] to-[#B05088] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
            {gig.sellerName?.[0]?.toUpperCase() ?? "S"}
          </div>
          <span className="text-xs text-muted-foreground truncate">{gig.sellerName}</span>
          {gig.sellerLevel && (
            <span className="ms-auto text-[10px] bg-[#B05088]/10 text-[#B05088] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
              {gig.sellerLevel}
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-[#c71463] transition-colors">
          {gig.title}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
          {gig.averageRating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-medium text-foreground">{gig.averageRating.toFixed(1)}</span>
              <span>({gig.reviewCount})</span>
            </div>
          )}
          {gig.deliveryTimeInDays > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{gig.deliveryTimeInDays}d</span>
            </div>
          )}
        </div>
        <div className="pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">Starting at </span>
          <span className="text-sm font-bold text-[#c71463]">
            ${startingPrice != null ? Number(startingPrice).toFixed(2) : "\u2014"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesSection() {
  const t = useTranslations("Services");
  const locale = useLocale();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [gigs, setGigs] = useState<GigListItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const gigsRef = useRef<HTMLElement>(null);

  // Advanced filters
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [minRating, setMinRating] = useState("");

  const hasActiveFilters = !!(minPrice || maxPrice || deliveryTime || minRating);

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setDeliveryTime("");
    setMinRating("");
    setPage(1);
  };

  useEffect(() => {
    apiClient
      .get<CategoryItem[]>("/api/Marketplace/categories")
      .then((r) => setCategories(r.data ?? []))
      .catch(() => {});
  }, []);

  const fetchGigs = useCallback(async () => {
    setLoading(true);
    try {
      const r = await apiClient.get<PagedResult | GigListItem[]>("/api/Marketplace/gigs", {
        params: {
          PageNumber: page,
          PageSize: PAGE_SIZE,
          ...(search       ? { Search: search } : {}),
          ...(categoryId   ? { CategoryId: categoryId } : {}),
          ...(minPrice     ? { minPrice: parseFloat(minPrice) } : {}),
          ...(maxPrice     ? { maxPrice: parseFloat(maxPrice) } : {}),
          ...(deliveryTime ? { deliveryTime: parseInt(deliveryTime) } : {}),
          ...(minRating    ? { minRating: parseFloat(minRating) } : {}),
        },
      });
      const data = r.data;
      if (Array.isArray(data)) {
        setGigs(data as GigListItem[]);
        setTotalCount((data as GigListItem[]).length);
      } else {
        setGigs((data as PagedResult).items ?? []);
        setTotalCount((data as PagedResult).totalCount ?? 0);
      }
    } catch {
      setGigs([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [search, categoryId, page, minPrice, maxPrice, deliveryTime, minRating]);

  useEffect(() => { fetchGigs(); }, [fetchGigs]);

  const scrollToGigs = () =>
    gigsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSearch = () => {
    setSearch(searchInput.trim());
    setPage(1);
    scrollToGigs();
  };

  const staticCategories = [
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
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c71463]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3E9666]/20 rounded-full blur-3xl animate-pulse" />
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
            <div className="mx-auto max-w-2xl pt-4">
              <div className="flex items-center gap-2 bg-card rounded-2xl border border-border p-2 shadow-lg">
                <Search className="w-6 h-6 text-muted-foreground ml-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder={t("hero.searchPlaceholder")}
                  className="flex-1 bg-transparent border-0 outline-none px-2 py-3 text-foreground placeholder:text-muted-foreground"
                />
                <button onClick={handleSearch} className="px-6 py-3 bg-[#c71463] hover:bg-[#c71463]/90 text-white font-semibold rounded-xl transition-colors">
                  {t("hero.searchButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Gigs */}
      <section ref={gigsRef} className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                onClick={() => { setCategoryId(""); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  !categoryId
                    ? "bg-[#c71463] text-white border-[#c71463]"
                    : "border-border text-muted-foreground hover:border-[#c71463]/40 hover:text-foreground"
                }`}
              >
                {t("gigs.all")}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setCategoryId(cat.id); setPage(1); }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    categoryId === cat.id
                      ? "bg-[#c71463] text-white border-[#c71463]"
                      : "border-border text-muted-foreground hover:border-[#c71463]/40 hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
          {/* Filter bar */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                filtersOpen || hasActiveFilters
                  ? "border-[#c71463] text-[#c71463] bg-[#c71463]/5"
                  : "border-border text-muted-foreground hover:border-[#c71463]/40"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t("gigs.filters")}
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-[#c71463] text-white text-[10px] font-bold flex items-center justify-center">
                  {[minPrice, maxPrice, deliveryTime, minRating].filter(Boolean).length}
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-[#c71463] transition-colors">
                <X className="w-3.5 h-3.5" />
                {t("gigs.clearFilters")}
              </button>
            )}
          </div>

          {filtersOpen && (
            <div className="mb-6 p-5 rounded-2xl border border-border bg-card shadow-sm grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Min price */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("gigs.minPrice")}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                    placeholder="0"
                    className="w-full pl-6 pr-3 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#c71463]/30"
                  />
                </div>
              </div>
              {/* Max price */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("gigs.maxPrice")}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                    placeholder="∞"
                    className="w-full pl-6 pr-3 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#c71463]/30"
                  />
                </div>
              </div>
              {/* Delivery time */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("gigs.deliveryTime")}</label>
                <select
                  value={deliveryTime}
                  onChange={(e) => { setDeliveryTime(e.target.value); setPage(1); }}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#c71463]/30"
                >
                  <option value="">{t("gigs.anyDelivery")}</option>
                  <option value="1">{t("gigs.delivery1d")}</option>
                  <option value="3">{t("gigs.delivery3d")}</option>
                  <option value="7">{t("gigs.delivery7d")}</option>
                  <option value="14">{t("gigs.delivery14d")}</option>
                </select>
              </div>
              {/* Min rating */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("gigs.minRating")}</label>
                <select
                  value={minRating}
                  onChange={(e) => { setMinRating(e.target.value); setPage(1); }}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#c71463]/30"
                >
                  <option value="">{t("gigs.anyRating")}</option>
                  <option value="4">4+ ★</option>
                  <option value="4.5">4.5+ ★</option>
                  <option value="4.8">4.8+ ★</option>
                </select>
              </div>
            </div>
          )}

          {!loading && (
            <p className="text-sm text-muted-foreground mb-5">
              {search
                ? t("gigs.resultsFor", { query: search, count: totalCount })
                : t("gigs.showing", { count: totalCount })}
            </p>
          )}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-muted/60 animate-pulse overflow-hidden">
                  <div className="aspect-video bg-muted" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-muted-foreground/10 rounded w-2/3" />
                    <div className="h-4 bg-muted-foreground/10 rounded" />
                    <div className="h-4 bg-muted-foreground/10 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : gigs.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-14 h-14 mx-auto mb-4 text-muted-foreground/20" />
              <p className="text-lg font-medium text-muted-foreground">{t("gigs.empty")}</p>
              {search && (
                <button
                  onClick={() => { setSearchInput(""); setSearch(""); setPage(1); }}
                  className="mt-4 text-sm text-[#c71463] hover:underline"
                >
                  {t("gigs.clearSearch")}
                </button>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {gigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => { setPage((p) => Math.max(1, p - 1)); scrollToGigs(); }}
                disabled={page === 1}
                className="p-2 rounded-xl border border-border hover:border-[#c71463]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = totalPages <= 5 ? i + 1 : Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => { setPage(pageNum); scrollToGigs(); }}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                      pageNum === page ? "bg-[#c71463] text-white" : "border border-border hover:border-[#c71463]/40 text-foreground"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); scrollToGigs(); }}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-border hover:border-[#c71463]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Category Tiles */}
      <section className="py-20 lg:py-32 bg-muted/20">
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
            {staticCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => {
                    const keyword = category.key.replace(/([A-Z])/g, " $1").trim().split(" ")[0].toLowerCase();
                    const match = categories.find((c) => c.name.toLowerCase().includes(keyword));
                    setCategoryId(match?.id ?? "");
                    setPage(1);
                    scrollToGigs();
                  }}
                  className="group relative p-8 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/60 hover:border-[#c71463]/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl text-start"
                  style={{ animationDelay: `${index * 50}ms` }}
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
                </button>
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
            {budgetRanges.map((range) => (
              <div
                key={range.key}
                className="group p-10 rounded-3xl bg-gradient-to-br from-card to-muted/20 border-2 border-border hover:border-[#c71463]/40 transition-all duration-300 hover:scale-105"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-[#c71463]">
                    {t(`budget.ranges.${range.key}.title`)}
                  </h3>
                  <div className="text-4xl font-bold">
                    {range.min} – {range.max}
                  </div>
                  <p className="text-muted-foreground">
                    {t(`budget.ranges.${range.key}.description`)}
                  </p>
                  <button onClick={scrollToGigs} className="w-full px-6 py-3 bg-[#3E9666] hover:bg-[#3E9666]/90 text-white font-semibold rounded-xl transition-colors">
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
                <button
                  onClick={scrollToGigs}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  {t("cta.button2")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
