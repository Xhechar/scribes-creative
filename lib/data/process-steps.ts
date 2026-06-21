export interface ProcessStepSeed {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  displayOrder: number;
}

export const processSteps: ProcessStepSeed[] = [
  {
    id: "discover",
    stepNumber: 1,
    title: "Discover",
    description:
      "We learn your business, your customers, and what should set you apart.",
    displayOrder: 1,
  },
  {
    id: "concept",
    stepNumber: 2,
    title: "Concept",
    description:
      "We sketch directions — color, type, tone — until one truly fits your brand.",
    displayOrder: 2,
  },
  {
    id: "design-produce",
    stepNumber: 3,
    title: "Design & Produce",
    description:
      "From final digital files to printed, signed, or built — we bring it to life.",
    displayOrder: 3,
  },
  {
    id: "launch",
    stepNumber: 4,
    title: "Launch",
    description:
      "Your new identity goes live — on your shopfront, packaging, and website.",
    displayOrder: 4,
  },
];