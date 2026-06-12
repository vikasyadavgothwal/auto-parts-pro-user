import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  publicSectionContentQueryOptions,
  type SectionPublicContentSlug,
} from "@/lib/public-content";

export async function PublicSectionContentBoundary({
  slug,
  children,
}: {
  slug: SectionPublicContentSlug;
  children: ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(publicSectionContentQueryOptions(slug));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
