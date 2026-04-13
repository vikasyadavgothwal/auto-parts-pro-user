import { BusinessHero } from "@/components/site/business/main/hero";
import {BusinessFeatures} from "@/components/site/business/main/business";
import {PricingSection} from "@/components/site/business/main/plans";
import {FleetOperationsSection} from "@/components/site/business/main/fleet_manager";
import {BusinessCTASection} from "@/components/site/business/main/cta";
export default function BusinessPage() {
  return (
    <>
    <BusinessHero />
    <BusinessFeatures />
    <PricingSection />
    <FleetOperationsSection />
    <BusinessCTASection />
    </>
  );
}
