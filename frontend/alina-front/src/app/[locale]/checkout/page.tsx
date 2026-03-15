"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  ShoppingBag, Clock, Loader2, AlertCircle, CheckCircle2,
  Shield, ChevronLeft, Package, Zap, Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, Link } from "@/i18n/navigation";
import apiClient from "@/lib/apiClient";
import DashboardGuard from "@/components/dashboard/DashboardGuard";
import Navbar from "@/components/Navbar";

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
  sellerId: string;
  sellerName: string;
  averageRating: number;
  reviewCount: number;
  packages: PackageDto[];
}

const packageIcons = [Zap, Package, Award];

function CheckoutContent() {
  const t = useTranslations("Checkout");
  const router = useRouter();
  const searchParams = useSearchParams();
  const gigId = searchParams.get("gigId") ?? "";
  const packageName = searchParams.get("packageName") ?? "";

  const [gig, setGig] = useState<GigDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requirements, setRequirements] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!gigId) { setError("Missing gig ID"); setLoading(false); return; }
    apiClient.get<GigDto>(`/api/Marketplace/gigs/${gigId}`)
      .then(({ data }) => setGig(data))
      .catch(() => setError("Failed to load gig details"))
      .finally(() => setLoading(false));
  }, [gigId]);

  const selectedPackage = gig?.packages.find((p) => p.name === packageName)
    ?? gig?.packages[0]
    ?? null;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gig || !selectedPackage) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await apiClient.post("/api/MarketplaceOps/orders", {
        gigId: gig.id,
        packageName: selectedPackage.name,
        requirements: requirements.trim() || undefined,
      });
      setSuccess(true);
      setTimeout(() => router.push("/dashboard/orders"), 2500);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: string | { message?: string } } })?.response?.data;
      const text = typeof msg === "string" ? msg : msg?.message;
      setSubmitError(text ?? t("orderError"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#B05088]" />
      </div>
    );
  }

  if (error || !gig || !selectedPackage) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center px-4">
        <div className="size-16 rounded-2xl bg-muted flex items-center justify-center">
          <AlertCircle className="size-8 text-muted-foreground/50" />
        </div>
        <div>
          <p className="font-bold text-foreground text-lg">{error ?? t("gigNotFound")}</p>
          <p className="text-sm text-muted-foreground mt-1">{t("gigNotFoundHint")}</p>
        </div>
        <Link href="/services">
          <Button variant="outline" className="rounded-xl gap-2">
            <ChevronLeft className="size-4" /> {t("backToServices")}
          </Button>
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-4">
        <div className="size-20 rounded-3xl bg-[#3E9666]/10 border border-[#3E9666]/20 flex items-center justify-center">
          <CheckCircle2 className="size-10 text-[#3E9666]" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{t("successTitle")}</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">{t("successDesc")}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          {t("successRedirecting")}
        </div>
      </div>
    );
  }

  const pkgIndex = gig.packages.findIndex((p) => p.name === selectedPackage.name);
  const PkgIcon = packageIcons[pkgIndex % packageIcons.length];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Back link */}
      <Link href={`/services/${gig.id}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ChevronLeft className="size-4" /> {t("backToGig")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Requirements form */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-3 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("subtitle")}</p>
          </div>

          {submitError && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive flex items-start gap-2">
              <AlertCircle className="size-4 mt-0.5 shrink-0" />
              {submitError}
            </div>
          )}

          {/* Requirements */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">{t("requirementsTitle")}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{t("requirementsSubtitle")}</p>
            </div>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              rows={5}
              placeholder={t("requirementsPlaceholder")}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-[#B05088]/50 focus:ring-2 focus:ring-[#B05088]/10 resize-none transition-colors"
            />
            <p className="text-xs text-muted-foreground">{t("requirementsHint")}</p>
          </div>

          {/* Trust badges */}
          <div className="rounded-2xl border border-border bg-muted/30 p-5 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">{t("guaranteesTitle")}</h3>
            {[
              { icon: CheckCircle2, label: t("guarantee1") },
              { icon: Shield, label: t("guarantee2") },
              { icon: Clock, label: t("guarantee3") },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="size-6 rounded-lg bg-[#3E9666]/10 flex items-center justify-center shrink-0">
                  <Icon className="size-3.5 text-[#3E9666]" />
                </div>
                {label}
              </div>
            ))}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-[#c71463] hover:bg-[#c71463]/90 text-white font-bold py-6 text-base shadow-lg shadow-[#c71463]/20 transition-all hover:-translate-y-0.5"
          >
            {submitting ? (
              <><Loader2 className="size-4 animate-spin mr-2" />{t("placing")}</>
            ) : t("confirmOrder")} — ${selectedPackage.price.amount}
          </Button>
        </form>

        {/* Right: Order summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-6 rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-5 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShoppingBag className="size-4 text-[#c71463]" />
                {t("orderSummary")}
              </div>
            </div>

            <div className="p-5 flex flex-col gap-5">
              {/* Gig title */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t("service")}</p>
                <p className="text-sm font-semibold text-foreground leading-snug">{gig.title}</p>
                <p className="text-xs text-muted-foreground mt-1">by {gig.sellerName}</p>
              </div>

              {/* Package */}
              <div className="rounded-xl border border-[#B05088]/30 bg-[#B05088]/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-xl bg-[#B05088]/15 flex items-center justify-center shrink-0">
                    <PkgIcon className="size-4 text-[#B05088]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#B05088]">{selectedPackage.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-3">{selectedPackage.description}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#B05088]/20 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  {selectedPackage.deliveryTimeInDays} {selectedPackage.deliveryTimeInDays === 1 ? t("day") : t("days")} {t("delivery")}
                </div>
              </div>

              {/* Price breakdown */}
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("packagePrice")}</span>
                  <span className="font-medium text-foreground">${selectedPackage.price.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("serviceFee")}</span>
                  <span className="font-medium text-foreground">{t("included")}</span>
                </div>
                <div className="h-px bg-border my-1" />
                <div className="flex items-center justify-between font-bold text-base">
                  <span className="text-foreground">{t("total")}</span>
                  <span className="text-[#c71463]">${selectedPackage.price.amount}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">{t("walletNote")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <DashboardGuard>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="size-8 animate-spin text-[#B05088]" /></div>}>
          <CheckoutContent />
        </Suspense>
      </div>
    </DashboardGuard>
  );
}
