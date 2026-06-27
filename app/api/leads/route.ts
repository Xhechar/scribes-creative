import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, message } = body;

    // Only name and phone are required — mirror what the form enforces.
    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        message:
          [service ? `Service: ${service}` : null, message?.trim() || null]
            .filter(Boolean)
            .join("\n\n") || null,
        status: "NEW",
      },
    });

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[leads] POST error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}