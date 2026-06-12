import { SectionHeading } from "@/components/site/shared/section-heading"
import { Card } from "@/components/ui/card"
import { features } from "@/lib/data/business"
import {
  getPublicText,
  hasPublicText,
  type ForBusinessBusinessSolutionsConfig,
} from "@/lib/public-content"

type BusinessFeaturesSectionProps = {
  config?: ForBusinessBusinessSolutionsConfig;
};

export function BusinessFeaturesSection({ config }: BusinessFeaturesSectionProps) {
  const heading = getPublicText(config?.heading)
  const subheading = getPublicText(config?.subheading)
  const cards = (config?.cards ?? [])
    .map((card, index) => ({
      heading: getPublicText(card.heading),
      subheading: getPublicText(card.subheading),
      icon: features[index % features.length].icon,
    }))
    .filter((card) => hasPublicText(card.heading, card.subheading))

  if (!hasPublicText(heading, subheading) && cards.length === 0) {
    return null
  }

  return (
    <section className="bg-brand-panel md:py-24 py-10">
      <div className="site-container">
        {heading ? (
          <SectionHeading
            title={heading}
            description={subheading || undefined}
            className="mb-16"
          />
        ) : subheading ? (
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-brand-muted">
            {subheading}
          </p>
        ) : null}

        {cards.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = card.icon

              return (
                <Card
                  key={`${card.heading}-${index}`}
                  className="bg-brand-surface p-8 transition-all hover:border-primary"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  {card.heading ? (
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {card.heading}
                    </h3>
                  ) : null}

                  {card.subheading ? (
                    <p className="text-brand-muted">{card.subheading}</p>
                  ) : null}
                </Card>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
};
