import {
  AnalyticsIcon,
  CreditCardIcon,
  SupportIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TimerIcon,
  TrendingIcon,
  UsersIcon,
  ZapIcon,
} from "@/components/icons/site-icons"

import { SectionHeading } from "@/components/site/shared/section-heading"
import { Card } from "@/components/ui/card"
import type { BusinessFeature } from "@/types/site/business"

const features: BusinessFeature[] = [
  {
    title: "Volume Pricing",
    description: "Scale discounts that grow with your business",
    icon: TrendingIcon,
  },
  {
    title: "Dedicated Account Manager",
    description: "Personal support for your team",
    icon: UsersIcon,
  },
  {
    title: "Priority Processing",
    description: "Fast-track order fulfillment",
    icon: TimerIcon,
  },
  {
    title: "Extended Warranty",
    description: "Business-grade protection plans",
    icon: ShieldCheckIcon,
  },
  {
    title: "API Integration",
    description: "Connect directly to your systems",
    icon: ZapIcon,
  },
  {
    title: "Analytics Dashboard",
    description: "Track spending and optimize costs",
    icon: AnalyticsIcon,
  },
  {
    title: "24/7 Business Support",
    description: "Always available when you need us",
    icon: SupportIcon,
  },
  {
    title: "Custom Invoicing",
    description: "Flexible billing and NET terms",
    icon: SparklesIcon,
  },
  {
    title: "Fleet Cards Accepted",
    description: "WEX, Voyager, and more",
    icon: CreditCardIcon,
  },
]

export function BusinessFeaturesSection() {
  return (
    <section className="bg-brand-panel py-24">
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
}
