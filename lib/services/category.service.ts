import { Service } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getAllCategories() {
  return prisma.serviceCategory.findMany({
    orderBy: { displayOrder: "asc" },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.serviceCategory.findUnique({
    where: { slug },
  });
}

export async function getCreativeCategories() {
  return prisma.serviceCategory.findMany({
    where: { type: "CREATIVE" },
    orderBy: { displayOrder: "asc" },
  });
}

export async function getUtilityCategories() {
  return prisma.serviceCategory.findMany({
    where: { type: "UTILITY" },
    orderBy: { displayOrder: "asc" },
  });
}