import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await prisma.portfolioItem.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      category: { select: { name: true } },
      images: { orderBy: { order: "asc" }, take: 1 },
    },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    title,
    slug,
    description,
    clientName,
    categoryId,
    isFeatured,
    displayOrder,
    imageUrls,
  } = body;

  if (!title?.trim() || !slug?.trim()) {
    return NextResponse.json(
      { error: "Title and slug are required." },
      { status: 400 },
    );
  }

  const item = await prisma.portfolioItem.create({
    data: {
      title: title.trim(),
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
      description: description?.trim() || null,
      clientName: clientName?.trim() || null,
      categoryId: categoryId || null,
      isFeatured: Boolean(isFeatured),
      displayOrder: Number(displayOrder) || 0,
      images: {
        create: (imageUrls as string[])
          .filter(Boolean)
          .map((url: string, i: number) => ({ url, order: i })),
      },
    },
  });

  return NextResponse.json(item, { status: 201 });
}