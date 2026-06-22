"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";

interface ReviewItem {
  id: string;
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number;
  comment: string;
  source: "GOOGLE" | "SITE";
  publishedAt: Date | string;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "h-3.5 w-3.5 fill-brand-amber text-brand-amber"
              : "h-3.5 w-3.5 fill-brand-navy/10 text-brand-navy/10"
          }
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ReviewsSection({
  reviews,
  averageRating,
  reviewCount,
}: {
  reviews: ReviewItem[];
  averageRating: number;
  reviewCount: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-brand-paper py-20 sm:py-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-red">
            What Clients Say
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            Don&rsquo;t just take our word for it.
          </h2>

          {reviewCount > 0 && (
            <div className="mt-5 flex items-center justify-center gap-2">
              <StarRow rating={Math.round(averageRating)} />
              <span className="font-body text-sm font-semibold text-brand-navy">
                {averageRating.toFixed(1)}
              </span>
              <span className="font-body text-sm text-brand-slate">
                ({reviewCount} review{reviewCount === 1 ? "" : "s"})
              </span>
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : (i % 3) * 0.08,
              }}
              className="flex flex-col rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy/10 font-display text-sm font-bold text-brand-navy">
                    {initials(review.authorName)}
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-brand-navy">
                      {review.authorName}
                    </p>
                    <StarRow rating={review.rating} />
                  </div>
                </div>

                {review.source === "GOOGLE" && (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand-navy/5 px-2 py-1 font-mono text-[9px] uppercase tracking-wide text-brand-slate">
                    <FaGoogle className="h-3 w-3" />
                    Google
                  </span>
                )}
              </div>

              <p className="mt-4 line-clamp-5 font-body text-sm text-brand-slate">
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}