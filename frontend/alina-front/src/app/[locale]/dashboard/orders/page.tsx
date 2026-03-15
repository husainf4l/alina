"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";
import {
  ShoppingCart, Clock, CheckCircle, XCircle, AlertCircle, Eye, Loader2,
  Truck, ThumbsUp, RefreshCw, Star, X, Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  if (s === "delivered") return <Truck className="w-4 h-4" />;
  return <Clock className="w-4 h-4" />;
}

function daysLeft(deadline?: string | null) {
  if (!deadline) return null;
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
}

type ApiError = { response?: { data?: string | { message?: string } } };
function extractError(err: unknown, fallback: string) {
  const msg = (err as ApiError)?.response?.data;
  return typeof msg === "string" ? msg : (msg as { message?: string })?.message ?? fallback;
}

function ErrorBanner({ msg }: { msg: string }) {
  return (
    <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
      {msg}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function DeliverModal({ order, onClose, onSuccess }: {
  order: OrderDto; onClose: () => void; onSuccess: (o: OrderDto) => void;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true); setError(null);
    try {
      const { data } = await apiClient.put<OrderDto>(`/api/MarketplaceOps/orders/${order.id}/deliver`, { deliveryMessage: message.trim() });
      onSuccess(data);
    } catch (err) { setError(extractError(err, "Failed to deliver order")); }
    finally { setLoading(false); }
  };
  return (
    <Modal title="Deliver Work" onClose={onClose}>
      <p className="text-sm text-gray-500 dark:text-gray-400">Describe what you&apos;ve delivered and any instructions for the buyer.</p>
      <form onSubmit={submit} className="space-y-4">
        {error && <ErrorBanner msg={error} />}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Delivery message *</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4}
            placeholder="Describe what you have completed..."
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c71463]/30 resize-none" />
        </div>
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Cancel</Button>
          <Button type="submit" disabled={loading || !message.trim()} className="rounded-xl bg-[#c71463] hover:bg-[#c71463]/90 text-white">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Delivering&hellip;</> : <><Upload className="w-4 h-4 mr-2" />Submit Delivery</>}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function ReviewModal({ order, onClose, onSuccess }: {
  order: OrderDto; onClose: () => void; onSuccess: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const labels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      await apiClient.post("/api/MarketplaceOps/reviews", { orderId: order.id, rating, comment: comment.trim() });
      onSuccess();
    } catch (err) { setError(extractError(err, "Failed to submit review")); }
    finally { setLoading(false); }
  };
  return (
    <Modal title="Leave a Review" onClose={onClose}>
      <p className="text-sm text-gray-500 dark:text-gray-400">Share your experience with <strong>{order.sellerName}</strong>.</p>
      <form onSubmit={submit} className="space-y-4">
        {error && <ErrorBanner msg={error} />}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating *</label>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((s) => (
              <button key={s} type="button" onClick={() => setRating(s)} className="p-0.5 transition-transform hover:scale-110">
                <Star className={cn("w-7 h-7 transition-colors", s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600")} />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{labels[rating]}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Comment</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4}
            placeholder="Share details about your experience..."
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c71463]/30 resize-none" />
        </div>
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Skip</Button>
          <Button type="submit" disabled={loading} className="rounded-xl bg-[#c71463] hover:bg-[#c71463]/90 text-white">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Submitting&hellip;</> : <><Star className="w-4 h-4 mr-2" />Submit Review</>}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function CancelModal({ order, onClose, onSuccess }: {
  order: OrderDto; onClose: () => void; onSuccess: (o: OrderDto) => void;
}) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const { data } = await apiClient.put<OrderDto>(`/api/MarketplaceOps/orders/${order.id}/cancel`, { reason: reason.trim() || undefined });
      onSuccess(data);
    } catch (err) { setError(extractError(err, "Failed to cancel order")); }
    finally { setLoading(false); }
  };
  return (
    <Modal title="Cancel Order" onClose={onClose}>
      <div className="rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 px-4 py-3 text-sm text-orange-700 dark:text-orange-400">
        Cancelling will refund your payment to your wallet. This cannot be undone.
      </div>
      <form onSubmit={submit} className="space-y-4">
        {error && <ErrorBanner msg={error} />}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Reason (optional)</label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3}
            placeholder="Why are you cancelling this order?"
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 resize-none" />
        </div>
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Keep Order</Button>
          <Button type="submit" disabled={loading} className="rounded-xl bg-red-600 hover:bg-red-700 text-white">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Cancelling&hellip;</> : <><XCircle className="w-4 h-4 mr-2" />Cancel Order</>}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function DisputeModal({ order, onClose, onSuccess }: {
  order: OrderDto; onClose: () => void; onSuccess: (o: OrderDto) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await apiClient.put<OrderDto>(`/api/MarketplaceOps/orders/${order.id}/dispute`);
      onSuccess(data);
    } catch (err) { setError(extractError(err, "Failed to open dispute")); }
    finally { setLoading(false); }
  };
  return (
    <Modal title="Open a Dispute" onClose={onClose}>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Opening a dispute will pause the order and notify our support team. Use this if the seller has not delivered or delivered unsatisfactory work.
      </p>
      {error && <ErrorBanner msg={error} />}
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Go Back</Button>
        <Button type="button" disabled={loading} onClick={submit} className="rounded-xl bg-orange-600 hover:bg-orange-700 text-white">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Opening&hellip;</> : <><AlertCircle className="w-4 h-4 mr-2" />Open Dispute</>}
        </Button>
      </div>
    </Modal>
  );
}

