import prisma from "@/lib/prisma";

export async function getCreativeCategoriesWithServices() {
  return prisma.serviceCategory.findMany({
    where: { type: "CREATIVE" },
    orderBy: { displayOrder: "asc" },
    include: {
      services: { orderBy: { displayOrder: "asc" } },
    },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getServicesByCategory(categorySlug: string) {
  return prisma.service.findMany({
    where: { category: { slug: categorySlug } },
    orderBy: { displayOrder: "asc" },
  });
}