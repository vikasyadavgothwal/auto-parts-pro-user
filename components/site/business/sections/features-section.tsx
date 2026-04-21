import { SectionHeading } from "@/components/site/shared/section-heading"
import { Card } from "@/components/ui/card"
import { features } from "@/lib/data/Business"
export function BusinessFeaturesSection() {
  return (
    <section className="bg-brand-panel md:py-24 py-10">
      <div className="site-container">
        <SectionHeading
          title="Everything Your Business Needs"
          description="Professional tools and support to power your operations"
          className="mb-16"
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="bg-brand-surface p-8 transition-all hover:border-primary"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="mb-2 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-brand-muted">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
};