function RevisionModal({ order, onClose, onSuccess }: {
  order: OrderDto; onClose: () => void; onSuccess: () => void;
}) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      await apiClient.post("/api/order/revision/request", { orderId: order.id, revisionNote: note.trim() });
      onSuccess();
    } catch (err) { setError(extractError(err, "Failed to request revision")); }
    finally { setLoading(false); }
  };
  return (
    <Modal title="Request Revision" onClose={onClose}>
      <p className="text-sm text-gray-500 dark:text-gray-400">Describe the changes you need the seller to make.</p>
      <form onSubmit={submit} className="space-y-4">
        {error && <ErrorBanner msg={error} />}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">What needs to change? *</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} required rows={4}
            placeholder="Be specific about the changes you need..."
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c71463]/30 resize-none" />
        </div>
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Cancel</Button>
          <Button type="submit" disabled={loading || !note.trim()} className="rounded-xl bg-[#c71463] hover:bg-[#c71463]/90 text-white">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending&hellip;</> : <><RefreshCw className="w-4 h-4 mr-2" />Request Revision</>}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function OrderDetailPanel({ order, isBuyer, isSeller, onClose, onUpdate }: {
  order: OrderDto; isBuyer: boolean; isSeller: boolean;
  onClose: () => void; onUpdate: (updated: OrderDto) => void;
}) {
  const status = order.status?.toLowerCase() ?? "";
  type ModalType = "deliver" | "review" | "cancel" | "dispute" | "revision" | null;
  const [modal, setModal] = useState<ModalType>(null);
  const [completing, setCompleting] = useState(false);
  const [completeError, setCompleteError] = useState<string | null>(null);
  const [reviewDone, setReviewDone] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const handleComplete = async () => {
    setCompleting(true); setCompleteError(null);
    try {
      const { data } = await apiClient.put<OrderDto>(`/api/MarketplaceOps/orders/${order.id}/complete`);
      onUpdate(data); showToast("Order accepted as complete!"); setModal("review");
    } catch (err) { setCompleteError(extractError(err, "Failed to complete order")); }
    finally { setCompleting(false); }
  };

  const dl = daysLeft(order.deadline);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex-1 pr-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">{order.title}</h2>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", statusBadge(order.status))}>
                  {statusIcon(order.status)} {order.status}
                </span>
                {dl !== null && status === "inprogress" && (
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full",
                    dl < 0 ? "bg-red-100 text-red-700" : dl <= 1 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300")}>
                    {dl < 0 ? `${Math.abs(dl)}d overdue` : dl === 0 ? "Due today" : `${dl}d left`}
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-gray-400 text-xs mb-0.5">Buyer</p><p className="font-medium text-gray-900 dark:text-white">{order.buyerName}</p></div>
              <div><p className="text-gray-400 text-xs mb-0.5">Seller</p><p className="font-medium text-gray-900 dark:text-white">{order.sellerName}</p></div>
              <div>
                <p className="text-gray-400 text-xs mb-0.5">Amount</p>
                <p className="font-semibold text-gray-900 dark:text-white">${Number(order.amount?.amount ?? 0).toFixed(2)} {order.amount?.currency ?? "USD"}</p>
              </div>
              {order.sellerReceives != null && (
                <div><p className="text-gray-400 text-xs mb-0.5">Seller receives</p><p className="font-medium text-gray-900 dark:text-white">${Number(order.sellerReceives).toFixed(2)}</p></div>
              )}
              {order.deadline && (
                <div className="col-span-2"><p className="text-gray-400 text-xs mb-0.5">Deadline</p><p className="font-medium text-gray-900 dark:text-white">{new Date(order.deadline).toLocaleString()}</p></div>
              )}
            </div>

            {order.deliveryMessage && (
              <div className="rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700 p-4">
                <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 mb-1.5 uppercase tracking-wide">Delivery Note</p>
                <p className="text-sm text-teal-800 dark:text-teal-300 leading-relaxed">{order.deliveryMessage}</p>
              </div>
            )}

            {completeError && <ErrorBanner msg={completeError} />}
            {toast && (
              <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 px-4 py-3 text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" /> {toast}
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {isSeller && status === "inprogress" && (
                <Button onClick={() => setModal("deliver")} className="w-full rounded-xl bg-[#c71463] hover:bg-[#c71463]/90 text-white font-semibold py-5">
                  <Truck className="w-4 h-4 mr-2" /> Deliver Work
                </Button>
              )}
              {isBuyer && status === "delivered" && !reviewDone && (
                <Button onClick={handleComplete} disabled={completing} className="w-full rounded-xl bg-[#3E9666] hover:bg-[#3E9666]/90 text-white font-semibold py-5">
                  {completing ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Completing&hellip;</> : <><ThumbsUp className="w-4 h-4 mr-2" />Accept &amp; Complete</>}
                </Button>
              )}
              {isBuyer && (status === "inprogress" || status === "delivered") && (
                <Button variant="outline" onClick={() => setModal("revision")} className="w-full rounded-xl py-5 font-semibold">
                  <RefreshCw className="w-4 h-4 mr-2" /> Request Revision
                </Button>
              )}
              {isBuyer && (status === "inprogress" || status === "delivered") && (
                <Button variant="outline" onClick={() => setModal("dispute")}
                  className="w-full rounded-xl py-4 text-orange-600 border-orange-200 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-800 dark:hover:bg-orange-900/20 font-semibold">
                  <AlertCircle className="w-4 h-4 mr-2" /> Open Dispute
                </Button>
              )}
              {isBuyer && (status === "pending" || status === "inprogress") && (
                <Button variant="outline" onClick={() => setModal("cancel")}
                  className="w-full rounded-xl py-4 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 font-semibold">
                  <XCircle className="w-4 h-4 mr-2" /> Cancel Order
                </Button>
              )}
              {isBuyer && status === "completed" && !reviewDone && (
                <Button variant="outline" onClick={() => setModal("review")}
                  className="w-full rounded-xl py-4 text-amber-600 border-amber-200 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-800 dark:hover:bg-amber-900/20 font-semibold">
                  <Star className="w-4 h-4 mr-2" /> Leave a Review
                </Button>
              )}
              {(status === "cancelled" || status === "disputed" || reviewDone) && !toast && (
                <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-2">
                  {reviewDone ? "Review submitted — thank you!" : "No actions available for this order."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {modal === "deliver" && <DeliverModal order={order} onClose={() => setModal(null)} onSuccess={(u) => { onUpdate(u); setModal(null); showToast("Work delivered successfully!"); }} />}
      {modal === "review" && <ReviewModal order={order} onClose={() => setModal(null)} onSuccess={() => { setModal(null); setReviewDone(true); showToast("Review submitted — thank you!"); }} />}
      {modal === "cancel" && <CancelModal order={order} onClose={() => setModal(null)} onSuccess={(u) => { onUpdate(u); setModal(null); showToast("Order cancelled."); }} />}
      {modal === "dispute" && <DisputeModal order={order} onClose={() => setModal(null)} onSuccess={(u) => { onUpdate(u); setModal(null); showToast("Dispute opened. Our team will review it shortly."); }} />}
      {modal === "revision" && <RevisionModal order={order} onClose={() => setModal(null)} onSuccess={() => { setModal(null); showToast("Revision request sent!"); }} />}
    </>
  );
}

export default function OrdersPage() {
  const t = useTranslations("Orders");
  const { user } = useAuth();
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

  const handleUpdate = (updated: OrderDto) => {
    setOrders((prev) => prev.map((o) => o.id === updated.id ? updated : o));
    setSelected(updated);
  };

  const userDisplayName = user?.displayName ?? (user as { fullName?: string } | null)?.fullName ?? "";
  const getRole = (order: OrderDto) => {
    const isSeller = order.sellerName === userDisplayName;
    return { isBuyer: order.buyerName === userDisplayName || !isSeller, isSeller };
  };

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
                {orders.map((order) => {
                  const dl = daysLeft(order.deadline);
                  const s = order.status?.toLowerCase() ?? "";
                  return (
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
                        {order.deadline ? (
                          <div>
                            <p>{new Date(order.deadline).toLocaleDateString()}</p>
                            {dl !== null && s === "inprogress" && (
                              <p className={cn("text-xs mt-0.5 font-medium",
                                dl < 0 ? "text-red-500" : dl <= 1 ? "text-orange-500" : "text-gray-400")}>
                                {dl < 0 ? `${Math.abs(dl)}d overdue` : dl === 0 ? "Due today" : `${dl}d left`}
                              </p>
                            )}
                          </div>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelected(order)}
                          className="p-1.5 text-gray-400 hover:text-[#c71463] transition-colors rounded-lg hover:bg-[#c71463]/5"
                          title="View & manage order"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
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

      {/* Order Detail + Actions Panel */}
      {selected && (() => {
        const { isBuyer, isSeller } = getRole(selected);
        return (
          <OrderDetailPanel
            order={selected}
            isBuyer={isBuyer}
            isSeller={isSeller}
            onClose={() => setSelected(null)}
            onUpdate={handleUpdate}
          />
        );
      })()}
    </div>
  );
}
