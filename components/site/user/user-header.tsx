import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { BrandLogo } from "@/components/site/shared/brand-logo"
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Browse Parts", href: "/search" },
  { label: "Suppliers", href: "/suppliers" },
  { label: "Request Quote", href: "/rfq"},
  { label: "Services", href: "/services" },
  { label: "For Business", href: "/business" },
];

export function UserHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-brand-surface">
      <div className="site-container-wide">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-12">
            <BrandLogo href="/" />

            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-brand-muted transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              className="h-auto rounded-lg p-2.5 text-white hover:bg-brand-primary-hover"
              aria-label="Profile"
            >
              <User className="size-5" />
            </Button>

            <Button
              type="button"
              className="h-auto rounded-lg p-2.5 text-white hover:bg-brand-primary-hover"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
