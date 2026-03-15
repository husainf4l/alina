"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import apiClient from "@/lib/apiClient";
import { Star, MessageSquare } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ReviewDto {
  id: string;
  gigId?: string;
  orderId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

interface GigDto {
  id: string;
  title: string;
}

interface PagedResponse<T> {
  items?: T[];
  data?: T[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200 dark:text-gray-600"}`}
        />
      ))}
    </div>
  );
}

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-3 text-gray-600 dark:text-gray-400 text-end shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-5 text-gray-500 dark:text-gray-400 shrink-0">{count}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ReviewsPage() {
  const t = useTranslations("SellerReviews");
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 1. Get seller's gigs
        const gigsRes = await apiClient.get<PagedResponse<GigDto> | GigDto[]>(
          "/api/Marketplace/my-gigs",
          { params: { pageSize: 100, page: 1 } }
        );
        const gigsData = gigsRes.data;
        const gigs: GigDto[] = Array.isArray(gigsData)
          ? gigsData
          : (gigsData as PagedResponse<GigDto>).items ?? (gigsData as PagedResponse<GigDto>).data ?? [];

        if (gigs.length === 0) {
          setLoading(false);
          return;
        }

        // 2. Fetch reviews for all gigs in parallel
        const results = await Promise.allSettled(
          gigs.map((g) =>
            apiClient.get<PagedResponse<ReviewDto> | ReviewDto[]>(
              `/api/Marketplace/gigs/${g.id}/reviews`,
              { params: { pageSize: 200, page: 1 } }
            )
          )
        );

        const all: ReviewDto[] = [];
        results.forEach((r) => {
          if (r.status === "fulfilled") {
            const d = r.value.data;
            const list: ReviewDto[] = Array.isArray(d)
              ? d
              : (d as PagedResponse<ReviewDto>).items ?? (d as PagedResponse<ReviewDto>).data ?? [];
            all.push(...list);
          }
        });

        // Sort newest first
        all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setReviews(all);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Aggregate rating distribution
  const total = reviews.length;
  const avgRating = total > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  if (loading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-36 rounded-2xl bg-gray-100 dark:bg-gray-800" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t("subtitle")}</p>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20">
          <MessageSquare className="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">{t("noReviews")}</p>
          <p className="text-sm text-gray-400 mt-1">{t("noReviewsHint")}</p>
        </div>
      ) : (
        <>
          {/* Summary card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Big number */}
              <div className="flex flex-col items-center justify-center text-center shrink-0 min-w-[120px]">
                <p className="text-5xl font-extrabold text-gray-900 dark:text-white">{avgRating.toFixed(1)}</p>
                <StarRow rating={Math.round(avgRating)} />
                <p className="text-sm text-gray-500 mt-1">{t("basedOn", { count: total })}</p>
              </div>
              {/* Distribution */}
              <div className="flex-1 space-y-2">
                {distribution.map((d) => (
                  <RatingBar key={d.star} label={String(d.star)} count={d.count} total={total} />
                ))}
              </div>
            </div>
          </div>

          {/* Review list */}
          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Avatar + name */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c71463]/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-[#c71463]">
                        {r.reviewerName?.[0]?.toUpperCase() ?? "?"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{r.reviewerName}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <StarRow rating={r.rating} />
                </div>
                {r.comment && (
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{r.comment}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
