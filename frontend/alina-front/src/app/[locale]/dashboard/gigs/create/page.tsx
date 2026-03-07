import { getTranslations } from "next-intl/server";
import CreateGigForm from "@/components/dashboard/CreateGigForm";

export default async function CreateGigPage() {
  const t = await getTranslations("CreateGig");
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{t("stepBasicsTitle")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("stepBasicsSubtitle")}</p>
      </div>
      <CreateGigForm />
    </div>
  );
}
