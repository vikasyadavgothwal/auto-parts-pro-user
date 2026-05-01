import Link from "next/link";
import { SectionHeading } from "@/components/site/shared/section-heading";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/data/user";
export function CategoryTypesSection() {
  return (
    <section className="bg-brand-surface md:py-24 py-10">
      <div className="site-container">
        <SectionHeading
          eyebrow="Explore By Type"
          title="Browse by Category"
          description="Explore our extensive catalog of auto parts"
          className="mb-16"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link key={category.name} href="/search" className="group">
                <Card className="h-full p-6 transition-all hover:border-primary hover:bg-brand-surface-strong">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-colors group-hover:bg-primary/20">
                    {Icon ? (
                      <Icon className="h-6 w-6 text-primary" />
                    ) : category.svg ? (
                      <div
                        className="h-6 w-6 text-primary"
                        dangerouslySetInnerHTML={{ __html: category.svg }}
                      />
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
      </div>
    </section>
  );
}
