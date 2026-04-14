import Link from "next/link"
import { ShieldCheck, Truck } from "lucide-react"

import { BrandLogo } from "@/components/site/shared/brand-logo"

const productLinks = [
  { label: "Browse Parts", href: "/search" },
  { label: "Find Services", href: "/services" },
  { label: "Request Quote", href: "/rfq" },
  { label: "Business Solutions", href: "/business" },
]

const businessLinks = [
  { label: "Supplier Portal", href: "/supplier/dashboard" },
  { label: "Fleet Management", href: "/fleet/dashboard" },
  { label: "Garage Network", href: "/services" },
  { label: "API Access", href: "#" },
]

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Shipping Info", href: "#" },
  { label: "Returns", href: "#" },
]

const policyLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
]

export function SupplierFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-brand-surface">
      <div className="site-container-wide py-16">
        <div className="mb-12 grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <BrandLogo href="/" className="mb-4" textClassName="text-2xl" />

            <p className="mb-6 leading-relaxed text-brand-muted">
              Your premium B2B marketplace for automotive parts, services, and
              fleet management solutions.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-brand-muted">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Verified Sellers</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-brand-muted">
                <Truck className="h-4 w-4 text-primary" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          <FooterColumn title="Products" links={productLinks} />
          <FooterColumn title="For Businesses" links={businessLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>

        <div className="mb-8 grid gap-6 border-t border-border pt-8 md:grid-cols-3">
          <div>
            <div className="text-xs text-brand-muted">Call Us</div>
            <a href="tel:+1-555-123-4567" className="text-white hover:text-primary">
              +1 (555) 123-4567
            </a>
          </div>

          <div>
            <div className="text-xs text-brand-muted">Email</div>
            <a
              href="mailto:support@autopartspro.com"
              className="text-white hover:text-primary"
            >
              support@autopartspro.com
            </a>
          </div>

          <div>
            <div className="text-xs text-brand-muted">Location</div>
            <div className="text-white">San Francisco, CA</div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-brand-muted">
            © 2026 AutoPartsPro. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            {policyLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-brand-muted hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: Array<{ label: string; href: string }>
}) {
  return (
    <div>
      <h3 className="mb-4 font-semibold text-white">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-brand-muted hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
