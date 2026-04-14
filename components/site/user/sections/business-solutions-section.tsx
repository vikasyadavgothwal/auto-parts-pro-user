import Link from "next/link"
import { ArrowRight, Package, Wrench } from "lucide-react"

import { SectionHeading } from "@/components/site/shared/section-heading"
import { Card } from "@/components/ui/card"
import type { Solution } from "@/types/site/user"

const solutions: Solution[] = [
  {
    title: "For Repair Shops",
    description:
      "Volume pricing, dedicated account manager, priority support, and integrated shop management tools.",
    icon: Wrench,
  },
  {
    title: "For Fleet Managers",
    description:
      "Bulk ordering, custom integrations, procurement dashboards, and fleet-specific inventory management.",
    icon: Package,
  },
]

export function BusinessSolutionsSection() {
  return (
    <section id="business" className="scroll-mt-20 bg-brand-surface py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow="Enterprise Solutions"
          title="Built for Business"
          description="Specialized solutions for garages, fleets, and repair shops"
          className="mb-16"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {solutions.map((solution) => {
            const Icon = solution.icon

            return (
              <Card
                key={solution.title}
                className="group p-10 transition-all hover:border-primary"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>

                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {solution.title}
                </h3>

                <p className="mb-6 leading-relaxed text-brand-muted">
                  {solution.description}
                </p>

                <Link
                  href="/business"
                  className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
