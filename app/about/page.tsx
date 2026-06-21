import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Scribes Creative Solutions is an Eldoret-based branding, print, and digital studio helping businesses build an identity people remember.",
};

const values = [
  {
    title: "Built for business",
    description:
      "Every piece we design or print exists to help you win more customers — not just to look nice.",
  },
  {
    title: "One studio, full identity",
    description:
      "Branding, print, photography, and web — handled under one roof so your identity stays consistent everywhere it appears.",
  },
  {
    title: "Craft you can hold",
    description:
      "We still believe ink on paper matters. Every print job gets the same attention to detail as a digital one.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-paper py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
            About Scribes
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl">
            We help businesses look like they mean business.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-base text-brand-slate sm:text-lg">
            {/* TODO: replace with the owner's real founding story */}
            Scribes Creative Solutions started with a simple observation: most
            businesses in Eldoret have something real to offer, but nothing that
            shows it. We exist to close that gap — from your first logo sketch
            to the sign above your door.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="font-display text-xl font-bold text-brand-navy">
                  {value.title}
                </h3>
                <p className="mt-2 font-body text-sm text-brand-slate">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-center sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-brand-paper sm:text-3xl">
            Ready to build a brand customers remember?
          </h2>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 font-body text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-red/90"
          >
            Start the conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}