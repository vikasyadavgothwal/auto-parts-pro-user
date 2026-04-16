import { CheckIcon, WrenchIcon } from "@/components/icons/site-icons"

import { SectionHeading } from "@/components/site/shared/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { BusinessPlan } from "@/types/site/business"

const plans: BusinessPlan[] = [
  {
    name: "Starter",
    description: "Perfect for independent mechanics",
    price: "Free",
    buttonText: "Get Started",
    features: [
      "5% discount on all orders",
      "Standard shipping rates",
      "Email support",
      "Basic order history",
      "Monthly statements",
    ],
  },
  {
    name: "Professional",
    description: "For established repair shops",
    price: "$49",
    suffix: "/month",
    buttonText: "Start Free Trial",
    popular: true,
    features: [
      "12% discount on all orders",
      "Free 2-day shipping",
      "Priority phone support",
      "Advanced analytics",
      "NET 30 payment terms",
      "Dedicated account manager",
      "Custom price lists",
    ],
  },
  {
    name: "Enterprise",
    description: "For multi-location operations",
    price: "Custom",
    buttonText: "Contact Sales",
    features: [
      "Custom volume pricing",
      "White-glove service",
      "24/7 priority support",
      "API access",
      "Custom NET terms",
      "Multi-location management",
      "Custom integrations",
      "Training & onboarding",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="bg-brand-surface md:py-24 py-10">
      <div className="site-container">
        <div className="mb-16 text-center">
          <Badge
            variant="secondary"
            className="mb-4 rounded-full border-border bg-brand-panel px-4 py-2 text-sm font-medium text-brand-muted"
          >
            <WrenchIcon className="h-4 w-4 text-primary" />
            <span>For Repair Shops</span>
          </Badge>

          <SectionHeading
            title="Plans That Scale With You"
            description="Choose the plan that fits your shop size and needs"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative p-8 ${
                plan.popular
                  ? "border-primary shadow-2xl shadow-primary/20"
                  : "border-2 border-border"
              }`}
            >
              {plan.popular ? (
                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                  Most Popular
                </Badge>
              ) : null}

              <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
              <p className="mb-6 text-brand-muted">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                {plan.suffix ? (
                  <span className="text-brand-muted">{plan.suffix}</span>
                ) : null}
              </div>

              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-brand-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`h-12 w-full rounded-lg font-medium ${
                  plan.popular
                    ? "hover:bg-brand-primary-hover"
                    : "border border-border bg-brand-surface text-primary hover:bg-border"
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
