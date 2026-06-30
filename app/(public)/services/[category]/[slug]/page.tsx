import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Phone,
  Tag,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  getServiceBySlug,
  getServicesByCategory,
} from "@/lib/services/service.service";
import {
  getCategoryBySlug,
  getAllCategories,
} from "@/lib/services/category.service";
import {
  getReviewsByCategory,
  getCategoryReviewStats,
} from "@/lib/services/review.service";
import { getFaqsByCategory } from "@/lib/services/faq.service";
import { Section, Breadcrumb } from "@/components/ui/shared";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd, serviceSchema } from "@/components/seo/JsonLD";
import { siteConfig } from "@/lib/data/site-config";
import type { ReviewItem } from "@/types";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  const params: { category: string; slug: string }[] = [];
  for (const category of categories) {
    const services = await getServicesByCategory(category.slug);
    for (const service of services) {
      params.push({ category: category.slug, slug: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category: categoryParams, slug: slugParams } = await params;
  const service = await getServiceBySlug(slugParams);
  if (!service) return {};
  return { title: service.name, description: service.description };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categoryParams, slug: slugParams } = await params;
  const service = await getServiceBySlug(slugParams);
  if (!service || service.category?.slug !== categoryParams) notFound();

  const category = service.category!;
  const [reviews, faqs, categoryStats] = await Promise.all([
    getReviewsByCategory(category.id) as Promise<ReviewItem[]>,
    getFaqsByCategory(category.id),
    getCategoryReviewStats(category.id),
  ]);

  const s = service as unknown as {
    image: string | null;
    priceFrom: number | null;
    priceUnit: string | null;
    requirements: string[];
    processSteps: string[];
  };

  const defaultSteps = [
    "Contact us with your requirements",
    "We confirm pricing and turnaround",
    "Design and production begins",
    "Collect or arrange delivery",
  ];
  const steps: string[] =
    s.processSteps.length > 0 ? s.processSteps : defaultSteps;

  const schema = serviceSchema({
    name: service.name,
    description: service.description,
    url: `https://scribescreative.co.ke/services/${categoryParams}/${slugParams}`,
    providerName: siteConfig.businessName,
  });

  return (
    <>
      <JsonLd data={schema} />

      {/* ── Hero ── */}
      <section className="bg-brand-navy py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            crumbs={[
              { label: "Services", href: "/#services" },
              { label: category.name, href: `/services/${category.slug}` },
              { label: service.name },
            ]}
          />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-amber">
            {category.name}
          </span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold text-brand-paper sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-4 max-w-xl font-body text-base text-brand-paper/70">
            {service.description}
          </p>
          {categoryStats.count > 0 && (
            <TrustStrip
              averageRating={categoryStats.average}
              reviewCount={categoryStats.count}
              label={`in ${category.name}`}
              variant="dark"
              className="mt-4"
            />
          )}
        </div>
      </section>

      {/* ── Main content + sticky quote card ── */}
      <Section className="bg-brand-paper">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main column */}
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {/* Requirements */}
              {s.requirements.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-bold text-brand-navy">
                    What to bring
                  </h2>
                  <p className="mt-1.5 font-body text-sm text-brand-slate">
                    Have these ready when you contact us to keep things moving.
                  </p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {s.requirements.map((req: string) => (
                      <li key={req} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-amber/15">
                          <CheckCircle className="h-3.5 w-3.5 text-brand-amber" />
                        </span>
                        <span className="font-body text-sm text-brand-navy">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process */}
              <div>
                <h2 className="font-display text-xl font-bold text-brand-navy">
                  How it works
                </h2>
                <ol className="mt-5 flex flex-col gap-4">
                  {steps.map((step: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-navy font-mono text-xs font-bold text-brand-paper">
                        0{i + 1}
                      </span>
                      <span className="pt-0.5 font-body text-sm text-brand-navy">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-bold text-brand-navy">
                  What clients say
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {reviews.slice(0, 4).map((review: ReviewItem) => (
                    <div
                      key={review.id}
                      className="rounded-xl border border-brand-navy/10 bg-white p-5"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy/10 font-display text-sm font-bold text-brand-navy">
                          {review.authorName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-body text-sm font-semibold text-brand-navy">
                            {review.authorName}
                          </p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${i < review.rating ? "text-brand-amber" : "text-brand-navy/15"}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 font-body text-sm text-brand-slate">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky quote card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-sm">
              <div className="relative aspect-[4/3] w-full bg-brand-navy">
                {s.image ? (
                  <Image
                    src={s.image}
                    alt={service.name}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-display text-5xl font-extrabold text-brand-amber/40">
                      {service.name[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                {s.priceFrom ? (
                  <div className="mb-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-slate">
                      Starting from
                    </p>
                    <p className="font-display text-2xl font-extrabold text-brand-navy">
                      Ksh {s.priceFrom.toLocaleString()}
                      <span className="ml-1 font-body text-xs font-normal text-brand-slate">
                        {s.priceUnit}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="mb-4 font-body text-sm font-medium text-brand-navy">
                    Custom pricing — get a free quote
                  </p>
                )}

                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20Scribes%2C%20I%27d%20like%20to%20enquire%20about%20${encodeURIComponent(service.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-md bg-brand-red px-4 py-2.5 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90"
                  >
                    <FaWhatsapp className="h-4 w-4" /> WhatsApp Us
                  </a>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center justify-center gap-2 rounded-md border border-brand-navy/20 px-4 py-2.5 font-body text-sm font-semibold text-brand-navy hover:bg-brand-navy/5"
                  >
                    <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
                  </a>
                </div>

                <ul className="mt-5 flex flex-col gap-2 border-t border-brand-navy/10 pt-4">
                  <li className="flex items-center gap-2 font-body text-xs text-brand-slate">
                    <Tag className="h-3.5 w-3.5 text-brand-amber" /> Free,
                    no-obligation quote
                  </li>
                  <li className="flex items-center gap-2 font-body text-xs text-brand-slate">
                    <Zap className="h-3.5 w-3.5 text-brand-amber" /> Fast
                    turnaround
                  </li>
                  <li className="flex items-center gap-2 font-body text-xs text-brand-slate">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand-amber" />{" "}
                    Quality guaranteed
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {faqs.length > 0 && <FaqSection faqs={faqs} />}

      <Section className="bg-brand-paper">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-brand-navy">
            Also in {category.name}
          </h2>
          <Link
            href={`/services/${category.slug}`}
            className="flex items-center gap-1 font-body text-sm font-semibold text-brand-navy hover:text-brand-red"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}