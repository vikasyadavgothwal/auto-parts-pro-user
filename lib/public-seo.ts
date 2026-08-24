import type { Metadata } from "next";
import {
  fetchPublicContentBySlug,
  type PublicContentSeo,
  type PublicContentSlug,
} from "@/lib/public-content";
import { getMainWebsiteSiteSettings } from "@/lib/site-settings";

type SeoFallback = {
  title: string;
  description?: string;
};

const DEFAULT_SITE_NAME = "Auto Parts Pro";

const getPublicSiteUrl = () => {
  const value =
    process.env.NEXT_PUBLIC_MAIN_WEBSITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    "";

  if (!value) {
    return null;
  }

  try {
    return new URL(value.replace(/\/+$/, ""));
  } catch {
    return null;
  }
};

const getSeoText = (value: string | null | undefined) => value?.trim() ?? "";

const splitKeywords = (value: string) =>
  value
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

const resolveUrl = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  const siteUrl = getPublicSiteUrl();
  if (!siteUrl || !trimmedValue.startsWith("/")) {
    return trimmedValue;
  }

  return new URL(trimmedValue, siteUrl).toString();
};

export const buildMetadataFromPublicSeo = (
  seo: PublicContentSeo | undefined,
  fallback: SeoFallback,
): Metadata => {
  const title = getSeoText(seo?.metaTitle) || fallback.title;
  const description =
    getSeoText(seo?.metaDescription) || fallback.description || "";
  const keywords = splitKeywords(getSeoText(seo?.metaKeywords));
  const canonical = resolveUrl(getSeoText(seo?.canonicalLink));
  const ogTitle = getSeoText(seo?.ogTitle) || title;
  const ogDescription = getSeoText(seo?.ogDescription) || description;
  const ogImage = resolveUrl(getSeoText(seo?.ogImage));
  const siteUrl = getPublicSiteUrl();

  return {
    ...(siteUrl ? { metadataBase: siteUrl } : {}),
    title,
    ...(description ? { description } : {}),
    ...(keywords.length ? { keywords } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noFollow,
    },
    openGraph: {
      title: ogTitle,
      ...(ogDescription ? { description: ogDescription } : {}),
      siteName: DEFAULT_SITE_NAME,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
};

export const getPublicContentMetadata = async (
  slug: PublicContentSlug,
  fallback: SeoFallback,
): Promise<Metadata> => {
  try {
    const [response, siteSettings] = await Promise.all([
      fetchPublicContentBySlug(slug, { cache: "no-store" }),
      getMainWebsiteSiteSettings(),
    ]);
    const mergedSeo: PublicContentSeo = {
      ...response.seo,
      metaTitle: response.seo.metaTitle || siteSettings.seo.title,
      metaDescription: response.seo.metaDescription || siteSettings.seo.description,
      metaKeywords: response.seo.metaKeywords || siteSettings.seo.keywords,
      canonicalLink: response.seo.canonicalLink || siteSettings.seo.canonicalUrl,
      noIndex: response.seo.noIndex || siteSettings.seo.noIndex,
      noFollow: response.seo.noFollow || siteSettings.seo.noFollow,
    };

    return buildMetadataFromPublicSeo(mergedSeo, fallback);
  } catch {
    return buildMetadataFromPublicSeo(undefined, fallback);
  }
};
