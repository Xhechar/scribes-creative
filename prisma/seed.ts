import { categories } from "../lib/data/categories";
import { processSteps } from "../lib/data/process-steps";
import { portfolioItems } from "../lib/data/portfolio-items";
import { services } from "../lib/data/services";
import { reviews } from "../lib/data/reviews";
import { faqs } from "../lib/data/faqs";
import { blogPosts } from "../lib/data/blog-posts";
import prisma from "@/lib/prisma";

let images: string[] = [
  "https://i.pinimg.com/1200x/cf/46/00/cf4600a30b666ae3a3d2967fc668fa91.jpg",
  "https://i.pinimg.com/1200x/31/0d/b4/310db44a6f9dbb771484d2bb66687211.jpg",
  "https://i.pinimg.com/736x/a3/02/cc/a302cc95311748a29ee1a81d903b2df8.jpg",
  "https://i.pinimg.com/1200x/30/e8/37/30e83720ea80a5d8b82ca06f016424e0.jpg",
  "https://i.pinimg.com/736x/0f/1d/fc/0f1dfc718fd8c56a518ce07795065d90.jpg",
  "https://i.pinimg.com/736x/fd/a7/89/fda7896cc4fb14859fcf091f8531751c.jpg",
];

async function main() {
  console.log("Seeding service categories...");
  for (const category of categories) {
    await prisma.serviceCategory.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        icon: category.icon,
        type: category.type,
        displayOrder: category.displayOrder,
      },
      create: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        type: category.type,
        displayOrder: category.displayOrder,
      },
    });
  }

  console.log("Seeding services...");
  for (const service of services) {
    const category = await prisma.serviceCategory.findUnique({
      where: { slug: service.categorySlug },
    });
    if (!category) {
      console.warn(
        `Skipping "${service.name}" — category "${service.categorySlug}" not found.`,
      );
      continue;
    }

    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        categoryId: category.id,
        name: service.name,
        description: service.description,
        requirements: service.requirements,
        priceFrom: service.priceFrom,
        priceUnit: service.priceUnit,
        displayOrder: service.displayOrder,
      },
      create: {
        id: service.id,
        categoryId: category.id,
        name: service.name,
        slug: service.slug,
        description: service.description,
        requirements: service.requirements,
        priceFrom: service.priceFrom,
        priceUnit: service.priceUnit,
        displayOrder: service.displayOrder,
      },
    });
  }

  console.log("Seeding process steps...");
  for (const step of processSteps) {
    await prisma.processStep.upsert({
      where: { id: step.id },
      update: {
        stepNumber: step.stepNumber,
        title: step.title,
        description: step.description,
        displayOrder: step.displayOrder,
      },
      create: {
        id: step.id,
        stepNumber: step.stepNumber,
        title: step.title,
        description: step.description,
        displayOrder: step.displayOrder,
      },
    });
  }

  console.log("Seeding portfolio items...");
  for (let i = 0; i < portfolioItems.length; i++) {
    const category = await prisma.serviceCategory.findUnique({
      where: { slug: portfolioItems[i].categorySlug },
    });

    const portfolioItem = await prisma.portfolioItem.upsert({
      where: { slug: portfolioItems[i].slug },
      update: {
        title: portfolioItems[i].title,
        description: portfolioItems[i].description,
        clientName: portfolioItems[i].clientName,
        categoryId: category?.id,
        isFeatured: portfolioItems[i].isFeatured,
        displayOrder: portfolioItems[i].displayOrder,
      },
      create: {
        id: portfolioItems[i].id,
        title: portfolioItems[i].title,
        slug: portfolioItems[i].slug,
        description: portfolioItems[i].description,
        clientName: portfolioItems[i].clientName,
        categoryId: category?.id,
        isFeatured: portfolioItems[i].isFeatured,
        displayOrder: portfolioItems[i].displayOrder,
      },
    });

    const coverImageId = `${portfolioItems[i].id}-cover`;
    const coverImageUrl = `${images[i]}`;
    const existingCover = await prisma.portfolioImage.findFirst({
      where: { id: coverImageId },
    });
    if (!existingCover) {
      await prisma.portfolioImage.create({
        data: {
          id: coverImageId,
          portfolioItemId: portfolioItem.id,
          url: coverImageUrl,
          caption: "Cover",
          order: 0,
        },
      });
    }
  }

  console.log(
    "Seeding reviews (placeholder — replace with real ones before launch)...",
  );
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {
        authorName: review.authorName,
        rating: review.rating,
        comment: review.comment,
        source: review.source,
        publishedAt: new Date(review.publishedAt),
        isApproved: true,
      },
      create: {
        id: review.id,
        authorName: review.authorName,
        rating: review.rating,
        comment: review.comment,
        source: review.source,
        publishedAt: new Date(review.publishedAt),
        isApproved: true,
      },
    });
  }

  console.log("Seeding FAQs...");
  for (const faq of faqs) {
    const category = faq.categorySlug
      ? await prisma.serviceCategory.findUnique({
          where: { slug: faq.categorySlug },
        })
      : null;

    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: {
        question: faq.question,
        answer: faq.answer,
        categoryId: category?.id ?? null,
        displayOrder: faq.displayOrder,
      },
      create: {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        categoryId: category?.id ?? null,
        displayOrder: faq.displayOrder,
      },
    });
  }

  console.log("Seeding blog posts...");
  for (const post of blogPosts) {
    const category = post.categorySlug
      ? await prisma.serviceCategory.findUnique({
          where: { slug: post.categorySlug },
        })
      : null;

    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: `https://picsum.photos/seed/${post.coverImageSeed}/1200/630`,
        tags: post.tags,
        categoryId: category?.id ?? null,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        publishedAt: new Date(post.publishedAt),
      },
      create: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: `https://picsum.photos/seed/${post.coverImageSeed}/1200/630`,
        tags: post.tags,
        categoryId: category?.id ?? null,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        publishedAt: new Date(post.publishedAt),
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });