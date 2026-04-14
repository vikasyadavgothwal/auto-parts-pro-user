import { BusinessSolutionsSection } from "@/components/site/user/sections/business-solutions-section"
import { BenefitsSection } from "@/components/site/user/sections/benefits-section"
import { CategoryTypesSection } from "@/components/site/user/sections/category-types-section"
import { CTASection } from "@/components/site/user/sections/cta-section"
import { FeaturedPartsSection } from "@/components/site/user/sections/featured-parts-section"
import { HeroSection } from "@/components/site/user/sections/hero-section"
import { ProcessSection } from "@/components/site/user/sections/process-section"
import { SearchSection } from "@/components/site/user/sections/search-section"

export default function UserPage() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <BenefitsSection />
      <CategoryTypesSection />
      <FeaturedPartsSection />
      <ProcessSection />
      <BusinessSolutionsSection />
      <CTASection />
    </>
  )
}
