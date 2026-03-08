"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import apiClient from "@/lib/apiClient";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Lock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
} from "lucide-react";

interface Money {
  amount: number;
  currency: string;
}

interface WalletTransactionDto {
  id: string;
  amount: Money;
  type: string;
  status: string;
  reference?: string | null;
  description?: string | null;
  createdAt: string;
}

interface WalletDto {
  availableBalance: Money;
  escrowBalance: Money;
  recentTransactions: WalletTransactionDto[];
}

function txColor(type: string, status: string) {
  const s = status?.toLowerCase() ?? "";
  if (s === "failed" || s === "rejected")
    return "text-red-500";
  const t = (type ?? "").toLowerCase();
  if (t.includes("deposit") || t.includes("earning") || t.includes("credit") || t.includes("receive"))
    return "text-green-600 dark:text-green-400";
  return "text-red-500";
}

function txAmountPrefix(type: string) {
  const t = (type ?? "").toLowerCase();
  if (t.includes("deposit") || t.includes("earning") || t.includes("credit") || t.includes("receive"))
    return "+";
  return "-";
}

function txIcon(type: string) {
  const t = (type ?? "").toLowerCase();
  if (t.includes("deposit") || t.includes("earning") || t.includes("credit") || t.includes("receive"))
    return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
  if (t.includes("withdraw") || t.includes("debit") || t.includes("fee"))
    return <ArrowUpRight className="w-4 h-4 text-red-500" />;
  return <RefreshCw className="w-4 h-4 text-blue-500" />;
}

function statusBadge(status: string) {
  const s = (status ?? "").toLowerCase();
  if (s === "completed" || s === "success")
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  if (s === "pending")
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
  if (s === "failed" || s === "rejected")
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
}

export default function WalletPage() {
  const t = useTranslations("Wallet");
  const [wallet, setWallet] = useState<WalletDto | null>(null);
  const [allTx, setAllTx] = useState<WalletTransactionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTx, setLoadingTx] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    apiClient
      .get<WalletDto>("/api/Wallet")
      .then((r) => setWallet(r.data))
      .catch(() => setWallet(null))
      .finally(() => setLoading(false));
  }, []);

  const loadAllTransactions = async () => {
    if (allTx.length > 0) {
      setShowAll(true);
      return;
    }
    setLoadingTx(true);
    try {
      const r = await apiClient.get<WalletTransactionDto[] | { items?: WalletTransactionDto[] }>(
        "/api/Wallet/transactions"
      );
      const data = r.data;
      setAllTx(Array.isArray(data) ? data : data.items ?? []);
      setShowAll(true);
    } catch {
      setAllTx([]);
    } finally {
      setLoadingTx(false);
    }
  };

  const transactions = showAll ? allTx : wallet?.recentTransactions ?? [];

  return (
    <div className="p-6 max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Wallet className="w-6 h-6 text-[#c71463]" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("title")}
        </h1>
      </div>

      {/* Balance Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-36 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          <div className="h-36 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        </div>
      ) : !wallet ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <Wallet className="w-14 h-14 mx-auto mb-3 opacity-20" />
          <p className="text-lg font-medium">{t("unavailable")}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Available Balance */}
            <div className="bg-gradient-to-br from-[#c71463] to-[#B05088] rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="text-pink-100 text-sm font-medium">
                  {t("available")}
                </p>
                <div className="p-2 bg-white/20 rounded-xl">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-bold">
                ${Number(wallet.availableBalance.amount).toFixed(2)}
              </p>
              <p className="text-pink-200 text-sm mt-1">
                {wallet.availableBalance.currency}
              </p>
            </div>

            {/* Escrow Balance */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {t("escrow")}
                </p>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <Lock className="w-4 h-4 text-blue-500" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${Number(wallet.escrowBalance.amount).toFixed(2)}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {wallet.escrowBalance.currency} · {t("escrowNote")}
              </p>
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("transactions")}
              </h2>
              {!showAll && (
                <button
                  onClick={loadAllTransactions}
                  disabled={loadingTx}
                  className="text-sm text-[#c71463] hover:text-[#a50f51] font-medium flex items-center gap-1 transition-colors"
                >
                  {loadingTx ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  {t("loadAll")}
                </button>
              )}
            </div>

            {transactions.length === 0 ? (
              <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                <RefreshCw className="w-10 h-10 mx-auto mb-2 opacity-20" />
                <p>{t("noTransactions")}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
                  >
                    <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 flex-shrink-0">
                      {txIcon(tx.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {tx.description ?? tx.type ?? "Transaction"}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge(tx.status)}`}
                        >
                          {tx.status}
                        </span>
                        {tx.reference && (
                          <span className="text-xs text-gray-400 truncate">
                            #{tx.reference}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p
                        className={`text-sm font-bold ${txColor(tx.type, tx.status)}`}
                      >
                        {txAmountPrefix(tx.type)}$
                        {Number(tx.amount.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
