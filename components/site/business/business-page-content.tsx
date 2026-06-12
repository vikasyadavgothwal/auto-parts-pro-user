"use client";

import { useQuery } from "@tanstack/react-query";
import { BusinessCTASection } from "@/components/site/business/sections/cta-section";
import { BusinessFeaturesSection } from "@/components/site/business/sections/features-section";
import { FleetOperationsSection } from "@/components/site/business/sections/fleet-operations-section";
import { BusinessHeroSection } from "@/components/site/business/sections/hero-section";
import { PricingSection } from "@/components/site/business/sections/pricing-section";
import { publicConfigContentQueryOptions } from "@/lib/public-content";

export function BusinessPageContent() {
  const { data } = useQuery(publicConfigContentQueryOptions("for-business"));
  const config = data?.data;

  if (!config) {
    return null;
  }

  return (
    <>
      <BusinessHeroSection config={config.banner} />
      <BusinessFeaturesSection config={config.businessSolutions} />
      <PricingSection config={config.pricing} />
      <FleetOperationsSection config={config.forFleetManagers} />
      <BusinessCTASection config={config.cta} />
    </>
  );
}
