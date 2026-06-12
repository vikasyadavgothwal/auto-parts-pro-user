import { queryOptions } from "@tanstack/react-query";
import { publicApiRequest } from "@/lib/api/client";
import type {
  LegalPublicContentSlug,
  PublicContentBySlug,
  PublicContentError,
  PublicContentResponse,
  PublicContentSlug,
  PublicContentSuccess,
  PublicSectionContent,
  PublicSectionVisibility,
  SectionPublicContentSlug,
} from "@/types/api/public-content";

const PUBLIC_CONTENT_PATH = "/api/v1/user/public-content";

export type {
  LegalPublicContentSlug,
  PublicContentBySlug,
  PublicContentError,
  PublicContentResponse,
  PublicContentSlug,
  PublicContentSuccess,
  PublicSectionContent,
  PublicSectionVisibility,
  SectionPublicContentSlug,
};

export const publicContentQueryKey = (slug: PublicContentSlug) =>
  ["public-content", slug] as const;

const getErrorMessage = (payload: unknown, fallback: string) => {
  if (
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }

  return fallback;
};

export async function fetchPublicContentBySlug<Slug extends PublicContentSlug>(
  slug: Slug,
  init?: RequestInit,
): Promise<PublicContentSuccess<Slug>> {
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  const response = await publicApiRequest<PublicContentResponse<Slug>>(PUBLIC_CONTENT_PATH, {
    ...init,
    query: { slug },
    headers,
  });

  if (!response?.ok) {
    throw new Error(
      getErrorMessage(response, "Unable to load public page content."),
    );
  }

  return response;
}

export const publicContentQueryOptions = (slug: LegalPublicContentSlug) =>
  queryOptions({
    queryKey: publicContentQueryKey(slug),
    queryFn: ({ signal }) => fetchPublicContentBySlug(slug, { signal }),
    staleTime: 1000 * 60 * 5,
  });

export const publicSectionContentQueryOptions = (
  slug: SectionPublicContentSlug,
) =>
  queryOptions({
    queryKey: publicContentQueryKey(slug),
    queryFn: ({ signal }) => fetchPublicContentBySlug(slug, { signal }),
    staleTime: 1000 * 60 * 5,
  });

export const getVisiblePublicSectionContent = (
  content: PublicSectionContent | undefined,
): PublicSectionVisibility => {
  const heading = content?.heading.trim() ?? "";
  const subheading = content?.subheading.trim() ?? "";

  return {
    heading,
    subheading,
    hasContent: Boolean(heading || subheading),
  };
};
