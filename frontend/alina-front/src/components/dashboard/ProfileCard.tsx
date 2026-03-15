"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { User, FileText, ImagePlus, Camera, Loader2, Mail, Save, Briefcase, Globe, Github, Linkedin, Twitter, Plus, X, Eye, EyeOff, Clock, DollarSign } from "lucide-react";
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
  const [professionalTitle, setProfessionalTitle] = useState("");
  
  // Skills & Languages (ID-based)
  const [profileSkills, setProfileSkills] = useState<{ id: string; name: string }[]>([]);
  const [availableSkills, setAvailableSkills] = useState<{ id: string; name: string }[]>([]);
  const [profileLangs, setProfileLangs] = useState<{ id: string; name: string; code: string }[]>([]);
  const [availableLangs, setAvailableLangs] = useState<{ id: string; name: string; code: string }[]>([]);
  const [skillBusy, setSkillBusy] = useState<string | null>(null);
  const [langBusy, setLangBusy] = useState<string | null>(null);
  
  // Social Links
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  
  // Preferences
  const [timezone, setTimezone] = useState("");
  const [preferredCurrency, setPreferredCurrency] = useState("USD");
  const [isProfilePublic, setIsProfilePublic] = useState(true);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarLoadError, setAvatarLoadError] = useState(false);

  // Seed form from context
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName ?? user.fullName ?? "");
      setBio(user.bio ?? "");
      setRole((user.role as Role) ?? "buyer");
      
      // Load seller profile settings if seller or both
      if (user.role === "seller" || user.role === "both") {
        apiClient.get("/api/seller/Settings/profile")
          .then(({ data }) => {
            if (data) {
              setTimezone(data.timezone ?? "");
              setPreferredCurrency(data.preferredCurrency ?? "USD");
              setIsProfilePublic(data.isProfilePublic ?? true);
            }
          })
          .catch(() => {});
      }
      // Load available skills + languages catalogs & current profile entries
      apiClient.get("/api/profiles/skills")
        .then(r => setAvailableSkills(r.data)).catch(() => {});
      apiClient.get("/api/profiles/languages")
        .then(r => setAvailableLangs(r.data)).catch(() => {});
      apiClient.get("/api/auth/me")
        .then(({ data }) => {
          setProfileSkills(data.skills ?? []);
          setProfileLangs(data.languages ?? []);
        })
        .catch(() => {});
    }
  }, [user]);

  const apiError = (err: unknown) => {
    const data = (err as { response?: { data?: { error_description?: string; message?: string } } })?.response?.data;
    return data?.error_description ?? data?.message ?? t("errorGeneric");
  };
  
  const handleAddSkill = async (skillId: string) => {
    if (!skillId || profileSkills.some(s => s.id === skillId) || skillBusy) return;
    const skill = availableSkills.find(s => s.id === skillId);
    if (!skill) return;
    setSkillBusy(skillId);
    try {
      await apiClient.post("/api/auth/me/skills", { skillId });
      setProfileSkills(prev => [...prev, { id: skill.id, name: skill.name }]);
    } catch { /* already added or not found — ignore */ }
    finally { setSkillBusy(null); }
  };

  const handleRemoveSkill = async (skillId: string) => {
    if (skillBusy) return;
    setSkillBusy(skillId);
    try {
      await apiClient.delete(`/api/auth/me/skills/${skillId}`);
      setProfileSkills(prev => prev.filter(s => s.id !== skillId));
    } catch { /* ignore */ }
    finally { setSkillBusy(null); }
  };

  const handleAddLang = async (langId: string) => {
    if (!langId || profileLangs.some(l => l.id === langId) || langBusy) return;
    const lang = availableLangs.find(l => l.id === langId);
    if (!lang) return;
    setLangBusy(langId);
    try {
      await apiClient.post("/api/auth/me/languages", { languageId: langId, proficiencyLevel: "Conversational" });
      setProfileLangs(prev => [...prev, lang]);
    } catch { /* ignore */ }
    finally { setLangBusy(null); }
  };

  const handleRemoveLang = async (langId: string) => {
    if (langBusy) return;
    setLangBusy(langId);
    try {
      await apiClient.delete(`/api/auth/me/languages/${langId}`);
      setProfileLangs(prev => prev.filter(l => l.id !== langId));
    } catch { /* ignore */ }
    finally { setLangBusy(null); }
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
        await apiClient.post("/api/auth/me/cover", fd);
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
      // Update basic profile
      await apiClient.put("/api/auth/me", {
        displayName: displayName.trim(),
        bio: bio.trim(),
        userRole: role,
        professionalTitle: professionalTitle.trim() || undefined,
        websiteUrl: websiteUrl.trim() || undefined,
        linkedInUrl: linkedInUrl.trim() || undefined,
        githubUrl: githubUrl.trim() || undefined,
        twitterUrl: twitterUrl.trim() || undefined,
      });
      
      // If seller or both, update seller settings
      if (role === "seller" || role === "both") {
        await apiClient.put("/api/seller/Settings/profile", {
          displayName: displayName.trim(),
          bio: bio.trim(),
          preferredCurrency,
          timezone: timezone.trim() || undefined,
          isProfilePublic,
        });
      }
      
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

  // Reset load-error flag whenever the avatar src changes so a fresh URL is retried
  useEffect(() => { setAvatarLoadError(false); }, [currentAvatar]);
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
      <div className="relative -mt-10 ms-6 w-fit">
        <button
          type="button"
          onClick={() => avatarRef.current?.click()}
          disabled={uploadingAvatar}
          title={t("changeAvatar")}
          aria-label={t("changeAvatar")}
          className="relative group focus:outline-none"
        >
          {currentAvatar && !avatarLoadError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentAvatar}
              alt="Avatar"
              className="rounded-2xl object-cover size-[72px] border-4 border-card"
              onError={() => setAvatarLoadError(true)}
            />
          ) : (
            <div className="flex size-[72px] items-center justify-center rounded-2xl bg-[#B05088]/15 text-[#B05088] text-xl font-semibold border-4 border-card select-none">
              {initials}
            </div>
          )}

          {/* Hover / uploading overlay */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity bg-black/50 rounded-2xl",
            uploadingAvatar ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}>
            {uploadingAvatar
              ? <Loader2 className="size-5 text-white animate-spin" />
              : <ImagePlus className="size-5 text-white" />
            }
          </div>
        </button>

        {/* Persistent camera badge */}
        <button
          type="button"
          onClick={() => avatarRef.current?.click()}
          disabled={uploadingAvatar}
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute -bottom-1.5 -end-1.5 flex size-6 items-center justify-center rounded-full border-2 border-card bg-[#B05088] text-white shadow-sm"
        >
          <Camera className="size-3" />
        </button>

        <input
          ref={avatarRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => handleFileChange(e, "avatar")}
        />
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

        {/* Professional sections (seller/both only) */}
        {(role === "seller" || role === "both") && (
          <>
            {/* Professional Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">{t("professionalTitleLabel")}</label>
              <div className="relative">
                <Briefcase className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={professionalTitle}
                  onChange={(e) => setProfessionalTitle(e.target.value)}
                  placeholder={t("professionalTitlePlaceholder")}
                  className={cn(
                    "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                    "text-sm text-foreground placeholder:text-muted-foreground/60",
                    "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                  )}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">{t("skillsLabel")}</label>
              <select
                value=""
                onChange={(e) => handleAddSkill(e.target.value)}
                disabled={!!skillBusy || availableSkills.length === 0}
                className={cn(
                  "w-full rounded-xl border border-border bg-background px-4 py-2.5",
                  "text-sm text-foreground transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                )}
              >
                <option value="">{availableSkills.length === 0 ? "Loading…" : t("skillsPlaceholder")}</option>
                {availableSkills
                  .filter(s => !profileSkills.some(ps => ps.id === s.id))
                  .map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {profileSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {profileSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-1.5 rounded-lg bg-[#B05088]/10 text-[#B05088] px-3 py-1.5 text-sm"
                    >
                      <span>{skill.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill.id)}
                        disabled={skillBusy === skill.id}
                        className="hover:text-[#B05088]/70 transition-colors disabled:opacity-50"
                      >
                        {skillBusy === skill.id
                          ? <Loader2 className="size-3.5 animate-spin" />
                          : <X className="size-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Languages */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">{t("languagesLabel")}</label>
              <select
                value=""
                onChange={(e) => handleAddLang(e.target.value)}
                disabled={!!langBusy || availableLangs.length === 0}
                className={cn(
                  "w-full rounded-xl border border-border bg-background px-4 py-2.5",
                  "text-sm text-foreground transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                )}
              >
                <option value="">{availableLangs.length === 0 ? "Loading…" : t("languagesPlaceholder")}</option>
                {availableLangs
                  .filter(l => !profileLangs.some(pl => pl.id === l.id))
                  .map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
              {profileLangs.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {profileLangs.map((lang) => (
                    <div
                      key={lang.id}
                      className="flex items-center gap-1.5 rounded-lg bg-[#3E9666]/10 text-[#3E9666] px-3 py-1.5 text-sm"
                    >
                      <span>{lang.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLang(lang.id)}
                        disabled={langBusy === lang.id}
                        className="hover:text-[#3E9666]/70 transition-colors disabled:opacity-50"
                      >
                        {langBusy === lang.id
                          ? <Loader2 className="size-3.5 animate-spin" />
                          : <X className="size-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Social Links Section */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">{t("socialLinksTitle")}</h3>
              
              {/* Website */}
              <div className="flex flex-col gap-1.5 mb-3">
                <label className="text-xs font-medium text-muted-foreground">{t("websiteLabel")}</label>
                <div className="relative">
                  <Globe className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className={cn(
                      "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                      "text-sm text-foreground placeholder:text-muted-foreground/60",
                      "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                    )}
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex flex-col gap-1.5 mb-3">
                <label className="text-xs font-medium text-muted-foreground">{t("linkedInLabel")}</label>
                <div className="relative">
                  <Linkedin className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="url"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className={cn(
                      "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                      "text-sm text-foreground placeholder:text-muted-foreground/60",
                      "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                    )}
                  />
                </div>
              </div>

              {/* GitHub */}
              <div className="flex flex-col gap-1.5 mb-3">
                <label className="text-xs font-medium text-muted-foreground">{t("githubLabel")}</label>
                <div className="relative">
                  <Github className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className={cn(
                      "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                      "text-sm text-foreground placeholder:text-muted-foreground/60",
                      "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                    )}
                  />
                </div>
              </div>

              {/* Twitter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">{t("twitterLabel")}</label>
                <div className="relative">
                  <Twitter className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="url"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="https://twitter.com/yourusername"
                    className={cn(
                      "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                      "text-sm text-foreground placeholder:text-muted-foreground/60",
                      "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">{t("preferencesTitle")}</h3>
              
              {/* Timezone */}
              <div className="flex flex-col gap-1.5 mb-3">
                <label className="text-xs font-medium text-muted-foreground">{t("timezoneLabel")}</label>
                <div className="relative">
                  <Clock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    placeholder={t("timezonePlaceholder")}
                    className={cn(
                      "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                      "text-sm text-foreground placeholder:text-muted-foreground/60",
                      "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                    )}
                  />
                </div>
              </div>

              {/* Currency */}
              <div className="flex flex-col gap-1.5 mb-3">
                <label className="text-xs font-medium text-muted-foreground">{t("currencyLabel")}</label>
                <div className="relative">
                  <DollarSign className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={preferredCurrency}
                    onChange={(e) => setPreferredCurrency(e.target.value)}
                    className={cn(
                      "w-full rounded-xl border border-border bg-background ps-10 pe-4 py-2.5",
                      "text-sm text-foreground appearance-none cursor-pointer",
                      "transition-colors outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                    )}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>
              </div>

              {/* Profile Visibility */}
              <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                <div className="flex items-center gap-3">
                  {isProfilePublic ? (
                    <Eye className="size-4 text-[#3E9666]" />
                  ) : (
                    <EyeOff className="size-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{t("profileVisibilityLabel")}</p>
                    <p className="text-xs text-muted-foreground">{t("profileVisibilityHint")}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProfilePublic(!isProfilePublic)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    isProfilePublic ? "bg-[#3E9666]" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      isProfilePublic ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </>
        )}

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
