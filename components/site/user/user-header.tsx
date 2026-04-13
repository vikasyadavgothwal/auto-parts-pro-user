import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Browse Parts", href: "/#browse-parts" },
  { label: "Suppliers", href: "/suppliers" },
  { label: "Request Quote", href: "/#request-quote" },
  { label: "Services", href: "/#services" },
  { label: "For Business", href: "/business" },
];

export function UserHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-bold text-white">
              AutoParts<span className="text-[#DC2626]">Pro</span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[#9CA3AF] transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">


            <Button
              type="button"
              className="h-auto rounded-lg bg-[#DC2626] p-2.5 text-white hover:bg-[#B91C1C]"
              aria-label="Profile"
            >
              <User className="size-5" />
            </Button>

            <Button
              type="button"
              className="h-auto rounded-lg bg-[#DC2626] p-2.5 text-white hover:bg-[#B91C1C]"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
