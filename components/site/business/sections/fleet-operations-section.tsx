import { CheckIcon } from "@/components/icons/site-icons";
import { BusinessDemoDialogButton } from "@/components/site/business/business-demo-dialog";
import { Card } from "@/components/ui/card";
import { metrics, fleetFeatures } from "@/lib/data/business";

export function FleetOperationsSection() {
  return (
    <section className="bg-brand-panel py-16 md:py-24">
      <div className="site-container">
        <div className="grid items-center gap-12 md:gap-16 md:grid-cols-2">
          <div>
            <span className="mb-2 block text-sm font-normal uppercase text-primary">
              For Fleet Managers
            </span>
            <h2 className="mb-6 text-3xl md:text-[40px] font-bold text-white leading-tight">
              Purpose-Built for Fleet Operations
            </h2>

            <p className="mb-8 text-[16px] leading-relaxed text-brand-muted">
              Manage parts procurement across your entire fleet with intelligent
              tools designed for scale.
            </p>

            <ul className="mb-8 space-y-4">
              {fleetFeatures.map((feature: string) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-[18px] text-brand-muted">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <BusinessDemoDialogButton
              source="Fleet Demo"
              className="w-full md:w-auto h-auto rounded-full px-8 py-4 text-lg font-medium hover:bg-brand-primary-hover"
            >
              Request Fleet Demo
            </BusinessDemoDialogButton>
          </div>

          <div className="relative">
            {/* Added md:aspect-square and reduced padding for mobile */}
            <div className="relative md:aspect-square overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:p-12">
              <div className="absolute inset-0 opacity-5 bg-grid-pattern" />

              <div className="relative z-10 space-y-4 md:space-y-6">
                {metrics.map((metric) => {
                  return (
                    <Card key={metric.label} className="bg-brand-surface p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-brand-muted">
                          {metric.label}
                        </span>

                        <div
                          className="h-8 w-8 text-[#DC2626] md:h-10 md:w-10"
                          dangerouslySetInnerHTML={{ __html: metric.svg }}
                        />
                      </div>

                      <p className="text-2xl md:text-3xl font-bold text-white">
                        {metric.value}
                      </p>

                      {metric.caption ? (
                        <p className="mt-1 text-sm text-primary">
                          {metric.caption}
                        </p>
                      ) : null}
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
