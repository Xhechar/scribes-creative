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

  const { name, slug, description, icon, type, displayOrder, heroImage } =
    await req.json();
  const cat = await prisma.serviceCategory.update({
    where: { id: params.id },
    data: {
      name: name?.trim(),
      slug: slug?.trim().toLowerCase().replace(/\s+/g, "-"),
      description: description?.trim() ?? "",
      icon: icon?.trim() || null,
      heroImage: heroImage?.trim() || null,
      type: type === "UTILITY" ? "UTILITY" : "CREATIVE",
      displayOrder: Number(displayOrder) || 0,
    },
  });
  return NextResponse.json(cat);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.serviceCategory.delete({ where: { id: params.id } });
  return NextResponse.json({ deleted: true });
}
