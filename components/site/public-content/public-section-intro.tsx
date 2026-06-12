"use client";

import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import {
  getVisiblePublicSectionContent,
  publicSectionContentQueryOptions,
  type SectionPublicContentSlug,
} from "@/lib/public-content";

export function PublicSectionIntro({
  slug,
  wrapperClassName,
  contentClassName,
  headingClassName,
  subheadingClassName,
}: {
  slug: SectionPublicContentSlug;
  wrapperClassName?: string;
  contentClassName?: string;
  headingClassName?: string;
  subheadingClassName?: string;
}) {
  const { data } = useQuery(publicSectionContentQueryOptions(slug));
  const { heading, subheading, hasContent } = getVisiblePublicSectionContent(
    data?.data,
  );

  if (!hasContent) {
    return null;
  }

  return (
    <div className={wrapperClassName}>
      <div className={contentClassName}>
        {heading ? <h1 className={cn(headingClassName)}>{heading}</h1> : null}
        {subheading ? (
          <p className={cn(subheadingClassName)}>{subheading}</p>
        ) : null}
      </div>
    </div>
  );
}
