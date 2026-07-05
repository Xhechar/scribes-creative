"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  CloudinaryPresets,
  getCloudinaryBlurUrl,
} from "@/lib/utils/cloudinary";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  clientName: string | null;
  category: { name: string; slug: string } | null;
  images: { url: string }[];
}

export function PortfolioPreview({ items }: { items: PortfolioItem[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-brand-paper py-20 sm:py-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
              Our Work
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
              Real brands. Real results.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden items-center gap-2 font-body text-sm font-semibold text-brand-navy hover:text-brand-red sm:flex"
          >
            View Full Portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const coverImage = item.images[0]?.url;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : (i % 3) * 0.08,
                }}
              >
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-brand-navy/10 shadow-sm"
                >
                  {coverImage && (
                    <Image
                      src={CloudinaryPresets.card(coverImage)}
                      alt={item.title}
                      fill
                      placeholder="blur"
                      blurDataURL={getCloudinaryBlurUrl(coverImage)}
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/10 to-transparent" />

                  {item.category && (
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-brand-navy">
                      {item.category.name}
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 font-body text-xs text-white/75">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/portfolio"
            className="flex items-center gap-2 font-body text-sm font-semibold text-brand-navy"
          >
            View Full Portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}