"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

// Per-step accent colours cycling through the brand palette
const accents = [
  {
    bg: "bg-brand-navy",
    text: "text-brand-navy",
    border: "border-brand-navy",
    dot: "bg-brand-navy",
  },
  {
    bg: "bg-brand-red",
    text: "text-brand-red",
    border: "border-brand-red",
    dot: "bg-brand-red",
  },
  {
    bg: "bg-brand-amber",
    text: "text-brand-amber",
    border: "border-brand-amber",
    dot: "bg-brand-amber",
  },
  {
    bg: "bg-brand-navy",
    text: "text-brand-navy",
    border: "border-brand-navy",
    dot: "bg-brand-navy",
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

// Reduced-motion fallback: simple stacked steps, each fading in on scroll
function ProcessFlowSimple({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-xl text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
            How We Work
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            From no brand to a brand people remember.
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const accent = accents[i % accents.length];
            return (
              <FadeIn key={step.id} delay={i * 0.1}>
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-2 ${accent.border} bg-white font-display text-lg font-bold ${accent.text}`}
                >
                  0{step.stepNumber}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm text-brand-slate">
                  {step.description}
                </p>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <ProcessFlowSimple steps={steps} />;

  return <ProcessFlowScroll steps={steps} />;
}

function ProcessFlowScroll({ steps }: { steps: ProcessStep[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(Math.floor(v * steps.length), steps.length - 1);
    if (next !== activeIndex) setActiveIndex(next);
  });

  const active = steps[activeIndex];
  const accent = accents[activeIndex % accents.length];

  return (
    // The section is N × 100vh tall so scrolling through it feels like paging through steps
    <section
      ref={sectionRef}
      style={{ height: `${steps.length * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport — stays fixed while the user scrolls the parent section */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-white">
        {/* Thin progress bar across the top */}
        <motion.div
          className="h-0.5 origin-left bg-brand-red"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Section label */}
        <div className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
            How We Work
          </span>
        </div>

        {/* Main content — AnimatePresence swaps the step content */}
        <div className="relative flex flex-1 items-center overflow-hidden">
          {/* Giant background step number */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`bg-${activeIndex}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="pointer-events-none absolute right-0 select-none font-display font-extrabold leading-none text-brand-navy/[0.04]"
              style={{ fontSize: "clamp(160px, 30vw, 380px)" }}
              aria-hidden="true"
            >
              0{active?.stepNumber}
            </motion.span>
          </AnimatePresence>

          <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            {/* Left: content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeIndex}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex flex-col justify-center"
              >
                <span
                  className={`font-mono text-xs uppercase tracking-[0.2em] ${accent.text}`}
                >
                  Step {active?.stepNumber} of {steps.length}
                </span>
                <h2 className="mt-4 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl lg:text-6xl">
                  {active?.title}
                </h2>
                <p className="mt-5 max-w-md font-body text-base text-brand-slate sm:text-lg">
                  {active?.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Right: visual accent tile */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${activeIndex}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
                className="hidden items-center justify-center lg:flex"
              >
                <div
                  className={`relative flex h-64 w-64 items-center justify-center rounded-3xl ${accent.bg}`}
                >
                  <RegMark className="h-24 w-24 text-white/20" />
                  <span className="absolute font-display text-7xl font-extrabold text-white/30 select-none">
                    0{active?.stepNumber}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom: step dots / navigation hints */}
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pb-10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? `h-2.5 w-7 ${accent.dot}`
                    : "h-2.5 w-2.5 bg-brand-navy/15"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-navy/30">
            Scroll to continue
          </span>
        </div>
      </div>
    </section>
  );
}