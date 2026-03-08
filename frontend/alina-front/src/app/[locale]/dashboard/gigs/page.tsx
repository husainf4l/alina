"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@/i18n/navigation";
import apiClient from "@/lib/apiClient";
import { normalizeImageUrl, cn } from "@/lib/utils";
import {
  Plus,
  Briefcase,
  Star,
  Clock,
  ToggleLeft,
  ToggleRight,
  Loader2,
  Pencil,
  ExternalLink,
  TrendingUp,
  CheckCircle2,
  PauseCircle,
  Sparkles,
} from "lucide-react";
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
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!isInitialized) return;
    if (!isSeller) { setLoading(false); return; }
    setFetchError(null);
    apiClient
      .get("/api/Marketplace/gigs/me", { params: { PageNumber: 1, PageSize: 50 } })
      .then(({ data }) => setGigs(data?.items ?? data ?? []))
      .catch((err) => {
        const msg = err?.response?.data?.message ?? err?.response?.data?.error_description ?? err?.message ?? "Failed to load gigs";
        setFetchError(`${err?.response?.status ?? ""} ${msg}`);
      })
      .finally(() => setLoading(false));
  }, [isInitialized, isSeller]);

  const toggleStatus = async (gig: Gig) => {
    try {
      await apiClient.patch(`/api/marketplace/gigs/${gig.id}/status`, { isActive: !gig.isActive });
      setGigs((prev) => prev.map((g) => (g.id === gig.id ? { ...g, isActive: !g.isActive } : g)));
    } catch {}
  };

  if (!isSeller) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
        <div className="size-20 rounded-3xl bg-[#B05088]/10 flex items-center justify-center">
          <Briefcase className="size-10 text-[#B05088]/60" />
        </div>
        <div>
          <p className="text-xl font-bold text-foreground">{t("notSellerTitle")}</p>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">{t("notSellerBody")}</p>
        </div>
        <Link href="/dashboard/profile">
          <Button className="rounded-xl bg-[#B05088] hover:bg-[#B05088]/90 text-white gap-2">{t("notSellerCta")}</Button>
        </Link>
      </div>
    );
  }

  const activeCount = gigs.filter((g) => g.isActive).length;
  const pausedCount = gigs.filter((g) => !g.isActive).length;

  return (
    <div className="flex flex-col gap-7">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <span>{t("pageTitle")}</span>
            {gigs.length > 0 && (
              <span className="inline-flex items-center justify-center rounded-full bg-[#B05088]/10 text-[#B05088] text-sm font-bold px-2.5 py-0.5 min-w-[28px]">
                {gigs.length}
              </span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{t("pageSubtitle")}</p>
        </div>
        <Link href="/dashboard/gigs/create">
          <Button className="rounded-xl gap-2 bg-[#c71463] hover:bg-[#c71463]/90 text-white font-semibold shadow-md shadow-[#c71463]/20 hover:shadow-[#c71463]/30 transition-all hover:-translate-y-0.5">
            <Plus className="size-4" />
            {t("createButton")}
          </Button>
        </Link>
      </div>

      {/* ── Stats bar ── */}
      {!loading && gigs.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#B05088]/10 flex items-center justify-center shrink-0">
              <TrendingUp className="size-5 text-[#B05088]" />
            </div>
            <div>
              <p className="text-xl font-black text-foreground">{gigs.length}</p>
              <p className="text-xs text-muted-foreground">Total gigs</p>
            </div>
          </div>
          <div className="rounded-2xl border border-[#3E9666]/20 bg-[#3E9666]/5 p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#3E9666]/15 flex items-center justify-center shrink-0">
              <CheckCircle2 className="size-5 text-[#3E9666]" />
            </div>
            <div>
              <p className="text-xl font-black text-foreground">{activeCount}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <PauseCircle className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xl font-black text-foreground">{pausedCount}</p>
              <p className="text-xs text-muted-foreground">Paused</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Error ── */}
      {fetchError && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive font-mono">
          {fetchError}
        </div>
      )}

      {/* ── Loading ── */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <div className="size-14 rounded-2xl bg-[#B05088]/10 flex items-center justify-center">
              <Loader2 className="size-7 animate-spin text-[#B05088]" />
            </div>
            <p className="text-sm text-muted-foreground">Loading your gigs...</p>
          </div>
        </div>
      ) : gigs.length === 0 ? (

        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed border-border py-24 text-center bg-muted/20">
          <div className="size-20 rounded-3xl bg-[#B05088]/8 flex items-center justify-center">
            <Sparkles className="size-10 text-[#B05088]/50" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{t("emptyTitle")}</p>
            <p className="text-sm text-muted-foreground max-w-xs mt-1">{t("emptyBody")}</p>
          </div>
          <Link href="/dashboard/gigs/create">
            <Button className="rounded-xl gap-2 bg-[#c71463] hover:bg-[#c71463]/90 text-white font-semibold shadow-md shadow-[#c71463]/20">
              <Plus className="size-4" />
              {t("createButton")}
            </Button>
          </Link>
        </div>

      ) : (

        /* ── Gig cards grid ── */
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {gigs.map((gig) => (
            <div
              key={gig.id}
              className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-[#B05088]/30"
            >
              {/* Thumbnail */}
              <div className="relative h-44 bg-gradient-to-br from-[#B05088]/10 via-[#B05088]/5 to-transparent overflow-hidden">
                {gig.mainImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={normalizeImageUrl(gig.mainImage)!}
                    alt={gig.title}
                    className="absolute inset-0 size-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Briefcase className="size-10 text-[#B05088]/20" />
                  </div>
                )}

                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Status pill */}
                <div className={cn(
                  "absolute top-3 start-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm",
                  gig.isActive
                    ? "bg-[#3E9666]/90 text-white"
                    : "bg-black/40 text-white/80"
                )}>
                  <span className={cn("size-1.5 rounded-full", gig.isActive ? "bg-white animate-pulse" : "bg-white/60")} />
                  {gig.isActive ? t("active") : t("paused")}
                </div>

                {/* Price overlay */}
                {gig.startingPrice != null && (
                  <div className="absolute bottom-3 end-3 rounded-xl bg-black/60 backdrop-blur-sm px-2.5 py-1 text-sm font-black text-white">
                    ${gig.startingPrice}
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-4 flex flex-col gap-3">

                {/* Category */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#B05088]">
                  {gig.categoryName}
                </span>

                {/* Title */}
                <p className="text-sm font-bold text-foreground line-clamp-2 leading-snug -mt-1">{gig.title}</p>

                {/* Stats row */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {gig.reviewCount > 0 ? (
                    <span className="flex items-center gap-1">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-foreground">{gig.averageRating.toFixed(1)}</span>
                      <span className="text-muted-foreground/60">({gig.reviewCount})</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-muted-foreground/60">
                      <Star className="size-3" /> No reviews
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {gig.deliveryTimeInDays}d delivery
                  </span>
                </div>

                {/* Actions row */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-border">
                  <Link href={`/dashboard/gigs/${gig.id}/edit`} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold bg-[#B05088]/10 text-[#B05088] hover:bg-[#B05088]/20 transition-colors">
                      <Pencil className="size-3" />{t("editButton")}
                    </button>
                  </Link>
                  <Link
                    href={`/services/${gig.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <button className="w-full flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                      <ExternalLink className="size-3" />{t("viewButton")}
                    </button>
                  </Link>
                  <button
                    onClick={() => toggleStatus(gig)}
                    title={gig.isActive ? t("pause") : t("activate")}
                    className="size-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-[#B05088]/30 bg-card"
                  >
                    {gig.isActive
                      ? <ToggleRight className="size-4 text-[#B05088]" />
                      : <ToggleLeft className="size-4" />
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