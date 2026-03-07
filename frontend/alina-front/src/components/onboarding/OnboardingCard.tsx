"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { User, FileText, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import apiClient from "@/lib/apiClient";

type Step = "profile" | "role";

export default function OnboardingCard() {
  const t = useTranslations("Onboarding");
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("profile");
  const [displayName, setDisplayName] = useState(user?.fullName ?? "");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState<"buyer" | "seller" | "both">("buyer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setStep("role");
  };

  const handleFinish = async () => {
    setError(null);
    setLoading(true);
    try {
      await apiClient.put("/api/auth/me", {
        displayName: displayName.trim(),
        bio: bio.trim(),
        userRole: role,
      });
      router.push("/");
    } catch (err: unknown) {
      const data = (err as { response?: { data?: { error_description?: string; message?: string } } })?.response?.data;
      setError(data?.error_description ?? data?.message ?? t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="animate-fade-up w-full max-w-md rounded-3xl border border-border bg-card shadow-sm px-8 py-10"
      style={{ animationDelay: "60ms" }}
    >
      {/* Progress dots */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {(["profile", "role"] as Step[]).map((s, i) => (
          <div
            key={s}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              step === s ? "w-8 bg-[#B05088]" : i < (step === "role" ? 1 : 0) ? "w-2 bg-[#B05088]/50" : "w-2 bg-border"
            )}
          />
        ))}
      </div>

      {step === "profile" && (
        <form onSubmit={handleProfileNext} className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              <span className="font-[family-name:var(--font-display)] italic font-normal">{t("profileTitle")}</span>{" "}
              <span>{t("profileTitleEnd")}</span>
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{t("profileSubtitle")}</p>
          </div>

          {/* Display name */}
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

          {/* Bio */}
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

          <Button type="submit" className="w-full rounded-xl py-2.5">
            {t("nextButton")}
          </Button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("skipButton")}
          </button>
        </form>
      )}

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

          {/* Role cards */}
          <div className="flex flex-col gap-3">
            {(["buyer", "seller", "both"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  "flex items-start gap-4 rounded-2xl border p-4 text-start transition-all",
                  role === r
                    ? "border-[#B05088] bg-[#B05088]/5 ring-1 ring-[#B05088]"
                    : "border-border hover:border-foreground/30"
                )}
              >
                <div className={cn(
                  "mt-0.5 rounded-xl p-2",
                  role === r ? "bg-[#B05088]/10 text-[#B05088]" : "bg-muted text-muted-foreground"
                )}>
                  <Briefcase className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t(`role_${r}_title`)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(`role_${r}_desc`)}</p>
                </div>
              </button>
            ))}
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
              onClick={handleFinish}
              disabled={loading}
              className="flex-1 rounded-xl py-2.5"
            >
              {loading ? t("saving") : t("finishButton")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
