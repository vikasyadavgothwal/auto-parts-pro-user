import { queryOptions } from "@tanstack/react-query";

export type LegalPublicContentSlug =
  | "privacy-policy"
  | "terms-of-services"
  | "cookies-settings";

export type PublicContentSuccess = {
  ok: true;
  slug: LegalPublicContentSlug;
  data: string;
};

export type PublicContentError = {
  ok: false;
  error: string;
};

export type PublicContentResponse = PublicContentSuccess | PublicContentError;

export type LegalContentPageCopy = {
  title: string;
  eyebrow: string;
  description: string;
};

export const LEGAL_CONTENT_PAGE_COPY: Record<
  LegalPublicContentSlug,
  LegalContentPageCopy
> = {
  "privacy-policy": {
    title: "Privacy Policy",
    eyebrow: "Legal",
    description:
      "Review how Auto Parts Pro handles customer information, platform data, and privacy choices.",
  },
  "terms-of-services": {
    title: "Terms of Services",
    eyebrow: "Legal",
    description:
      "Read the service terms that govern Auto Parts Pro accounts, purchases, requests, and platform usage.",
  },
  "cookies-settings": {
    title: "Cookies Settings",
    eyebrow: "Preferences",
    description:
      "Review cookie usage, consent preferences, analytics controls, and related tracking settings.",
  },
};

export const publicContentQueryKey = (slug: LegalPublicContentSlug) =>
  ["public-content", slug] as const;

const getPublicContentBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
  return baseUrl ? baseUrl.replace(/\/+$/, "") : "http://localhost:3000";
};

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

export async function fetchPublicContentBySlug(
  slug: LegalPublicContentSlug,
  init?: RequestInit,
): Promise<PublicContentSuccess> {
  const url = new URL("/api/v1/user/public-content", getPublicContentBaseUrl());
  url.searchParams.set("slug", slug);
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");

  const response = await fetch(url, {
    ...init,
    headers,
    cache: "no-store",
  });

  const payload = (await response
    .json()
    .catch(() => null)) as PublicContentResponse | null;

  if (!response.ok || !payload?.ok) {
    throw new Error(
      getErrorMessage(payload, "Unable to load public page content."),
    );
  }

  return payload;
}

export const publicContentQueryOptions = (slug: LegalPublicContentSlug) =>
  queryOptions({
    queryKey: publicContentQueryKey(slug),
    queryFn: ({ signal }) => fetchPublicContentBySlug(slug, { signal }),
    staleTime: 1000 * 60 * 5,
  });
