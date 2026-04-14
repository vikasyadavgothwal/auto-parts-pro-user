import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  CreditCard,
  Headphones,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { SectionHeading } from "@/components/site/shared/section-heading"
import { Card } from "@/components/ui/card"

type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

const features: Feature[] = [
  {
    title: "Volume Pricing",
    description: "Scale discounts that grow with your business",
    icon: TrendingUp,
  },
  {
    title: "Dedicated Account Manager",
    description: "Personal support for your team",
    icon: Users,
  },
  {
    title: "Priority Processing",
    description: "Fast-track order fulfillment",
    icon: Timer,
  },
  {
    title: "Extended Warranty",
    description: "Business-grade protection plans",
    icon: ShieldCheck,
  },
  {
    title: "API Integration",
    description: "Connect directly to your systems",
    icon: Zap,
  },
  {
    title: "Analytics Dashboard",
    description: "Track spending and optimize costs",
    icon: BarChart3,
  },
  {
    title: "24/7 Business Support",
    description: "Always available when you need us",
    icon: Headphones,
  },
  {
    title: "Custom Invoicing",
    description: "Flexible billing and NET terms",
    icon: Sparkles,
  },
  {
    title: "Fleet Cards Accepted",
    description: "WEX, Voyager, and more",
    icon: CreditCard,
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
