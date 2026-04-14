import Link from "next/link"
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@/components/icons/site-icons"

import { BrandLogo } from "@/components/site/shared/brand-logo"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Parts", href: "/search" },
  { label: "RFQ", href: "/rfq" },
  { label: "Garages", href: "/services" },
  { label: "Suppliers", href: "/suppliers" },
  { label: "For Business", href: "/business" },
]

export function SupplierHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-brand-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <BrandLogo href="/" showMark textClassName="text-xl" />

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium text-brand-muted transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-brand-muted hover:text-white"
              aria-label="Search"
            >
              <SearchIcon className="size-5" />
            </Button>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-brand-muted hover:text-white"
            >
              <Link href="/checkout" aria-label="Cart">
                <ShoppingCartIcon className="size-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-brand-muted hover:text-white"
            >
              <Link href="/dashboard/buyer" aria-label="Profile">
                <UserIcon className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
