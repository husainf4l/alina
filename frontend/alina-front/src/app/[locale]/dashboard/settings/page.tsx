"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/lib/apiClient";
import { useCurrency } from "@/context/CurrencyContext";
import { Settings, Globe, Bell, Shield, Save, RefreshCw, Check, Moon, Sun, Monitor, Lock, Trash2, AlertTriangle, User } from "lucide-react";

interface NotificationPrefs {
  email?: { orders?: boolean; messages?: boolean; reviews?: boolean; marketing?: boolean; [k: string]: unknown };
  push?: { orders?: boolean; messages?: boolean; reviews?: boolean; [k: string]: unknown };
  sms?: { orders?: boolean; messages?: boolean; [k: string]: unknown };
}

interface PrivacyPrefs {
  profileVisibility?: string;
  showEmail?: boolean;
  showPhone?: boolean;
  activityStatus?: boolean;
}

interface UserSettings {
  language?: string;
  timezone?: string;
  currency?: string;
  theme?: "light" | "dark" | "system";
  notifications?: NotificationPrefs;
  privacy?: PrivacyPrefs;
}

type TabId = "general" | "notifications" | "privacy" | "appearance" | "security" | "account";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Monitor },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "security", label: "Security", icon: Lock },
  { id: "account", label: "Account", icon: User },
];

