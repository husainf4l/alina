"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { GoogleLogin } from "@react-oauth/google";
import apiClient from "@/lib/apiClient";

export default function LoginForm() {
  const t = useTranslations("Auth");
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot password state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setForgotLoading(true);
    try {
      await apiClient.post("/api/auth/forgot-password", { email: forgotEmail });
      setForgotSuccess(true);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setForgotError(msg ?? t("errorGeneric"));
    } finally {
      setForgotLoading(false);
    }
  };

  const closeForgot = () => {
    setForgotOpen(false);
    setForgotEmail("");
    setForgotSuccess(false);
    setForgotError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const data = (err as { response?: { data?: { error_description?: string; message?: string } } })?.response?.data;
      setError(data?.error_description ?? data?.message ?? t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  if (forgotOpen) {
    return (
      <div className="flex flex-col gap-5">
        <button
          type="button"
          onClick={closeForgot}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="size-4" /> {t("backToLogin")}
        </button>

        <div>
          <h2 className="text-xl font-bold text-foreground">{t("forgotTitle")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("forgotSubtitle")}</p>
        </div>

        {forgotSuccess ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="size-14 rounded-2xl bg-[#3E9666]/10 flex items-center justify-center">
              <CheckCircle2 className="size-7 text-[#3E9666]" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{t("forgotSuccessTitle")}</p>
              <p className="text-sm text-muted-foreground mt-1">{t("forgotSuccessDesc")}</p>
            </div>
            <Button type="button" variant="outline" onClick={closeForgot} className="rounded-xl">
              {t("backToLogin")}
            </Button>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleForgotSubmit}>
            {forgotError && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                {forgotError}
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">{t("emailLabel")}</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  autoComplete="email"
                  placeholder={t("emailPlaceholder")}
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className={cn(
                    "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                    "text-sm text-foreground placeholder:text-muted-foreground/60",
                    "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                  )}
                />
              </div>
            </div>
            <Button type="submit" disabled={forgotLoading} className="rounded-xl py-2.5">
              {forgotLoading ? (
                <><Loader2 className="size-4 animate-spin mr-2" />{t("forgotSending")}</>
              ) : t("forgotSendButton")}
            </Button>
          </form>
        )}
      </div>
    );
  }

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    if (!credentialResponse.credential) return;
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle(credentialResponse.credential);
      router.push("/dashboard");
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
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            {t("passwordLabel")}
          </label>
          <button
            type="button"
            onClick={() => setForgotOpen(true)}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("forgotPassword")}
          </button>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
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
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading} className="mt-1 w-full rounded-xl py-2.5">
        {loading ? t("loading") : t("loginButton")}
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
          text="signin_with"
        />
      </div>
    </form>
  );
}
