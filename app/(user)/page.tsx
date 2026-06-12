import { PublicContentBoundary } from "@/components/site/public-content/public-content-boundary"
import { HomePageContent } from "@/components/site/user/home-page-content"

export const dynamic = "force-dynamic"

export default function UserPage() {
  return (
    <PublicContentBoundary slug="home">
      <HomePageContent />
    </PublicContentBoundary>
  )
};
