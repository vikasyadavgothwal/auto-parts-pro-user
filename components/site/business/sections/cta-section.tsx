import { Button } from "@/components/ui/button"

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
            <Button className="h-auto rounded-lg bg-white px-8 py-4 text-lg font-medium text-primary hover:bg-gray-100">
              Schedule a Demo
            </Button>

            <Button
              variant="outline"
              className="h-auto rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-medium text-white hover:bg-white/10 hover:text-white"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
