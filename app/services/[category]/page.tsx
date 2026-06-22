import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
import {
  getCategoryBySlug,
  getAllCategories,
} from "@/lib/services/category.service";
import { getServicesByCategory } from "@/lib/services/service.service";
import { getPortfolioItemsByCategory } from "@/lib/services/portfolio.service";
import { getFaqsByCategory } from "@/lib/services/faq.service";
import { Section, Breadcrumb } from "@/components/ui/shared";
import { FaqSection } from "@/components/sections/FaqSection";
import { siteConfig } from "@/lib/data/site-config";
import type { ServiceItem, PortfolioItemSummary } from "@/types";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c: { slug: string }) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.category);
  if (!category) return {};
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = await getCategoryBySlug(params.category);
  if (!category) notFound();

  const [services, portfolioItems, faqs] = await Promise.all([
    getServicesByCategory(params.category),
    getPortfolioItemsByCategory(category.id),
    getFaqsByCategory(category.id),
  ]);

  return (
    <>
      <section className="bg-brand-navy py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            crumbs={[
              { label: "Services", href: "/#services" },
              { label: category.name },
            ]}
          />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-amber">
            Services
          </span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold text-brand-paper sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-xl font-body text-base text-brand-paper/70">
            {category.description}
          </p>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20Scribes%2C%20I%27m%20interested%20in%20${encodeURIComponent(category.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-red px-5 py-2.5 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90"
          >
            Get a Quote <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Section className="bg-brand-paper">
        <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
          What&rsquo;s included
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(services as ServiceItem[]).map((service) => (
            <Link
              key={service.id}
              href={`/services/${params.category}/${service.slug}`}
              className="group flex flex-col gap-3 rounded-xl border border-brand-navy/10 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-body text-sm font-semibold text-brand-navy">
                  {service.name}
                </h3>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy/20 transition-colors group-hover:text-brand-red" />
              </div>
              <p className="font-body text-xs text-brand-slate">
                {service.description}
              </p>
              {service.priceFrom && (
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-red">
                  From Ksh {service.priceFrom.toLocaleString()}{" "}
                  {service.priceUnit}
                </span>
              )}
              {service.requirements.length > 0 && (
                <ul className="mt-1 flex flex-col gap-1.5 border-t border-brand-navy/5 pt-3">
                  {service.requirements.slice(0, 3).map((req: string) => (
                    <li key={req} className="flex items-start gap-1.5">
                      <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-brand-amber" />
                      <span className="font-body text-xs text-brand-slate">
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Link>
          ))}
        </div>
      </Section>

      {portfolioItems.length > 0 && (
        <Section className="bg-white">
          <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
            Our work in {category.name.toLowerCase()}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(portfolioItems as unknown as PortfolioItemSummary[])
              .slice(0, 3)
              .map((item) => {
                const cover = item.images[0]?.url;
                return (
                  <Link
                    key={item.id}
                    href={`/portfolio/${item.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-brand-navy/10"
                  >
                    {cover && (
                      <Image
                        src={cover}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="font-display text-sm font-bold text-white">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
          {portfolioItems.length > 3 && (
            <Link
              href="/portfolio"
              className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-navy hover:text-brand-red"
            >
              View all {portfolioItems.length} projects{" "}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </Section>
      )}

      {faqs.length > 0 && <FaqSection faqs={faqs} />}

      <section className="bg-brand-navy py-14 text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="font-display text-2xl font-bold text-brand-paper">
            Ready to get started?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-brand-red px-5 py-2.5 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90"
            >
              WhatsApp Us
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="rounded-md border border-brand-paper/20 px-5 py-2.5 font-body text-sm font-semibold text-brand-paper hover:bg-brand-paper/10"
            >
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}