const LANGUAGES = ["en", "ar", "fr", "de", "es"];
const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Riyadh",
  "Asia/Tokyo",
];
const VISIBILITIES = ["public", "private", "followers"];

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-[#c71463]" : "bg-gray-200 dark:bg-gray-600"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463]/30"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function SettingsPage() {
  const t = useTranslations("SettingsPage");
  const { user } = useAuth();
  const { rates, ratesLoading, setCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [settings, setSettings] = useState<UserSettings>({});
  const [original, setOriginal] = useState<UserSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Security tab states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  
  // Account deletion
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    apiClient
      .get<UserSettings>("/api/Settings")
      .then((r) => {
        setSettings(r.data ?? {});
        setOriginal(r.data ?? {});
        // Sync the global currency context with the user's saved preference
        if (r.data?.currency) setCurrency(r.data.currency);
      })
      .catch(() => setSettings({}))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(original);

  const save = async () => {
    setSaving(true);
    try {
      await apiClient.put("/api/Settings", settings);
      setOriginal(settings);
      // Keep the global currency context in sync
      if (settings.currency) setCurrency(settings.currency);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const setNotif = (
    channel: keyof NonNullable<NotificationPrefs>,
    key: string,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [channel]: {
          ...(prev.notifications?.[channel] ?? {}),
          [key]: value,
        },
      },
    }));
  };

  const setPrivacy = (key: keyof PrivacyPrefs, value: unknown) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value },
    }));
  };
  
  const handlePasswordChange = async () => {
    setPasswordError("");
    setPasswordSuccess(false);
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError(t("passwordFieldsRequired"));
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError(t("passwordMismatch"));
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError(t("passwordTooShort"));
      return;
    }
    
    try {
      await apiClient.post("/api/auth/change-password", {
        currentPassword,
        newPassword,
      });
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      const data = (err as { response?: { data?: { message?: string } } })?.response?.data;
      setPasswordError(data?.message ?? t("passwordChangeError"));
    }
  };
  
  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") return;
    
    setDeleting(true);
    try {
      await apiClient.delete("/api/auth/me");
      window.location.href = "/";
    } catch {
      setDeleting(false);
      alert(t("deleteAccountError"));
    }
  };

  return (
    <div className="p-6 max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-[#c71463]" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("title")}
          </h1>
        </div>
        <button
          onClick={save}
          disabled={!isDirty || saving}
          className="flex items-center gap-2 px-4 py-2 bg-[#c71463] text-white rounded-xl text-sm font-medium hover:bg-[#a50f51] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : saved ? (
            "Saved ✓"
          ) : (
            <>
              <Save className="w-4 h-4" />
              {t("save")}
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === id
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-14 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          {/* General Tab */}
          {activeTab === "general" && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                {t("generalSettings")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SelectField
                  label={t("language")}
                  value={settings.language ?? "en"}
                  options={LANGUAGES}
                  onChange={(v) => setSettings((p) => ({ ...p, language: v }))}
                />
                <SelectField
                  label={t("timezone")}
                  value={settings.timezone ?? "UTC"}
                  options={TIMEZONES}
                  onChange={(v) => setSettings((p) => ({ ...p, timezone: v }))}
                />
                <SelectField
                  label={t("currency")}
                  value={settings.currency ?? "USD"}
                  options={rates.map(r => r.code)}
                  onChange={(v) => setSettings((p) => ({ ...p, currency: v }))}
                />
              </div>
            </>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                {t("emailNotifications")}
              </p>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                <Toggle
                  label={t("notifOrders")}
                  description={t("notifOrdersDesc")}
                  checked={settings.notifications?.email?.orders ?? true}
                  onChange={(v) => setNotif("email", "orders", v)}
                />
                <Toggle
                  label={t("notifMessages")}
                  description={t("notifMessagesDesc")}
                  checked={settings.notifications?.email?.messages ?? true}
                  onChange={(v) => setNotif("email", "messages", v)}
                />
                <Toggle
                  label={t("notifReviews")}
                  checked={settings.notifications?.email?.reviews ?? true}
                  onChange={(v) => setNotif("email", "reviews", v)}
                />
                <Toggle
                  label={t("notifMarketing")}
                  description={t("notifMarketingDesc")}
                  checked={settings.notifications?.email?.marketing ?? false}
                  onChange={(v) => setNotif("email", "marketing", v)}
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mt-4 mb-1">
                {t("pushNotifications")}
              </p>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                <Toggle
                  label={t("notifOrders")}
                  checked={settings.notifications?.push?.orders ?? true}
                  onChange={(v) => setNotif("push", "orders", v)}
                />
                <Toggle
                  label={t("notifMessages")}
                  checked={settings.notifications?.push?.messages ?? true}
                  onChange={(v) => setNotif("push", "messages", v)}
                />
              </div>
            </>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                {t("privacySettings")}
              </p>
              <SelectField
                label={t("profileVisibility")}
                value={settings.privacy?.profileVisibility ?? "public"}
                options={VISIBILITIES}
                onChange={(v) => setPrivacy("profileVisibility", v)}
              />
              <div className="divide-y divide-gray-100 dark:divide-gray-700 mt-2">
                <Toggle
                  label={t("showEmail")}
                  description={t("showEmailDesc")}
                  checked={settings.privacy?.showEmail ?? false}
                  onChange={(v) => setPrivacy("showEmail", v)}
                />
                <Toggle
                  label={t("showPhone")}
                  checked={settings.privacy?.showPhone ?? false}
                  onChange={(v) => setPrivacy("showPhone", v)}
                />
                <Toggle
                  label={t("activityStatus")}
                  description={t("activityStatusDesc")}
                  checked={settings.privacy?.activityStatus ?? true}
                  onChange={(v) => setPrivacy("activityStatus", v)}
                />
              </div>
            </>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                {t("appearanceSettings")}
              </p>
              
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t("themeLabel")}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSettings((p) => ({ ...p, theme: "light" }))}
                    className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                      (settings.theme ?? "system") === "light"
                        ? "border-[#c71463] bg-[#c71463]/5 ring-1 ring-[#c71463]/30"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Sun className={`size-6 ${
                      (settings.theme ?? "system") === "light" ? "text-[#c71463]" : "text-gray-400"
                    }`} />
                    <span className={`text-sm font-medium ${
                      (settings.theme ?? "system") === "light" ? "text-[#c71463]" : "text-gray-700 dark:text-gray-300"
                    }`}>{t("themeLight")}</span>
                    {(settings.theme ?? "system") === "light" && (
                      <Check className="absolute end-2 top-2 size-4 text-[#c71463]" />
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setSettings((p) => ({ ...p, theme: "dark" }))}
                    className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                      (settings.theme ?? "system") === "dark"
                        ? "border-[#c71463] bg-[#c71463]/5 ring-1 ring-[#c71463]/30"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Moon className={`size-6 ${
                      (settings.theme ?? "system") === "dark" ? "text-[#c71463]" : "text-gray-400"
                    }`} />
                    <span className={`text-sm font-medium ${
                      (settings.theme ?? "system") === "dark" ? "text-[#c71463]" : "text-gray-700 dark:text-gray-300"
                    }`}>{t("themeDark")}</span>
                    {(settings.theme ?? "system") === "dark" && (
                      <Check className="absolute end-2 top-2 size-4 text-[#c71463]" />
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setSettings((p) => ({ ...p, theme: "system" }))}
                    className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                      (settings.theme ?? "system") === "system"
                        ? "border-[#c71463] bg-[#c71463]/5 ring-1 ring-[#c71463]/30"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Monitor className={`size-6 ${
                      (settings.theme ?? "system") === "system" ? "text-[#c71463]" : "text-gray-400"
                    }`} />
                    <span className={`text-sm font-medium ${
                      (settings.theme ?? "system") === "system" ? "text-[#c71463]" : "text-gray-700 dark:text-gray-300"
                    }`}>{t("themeSystem")}</span>
                    {(settings.theme ?? "system") === "system" && (
                      <Check className="absolute end-2 top-2 size-4 text-[#c71463]" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">{t("themeDescription")}</p>
              </div>
            </>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                {t("securitySettings")}
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    {t("changePasswordTitle")}
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {t("currentPassword")}
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463]/30"
                        placeholder={t("currentPasswordPlaceholder")}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {t("newPassword")}
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463]/30"
                        placeholder={t("newPasswordPlaceholder")}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {t("confirmPassword")}
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463]/30"
                        placeholder={t("confirmPasswordPlaceholder")}
                      />
                    </div>
                    
                    {passwordError && (
                      <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                        {passwordError}
                      </div>
                    )}
                    
                    {passwordSuccess && (
                      <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-600 dark:text-green-400">
                        {t("passwordChangeSuccess")}
                      </div>
                    )}
                    
                    <button
                      type="button"
                      onClick={handlePasswordChange}
                      className="px-4 py-2.5 bg-[#c71463] text-white rounded-xl text-sm font-medium hover:bg-[#a50f51] transition-all"
                    >
                      {t("updatePassword")}
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {t("twoFactorTitle")}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {t("twoFactorDescription")}
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                  >
                    {t("enable2FA")}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                {t("accountSettings")}
              </p>
              
              <div className="space-y-4">
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t("accountInfoTitle")}
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">{t("accountEmail")}:</span>
                      <span className="text-gray-900 dark:text-white font-medium">{user?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">{t("accountRole")}:</span>
                      <span className="text-gray-900 dark:text-white font-medium capitalize">{user?.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">{t("accountCompletion")}:</span>
                      <span className="text-gray-900 dark:text-white font-medium">{user?.profileCompletionPercentage ?? 0}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <AlertTriangle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-red-900 dark:text-red-200 mb-1">
                        {t("deleteAccountTitle")}
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                        {t("deleteAccountWarning")}
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-red-700 dark:text-red-300 mb-1.5">
                            {t("deleteConfirmLabel")}
                          </label>
                          <input
                            type="text"
                            value={deleteConfirm}
                            onChange={(e) => setDeleteConfirm(e.target.value)}
                            placeholder={t("deleteConfirmPlaceholder")}
                            className="w-full px-3 py-2.5 rounded-xl border border-red-300 dark:border-red-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                          />
                        </div>
                        
                        <button
                          type="button"
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirm !== "DELETE" || deleting}
                          className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                          <Trash2 className="size-4" />
                          {deleting ? t("deletingAccount") : t("deleteAccountButton")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
