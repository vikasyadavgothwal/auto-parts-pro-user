import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { ReactNode } from "react";
import { SeoCustomCode } from "@/components/site/seo/seo-custom-code";
import {
  publicContentBySlugQueryOptions,
  type PublicContentSlug,
} from "@/lib/public-content";

export async function PublicContentBoundary({
  slug,
  children,
}: {
  slug: PublicContentSlug;
  children: ReactNode;
}) {
  const queryClient = new QueryClient();
  const result = await queryClient.fetchQuery(publicContentBySlugQueryOptions(slug));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SeoCustomCode seo={result.seo} />
      {children}
    </HydrationBoundary>
  );
}
