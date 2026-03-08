"use client";

import { useTranslations } from "next-intl";
import { Star, BadgeCheck, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface FreelancerDto {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  startingAt: number;
  avatar: string | null;
  skills: string[];
  verified: boolean;
}

export default function TopFreelancers() {
  const t = useTranslations("Home.topFreelancers");
  const freelancers: FreelancerDto[] = [];

  if (!freelancers.length) return null;

  return (
    <section className="w-full py-16 lg:py-20 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">{t("title")}</h2>
            <p className="mt-2 text-muted-foreground text-base">{t("subtitle")}</p>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-1.5 text-sm font-medium text-[#c71463] hover:gap-2.5 transition-all whitespace-nowrap"
          >
            {t("viewAll")} <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {freelancers.map((f) => (
            <Link
              key={f.id}
              href={`/profile/${f.id}`}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              {/* Top row */}
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  {f.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={f.avatar}
                      alt={f.name}
                      className="size-14 rounded-full object-cover ring-2 ring-border"
                    />
                  ) : (
                    <div className="size-14 rounded-full bg-muted ring-2 ring-border flex items-center justify-center text-lg font-bold text-muted-foreground">
                      {f.name[0]}
                    </div>
                  )}
                  {f.verified && (
                    <BadgeCheck className="absolute -bottom-1 -right-1 size-5 text-[#3E9666] bg-card rounded-full" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{f.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-foreground">{f.rating}</span>
                    <span className="text-xs text-muted-foreground">({f.reviews.toLocaleString()})</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {f.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-border">
                <span className="text-xs text-muted-foreground">{t("startingAt")}</span>
                <span className="text-sm font-bold text-foreground">${f.startingAt}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
