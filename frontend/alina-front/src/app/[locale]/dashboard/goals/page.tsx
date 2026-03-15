"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import apiClient from "@/lib/apiClient";
import { Plus, Pencil, Trash2, Trophy, Target, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type GoalType   = "Revenue" | "Orders" | "Rating" | "ResponseTime" | "CompletionRate";
type GoalPeriod = "Weekly" | "Monthly" | "Quarterly" | "Yearly";
type GoalStatus = "Active" | "Completed" | "Expired" | "Paused";

interface Goal {
  id: string;
  title: string;
  description: string;
  type: GoalType;
  period: GoalPeriod;
  targetValue: number;
  currentValue: number;
  progressPercentage: number;
  startDate: string;
  endDate: string;
  status: GoalStatus;
  isAchieved: boolean;
  achievedAt?: string;
  achievementBadge?: string;
}

interface GoalForm {
  title: string;
  description: string;
  type: GoalType;
  period: GoalPeriod;
  targetValue: string;
  endDate: string;
}

const GOAL_TYPES: GoalType[]   = ["Revenue", "Orders", "Rating", "ResponseTime", "CompletionRate"];
const GOAL_PERIODS: GoalPeriod[] = ["Weekly", "Monthly", "Quarterly", "Yearly"];
const GOAL_STATUSES: GoalStatus[] = ["Active", "Paused", "Completed", "Expired"];

const TYPE_ICONS: Record<GoalType, string> = {
  Revenue: "💰",
  Orders: "📦",
  Rating: "⭐",
  ResponseTime: "⚡",
  CompletionRate: "✅",
};

const STATUS_COLORS: Record<GoalStatus, string> = {
  Active:    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Completed: "bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-400",
  Expired:   "bg-red-100    text-red-700    dark:bg-red-900/30    dark:text-red-400",
  Paused:    "bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-400",
};

function extractError(e: unknown): string {
  if (e && typeof e === "object" && "response" in e) {
    const r = (e as { response?: { data?: unknown } }).response;
    if (typeof r?.data === "string") return r.data;
    if (r?.data && typeof r.data === "object") return JSON.stringify(r.data);
  }
  return "Something went wrong";
}

const EMPTY_FORM: GoalForm = {
  title: "",
  description: "",
  type: "Revenue",
  period: "Monthly",
  targetValue: "",
  endDate: "",
};

// ── Modal ─────────────────────────────────────────────────────────────────────

function GoalModal({
  open,
  onClose,
  onSave,
  editGoal,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  editGoal?: Goal;
}) {
  const t = useTranslations("Goals");
  const [form, setForm]     = useState<GoalForm>(EMPTY_FORM);
  const [status, setStatus] = useState<GoalStatus>("Active");
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState("");

  useEffect(() => {
    if (editGoal) {
      setForm({
        title: editGoal.title,
        description: editGoal.description,
        type: editGoal.type,
        period: editGoal.period,
        targetValue: String(editGoal.targetValue),
        endDate: editGoal.endDate.split("T")[0],
      });
      setStatus(editGoal.status);
    } else {
      setForm(EMPTY_FORM);
      setStatus("Active");
    }
    setErr("");
  }, [editGoal, open]);

  const set = (k: keyof GoalForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErr("");
    try {
      const payload = {
        title:       form.title,
        description: form.description,
        type:        form.type,
        period:      form.period,
        targetValue: parseFloat(form.targetValue),
        endDate:     new Date(form.endDate).toISOString(),
        ...(editGoal ? { status } : {}),
      };
      if (editGoal) {
        await apiClient.put(`/api/Dashboard/goals/${editGoal.id}`, payload);
      } else {
        await apiClient.post("/api/Dashboard/goals", payload);
      }
      onSave();
      onClose();
    } catch (e) {
      setErr(extractError(e));
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {editGoal ? t("editGoal") : t("newGoal")}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {err && <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">{err}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("formTitle")}</label>
            <input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder={t("formTitlePlaceholder")}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("formDesc")}</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("formType")}</label>
              <select
                required
                value={form.type}
                onChange={(e) => set("type", e.target.value as GoalType)}
                disabled={!!editGoal}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463] disabled:opacity-50"
              >
                {GOAL_TYPES.map((gt) => (
                  <option key={gt} value={gt}>{gt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("formPeriod")}</label>
              <select
                required
                value={form.period}
                onChange={(e) => set("period", e.target.value as GoalPeriod)}
                disabled={!!editGoal}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463] disabled:opacity-50"
              >
                {GOAL_PERIODS.map((gp) => (
                  <option key={gp} value={gp}>{gp}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("formTarget")}</label>
              <input
                required
                type="number"
                min="0.01"
                step="any"
                value={form.targetValue}
                onChange={(e) => set("targetValue", e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("formEndDate")}</label>
              <input
                required
                type="date"
                value={form.endDate}
                onChange={(e) => set("endDate", e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463]"
              />
            </div>
          </div>

          {editGoal && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("formStatus")}</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as GoalStatus)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463]"
              >
                {GOAL_STATUSES.map((gs) => (
                  <option key={gs} value={gs}>{gs}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 text-sm rounded-xl bg-[#c71463] text-white font-medium hover:bg-[#a0105a] disabled:opacity-60 transition-colors"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Goal Card ─────────────────────────────────────────────────────────────────

function GoalCard({ goal, onEdit, onDelete }: { goal: Goal; onEdit: () => void; onDelete: () => void }) {
  const t = useTranslations("Goals");
  const pct = Math.min(Number(goal.progressPercentage), 100);
  const daysLeft = Math.ceil((new Date(goal.endDate).getTime() - Date.now()) / 86400000);

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border transition-all",
      goal.isAchieved
        ? "border-amber-300 dark:border-amber-600"
        : "border-gray-100 dark:border-gray-700"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl">{TYPE_ICONS[goal.type]}</span>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white truncate">{goal.title}</p>
            {goal.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{goal.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={onEdit} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", STATUS_COLORS[goal.status])}>
          {goal.status}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
          {goal.period}
        </span>
        {goal.isAchieved && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 flex items-center gap-1">
            <Trophy className="w-3 h-3" /> {t("achieved")}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {Number(goal.currentValue).toFixed(1)} / {Number(goal.targetValue).toFixed(1)}
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">{pct.toFixed(0)}%</span>
        </div>
        <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700",
              pct >= 100 ? "bg-amber-500" : "bg-[#c71463]"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">
          {daysLeft > 0
            ? t("daysLeft", { days: daysLeft })
            : daysLeft === 0
            ? t("dueToday")
            : t("expired")}
        </p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GoalsPage() {
  const t = useTranslations("Goals");
  const [goals, setGoals]         = useState<Goal[]>([]);
  const [loading, setLoading]     = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editGoal, setEditGoal]   = useState<Goal | undefined>(undefined);
  const [deleting, setDeleting]   = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await apiClient.get<Goal[]>("/api/Dashboard/goals");
      setGoals(res.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditGoal(undefined); setModalOpen(true); };
  const openEdit   = (g: Goal) => { setEditGoal(g); setModalOpen(true); };

  const handleDelete = async (id: string) => {
    if (!confirm(t("confirmDelete"))) return;
    setDeleting(id);
    try {
      await apiClient.delete(`/api/Dashboard/goals/${id}`);
      setGoals((prev) => prev.filter((g) => g.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  const active    = goals.filter((g) => g.status === "Active");
  const completed = goals.filter((g) => g.isAchieved || g.status === "Completed");
  const paused    = goals.filter((g) => g.status === "Paused" || g.status === "Expired");

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{t("subtitle")}</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c71463] text-white text-sm font-medium hover:bg-[#a0105a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t("newGoal")}
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-44 rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : goals.length === 0 ? (
        <div className="text-center py-20">
          <Target className="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">{t("noGoals")}</p>
          <p className="text-sm text-gray-400 mt-1 mb-6">{t("noGoalsHint")}</p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c71463] text-white text-sm font-medium hover:bg-[#a0105a] transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t("newGoal")}
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {active.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">{t("activeGoals")} ({active.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {active.map((g) => (
                  <div key={g.id} className={cn(deleting === g.id && "opacity-50 pointer-events-none")}>
                    <GoalCard goal={g} onEdit={() => openEdit(g)} onDelete={() => handleDelete(g.id)} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {completed.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">{t("completedGoals")} ({completed.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completed.map((g) => (
                  <div key={g.id} className={cn(deleting === g.id && "opacity-50 pointer-events-none")}>
                    <GoalCard goal={g} onEdit={() => openEdit(g)} onDelete={() => handleDelete(g.id)} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {paused.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">{t("otherGoals")} ({paused.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paused.map((g) => (
                  <div key={g.id} className={cn(deleting === g.id && "opacity-50 pointer-events-none")}>
                    <GoalCard goal={g} onEdit={() => openEdit(g)} onDelete={() => handleDelete(g.id)} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <GoalModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={load}
        editGoal={editGoal}
      />
    </div>
  );
}
