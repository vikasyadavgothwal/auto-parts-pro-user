import { SectionHeading } from "@/components/site/shared/section-heading"
import { steps } from "@/lib/Data/UserData"


export function ProcessSection() {
  return (
    <section className="bg-brand-panel md:py-24 py-10">
      <div className="site-container">
        <SectionHeading
          eyebrow="Simple Process"
          title="How It Works"
          className="mb-16"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {step.number}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-brand-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
