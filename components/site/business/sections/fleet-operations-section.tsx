import { AnalyticsIcon, BoxesIcon, CheckIcon, SellerPackageIcon } from "@/components/icons/site-icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const features = [
  "Bulk ordering with custom pricing",
  "Fleet-specific inventory management",
  "Predictive maintenance alerts",
  "Multi-vehicle tracking",
  "Custom reporting & analytics",
  "Integration with fleet management software",
  "Dedicated fleet specialist",
  "Emergency part sourcing",
]

const metrics = [
  {
    label: "Monthly Savings",
    value: "$12,450",
    caption: "↑ 23% vs last month",
    icon: AnalyticsIcon,
  },
  {
    label: "Active Vehicles",
    value: "247",
    icon: BoxesIcon,
  },
  {
    label: "Parts in Stock",
    value: "1,234",
    icon: SellerPackageIcon,
  },
]

export function FleetOperationsSection() {
  return (
    <section className="bg-brand-panel py-24">
      <div className="site-container">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <Badge className="mb-6 rounded-full px-4 py-2 text-sm font-medium">
              <SellerPackageIcon className="h-4 w-4" />
              <span>For Fleet Managers</span>
            </Badge>

            <h2 className="mb-6 text-5xl font-bold text-white">
              Purpose-Built for Fleet Operations
            </h2>

            <p className="mb-8 text-xl leading-relaxed text-brand-muted">
              Manage parts procurement across your entire fleet with intelligent
              tools designed for scale.
            </p>

            <ul className="mb-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg text-brand-muted">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="h-auto rounded-lg px-8 py-4 text-lg font-medium hover:bg-brand-primary-hover">
              Request Fleet Demo
            </Button>
          </div>

          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-12">
              <div className="absolute inset-0 opacity-5 bg-grid-pattern" />

              <div className="relative z-10 space-y-6">
                {metrics.map((metric) => {
                  const Icon = metric.icon

                  return (
                    <Card key={metric.label} className="bg-brand-surface p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm text-brand-muted">
                          {metric.label}
                        </span>
                        <Icon className="h-5 w-5 text-primary" />
                      </div>

                      <p className="text-3xl font-bold text-white">
                        {metric.value}
                      </p>

                      {metric.caption ? (
                        <p className="mt-1 text-sm text-primary">
                          {metric.caption}
                        </p>
                      ) : null}
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
