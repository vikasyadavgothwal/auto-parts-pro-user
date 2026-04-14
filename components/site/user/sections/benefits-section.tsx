import type { LucideIcon } from "lucide-react"
import { BadgeDollarSign, ShieldCheck, TrendingUp } from "lucide-react"

type BenefitItem = {
  title: string
  description: string
  icon: LucideIcon
}

const benefits: BenefitItem[] = [
  {
    title: "Guaranteed Fitment",
    description: "VIN-verified compatibility on every part",
    icon: ShieldCheck,
  },
  {
    title: "Best Price Promise",
    description: "Compare offers from verified suppliers",
    icon: BadgeDollarSign,
  },
  {
    title: "Real-Time Inventory",
    description: "Live stock updates across 500+ suppliers",
    icon: TrendingUp,
  },
]

export function BenefitsSection() {
  return (
    <section className="bg-brand-panel py-16">
      <div className="site-container">
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon

            return (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>

                <h3 className="mb-2 text-xl font-semibold text-white">
                  {benefit.title}
                </h3>

                <p className="text-brand-muted">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
