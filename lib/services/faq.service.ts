import prisma from "@/lib/prisma";

export async function getGeneralFaqs() {
  return prisma.fAQ.findMany({
    where: { categoryId: null },
    orderBy: { displayOrder: "asc" },
  });
}

export async function getFaqsByCategory(categoryId: string) {
  return prisma.fAQ.findMany({
    where: { categoryId },
    orderBy: { displayOrder: "asc" },
  });
}