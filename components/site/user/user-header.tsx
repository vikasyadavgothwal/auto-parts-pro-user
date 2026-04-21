"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCartIcon, UserIcon } from "@/components/icons/site-icons";
import {AuthModalCard} from "@/components/site/AuthModel";
import { BrandLogo } from "@/components/site/shared/brand-logo"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navItems = [
  { label: "Browse Parts", href: "/search" },
  { label: "Suppliers", href: "/suppliers" },
  { label: "Request Quote", href: "/rfq"},
  { label: "Services", href: "/services" },
  { label: "For Business", href: "/business" },
];

export function UserHeader() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
            <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="h-auto rounded-sm p-2.5 text-white hover:bg-brand-primary-hover"
                  aria-label="Profile"
                >
                  <UserIcon className="size-5" />
                </Button>
              </DialogTrigger>

              <DialogContent
                showCloseButton={false}
                className="max-w-[calc(100%-2rem)] border-0 bg-transparent p-0 text-inherit shadow-none ring-0 sm:max-w-md"
              >
                <DialogHeader className="sr-only">
                  <DialogTitle>Account Authentication</DialogTitle>
                  <DialogDescription>
                    Sign in to your account or create a new one.
                  </DialogDescription>
                </DialogHeader>

                <AuthModalCard onClose={() => setIsAuthModalOpen(false)} />
              </DialogContent>
            </Dialog>

            <Button
              type="button"
              className="h-auto rounded-sm p-2.5 text-white hover:bg-brand-primary-hover"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
