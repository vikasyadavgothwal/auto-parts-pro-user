import { PublicSectionContentBoundary } from "@/components/site/public-content/public-section-content-boundary"
import { SearchHeroSection } from "@/components/site/service/sections/search-hero-section"
import { ServicesListingSection } from "@/components/site/service/sections/listing-section"
import { getPublicContentMetadata } from "@/lib/public-seo"
import { listPublicGarages } from "@/lib/public-garages"

export const dynamic = "force-dynamic"

export const generateMetadata = () =>
  getPublicContentMetadata("services", {
    title: "Services | Auto Parts Pro",
    description: "Auto parts sourcing and support services.",
  })

type ServicePageProps = {
  searchParams: Promise<{
    q?: string
    service?: string
    location?: string
    page?: string
  }>
}

export default async function ServicePage({ searchParams }: ServicePageProps) {
  const params = await searchParams
  const searchQuery = typeof params.q === "string" ? params.q.trim() : ""
  const serviceQuery = typeof params.service === "string" ? params.service.trim() : ""
  const locationQuery = typeof params.location === "string" ? params.location.trim() : ""
  const page = typeof params.page === "string" ? params.page : "1"
  const garageResponse = await listPublicGarages({
    q: searchQuery,
    service: serviceQuery,
    location: locationQuery,
    page,
    pageSize: 6,
  }).catch(() => ({
    ok: true as const,
    garages: [],
    pagination: {
      page: 1,
      pageSize: 6,
      total: 0,
      totalPages: 1,
    },
  }))

  return (
    <div className="min-h-screen bg-brand-surface">
      <PublicSectionContentBoundary slug="services">
        <SearchHeroSection
          serviceQuery={serviceQuery || searchQuery}
          locationQuery={locationQuery}
        />
      </PublicSectionContentBoundary>
      <ServicesListingSection
        garages={garageResponse.garages}
        pagination={garageResponse.pagination}
        searchParams={{
          q: searchQuery,
          service: serviceQuery,
          location: locationQuery,
        }}
      />
    </div>
  )
}
