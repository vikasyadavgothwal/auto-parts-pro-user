import { BusinessDemoDialogButton } from "@/components/site/business/business-demo-dialog";
export function BusinessCTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-brand-primary-hover py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="site-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 md:text-5xl text-3xl  font-bold text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="mb-12 text-xl text-white/80">
            Join thousands of repair shops and fleet managers who trust
            AutoPartsPro
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BusinessDemoDialogButton
              source="CTA Schedule a Demo"
              className="h-auto rounded-sm bg-white px-8 py-4 text-lg font-medium text-primary hover:bg-gray-100"
            >
              Schedule a Demo
            </BusinessDemoDialogButton>
            <BusinessDemoDialogButton
              source="CTA Contact Sales"
              variant="outline"
              className="h-auto rounded-sm border-2 border-white bg-transparent px-8 py-4 text-lg font-medium text-white hover:bg-white/10 hover:text-white"
            >
              Contact Sales
            </BusinessDemoDialogButton>
          </div>
        </div>
      </div>
    </section>
  );
}
