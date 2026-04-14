import Link from "next/link";
import { BrandLogo } from "@/components/site/shared/brand-logo"
import { Button } from "@/components/ui/button"

export const BusinessHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-brand-surface/80 backdrop-blur-md">
      <div className="site-container-wide">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-12">
            <BrandLogo href="/" />

            <nav className="hidden items-center gap-8 md:flex">
              <Link
                href="/search"
                className="text-brand-muted transition-colors hover:text-white"
              >
                Browse Parts
              </Link>

              <Link
                href="/rfq"
                className="text-brand-muted transition-colors hover:text-white"
              >
                Request Quote
              </Link>

              <Link
                href="/business"
                className="font-medium text-[#DC2626]"
              >
                For Business
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="px-5 py-2.5 text-brand-muted hover:text-white">
              Sign In
            </Button>

            <Button className="rounded-lg px-6 py-2.5 text-white hover:bg-brand-primary-hover">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
};
