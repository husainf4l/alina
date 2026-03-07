"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardGuard from "@/components/dashboard/DashboardGuard";
import AiChatPanel from "@/components/dashboard/AiChatPanel";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <DashboardGuard>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Left sidebar */}
        <DashboardSidebar />

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader aiOpen={aiOpen} onAiToggle={() => setAiOpen((o) => !o)} />
          <main className="flex-1 overflow-y-auto px-6 py-8">
            {children}
          </main>
        </div>

        {/* Right AI chat panel */}
        <AiChatPanel open={aiOpen} onClose={() => setAiOpen(false)} />
      </div>
    </DashboardGuard>
  );
}


