import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: paramsId } = await params;
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { question, answer, categoryId, displayOrder } = await req.json();
  const faq = await prisma.fAQ.update({
    where: { id: paramsId },
    data: {
      question: question.trim(),
      answer: answer.trim(),
      categoryId: categoryId || null,
      displayOrder: Number(displayOrder) || 0,
    },
  });
  return NextResponse.json(faq);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: paramsId } = await params;
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.fAQ.delete({ where: { id: paramsId } });
  return NextResponse.json({ deleted: true });
}