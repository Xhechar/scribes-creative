import { Review } from "@/generated/prisma/client";

export const ReviewsPage = () => {
  const reviews: Review[] = [
    {
      id: "1",
      authorName: "John Doe",
      comment: "Great service!",
      source: "GOOGLE",
      rating: 5,
      createdAt: new Date(),
      isApproved: true,
      publishedAt: new Date(),
      authorPhotoUrl: null,
      categoryId: null,
      googleReviewId: null,
      serviceId: null,
    },
  ];

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review) => (
        <div key={review.id}>
          <h2>{review.authorName}</h2>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsPage;
