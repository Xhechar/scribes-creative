import { getAllReviews } from "@/lib/services/admin.service";
import { ReviewsManager } from "@/components/admin/ReviewsManager";

export default async function AdminReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-navy">
          Reviews
        </h1>
        <p className="mt-1 font-body text-sm text-brand-slate">
          Approve site-submitted reviews before they appear publicly. Google
          reviews are auto-approved.
        </p>
      </div>
      {/* <ReviewsManager
        initialReviews={
          reviews as Parameters<typeof ReviewsManager>[0]["initialReviews"]
        } blurphur
      /> */}
    </div>
  );
}