import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { ReactNode } from "react";
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

  await queryClient.prefetchQuery(publicContentBySlugQueryOptions(slug));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
