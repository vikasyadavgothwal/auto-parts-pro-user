import { QueryClient } from "@tanstack/react-query"

import { HomePageContent } from "@/components/site/user/home-page-content"
import { publicConfigContentQueryOptions } from "@/lib/public-content"

export const dynamic = "force-dynamic"

export default async function UserPage() {
  const queryClient = new QueryClient()
  const pageContent = await queryClient.fetchQuery(publicConfigContentQueryOptions("home"))

  return <HomePageContent config={pageContent?.data} />
}
