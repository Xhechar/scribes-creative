import { MetadataRoute } from "next";
import { getAllCategories } from "@/lib/services/category.service";
import { getCreativeCategoriesWithServices } from "@/lib/services/service.service";
import { getAllPortfolioItems } from "@/lib/services/portfolio.service";
import { getAllPosts } from "@/lib/services/post.service";

const BASE = "https://scribescreative.co.ke"; // TODO: confirm final domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, categoriesWithServices, portfolioItems, posts] =
    await Promise.all([
      getAllCategories(),
      getCreativeCategoriesWithServices(),
      getAllPortfolioItems(),
      getAllPosts(),
    ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/portfolio`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/blog`, priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE}/contact`, priority: 0.9, changeFrequency: "monthly" },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(
    (c: { slug: string }) => ({
      url: `${BASE}/services/${c.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    }),
  );

  const serviceRoutes: MetadataRoute.Sitemap = categoriesWithServices.flatMap(
    (cat: { slug: string; services: { slug: string }[] }) =>
      cat.services.map((s: { slug: string }) => ({
        url: `${BASE}/services/${cat.slug}/${s.slug}`,
        priority: 0.7,
        changeFrequency: "monthly" as const,
      })),
  );

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioItems.map(
    (item: { slug: string }) => ({
      url: `${BASE}/portfolio/${item.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    }),
  );

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p: { publishedAt: Date | null }) => p.publishedAt)
    .map((p: { slug: string; publishedAt: Date | null }) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.publishedAt ?? undefined,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...serviceRoutes,
    ...portfolioRoutes,
    ...postRoutes,
  ];
}