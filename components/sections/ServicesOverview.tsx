"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Palette,
  Printer,
  Heart,
  Shirt,
  Camera,
  Code2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Printer,
  Heart,
  Shirt,
  Camera,
  Code2,
};

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface CategoryWithServices {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  services: ServiceItem[];
}

export function ServicesOverview({
  categories,
}: {
  categories: CategoryWithServices[];
}) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug);
  const shouldReduceMotion = useReducedMotion();
  const active = categories.find((c) => c.slug === activeSlug) ?? categories[0];

  if (!active) return null;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
            Full Catalog
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            Everything your brand needs, under one roof.
          </h2>
        </div>

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const Icon = category.icon ? iconMap[category.icon] : null;
            const isActive = category.slug === active.slug;
            return (
              <button
                key={category.id}
                onClick={() => setActiveSlug(category.slug)}
                aria-pressed={isActive}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 font-body text-sm font-medium transition-colors",
                  isActive
                    ? "border-brand-navy bg-brand-navy text-brand-paper"
                    : "border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5",
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Active category's services */}
        <motion.div
          key={active.slug}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {active.services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${active.slug}/${service.slug}`}
              className="group flex items-start justify-between gap-3 rounded-lg border border-brand-navy/10 p-4 transition-colors hover:border-brand-red/30 hover:bg-brand-navy/[0.02]"
            >
              <div>
                <h3 className="font-body text-sm font-semibold text-brand-navy">
                  {service.name}
                </h3>
                <p className="mt-1 font-body text-xs text-brand-slate">
                  {service.description}
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-navy/30 transition-colors group-hover:translate-x-0.5 group-hover:text-brand-red" />
            </Link>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 font-body text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-red/90"
          >
            Don&rsquo;t see what you need? Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}