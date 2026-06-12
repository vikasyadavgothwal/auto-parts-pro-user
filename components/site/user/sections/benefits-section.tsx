import { benefits } from "@/lib/data/user"
import {
  getPublicText,
  type HomeWhyChooseUsConfig,
} from "@/lib/public-content"

export function BenefitsSection({ config }: { config?: HomeWhyChooseUsConfig }) {
  const heading = getPublicText(config?.heading)
  const subheading = getPublicText(config?.subheading)
  const pairs = (config?.pairs ?? [])
    .map((pair) => ({
      heading: getPublicText(pair.heading),
      subheading: getPublicText(pair.subheading),
    }))
    .filter((pair) => pair.heading || pair.subheading)

  if (!heading && !subheading && pairs.length === 0) {
    return null
  }

  return (
    <section className=" py-16">
      <div className="site-container">
        {heading || subheading ? (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {heading ? (
              <h2 className="text-4xl font-bold text-white">{heading}</h2>
            ) : null}
            {subheading ? (
              <p className="mt-4 text-lg text-brand-muted">{subheading}</p>
            ) : null}
          </div>
        ) : null}
        <div className="grid gap-8 md:grid-cols-3">
          {pairs.map((pair, index) => {
            const benefit = benefits[index % benefits.length]

            return (
              <div key={`${pair.heading}-${index}`} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                  {benefit?.svg ? (
                    <div dangerouslySetInnerHTML={{ __html: benefit.svg }} />
                  ) : null}
                </div>

                {pair.heading ? (
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {pair.heading}
                  </h3>
                ) : null}

                {pair.subheading ? (
                  <p className="text-brand-muted">{pair.subheading}</p>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
