import Link from "next/link";
import {
  CheckCircleIcon,
  MessageIcon,
  WrenchIcon,
} from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type InstallationBenefit = {
  title: string;
  description: string;
};

type ProductSupportSectionsProps = {
  installationBenefits: readonly InstallationBenefit[];
};

export function ProductSupportSections({
  installationBenefits,
}: ProductSupportSectionsProps) {
  return (
    <>
      <section>
        <Card className="mt-8 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <MessageIcon className="mt-1 h-6 w-6 shrink-0 text-[#DC2626]" />

              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Need a better price or bulk order?
                </h3>

                <p className="mb-4 text-[#9CA3AF]">
                  Request a custom quote from multiple suppliers. They&apos;ll
                  compete for your business.
                </p>
              </div>
              <Button
                asChild
                className="bg-primary rounded-full p-6 font-medium text-white hover:bg-[#B91C1C]"
              >
                <Link href="/rfq">Request Quote</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="mt-8 rounded-xl border border-[#2A2A2A] bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] shadow-none">
          <CardContent className="p-8">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#DC2626]/20 bg-[#DC2626]/10">
                <WrenchIcon className="h-6 w-6 text-[#DC2626]" />
              </div>

              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">
                  Need Installation?
                </h3>

                <p className="text-[#9CA3AF]">
                  Bundle this part with professional installation from certified
                  garages near you
                </p>
              </div>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              {installationBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] p-5"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-[#10B981]" />
                    <span className="font-semibold text-white">
                      {benefit.title}
                    </span>
                  </div>

                  <p className="text-sm text-[#9CA3AF]">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="bg-[#DC2626] p-6 font-medium text-white hover:bg-[#B91C1C]"
            >
              <Link href="/services" className="flex items-center gap-2">
                <WrenchIcon className="h-5 w-5" />
                Find Installation Services
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
