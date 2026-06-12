import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  publicContentQueryOptions,
  type LegalPublicContentSlug,
} from "@/lib/public-content";
import { LegalContentPage } from "./legal-content-page";

export async function LegalContentRoute({
  slug,
}: {
  slug: LegalPublicContentSlug;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(publicContentQueryOptions(slug));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LegalContentPage slug={slug} />
    </HydrationBoundary>
  );
}
