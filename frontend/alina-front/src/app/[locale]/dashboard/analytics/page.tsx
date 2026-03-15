"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import apiClient from "@/lib/apiClient";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
  MousePointerClick,
  Star,
  CheckCircle,
  Clock,
  Repeat,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SellerAnalytics {
  profileViews: number;
  gigClicks: number;
  conversionRate: number;
  earnings7Days: number;
  earnings30Days: number;
  orders7Days: number;
  orders30Days: number;
  orderGrowthRate: number;
}

interface RevenueTrend { date: string; revenue: number }
interface OrderTrend  { date: string; orders: number }

interface TopGig {
  gigId: string;
  gigTitle: string;
  orders: number;
  revenue: number;
}

interface CustomerInsights {
  totalCustomers: number;
  repeatCustomers: number;
  averageOrderValue: number;
  customerRetentionRate: number;
  topCustomerLocations: string[];
}

interface SellerPerformance {
  completionRate?: number;
  onTimeDeliveryRate?: number;
  averageRating?: number;
  responseRate?: number;
  earningsLast30Days?: number;
  [key: string]: unknown;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function KpiCard({
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-start gap-4">
      <div className={`p-3 rounded-xl ${color} shrink-0`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{label}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-5">{title}</h3>
      {children}
    </div>
  );
}

function PerfBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-medium text-gray-900 dark:text-white">{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const t = useTranslations("Analytics");

  const [analytics, setAnalytics]       = useState<SellerAnalytics | null>(null);
  const [revenueTrends, setRevenueTrends] = useState<RevenueTrend[]>([]);
  const [orderTrends, setOrderTrends]   = useState<OrderTrend[]>([]);
  const [topGigs, setTopGigs]           = useState<TopGig[]>([]);
  const [customers, setCustomers]       = useState<CustomerInsightsDto | null>(null);
  const [perf, setPerf]                 = useState<SellerPerformance | null>(null);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    const load = async () => {
      const [a, rv, ov, tg, ci, sp] = await Promise.allSettled([
        apiClient.get<SellerAnalytics>("/api/Analytics/seller"),
        apiClient.get<RevenueTrend[]>("/api/Analytics/seller/revenue-trends", { params: { days: 30 } }),
        apiClient.get<OrderTrend[]>("/api/Analytics/seller/order-trends", { params: { days: 30 } }),
        apiClient.get<TopGig[]>("/api/Analytics/seller/top-gigs", { params: { limit: 10 } }),
        apiClient.get<CustomerInsights>("/api/Analytics/seller/customer-insights"),
        apiClient.get<SellerPerformance>("/api/Dashboard/seller-performance"),
      ]);
      if (a.status  === "fulfilled") setAnalytics(a.value.data);
      if (rv.status === "fulfilled") setRevenueTrends((rv.value.data ?? []).map(d => ({ ...d, date: fmtDate(d.date) })));
      if (ov.status === "fulfilled") setOrderTrends((ov.value.data ?? []).map(d => ({ ...d, date: fmtDate(d.date) })));
      if (tg.status === "fulfilled") setTopGigs(tg.value.data ?? []);
      if (ci.status === "fulfilled") setCustomers(ci.value.data);
      if (sp.status === "fulfilled") setPerf(sp.value.data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-gray-100 dark:bg-gray-800" />
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

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={DollarSign}        label={t("earnings30d")}   value={`$${Number(analytics?.earnings30Days ?? 0).toFixed(2)}`} sub={`$${Number(analytics?.earnings7Days ?? 0).toFixed(2)} ${t("last7d")}`} color="bg-[#c71463]" />
        <KpiCard icon={ShoppingCart}      label={t("orders30d")}     value={analytics?.orders30Days ?? 0} sub={`${analytics?.orders7Days ?? 0} ${t("last7d")}`} color="bg-blue-500" />
        <KpiCard icon={TrendingUp}        label={t("orderGrowth")}   value={`${Number(analytics?.orderGrowthRate ?? 0).toFixed(1)}%`} color="bg-emerald-500" />
        <KpiCard icon={MousePointerClick} label={t("conversionRate")} value={`${Number(analytics?.conversionRate ?? 0).toFixed(1)}%`} color="bg-purple-500" />
        <KpiCard icon={Eye}               label={t("profileViews")}  value={analytics?.profileViews ?? 0} color="bg-amber-500" />
        <KpiCard icon={MousePointerClick} label={t("gigClicks")}     value={analytics?.gigClicks ?? 0} color="bg-cyan-500" />
        <KpiCard icon={Users}             label={t("totalCustomers")} value={customers?.totalCustomers ?? 0} color="bg-indigo-500" />
        <KpiCard icon={Repeat}            label={t("repeatCustomers")} value={customers?.repeatCustomers ?? 0} sub={`${Number(customers?.customerRetentionRate ?? 0).toFixed(1)}% ${t("retention")}`} color="bg-rose-500" />
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Section title={t("revenueTrend")}>
          {revenueTrends.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">{t("noData")}</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v) => [`$${Number(v ?? 0).toFixed(2)}`, t("revenue")]} />
                <Line type="monotone" dataKey="revenue" stroke="#c71463" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Section>

        {/* Order Trend */}
        <Section title={t("orderTrend")}>
          {orderTrends.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">{t("noData")}</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={orderTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [Number(v ?? 0), t("orders")]} />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Section>

        {/* Seller Performance */}
        <Section title={t("performance")}>
          {perf ? (
            <div className="space-y-4">
              <PerfBar label={t("completionRate")}    value={perf.completionRate       ?? 0} color="bg-emerald-500" />
              <PerfBar label={t("onTimeDelivery")}    value={perf.onTimeDeliveryRate   ?? 0} color="bg-blue-500" />
              <PerfBar label={t("responseRate")}      value={perf.responseRate         ?? 0} color="bg-purple-500" />
              <div className="flex items-center gap-2 pt-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{t("avgRating")}</span>
                <span className="font-semibold text-gray-900 dark:text-white ms-auto">
                  {Number(perf.averageRating ?? 0).toFixed(1)} / 5
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-10">{t("noData")}</p>
          )}
        </Section>

        {/* Customer Insights */}
        <Section title={t("customerInsights")}>
          {customers ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{customers.totalCustomers}</p>
                  <p className="text-xs text-gray-500 mt-1">{t("totalCustomers")}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${Number(customers.averageOrderValue).toFixed(0)}</p>
                  <p className="text-xs text-gray-500 mt-1">{t("avgOrderValue")}</p>
                </div>
              </div>
              {customers.topCustomerLocations?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("topLocations")}</p>
                  <div className="flex flex-wrap gap-2">
                    {customers.topCustomerLocations.map((loc) => (
                      <span key={loc} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-10">{t("noData")}</p>
          )}
        </Section>
      </div>

      {/* Top Gigs */}
      <Section title={t("topGigs")}>
        {topGigs.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">{t("noData")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                  <th className="text-start pb-3 font-medium">{t("gigTitle")}</th>
                  <th className="text-end pb-3 font-medium">{t("orders")}</th>
                  <th className="text-end pb-3 font-medium">{t("revenue")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {topGigs.map((g) => (
                  <tr key={g.gigId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-3 text-gray-800 dark:text-gray-200 max-w-xs truncate">{g.gigTitle}</td>
                    <td className="py-3 text-end font-medium text-gray-900 dark:text-white">{g.orders}</td>
                    <td className="py-3 text-end font-medium text-[#c71463]">${Number(g.revenue).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  );
}

// type alias to avoid naming conflict
type CustomerInsightsDto = CustomerInsights;
