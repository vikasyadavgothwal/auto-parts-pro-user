import { Card, CardContent } from "@/components/ui/card";

type ProductSpecification = {
  label: string;
  value: string;
};

type ProductDetailsSectionProps = {
  description: string;
  specifications: readonly ProductSpecification[];
};

export function ProductDetailsSection({
  description,
  specifications,
}: ProductDetailsSectionProps) {
  return (
    <section className="mt-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] shadow-none">
          <CardContent className="p-8">
            <h3 className="mb-4 text-2xl font-semibold text-white">
              Description
            </h3>
            <p className="leading-relaxed text-[#9CA3AF]">{description}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] shadow-none">
          <CardContent className="p-8">
            <h3 className="mb-4 text-2xl font-semibold text-white">
              Specifications
            </h3>

            <dl className="space-y-3">
              {specifications.map((specification) => (
                <div
                  key={specification.label}
                  className="flex justify-between border-b border-[#2A2A2A] py-2"
                >
                  <dt className="text-[#9CA3AF]">{specification.label}</dt>
                  <dd className="font-medium text-white">
                    {specification.value}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
