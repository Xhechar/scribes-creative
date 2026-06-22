import prisma from "@/lib/prisma";

export async function getAllPosts() {
  return prisma.post.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      tags: true,
      publishedAt: true,
      category: { select: { name: true, slug: true } },
    },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });
}
