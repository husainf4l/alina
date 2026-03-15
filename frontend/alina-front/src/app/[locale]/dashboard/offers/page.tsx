"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import apiClient from "@/lib/apiClient";
import {
  Tag,
  CheckCircle2,
  XCircle,
  Clock,
  SendHorizontal,
  Inbox,
  Loader2,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface OfferPrice {
  amount: number;
  currency: string;
}

interface CustomOffer {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  title: string;
  description: string;
  price: OfferPrice;
  deliveryTimeInDays: number;
  features: string[];
  status: "pending" | "accepted" | "rejected" | "expired" | "withdrawn";
  sentAt: string;
  expiryDate: string;
  responseMessage?: string;
  respondedAt?: string;
}

interface PagedOffers {
  items?: CustomOffer[];
  data?: CustomOffer[];
}

type Tab = "received" | "sent";

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-400",
  accepted:  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  rejected:  "bg-red-100    text-red-700    dark:bg-red-900/30    dark:text-red-400",
  expired:   "bg-gray-100   text-gray-500   dark:bg-gray-700      dark:text-gray-400",
  withdrawn: "bg-gray-100   text-gray-500   dark:bg-gray-700      dark:text-gray-400",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function fmtPrice(p: OfferPrice) {
  return `${p.currency === "USD" ? "$" : p.currency}${Number(p.amount).toFixed(2)}`;
}

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations("Offers");
  return (
    <span className={cn("text-xs px-2.5 py-0.5 rounded-full font-medium capitalize", STATUS_COLORS[status] ?? STATUS_COLORS["expired"])}>
      {t(`status.${status}` as "status.pending")}
    </span>
  );
}

// ── Respond Modal ────────────────────────────────────────────────────────────

