"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";
import {
  Briefcase,
  ShoppingCart,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface QuickStats {
  totalGigs?: number;
  activeGigs?: number;
  totalOrders?: number;
  activeOrders?: number;
  completedOrders?: number;
  totalEarnings?: number;
  pendingEarnings?: number;
  averageRating?: number;
  totalReviews?: number;
  responseRate?: number;
  [key: string]: unknown;
}

interface ActivityItem {
  id?: string;
  type?: string;
  message?: string;
  description?: string;
  timestamp?: string;
  createdAt?: string;
  [key: string]: unknown;
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-start gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
          {value ?? "—"}
        </p>
        {sub && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations();
  const { user } = useAuth();
  const [stats, setStats] = useState<QuickStats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.allSettled([
          apiClient.get<QuickStats>("/api/Dashboard/quick-stats"),
          apiClient.get<ActivityItem[] | { items?: ActivityItem[] }>(
            "/api/Dashboard/recent-activity",
            { params: { limit: 10 } }
          ),
        ]);

        if (statsRes.status === "fulfilled") {
          setStats(statsRes.value.data);
        }
        if (activityRes.status === "fulfilled") {
          const data = activityRes.value.data;
          setActivity(
            Array.isArray(data)
              ? data
              : (data as { items?: ActivityItem[] }).items ?? []
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    {
      icon: Briefcase,
      label: t("Dashboard.totalGigs"),
      value: stats?.totalGigs ?? stats?.activeGigs ?? "—",
      sub:
        stats?.activeGigs != null ? `${stats.activeGigs} active` : undefined,
      color: "bg-[#c71463]",
    },
    {
      icon: ShoppingCart,
      label: t("Dashboard.totalOrders"),
      value: stats?.totalOrders ?? "—",
      sub:
        stats?.activeOrders != null
          ? `${stats.activeOrders} in progress`
          : undefined,
      color: "bg-blue-500",
    },
    {
      icon: DollarSign,
      label: t("Dashboard.totalEarnings"),
      value:
        stats?.totalEarnings != null
          ? `$${Number(stats.totalEarnings).toFixed(2)}`
          : "—",
      sub:
        stats?.pendingEarnings != null
          ? `$${Number(stats.pendingEarnings).toFixed(2)} pending`
          : undefined,
      color: "bg-[#3E9666]",
    },
    {
      icon: Star,
      label: t("Dashboard.avgRating"),
      value:
        stats?.averageRating != null
          ? Number(stats.averageRating).toFixed(1)
          : "—",
      sub:
        stats?.totalReviews != null
          ? `${stats.totalReviews} reviews`
          : undefined,
      color: "bg-amber-500",
    },
    {
      icon: CheckCircle,
      label: t("Dashboard.completedOrders"),
      value: stats?.completedOrders ?? "—",
      color: "bg-teal-500",
    },
    {
      icon: TrendingUp,
      label: t("Dashboard.responseRate"),
      value: stats?.responseRate != null ? `${stats.responseRate}%` : "—",
      color: "bg-purple-500",
    },
  ];

  const getActivityIcon = (type?: string) => {
    if (!type) return <Clock className="w-4 h-4 text-gray-400" />;
    if (type.toLowerCase().includes("order"))
      return <ShoppingCart className="w-4 h-4 text-blue-500" />;
    if (
      type.toLowerCase().includes("review") ||
      type.toLowerCase().includes("rating")
    )
      return <Star className="w-4 h-4 text-amber-500" />;
    if (
      type.toLowerCase().includes("earn") ||
      type.toLowerCase().includes("payment")
    )
      return <DollarSign className="w-4 h-4 text-green-500" />;
    if (type.toLowerCase().includes("complete"))
      return <CheckCircle className="w-4 h-4 text-teal-500" />;
    return <AlertCircle className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("Dashboard.greeting", {
            name: user?.displayName ?? user?.fullName ?? "",
          })}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {t("Dashboard.subtitle")}
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statCards.map((c) => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t("Dashboard.recentActivity")}
        </h2>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : activity.length === 0 ? (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <Clock className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p>{t("Dashboard.noActivity")}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {activity.map((item, i) => (
              <div
                key={item.id ?? i}
                className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="mt-0.5">{getActivityIcon(item.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">
                    {item.message ??
                      item.description ??
                      item.type ??
                      "Activity"}
                  </p>
                  {(item.timestamp ?? item.createdAt) && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(
                        (item.timestamp ?? item.createdAt) as string
                      ).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
