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

  const { status } = await req.json();
  const valid = ["NEW", "CONTACTED", "CONVERTED", "CLOSED"];
  if (!valid.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const lead = await prisma.lead.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(lead);
}