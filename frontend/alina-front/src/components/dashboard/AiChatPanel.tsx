"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { X, Send, Sparkles, RotateCcw, Copy, Check } from "lucide-react";
import apiClient from "@/lib/apiClient";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

interface AiChatPanelProps {
  open: boolean;
  onClose: () => void;
}

const SUGGESTED_PROMPTS = [
  "How do I improve my gig ranking?",
  "Write a professional bio for me",
  "Tips for getting my first order",
  "How to price my services?",
];

export default function AiChatPanel({ open, onClose }: AiChatPanelProps) {
  const t = useTranslations("AiChat");
  const { user } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await apiClient.post("/api/ai/chat", {
        message: trimmed,
        history: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      });

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply ?? data.message ?? "I'm not sure how to help with that.",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: t("errorMessage"),
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const copyMessage = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => setMessages([]);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-s border-border bg-card transition-all duration-300 overflow-hidden",
        open ? "w-80 xl:w-96" : "w-0 border-s-0"
      )}
    >
      {open && (
        <>
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#B05088] to-[#7c2d5e]">
                <Sparkles className="size-3.5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t("title")}</p>
                <p className="text-[10px] text-muted-foreground leading-none">{t("subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  title={t("clearChat")}
                  className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col gap-4 pt-2">
                {/* Welcome */}
                <div className="flex flex-col gap-1.5 rounded-2xl bg-gradient-to-br from-[#B05088]/10 to-[#B05088]/5 border border-[#B05088]/15 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-[#B05088]" />
                    <span className="text-sm font-semibold text-foreground">{t("welcomeTitle")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("welcomeBody", { name: user?.displayName ?? user?.fullName ?? "" })}
                  </p>
                </div>

                {/* Suggested prompts */}
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{t("suggestions")}</p>
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className={cn(
                        "w-full text-start rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground",
                        "hover:border-[#B05088]/40 hover:bg-[#B05088]/5 transition-colors"
                      )}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  {/* Avatar */}
                  {msg.role === "assistant" && (
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#B05088] to-[#7c2d5e] mt-0.5">
                      <Sparkles className="size-3 text-white" />
                    </div>
                  )}

                  {/* Bubble */}
                  <div className={cn("group relative max-w-[85%] flex flex-col gap-1")}>
                    <div
                      className={cn(
                        "rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap",
                        msg.role === "user"
                          ? "bg-[#B05088] text-white rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      )}
                    >
                      {msg.content}
                    </div>

                    {/* Copy button — assistant only */}
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => copyMessage(msg.id, msg.content)}
                        className="self-start opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground px-1"
                      >
                        {copiedId === msg.id ? (
                          <><Check className="size-3 text-green-500" /> Copied</>
                        ) : (
                          <><Copy className="size-3" /> Copy</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#B05088] to-[#7c2d5e]">
                  <Sparkles className="size-3 text-white" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-3 py-2.5">
                  <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                  <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                  <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-border p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-border bg-background px-3 py-2 focus-within:border-[#B05088]/50 focus-within:ring-2 focus-within:ring-[#B05088]/10 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("inputPlaceholder")}
                rows={1}
                disabled={loading}
                className={cn(
                  "flex-1 resize-none bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60",
                  "outline-none max-h-32 leading-relaxed disabled:opacity-50"
                )}
                style={{ scrollbarWidth: "none" }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-xl transition-all",
                  input.trim() && !loading
                    ? "bg-[#B05088] text-white hover:bg-[#9a4078]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <Send className="size-3.5" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground/50">{t("disclaimer")}</p>
          </div>
        </>
      )}
    </aside>
  );
}
