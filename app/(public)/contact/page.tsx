import type { Metadata } from "next";
import { MessageSquare, FileCheck, Hammer, Clock, Star } from "lucide-react";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { getReviewStats } from "@/lib/services/review.service";
import { getGeneralFaqs } from "@/lib/services/faq.service";
import { siteConfig } from "@/lib/data/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Scribes Creative Solutions in Eldoret — WhatsApp, call, or fill in the form and we'll respond within a few hours.",
};

const steps = [
  {
    icon: MessageSquare,
    title: "You reach out",
    text: "WhatsApp, call, or fill in the form below with what you need.",
  },
  {
    icon: FileCheck,
    title: "We confirm & quote",
    text: "We respond within a few hours with pricing, timeline, and next steps.",
  },
  {
    icon: Hammer,
    title: "We get to work",
    text: "Once confirmed, design or production starts — no delays, no chasing.",
  },
];

export default async function ContactPage() {
  const [reviewStats, faqs] = await Promise.all([
    getReviewStats(),
    getGeneralFaqs(),
  ]);

  return (
    <>
      <section className="bg-brand-navy py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-amber">
            Contact
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-paper sm:text-5xl">
            Let&rsquo;s build something great.
          </h1>
          <p className="mt-4 max-w-xl font-body text-base text-brand-paper/70">
            Walk in, WhatsApp, or fill in the form — we respond within a few
            hours.
          </p>

          {/* Quick-info row */}
          <div className="mt-7 grid grid-cols-1 gap-4 border-t border-brand-paper/10 pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-2.5">
              <Star className="h-4 w-4 text-brand-amber" />
              <TrustStrip
                averageRating={reviewStats.average}
                reviewCount={reviewStats.count}
                variant="dark"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-brand-amber" />
              <span className="font-body text-sm text-brand-paper/80">
                {siteConfig.hours[0].days}: {siteConfig.hours[0].time}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageSquare className="h-4 w-4 shrink-0 text-brand-amber" />
              <span className="font-body text-sm text-brand-paper/80">
                Replies within a few hours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── What happens next ── */}
      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
            What Happens Next
          </h2>
          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="relative flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy font-display text-sm font-bold text-brand-paper">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-brand-navy">
                  {s.title}
                </h3>
                <p className="mt-1.5 font-body text-sm text-brand-slate">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      {/* ── Hours detail ── */}
      <section className="bg-brand-paper py-12 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-brand-navy/10 bg-white p-6">
            <h3 className="font-display text-base font-bold text-brand-navy">
              Opening Hours
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-between">
              {siteConfig.hours.map((h) => (
                <li
                  key={h.days}
                  className="flex items-center justify-between gap-4 font-body text-sm sm:flex-col sm:items-start sm:gap-1"
                >
                  <span className="text-brand-slate">{h.days}</span>
                  <span className="font-medium text-brand-navy">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ teaser ── */}
      {faqs.length > 0 && <FaqSection faqs={faqs.slice(0, 4)} />}
    </>
  );
}
