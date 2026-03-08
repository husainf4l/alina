"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn, normalizeImageUrl } from "@/lib/utils";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Loader2,
  Check,
  AlertCircle,
  X,
  Star,
  Clock,
  Tag,
  FileText,
  Image as ImageIcon,
  Eye,
  DollarSign,
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

const STEP_ICONS = {
  basics: Tag,
  details: FileText,
  media: ImageIcon,
};

export default function CreateGigForm() {
  const t = useTranslations("CreateGig");
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("basics");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedParentId, setSelectedParentId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingMainImage, setUploadingMainImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

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

  const handleParentChange = (parentId: string) => {
    setSelectedParentId(parentId);
    const parent = categories.find((c) => c.id === parentId);
    // If no subcategories, the parent itself is the selectable category
    if (parent && (!parent.subCategories || parent.subCategories.length === 0)) {
      set("categoryId", parentId);
    } else {
      set("categoryId", "");
    }
  };

  const handleMediaUpload = async (
    file: File,
    type: "main" | "gallery"
  ): Promise<void> => {
    if (type === "main") setUploadingMainImage(true);
    else setUploadingGallery(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await apiClient.post<{ url: string }>("/api/media/upload", fd);
      const url = normalizeImageUrl(data.url) ?? data.url;
      if (type === "main") {
        set("mainImage", url);
      } else if (form.galleryImages.length < 5) {
        set("galleryImages", [...form.galleryImages, url]);
      }
    } catch (err: unknown) {
      const d = (err as { response?: { data?: { message?: string; error_description?: string } } })?.response?.data;
      setError(d?.message ?? d?.error_description ?? t("errorGeneric"));
    } finally {
      if (type === "main") setUploadingMainImage(false);
      else setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (idx: number) =>
    set("galleryImages", form.galleryImages.filter((_, i) => i !== idx));

  const canProceed = () => {
    if (step === "basics")
      return form.title.trim().length >= 10 && form.categoryId !== "";
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
      const data = (err as { response?: { data?: { message?: string; error_description?: string } } })?.response?.data;
      setError(data?.message ?? data?.error_description ?? t("errorGeneric"));
    } finally {
      setSubmitting(false);
    }
  };

  const stepIndex = STEPS.indexOf(step);

  // Resolve selected category name for preview
  const selectedCategory = categories
    .flatMap((c) => (c.subCategories?.length ? c.subCategories : [c]))
    .find((c) => c.id === form.categoryId);

  // Role guard
  const isSeller = user?.role === "seller" || user?.role === "both";
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
    <div className="flex flex-col gap-6 w-full">

      {/* ── Top Step Bar ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card px-6 py-4">
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => {
            const Icon = STEP_ICONS[s];
            const done = i < stepIndex;
            const active = i === stepIndex;
            return (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => done && setStep(s)}
                  disabled={!done}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all",
                    active && "bg-[#B05088]/10",
                    done && "cursor-pointer hover:bg-muted/60",
                    !active && !done && "cursor-default"
                  )}
                >
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                      done && "bg-[#B05088] text-white",
                      active && "bg-[#B05088] text-white ring-4 ring-[#B05088]/20",
                      !done && !active && "bg-muted text-muted-foreground"
                    )}
                  >
                    {done ? <Check className="size-4" /> : <Icon className="size-3.5" />}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className={cn("text-xs font-semibold leading-tight", active ? "text-[#B05088]" : done ? "text-foreground" : "text-muted-foreground")}>
                      {t(`step${s.charAt(0).toUpperCase() + s.slice(1)}`)}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      {s === "basics" && (form.title ? form.title.slice(0, 28) + (form.title.length > 28 ? "…" : "") : "Title & Category")}
                      {s === "details" && (form.startingPrice ? `$${form.startingPrice} · ${form.deliveryTimeInDays}d` : "Price & Description")}
                      {s === "media" && (form.mainImage ? "Image added ✓" : "Photos")}
                    </p>
                  </div>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={cn("flex-1 h-px mx-2 transition-colors", i < stepIndex ? "bg-[#B05088]" : "bg-border")} />
                )}
              </div>
            );
          })}

          {/* Step counter right */}
          <span className="ml-4 shrink-0 text-xs text-muted-foreground font-medium hidden md:block">
            {stepIndex + 1} / {STEPS.length}
          </span>
        </div>
      </div>

      {/* ── Main Content: Form + Preview ─────────────────────────── */}
      <div className="flex gap-6 items-start">

        {/* ── Left: Form ── */}
        <div className="flex-1 min-w-0">
          <div className="rounded-2xl border border-border bg-card p-8">

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="size-4 mt-0.5 shrink-0" />
                <span>{error}</span>
                <button onClick={() => setError(null)} className="ml-auto shrink-0"><X className="size-4" /></button>
              </div>
            )}

            {/* ── Step 1: Basics ── */}
            {step === "basics" && (
              <div className="flex flex-col gap-7">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{t("stepBasicsTitle")}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{t("stepBasicsSubtitle")}</p>
                </div>

                {/* Title */}
                <Field label={t("titleLabel")}>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => set("title", e.target.value)}
                      maxLength={150}
                      placeholder={t("titlePlaceholder")}
                      className={inputCls}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground tabular-nums">
                      {form.title.length}/150
                    </span>
                  </div>
                  {/* Title progress bar */}
                  <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((form.title.length / 150) * 100, 100)}%`,
                        backgroundColor: form.title.length < 10 ? "#e5e7eb" : form.title.length < 60 ? "#B05088" : "#3E9666",
                      }}
                    />
                  </div>
                  {form.title.length > 0 && form.title.length < 10 && (
                    <p className="text-xs text-amber-500 mt-1">At least {10 - form.title.length} more characters needed</p>
                  )}
                </Field>

                {/* Category */}
                <Field label={t("categoryLabel")}>
                  {loadingCategories ? (
                    <div className="flex items-center gap-2 h-11 rounded-xl border border-border bg-muted/40 px-3 text-sm text-muted-foreground">
                      <Loader2 className="size-4 animate-spin" />
                      {t("loadingCategories")}
                    </div>
                  ) : (
                    <select
                      value={selectedParentId}
                      onChange={(e) => handleParentChange(e.target.value)}
                      className={inputCls}
                    >
                      <option value="">{t("categoryPlaceholder")}</option>
                      {categories.map((parent) => (
                        <option key={parent.id} value={parent.id}>{parent.name}</option>
                      ))}
                    </select>
                  )}
                </Field>

                {/* Sub-category — shown only when a parent with subs is selected */}
                {(() => {
                  const parent = categories.find((c) => c.id === selectedParentId);
                  const subs = parent?.subCategories ?? [];
                  if (!selectedParentId || subs.length === 0) return null;
                  return (
                    <Field label={t("subCategoryLabel")}>
                      <select
                        value={form.categoryId}
                        onChange={(e) => set("categoryId", e.target.value)}
                        className={inputCls}
                      >
                        <option value="">{t("subCategoryPlaceholder")}</option>
                        {subs.map((sub) => (
                          <option key={sub.id} value={sub.id}>{sub.name}</option>
                        ))}
                      </select>
                      {selectedCategory && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B05088]/10 px-3 py-1 text-xs font-medium text-[#B05088]">
                            <Check className="size-3" /> {selectedCategory.name}
                          </span>
                        </div>
                      )}
                    </Field>
                  );
                })()}
              </div>
            )}

            {/* ── Step 2: Details ── */}
            {step === "details" && (
              <div className="flex flex-col gap-7">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{t("stepDetailsTitle")}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{t("stepDetailsSubtitle")}</p>
                </div>

                {/* Description */}
                <Field label={t("descriptionLabel")}>
                  <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={7}
                    maxLength={5000}
                    placeholder={t("descriptionPlaceholder")}
                    className={cn(inputCls, "resize-none leading-relaxed")}
                  />
                  <div className="mt-1.5 flex items-center justify-between">
                    <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden mr-3">
                      <div
                        className="h-full rounded-full transition-all duration-300 bg-[#B05088]"
                        style={{ width: `${Math.min((form.description.length / 5000) * 100, 100)}%` }}
                      />
                    </div>
                    <span className={cn("text-xs tabular-nums", form.description.length < 30 ? "text-amber-500" : "text-muted-foreground")}>
                      {form.description.length}/5000
                    </span>
                  </div>
                  {form.description.length > 0 && form.description.length < 30 && (
                    <p className="text-xs text-amber-500 mt-1">At least {30 - form.description.length} more characters needed</p>
                  )}
                </Field>

                {/* Price + Delivery */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label={t("priceLabel")}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <DollarSign className="size-4" />
                      </span>
                      <input
                        type="number"
                        min={1}
                        step={0.01}
                        value={form.startingPrice}
                        onChange={(e) => set("startingPrice", e.target.value)}
                        placeholder="5.00"
                        className={cn(inputCls, "pl-9")}
                      />
                    </div>
                  </Field>

                  <Field label={t("deliveryLabel")}>
                    <div className="relative">
                      <input
                        type="number"
                        min={1}
                        max={365}
                        value={form.deliveryTimeInDays}
                        onChange={(e) => set("deliveryTimeInDays", e.target.value)}
                        className={cn(inputCls, "pr-14")}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        {t("days")}
                      </span>
                    </div>
                  </Field>
                </div>

                {/* Quick delivery presets */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Quick select delivery time</p>
                  <div className="flex flex-wrap gap-2">
                    {[1, 3, 7, 14, 30].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => set("deliveryTimeInDays", String(d))}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium border transition-all",
                          form.deliveryTimeInDays === String(d)
                            ? "bg-[#B05088] text-white border-[#B05088]"
                            : "border-border text-muted-foreground hover:border-[#B05088]/50"
                        )}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 3: Media ── */}
            {step === "media" && (
              <div className="flex flex-col gap-7">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{t("stepMediaTitle")}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{t("stepMediaSubtitle")}</p>
                </div>

                {/* Main Image */}
                <Field label={t("mainImageLabel")} hint={t("optional")}>
                  <input
                    ref={mainImageRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleMediaUpload(file, "main");
                      e.target.value = "";
                    }}
                  />
                  {form.mainImage ? (
                    <div className="group relative rounded-2xl overflow-hidden border border-border bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.mainImage}
                        alt="Main image preview"
                        className="h-56 w-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => mainImageRef.current?.click()}
                          className="flex items-center gap-1.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 text-white text-sm font-medium hover:bg-white/30 transition-colors"
                        >
                          <ImagePlus className="size-4" /> {t("changeImage")}
                        </button>
                        <button
                          type="button"
                          onClick={() => set("mainImage", "")}
                          className="flex items-center gap-1.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 text-white text-sm font-medium hover:bg-white/30 transition-colors"
                        >
                          <X className="size-4" /> {t("removeImage")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => mainImageRef.current?.click()}
                      disabled={uploadingMainImage}
                      className="group relative flex flex-col items-center justify-center gap-3 h-56 w-full rounded-2xl border-2 border-dashed border-border hover:border-[#B05088] hover:bg-[#B05088]/5 transition-all text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploadingMainImage ? (
                        <>
                          <Loader2 className="size-10 animate-spin text-[#B05088]" />
                          <span className="text-sm font-medium">{t("uploadingImage")}</span>
                        </>
                      ) : (
                        <>
                          <div className="flex size-16 items-center justify-center rounded-2xl bg-muted group-hover:bg-[#B05088]/10 transition-colors">
                            <ImagePlus className="size-8 group-hover:text-[#B05088] transition-colors" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold group-hover:text-[#B05088] transition-colors">{t("clickToUpload")}</p>
                            <p className="text-xs opacity-70 mt-0.5">{t("imageHint")}</p>
                          </div>
                        </>
                      )}
                    </button>
                  )}
                </Field>

                {/* Gallery */}
                <Field label={t("galleryLabel")} hint={`${form.galleryImages.length}/5 · ${t("optional")}`}>
                  <input
                    ref={galleryRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleMediaUpload(file, "gallery");
                      e.target.value = "";
                    }}
                  />

                  <div className="grid grid-cols-4 gap-3">
                    {/* Existing gallery images */}
                    {form.galleryImages.map((url, i) => (
                      <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={`Gallery ${i + 1}`}
                          className="h-full w-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(i)}
                          className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* Add button */}
                    {form.galleryImages.length < 5 && (
                      <button
                        type="button"
                        onClick={() => galleryRef.current?.click()}
                        disabled={uploadingGallery}
                        className="group aspect-square rounded-xl border-2 border-dashed border-border hover:border-[#B05088] hover:bg-[#B05088]/5 transition-all flex flex-col items-center justify-center gap-1.5 text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploadingGallery ? (
                          <Loader2 className="size-6 animate-spin text-[#B05088]" />
                        ) : (
                          <>
                            <ImagePlus className="size-6 group-hover:text-[#B05088] transition-colors" />
                            <span className="text-[10px] font-medium group-hover:text-[#B05088] transition-colors">{t("addImage")}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Add up to 5 gallery photos to showcase your work</p>
                </Field>
              </div>
            )}

            {/* ── Navigation ── */}
            <div className="mt-10 flex items-center justify-between pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={step === "basics" ? () => router.push("/dashboard/gigs") : prevStep}
                className="rounded-xl gap-1.5"
              >
                <ChevronLeft className="size-4" />
                {step === "basics" ? t("cancel") : t("back")}
              </Button>

              <div className="flex items-center gap-3">
                {/* Dot indicators */}
                <div className="flex gap-1.5">
                  {STEPS.map((s, i) => (
                    <div
                      key={s}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === stepIndex ? "w-5 bg-[#B05088]" : i < stepIndex ? "w-1.5 bg-[#B05088]/40" : "w-1.5 bg-border"
                      )}
                    />
                  ))}
                </div>

                {step !== "media" ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="rounded-xl gap-1.5 bg-[#B05088] hover:bg-[#B05088]/90 text-white"
                  >
                    {t("next")}
                    <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="rounded-xl gap-1.5 min-w-32 bg-[#B05088] hover:bg-[#B05088]/90 text-white"
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
        </div>

        {/* ── Right: Live Preview ── */}
        <div className="w-80 shrink-0 hidden lg:block">
          <div className="sticky top-6 flex flex-col gap-4">
            {/* Preview label */}
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Eye className="size-4" />
              Live Preview
            </div>

            {/* Gig card preview */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              {/* Thumbnail */}
              <div className="relative h-44 bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center overflow-hidden">
                {form.mainImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.mainImage}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                    <ImageIcon className="size-10" />
                    <span className="text-xs">No image yet</span>
                  </div>
                )}
                {selectedCategory && (
                  <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    {selectedCategory.name}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="p-4">
                <p className={cn("text-sm font-semibold leading-snug line-clamp-2 mb-2", !form.title && "text-muted-foreground/40 italic")}>
                  {form.title || "Your gig title will appear here…"}
                </p>

                <p className={cn("text-xs text-muted-foreground mb-3 font-medium", !user?.displayName && "text-muted-foreground/40")}>
                  {user?.displayName || user?.fullName || "Your Name"}
                </p>

                {/* Rating placeholder */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">New</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {form.deliveryTimeInDays ? `${form.deliveryTimeInDays}d delivery` : "—"}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Starting at</p>
                    <p className={cn("text-sm font-bold", !form.startingPrice && "text-muted-foreground/40")}>
                      {form.startingPrice ? `$${parseFloat(form.startingPrice).toFixed(2)}` : "$—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-semibold text-foreground mb-3">Gig Checklist</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Title (10+ chars)", done: form.title.trim().length >= 10 },
                  { label: "Category selected", done: !!form.categoryId },
                  { label: "Description (30+ chars)", done: form.description.trim().length >= 30 },
                  { label: "Price set", done: Number(form.startingPrice) > 0 },
                  { label: "Main image", done: !!form.mainImage },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 text-xs">
                    <div className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-full",
                      item.done ? "bg-[#3E9666]" : "border border-border bg-muted"
                    )}>
                      {item.done && <Check className="size-2.5 text-white" />}
                    </div>
                    <span className={item.done ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-[#B05088]/60 focus:ring-2 focus:ring-[#B05088]/10 transition-colors";

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
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
