import { benefits } from "@/lib/data/user"
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
