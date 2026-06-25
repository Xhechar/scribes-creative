"use client";

import { useState } from "react";
import { Star, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  source: "GOOGLE" | "SITE";
  isApproved: boolean;
  publishedAt: Date;
  category: { name: string } | null;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating
              ? "fill-brand-amber text-brand-amber"
              : "fill-brand-navy/10 text-brand-navy/10",
          )}
        />
      ))}
    </div>
  );
}

export function ReviewsManager({
  initialReviews,
}: {
  initialReviews: Review[];
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  async function setApproval(id: string, isApproved: boolean) {
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isApproved }),
    });
    if (res.ok) {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isApproved } : r)),
      );
    }
  }

  async function deleteReview(id: string) {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  }

  const pending = reviews.filter((r) => !r.isApproved);
  const approved = reviews.filter((r) => r.isApproved);

  return (
    <div className="flex flex-col gap-8">
      {/* Pending */}
      {pending.length > 0 && (
        <div>
          <h2 className="mb-3 font-display text-base font-bold text-brand-red">
            Awaiting Approval ({pending.length})
          </h2>
          <div className="flex flex-col gap-3">
            {pending.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onApprove={() => setApproval(review.id, true)}
                onReject={() => deleteReview(review.id)}
                onDelete={() => deleteReview(review.id)}
                showApprovalButtons
              />
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      <div>
        <h2 className="mb-3 font-display text-base font-bold text-brand-navy">
          Published Reviews ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <p className="font-body text-sm text-brand-slate">
            No approved reviews yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {approved.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onDelete={() => deleteReview(review.id)}
                onUnapprove={() => setApproval(review.id, false)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  onApprove,
  onReject,
  onDelete,
  onUnapprove,
  showApprovalButtons,
}: {
  review: Review;
  onApprove?: () => void;
  onReject?: () => void;
  onDelete: () => void;
  onUnapprove?: () => void;
  showApprovalButtons?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-brand-navy/10 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy/10 font-display text-sm font-bold text-brand-navy">
            {review.authorName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-brand-navy">
              {review.authorName}
            </p>
            <StarRow rating={review.rating} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {review.source === "GOOGLE" && (
            <span className="flex items-center gap-1 rounded-full bg-brand-navy/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-brand-slate">
              <FaGoogle className="h-2.5 w-2.5" /> Google
            </span>
          )}
          {review.category && (
            <span className="rounded-full bg-brand-amber/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-brand-navy">
              {review.category.name}
            </span>
          )}
        </div>
      </div>

      <p className="font-body text-sm text-brand-slate">{review.comment}</p>

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-brand-slate">
          {new Date(review.publishedAt).toLocaleDateString("en-KE")}
        </span>
        <div className="flex items-center gap-1.5">
          {showApprovalButtons && (
            <>
              <button
                onClick={onApprove}
                className="flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 font-body text-xs font-semibold text-white hover:bg-green-700"
              >
                <CheckCircle className="h-3.5 w-3.5" /> Approve
              </button>
              <button
                onClick={onReject}
                className="flex items-center gap-1 rounded-md bg-brand-red px-3 py-1.5 font-body text-xs font-semibold text-white hover:bg-brand-red/90"
              >
                <XCircle className="h-3.5 w-3.5" /> Reject
              </button>
            </>
          )}
          {!showApprovalButtons && onUnapprove && (
            <button
              onClick={onUnapprove}
              className="rounded-md border border-brand-navy/20 px-3 py-1.5 font-body text-xs text-brand-slate hover:bg-brand-navy/5"
            >
              Unpublish
            </button>
          )}
          <button
            onClick={onDelete}
            className="flex h-7 w-7 items-center justify-center rounded-md text-brand-slate hover:bg-red-50 hover:text-brand-red"
            aria-label="Delete review"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}