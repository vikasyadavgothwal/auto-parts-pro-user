import Image from "next/image"
import {
  Clock3Icon,
  ShieldCheckIcon,
  ZapIcon,
} from "@/components/icons/site-icons"

import { Badge } from "@/components/ui/badge"

const features = [
  { title: "Verified OEM Parts", icon: ShieldCheckIcon },
  { title: "Same-Day Shipping", icon: ZapIcon },
  { title: "24/7 Support", icon: Clock3Icon },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1759189189642-192febc42404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjBhdXRvbW90aXZlJTIwd29ya3Nob3B8ZW58MXx8fHwxNzc0OTU1ODgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Banner background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/24" />
      </div>

      <div className="site-container relative py-24">
        <div className="mb-16 max-w-3xl text-left">
          <Badge
            variant="outline"
            className="mb-6 rounded-full border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
          >
            PREMIUM AUTO PARTS MARKETPLACE
          </Badge>

          <h1 className="mb-6 text-[48px] font-bold leading-tight text-white">
            Find the Right Part,
            <br />
            <span className="text-white">Instantly</span>
          </h1>

          <p className="text-[20px] leading-relaxed text-brand-muted">
            Access thousands of verified OEM and aftermarket parts from trusted
            suppliers.
            <br />
            Search by VIN for guaranteed fitment.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-start gap-6 md:gap-12">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm text-brand-muted">{feature.title}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
