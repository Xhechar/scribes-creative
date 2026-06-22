import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  getServiceBySlug,
  getServicesByCategory,
} from "@/lib/services/service.service";
import {
  getCategoryBySlug,
  getAllCategories,
} from "@/lib/services/category.service";
import { getReviewsByCategory } from "@/lib/services/review.service";
import { Section, Breadcrumb } from "@/components/ui/shared";
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
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  return { title: service.name, description: service.description };
}

export default async function ServicePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const service = await getServiceBySlug(params.slug);
  if (!service || service.category?.slug !== params.category) notFound();

  const category = service.category!;
  const reviews = (await getReviewsByCategory(category.id)) as ReviewItem[];
  const defaultSteps = [
    "Contact us with your requirements",
    "We confirm pricing and turnaround",
    "Design and production begins",
    "Collect or arrange delivery",
  ];
  const steps: string[] =
    (service as unknown as { processSteps: string[] }).processSteps?.length > 0
      ? (service as unknown as { processSteps: string[] }).processSteps
      : defaultSteps;

  return (
    <>
      <section className="bg-brand-navy py-16 sm:py-20">
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
          {(service as unknown as { priceFrom: number | null }).priceFrom && (
            <p className="mt-3 font-mono text-sm text-brand-amber">
              From Ksh{" "}
              {(
                service as unknown as { priceFrom: number }
              ).priceFrom.toLocaleString()}{" "}
              <span className="text-brand-paper/50">
                {(service as unknown as { priceUnit: string | null }).priceUnit}
              </span>
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20Scribes%2C%20I%27d%20like%20to%20enquire%20about%20${encodeURIComponent(service.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-brand-red px-5 py-2.5 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90"
            >
              <FaWhatsapp className="h-4 w-4" /> WhatsApp Us
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 rounded-md border border-brand-paper/20 px-5 py-2.5 font-body text-sm font-semibold text-brand-paper hover:bg-brand-paper/10"
            >
              <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <Section className="bg-brand-paper">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {(service as unknown as { requirements: string[] }).requirements
            ?.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                What to bring
              </h2>
              <p className="mt-1.5 font-body text-sm text-brand-slate">
                Have these ready when you contact us to keep things moving.
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {(
                  service as unknown as { requirements: string[] }
                ).requirements.map((req: string) => (
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
      </Section>

      {reviews.length > 0 && (
        <Section className="bg-white">
          <h2 className="font-display text-2xl font-bold text-brand-navy">
            What clients say
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 3).map((review: ReviewItem) => (
              <div
                key={review.id}
                className="rounded-xl border border-brand-navy/10 bg-brand-paper p-5"
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
        </Section>
      )}

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