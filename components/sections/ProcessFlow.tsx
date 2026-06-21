"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

const accentByIndex = [
  "text-brand-navy",
  "text-brand-red",
  "text-brand-amber",
  "text-brand-navy",
];

export function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
            How We Work
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            From no brand to a brand people remember.
          </h2>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line — desktop only */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-brand-navy/10 lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : i * 0.1,
              }}
              className="relative flex flex-col items-start"
            >
              <span
                className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-current bg-white font-display text-lg font-bold ${accentByIndex[i % accentByIndex.length]}`}
              >
                0{step.stepNumber}
                <svg
                  viewBox="0 0 56 56"
                  className="absolute inset-0 h-full w-full opacity-40"
                  fill="none"
                >
                  <line
                    x1="28"
                    y1="2"
                    x2="28"
                    y2="54"
                    stroke="currentColor"
                    strokeWidth="0.75"
                  />
                  <line
                    x1="2"
                    y1="28"
                    x2="54"
                    y2="28"
                    stroke="currentColor"
                    strokeWidth="0.75"
                  />
                </svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">
                {step.title}
              </h3>
              <p className="mt-2 font-body text-sm text-brand-slate">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}