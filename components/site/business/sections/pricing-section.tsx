import { CheckIcon } from "@/components/icons/site-icons";
import { BusinessDemoDialogButton } from "@/components/site/business/business-demo-dialog";
import { SectionHeading } from "@/components/site/shared/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBusinessQueryType } from "@/lib/business-query-cta";
import {
  getPublicText,
  hasPublicText,
  type ForBusinessPricingConfig,
} from "@/lib/public-content";

type PricingSectionProps = {
  config?: ForBusinessPricingConfig;
};

export function PricingSection({ config }: PricingSectionProps) {
  const heading = getPublicText(config?.heading);
  const subheading = getPublicText(config?.subheading);
  const plans = (config?.plans ?? [])
    .map((plan) => {
      const keyPoints = (plan.keyPoints ?? []).map(getPublicText).filter(Boolean);
      return {
        heading: getPublicText(plan.heading),
        subheading: getPublicText(plan.subheading),
        price: getPublicText(plan.price),
        duration: getPublicText(plan.duration),
        buttonText: getPublicText(plan.buttonText),
        mostPopular: Boolean(plan.mostPopular),
        keyPoints,
      };
    })
    .filter((plan) =>
      hasPublicText(plan.heading, plan.subheading, plan.price, plan.duration) ||
      plan.keyPoints.length > 0 ||
      Boolean(plan.buttonText),
    );

  if (!hasPublicText(heading, subheading) && plans.length === 0) {
    return null;
  }
  return (
    <section id="pricing" className="bg-brand-surface py-10 md:py-24">
      <div className="mx-auto mb-6 text-center text-sm font-semibold uppercase tracking-wide text-red-400">
        For Repair Shops
      </div>
      <div className="site-container">
        {heading ? (
          <SectionHeading
            title={heading}
            description={subheading || undefined}
            className="mb-16"
          />
        ) : subheading ? (
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-brand-muted">
            {subheading}
          </p>
        ) : null}

        {plans.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={`${plan.heading}-${index}`}
                className={`relative flex h-full flex-col border-2 p-8 ${
                  plan.mostPopular
                    ? "border-primary/70 shadow-lg shadow-primary/10"
                    : "border-border"
                }`}
              >
                {plan.mostPopular ? (
                  <p className="mb-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-black w-fit">
                    Most Popular
                  </p>
                ) : null}

                {plan.heading ? (
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {plan.heading}
                  </h3>
                ) : null}

                {plan.subheading ? (
                  <p className="mb-6 text-brand-muted">
                    {plan.subheading}
                  </p>
                ) : null}

                {plan.price || plan.duration ? (
                  <div className="mb-6">
                    {plan.price ? (
                      <span className="text-5xl font-bold text-white">
                        {plan.price}
                      </span>
                    ) : null}

                    {plan.duration ? (
                      <span className="text-brand-muted">
                        {plan.duration}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                {plan.keyPoints.length > 0 ? (
                  <ul className="mb-2 space-y-4">
                    {plan.keyPoints.map((feature, featureIndex) => (
                      <li
                        key={`${feature}-${featureIndex}`}
                        className="flex items-start gap-3"
                      >
                        <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-brand-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {plan.buttonText ? (
                  <div className="mt-auto pt-2">
                    {getBusinessQueryType(plan.buttonText) ? (
                      <BusinessDemoDialogButton
                        queryType={getBusinessQueryType(plan.buttonText) ?? "General"}
                        source={plan.buttonText}
                        className={`w-full h-auto rounded-full py-4 ${
                          plan.mostPopular
                            ? "bg-primary text-white hover:bg-primary-hover hover:text-white"
                            : "bg-black text-primary hover:bg-black/90"
                        }`}
                      >
                        {plan.buttonText}
                      </BusinessDemoDialogButton>
                    ) : (
                      <Button
                        type="button"
                        className={`w-full h-auto rounded-full py-4 ${
                          plan.mostPopular
                            ? "bg-primary text-white hover:bg-primary-hover hover:text-white"
                            : "bg-black text-primary hover:bg-black/90"
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    )}
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
