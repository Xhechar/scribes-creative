"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

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

// Standalone so it can call its own reduced-motion check without prop drilling.
function ProofCard({
  className,
  rotate,
  delay,
  children,
}: {
  className?: string;
  rotate: number;
  delay: number;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        rotate: shouldReduceMotion ? rotate : rotate + 6,
      }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={shouldReduceMotion ? undefined : { rotate: 0, scale: 1.03 }}
      className={cn(
        "absolute rounded-2xl border border-brand-navy/10 bg-white shadow-xl",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

// Stand-in for real work photography — three "proof of craft" mockups built
// from the brand system itself. Swap any card's inner markup for a real
// <Image> once portfolio photos exist; positioning stays the same.
function ProofStack() {
  return (
    <div className="relative hidden h-[420px] w-full lg:block">
      <RegistrationMark className="pointer-events-none absolute -top-6 right-10 h-14 w-14 text-brand-navy/10" />

      {/* Brand identity card — back, largest */}
      <ProofCard
        rotate={-3}
        delay={0.45}
        className="left-6 top-0 h-60 w-44 overflow-hidden p-0"
      >
        <div className="relative flex h-full w-full flex-col items-center justify-center bg-brand-navy">
          <span className="font-display text-7xl font-extrabold text-brand-amber">
            S
          </span>
          <span className="absolute bottom-4 font-mono text-[9px] uppercase tracking-[0.15em] text-brand-paper/60">
            Brand Identity
          </span>
        </div>
      </ProofCard>

      {/* Large format print swatch — top right */}
      <ProofCard
        rotate={5}
        delay={0.6}
        className="right-0 top-6 h-44 w-36 overflow-hidden p-0"
      >
        <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-brand-red to-brand-amber p-4">
          <RegistrationMark className="h-6 w-6 text-white/70" />
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/90">
            Large Format Print
          </span>
        </div>
      </ProofCard>

      {/* Business card mockup — front, bottom */}
      <ProofCard
        rotate={-6}
        delay={0.75}
        className="bottom-0 left-16 h-36 w-60 p-5"
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="h-7 w-7 rounded-full bg-brand-navy" />
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-brand-slate">
              350gsm Matt
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-2/3 rounded-full bg-brand-navy/80" />
            <div className="h-1.5 w-1/2 rounded-full bg-brand-navy/25" />
          </div>
        </div>
      </ProofCard>

      {/* Rating badge — floating, overlapping the stack's bottom-right corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.95 }}
        className="absolute -bottom-2 right-2 flex items-center gap-1.5 rounded-full border border-brand-navy/10 bg-white px-3 py-1.5 shadow-lg"
      >
        <Star className="h-3.5 w-3.5 fill-brand-amber text-brand-amber" />
        <span className="font-body text-xs font-semibold text-brand-navy">
          4.9
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wide text-brand-slate">
          20+ reviews
        </span>
      </motion.div>
    </div>
  );
}

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

      <div className="relative mx-auto grid max-w-8xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8 xl:gap-16">
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
            Brand · Print · Design
          </motion.span>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-5 font-display text-5xl font-extrabold leading-[1.05] text-brand-navy sm:text-6xl lg:text-6xl xl:text-7xl"
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

        <ProofStack />
      </div>
    </section>
  );
}