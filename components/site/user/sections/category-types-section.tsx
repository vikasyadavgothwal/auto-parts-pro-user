import Link from "next/link";
import { SectionHeading } from "@/components/site/shared/section-heading";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/data/user";
import { getPublicText, type HomeCategoryConfig } from "@/lib/public-content";

export function CategoryTypesSection({ config }: { config?: HomeCategoryConfig }) {
  const heading = getPublicText(config?.heading);
  const subheading = getPublicText(config?.subheading);
  const bottomHeading = getPublicText(config?.bottomHeading);

  return (
    <section className="bg-brand-surface md:py-24 py-10">
      <div className="site-container">
        {heading || subheading ? (
          <SectionHeading
            eyebrow="Explore By Type"
            title={heading}
            description={subheading}
            className="mb-16"
          />
        ) : null}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link key={category.name} href="/search" className="group">
                <Card className="h-full p-6 transition-all hover:border-primary hover:bg-brand-surface-strong">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-colors group-hover:bg-primary/20">
                    {Icon ? (
                      <Icon className="h-6 w-6 text-primary" />
                    ) : null}
                  </div>

                  <h3 className="mb-1 text-center text-sm font-semibold text-white">
                    {category.name}
                  </h3>

                  <p className="text-center text-xs text-brand-muted">
                    {category.count}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>

        {bottomHeading ? (
          <p className="mx-auto mt-10 max-w-3xl text-center text-lg font-medium text-white">
            {bottomHeading}
          </p>
        ) : null}
      </div>
    </section>
  );
}
