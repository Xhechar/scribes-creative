import { prisma } from "@/lib/prisma";

export async function getProcessSteps() {
  return prisma.processStep.findMany({
    orderBy: { displayOrder: "asc" },
  });
}