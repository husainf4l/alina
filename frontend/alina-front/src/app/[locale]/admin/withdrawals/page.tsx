"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import {
  Wallet, CheckCircle2, XCircle, Clock, RefreshCw,
  Loader2, AlertCircle, User, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  currency: string;
  bankDetails?: string;
  requestedAt: string;
}

interface ActionModal {
  request: WithdrawalRequest;
  action: "approve" | "reject";
}

function fmt(n: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });
}

export default function AdminWithdrawalsPage() {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [modal, setModal]       = useState<ActionModal | null>(null);
  const [notes, setNotes]       = useState("");
  const [acting, setActing]     = useState(false);
  const [actionErr, setActionErr] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await apiClient.get<WithdrawalRequest[] | { items?: WithdrawalRequest[] }>(
        "/api/admin/withdrawals/pending"
      );
      setRequests(Array.isArray(data) ? data : (data.items ?? []));
    } catch {
      setError("Failed to load pending withdrawals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAction = async () => {
    if (!modal) return;
    if (modal.action === "reject" && !notes.trim()) {
      setActionErr("A note is required when rejecting.");
      return;
    }
    setActing(true);
    setActionErr("");
    try {
      await apiClient.post(`/api/admin/withdrawals/${modal.request.id}/${modal.action}`, {
        notes: notes.trim() || undefined,
      });
      setRequests((prev) => prev.filter((r) => r.id !== modal.request.id));
      setModal(null);
      setNotes("");
    } catch (err) {
      const d = (err as { response?: { data?: { error?: string } } })?.response?.data;
      setActionErr(d?.error ?? "Action failed. Please try again.");
    } finally {
      setActing(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pending Withdrawals</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Review and process withdrawal requests from sellers.
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
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-20">
          <Wallet className="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No pending withdrawals</p>
          <p className="text-sm text-gray-400 mt-1">All withdrawal requests have been processed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{requests.length} pending request{requests.length !== 1 ? "s" : ""}</p>
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{req.userName}</span>
                    <span className="text-xs text-gray-400">{req.userEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {fmtDate(req.requestedAt)}
                  </div>
                  {req.bankDetails && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono truncate max-w-xs">
                      Bank: {req.bankDetails}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {fmt(req.amount, req.currency)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setModal({ request: req, action: "reject" }); setNotes(""); setActionErr(""); }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => { setModal({ request: req, action: "approve" }); setNotes(""); setActionErr(""); }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {modal.action === "approve" ? "Approve" : "Reject"} Withdrawal
              </h2>
              <button
                onClick={() => setModal(null)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-sm">
                <p><span className="font-medium">User:</span> {modal.request.userName}</p>
                <p className="mt-1"><span className="font-medium">Amount:</span> {fmt(modal.request.amount, modal.request.currency)}</p>
              </div>

              {actionErr && (
                <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">{actionErr}</p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Admin Notes {modal.action === "reject" ? "(required)" : "(optional)"}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={modal.action === "approve" ? "Add a note (optional)…" : "Reason for rejection…"}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAction}
                  disabled={acting}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2 text-sm rounded-xl text-white font-medium disabled:opacity-60 transition-colors",
                    modal.action === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"
                  )}
                >
                  {acting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {modal.action === "approve" ? "Confirm Approval" : "Confirm Rejection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
