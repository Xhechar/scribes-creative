"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Palette,
  Printer,
  Heart,
  Shirt,
  Camera,
  Code2,
  Megaphone,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/lib/data/site-config";
import { cn } from "@/lib/utils";
import type { NavCategory } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Printer,
  Heart,
  Shirt,
  Camera,
  Code2,
  Megaphone,
  Landmark,
};

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

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

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-1.5 group", className)}>
      <RegMark className="h-4 w-4 text-brand-red transition-transform duration-300 group-hover:rotate-45" />
      <span className="font-display text-2xl font-extrabold tracking-tight text-brand-paper">
        SCRIBES
      </span>
    </Link>
  );
}

export function Header({ categories }: { categories: NavCategory[] }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const creative = categories.filter((c) => c.type === "CREATIVE");
  const utility = categories.filter((c) => c.type === "UTILITY");

  return (
    <header className="sticky top-0 z-50 bg-brand-navy">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 font-body text-sm font-medium text-brand-paper transition-colors hover:text-brand-amber"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  servicesOpen && "rotate-180",
                )}
              />
            </button>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-4">
                <div className="rounded-lg border border-brand-navy/10 bg-brand-paper p-6 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    {creative.map((category) => {
                      const Icon = category.icon
                        ? iconMap[category.icon]
                        : null;
                      return (
                        <Link
                          key={category.id}
                          href={`/services/${category.slug}`}
                          className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-brand-navy/5"
                        >
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-navy/5 text-brand-navy group-hover:bg-brand-red group-hover:text-brand-paper">
                            {Icon && <Icon className="h-4 w-4" />}
                          </span>
                          <span>
                            <span className="block font-body text-sm font-semibold text-brand-navy">
                              {category.name}
                            </span>
                            <span className="block font-body text-xs text-brand-slate">
                              {category.description}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                  {utility.length > 0 && (
                    <div className="mt-4 border-t border-brand-navy/10 pt-4">
                      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
                        Walk-in &amp; document services
                      </span>
                      {utility.map((category) => {
                        const Icon = category.icon
                          ? iconMap[category.icon]
                          : null;
                        return (
                          <Link
                            key={category.id}
                            href={`/services/${category.slug}`}
                            className="flex items-center gap-2 rounded-md p-2 text-sm text-brand-slate transition-colors hover:bg-brand-navy/5 hover:text-brand-navy"
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                            {category.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-brand-paper transition-colors hover:text-brand-amber"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 font-body text-sm font-medium text-brand-paper hover:text-brand-amber"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md bg-brand-red px-4 py-2 font-body text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-red/90"
          >
            <FaWhatsapp className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-brand-paper lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-brand-paper/10 bg-brand-navy px-4 pb-6 pt-2 lg:hidden">
          <span className="mb-2 mt-4 block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-amber">
            Services
          </span>
          <div className="flex flex-col gap-1">
            {categories.map((category) => {
              const Icon = category.icon ? iconMap[category.icon] : null;
              return (
                <Link
                  key={category.id}
                  href={`/services/${category.slug}`}
                  className="flex items-center gap-3 rounded-md py-2 text-brand-paper"
                  onClick={() => setMobileOpen(false)}
                >
                  {Icon && <Icon className="h-4 w-4 text-brand-amber" />}
                  <span className="font-body text-sm">{category.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col gap-1 border-t border-brand-paper/10 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 font-body text-sm text-brand-paper"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-md bg-brand-red px-4 py-3 font-body text-sm font-semibold text-brand-paper"
          >
            <FaWhatsapp className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>
      )}
    </header>
  );
}
