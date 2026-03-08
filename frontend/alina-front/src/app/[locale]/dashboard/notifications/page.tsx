"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import apiClient from "@/lib/apiClient";
import { Bell, CheckCheck, MessageCircle, ShoppingCart, Star, DollarSign, AlertCircle } from "lucide-react";

interface NotificationItem {
  id: string;
  type?: string;
  title?: string;
  message?: string;
  body?: string;
  isRead: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}

function notifIcon(type?: string) {
  const t = (type ?? "").toLowerCase();
  if (t.includes("message") || t.includes("chat"))
    return <MessageCircle className="w-4 h-4 text-blue-500" />;
  if (t.includes("order"))
    return <ShoppingCart className="w-4 h-4 text-purple-500" />;
  if (t.includes("review") || t.includes("rating"))
    return <Star className="w-4 h-4 text-amber-500" />;
  if (t.includes("payment") || t.includes("earn") || t.includes("wallet"))
    return <DollarSign className="w-4 h-4 text-green-500" />;
  return <AlertCircle className="w-4 h-4 text-gray-400" />;
}

export default function NotificationsPage() {
  const t = useTranslations("Notifications");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const r = await apiClient.get<NotificationItem[] | { items?: NotificationItem[]; data?: NotificationItem[] }>(
        "/api/Notification"
      );
      const data = r.data;
      setNotifications(
        Array.isArray(data) ? data : data.items ?? data.data ?? []
      );
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id: string) => {
    try {
      await apiClient.put(`/api/Notification/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {
      // ignore
    }
  };

  const markAllRead = async () => {
    setMarkingAll(true);
    try {
      await apiClient.put("/api/Notification/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      // ignore
    } finally {
      setMarkingAll(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="p-6 max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-[#c71463]" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("title")}
          </h1>
          {unreadCount > 0 && (
            <span className="bg-[#c71463] text-white text-xs font-bold rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            disabled={markingAll}
            className="flex items-center gap-2 text-sm text-[#c71463] hover:text-[#a50f51] font-medium transition-colors disabled:opacity-50"
          >
            <CheckCheck className="w-4 h-4" />
            {t("markAllRead")}
          </button>
        )}
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <Bell className="w-14 h-14 mx-auto mb-3 opacity-20" />
          <p className="text-lg font-medium">{t("empty")}</p>
          <p className="text-sm mt-1">{t("emptyHint")}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.isRead && markAsRead(notif.id)}
              className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                notif.isRead
                  ? "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 opacity-70"
                  : "bg-pink-50 dark:bg-pink-900/10 border-pink-100 dark:border-pink-800/30 hover:bg-pink-100 dark:hover:bg-pink-900/20"
              }`}
            >
              {/* Icon */}
              <div
                className={`p-2.5 rounded-xl flex-shrink-0 ${
                  notif.isRead
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "bg-white dark:bg-gray-800 shadow-sm"
                }`}
              >
                {notifIcon(notif.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {notif.title && (
                  <p
                    className={`text-sm font-semibold ${
                      notif.isRead
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {notif.title}
                  </p>
                )}
                <p
                  className={`text-sm ${
                    notif.isRead
                      ? "text-gray-500 dark:text-gray-400"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {notif.message ?? notif.body ?? notif.type ?? "Notification"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(notif.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Unread dot */}
              {!notif.isRead && (
                <div className="w-2.5 h-2.5 bg-[#c71463] rounded-full flex-shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
