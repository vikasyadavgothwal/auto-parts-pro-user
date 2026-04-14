import { BusinessCTASection } from "@/components/site/business/sections/cta-section"
import { BusinessFeaturesSection } from "@/components/site/business/sections/features-section"
import { FleetOperationsSection } from "@/components/site/business/sections/fleet-operations-section"
import { BusinessHeroSection } from "@/components/site/business/sections/hero-section"
import { PricingSection } from "@/components/site/business/sections/pricing-section"

export default function BusinessPage() {
  return (
    <>
      <BusinessHeroSection />
      <BusinessFeaturesSection />
      <PricingSection />
      <FleetOperationsSection />
      <BusinessCTASection />
    </>
  )
}
