import { QueryClient } from "@tanstack/react-query"

import { SeoCustomCode } from "@/components/site/seo/seo-custom-code"
import { HomePageContent } from "@/components/site/user/home-page-content"
import { searchMarketplaceProducts } from "@/lib/marketplace"
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
  const [pageContent, featuredProductsResult] = await Promise.all([
    queryClient.fetchQuery(publicConfigContentQueryOptions("home")),
    searchMarketplaceProducts({ limit: 12 }).catch(() => null),
  ])

  return (
    <>
      <SeoCustomCode seo={pageContent?.seo} />
      <HomePageContent
        config={pageContent?.data}
        featuredProducts={featuredProductsResult?.products ?? []}
      />
    </>
  )
}
