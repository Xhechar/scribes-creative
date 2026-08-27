import prisma from "@/lib/prisma";

export async function getFeaturedPortfolioItems() {
  return prisma.portfolioItem.findMany({
    // where: { isFeatured: true },
    orderBy: { displayOrder: "asc" },
    include: {
      category: true,
      images: { orderBy: { order: "asc" }, take: 1 },
    },
  });
}

export async function getAllPortfolioItems() {
  return prisma.portfolioItem.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      category: true,
      images: { orderBy: { order: "asc" }, take: 1 },
    },
  });
}

export async function getPortfolioItemBySlug(slug: string) {
  return prisma.portfolioItem.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
    },
  });
}

export async function getPortfolioItemsByCategory(categoryId: string) {
  return prisma.portfolioItem.findMany({
    where: { categoryId },
    orderBy: { displayOrder: "asc" },
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
    },
  });
}
