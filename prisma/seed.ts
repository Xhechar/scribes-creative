import { categories } from "@/lib/data/categories";
import { processSteps } from "@/lib/data/process-steps";
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