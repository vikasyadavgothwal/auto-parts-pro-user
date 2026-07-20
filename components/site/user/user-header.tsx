"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { ShoppingCartIcon, UserIcon } from "@/components/icons/site-icons";
import { AuthModalCard } from "@/components/site/AuthModal";
import { useSiteCart } from "@/components/site/cart/cart-provider";
import { BrandLogo } from "@/components/site/shared/brand-logo";
import { Button } from "@/components/ui/button";
import {
  dashboardUrlForRole,
  getCurrentUser,
  logoutCurrentUser,
} from "@/lib/current-user";
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
  { label: "Request Quote", href: "/rfq" },
  { label: "Services", href: "/services" },
  { label: "For Business", href: "/business" },
];

export function UserHeader() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, itemCount, openCart } = useSiteCart();

  const goToActiveDashboard = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    window.location.href = dashboardUrlForRole(currentUser.activeRole);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await logoutCurrentUser();
    window.location.href = "/";
  };

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
            {!user ? (
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
                  className="max-w-[calc(100%-1rem)] border-0 bg-transparent p-0 text-inherit shadow-none ring-0 sm:max-w-lg"
                >
                  <DialogHeader className="sr-only">
                    <DialogTitle>Account Authentication</DialogTitle>
                    <DialogDescription>
                      Sign in to your account or create a new one.
                    </DialogDescription>
                  </DialogHeader>

                  <AuthModalCard
                    onAuthenticated={goToActiveDashboard}
                    onClose={() => setIsAuthModalOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={goToActiveDashboard}
                  className="hidden h-auto rounded-xl p-2.5 text-white hover:bg-brand-primary-hover sm:inline-flex"
                  aria-label="Dashboard"
                >
                  <UserIcon className="size-5" />
                </Button>
                {user.activeRole === "User" ? (
                  <Button
                    type="button"
                    onClick={openCart}
                    className="relative h-auto rounded-xl p-2.5 text-white hover:bg-brand-primary-hover"
                    aria-label="Shopping cart"
                  >
                    <ShoppingCartIcon className="size-5" />
                    {itemCount > 0 ? (
                      <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs font-semibold text-white">
                        {itemCount > 99 ? "99+" : itemCount}
                      </span>
                    ) : null}
                  </Button>
                ) : null}
                <Button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="h-auto rounded-xl p-2.5 text-white hover:bg-brand-primary-hover"
                  aria-label="Logout"
                >
                  <LogOut className="size-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
