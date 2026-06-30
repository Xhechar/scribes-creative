import prisma from "@/lib/prisma";

export async function getFeaturedReviews(limit = 6) {
  return prisma.review.findMany({
    where: { isApproved: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getReviewsByCategory(categoryId: string, limit = 6) {
  return prisma.review.findMany({
    where: { isApproved: true, categoryId },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getReviewStats() {
  const result = await prisma.review.aggregate({
    where: { isApproved: true },
    _avg: { rating: true },
    _count: { rating: true },
  });

  return {
    average: result._avg.rating ?? 0,
    count: result._count.rating ?? 0,
  };
}

export async function getCategoryReviewStats(categoryId: string) {
  const result = await prisma.review.aggregate({
    where: { isApproved: true, categoryId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  return {
    average: result._avg.rating ?? 0,
    count: result._count.rating ?? 0,
  };
}