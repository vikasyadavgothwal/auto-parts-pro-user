import Link from "next/link"
import {
  BatteryIcon,
  CarFrontIcon,
  CogIcon,
  GaugeIcon,
  PackageIcon,
  WrenchIcon,
} from "@/components/icons/site-icons"

import { SectionHeading } from "@/components/site/shared/section-heading"
import { Card } from "@/components/ui/card"
import type { Category } from "@/types/site/user"

const categories: Category[] = [
  { name: "Engine Parts", count: "12,450 parts", icon: CogIcon },
  { name: "Suspension", count: "8,320 parts", icon: WrenchIcon },
  { name: "Electrical", count: "15,680 parts", icon: BatteryIcon },
  { name: "Brakes", count: "9,870 parts", icon: PackageIcon },
  { name: "Transmission", count: "6,540 parts", icon: GaugeIcon },
  { name: "Body Parts", count: "22,100 parts", icon: CarFrontIcon },
]

export function CategoryTypesSection() {
  return (
    <section className="bg-brand-surface py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow="Explore By Type"
          title="Browse by Category"
          description="Explore our extensive catalog of auto parts"
          className="mb-16"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon

            return (
              <Link key={category.name} href="/search" className="group">
                <Card className="h-full p-6 transition-all hover:border-primary hover:bg-brand-surface-strong">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="mb-1 text-center text-sm font-semibold text-white">
                    {category.name}
                  </h3>

                  <p className="text-center text-xs text-brand-muted">
                    {category.count}
                  </p>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
