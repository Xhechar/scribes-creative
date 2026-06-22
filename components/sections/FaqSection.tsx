"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site-config";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn("border-b border-brand-navy/10 last:border-b-0")}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span
          className={cn(
            "font-body text-sm font-semibold transition-colors sm:text-base",
            isOpen ? "text-brand-red" : "text-brand-navy",
          )}
        >
          {item.question}
        </span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors",
            isOpen
              ? "bg-brand-red text-brand-paper"
              : "bg-brand-navy/10 text-brand-navy",
          )}
        >
          {isOpen ? (
            <Minus className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.25,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-body text-sm leading-relaxed text-brand-slate">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const INITIAL_VISIBLE = 6;

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? faqs : faqs.slice(0, INITIAL_VISIBLE);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr]">
          {/* Left — sticky label column */}
          <div className="lg:pt-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
              FAQ
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
              Questions we get asked a lot.
            </h2>
            <p className="mt-4 font-body text-sm text-brand-slate">
              Don&rsquo;t see what you&rsquo;re looking for? WhatsApp or call us
              directly — we&rsquo;re quick to respond.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-navy px-5 py-2.5 font-body text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-navy/90"
            >
              Ask us on WhatsApp
            </a>
          </div>

          {/* Right — accordion */}
          <div>
            <div className="divide-y-0 rounded-xl border border-brand-navy/10 bg-brand-paper px-6">
              {visible.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  item={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                />
              ))}
            </div>

            {faqs.length > INITIAL_VISIBLE && (
              <button
                onClick={() => setShowAll((v) => !v)}
                className="mt-4 font-body text-sm font-medium text-brand-red hover:underline"
              >
                {showAll
                  ? "Show fewer questions"
                  : `Show ${faqs.length - INITIAL_VISIBLE} more questions`}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
