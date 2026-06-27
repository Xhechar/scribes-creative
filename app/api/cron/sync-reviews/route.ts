import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Vercel cron config — runs daily at 3 AM UTC
export const runtime = "nodejs";

interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  time: number; // Unix timestamp
  relative_time_description: string;
}

interface PlacesResponse {
  result?: {
    reviews?: GoogleReview[];
  };
  error_message?: string;
  status: string;
}

export async function GET(req: NextRequest) {
  // Simple bearer-token guard — set CRON_SECRET in .env
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      {
        error: "GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID must be set in .env",
      },
      { status: 500 },
    );
  }

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=reviews` +
    `&reviews_sort=newest` +
    `&key=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 0 } });
  const data: PlacesResponse = await res.json();

  if (data.status !== "OK" || !data.result?.reviews) {
    return NextResponse.json(
      {
        error: `Google Places API error: ${data.status} — ${data.error_message ?? "unknown"}`,
      },
      { status: 500 },
    );
  }

  const reviews = data.result.reviews;
  let upserted = 0;

  for (const review of reviews) {
    // Google doesn't provide a stable review ID — we derive one from author + timestamp
    const googleReviewId = `${placeId}_${review.time}_${review.author_name.replace(/\s/g, "_")}`;

    await prisma.review.upsert({
      where: { googleReviewId },
      update: {
        authorName: review.author_name,
        authorPhotoUrl: review.profile_photo_url || null,
        rating: review.rating,
        comment: review.text,
        publishedAt: new Date(review.time * 1000),
        isApproved: true,
      },
      create: {
        source: "GOOGLE",
        googleReviewId,
        authorName: review.author_name,
        authorPhotoUrl: review.profile_photo_url || null,
        rating: review.rating,
        comment: review.text,
        publishedAt: new Date(review.time * 1000),
        isApproved: true,
      },
    });
    upserted++;
  }

  // Update the last-synced timestamp in SiteSettings if a row exists
  await prisma.siteSettings.updateMany({
    data: { lastReviewSyncAt: new Date() },
  });

  return NextResponse.json({ upserted, total: reviews.length });
}