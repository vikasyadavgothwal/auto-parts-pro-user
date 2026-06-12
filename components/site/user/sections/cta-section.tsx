import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  getPublicText,
  hasPublicText,
  type HomeCTAConfig,
} from "@/lib/public-content"

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
              <Button
                asChild
                variant="outline"
                className="h-auto rounded-full bg-white border border-white px-8 py-4 text-lg font-medium text-primary  hover:bg-white/90 hover:text-primary"
              >
                <Link href={primaryButtonLink}>{primaryButtonText}</Link>
              </Button>
            ) : null}
            {hasSecondaryButton ? (
              <Button
                asChild
                variant="outline"
                className="h-auto rounded-full border-2 border-white bg-primary px-8 py-4 text-lg font-medium text-white hover:bg-white/20 hover:text-white"
              >
                <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
