import { SearchHeroSection } from "@/components/site/service/sections/search-hero-section"
import { ServicesListingSection } from "@/components/site/service/sections/listing-section"

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-brand-surface">
      <SearchHeroSection />
      <ServicesListingSection />
    </div>
  )
}
