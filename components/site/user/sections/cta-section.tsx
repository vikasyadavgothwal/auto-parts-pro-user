import Link from "next/link"
import { Button } from "@/components/ui/button"
export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-brand-primary-hover py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_0%,_transparent_50%)]" />
      </div>
      <div className="site-container relative z-10">
        <div className="text-center">
          <h2 className="mb-6 md:text-5xl text-3xl font-bold text-white">
            Ready to Find Your Part?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            Join thousands of professionals who trust AutoPartsPro for quality
            parts and unbeatable service.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-sm bg-white border border-white px-8 py-4 text-lg font-medium text-primary  hover:bg-white/90 hover:text-primary"
            >
              <Link href="/search">Start Shopping Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-sm border-2 border-white bg-white/10 px-8 py-4 text-lg font-medium text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/rfq">Request Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
