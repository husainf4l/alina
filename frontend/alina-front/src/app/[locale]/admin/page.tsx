"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import {
  Users, ShoppingBag, DollarSign, TrendingUp, Wallet,
  RefreshCw, Loader2, ArrowUpRight,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PlatformStats {
  totalUsers: number;
  totalOrders: number;
  activeOrders: number;
  totalRevenue: number;
  totalWalletBalance: number;
  totalPlatformEarnings: number;
  earningsToday: number;
  earningsThisMonth: number;
  averageCommissionRate: number;
}

interface RevenueAnalytics {
  totalGMV: number;
  totalPlatformRevenue: number;
  totalSellerPayouts: number;
  escrowBalance: number;
  monthlyGMV: number;
  monthlyRevenue: number;
  weeklyGMV: number;
  weeklyRevenue: number;
  dailyGMV: number;
  dailyRevenue: number;
  revenueByCategory: Record<string, number>;
  revenueTrend: { date: string; revenue: number }[];
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(n);
}

function StatCard({
  icon: Icon, label, value, sub, color = "pink",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color?: "pink" | "blue" | "green" | "amber";
}) {
  const colors = {
    pink:  { bg: "bg-[#c71463]/10", text: "text-[#c71463]" },
    blue:  { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400" },
    green: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400" },
    amber: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400" },
  };
  const c = colors[color];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
        <div className={`p-2.5 rounded-xl ${c.bg}`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [stats, setStats]     = useState<PlatformStats | null>(null);
  const [revenue, setRevenue] = useState<RevenueAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [s, r] = await Promise.all([
        apiClient.get<PlatformStats>("/api/admin/stats"),
        apiClient.get<RevenueAnalytics>("/api/admin/analytics/revenue"),
      ]);
      setStats(s.data);
      setRevenue(r.data);
    } catch {
      setError("Failed to load admin data. Make sure you have Admin privileges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const trendData = (revenue?.revenueTrend ?? []).map(p => ({
    date: new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    revenue: p.revenue,
  }));

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time platform statistics and revenue.</p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Refresh
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && !stats ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : stats && (
        <>
          {/* Stat cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Users}      label="Total Users"         value={stats.totalUsers.toLocaleString()}  color="blue" />
            <StatCard icon={ShoppingBag} label="Total Orders"        value={stats.totalOrders.toLocaleString()} sub={`${stats.activeOrders} active`} color="pink" />
            <StatCard icon={DollarSign} label="Platform Earnings"   value={fmt(stats.totalPlatformEarnings)} color="green" />
            <StatCard icon={Wallet}     label="Wallet Balance"      value={fmt(stats.totalWalletBalance)} color="amber" />
            <StatCard icon={TrendingUp} label="Earnings Today"      value={fmt(stats.earningsToday)} color="green" />
            <StatCard icon={TrendingUp} label="Earnings This Month" value={fmt(stats.earningsThisMonth)} color="green" />
            <StatCard icon={DollarSign} label="Total GMV"           value={fmt(revenue?.totalGMV ?? 0)} color="blue" />
            <StatCard icon={ArrowUpRight} label="Avg Commission"    value={`${Number(stats.averageCommissionRate).toFixed(1)}%`} color="pink" />
          </div>

          {/* Revenue trend */}
          {trendData.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Revenue (last 30 days)</h2>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c71463" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#c71463" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => [`$${Number(v ?? 0).toFixed(2)}`, "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#c71463" strokeWidth={2} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* GMV breakdown */}
          {revenue && (
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Daily GMV", gmv: revenue.dailyGMV, rev: revenue.dailyRevenue },
                { label: "Weekly GMV", gmv: revenue.weeklyGMV, rev: revenue.weeklyRevenue },
                { label: "Monthly GMV", gmv: revenue.monthlyGMV, rev: revenue.monthlyRevenue },
              ].map(({ label, gmv, rev }) => (
                <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(gmv)}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    Platform: {fmt(rev)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Revenue by category */}
          {revenue && Object.keys(revenue.revenueByCategory).length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Revenue by Category</h2>
              <div className="space-y-3">
                {Object.entries(revenue.revenueByCategory)
                  .sort(([, a], [, b]) => b - a)
                  .map(([cat, val]) => {
                    const max = Math.max(...Object.values(revenue.revenueByCategory));
                    const pct = max > 0 ? (val / max) * 100 : 0;
                    return (
                      <div key={cat}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-700 dark:text-gray-300">{cat}</span>
                          <span className="text-gray-500">{fmt(val)}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
                          <div
                            className="h-1.5 rounded-full bg-[#c71463]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
