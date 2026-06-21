"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function RegistrationMark({ className = "" }: { className?: string }) {
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

const stats = [
  { value: "10+", label: "Years In Business" }, // TODO: confirm real figure
  { value: "500+", label: "Projects Delivered" }, // TODO: confirm real figure
  { value: "20+", label: "5-Star Reviews" },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden bg-brand-paper py-20 sm:py-28">
      {/* Decorative registration marks — the signature element, used once here at full size */}
      <RegistrationMark className="pointer-events-none absolute -right-6 top-10 h-24 w-24 text-brand-navy/10 sm:h-32 sm:w-32" />
      <RegistrationMark className="pointer-events-none absolute bottom-6 left-4 h-16 w-16 text-brand-amber/20" />

      <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.12 }}
          className="max-w-2xl"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-red"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Branding · Print · Digital
          </motion.span>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-5 font-display text-5xl font-extrabold leading-[1.05] text-brand-navy sm:text-6xl lg:text-7xl"
          >
            Build a brand customers{" "}
            <span className="text-brand-red">actually notice.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-6 max-w-lg font-body text-base text-brand-slate sm:text-lg"
          >
            From your first logo concept to the signage outside your shop,
            Scribes Creative Solutions designs, prints, and builds the identity
            that makes a business look like it means business.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 font-body text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-red/90"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-md border border-brand-navy/20 px-6 py-3 font-body text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy/5"
            >
              View Our Work
            </Link>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-brand-navy/10 pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-extrabold text-brand-navy">
                  {stat.value}
                </dd>
                <dd className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand-slate">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
