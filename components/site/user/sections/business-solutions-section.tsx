import Link from "next/link"
import {
  ArrowRightIcon,
} from "@/components/icons/site-icons"
import { Card } from "@/components/ui/card"
import { solutions } from "@/lib/data/user"
import {
  hasPublicText,
  getPublicText,
  type HomeEnterpriseConfig,
} from "@/lib/public-content"

export function BusinessSolutionsSection({
  config,
}: {
  config?: HomeEnterpriseConfig
}) {
  const heading = getPublicText(config?.heading)
  const cards = (config?.cards ?? [])
    .map((card) => ({
      heading: getPublicText(card.heading),
      subheading: getPublicText(card.subheading),
      buttonText: getPublicText(card.buttonText),
      buttonLink: getPublicText(card.buttonLink),
    }))
    .filter(
      (card) =>
        card.heading || card.subheading || (card.buttonText && card.buttonLink),
    )

  if (!hasPublicText(heading) && cards.length === 0) {
    return null
  }

  return (
    <section id="business" className="scroll-mt-20 bg-brand-surface md:py-24 py-10">

      
      <div className="site-container">
              <div className="mx-auto mb-6 text-center text-sm font-semibold uppercase tracking-wide text-primary">
        Enterprise Solutions

      </div>
        {heading ? (
          <h2 className="mb-10 text-3xl font-semibold text-white md:text-4xl text-center">
            {heading}
          </h2>
        ) : null}

        <div className="grid gap-8 md:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = solutions[index % solutions.length]?.icon

            return (
              <Card
                key={`${card.heading}-${index}`}
                className="group p-10 transition-all hover:border-primary"
              >
                {Icon ? (
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                ) : null}

                {card.heading ? (
                  <h3 className="mb-4 text-2xl font-semibold text-white">
                    {card.heading}
                  </h3>
                ) : null}

                {card.subheading ? (
                  <p className="mb-6 leading-relaxed text-brand-muted">
                    {card.subheading}
                  </p>
                ) : null}

                {card.buttonText && card.buttonLink ? (
                  <Link
                    href={card.buttonLink}
                    className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                  >
                    {card.buttonText}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                ) : null}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
