import Link from "next/link";
import { SparklesIcon } from "@/components/icons/site-icons";
import { BusinessDemoDialogButton } from "@/components/site/business/business-demo-dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function BusinessHeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <div className="site-container relative md:py-24 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 rounded-full px-4 py-2 text-sm font-medium">
            <SparklesIcon className="h-4 w-4" />
            <span>Trusted by 5,000+ businesses</span>
          </Badge>
          <h1 className="md:mb-6 mb-2 md:text-6xl text-2xl font-bold leading-tight text-white">
            Enterprise Solutions for
            <br />
            <span className="text-primary">Repair Shops &amp; Fleets</span>
          </h1>
          <p className="mb-12 text-xl leading-relaxed text-brand-muted">
            Streamline procurement, reduce costs, and keep your operations
            running smoothly with our B2B platform built for automotive
            professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BusinessDemoDialogButton
              source="Hero Schedule a Demo"
              className="h-auto rounded-full px-8 py-4 text-lg font-medium hover:bg-brand-primary-hover"
            >
              Schedule a Demo
            </BusinessDemoDialogButton>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-full border-border bg-brand-panel px-8 py-4 text-lg font-medium text-white hover:border-primary hover:bg-transparent"
            >
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