function RespondModal({
  offer,
  accept,
  onClose,
  onDone,
}: {
  offer: CustomOffer;
  accept: boolean;
  onClose: () => void;
  onDone: () => void;
}) {
  const t = useTranslations("Offers");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await apiClient.post(`/api/customoffers/${offer.id}/respond`, {
        accept,
        responseMessage: message.trim() || undefined,
      });
      onDone();
      onClose();
    } catch (e) {
      const r = (e as { response?: { data?: unknown } }).response;
      setErr(
        typeof r?.data === "string"
          ? r.data
          : (r?.data && typeof r.data === "object" && "error" in (r.data as object))
          ? (r.data as { error: string }).error
          : t("respondError")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {accept ? t("acceptOffer") : t("declineOffer")}: {offer.title}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {err && <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">{err}</p>}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {accept ? t("acceptConfirm", { title: offer.title, price: fmtPrice(offer.price) }) : t("declineConfirm", { title: offer.title })}
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("responseMessage")} ({t("optional")})</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={accept ? t("acceptMessagePlaceholder") : t("declineMessagePlaceholder")}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463] resize-none"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "flex items-center gap-2 px-5 py-2 text-sm rounded-xl text-white font-medium disabled:opacity-60 transition-colors",
                accept ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"
              )}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {accept ? t("confirm") : t("decline")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Offer Card ────────────────────────────────────────────────────────────────

function OfferCard({
  offer,
  isReceived,
  onRespond,
}: {
  offer: CustomOffer;
  isReceived: boolean;
  onRespond: (offer: CustomOffer, accept: boolean) => void;
}) {
  const t = useTranslations("Offers");
  const [expanded, setExpanded] = useState(false);
  const daysUntilExpiry = Math.ceil((new Date(offer.expiryDate).getTime() - Date.now()) / 86400000);
  const isPending = offer.status === "pending";
  const isExpired = daysUntilExpiry <= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white truncate">{offer.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {isReceived ? `${t("from")}: ${offer.senderName}` : `${t("to")}: ${offer.recipientName}`}
              {" · "}
              {fmtDate(offer.sentAt)}
            </p>
          </div>
          <StatusBadge status={offer.status} />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
          <span className="font-bold text-[#c71463] text-base">{fmtPrice(offer.price)}</span>
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            {offer.deliveryTimeInDays} {t("days")}
          </span>
          {isPending && !isExpired && (
            <span className="text-xs text-amber-600 dark:text-amber-400">
              {t("expiresIn", { days: daysUntilExpiry })}
            </span>
          )}
        </div>

        {/* Expand/collapse */}
        {(offer.description || offer.features?.length > 0 || offer.responseMessage) && (
          <button
            onClick={() => setExpanded((o) => !o)}
            className="mt-3 flex items-center gap-1 text-xs text-[#c71463] hover:underline"
          >
            {expanded ? t("showLess") : t("showMore")}
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", expanded && "rotate-180")} />
          </button>
        )}
      </div>

      {expanded && (
        <div className="px-5 pb-4 space-y-3 border-t border-gray-50 dark:border-gray-700 pt-3">
          {offer.description && (
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{offer.description}</p>
          )}
          {offer.features?.length > 0 && (
            <ul className="space-y-1">
              {offer.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          )}
          {offer.responseMessage && (
            <div className="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-3 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">{t("responseMessage")}:</span> {offer.responseMessage}
            </div>
          )}
        </div>
      )}

      {/* Actions (received + pending + not expired) */}
      {isReceived && isPending && !isExpired && (
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={() => onRespond(offer, true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            {t("accept")}
          </button>
          <button
            onClick={() => onRespond(offer, false)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium transition-colors"
          >
            <XCircle className="w-4 h-4" />
            {t("decline")}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OffersPage() {
  const t = useTranslations("Offers");
  const [tab, setTab] = useState<Tab>("received");
  const [received, setReceived] = useState<CustomOffer[]>([]);
  const [sent, setSent] = useState<CustomOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [respondTarget, setRespondTarget] = useState<{ offer: CustomOffer; accept: boolean } | null>(null);

  const extract = (data: unknown): CustomOffer[] => {
    if (Array.isArray(data)) return data as CustomOffer[];
    const d = data as PagedOffers;
    return d.items ?? d.data ?? [];
  };

  const load = async () => {
    setLoading(true);
    const [r, s] = await Promise.allSettled([
      apiClient.get("/api/customoffers/received"),
      apiClient.get("/api/customoffers/sent"),
    ]);
    if (r.status === "fulfilled") setReceived(extract(r.value.data));
    if (s.status === "fulfilled") setSent(extract(s.value.data));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const current = tab === "received" ? received : sent;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t("subtitle")}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit">
        {(["received", "sent"] as Tab[]).map((tabId) => {
          const count = tabId === "received" ? received.length : sent.length;
          const pendingCount = tabId === "received"
            ? received.filter((o) => o.status === "pending").length
            : 0;
          return (
            <button
              key={tabId}
              onClick={() => setTab(tabId)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                tab === tabId
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              {tabId === "received" ? <Inbox className="w-4 h-4" /> : <SendHorizontal className="w-4 h-4" />}
              {t(tabId)}
              {count > 0 && (
                <span className={cn(
                  "text-xs font-bold px-1.5 py-0.5 rounded-full",
                  pendingCount > 0 && tabId === "received"
                    ? "bg-amber-500 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : current.length === 0 ? (
        <div className="text-center py-20">
          <Tag className="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
            {tab === "received" ? t("noReceived") : t("noSent")}
          </p>
          <p className="text-sm text-gray-400 mt-1">{t("noOffersHint")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {current.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              isReceived={tab === "received"}
              onRespond={(o, accept) => setRespondTarget({ offer: o, accept })}
            />
          ))}
        </div>
      )}

      {/* Respond modal */}
      {respondTarget && (
        <RespondModal
          offer={respondTarget.offer}
          accept={respondTarget.accept}
          onClose={() => setRespondTarget(null)}
          onDone={load}
        />
      )}
    </div>
  );
}
