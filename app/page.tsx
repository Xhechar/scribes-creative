import { Hero } from "@/components/sections/Hero";
import { CategoriesStrip } from "@/components/sections/CategoriesStrip";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import {
  getCreativeCategories,
  getUtilityCategories,
} from "@/lib/services/category.service";
import { getProcessSteps } from "@/lib/services/process-step.service";
import { getFeaturedPortfolioItems } from "@/lib/services/portfolio.service";
import { getCreativeCategoriesWithServices } from "@/lib/services/service.service";

export default async function HomePage() {
  const [
    creative,
    utility,
    processSteps,
    portfolioItems,
    categoriesWithServices,
  ] = await Promise.all([
    getCreativeCategories(),
    getUtilityCategories(),
    getProcessSteps(),
    getFeaturedPortfolioItems(),
    getCreativeCategoriesWithServices(),
  ]);

  return (
    <>
      <Hero />
      {/** @ts-ignore */}
      <CategoriesStrip creative={creative} utility={utility} />
      <ProcessFlow steps={processSteps} />
      <PortfolioPreview items={portfolioItems} />
      <ServicesOverview categories={categoriesWithServices} />

      {/*
        Next up, in order:
        - Reviews (combined Google + site reviews)
        - FAQ
        - ContactSection
      */}
    </>
  );
}