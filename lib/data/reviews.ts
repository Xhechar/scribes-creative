
export interface ReviewSeed {
  id: string;
  authorName: string;
  rating: number; // 1–5
  comment: string;
  source: "GOOGLE" | "SITE";
  publishedAt: string; // ISO date
}

export const reviews: ReviewSeed[] = [
  {
    id: "review-wanjiru",
    authorName: "Wanjiru K.",
    rating: 5,
    comment:
      "Scribes redid our entire brand identity — business cards, letterhead, the works. Customers actually comment on how professional we look now.",
    source: "SITE",
    publishedAt: "2026-05-02",
  },
  {
    id: "review-mohammed",
    authorName: "Mohammed A.",
    rating: 5,
    comment:
      "Ordered banners for our shop opening on a tight deadline and they delivered, literally. Print quality was excellent.",
    source: "SITE",
    publishedAt: "2026-04-18",
  },
  {
    id: "review-akinyi",
    authorName: "Akinyi O.",
    rating: 5,
    comment:
      "Booked them for our wedding invitations and programs. Everything matched our theme perfectly and arrived two days early.",
    source: "SITE",
    publishedAt: "2026-03-25",
  },
  {
    id: "review-brian",
    authorName: "Brian M.",
    rating: 4,
    comment:
      "Good photography team for our product shoot. A couple of reshoots needed but the final images were worth it.",
    source: "SITE",
    publishedAt: "2026-03-10",
  },
  {
    id: "review-faith",
    authorName: "Faith N.",
    rating: 5,
    comment:
      "They built our company website in under three weeks and it actually ranks on Google now. Communication was clear throughout.",
    source: "SITE",
    publishedAt: "2026-02-20",
  },
  {
    id: "review-daniel",
    authorName: "Daniel K.",
    rating: 5,
    comment:
      "Vehicle branding for our delivery van came out exactly as designed. Will be bringing the rest of the fleet here.",
    source: "SITE",
    publishedAt: "2026-01-15",
  },
];