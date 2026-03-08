"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import EditGigForm from "@/components/dashboard/EditGigForm";

export default function EditGigPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations("Gigs");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/gigs"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-4" />
          {t("pageTitle")}
        </Link>
        <span className="text-muted-foreground/30">/</span>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t("editPageTitle")}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{t("editPageSubtitle")}</p>
        </div>
      </div>

      <EditGigForm gigId={id} />
    </div>
  );
}
