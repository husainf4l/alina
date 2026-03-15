"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";
import { MessageCircle, Send, Search } from "lucide-react";

interface ChatSummary {
  id: string;
  otherUserId: string;
  otherUserName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface MessageDto {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  attachmentUrl?: string | null;
  isRead: boolean;
  readAt?: string | null;
  createdAt: string;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString();
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function MessagesPage() {
  const t = useTranslations("Messages");
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [filtered, setFiltered] = useState<ChatSummary[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatSummary | null>(null);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load chat list
  useEffect(() => {
    apiClient
      .get<ChatSummary[]>("/api/Messaging/conversations")
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : (r.data as { items?: ChatSummary[] })?.items ?? [];
        setChats(data);
        setFiltered(data);
      })
      .catch(() => setChats([]))
      .finally(() => setLoadingChats(false));
  }, []);

  // Filter chats by search
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(chats);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        chats.filter(
          (c) =>
            c.otherUserName.toLowerCase().includes(q) ||
            c.lastMessage.toLowerCase().includes(q)
        )
      );
    }
  }, [search, chats]);

  // Load messages for selected chat
  const loadMessages = useCallback(async (conversationId: string) => {
    try {
      const r = await apiClient.get<MessageDto[] | { items?: MessageDto[] }>(
        `/api/Messaging/conversations/${conversationId}/messages`,
        { params: { pageSize: 50 } }
      );
      const data = Array.isArray(r.data) ? r.data : (r.data as { items?: MessageDto[] })?.items ?? [];
      setMessages(data);
    } catch {
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    if (!selectedChat) return;
    setLoadingMessages(true);
    loadMessages(selectedChat.id).finally(() =>
      setLoadingMessages(false)
    );
    // Poll every 5 seconds
    pollRef.current = setInterval(
      () => loadMessages(selectedChat.id),
      5000
    );
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [selectedChat, loadMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || sending) return;
    setSending(true);
    try {
      const r = await apiClient.post<MessageDto>(
        `/api/Messaging/conversations/${selectedChat.id}/messages`,
        { content: newMessage.trim() }
      );
      setMessages((prev) => [...prev, r.data]);
      setNewMessage("");
      // Update chat list preview
      setChats((prev) =>
        prev.map((c) =>
          c.id === selectedChat.id
            ? { ...c, lastMessage: newMessage.trim(), lastMessageTime: new Date().toISOString() }
            : c
        )
      );
    } catch {
      // ignore
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar: Chat List */}
      <div className="w-80 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#c71463]" />
            {t("title")}
          </h1>
          <div className="mt-3 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c71463]/30"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {loadingChats ? (
            <div className="space-y-2 p-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500 px-4">
              <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">{t("noChats")}</p>
            </div>
          ) : (
            filtered.map((chat) => (
              <button
                key={chat.otherUserId}
                onClick={() => setSelectedChat(chat)}
                className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors border-b border-gray-50 dark:border-gray-700 last:border-0 ${
                  selectedChat?.otherUserId === chat.otherUserId
                    ? "bg-pink-50 dark:bg-pink-900/10 border-l-2 border-l-[#c71463]"
                    : ""
                }`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c71463] to-[#B05088] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  {getInitials(chat.otherUserName)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {chat.otherUserName}
                    </p>
                    <p className="text-xs text-gray-400 flex-shrink-0 ml-1">
                      {formatTime(chat.lastMessageTime)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 flex-1">
                      {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="ml-2 flex-shrink-0 bg-[#c71463] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main: Conversation */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c71463] to-[#B05088] flex items-center justify-center text-white font-semibold">
                {getInitials(selectedChat.otherUserName)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {selectedChat.otherUserName}
                </p>
                <p className="text-xs text-gray-400">{t("online")}</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loadingMessages ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
                    >
                      <div className="h-10 w-48 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">{t("noMessages")}</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMine = msg.senderId === user?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          isMine
                            ? "bg-[#c71463] text-white rounded-br-sm"
                            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 rounded-bl-sm"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p
                          className={`text-[10px] mt-1 ${
                            isMine
                              ? "text-pink-200"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            {/* Message Input */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-end gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={t("messagePlaceholder")}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#c71463]/30"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="p-2.5 bg-[#c71463] text-white rounded-xl hover:bg-[#a50f51] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
            <MessageCircle className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">{t("selectChat")}</p>
            <p className="text-sm mt-1">{t("selectChatHint")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
