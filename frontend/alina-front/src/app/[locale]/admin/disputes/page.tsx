"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import {
  AlertTriangle, RefreshCw, Loader2, Clock, User,
  ShoppingBag, DollarSign, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DisputedOrder {
  id: string;
  gigTitle: string;
  buyerName: string;
  buyerEmail: string;
  sellerName: string;
  sellerEmail: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  requirements?: string;
}

function fmt(n: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function DisputeCard({ order }: { order: DisputedOrder }) {
  const [open, setOpen] = useState(false);
  const daysOld = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 86400000);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 p-5 text-start hover:bg-red-50/50 dark:hover:bg-red-900/10 transition-colors"
      >
        <div className="min-w-0 space-y-1.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <ShoppingBag className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="font-semibold text-gray-900 dark:text-white truncate">{order.gigTitle}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium">
              Disputed
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              Buyer: <strong className="text-gray-700 dark:text-gray-300">{order.buyerName}</strong>
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              Seller: <strong className="text-gray-700 dark:text-gray-300">{order.sellerName}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {daysOld}d ago
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="flex items-center gap-1.5 text-lg font-bold text-gray-900 dark:text-white">
            <DollarSign className="w-4 h-4 text-gray-400" />
            {fmt(order.amount, order.currency)}
          </span>
          <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", open && "rotate-180")} />
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-red-50 dark:border-red-900/20 pt-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Buyer</p>
              <p className="font-medium text-gray-900 dark:text-white">{order.buyerName}</p>
              <p className="text-gray-400 text-xs">{order.buyerEmail}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Seller</p>
              <p className="font-medium text-gray-900 dark:text-white">{order.sellerName}</p>
              <p className="text-gray-400 text-xs">{order.sellerEmail}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Order ID</p>
              <p className="font-mono text-xs text-gray-600 dark:text-gray-400">{order.id}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Dates</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Created: {fmtDate(order.createdAt)}<br />
                Updated: {fmtDate(order.updatedAt)}
                {order.deadline && <><br />Deadline: {fmtDate(order.deadline)}</>}
              </p>
            </div>
          </div>

          {order.requirements && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Requirements / Notes</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 leading-relaxed">
                {order.requirements}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <a
              href={`mailto:${order.buyerEmail}?subject=Re: Dispute on order ${order.id}`}
              className="px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              Email Buyer
            </a>
            <a
              href={`mailto:${order.sellerEmail}?subject=Re: Dispute on order ${order.id}`}
              className="px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              Email Seller
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDisputesPage() {
  const [orders, setOrders] = useState<DisputedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await apiClient.get<DisputedOrder[] | { items?: DisputedOrder[] }>(
        "/api/admin/orders/disputed"
      );
      setOrders(Array.isArray(data) ? data : (data.items ?? []));
    } catch {
      setError("Failed to load disputed orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Disputed Orders</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Orders flagged as disputed that require admin review.
          </p>
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

      {loading ? (
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <AlertTriangle className="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No disputed orders</p>
          <p className="text-sm text-gray-400 mt-1">All orders are running smoothly.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {orders.length} disputed order{orders.length !== 1 ? "s" : ""}
          </p>
          {orders.map((order) => (
            <DisputeCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
