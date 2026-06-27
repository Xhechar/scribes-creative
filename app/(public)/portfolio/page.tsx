import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { getAllPortfolioItems } from "@/lib/services/portfolio.service";
import { getAllCategories } from "@/lib/services/category.service";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Scribes Creative Solutions' past work — branding, print, photography, signage, merchandise, and web development projects across Nairobi.",
};

export default async function PortfolioPage() {
  const [items, categories] = await Promise.all([
    getAllPortfolioItems(),
    getAllCategories(),
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
            part. Browse by service type or scroll through everything.
          </p>
        </div>
      </section>

      <PortfolioGrid items={items} categories={categories} />
    </>
  );
}