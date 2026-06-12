import { QueryClient } from "@tanstack/react-query"

import { SeoCustomCode } from "@/components/site/seo/seo-custom-code"
import { HomePageContent } from "@/components/site/user/home-page-content"
import { publicConfigContentQueryOptions } from "@/lib/public-content"
import { getPublicContentMetadata } from "@/lib/public-seo"

export const dynamic = "force-dynamic"

export const generateMetadata = () =>
  getPublicContentMetadata("home", {
    title: "Auto Parts Pro",
    description: "Source auto parts, request quotes, and connect with suppliers.",
  })

export default async function UserPage() {
  const queryClient = new QueryClient()
  const pageContent = await queryClient.fetchQuery(publicConfigContentQueryOptions("home"))

  return (
    <>
      <SeoCustomCode seo={pageContent?.seo} />
      <HomePageContent config={pageContent?.data} />
    </>
  )
}
