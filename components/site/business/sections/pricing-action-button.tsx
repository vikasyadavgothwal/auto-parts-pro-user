"use client";

import { useState, type ReactNode } from "react";

import { AuthModalCard } from "@/components/site/AuthModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type BusinessRole = "Fleet" | "Garage" | "Supplier";

export function PricingActionButton({
  role,
  className,
  children,
}: {
  role: BusinessRole;
  className?: string;
  children: ReactNode;
}) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const response = await fetch(`/api/business/pricing-redirect?role=${encodeURIComponent(role)}`, {
      cache: "no-store",
      credentials: "include",
    });
    const payload = (await response.json().catch(() => null)) as
      | { authenticated?: boolean; url?: string }
      | null;
    setLoading(false);
    if (payload?.authenticated && payload.url) {
      window.location.assign(payload.url);
      return;
    }
    setLoginOpen(true);
  };

  return (
    <>
      <Button type="button" className={className} onClick={handleClick} disabled={loading}>
        {loading ? "Checking..." : children}
      </Button>
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto border border-border bg-brand-panel p-0 sm:max-w-xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Sign in to manage pricing</DialogTitle>
            <DialogDescription>Sign in with your business account to continue.</DialogDescription>
          </DialogHeader>
          <AuthModalCard
            initialAccountType={role}
            initialMode="signup"
            businessRedirect="plans"
            onClose={() => setLoginOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
