import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { question, answer, categoryId, displayOrder } = await req.json();
  if (!question?.trim() || !answer?.trim()) {
    return NextResponse.json(
      { error: "Question and answer are required." },
      { status: 400 },
    );
  }

  const faq = await prisma.fAQ.create({
    data: {
      question: question.trim(),
      answer: answer.trim(),
      categoryId: categoryId || null,
      displayOrder: Number(displayOrder) || 0,
    },
  });
  return NextResponse.json(faq, { status: 201 });
}