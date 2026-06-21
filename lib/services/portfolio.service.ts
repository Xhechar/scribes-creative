import prisma from "@/lib/prisma";

export async function getFeaturedPortfolioItems() {
  return prisma.portfolioItem.findMany({
    where: { isFeatured: true },
    orderBy: { displayOrder: "asc" },
    include: {
      category: true,
      images: { orderBy: { order: "asc" }, take: 1 },
    },
  });
}
