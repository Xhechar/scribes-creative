"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Palette,
  Printer,
  Heart,
  Shirt,
  Camera,
  Code2,
  Megaphone,
  Landmark,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { creativeCategories, utilityCategories } from "@/lib/data/categories";

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

// Cycles the three accent colors across the cards so color becomes a
// wayfinding device rather than a one-off decoration.
const accents = ["bg-brand-navy", "bg-brand-red", "bg-brand-amber"];

export function CategoriesStrip() {
  return (
    <section className="border-y border-brand-navy/10 bg-brand-paper py-16 sm:py-20">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
            What We Do
          </h2>
          <span className="hidden font-mono text-xs uppercase tracking-[0.15em] text-brand-slate sm:block">
            8 Service Lines
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {creativeCategories.map((category, i) => {
            const Icon = iconMap[category.icon as string];
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              >
                <Link
                  href={`/services/${category.slug}`}
                  className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-lg border border-brand-navy/10 bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-1 ${accents[i % accents.length]}`}
                  />
                  {Icon && <Icon className="h-6 w-6 text-brand-navy" />}
                  <span className="font-body text-sm font-semibold leading-tight text-brand-navy">
                    {category.name}
                  </span>
                  <ArrowUpRight className="absolute right-4 top-5 h-4 w-4 text-brand-navy/20 transition-colors group-hover:text-brand-red" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {utilityCategories.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg bg-brand-navy/[0.03] p-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-brand-slate">
              Also need a document or government service done?
            </span>
            {utilityCategories.map((category) => (
              <Link
                key={category.id}
                href={`/services/${category.slug}`}
                className="font-body text-sm font-medium text-brand-navy underline decoration-brand-amber decoration-2 underline-offset-4 hover:text-brand-red"
              >
                {category.name} →
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}