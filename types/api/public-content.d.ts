export type LegalPublicContentSlug = "privacy-policy" | "terms-of-services" | "cookies-settings";

export type SectionPublicContentSlug = "rfq" | "suppliers" | "services";

export type ConfigPublicContentSlug = "home" | "for-business";

export type PublicContentSlug =
  | LegalPublicContentSlug
  | SectionPublicContentSlug
  | ConfigPublicContentSlug;

export type TextPair = {
  heading: string;
  subheading: string;
};

export type HomeBannerConfig = {
  backgroundImage: string;
  badgeText: string;
  heading: string;
  subheading: string;
  keyPoints: readonly string[];
};

export type HomeWhyChooseUsConfig = {
  heading: string;
  subheading: string;
  pairs: readonly TextPair[];
};

export type HomeCategoryConfig = {
  heading: string;
  subheading: string;
  bottomHeading: string;
};

export type HomeFeaturedPartsConfig = {
  heading: string;
  subheading: string;
  buttonText: string;
  buttonSlug: string;
};

export type HomeProcessStep = TextPair;

export type HomeEnterpriseCard = TextPair & {
  buttonText: string;
  buttonLink: string;
};

export type HomeEnterpriseConfig = {
  cards: readonly HomeEnterpriseCard[];
};

export type HomeCTAConfig = {
  heading: string;
  subheading: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
};

export type HomePageConfig = {
  banner: HomeBannerConfig;
  search: TextPair;
  whyChooseUs: HomeWhyChooseUsConfig;
  category: HomeCategoryConfig;
  featuredParts: HomeFeaturedPartsConfig;
  process: {
    steps: readonly HomeProcessStep[];
  };
  enterpriseSolutions: HomeEnterpriseConfig;
  cta: HomeCTAConfig;
};

export type ForBusinessCard = TextPair;

export type ForBusinessPlan = {
  heading: string;
  subheading: string;
  price: string;
  duration: string;
  keyPoints: readonly string[];
};

export type ForBusinessFleetCard = {
  topHeading: string;
  heading: string;
  growthText: string;
};

export type ForBusinessBannerConfig = {
  badgeText: string;
  heading: string;
  redHeading: string;
  subheading: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
};

export type ForBusinessBusinessSolutionsConfig = {
  heading: string;
  subheading: string;
  cards: readonly ForBusinessCard[];
};

export type ForBusinessPricingConfig = {
  heading: string;
  subheading: string;
  plans: readonly ForBusinessPlan[];
};

export type ForBusinessFleetManagerConfig = {
  topHeading: string;
  heading: string;
  subheading: string;
  keyPoints: readonly string[];
  buttonText: string;
  buttonLink: string;
  cards: readonly ForBusinessFleetCard[];
};

export type ForBusinessCtaConfig = HomeCTAConfig;

export type ForBusinessPageConfig = {
  banner: ForBusinessBannerConfig;
  businessSolutions: ForBusinessBusinessSolutionsConfig;
  pricing: ForBusinessPricingConfig;
  forFleetManagers: ForBusinessFleetManagerConfig;
  cta: ForBusinessCtaConfig;
};

export type PublicContentSection = {
  heading: string;
  subheading: string;
};

export type PublicSectionContent = PublicContentSection;

export type PublicContentBySlug = {
  home: HomePageConfig;
  "for-business": ForBusinessPageConfig;
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
