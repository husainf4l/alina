"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Star, Clock, ArrowRight, Briefcase } from "lucide-react";
import { Link } from "@/i18n/navigation";
import apiClient from "@/lib/apiClient";
import { normalizeImageUrl } from "@/lib/utils";

interface PackageDto {
  id: string;
  price: { amount: number; currency: string };
  deliveryTimeInDays: number;
}

interface GigDto {
  id: string;
  title: string;
  mainImage: string | null;
  categoryName: string;
  sellerName: string;
  sellerLevel: string;
  packages: PackageDto[];
  deliveryTimeInDays: number;
  averageRating: number;
  reviewCount: number;
}

function startingPrice(gig: GigDto): number | null {
  if (!gig.packages?.length) return null;
  return Math.min(...gig.packages.map((p) => Number(p.price?.amount ?? 0)));
}

export default function TrendingGigs() {
  const t = useTranslations("Home.trendingGigs");
  const [gigs, setGigs] = useState<GigDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/api/Marketplace/gigs", { params: { PageSize: 8, PageNumber: 1 } })
      .then(({ data }) => setGigs(data?.items ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-8 h-10 w-64 rounded-xl bg-muted animate-pulse" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-none w-[240px] h-[220px] rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!gigs.length) return null;

  return (
    <section className="w-full py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">{t("title")}</h2>
            <p className="mt-2 text-muted-foreground text-base">{t("subtitle")}</p>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-1.5 text-sm font-medium text-[#c71463] hover:gap-2.5 transition-all whitespace-nowrap"
          >
            {t("viewAll")} <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Horizontal scroll cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-6 px-6 lg:-mx-12 lg:px-12">
          {gigs.map((gig) => {
            const price = startingPrice(gig);
            const imgSrc = gig.mainImage ? normalizeImageUrl(gig.mainImage) : null;
            return (
              <Link
                key={gig.id}
                href={`/services/${gig.id}`}
                className="group flex-none w-[240px] sm:w-[260px] snap-start rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* Thumbnail */}
                <div className="relative h-36 overflow-hidden bg-muted flex items-center justify-center">
                  {imgSrc ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={imgSrc}
                      alt={gig.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Briefcase className="size-10 text-muted-foreground/30" />
                  )}
                  <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    {gig.categoryName}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3.5">
                  <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug mb-2">
                    {gig.title}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">{gig.sellerName}</p>
                  {gig.averageRating > 0 && (
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-foreground">
                        {Number(gig.averageRating).toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({Number(gig.reviewCount).toLocaleString()})
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {gig.deliveryTimeInDays}d
                    </div>
                    {price !== null && (
                      <span className="text-sm font-bold text-foreground">
                        {t("from")} ${price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
