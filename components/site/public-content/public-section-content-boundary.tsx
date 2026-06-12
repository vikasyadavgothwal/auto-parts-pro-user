import type { ReactNode } from "react";
import type { SectionPublicContentSlug } from "@/lib/public-content";
import { PublicContentBoundary } from "./public-content-boundary";

export async function PublicSectionContentBoundary({
  slug,
  children,
}: {
  slug: SectionPublicContentSlug;
  children: ReactNode;
}) {
  return (
    <PublicContentBoundary slug={slug}>{children}</PublicContentBoundary>
  );
}
