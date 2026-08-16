import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Palette,
  Printer,
  Heart,
  Shirt,
  Camera,
  Code2,
  Megaphone,
  Briefcase,
  Layers,
  Sparkles,
  Clock,
  Award,
  type LucideIcon,
} from "lucide-react";
import { getCreativeCategories } from "@/lib/services/category.service";
import {
  getReviewStats,
  getFeaturedReviews,
} from "@/lib/services/review.service";
import { TrustStrip } from "@/components/ui/TrustStrip";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Scribes Creative Solutions is a Eldoret-based branding, print, and digital studio helping businesses build an identity people remember.",
};

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Printer,
  Heart,
  Shirt,
  Camera,
  Code2,
  Megaphone,
};

const differentiators = [
  {
    icon: Briefcase,
    title: "Built for business",
    text: "Every piece we design or print exists to help you win more customers — not just to look nice.",
  },
  {
    icon: Layers,
    title: "One studio, full identity",
    text: "Branding, print, photography, and web — handled under one roof so your identity stays consistent everywhere it appears.",
  },
  {
    icon: Sparkles,
    title: "Craft you can hold",
    text: "We still believe ink on paper matters. Every print job gets the same attention to detail as a digital one.",
  },
  {
    icon: Clock,
    title: "Honest turnaround times",
    text: "We tell you upfront what's realistic — no vague promises, no surprises when your deadline arrives.",
  },
  {
    icon: Award,
    title: "Premium materials",
    text: "From card stock to print finish, we don't cut corners on the things customers actually touch and see.",
  },
  {
    icon: Heart,
    title: "A local team that gets it",
    text: "We're built around Eldoret businesses — we know what it takes to stand out here.",
  },
];

function RegMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1" />
      <line
        x1="20"
        y1="1"
        x2="20"
        y2="39"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="1"
        y1="20"
        x2="39"
        y2="20"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export default async function AboutPage() {
  const [categories, reviewStats, testimonials] = await Promise.all([
    getCreativeCategories(),
    getReviewStats(),
    getFeaturedReviews(2),
  ]);

  const stats = [
    { value: "10+", label: "Years In Business" }, // TODO: confirm real figure
    { value: "500+", label: "Projects Delivered" }, // TODO: confirm real figure
    { value: `${categories.length}`, label: "Service Lines" },
  ];

  return (
    <>
      {/* ── Hero — two column, text + image ── */}
      <section className="relative overflow-hidden bg-brand-paper py-16 sm:py-20">
        <RegMark className="pointer-events-none absolute -right-8 top-8 h-28 w-28 text-brand-navy/[0.06]" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
              About Scribes
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl">
              We help businesses look like they mean business.
            </h1>
            <p className="mt-5 font-body text-base text-brand-slate sm:text-lg">
              Scribes Creative Solutions started with a simple observation: most
              businesses have something real and solid to offer, but nothing
              that shows it. We exist to close that gap and ensure your business
              gets the attention it deserves — from your first logo sketch to
              the sign above your door.
            </p>

            <TrustStrip
              averageRating={reviewStats.average}
              reviewCount={reviewStats.count}
              className="mt-6"
            />

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-md bg-brand-red px-5 py-2.5 font-body text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-red/90"
              >
                View Our Work <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-brand-navy/20 px-5 py-2.5 font-body text-sm font-semibold text-brand-navy hover:bg-brand-navy/5"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-navy/10 shadow-lg lg:aspect-[5/6]">
            <Image
              src="https://res.cloudinary.com/dakyiye2e/image/upload/v1786872373/sfhbmxjbex4nep90aelb.png"
              alt="Inside the Scribes Creative Solutions studio"
              fill
              priority
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-brand-navy/10 bg-white py-8">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 px-4 text-center sm:px-6 lg:px-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-slate">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Story — image + text, alternating from hero ── */}
      <section className="bg-brand-paper py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
          <div className="relative order-2 aspect-[16/10] overflow-hidden rounded-2xl border border-brand-navy/10 shadow-md lg:order-1">
            <Image
              src="https://res.cloudinary.com/dakyiye2e/image/upload/v1785140638/t9hoi7lwcyc8izhiexrr.png"
              alt="The Scribes team at work on a client project"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
              How We Work
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-brand-navy sm:text-3xl">
              Every project gets the same care, big or small.
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-brand-slate sm:text-base">
              {/* TODO: refine with specifics once available */}
              Whether it's a single batch of business cards or a full rebrand
              with signage and a new website, we treat every job as a chance to
              prove what we can do. That's meant fewer corners cut, more honest
              conversations about timelines, and a portfolio we're genuinely
              proud to show.
            </p>
            <Link
              href="/#process"
              className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-navy hover:text-brand-red"
            >
              See our full process <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why choose us — expanded differentiator grid ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
              Why Scribes
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-brand-navy sm:text-3xl">
              What sets us apart
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d) => (
              <div key={d.title} className="flex flex-col gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-amber/15">
                  <d.icon className="h-5 w-5 text-brand-navy" />
                </span>
                <h3 className="font-display text-lg font-bold text-brand-navy">
                  {d.title}
                </h3>
                <p className="font-body text-sm text-brand-slate">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we do — compact capability chips ── */}
      <section className="bg-brand-paper py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-xl font-bold text-brand-navy sm:text-2xl">
            Everything under one studio
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {categories.map(
              (c: {
                id: string;
                slug: string;
                icon: string | null;
                name: string;
              }) => {
                const Icon = c.icon ? iconMap[c.icon] : null;
                return (
                  <Link
                    key={c.id}
                    href={`/services/${c.slug}`}
                    className="flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white px-4 py-2 font-body text-sm font-medium text-brand-navy transition-colors hover:border-brand-red hover:text-brand-red"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {c.name}
                  </Link>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* ── Testimonial quotes ── */}
      {testimonials.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {testimonials.map(
                (t: {
                  id: string;
                  rating: number;
                  comment: string;
                  authorName: string;
                }) => (
                  <div
                    key={t.id}
                    className="rounded-2xl border border-brand-navy/10 bg-brand-paper p-6"
                  >
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < t.rating ? "text-brand-amber" : "text-brand-navy/15"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 font-body text-sm leading-relaxed text-brand-navy">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-brand-slate">
                      — {t.authorName}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-brand-navy py-16 text-center sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-brand-paper sm:text-3xl">
            Ready to build a brand customers remember?
          </h2>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 font-body text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-red/90"
          >
            Start the conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
