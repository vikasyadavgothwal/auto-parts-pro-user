import Link from "next/link";
import { BusinessDemoDialogButton } from "@/components/site/business/business-demo-dialog";
import { Button } from "@/components/ui/button";
import { getBusinessQueryType } from "@/lib/business-query-cta";
import {
  getPublicText,
  hasPublicText,
  type ForBusinessCtaConfig,
} from "@/lib/public-content";

type BusinessCTASectionProps = {
  config?: ForBusinessCtaConfig;
};

export function BusinessCTASection({ config }: BusinessCTASectionProps) {
  const heading = getPublicText(config?.heading);
  const subheading = getPublicText(config?.subheading);
  const primaryButtonText = getPublicText(config?.primaryButtonText);
  const primaryButtonLink = getPublicText(config?.primaryButtonLink);
  const secondaryButtonText = getPublicText(config?.secondaryButtonText);
  const secondaryButtonLink = getPublicText(config?.secondaryButtonLink);
  const primaryQueryType = getBusinessQueryType(primaryButtonText);
  const secondaryQueryType = getBusinessQueryType(secondaryButtonText);
  const hasPrimaryButton = Boolean(primaryButtonText && (primaryButtonLink || primaryQueryType));
  const hasSecondaryButton = Boolean(secondaryButtonText && (secondaryButtonLink || secondaryQueryType));

  if (
    !hasPublicText(heading, subheading) &&
    !hasPrimaryButton &&
    !hasSecondaryButton
  ) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-brand-primary-hover py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="site-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {heading ? (
            <h2 className="mb-6 md:text-[40px] text-3xl font-bold text-white">
              {heading}
            </h2>
          ) : null}

          {subheading ? (
            <p className="mb-12 text-xl text-white/80">{subheading}</p>
          ) : null}

          {hasPrimaryButton || hasSecondaryButton ? (
            <div className="flex flex-wrap justify-center gap-4">
              {hasPrimaryButton ? (
                primaryQueryType ? (
                  <BusinessDemoDialogButton
                    queryType={primaryQueryType}
                    source={primaryButtonText}
                    className="h-auto rounded-full bg-white px-8 py-4 text-lg font-medium text-primary hover:bg-gray-100"
                  >
                    {primaryButtonText}
                  </BusinessDemoDialogButton>
                ) : (
                  <Button
                    asChild
                    className="h-auto rounded-full bg-white px-8 py-4 text-lg font-medium text-primary hover:bg-gray-100"
                  >
                    <Link href={primaryButtonLink}>{primaryButtonText}</Link>
                  </Button>
                )
              ) : null}

              {hasSecondaryButton ? (
                secondaryQueryType ? (
                  <BusinessDemoDialogButton
                    queryType={secondaryQueryType}
                    source={secondaryButtonText}
                    variant="outline"
                    className="h-auto rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-medium text-white hover:bg-white/10 hover:text-white"
                  >
                    {secondaryButtonText}
                  </BusinessDemoDialogButton>
                ) : (
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-medium text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
                  </Button>
                )
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
