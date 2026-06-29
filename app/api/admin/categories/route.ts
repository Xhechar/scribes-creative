import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const cats = await prisma.serviceCategory.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return NextResponse.json(cats);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, slug, description, icon, type, displayOrder, heroImage } =
    await req.json();
  if (!name?.trim() || !slug?.trim()) {
    return NextResponse.json(
      { error: "Name and slug are required." },
      { status: 400 },
    );
  }

  const cat = await prisma.serviceCategory.create({
    data: {
      name: name.trim(),
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
      description: description?.trim() ?? "",
      icon: icon?.trim() || null,
      heroImage: heroImage?.trim() || null,
      type: type === "UTILITY" ? "UTILITY" : "CREATIVE",
      displayOrder: Number(displayOrder) || 0,
    },
  });
  return NextResponse.json(cat, { status: 201 });
}
