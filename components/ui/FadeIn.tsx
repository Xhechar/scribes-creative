"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "none";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const initial = {
    opacity: 0,
    y: !shouldReduceMotion && direction === "up" ? 18 : 0,
    x: !shouldReduceMotion && direction === "left" ? -18 : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// Staggered container — wraps a list so each child FadeIn fires in sequence
export function FadeInStagger({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// For use as a direct child of FadeInStagger
export function FadeInItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}