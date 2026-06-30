import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: paramsId } = await params;
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { isApproved } = await req.json();
  const review = await prisma.review.update({
    where: { id: paramsId },
    data: { isApproved },
  });
  return NextResponse.json(review);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: paramsId } = await params;
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.review.delete({ where: { id: paramsId } });
  return NextResponse.json({ deleted: true });
}
