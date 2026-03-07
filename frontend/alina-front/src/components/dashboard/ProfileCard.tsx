"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { User, FileText, ImagePlus, Mail, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, normalizeImageUrl } from "@/lib/utils";
import apiClient from "@/lib/apiClient";

type Role = "buyer" | "seller" | "both";

const ROLE_KEYS: Role[] = ["buyer", "seller", "both"];

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

  // Seed form from context
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
        await apiClient.post("/api/auth/me/avatar", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        await refreshUser();
      } catch (err) {
        setError(apiError(err));
      } finally {
        setUploadingAvatar(false);
      }
    } else {
      setCoverPreview(preview);
      setUploadingCover(true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        await apiClient.post("/api/auth/me/cover", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        await refreshUser();
      } catch (err) {
        setError(apiError(err));
      } finally {
        setUploadingCover(false);
      }
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
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const currentAvatar = avatarPreview ?? normalizeImageUrl(user?.avatarUrl);
  const currentCover = coverPreview ?? normalizeImageUrl(user?.coverUrl);
  const initials = (user?.fullName ?? "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  return (
    <div className="rounded-3xl border border-border bg-card overflow-hidden">
      {/* Cover image */}
      <div
        className="relative h-36 w-full bg-gradient-to-br from-[#B05088]/20 to-[#B05088]/5 cursor-pointer group"
        onClick={() => coverRef.current?.click()}
      >
        {currentCover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentCover}
            alt="Cover"
            className="absolute inset-0 size-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-t-3xl">
          <div className="flex items-center gap-2 rounded-xl bg-black/60 px-3 py-1.5 text-xs text-white">
            <ImagePlus className="size-3.5" />
            {uploadingCover ? t("uploading") : t("changeCover")}
          </div>
        </div>
        <input
          ref={coverRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => handleFileChange(e, "cover")}
        />
      </div>

      {/* Avatar */}
      <div className="relative -mt-10 ms-6">
        <button
          type="button"
          onClick={() => avatarRef.current?.click()}
          className="relative group"
        >
          {currentAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentAvatar}
              alt="Avatar"
              className="rounded-2xl object-cover size-[72px] border-4 border-card"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <div className="flex size-[72px] items-center justify-center rounded-2xl bg-[#B05088]/15 text-[#B05088] text-xl font-semibold border-4 border-card select-none">
              {initials}
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-2xl">
            <ImagePlus className="size-4 text-white" />
          </div>
        </button>
        <input
          ref={avatarRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => handleFileChange(e, "avatar")}
        />
        {uploadingAvatar && (
          <span className="ms-2 text-xs text-muted-foreground animate-pulse">{t("uploading")}</span>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 pb-6 pt-4">
        {/* Email (read-only) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">{t("emailLabel")}</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={user?.email ?? ""}
              disabled
              className={cn(
                "w-full rounded-xl border border-border bg-muted ps-10 pe-4 py-2.5",
                "text-sm text-muted-foreground cursor-not-allowed"
              )}
            />
          </div>
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
          <label className="text-sm font-medium text-foreground">{t("bioLabel")}</label>
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

        {/* Role */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">{t("roleLabel")}</label>
          <div className="flex gap-2">
            {ROLE_KEYS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  "flex-1 rounded-xl border py-2 text-sm font-medium transition-all",
                  role === r
                    ? "border-[#B05088] bg-[#B05088]/10 text-[#B05088]"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                )}
              >
                {t(`role_${r}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {error && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-600 dark:text-green-400">
            {t("saveSuccess")}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl py-2.5 flex items-center justify-center gap-2"
        >
          <Save className="size-4" />
          {loading ? t("saving") : t("saveButton")}
        </Button>
      </form>
    </div>
  );
}
