import { categories } from "@/lib/data/categories";
import { NavCategory } from "@/types";

// When the live DB is wired up (Phase 2), each function below becomes a
// Prisma query instead of an array read — nothing outside this file changes.

export async function getAllCategories(): Promise<NavCategory[]> {
  return [...categories].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<NavCategory | undefined> {
  return categories.find((c) => c.slug === slug);
}

export async function getCreativeCategories(): Promise<NavCategory[]> {
  const all = await getAllCategories();
  return all.filter((c) => c.type === "CREATIVE");
}

export async function getUtilityCategories(): Promise<NavCategory[]> {
  const all = await getAllCategories();
  return all.filter((c) => c.type === "UTILITY");
}