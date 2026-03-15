"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import apiClient from "@/lib/apiClient";
import { LifeBuoy, Plus, X, Send, Loader2, Clock, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ticket {
  id: string;
  subject: string;
  status: string; // "Open" | "InProgress" | "Resolved" | "Closed"
  createdAt: string;
  updatedAt?: string;
}

const STATUS_STYLES: Record<string, string> = {
  Open:       "bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-400",
  InProgress: "bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-400",
  Resolved:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Closed:     "bg-gray-100   text-gray-500   dark:bg-gray-700      dark:text-gray-400",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function SupportPage() {
  const t = useTranslations("Support");
  const [tickets, setTickets]   = useState<Ticket[]>([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject]   = useState("");
  const [message, setMessage]   = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr]   = useState("");
  const [submitOk, setSubmitOk]     = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get<Ticket[] | { items?: Ticket[] }>("/api/support/tickets");
      setTickets(Array.isArray(data) ? data : (data.items ?? []));
    } catch {
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErr("");
    if (!subject.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await apiClient.post("/api/support/ticket", {
        subject: subject.trim(),
        message: message.trim(),
      });
      setSubmitOk(true);
      setSubject("");
      setMessage("");
      setShowForm(false);
      load();
      setTimeout(() => setSubmitOk(false), 4000);
    } catch (err) {
      const d = (err as { response?: { data?: { error_description?: string } } })?.response?.data;
      setSubmitErr(d?.error_description ?? t("submitError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{t("subtitle")}</p>
        </div>
        <button
          onClick={() => { setShowForm((o) => !o); setSubmitErr(""); }}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
            showForm
              ? "border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              : "bg-[#c71463] hover:bg-[#a0105a] text-white"
          )}
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? t("cancel") : t("newTicket")}
        </button>
      </div>

      {/* Success banner */}
      {submitOk && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {t("submitSuccess")}
        </div>
      )}

      {/* New ticket form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 space-y-4"
        >
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">{t("newTicket")}</h2>

          {submitErr && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {submitErr}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {t("subjectLabel")}
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t("subjectPlaceholder")}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {t("messageLabel")}
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("messagePlaceholder")}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#c71463]"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2 text-sm rounded-xl bg-[#c71463] hover:bg-[#a0105a] text-white font-medium disabled:opacity-60 transition-colors"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {t("submit")}
            </button>
          </div>
        </form>
      )}

      {/* Ticket list */}
      {loading ? (
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-20">
          <LifeBuoy className="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">{t("noTickets")}</p>
          <p className="text-sm text-gray-400 mt-1">{t("noTicketsHint")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">{t("count", { count: tickets.length })}</p>
          {tickets.map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function TicketRow({ ticket, t }: { ticket: Ticket; t: ReturnType<typeof useTranslations<"Support">> }) {
  const [open, setOpen] = useState(false);
  const styleClass = STATUS_STYLES[ticket.status] ?? STATUS_STYLES["Closed"];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-5 text-start hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="min-w-0 flex-1">
          <p className="font-medium text-gray-900 dark:text-white truncate">{ticket.subject}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {fmtDate(ticket.createdAt)}
            </span>
            <span className={cn("px-2 py-0.5 rounded-full font-medium", styleClass)}>
              {t(`status.${ticket.status}` as "status.Open")}
            </span>
          </div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-gray-50 dark:border-gray-700 pt-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("ticketId")}: <span className="font-mono text-xs">{ticket.id}</span>
          </p>
          {ticket.updatedAt && (
            <p className="text-xs text-gray-400 mt-1">
              {t("lastUpdated")}: {fmtDate(ticket.updatedAt)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
