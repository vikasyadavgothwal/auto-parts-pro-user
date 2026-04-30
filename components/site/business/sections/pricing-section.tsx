import { CheckIcon } from "@/components/icons/site-icons";
import { BusinessDemoDialogButton } from "@/components/site/business/business-demo-dialog";
import { SectionHeading } from "@/components/site/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { plans } from "@/lib/data/business";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-brand-surface py-10 md:py-24">
      <div className="site-container">
        
        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="uppercase text-primary">
            For Repair Shops
          </span>

          <SectionHeading title="Plans That Scale With You" />
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex h-full flex-col p-8 ${
                plan.popular
                  ? "border-primary shadow-2xl shadow-primary/20"
                  : "border-2 border-border"
              }`}
            >
              
              {/* Popular badge */}
              {plan.popular && (
                <Badge className="absolute left-1/2 -top-4 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                  Most Popular
                </Badge>
              )}

              {/* Plan name */}
              <h3 className="mb-2 text-2xl font-bold text-white">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="mb-6 text-brand-muted">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">
                  {plan.price}
                </span>

                {plan.suffix && (
                  <span className="text-brand-muted">
                    {plan.suffix}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3"
                  >
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                    <span className="text-brand-muted">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button always at bottom */}
              <div className="mt-auto">
                {plan.buttonText === "Start Free Trial" ||
                plan.buttonText === "Contact Sales" ? (
                  <BusinessDemoDialogButton
                    source={`Pricing ${plan.buttonText}`}
                    className={`h-12 w-full rounded-xl font-medium ${
                      plan.popular
                        ? "hover:bg-brand-primary-hover"
                        : "border border-border bg-brand-surface text-primary hover:bg-border"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </BusinessDemoDialogButton>
                ) : (
                  <Button
                    className={`h-12 w-full rounded-xl font-medium ${
                      plan.popular
                        ? "hover:bg-brand-primary-hover"
                        : "border border-border bg-brand-surface text-primary hover:bg-border"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                )}
              </div>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}