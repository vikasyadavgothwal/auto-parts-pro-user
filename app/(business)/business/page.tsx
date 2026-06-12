import { BusinessPageContent } from "@/components/site/business/business-page-content"
import { PublicContentBoundary } from "@/components/site/public-content/public-content-boundary"
import { getPublicContentMetadata } from "@/lib/public-seo"

export const dynamic = "force-dynamic"

export const generateMetadata = () =>
  getPublicContentMetadata("for-business", {
    title: "Business | Auto Parts Pro",
    description: "Business procurement tools for repair shops and fleets.",
  })

export default function BusinessPage() {
  return (
    <PublicContentBoundary slug="for-business">
      <BusinessPageContent />
    </PublicContentBoundary>
  )
}
