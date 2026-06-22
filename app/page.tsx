import { Hero } from "@/components/sections/Hero";
import { CategoriesStrip } from "@/components/sections/CategoriesStrip";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  getCreativeCategories,
  getUtilityCategories,
} from "@/lib/services/category.service";
import { getProcessSteps } from "@/lib/services/process-step.service";
import { getFeaturedPortfolioItems } from "@/lib/services/portfolio.service";
import { getCreativeCategoriesWithServices } from "@/lib/services/service.service";
import {
  getFeaturedReviews,
  getReviewStats,
} from "@/lib/services/review.service";
import { getGeneralFaqs } from "@/lib/services/faq.service";

export default async function HomePage() {
  const [
    creative,
    utility,
    processSteps,
    portfolioItems,
    categoriesWithServices,
    reviews,
    reviewStats,
    faqs,
  ] = await Promise.all([
    getCreativeCategories(),
    getUtilityCategories(),
    getProcessSteps(),
    getFeaturedPortfolioItems(),
    getCreativeCategoriesWithServices(),
    getFeaturedReviews(),
    getReviewStats(),
    getGeneralFaqs(),
  ]);

  return (
    <>
      <Hero />
      {/** @ts-ignore */}
      <CategoriesStrip creative={creative} utility={utility} />
      <ProcessFlow steps={processSteps} />
      <PortfolioPreview items={portfolioItems} />
      <ServicesOverview categories={categoriesWithServices} />
      <ReviewsSection
        reviews={reviews}
        averageRating={reviewStats.average}
        reviewCount={reviewStats.count}
      />
      <FaqSection faqs={faqs} />
      <ContactSection />
    </>
  );
}
