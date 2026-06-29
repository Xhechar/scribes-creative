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

  const {
    name,
    slug,
    description,
    categoryId,
    requirements,
    processSteps,
    priceFrom,
    priceUnit,
    image,
    isFeatured,
    displayOrder,
  } = await req.json();
  const service = await prisma.service.update({
    where: { id: params.id },
    data: {
      name: name?.trim(),
      slug: slug?.trim().toLowerCase().replace(/\s+/g, "-"),
      description: description?.trim() ?? "",
      categoryId,
      requirements: Array.isArray(requirements)
        ? requirements.filter(Boolean)
        : [],
      processSteps: Array.isArray(processSteps)
        ? processSteps.filter(Boolean)
        : [],
      priceFrom: priceFrom ? Number(priceFrom) : null,
      priceUnit: priceUnit?.trim() || null,
      image: image?.trim() || null,
      isFeatured: Boolean(isFeatured),
      displayOrder: Number(displayOrder) || 0,
    },
  });
  return NextResponse.json(service);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.service.delete({ where: { id: params.id } });
  return NextResponse.json({ deleted: true });
}