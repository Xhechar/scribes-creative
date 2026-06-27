import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { isApproved } = await req.json();
  const review = await prisma.review.update({
    where: { id: params.id },
    data: { isApproved },
  });
  return NextResponse.json(review);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.review.delete({ where: { id: params.id } });
  return NextResponse.json({ deleted: true });
}
