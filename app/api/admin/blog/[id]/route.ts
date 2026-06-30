import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "h2",
    "h3",
    "p",
    "strong",
    "em",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
    "hr",
    "br",
  ],
  allowedAttributes: {
    a: ["href", "rel", "target", "class"],
    img: ["src", "alt", "class"],
  },
  allowedSchemes: ["https", "http"],
};

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: paramsId } = await params;
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    title,
    slug,
    excerpt,
    content,
    coverImage,
    tags,
    categoryId,
    seoTitle,
    seoDescription,
    publishedAt,
  } = body;

  const cleanContent = sanitizeHtml(content ?? "", sanitizeOptions);

  const post = await prisma.post.update({
    where: { id: paramsId },
    data: {
      title: title?.trim(),
      slug: slug?.trim().toLowerCase().replace(/\s+/g, "-"),
      excerpt: excerpt?.trim() ?? "",
      content: cleanContent,
      coverImage: coverImage?.trim() || null,
      tags: Array.isArray(tags) ? tags : [],
      categoryId: categoryId || null,
      seoTitle: seoTitle?.trim() || null,
      seoDescription: seoDescription?.trim() || null,
      publishedAt: publishedAt ? new Date(publishedAt) : null,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: paramsId } = await params;
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.post.delete({ where: { id: paramsId } });
  return NextResponse.json({ deleted: true });
}