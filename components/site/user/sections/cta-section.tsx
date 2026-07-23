import Link from "next/link"
import { BusinessDemoDialogButton } from "@/components/site/business/business-demo-dialog"
import { Button } from "@/components/ui/button"
import {
  getPublicText,
  hasPublicText,
  type HomeCTAConfig,
} from "@/lib/public-content"

const isStartShoppingCta = (value: string) =>
  /start\s+shop(?:ping)?|shop\s+now|browse\s+parts/i.test(value)

const isSupportCta = (value: string) =>
  /talk\s+to\s+support|support|contact\s+support/i.test(value)

const ctaHref = (label: string, href: string) =>
  isStartShoppingCta(label) ? "/search" : href

export function CTASection({ config }: { config?: HomeCTAConfig }) {
  const heading = getPublicText(config?.heading)
  const subheading = getPublicText(config?.subheading)
  const primaryButtonText = getPublicText(config?.primaryButtonText)
  const primaryButtonLink = getPublicText(config?.primaryButtonLink)
  const secondaryButtonText = getPublicText(config?.secondaryButtonText)
  const secondaryButtonLink = getPublicText(config?.secondaryButtonLink)
  const hasPrimaryButton = Boolean(primaryButtonText && primaryButtonLink)
  const hasSecondaryButton = Boolean(secondaryButtonText && secondaryButtonLink)

  if (
    !hasPublicText(heading, subheading) &&
    !hasPrimaryButton &&
    !hasSecondaryButton
  ) {
    return null
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-brand-primary-hover py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_0%,_transparent_50%)]" />
      </div>
      <div className="site-container relative z-10">
        <div className="text-center">
          {heading ? (
            <h2 className="mb-6 md:text-5xl text-3xl font-bold text-white">
              {heading}
            </h2>
          ) : null}
          {subheading ? (
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
              {subheading}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {hasPrimaryButton ? (
              isSupportCta(primaryButtonText) ? (
                <BusinessDemoDialogButton
                  queryType="Contact"
                  source="Home CTA Support"
                  variant="outline"
                  className="h-auto rounded-full bg-white border border-white px-8 py-4 text-lg font-medium text-primary hover:bg-white/90 hover:text-primary"
                >
                  {primaryButtonText}
                </BusinessDemoDialogButton>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-full bg-white border border-white px-8 py-4 text-lg font-medium text-primary hover:bg-white/90 hover:text-primary"
                >
                  <Link href={ctaHref(primaryButtonText, primaryButtonLink)}>
                    {primaryButtonText}
                  </Link>
                </Button>
              )
            ) : null}
            {hasSecondaryButton ? (
              isSupportCta(secondaryButtonText) ? (
                <BusinessDemoDialogButton
                  queryType="Contact"
                  source="Home CTA Support"
                  variant="outline"
                  className="h-auto rounded-full border-2 border-white bg-primary px-8 py-4 text-lg font-medium text-white hover:bg-white/20 hover:text-white"
                >
                  {secondaryButtonText}
                </BusinessDemoDialogButton>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-full border-2 border-white bg-primary px-8 py-4 text-lg font-medium text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href={ctaHref(secondaryButtonText, secondaryButtonLink)}>
                    {secondaryButtonText}
                  </Link>
                </Button>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
