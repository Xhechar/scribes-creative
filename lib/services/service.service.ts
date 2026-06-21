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
