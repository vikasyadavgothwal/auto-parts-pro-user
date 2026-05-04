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
import {PortalDropdown} from "@/components/site/user/portal-dropdown";  

const navItems = [
  { label: "Browse Parts", href: "/search" },
  { label: "Request Quote", href: "/rfq"},
  { label: "Services", href: "/services" },
  { label: "For Business", href: "/business" },
];

export function UserHeader() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white-surface">
      <div className="site-container-wide">
        <div className="grid h-20 grid-cols-[auto_1fr_auto] items-center gap-4">
          
          {/* Left: Logo */}
          <div className="flex items-center">
            <BrandLogo href="/" textClassName="text-brand-surface" />
          </div>

          {/* Center: Nav Links */}
          <nav className="hidden justify-center md:flex">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap text-black transition-colors hover:text-brand-primary-hover"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center justify-end gap-4">
           <div className="hidden md:block">
             <PortalDropdown />
           </div>
            <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="h-auto rounded-xl p-2.5 text-white hover:bg-brand-primary-hover"
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
              className="h-auto rounded-xl p-2.5 text-white hover:bg-brand-primary-hover"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="size-5" />
            </Button>
          </div>
        </div>

      </div>
    </header>
  );
}
