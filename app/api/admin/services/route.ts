import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
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
  if (!name?.trim() || !slug?.trim() || !categoryId) {
    return NextResponse.json(
      { error: "Name, slug and category are required." },
      { status: 400 },
    );
  }

  const service = await prisma.service.create({
    data: {
      name: name.trim(),
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
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
  return NextResponse.json(service, { status: 201 });
}
