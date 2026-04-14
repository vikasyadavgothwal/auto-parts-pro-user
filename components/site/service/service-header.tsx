import Link from "next/link"

import { BrandLogo } from "@/components/site/shared/brand-logo"
import { Button } from "@/components/ui/button"

export function ServiceHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-brand-surface">
      <div className="site-container-wide px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-6 lg:gap-12">
            <BrandLogo href="/" />

            <nav className="hidden items-center gap-6 md:flex lg:gap-8">
              <Link href="/search" className="text-brand-muted hover:text-white">
                Browse Parts
              </Link>

              <Link href="/services" className="text-white transition-colors">
                Services
              </Link>

              <Link href="/rfq" className="text-brand-muted hover:text-white">
                Request Quote
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="px-5 py-2.5 text-brand-muted hover:text-white"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
