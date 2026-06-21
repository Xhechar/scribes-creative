import { Hero } from "@/components/sections/Hero";
import { CategoriesStrip } from "@/components/sections/CategoriesStrip";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import {
  getCreativeCategories,
  getUtilityCategories,
} from "@/lib/services/category.service";
import { getProcessSteps } from "@/lib/services/process-step.service";

export default async function HomePage() {
  const [creative, utility, processSteps] = await Promise.all([
    getCreativeCategories(),
    getUtilityCategories(),
    getProcessSteps(),
  ]);

  return (
    <>
      <Hero />
      <CategoriesStrip creative={creative} utility={utility} />
      <ProcessFlow steps={processSteps} />

      {/*
        Next up, in order:
        - PortfolioPreview (featured case studies, before/after)
        - ServicesOverview (full catalog grouped by category)
        - Reviews          (combined Google + site reviews)
        - FAQ
        - ContactSection
      */}
    </>
  );
}
