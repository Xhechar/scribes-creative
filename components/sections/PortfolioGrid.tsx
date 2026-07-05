"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CloudinaryPresets,
  getCloudinaryBlurUrl,
} from "@/lib/utils/cloudinary";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: { id: string; name: string; slug: string } | null;
  images: { url: string }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function PortfolioGrid({
  items,
  categories,
}: {
  items: PortfolioItem[];
  categories: Category[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filtered = activeId
    ? items.filter((item) => item.category?.id === activeId)
    : items;

  // Only show categories that actually have portfolio items.
  const usedCategoryIds = new Set(
    items.map((i) => i.category?.id).filter(Boolean),
  );
  const filterCategories = categories.filter((c) => usedCategoryIds.has(c.id));

  return (
    <section className="bg-brand-paper py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveId(null)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-body text-sm font-medium transition-colors",
              activeId === null
                ? "border-brand-navy bg-brand-navy text-brand-paper"
                : "border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5",
            )}
          >
            All
          </button>
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 font-body text-sm font-medium transition-colors",
                activeId === cat.id
                  ? "border-brand-navy bg-brand-navy text-brand-paper"
                  : "border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const cover = item.images[0]?.url;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-brand-navy/10 shadow-sm"
                  >
                    {cover ? (
                      <Image
                        src={CloudinaryPresets.card(cover)}
                        alt={item.title}
                        fill
                        placeholder="blur"
                        blurDataURL={getCloudinaryBlurUrl(cover)}
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-brand-navy/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/10 to-transparent" />

                    {item.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-brand-navy">
                        {item.category.name}
                      </span>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-display text-base font-bold text-white">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-1 line-clamp-2 font-body text-xs text-white/70">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center font-body text-sm text-brand-slate">
            No projects in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}