import { useTranslations } from "next-intl";
import ProfileCard from "@/components/dashboard/ProfileCard";

export default function ProfilePage() {
  const t = useTranslations("Profile");

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      <div className="mt-8">
        <ProfileCard />
      </div>
    </div>
  );
}
