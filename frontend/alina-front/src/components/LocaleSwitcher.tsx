"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onLocaleChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((l) => (
        <Button
          key={l}
          size="sm"
          variant={locale === l ? "default" : "ghost"}
          onClick={() => onLocaleChange(l)}
          disabled={isPending}
          className="rounded-full"
        >
          {l.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
