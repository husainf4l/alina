"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { User, FileText, ShoppingBag, Briefcase, Layers, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import apiClient from "@/lib/apiClient";
import Image from "next/image";

// Role selection is Step 1 (the decision gate).
// Buyer → immediate save → /dashboard (no more steps needed).
// Seller / Both → profile info required (VAL-07) → then optional avatar.
type Step = "role" | "profile" | "avatar";

// Icons per role
const ROLE_ICONS = {
  buyer: ShoppingBag,
  seller: Briefcase,
  both: Layers,
} as const;

type Role = "buyer" | "seller" | "both";

export default function OnboardingCard() {
  const t = useTranslations("Onboarding");
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role>("buyer");
  const [displayName, setDisplayName] = useState(user?.fullName ?? "");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Avatar / cover state
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const apiError = (err: unknown) => {
    const data = (err as { response?: { data?: { error_description?: string; message?: string } } })?.response?.data;
    return data?.error_description ?? data?.message ?? t("errorGeneric");
  };

  // ── Step 1: Role selection ──────────────────────────────────────────────────
  const handleRoleSelect = async (selected: Role) => {
    setRole(selected);
    setError(null);

    if (selected === "buyer") {
      // Buyers don't need a profile to use the platform — save immediately and go.
      setLoading(true);
      try {
        await apiClient.put("/api/auth/me", { userRole: "buyer" });
        router.push("/dashboard");
      } catch (err) {
        setError(apiError(err));
        setLoading(false);
      }
    } else {
      // Seller / Both: profile info is required (VAL-07) — collect it first.
      setStep("profile");
    }
  };

  // ── Step 2: Profile info (seller / both only) ───────────────────────────────
  // We have everything needed now — send role + profile in one request.
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setError(null);
    setLoading(true);
    try {
      await apiClient.put("/api/auth/me", {
        userRole: role,
        displayName: displayName.trim(),
        bio: bio.trim(),
      });
      setStep("avatar");
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3: Avatar / Cover (optional) ──────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "cover") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === "avatar") { setAvatarFile(file); setAvatarPreview(url); }
    else { setCoverFile(file); setCoverPreview(url); }
  };

  const handleAvatarFinish = async () => {
    if (!avatarFile && !coverFile) {
      router.push("/dashboard");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const fd = new FormData();
      if (avatarFile) fd.append("avatar", avatarFile);
      if (coverFile) fd.append("cover", coverFile);
      await apiClient.post("/api/auth/me/avatar", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/dashboard");
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="animate-fade-up w-full max-w-md rounded-3xl border border-border bg-card shadow-sm px-8 py-10"
      style={{ animationDelay: "60ms" }}
    >
      {/* Progress dots — only meaningful after role is picked for seller/both */}
      {step !== "role" && (
        <div className="mb-8 flex items-center justify-center gap-2">
          {(["profile", "avatar"] as const).map((s) => (
            <div
              key={s}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                step === s
                  ? "w-8 bg-[#B05088]"
                  : step === "avatar" && s === "profile"
                  ? "w-2 bg-[#B05088]/50"
                  : "w-2 bg-border"
              )}
            />
          ))}
        </div>
      )}

      {/* ── Step 1: Intent / Role ── */}
      {step === "role" && (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              <span className="font-[family-name:var(--font-display)] italic font-normal">{t("roleTitle")}</span>{" "}
              <span>{t("roleTitleEnd")}</span>
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{t("roleSubtitle")}</p>
          </div>

          {error && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            {(["buyer", "seller", "both"] as Role[]).map((r) => {
              const Icon = ROLE_ICONS[r];
              return (
                <button
                  key={r}
                  type="button"
                  disabled={loading}
                  onClick={() => handleRoleSelect(r)}
                  className={cn(
                    "flex items-start gap-4 rounded-2xl border p-4 text-start transition-all",
                    "hover:border-[#B05088]/60 hover:bg-[#B05088]/5",
                    "disabled:pointer-events-none disabled:opacity-60"
                  )}
                >
                  <div className="mt-0.5 shrink-0 rounded-xl p-2 bg-muted text-muted-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t(`role_${r}_title`)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(`role_${r}_desc`)}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {loading && (
            <p className="text-center text-sm text-muted-foreground animate-pulse">{t("saving")}</p>
          )}
        </div>
      )}

      {/* ── Step 2: Basic Info (seller / both) ── */}
      {step === "profile" && (
        <form onSubmit={handleProfileSubmit} className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              <span className="font-[family-name:var(--font-display)] italic font-normal">{t("profileTitle")}</span>{" "}
              <span>{t("profileTitleEnd")}</span>
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{t("profileSubtitle")}</p>
          </div>

          {error && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">{t("displayNameLabel")}</label>
            <div className="relative">
              <User className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t("displayNamePlaceholder")}
                required
                className={cn(
                  "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                  "text-sm text-foreground placeholder:text-muted-foreground/60",
                  "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              {t("bioLabel")} <span className="text-muted-foreground font-normal">{t("bioOptional")}</span>
            </label>
            <div className="relative">
              <FileText className="pointer-events-none absolute start-3 top-3 size-4 text-muted-foreground" />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder={t("bioPlaceholder")}
                rows={3}
                className={cn(
                  "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                  "text-sm text-foreground placeholder:text-muted-foreground/60 resize-none",
                  "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                )}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("role")}
              className="flex-1 rounded-xl py-2.5"
            >
              {t("backButton")}
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 rounded-xl py-2.5">
              {loading ? t("saving") : t("nextButton")}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("skipButton")}
          </button>
        </form>
      )}

      {/* ── Step 3: Avatar / Cover (optional) ── */}
      {step === "avatar" && (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              <span className="font-[family-name:var(--font-display)] italic font-normal">{t("avatarTitle")}</span>{" "}
              <span>{t("avatarTitleEnd")}</span>
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{t("avatarSubtitle")}</p>
          </div>

          {error && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Profile picture */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">{t("avatarLabel")}</label>
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className={cn(
                "flex items-center gap-4 rounded-2xl border-2 border-dashed p-4 transition-colors",
                "hover:border-[#B05088]/60 hover:bg-[#B05088]/5",
                avatarPreview ? "border-[#B05088]/40" : "border-border"
              )}
            >
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Avatar preview"
                  width={56}
                  height={56}
                  className="rounded-full object-cover size-14 shrink-0"
                />
              ) : (
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted">
                  <ImagePlus className="size-5 text-muted-foreground" />
                </div>
              )}
              <div className="text-start">
                <p className="text-sm font-medium text-foreground">
                  {avatarFile ? avatarFile.name : t("avatarLabel")}
                </p>
                <p className="text-xs text-muted-foreground">{t("avatarUploadHint")}</p>
              </div>
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => handleFileChange(e, "avatar")}
            />
          </div>

          {/* Cover image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">{t("coverLabel")}</label>
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className={cn(
                "relative flex h-24 w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors overflow-hidden",
                "hover:border-[#B05088]/60 hover:bg-[#B05088]/5",
                coverPreview ? "border-[#B05088]/40" : "border-border"
              )}
            >
              {coverPreview ? (
                <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
              ) : (
                <>
                  <ImagePlus className="size-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t("coverLabel")}</span>
                </>
              )}
            </button>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => handleFileChange(e, "cover")}
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("profile")}
              className="flex-1 rounded-xl py-2.5"
            >
              {t("backButton")}
            </Button>
            <Button
              type="button"
              onClick={handleAvatarFinish}
              disabled={loading}
              className="flex-1 rounded-xl py-2.5"
            >
              {loading ? t("saving") : t("finishButton")}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("avatarSkipButton")}
          </button>
        </div>
      )}
    </div>
  );
}
