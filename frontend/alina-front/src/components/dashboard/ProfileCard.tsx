"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import {
  FileText,
  ImagePlus,
  Mail,
  Save,
  Loader2,
  Check,
  AlertCircle,
  X,
  ShieldCheck,
  Camera,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, normalizeImageUrl } from "@/lib/utils";
import apiClient from "@/lib/apiClient";

type Role = "buyer" | "seller" | "both";
const ROLE_KEYS: Role[] = ["buyer", "seller", "both"];

const ROLE_META: Record<Role, { color: string; bg: string; desc: string }> = {
  buyer:  { color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-500/10 border-blue-500/30",   desc: "Hire top freelancers" },
  seller: { color: "text-[#3E9666]",                      bg: "bg-[#3E9666]/10 border-[#3E9666]/30", desc: "Offer your skills" },
  both:   { color: "text-[#B05088]",                      bg: "bg-[#B05088]/10 border-[#B05088]/30", desc: "Buy and sell" },
};

export default function ProfileCard() {
  const t = useTranslations("Profile");
  const { user, refreshUser } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState<Role>("buyer");

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName ?? user.fullName ?? "");
      setBio(user.bio ?? "");
      setRole((user.role as Role) ?? "buyer");
    }
  }, [user]);

  const apiError = (err: unknown) => {
    const data = (err as { response?: { data?: { error_description?: string; message?: string } } })?.response?.data;
    return data?.error_description ?? data?.message ?? t("errorGeneric");
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (type === "avatar") {
      setAvatarPreview(preview);
      setUploadingAvatar(true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        await apiClient.post("/api/auth/me/avatar", fd);
        await refreshUser();
      } catch (err) { setError(apiError(err)); }
      finally { setUploadingAvatar(false); }
    } else {
      setCoverPreview(preview);
      setUploadingCover(true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        await apiClient.post("/api/auth/me/cover", fd);
        await refreshUser();
      } catch (err) { setError(apiError(err)); }
      finally { setUploadingCover(false); }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      await apiClient.put("/api/auth/me", {
        displayName: displayName.trim(),
        bio: bio.trim(),
        userRole: role,
      });
      await refreshUser();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) { setError(apiError(err)); }
    finally { setLoading(false); }
  };

  const currentAvatar = avatarPreview ?? normalizeImageUrl(user?.avatarUrl);
  const currentCover  = coverPreview  ?? normalizeImageUrl(user?.coverUrl);
  const initials = (user?.fullName ?? "")
    .split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase() || "?";

  const completion = user?.profileCompletionPercentage ?? 0;
  const completionColor = completion >= 80 ? "#3E9666" : completion >= 40 ? "#B05088" : "#c71463";

  const checklist = [
    { label: "Profile photo",    done: !!(avatarPreview || user?.avatarUrl) },
    { label: "Display name",     done: displayName.trim().length > 0 },
    { label: "Bio (20+ chars)",  done: bio.trim().length >= 20 },
    { label: "Role selected",    done: !!role },
    { label: "Cover photo",      done: !!(coverPreview || user?.coverUrl) },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">

      {/* Cover + Avatar hero */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div
          className="relative h-48 w-full bg-gradient-to-br from-[#B05088]/25 via-[#c71463]/10 to-[#B05088]/5 cursor-pointer group"
          onClick={() => coverRef.current?.click()}
        >
          {currentCover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentCover} alt="Cover" className="absolute inset-0 size-full object-cover" />
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 rounded-t-2xl">
            <div className="flex items-center gap-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm text-white font-medium">
              <Camera className="size-4" />
              {uploadingCover
                ? <><Loader2 className="size-3.5 animate-spin" /> {t("uploading")}</>
                : t("changeCover")}
            </div>
          </div>
          <input ref={coverRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden"
            onChange={(e) => handleFileChange(e, "cover")} />
        </div>

        <div className="flex items-end justify-between px-6 -mt-12 pb-5">
          <div className="relative">
            <button type="button" onClick={() => avatarRef.current?.click()} className="group block">
              {currentAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={currentAvatar} alt="Avatar"
                  className="size-24 rounded-2xl object-cover border-4 border-card shadow-lg" />
              ) : (
                <div className="size-24 rounded-2xl bg-[#B05088]/15 border-4 border-card shadow-lg flex items-center justify-center text-2xl font-bold text-[#B05088] select-none">
                  {initials}
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/50 rounded-2xl">
                <Camera className="size-5 text-white" />
              </div>
            </button>
            {uploadingAvatar && (
              <span className="absolute -bottom-5 left-0 text-[11px] text-muted-foreground animate-pulse whitespace-nowrap">
                {t("uploading")}
              </span>
            )}
            <input ref={avatarRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden"
              onChange={(e) => handleFileChange(e, "avatar")} />
          </div>

          <div className="pb-1 text-right">
            <p className="text-base font-bold text-foreground leading-tight">
              {user?.displayName || user?.fullName || "\u2014"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
            <span className={cn(
              "mt-1.5 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize",
              ROLE_META[role]?.bg, ROLE_META[role]?.color
            )}>
              <ShieldCheck className="size-3" /> {role}
            </span>
          </div>
        </div>
      </div>

      {/* Form + Sidebar */}
      <div className="flex gap-6 items-start">

        {/* Left: form */}
        <div className="flex-1 min-w-0">
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl border border-border bg-card p-8 flex flex-col gap-6">

              <div>
                <h2 className="text-lg font-bold text-foreground">{t("sectionPersonal")}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{t("sectionPersonalSub")}</p>
              </div>

              {/* Email */}
              <Field label={t("emailLabel")}>
                <div className="relative">
                  <Mail className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="email" value={user?.email ?? ""} disabled
                    className="w-full rounded-xl border border-border bg-muted ps-10 pe-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{t("emailHint")}</p>
              </Field>

              {/* Full Name */}
              <Field label={t("fullNameLabel")}>
                <div className="relative">
                  <User className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" value={user?.fullName ?? ""} disabled
                    className="w-full rounded-xl border border-border bg-muted ps-10 pe-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{t("fullNameHint")}</p>
              </Field>

              {/* Display Name */}
              <Field label={t("displayNameLabel")} hint={t("optional")}>
                <div className="relative">
                  <Sparkles className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t("displayNamePlaceholder")}
                    maxLength={60}
                    className={`${inputCls} ps-10 pe-14`} />
                  <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground tabular-nums">
                    {displayName.length}/60
                  </span>
                </div>
              </Field>

              {/* Bio */}
              <Field label={t("bioLabel")} hint={`${bio.length}/300`}>
                <div className="relative">
                  <FileText className="pointer-events-none absolute start-3 top-3 size-4 text-muted-foreground" />
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)}
                    placeholder={t("bioPlaceholder")} rows={4} maxLength={300}
                    className={cn(inputCls, "ps-10 resize-none")} />
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300 bg-[#B05088]"
                    style={{ width: `${Math.min((bio.length / 300) * 100, 100)}%` }} />
                </div>
              </Field>

              {/* Role */}
              <Field label={t("roleLabel")}>
                <div className="grid grid-cols-3 gap-3">
                  {ROLE_KEYS.map((r) => {
                    const meta = ROLE_META[r];
                    const active = role === r;
                    return (
                      <button key={r} type="button" onClick={() => setRole(r)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-xl border py-3.5 px-3 transition-all",
                          active ? cn("border-current", meta.bg, meta.color)
                                 : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                        )}>
                        <span className="text-sm font-semibold">{t(`role_${r}`)}</span>
                        <span className={cn("text-[10px] font-normal", active ? "opacity-80" : "text-muted-foreground/60")}>
                          {meta.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Field>

              {/* Feedback */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="size-4 mt-0.5 shrink-0" />
                  <span className="flex-1">{error}</span>
                  <button type="button" onClick={() => setError(null)}><X className="size-4" /></button>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-600 dark:text-green-400">
                  <Check className="size-4" /> {t("saveSuccess")}
                </div>
              )}

              <Button type="submit" disabled={loading}
                className="w-full rounded-xl py-2.5 gap-2 bg-[#B05088] hover:bg-[#9a4478] text-white">
                {loading
                  ? <><Loader2 className="size-4 animate-spin" /> {t("saving")}</>
                  : <><Save className="size-4" /> {t("saveButton")}</>}
              </Button>
            </div>
          </form>
        </div>

        {/* Right: completion panel */}
        <div className="w-72 shrink-0 hidden lg:block">
          <div className="sticky top-6 flex flex-col gap-4">

            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                {t("completionTitle")}
              </p>
              <div className="flex items-center gap-4 mb-5">
                <div className="relative size-16 shrink-0">
                  <svg className="size-16 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor"
                      className="text-muted/40" strokeWidth="5" />
                    <circle cx="28" cy="28" r="22" fill="none" stroke={completionColor}
                      strokeWidth="5" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 22}`}
                      strokeDashoffset={`${2 * Math.PI * 22 * (1 - completion / 100)}`}
                      style={{ transition: "stroke-dashoffset 0.6s ease" }} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold"
                    style={{ color: completionColor }}>
                    {completion}%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {completion >= 80 ? t("completionGreat") : completion >= 40 ? t("completionGood") : t("completionStart")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t("completionSub")}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                {checklist.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <div className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full transition-colors",
                      item.done ? "bg-[#3E9666] text-white" : "border-2 border-muted-foreground/30"
                    )}>
                      {item.done && <Check className="size-3" />}
                    </div>
                    <span className={cn("text-xs", item.done ? "line-through text-muted-foreground" : "text-foreground")}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                {t("tipsTitle")}
              </p>
              <ul className="flex flex-col gap-3 text-xs text-muted-foreground">
                {([t("tip1"), t("tip2"), t("tip3")] as string[]).map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#B05088] block" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// \u2500\u2500 Helpers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

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
