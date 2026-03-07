"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  nameAr: string;
  subCategories?: Category[];
}

interface GigFormData {
  title: string;
  description: string;
  categoryId: string;
  startingPrice: string;
  deliveryTimeInDays: string;
  mainImage: string;
  galleryImages: string[];
}

const STEPS = ["basics", "details", "media"] as const;
type Step = (typeof STEPS)[number];

export default function CreateGigForm() {
  const t = useTranslations("CreateGig");
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("basics");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [galleryInput, setGalleryInput] = useState("");

  const [form, setForm] = useState<GigFormData>({
    title: "",
    description: "",
    categoryId: "",
    startingPrice: "",
    deliveryTimeInDays: "7",
    mainImage: "",
    galleryImages: [],
  });

  useEffect(() => {
    apiClient
      .get("/api/marketplace/categories")
      .then(({ data }) => setCategories(data))
      .catch(() => {})
      .finally(() => setLoadingCategories(false));
  }, []);

  const set = (key: keyof GigFormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addGalleryImage = () => {
    const url = galleryInput.trim();
    if (!url || form.galleryImages.length >= 5) return;
    set("galleryImages", [...form.galleryImages, url]);
    setGalleryInput("");
  };

  const removeGalleryImage = (idx: number) =>
    set(
      "galleryImages",
      form.galleryImages.filter((_, i) => i !== idx)
    );


  const canProceed = () => {
    if (step === "basics")
      return (
        form.title.trim().length >= 10 && form.categoryId !== ""
      );
    if (step === "details")
      return (
        form.description.trim().length >= 30 &&
        Number(form.startingPrice) > 0 &&
        Number(form.deliveryTimeInDays) >= 1
      );
    return true;
  };

  const nextStep = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const prevStep = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await apiClient.post("/api/marketplace/gigs", {
        title: form.title.trim(),
        description: form.description.trim(),
        categoryId: form.categoryId,
        startingPrice: parseFloat(form.startingPrice),
        deliveryTimeInDays: parseInt(form.deliveryTimeInDays),
        mainImage: form.mainImage.trim() || undefined,
        galleryImages: form.galleryImages,
      });
      router.push("/dashboard/gigs");
    } catch (err: unknown) {
      const data = (
        err as {
          response?: { data?: { message?: string; error_description?: string } };
        }
      )?.response?.data;
      setError(data?.message ?? data?.error_description ?? t("errorGeneric"));
    } finally {
      setSubmitting(false);
    }
  };

  const stepIndex = STEPS.indexOf(step);

  // Role guard
  const isSeller =
    user?.role === "seller" || user?.role === "both";

  if (user && !isSeller) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <AlertCircle className="size-12 text-muted-foreground" />
        <p className="text-lg font-semibold">{t("notSellerTitle")}</p>
        <p className="text-sm text-muted-foreground">{t("notSellerBody")}</p>
        <Button onClick={() => router.push("/dashboard/profile")}>
          {t("notSellerCta")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-3">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                i < stepIndex
                  ? "bg-[#B05088] text-white"
                  : i === stepIndex
                  ? "bg-[#B05088]/15 text-[#B05088] border-2 border-[#B05088]"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {i < stepIndex ? <Check className="size-4" /> : i + 1}
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                i === stepIndex
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {t(`step${s.charAt(0).toUpperCase() + s.slice(1)}`)}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-px w-8 transition-colors",
                  i < stepIndex ? "bg-[#B05088]" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-border bg-card p-8">
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="size-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {/* ── Step 1: Basics ── */}
        {step === "basics" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold">{t("stepBasicsTitle")}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t("stepBasicsSubtitle")}</p>
            </div>

            {/* Title */}
            <Field label={t("titleLabel")} hint={`${form.title.length}/150`}>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                maxLength={150}
                placeholder={t("titlePlaceholder")}
                className={inputCls}
              />
            </Field>

            {/* Category */}
            <Field label={t("categoryLabel")}>
              {loadingCategories ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                  <Loader2 className="size-4 animate-spin" />
                  {t("loadingCategories")}
                </div>
              ) : (
                <select
                  value={form.categoryId}
                  onChange={(e) => set("categoryId", e.target.value)}
                  className={inputCls}
                >
                  <option value="">{t("categoryPlaceholder")}</option>
                  {categories.map((parent) => (
                    <optgroup key={parent.id} label={parent.name}>
                      {(parent.subCategories ?? []).length > 0 ? (
                        (parent.subCategories ?? []).map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.name}
                          </option>
                        ))
                      ) : (
                        <option value={parent.id}>{parent.name}</option>
                      )}
                    </optgroup>
                  ))}
                </select>
              )}
            </Field>
          </div>
        )}

        {/* ── Step 2: Details ── */}
        {step === "details" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold">{t("stepDetailsTitle")}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t("stepDetailsSubtitle")}</p>
            </div>

            {/* Description */}
            <Field
              label={t("descriptionLabel")}
              hint={`${form.description.length}/5000`}
            >
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={6}
                maxLength={5000}
                placeholder={t("descriptionPlaceholder")}
                className={cn(inputCls, "resize-none")}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              {/* Starting price */}
              <Field label={t("priceLabel")} hint="USD">
                <input
                  type="number"
                  min={1}
                  step={0.01}
                  value={form.startingPrice}
                  onChange={(e) => set("startingPrice", e.target.value)}
                  placeholder="5.00"
                  className={inputCls}
                />
              </Field>

              {/* Delivery time */}
              <Field label={t("deliveryLabel")} hint={t("days")}>
                <input
                  type="number"
                  min={1}
                  max={365}
                  value={form.deliveryTimeInDays}
                  onChange={(e) => set("deliveryTimeInDays", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
          </div>
        )}

        {/* ── Step 3: Media ── */}
        {step === "media" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold">{t("stepMediaTitle")}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t("stepMediaSubtitle")}</p>
            </div>

            {/* Main image URL */}
            <Field label={t("mainImageLabel")} hint={t("optional")}>
              <div className="flex flex-col gap-3">
                <input
                  type="url"
                  value={form.mainImage}
                  onChange={(e) => set("mainImage", e.target.value)}
                  placeholder="https://..."
                  className={inputCls}
                />
                {form.mainImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.mainImage}
                    alt="Main image preview"
                    className="h-40 w-full rounded-2xl object-cover border border-border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </div>
            </Field>

            {/* Gallery */}
            <Field
              label={t("galleryLabel")}
              hint={`${form.galleryImages.length}/5 · ${t("optional")}`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGalleryImage())}
                    placeholder="https://..."
                    disabled={form.galleryImages.length >= 5}
                    className={cn(inputCls, "flex-1")}
                  />
                  <button
                    type="button"
                    onClick={addGalleryImage}
                    disabled={!galleryInput.trim() || form.galleryImages.length >= 5}
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                      galleryInput.trim() && form.galleryImages.length < 5
                        ? "bg-[#B05088] text-white hover:bg-[#9a4078]"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    <ImagePlus className="size-4" />
                  </button>
                </div>

                {form.galleryImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {form.galleryImages.map((url, i) => (
                      <div key={i} className="group relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={`Gallery ${i + 1}`}
                          className="h-24 w-full rounded-xl object-cover border border-border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(i)}
                          className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Field>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={step === "basics" ? () => router.push("/dashboard/gigs") : prevStep}
            className="rounded-xl gap-1.5"
          >
            <ChevronLeft className="size-4" />
            {step === "basics" ? t("cancel") : t("back")}
          </Button>

          {step !== "media" ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!canProceed()}
              className="rounded-xl gap-1.5"
            >
              {t("next")}
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-xl gap-1.5 min-w-28"
            >
              {submitting ? (
                <><Loader2 className="size-4 animate-spin" /> {t("publishing")}</>
              ) : (
                t("publish")
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-[#B05088]/50 focus:ring-2 focus:ring-[#B05088]/10 transition-colors";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
