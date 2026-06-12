import Link from "next/link";
import { SparklesIcon } from "@/components/icons/site-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getPublicText,
  hasPublicText,
  type ForBusinessBannerConfig,
} from "@/lib/public-content";

type BusinessHeroSectionProps = {
  config?: ForBusinessBannerConfig;
};

export function BusinessHeroSection({ config }: BusinessHeroSectionProps) {
  const badgeText = getPublicText(config?.badgeText);
  const heading = getPublicText(config?.heading);
  const redHeading = getPublicText(config?.redHeading);
  const subheading = getPublicText(config?.subheading);
  const primaryButtonText = getPublicText(config?.primaryButtonText);
  const primaryButtonLink = getPublicText(config?.primaryButtonLink);
  const secondaryButtonText = getPublicText(config?.secondaryButtonText);
  const secondaryButtonLink = getPublicText(config?.secondaryButtonLink);
  const hasPrimaryButton = Boolean(primaryButtonText && primaryButtonLink);
  const hasSecondaryButton = Boolean(secondaryButtonText && secondaryButtonLink);

  if (
    !hasPublicText(badgeText, heading, redHeading, subheading) &&
    !hasPrimaryButton &&
    !hasSecondaryButton
  ) {
    return null;
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <div className="site-container relative md:py-24 py-10">
        <div className="mx-auto max-w-4xl text-center">
          {badgeText ? (
            <Badge className="mb-6 rounded-full px-4 py-2 text-sm font-medium">
              <SparklesIcon className="h-4 w-4" />
              <span>{badgeText}</span>
            </Badge>
          ) : null}

          {heading || redHeading ? (
            <h1 className="md:mb-6 mb-2 md:text-6xl text-2xl font-bold leading-tight text-white">
              {heading}
              {heading && redHeading ? <br /> : null}
              {redHeading ? (
                <span className="text-primary">{redHeading}</span>
              ) : null}
            </h1>
          ) : null}

          {subheading ? (
            <p className="mb-12 text-xl leading-relaxed text-brand-muted">
              {subheading}
            </p>
          ) : null}

          {hasPrimaryButton || hasSecondaryButton ? (
            <div className="flex flex-wrap justify-center gap-4">
              {hasPrimaryButton ? (
                <Button
                  asChild
                  className="h-auto rounded-full px-8 py-4 text-lg font-medium hover:bg-brand-primary-hover"
                >
                  <Link href={primaryButtonLink}>{primaryButtonText}</Link>
                </Button>
              ) : null}

              {hasSecondaryButton ? (
                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-full border-border bg-brand-panel px-8 py-4 text-lg font-medium text-white hover:border-primary hover:bg-transparent"
                >
                  <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
