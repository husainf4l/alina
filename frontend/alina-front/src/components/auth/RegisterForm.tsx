"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterForm() {
  const t = useTranslations("Auth");
  const { register, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError(t("errorPasswordMismatch"));
      return;
    }
    setLoading(true);
    try {
      const result = await register(`${firstName} ${lastName}`.trim(), email, password);
      // New users always go to onboarding (profile is 0% on first registration)
      if (result.isNewUser || result.user.profileCompletionPercentage < 50) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const data = (err as { response?: { data?: { error_description?: string; message?: string } } })?.response?.data;
      setError(data?.error_description ?? data?.message ?? t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    if (!credentialResponse.credential) return;
    setError(null);
    setLoading(true);
    try {
      const result = await loginWithGoogle(credentialResponse.credential);
      if (result.isNewUser || result.user.profileCompletionPercentage < 50) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError(t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

      {/* Error message */}
      {error && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* First + Last name row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            {t("firstNameLabel")}
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              autoComplete="given-name"
              placeholder={t("firstNamePlaceholder")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={cn(
                "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                "text-sm text-foreground placeholder:text-muted-foreground/60",
                "transition-colors outline-none",
                "focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            {t("lastNameLabel")}
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              autoComplete="family-name"
              placeholder={t("lastNamePlaceholder")}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={cn(
                "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                "text-sm text-foreground placeholder:text-muted-foreground/60",
                "transition-colors outline-none",
                "focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
              )}
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          {t("emailLabel")}
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={cn(
              "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
              "text-sm text-foreground placeholder:text-muted-foreground/60",
              "transition-colors outline-none",
              "focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
            )}
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          {t("passwordLabel")}
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={cn(
              "w-full rounded-xl border border-border bg-background ps-10 pe-10 py-2.5",
              "text-sm text-foreground placeholder:text-muted-foreground/60",
              "transition-colors outline-none",
              "focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Confirm password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          {t("confirmPasswordLabel")}
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder={t("confirmPasswordPlaceholder")}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className={cn(
              "w-full rounded-xl border border-border bg-background ps-10 pe-10 py-2.5",
              "text-sm text-foreground placeholder:text-muted-foreground/60",
              "transition-colors outline-none",
              "focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((p) => !p)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading} className="mt-1 w-full rounded-xl py-2.5">
        {loading ? t("loading") : t("registerButton")}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t("dividerText")}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Google OAuth */}
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError(t("errorGeneric"))}
          useOneTap={false}
          shape="rectangular"
          size="large"
          width="100%"
          text="signup_with"
        />
      </div>

      {/* Terms */}
      <p className="text-center text-xs text-muted-foreground leading-relaxed">
        {t("termsText")}{" "}
        <Link href="/terms" className="underline underline-offset-2 hover:text-foreground transition-colors">
          {t("termsLink")}
        </Link>{" "}
        {t("andText")}{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors">
          {t("privacyLink")}
        </Link>
      </p>
    </form>
  );
}
