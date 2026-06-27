import prisma from "@/lib/prisma";

// ── Dashboard ──────────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const [newLeads, pendingReviews, publishedPosts, portfolioCount] = await Promise.all([
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.review.count({ where: { isApproved: false } }),
    prisma.post.count({ where: { publishedAt: { not: null } } }),
    prisma.portfolioItem.count(),
  ]);
  return { newLeads, pendingReviews, publishedPosts, portfolioCount };
}

export async function getRecentLeads(limit = 5) {
  return prisma.lead.findMany({
    where: { status: "NEW" },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

// ── Leads ──────────────────────────────────────────────────────────────────

export async function getAllLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateLeadStatus(id: string, status: string) {
  return prisma.lead.update({ where: { id }, data: { status: status as "NEW" | "CONTACTED" | "CONVERTED" | "CLOSED" } });
}

// ── Reviews ────────────────────────────────────────────────────────────────

export async function getAllReviews() {
  return prisma.review.findMany({
    orderBy: [{ isApproved: "asc" }, { publishedAt: "desc" }],
    include: { category: { select: { name: true } } },
  });
}

export async function setReviewApproval(id: string, isApproved: boolean) {
  return prisma.review.update({ where: { id }, data: { isApproved } });
}

export async function deleteReview(id: string) {
  return prisma.review.delete({ where: { id } });
}

// ── Blog ───────────────────────────────────────────────────────────────────

export async function getAllPostsAdmin() {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      publishedAt: true,
      tags: true,
      category: { select: { name: true } },
      createdAt: true,
    },
  });
}

export async function getPostByIdAdmin(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: { category: { select: { id: true, name: true } } },
  });
}

// ── Portfolio ──────────────────────────────────────────────────────────────

export async function getAllPortfolioAdmin() {
  return prisma.portfolioItem.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      category: { select: { name: true } },
      images: { orderBy: { order: "asc" }, take: 1 },
    },
  });
}

export async function getPortfolioItemAdmin(id: string) {
  return prisma.portfolioItem.findUnique({
    where: { id },
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
    },
  });
}

// ── Services ───────────────────────────────────────────────────────────────

export async function getAllServicesAdmin() {
  return prisma.service.findMany({
    orderBy: [{ category: { displayOrder: "asc" } }, { displayOrder: "asc" }],
    include: { category: { select: { name: true, slug: true } } },
  });
}

// ── FAQs ───────────────────────────────────────────────────────────────────

export async function getAllFaqsAdmin() {
  return prisma.fAQ.findMany({
    orderBy: [{ categoryId: "asc" }, { displayOrder: "asc" }],
    include: { category: { select: { name: true } } },
  });
}