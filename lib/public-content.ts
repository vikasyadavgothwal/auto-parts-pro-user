import { queryOptions } from "@tanstack/react-query";
import { apiInterpreter } from "@/lib/api/client";
import type {
  LegalPublicContentSlug,
  ConfigPublicContentSlug,
  ForBusinessBannerConfig,
  ForBusinessBusinessSolutionsConfig,
  ForBusinessCtaConfig,
  ForBusinessFleetManagerConfig,
  ForBusinessPageConfig,
  ForBusinessPricingConfig,
  HomeBannerConfig,
  HomeCategoryConfig,
  HomeCTAConfig,
  HomeEnterpriseConfig,
  HomeFeaturedPartsConfig,
  HomePageConfig,
  HomeProcessStep,
  HomeWhyChooseUsConfig,
  PublicContentBySlug,
  PublicContentError,
  PublicContentResponse,
  PublicContentSeo,
  PublicContentSlug,
  PublicContentSuccess,
  PublicSectionContent,
  PublicSectionVisibility,
  SectionPublicContentSlug,
  TextPair,
} from "@/types/api/public-content";
import type { ApiRequestOptions } from "@/types/api/client";

const PUBLIC_CONTENT_PATH = "/api/v1/user/public-content";

export type {
  LegalPublicContentSlug,
  ConfigPublicContentSlug,
  ForBusinessBannerConfig,
  ForBusinessBusinessSolutionsConfig,
  ForBusinessCtaConfig,
  ForBusinessFleetManagerConfig,
  ForBusinessPageConfig,
  ForBusinessPricingConfig,
  HomeBannerConfig,
  HomeCategoryConfig,
  HomeCTAConfig,
  HomeEnterpriseConfig,
  HomeFeaturedPartsConfig,
  HomePageConfig,
  HomeProcessStep,
  HomeWhyChooseUsConfig,
  PublicContentBySlug,
  PublicContentError,
  PublicContentResponse,
  PublicContentSeo,
  PublicContentSlug,
  PublicContentSuccess,
  PublicSectionContent,
  PublicSectionVisibility,
  SectionPublicContentSlug,
  TextPair,
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
  init?: ApiRequestOptions<never>,
): Promise<PublicContentSuccess<Slug>> {
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  const response = await apiInterpreter.public<PublicContentResponse<Slug>>(
    PUBLIC_CONTENT_PATH,
    {
      query: { slug },
      ...init,
      headers,
    },
  );

  if (!response?.ok) {
    throw new Error(
      getErrorMessage(response, "Unable to load public page content."),
    );
  }

  return response;
}

export const publicContentQueryOptions = <Slug extends LegalPublicContentSlug>(
  slug: Slug,
) =>
  publicContentBySlugQueryOptions(slug);

export const publicContentBySlugQueryOptions = <Slug extends PublicContentSlug>(
  slug: Slug,
) =>
  queryOptions({
    queryKey: publicContentQueryKey(slug),
    queryFn: ({ signal }) => fetchPublicContentBySlug(slug, { signal }),
    staleTime: 1000 * 60 * 5,
  });

export const publicSectionContentQueryOptions = <
  Slug extends SectionPublicContentSlug,
>(
  slug: Slug,
) => publicContentBySlugQueryOptions(slug);

export const publicConfigContentQueryOptions = <
  Slug extends ConfigPublicContentSlug,
>(
  slug: Slug,
) => publicContentBySlugQueryOptions(slug);

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

export const getPublicText = (value: string | null | undefined) =>
  value?.trim() ?? "";

export const hasPublicText = (...values: Array<string | null | undefined>) =>
  values.some((value) => Boolean(getPublicText(value)));
