"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import apiClient from "@/lib/apiClient";
import { Heart, ExternalLink, Trash2, Star, Clock, Package } from "lucide-react";
import { normalizeImageUrl } from "@/lib/utils";

interface FavoriteGig {
  id: string;
  title: string;
  description?: string;
  sellerName?: string;
  averageRating?: number;
  reviewCount?: number;
  deliveryTimeInDays?: number;
  mainImage?: string;
  startingPrice?: number;
  price?: { amount: number; currency: string };
}

interface FavoritesResponse {
  items?: FavoriteGig[];
  data?: FavoriteGig[];
}

export default function FavoritesPage() {
  const t = useTranslations("Favorites");
  const [favorites, setFavorites] = useState<FavoriteGig[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await apiClient.get<FavoritesResponse | FavoriteGig[]>(
        "/api/marketplace/favorites",
        { params: { pageNumber: 1, pageSize: 50 } }
      );
      const d = res.data;
      const items: FavoriteGig[] = Array.isArray(d)
        ? d
        : (d as FavoritesResponse).items ?? (d as FavoritesResponse).data ?? [];
      setFavorites(items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleRemove = async (gigId: string) => {
    setRemoving(gigId);
    try {
      await apiClient.delete(`/api/marketplace/favorites/${gigId}`);
      setFavorites((prev) => prev.filter((f) => f.id !== gigId));
    } catch {
      // ignore
    } finally {
      setRemoving(null);
    }
  };

  const getPrice = (gig: FavoriteGig): string | null => {
    const amt = gig.startingPrice ?? gig.price?.amount;
    if (amt == null) return null;
    const cur = gig.price?.currency ?? "USD";
    return `${cur === "USD" ? "$" : cur}${Number(amt).toFixed(2)}`;
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t("subtitle")}</p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">{t("noFavorites")}</p>
          <p className="text-sm text-gray-400 mt-1 mb-6">{t("noFavoritesHint")}</p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c71463] text-white text-sm font-medium hover:bg-[#a0105a] transition-colors"
          >
            {t("browseServices")}
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t("count", { count: favorites.length })}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites.map((gig) => {
              const thumb = gig.mainImage ? normalizeImageUrl(gig.mainImage) : null;
              const price = getPrice(gig);
              const isRemoving = removing === gig.id;

              return (
                <div
                  key={gig.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col transition-all ${
                    isRemoving ? "opacity-50 pointer-events-none" : "hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                    {thumb ? (
                      <img src={thumb} alt={gig.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-10 h-10 text-gray-300 dark:text-gray-500" />
                      </div>
                    )}
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemove(gig.id)}
                      className="absolute top-2 end-2 p-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      title={t("remove")}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">{gig.title}</p>
                    {gig.sellerName && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t("by")} {gig.sellerName}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto">
                      {gig.averageRating != null && gig.averageRating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {Number(gig.averageRating).toFixed(1)}
                          {gig.reviewCount != null && ` (${gig.reviewCount})`}
                        </span>
                      )}
                      {gig.deliveryTimeInDays != null && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {gig.deliveryTimeInDays}d
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                      {price && (
                        <span className="text-sm font-bold text-[#c71463]">
                          {t("startingAt")} {price}
                        </span>
                      )}
                      <Link
                        href={`/services/${gig.id}`}
                        className="ms-auto flex items-center gap-1 text-xs font-medium text-[#c71463] hover:underline"
                      >
                        {t("view")} <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
