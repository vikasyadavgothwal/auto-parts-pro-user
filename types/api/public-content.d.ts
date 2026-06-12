export type LegalPublicContentSlug = "privacy-policy" | "terms-of-services" | "cookies-settings";

export type SectionPublicContentSlug = "rfq" | "suppliers" | "services";

export type PublicContentSlug = LegalPublicContentSlug | SectionPublicContentSlug;

export type PublicContentSection = {
  heading: string;
  subheading: string;
};

export type PublicSectionContent = PublicContentSection;

export type PublicContentBySlug = {
  "privacy-policy": string;
  "terms-of-services": string;
  "cookies-settings": string;
  rfq: PublicContentSection;
  suppliers: PublicContentSection;
  services: PublicContentSection;
};

export type PublicContentSuccess<Slug extends PublicContentSlug = PublicContentSlug> = {
  ok: true;
  slug: Slug;
  data: PublicContentBySlug[Slug];
};

export type PublicContentError = {
  ok: false;
  error: string;
};

export type PublicContentResponse<Slug extends PublicContentSlug = PublicContentSlug> =
  | PublicContentSuccess<Slug>
  | PublicContentError;

export type PublicSectionVisibility = {
  heading: string;
  subheading: string;
  hasContent: boolean;
};
