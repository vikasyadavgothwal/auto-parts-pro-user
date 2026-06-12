import { BusinessSolutionsSection } from "@/components/site/user/sections/business-solutions-section";
import { BenefitsSection } from "@/components/site/user/sections/benefits-section";
import { CategoryTypesSection } from "@/components/site/user/sections/category-types-section";
import { CTASection } from "@/components/site/user/sections/cta-section";
import { FeaturedPartsSection } from "@/components/site/user/sections/featured-parts-section";
import { HeroSection } from "@/components/site/user/sections/hero-section";
import { ProcessSection } from "@/components/site/user/sections/process-section";
import { SearchSection } from "@/components/site/user/sections/search-section";
import { type HomePageConfig } from "@/types/api/public-content";

type HomePageContentProps = {
  config?: HomePageConfig;
};

export function HomePageContent({ config }: HomePageContentProps) {
  if (!config) {
    return null;
  }

  return (
    <>
      <HeroSection config={config.banner} />
      <SearchSection config={config.search} />
      <BenefitsSection config={config.whyChooseUs} />
      <CategoryTypesSection config={config.category} />
      <FeaturedPartsSection config={config.featuredParts} />
      <ProcessSection steps={config.process?.steps} />
      <BusinessSolutionsSection config={config.enterpriseSolutions} />
      <CTASection config={config.cta} />
    </>
  );
}
