import { getPublicText, type HomeProcessStep } from "@/lib/public-content"


export function ProcessSection({
  steps,
}: {
  steps?: readonly HomeProcessStep[]
}) {
  const visibleSteps = (steps ?? [])
    .map((step) => ({
      heading: getPublicText(step.heading),
      subheading: getPublicText(step.subheading),
    }))
    .filter((step) => step.heading || step.subheading)

  if (!visibleSteps.length) {
    return null
  }

  return (
    <section className=" md:py-24 py-10">
      <div className="site-container">
        <div className="grid gap-8 md:gap-60  md:grid-cols-3">
          {visibleSteps.map((step, index) => (
            <div key={`${step.heading}-${index}`} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {index + 1}
              </div>
              {step.heading ? (
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {step.heading}
                </h3>
              ) : null}
              {step.subheading ? (
                <p className="text-brand-muted">{step.subheading}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
