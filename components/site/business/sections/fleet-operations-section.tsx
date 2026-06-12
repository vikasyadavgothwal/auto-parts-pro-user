import Link from "next/link";
import { CheckIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { metrics } from "@/lib/data/business";
import { cn } from "@/lib/utils";
import {
  getPublicText,
  hasPublicText,
  type ForBusinessFleetManagerConfig,
} from "@/lib/public-content";

type FleetOperationsSectionProps = {
  config?: ForBusinessFleetManagerConfig;
};

export function FleetOperationsSection({ config }: FleetOperationsSectionProps) {
  const topHeading = getPublicText(config?.topHeading);
  const heading = getPublicText(config?.heading);
  const subheading = getPublicText(config?.subheading);
  const keyPoints = (config?.keyPoints ?? []).map(getPublicText).filter(Boolean);
  const buttonText = getPublicText(config?.buttonText);
  const buttonLink = getPublicText(config?.buttonLink);
  const hasButton = Boolean(buttonText && buttonLink);
  const cards = (config?.cards ?? [])
    .map((card, index) => ({
      topHeading: getPublicText(card.topHeading),
      heading: getPublicText(card.heading),
      growthText: getPublicText(card.growthText),
      svg: metrics[index % metrics.length].svg,
    }))
    .filter((card) => hasPublicText(card.topHeading, card.heading, card.growthText));
  const hasTextColumn =
    hasPublicText(topHeading, heading, subheading) ||
    keyPoints.length > 0 ||
    hasButton;

  if (!hasTextColumn && cards.length === 0) {
    return null;
  }

  return (
    <section className="bg-brand-panel py-16 md:py-24">
      <div className="site-container">
        <div
          className={cn(
            "grid items-center gap-12 md:gap-16",
            hasTextColumn && cards.length > 0
              ? "md:grid-cols-2"
              : "md:grid-cols-1",
          )}
        >
          {hasTextColumn ? (
            <div>
              {topHeading ? (
                <span className="mb-2 block text-sm font-normal uppercase text-primary">
                  {topHeading}
                </span>
              ) : null}

              {heading ? (
                <h2 className="mb-6 text-3xl md:text-[40px] font-bold text-white leading-tight">
                  {heading}
                </h2>
              ) : null}

              {subheading ? (
                <p className="mb-8 text-[16px] leading-relaxed text-brand-muted">
                  {subheading}
                </p>
              ) : null}

              {keyPoints.length > 0 ? (
                <ul className="mb-8 space-y-4">
                  {keyPoints.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-[18px] text-brand-muted">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {hasButton ? (
                <Button
                  asChild
                  className="w-full md:w-auto h-auto rounded-full px-8 py-4 text-lg font-medium hover:bg-brand-primary-hover"
                >
                  <Link href={buttonLink}>{buttonText}</Link>
                </Button>
              ) : null}
            </div>
          ) : null}

          {cards.length > 0 ? (
            <div
              className={cn(
                "relative",
                !hasTextColumn && "mx-auto w-full max-w-xl",
              )}
            >
              <div className="relative md:aspect-square overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:p-12">
                <div className="absolute inset-0 opacity-5 bg-grid-pattern" />

                <div className="relative z-10 space-y-4 md:space-y-6">
                  {cards.map((card, index) => {
                    return (
                      <Card
                        key={`${card.heading}-${index}`}
                        className="bg-brand-surface p-5"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          {card.topHeading ? (
                            <span className="text-sm text-brand-muted">
                              {card.topHeading}
                            </span>
                          ) : null}

                          <div
                            className="h-8 w-8 text-[#DC2626] md:h-10 md:w-10"
                            dangerouslySetInnerHTML={{ __html: card.svg }}
                          />
                        </div>

                        {card.heading ? (
                          <p className="text-2xl md:text-3xl font-bold text-white">
                            {card.heading}
                          </p>
                        ) : null}

                        {card.growthText ? (
                          <p className="mt-1 text-sm text-primary">
                            {card.growthText}
                          </p>
                        ) : null}
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
