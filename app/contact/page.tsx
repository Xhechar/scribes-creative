import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Scribes Creative Solutions in Nairobi — WhatsApp, call, or fill in the form and we'll respond within a few hours.",
};

export default function ContactPage() {
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
        </div>
      </section>
      <ContactSection />
    </>
  );
}