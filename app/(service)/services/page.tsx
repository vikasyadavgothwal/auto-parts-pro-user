import { PublicSectionContentBoundary } from "@/components/site/public-content/public-section-content-boundary"
import { SearchHeroSection } from "@/components/site/service/sections/search-hero-section"
import { ServicesListingSection } from "@/components/site/service/sections/listing-section"
import { getPublicContentMetadata } from "@/lib/public-seo"

export const dynamic = "force-dynamic"

export const generateMetadata = () =>
  getPublicContentMetadata("services", {
    title: "Services | Auto Parts Pro",
    description: "Auto parts sourcing and support services.",
  })

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-brand-surface">
      <PublicSectionContentBoundary slug="services">
        <SearchHeroSection />
      </PublicSectionContentBoundary>
      <ServicesListingSection />
    </div>
  )
}
