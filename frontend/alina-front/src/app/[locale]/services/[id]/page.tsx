"use client";

import { use, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import apiClient from "@/lib/apiClient";
import { normalizeImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Star,
  Clock,
  ChevronLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Shield,
  RefreshCw,
  User,
} from "lucide-react";

interface PackageDto {
  id: string;
  name: string;
  description: string;
  price: { amount: number; currency: string };
  deliveryTimeInDays: number;
}

interface GigDto {
  id: string;
  title: string;
  description: string;
  mainImage: string | null;
  gallery: string[];
  categoryId: string;
  categoryName: string;
  sellerId: string;
  sellerName: string;
  sellerLevel: string;
  packages: PackageDto[];
  deliveryTimeInDays: number;
  averageRating: number;
  reviewCount: number;
  isActive: boolean;
  startingPrice?: number;
}

export default function GigDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations("Services");

  const [gig, setGig] = useState<GigDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get(`/api/Marketplace/gigs/${id}`)
      .then(({ data }) => {
        setGig(data);
        setActiveImage(data.mainImage ? normalizeImageUrl(data.mainImage) : null);
        if (data.packages?.length) setSelectedPkg(data.packages[0].id);
      })
      .catch(() => setError("Gig not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="size-12 text-muted-foreground/40" />
        <p className="text-lg font-semibold text-foreground">Gig not found</p>
        <p className="text-sm text-muted-foreground">This gig may have been removed or doesn&apos;t exist.</p>
        <Link href="/services">
          <Button variant="outline" className="rounded-xl gap-2 mt-2">
            <ChevronLeft className="size-4" /> {t("hero.searchButton")}
          </Button>
        </Link>
      </div>
    );
  }

  const selectedPackage = gig.packages.find((p) => p.id === selectedPkg) ?? gig.packages[0];
  const allImages = [
    gig.mainImage ? normalizeImageUrl(gig.mainImage) : null,
    ...( gig.gallery?.map((u) => normalizeImageUrl(u) ?? u) ?? []),
  ].filter(Boolean) as string[];

  const startingPrice = selectedPackage?.price?.amount
    ?? gig.startingPrice
    ?? (gig.packages.length ? Math.min(...gig.packages.map((p) => p.price?.amount ?? 0)) : null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">

      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-foreground transition-colors">{t("hero.searchButton")}</Link>
        <span>/</span>
        <span className="text-foreground line-clamp-1">{gig.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left / Main ── */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Title + meta */}
          <div>
            <span className="inline-flex items-center rounded-full bg-[#B05088]/10 px-3 py-1 text-xs font-medium text-[#B05088] mb-3">
              {gig.categoryName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">{gig.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="size-7 rounded-full bg-[#B05088]/20 flex items-center justify-center">
                  <User className="size-3.5 text-[#B05088]" />
                </div>
                <span className="font-medium text-foreground">{gig.sellerName}</span>
                {gig.sellerLevel && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium capitalize">{gig.sellerLevel}</span>
                )}
              </div>
              {gig.reviewCount > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-foreground">{Number(gig.averageRating).toFixed(1)}</span>
                  <span className="text-muted-foreground">({gig.reviewCount.toLocaleString()} reviews)</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                {gig.deliveryTimeInDays} day{gig.deliveryTimeInDays !== 1 ? "s" : ""} delivery
              </div>
            </div>
          </div>

          {/* Main image */}
          {activeImage && (
            <div className="rounded-2xl overflow-hidden border border-border bg-muted aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeImage} alt={gig.title} className="h-full w-full object-cover" />
            </div>
          )}

          {/* Gallery thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {allImages.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(url)}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${activeImage === url ? "border-[#B05088]" : "border-border hover:border-[#B05088]/50"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Gallery ${i + 1}`} className="h-16 w-24 object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">About This Gig</h2>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{gig.description}</p>
          </div>

          {/* Packages */}
          {gig.packages.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Packages</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {gig.packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg.id)}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${selectedPkg === pkg.id ? "border-[#B05088] bg-[#B05088]/5" : "border-border hover:border-[#B05088]/40"}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{pkg.name}</p>
                    <p className="text-xl font-bold text-foreground">${pkg.price?.amount ?? 0}</p>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{pkg.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />{pkg.deliveryTimeInDays} day{pkg.deliveryTimeInDays !== 1 ? "s" : ""}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Order Sidebar ── */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border border-border bg-card overflow-hidden shadow-sm">

            {/* Package tabs */}
            {gig.packages.length > 1 && (
              <div className="flex border-b border-border">
                {gig.packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg.id)}
                    className={`flex-1 px-3 py-3 text-xs font-semibold transition-colors ${selectedPkg === pkg.id ? "text-[#B05088] border-b-2 border-[#B05088]" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {pkg.name}
                  </button>
                ))}
              </div>
            )}

            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-foreground">
                  ${startingPrice ?? "—"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {selectedPackage?.deliveryTimeInDays ?? gig.deliveryTimeInDays}d delivery
                </span>
              </div>

              {selectedPackage?.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedPackage.description}</p>
              )}

              <Button className="w-full rounded-xl bg-[#c71463] hover:bg-[#c71463]/90 text-white font-semibold py-5">
                Continue
              </Button>

              <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-[#3E9666]" /> Satisfaction guaranteed</div>
                <div className="flex items-center gap-2"><Shield className="size-3.5 text-[#3E9666]" /> Secure payment</div>
                <div className="flex items-center gap-2"><RefreshCw className="size-3.5 text-[#3E9666]" /> Unlimited revisions</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
