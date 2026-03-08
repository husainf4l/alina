"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import apiClient from "@/lib/apiClient";
import { ShoppingCart, Clock, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react";

interface Money {
  amount: number;
  currency: string;
}

interface OrderDto {
  id: string;
  gigId?: string | null;
  title: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  amount: Money;
  status: string;
  deadline?: string | null;
  deliveryMessage?: string | null;
  attachmentUrls?: string[] | null;
  createdAt: string;
  platformFeePercentage?: number | null;
  sellerReceives?: number | null;
}

interface PagedResponse {
  items?: OrderDto[];
  data?: OrderDto[];
  total?: number;
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
}

const STATUS_TABS = [
  { key: "", label: "All" },
  { key: "Pending", label: "Pending" },
  { key: "InProgress", label: "In Progress" },
  { key: "Delivered", label: "Delivered" },
  { key: "Completed", label: "Completed" },
  { key: "Cancelled", label: "Cancelled" },
  { key: "Disputed", label: "Disputed" },
];

function statusBadge(status: string) {
  const s = status?.toLowerCase() ?? "";
  if (s === "completed")
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  if (s === "inprogress" || s === "in_progress")
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  if (s === "pending")
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
  if (s === "cancelled")
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  if (s === "disputed")
    return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
  if (s === "delivered")
    return "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400";
  return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
}

function statusIcon(status: string) {
  const s = status?.toLowerCase() ?? "";
  if (s === "completed") return <CheckCircle className="w-4 h-4" />;
  if (s === "cancelled") return <XCircle className="w-4 h-4" />;
  if (s === "disputed") return <AlertCircle className="w-4 h-4" />;
  return <Clock className="w-4 h-4" />;
}

export default function OrdersPage() {
  const t = useTranslations("Orders");
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<OrderDto | null>(null);
  const PAGE_SIZE = 10;

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = {
        PageNumber: page,
        PageSize: PAGE_SIZE,
      };
      if (activeTab) params.status = activeTab;
      const res = await apiClient.get<PagedResponse | OrderDto[]>(
        "/api/MarketplaceOps/orders",
        { params }
      );
      const data = res.data;
      if (Array.isArray(data)) {
        setOrders(data);
        setTotal(data.length);
      } else {
        setOrders(data.items ?? data.data ?? []);
        setTotal(data.total ?? data.totalCount ?? 0);
      }
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab, page]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ShoppingCart className="w-6 h-6 text-[#c71463]" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("title")}
        </h1>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 flex-wrap border-b border-gray-200 dark:border-gray-700 pb-0">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setPage(1);
            }}
            className={`pb-3 px-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-[#c71463] text-[#c71463]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">{t("noOrders")}</p>
          <p className="text-sm mt-1">{t("noOrdersHint")}</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    {t("colTitle")}
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    {t("colBuyer")}
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    {t("colAmount")}
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    {t("colStatus")}
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    {t("colDeadline")}
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-4 py-3 max-w-48">
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                        {order.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {order.buyerName}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                      ${Number(order.amount?.amount ?? 0).toFixed(2)}
                      <span className="text-xs text-gray-400 font-normal ml-1">
                        {order.amount?.currency ?? "USD"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge(order.status)}`}
                      >
                        {statusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {order.deadline
                        ? new Date(order.deadline).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelected(order)}
                        className="p-1.5 text-gray-400 hover:text-[#c71463] transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {total > PAGE_SIZE && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("showing", {
                  from: (page - 1) * PAGE_SIZE + 1,
                  to: Math.min(page * PAGE_SIZE, total),
                  total,
                })}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {t("prev")}
                </button>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(Math.ceil(total / PAGE_SIZE), p + 1))
                  }
                  disabled={page >= Math.ceil(total / PAGE_SIZE)}
                  className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {t("next")}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Order Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 flex-1 pr-2">
                {selected.title}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold mt-0.5"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400 text-xs mb-0.5">{t("colBuyer")}</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selected.buyerName}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-0.5">{t("colStatus")}</p>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(selected.status)}`}
                >
                  {selected.status}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-0.5">{t("colAmount")}</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  ${Number(selected.amount?.amount ?? 0).toFixed(2)}{" "}
                  {selected.amount?.currency ?? "USD"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-0.5">
                  {t("sellerReceives")}
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selected.sellerReceives != null
                    ? `$${Number(selected.sellerReceives).toFixed(2)}`
                    : "—"}
                </p>
              </div>
              {selected.deadline && (
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs mb-0.5">
                    {t("colDeadline")}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(selected.deadline).toLocaleString()}
                  </p>
                </div>
              )}
              {selected.deliveryMessage && (
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs mb-0.5">
                    {t("deliveryMessage")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    {selected.deliveryMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
