"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Logo } from "@/components/ui/Logo";

interface AdminShellProps {
  children: React.ReactNode;
  newLeads: number;
  pendingReviews: number;
}

export function AdminShell({
  children,
  newLeads,
  pendingReviews,
}: AdminShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar
          newLeads={newLeads}
          pendingReviews={pendingReviews}
          onClose={() => setOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex shrink-0 items-center gap-3 border-b border-brand-dark/10 bg-brand-dark px-4 py-3 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-1.5 text-brand-paper hover:bg-brand-paper/10"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo height={30} variant="dark-bg" />
          <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-brand-paper/40">
            Admin
          </span>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}