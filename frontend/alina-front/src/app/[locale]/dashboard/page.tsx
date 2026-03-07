import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        {t("title")}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
    </div>
  );
}
