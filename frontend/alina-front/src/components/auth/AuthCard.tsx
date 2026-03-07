"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

type Tab = "login" | "register";

export default function AuthCard() {
  const t = useTranslations("Auth");
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>("login");

  // Respect ?mode=register from navbar "Join" link
  useEffect(() => {
    if (searchParams.get("mode") === "register") setTab("register");
  }, [searchParams]);

  const isLogin = tab === "login";

  return (
    <div
      className="animate-fade-up w-full max-w-md rounded-3xl border border-border bg-card shadow-sm px-8 py-10"
      style={{ animationDelay: "60ms" }}
    >
      {/* Tab switcher */}
      <div className="mb-8 flex items-center rounded-xl bg-muted p-1 gap-1">
        {(["login", "register"] as Tab[]).map((t_key) => (
          <button
            key={t_key}
            type="button"
            onClick={() => setTab(t_key)}
            className={cn(
              "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
              tab === t_key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t_key === "login" ? t("loginTab") : t("registerTab")}
          </button>
        ))}
      </div>

      {/* Heading */}
      <div className="mb-7 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          <span className="font-[family-name:var(--font-display)] italic font-normal">
            {isLogin ? t("loginTitle") : t("registerTitle")}
          </span>{" "}
          <span>{isLogin ? t("loginTitleBrand") : t("registerTitleBrand")}</span>
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {isLogin ? t("loginSubtitle") : t("registerSubtitle")}
        </p>
      </div>

      {/* Form — key forces remount on tab switch so inputs clear */}
      <div key={tab} className="animate-fade-up" style={{ animationDelay: "160ms" }}>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>

      {/* Footer switch link */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isLogin ? t("loginFooter") : t("registerFooter")}{" "}
        <button
          type="button"
          onClick={() => setTab(isLogin ? "register" : "login")}
          className="font-medium text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          {isLogin ? t("switchToRegister") : t("switchToLogin")}
        </button>
      </p>
    </div>
  );
}
