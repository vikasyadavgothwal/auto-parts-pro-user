import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SeoCustomCode } from "@/components/site/seo/seo-custom-code";
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
  const result = await queryClient.fetchQuery(publicContentQueryOptions(slug));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SeoCustomCode seo={result.seo} />
      <LegalContentPage slug={slug} />
    </HydrationBoundary>
  );
}
