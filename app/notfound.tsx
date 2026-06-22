import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-brand-paper px-4 py-24 text-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-red">
        404
      </span>
      <h1 className="mt-3 font-display text-5xl font-extrabold text-brand-navy sm:text-6xl">
        Page not found.
      </h1>
      <p className="mx-auto mt-5 max-w-sm font-body text-sm text-brand-slate">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-brand-navy px-5 py-2.5 font-body text-sm font-semibold text-brand-paper hover:bg-brand-navy/90"
        >
          Go Home <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-md border border-brand-navy/20 px-5 py-2.5 font-body text-sm font-semibold text-brand-navy hover:bg-brand-navy/5"
        >
          View Portfolio
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-md border border-brand-navy/20 px-5 py-2.5 font-body text-sm font-semibold text-brand-navy hover:bg-brand-navy/5"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}