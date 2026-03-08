"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@/i18n/navigation";
import apiClient from "@/lib/apiClient";
import { normalizeImageUrl, cn } from "@/lib/utils";
import { Plus, Briefcase, Star, Clock, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Gig {
  id: string;
  title: string;
  mainImage?: string;
  categoryName: string;
  startingPrice?: number;
  deliveryTimeInDays: number;
  averageRating: number;
  reviewCount: number;
  isActive: boolean;
}

export default function GigsPage() {
  const t = useTranslations("Gigs");
  const { user, isInitialized } = useAuth();
  const isSeller = user?.role === "seller" || user?.role === "both";

  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isInitialized) return;
    if (!isSeller) { setLoading(false); return; }
    apiClient
      .get("/api/marketplace/gigs/my")
      .then(({ data }) => setGigs(data?.items ?? data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isInitialized, isSeller]);

  const toggleStatus = async (gig: Gig) => {
    try {
      await apiClient.patch(`/api/marketplace/gigs/${gig.id}/status`, {
        isActive: !gig.isActive,
      });
      setGigs((prev) =>
        prev.map((g) => (g.id === gig.id ? { ...g, isActive: !g.isActive } : g))
      );
    } catch {}
  };

  if (!isSeller) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <Briefcase className="size-14 text-muted-foreground/40" />
        <p className="text-lg font-semibold text-foreground">{t("notSellerTitle")}</p>
        <p className="text-sm text-muted-foreground max-w-sm">{t("notSellerBody")}</p>
        <Link href="/dashboard/profile">
          <Button className="rounded-xl">{t("notSellerCta")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t("pageTitle")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("pageSubtitle")}</p>
        </div>
        <Link href="/dashboard/gigs/create">
          <Button className="rounded-xl gap-2">
            <Plus className="size-4" />
            {t("createButton")}
          </Button>
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : gigs.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border py-20 text-center">
          <Briefcase className="size-12 text-muted-foreground/40" />
          <p className="text-base font-medium text-foreground">{t("emptyTitle")}</p>
          <p className="text-sm text-muted-foreground max-w-xs">{t("emptyBody")}</p>
          <Link href="/dashboard/gigs/create">
            <Button variant="outline" className="rounded-xl gap-2 mt-2">
              <Plus className="size-4" />
              {t("createButton")}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {gigs.map((gig) => (
            <div
              key={gig.id}
              className="group rounded-3xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md"
            >
              {/* Cover */}
              <div className="relative h-40 bg-gradient-to-br from-[#B05088]/10 to-[#B05088]/5">
                {gig.mainImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={normalizeImageUrl(gig.mainImage)!}
                    alt={gig.title}
                    className="absolute inset-0 size-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                )}
                {/* Status pill */}
                <div className={cn(
                  "absolute top-3 start-3 rounded-full px-2.5 py-1 text-[11px] font-medium",
                  gig.isActive
                    ? "bg-green-500/15 text-green-600 dark:text-green-400"
                    : "bg-muted text-muted-foreground"
                )}>
                  {gig.isActive ? t("active") : t("paused")}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col gap-3">
                <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{gig.title}</p>
                <p className="text-xs text-muted-foreground">{gig.categoryName}</p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {gig.reviewCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      {gig.averageRating.toFixed(1)}
                      <span className="text-muted-foreground/60">({gig.reviewCount})</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {gig.deliveryTimeInDays}d
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1 border-t border-border">
                  <span className="text-sm font-semibold text-foreground">
                    {gig.startingPrice != null ? `$${gig.startingPrice}` : "—"}
                  </span>
                  <button
                    onClick={() => toggleStatus(gig)}
                    title={gig.isActive ? t("pause") : t("activate")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {gig.isActive
                      ? <ToggleRight className="size-5 text-[#B05088]" />
                      : <ToggleLeft className="size-5" />
                    }
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
