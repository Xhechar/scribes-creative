import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
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

  // Delete existing images and replace — simplest approach for a single-admin system
  await prisma.portfolioImage.deleteMany({
    where: { portfolioItemId: params.id },
  });

  const item = await prisma.portfolioItem.update({
    where: { id: params.id },
    data: {
      title: title?.trim(),
      slug: slug?.trim().toLowerCase().replace(/\s+/g, "-"),
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

  return NextResponse.json(item);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.portfolioImage.deleteMany({
    where: { portfolioItemId: params.id },
  });
  await prisma.portfolioItem.delete({ where: { id: params.id } });
  return NextResponse.json({ deleted: true });
}