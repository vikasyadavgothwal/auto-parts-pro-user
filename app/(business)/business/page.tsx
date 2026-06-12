import { BusinessPageContent } from "@/components/site/business/business-page-content"
import { PublicContentBoundary } from "@/components/site/public-content/public-content-boundary"

export const dynamic = "force-dynamic"

export default function BusinessPage() {
  return (
    <PublicContentBoundary slug="for-business">
      <BusinessPageContent />
    </PublicContentBoundary>
  )
}
