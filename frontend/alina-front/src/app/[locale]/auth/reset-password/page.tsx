"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Lock, Eye, EyeOff, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "@/i18n/navigation";
import apiClient from "@/lib/apiClient";
import Navbar from "@/components/Navbar";
import Link from "next/link";

function ResetPasswordForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError(t("resetPasswordTooShort"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t("errorPasswordMismatch"));
      return;
    }

    setLoading(true);
    try {
      await apiClient.post("/api/auth/reset-password", {
        token,
        newPassword,
      });
      setSuccess(true);
      setTimeout(() => router.push("/auth"), 3000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg ?? t("resetError"));
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="size-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="size-7 text-destructive" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{t("resetInvalidTitle")}</p>
          <p className="text-sm text-muted-foreground mt-1">{t("resetInvalidDesc")}</p>
        </div>
        <Link href="/auth">
          <Button variant="outline" className="rounded-xl">{t("backToLogin")}</Button>
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="size-14 rounded-2xl bg-[#3E9666]/10 flex items-center justify-center">
          <CheckCircle2 className="size-7 text-[#3E9666]" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{t("resetSuccessTitle")}</p>
          <p className="text-sm text-muted-foreground mt-1">{t("resetSuccessDesc")}</p>
        </div>
        <Link href="/auth">
          <Button className="rounded-xl bg-[#c71463] hover:bg-[#c71463]/90 text-white">
            {t("backToLogin")}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-xl font-bold text-foreground">{t("resetTitle")}</h2>
        <p className="text-sm text-muted-foreground mt-1">{t("resetSubtitle")}</p>
      </div>

      {error && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive flex items-start gap-2">
          <AlertCircle className="size-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {/* New password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">{t("newPasswordLabel")}</label>
        <div className="relative">
          <Lock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showNew ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            className={cn(
              "w-full rounded-xl border border-border bg-background ps-10 pe-10 py-2.5",
              "text-sm text-foreground placeholder:text-muted-foreground/60",
              "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
            )}
          />
          <button
            type="button"
            onClick={() => setShowNew((p) => !p)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Confirm password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">{t("confirmPasswordLabel")}</label>
        <div className="relative">
          <Lock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className={cn(
              "w-full rounded-xl border border-border bg-background ps-10 pe-10 py-2.5",
              "text-sm text-foreground placeholder:text-muted-foreground/60",
              "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((p) => !p)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="rounded-xl py-2.5 bg-[#c71463] hover:bg-[#c71463]/90 text-white">
        {loading ? (
          <><Loader2 className="size-4 animate-spin mr-2" />{t("loading")}</>
        ) : t("resetButton")}
      </Button>

      <div className="text-center">
        <Link href="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {t("backToLogin")}
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border bg-card shadow-sm p-8">
            <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
