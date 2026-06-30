import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { getAllPortfolioItems } from "@/lib/services/portfolio.service";
import { getAllCategories } from "@/lib/services/category.service";
import { getReviewStats } from "@/lib/services/review.service";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { siteConfig } from "@/lib/data/site-config";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Scribes Creative Solutions' past work — branding, print, photography, signage, merchandise, and web development projects.",
};

export default async function PortfolioPage() {
  const [items, categories, reviewStats] = await Promise.all([
    getAllPortfolioItems(),
    getAllCategories(),
    getReviewStats(),
  ]);

  return (
    <>
      <section className="bg-brand-navy py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-amber">
            Our Work
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-paper sm:text-5xl">
            Projects we&rsquo;re proud of.
          </h1>
          <p className="mt-4 max-w-xl font-body text-base text-brand-paper/70">
            Every project here started with a business that needed to look the
            part. Browse by service type or scroll through everything —{" "}
            {items.length} project{items.length === 1 ? "" : "s"} and counting.
          </p>
          <TrustStrip
            averageRating={reviewStats.average}
            reviewCount={reviewStats.count}
            variant="dark"
            className="mt-5"
          />
        </div>
      </section>

      <PortfolioGrid items={items} categories={categories} />

      {/* ── Bottom CTA ── */}
      <section className="border-t border-brand-navy/10 bg-white py-14 text-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-brand-navy">
            Don&rsquo;t see your industry here?
          </h2>
          <p className="mt-3 font-body text-sm text-brand-slate">
            We probably can still help — every project on this page started as a
            first conversation. Tell us what you need and we&rsquo;ll come back
            with a quote.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 font-body text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-red/90"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-brand-navy/20 px-6 py-3 font-body text-sm font-semibold text-brand-navy hover:bg-brand-navy/5"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
