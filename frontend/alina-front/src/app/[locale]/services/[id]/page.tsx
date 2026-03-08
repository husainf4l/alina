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
  ChevronRight,
  Heart,
  Share2,
  Award,
  Zap,
  Package,
  MessageCircle,
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
  galleryImages: string[];
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
        <div className="flex flex-col items-center gap-4">
          <div className="size-16 rounded-2xl bg-[#B05088]/10 flex items-center justify-center">
            <Loader2 className="size-8 animate-spin text-[#B05088]" />
          </div>
          <p className="text-sm text-muted-foreground">Loading gig details...</p>
        </div>
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center px-4">
        <div className="size-20 rounded-3xl bg-muted flex items-center justify-center">
          <AlertCircle className="size-10 text-muted-foreground/40" />
        </div>
        <div>
          <p className="text-xl font-bold text-foreground">Gig not found</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">This gig may have been removed or doesn&apos;t exist.</p>
        </div>
        <Link href="/services">
          <Button variant="outline" className="rounded-xl gap-2">
            <ChevronLeft className="size-4" /> Back to Services
          </Button>
        </Link>
      </div>
    );
  }

  const selectedPackage = gig.packages.find((p) => p.id === selectedPkg) ?? gig.packages[0];
  const allImages = [
    gig.mainImage ? normalizeImageUrl(gig.mainImage) : null,
    ...(gig.galleryImages?.map((u) => normalizeImageUrl(u) ?? u) ?? []),
  ].filter(Boolean) as string[];

  const startingPrice = selectedPackage?.price?.amount
    ?? gig.startingPrice
    ?? (gig.packages.length ? Math.min(...gig.packages.map((p) => p.price?.amount ?? 0)) : null);

  const packageIcons = [Zap, Package, Award];

  return (
    <div className="min-h-screen bg-background">

      {/* ── Breadcrumb bar ── */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors font-medium">Home</Link>
            <ChevronRight className="size-3.5 shrink-0" />
            <Link href="/services" className="hover:text-foreground transition-colors">Search</Link>
            <ChevronRight className="size-3.5 shrink-0" />
            <span className="text-foreground font-medium line-clamp-1 max-w-[260px]">{gig.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ══════════════════════════════
              Left / Main Column
          ══════════════════════════════ */}
          <div className="lg:col-span-8 flex flex-col gap-7">

            {/* ── Title block ── */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B05088]/10 border border-[#B05088]/20 px-3 py-1 text-xs font-semibold text-[#B05088]">
                  {gig.categoryName}
                </span>
                <div className="flex items-center gap-2">
                  <button className="size-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-[#c71463] hover:border-[#c71463]/30 transition-colors">
                    <Heart className="size-4" />
                  </button>
                  <button className="size-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="size-4" />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-foreground leading-tight">{gig.title}</h1>

              {/* Seller bar */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-full bg-gradient-to-br from-[#B05088] to-[#c71463] flex items-center justify-center shadow-sm">
                    <User className="size-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none">{gig.sellerName}</p>
                    {gig.sellerLevel && (
                      <p className="text-xs text-muted-foreground capitalize mt-0.5">{gig.sellerLevel}</p>
                    )}
                  </div>
                </div>

                <div className="h-4 w-px bg-border" />

                {gig.reviewCount > 0 ? (
                  <div className="flex items-center gap-1.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={`size-4 ${s <= Math.round(gig.averageRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                    ))}
                    <span className="text-sm font-bold text-foreground ml-0.5">{Number(gig.averageRating).toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">({gig.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">No reviews yet</span>
                )}

                <div className="h-4 w-px bg-border" />

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <div className="size-6 rounded-lg bg-[#3E9666]/10 flex items-center justify-center">
                    <Clock className="size-3.5 text-[#3E9666]" />
                  </div>
                  <span>{gig.deliveryTimeInDays} day{gig.deliveryTimeInDays !== 1 ? "s" : ""} delivery</span>
                </div>
              </div>
            </div>

            {/* ── Main image ── */}
            {activeImage ? (
              <div className="rounded-2xl overflow-hidden border border-border bg-muted aspect-video shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeImage} alt={gig.title} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted/50 aspect-video flex items-center justify-center">
                <Package className="size-12 text-muted-foreground/30" />
              </div>
            )}

            {/* ── Gallery thumbnails ── */}
            {allImages.length > 1 && (
              <div className="flex gap-2.5 flex-wrap">
                {allImages.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(url)}
                    className={`rounded-xl overflow-hidden border-2 transition-all shadow-sm hover:shadow-md ${activeImage === url ? "border-[#B05088] ring-2 ring-[#B05088]/20" : "border-border hover:border-[#B05088]/50"}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Gallery ${i + 1}`} className="h-[72px] w-[108px] object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* ── About this Gig ── */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h2 className="text-base font-bold text-foreground">About This Gig</h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{gig.description}</p>
              </div>
            </div>

            {/* ── Packages comparison ── */}
            {gig.packages.length > 0 && (
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-muted/30">
                  <h2 className="text-base font-bold text-foreground">Packages</h2>
                </div>
                <div className="p-5 grid gap-4 sm:grid-cols-3">
                  {gig.packages.map((pkg, idx) => {
                    const Icon = packageIcons[idx % packageIcons.length];
                    const isSelected = selectedPkg === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPkg(pkg.id)}
                        className={`relative rounded-xl border-2 p-5 text-left transition-all hover:shadow-md ${isSelected ? "border-[#B05088] bg-gradient-to-b from-[#B05088]/5 to-transparent shadow-sm" : "border-border hover:border-[#B05088]/30"}`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 end-3 size-5 rounded-full bg-[#B05088] flex items-center justify-center">
                            <CheckCircle2 className="size-3 text-white" />
                          </div>
                        )}
                        <div className={`size-9 rounded-xl mb-3 flex items-center justify-center ${isSelected ? "bg-[#B05088]/15" : "bg-muted"}`}>
                          <Icon className={`size-4 ${isSelected ? "text-[#B05088]" : "text-muted-foreground"}`} />
                        </div>
                        <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isSelected ? "text-[#B05088]" : "text-muted-foreground"}`}>{pkg.name}</p>
                        <p className="text-2xl font-black text-foreground">${pkg.price?.amount ?? 0}</p>
                        <p className="text-xs text-muted-foreground mt-2.5 leading-relaxed line-clamp-3">{pkg.description}</p>
                        <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="size-3.5 shrink-0" />
                          <span>{pkg.deliveryTimeInDays} day{pkg.deliveryTimeInDays !== 1 ? "s" : ""} delivery</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Seller card ── */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h2 className="text-base font-bold text-foreground">About the Seller</h2>
              </div>
              <div className="p-6 flex flex-col sm:flex-row gap-5 items-start">
                <div className="size-16 rounded-2xl bg-gradient-to-br from-[#B05088] to-[#c71463] flex items-center justify-center shadow-md shrink-0">
                  <User className="size-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-base font-bold text-foreground">{gig.sellerName}</p>
                    {gig.sellerLevel && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#3E9666]/10 border border-[#3E9666]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#3E9666] capitalize">
                        <Award className="size-3" />{gig.sellerLevel}
                      </span>
                    )}
                  </div>
                  {gig.reviewCount > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-foreground">{Number(gig.averageRating).toFixed(1)}</span>
                      <span className="text-xs text-muted-foreground">({gig.reviewCount} reviews)</span>
                    </div>
                  )}
                  <Button variant="outline" className="rounded-xl gap-2 mt-2 text-sm h-9">
                    <MessageCircle className="size-4" /> Contact Seller
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* ══════════════════════════════
              Right / Sticky Sidebar
          ══════════════════════════════ */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 flex flex-col gap-4">

              {/* Order card */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">

                {/* Package tabs */}
                {gig.packages.length > 1 && (
                  <div className="flex border-b border-border bg-muted/30">
                    {gig.packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPkg(pkg.id)}
                        className={`flex-1 px-2 py-3 text-xs font-bold uppercase tracking-wide transition-all ${selectedPkg === pkg.id ? "text-[#B05088] bg-background border-b-2 border-[#B05088]" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {pkg.name}
                      </button>
                    ))}
                  </div>
                )}

                <div className="p-5 flex flex-col gap-4">

                  {/* Price + delivery */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Starting at</p>
                      <p className="text-3xl font-black text-foreground">
                        ${startingPrice ?? "—"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#3E9666]/10 border border-[#3E9666]/20 px-3 py-1.5 text-xs font-semibold text-[#3E9666]">
                        <Clock className="size-3.5" />
                        {selectedPackage?.deliveryTimeInDays ?? gig.deliveryTimeInDays}d delivery
                      </div>
                    </div>
                  </div>

                  {selectedPackage?.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">{selectedPackage.description}</p>
                  )}

                  <Button className="w-full rounded-xl bg-[#c71463] hover:bg-[#c71463]/90 text-white font-bold text-base py-6 shadow-lg shadow-[#c71463]/20 transition-all hover:shadow-[#c71463]/30 hover:-translate-y-0.5">
                    Continue →
                  </Button>

                  <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold py-5">
                    <MessageCircle className="size-4" /> Contact Seller
                  </Button>

                  {/* Trust badges */}
                  <div className="rounded-xl bg-muted/50 border border-border p-3.5 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <div className="size-6 rounded-lg bg-[#3E9666]/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="size-3.5 text-[#3E9666]" />
                      </div>
                      <span>Satisfaction guarantee or money back</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <div className="size-6 rounded-lg bg-[#3E9666]/10 flex items-center justify-center shrink-0">
                        <Shield className="size-3.5 text-[#3E9666]" />
                      </div>
                      <span>Secure & encrypted payment</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <div className="size-6 rounded-lg bg-[#3E9666]/10 flex items-center justify-center shrink-0">
                        <RefreshCw className="size-3.5 text-[#3E9666]" />
                      </div>
                      <span>Unlimited revisions until satisfied</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery highlight card */}
              <div className="rounded-2xl border border-[#3E9666]/20 bg-[#3E9666]/5 p-4 flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[#3E9666]/15 flex items-center justify-center shrink-0">
                  <Zap className="size-5 text-[#3E9666]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">Get it in {gig.deliveryTimeInDays} day{gig.deliveryTimeInDays !== 1 ? "s" : ""}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
