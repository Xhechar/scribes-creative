import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  getPortfolioItemBySlug,
  getAllPortfolioItems,
} from "@/lib/services/portfolio.service";
import { Breadcrumb } from "@/components/ui/shared";
import { siteConfig } from "@/lib/data/site-config";
import type { PortfolioImage } from "@/types";
import {
  CloudinaryPresets,
  getCloudinaryBlurUrl,
} from "@/lib/utils/cloudinary";

export async function generateStaticParams() {
  const items = await getAllPortfolioItems();
  return items.map((item: { slug: string }) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: slugValue } = await params;
  const item = await getPortfolioItemBySlug(slugValue);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description ?? undefined,
  };
}

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: slugValue } = await params;
  const item = await getPortfolioItemBySlug(slugValue);
  if (!item) notFound();

  const [cover, ...rest] = item.images as PortfolioImage[];

  return (
    <>
      <section className="bg-brand-navy py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            crumbs={[
              { label: "Portfolio", href: "/portfolio" },
              { label: item.title },
            ]}
          />
          {item.category && (
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-amber">
              {item.category.name}
            </span>
          )}
          <h1 className="mt-2 font-display text-4xl font-extrabold text-brand-paper sm:text-5xl">
            {item.title}
          </h1>
          {item.clientName && (
            <p className="mt-2 font-mono text-sm text-brand-paper/50">
              Client — {item.clientName}
            </p>
          )}
        </div>
      </section>

      <section className="bg-brand-paper py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-4">
              {cover && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={CloudinaryPresets.detail(cover.url)}
                    placeholder="blur"
                    blurDataURL={getCloudinaryBlurUrl(cover.url)}
                    alt={item.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover"
                  />
                  {cover.caption && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-brand-navy">
                      {cover.caption}
                    </span>
                  )}
                </div>
              )}
              {rest.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {rest.map((img: PortfolioImage) => (
                    <div
                      key={img.url}
                      className="relative aspect-square overflow-hidden rounded-xl"
                    >
                      <Image
                        src={CloudinaryPresets.card(img.url)}
                        placeholder="blur"
                        blurDataURL={getCloudinaryBlurUrl(img.url)}
                        alt={item.title}
                        fill
                        sizes="(min-width: 640px) 220px, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              {item.description && (
                <div>
                  <h2 className="font-display text-xl font-bold text-brand-navy">
                    About this project
                  </h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-brand-slate">
                    {item.description}
                  </p>
                </div>
              )}
              <div className="rounded-xl border border-brand-navy/10 bg-white p-5">
                <p className="font-display text-base font-bold text-brand-navy">
                  Want something similar?
                </p>
                <p className="mt-1.5 font-body text-sm text-brand-slate">
                  WhatsApp us with your brief and we&rsquo;ll come back with a
                  quote the same day.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20Scribes%2C%20I%20saw%20your%20${encodeURIComponent(item.title)}%20project%20and%20I%27d%20like%20something%20similar.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-md bg-brand-red px-4 py-2.5 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center justify-center gap-2 rounded-md border border-brand-navy/20 px-4 py-2.5 font-body text-sm font-semibold text-brand-navy hover:bg-brand-navy/5"
                  >
                    Call {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>
              {item.category && (
                <Link
                  href={`/services/${item.category.slug}`}
                  className="flex items-center gap-1.5 font-body text-sm font-semibold text-brand-navy hover:text-brand-red"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All {item.category.name} services
                </Link>
              )}
            </div>
          </div>

          <div className="mt-12 border-t border-brand-navy/10 pt-8">
            <Link
              href="/portfolio"
              className="flex items-center gap-2 font-body text-sm font-semibold text-brand-navy hover:text-brand-red"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-14 text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="font-display text-2xl font-bold text-brand-paper">
            Ready to build your brand?
          </h2>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}