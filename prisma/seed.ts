import { categories } from "../lib/data/categories";
import { processSteps } from "../lib/data/process-steps";
import { portfolioItems } from "../lib/data/portfolio-items";
import { services } from "../lib/data/services";
import { reviews } from "../lib/data/reviews";
import { faqs } from "../lib/data/faqs";
import prisma from "@/lib/prisma";

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
  for (const item of portfolioItems) {
    const category = await prisma.serviceCategory.findUnique({
      where: { slug: item.categorySlug },
    });

    const portfolioItem = await prisma.portfolioItem.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        description: item.description,
        clientName: item.clientName,
        categoryId: category?.id,
        isFeatured: item.isFeatured,
        displayOrder: item.displayOrder,
      },
      create: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        clientName: item.clientName,
        categoryId: category?.id,
        isFeatured: item.isFeatured,
        displayOrder: item.displayOrder,
      },
    });

    const coverImageId = `${item.id}-cover`;
    const coverImageUrl = `https://picsum.photos/seed/${item.coverImageSeed}/900/700`;
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