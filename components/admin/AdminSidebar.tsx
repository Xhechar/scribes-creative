"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Inbox,
  Star,
  FileText,
  ImageIcon,
  Briefcase,
  HelpCircle,
  LogOut,
  Layers,
  List,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

function RegMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
      <line
        x1="8"
        y1="1"
        x2="8"
        y2="15"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="1"
        y1="8"
        x2="15"
        y2="8"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function AdminSidebar({
  newLeads = 0,
  pendingReviews = 0,
  onClose,
}: {
  newLeads?: number;
  pendingReviews?: number;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    {
      label: "Leads",
      href: "/admin/leads",
      icon: Inbox,
      badge: newLeads || undefined,
    },
    {
      label: "Reviews",
      href: "/admin/reviews",
      icon: Star,
      badge: pendingReviews || undefined,
    },
    { label: "Blog", href: "/admin/blog", icon: FileText },
    { label: "Portfolio", href: "/admin/portfolio", icon: ImageIcon },
    { label: "Categories", href: "/admin/categories", icon: Layers },
    { label: "Services", href: "/admin/services", icon: Briefcase },
    { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  ];

  return (
    <aside className="flex h-screen w-56 flex-col bg-brand-navy text-brand-paper">
      {/* Logo + mobile close */}
      <div className="flex items-center gap-1.5 border-b border-brand-paper/10 px-5 py-4">
        <RegMark className="h-4 w-4 text-brand-red" />
        <span className="font-display text-lg font-extrabold tracking-tight">
          SCR<span className="text-brand-amber">I</span>BES
        </span>
        <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-brand-paper/40">
          Admin
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 rounded p-0.5 text-brand-paper/50 hover:text-brand-paper lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="flex flex-col gap-0.5 px-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 font-body text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-red text-brand-paper"
                      : "text-brand-paper/70 hover:bg-brand-paper/10 hover:text-brand-paper",
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                  {item.badge ? (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-amber px-1 font-mono text-[10px] font-bold text-brand-navy">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign out */}
      <div className="border-t border-brand-paper/10 p-2">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 font-body text-sm font-medium text-brand-paper/60 transition-colors hover:bg-brand-paper/10 hover:text-brand-paper"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}