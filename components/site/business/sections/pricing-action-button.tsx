"use client";

import { useState, type ReactNode } from "react";
import { toast } from "sonner";

import { AuthModalCard } from "@/components/site/AuthModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { dashboardPlansUrlForRole, getCurrentUser } from "@/lib/current-user";

type BusinessRole = "Fleet" | "Garage" | "Supplier";
const businessRoles = new Set<string>(["Fleet", "Garage", "Supplier"]);

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
  const [checking, setChecking] = useState(false);

  const handleClick = async () => {
    if (checking) return;
    setChecking(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        setLoginOpen(true);
        return;
      }
      if (!businessRoles.has(user.activeRole)) {
        toast.error("Only Fleet, Supplier, or Garage accounts can access these plans.");
        return;
      }
      window.location.assign(dashboardPlansUrlForRole(user.activeRole));
    } catch {
      setLoginOpen(true);
    } finally {
      setChecking(false);
    }
  };

  return (
    <>
      <Button type="button" className={className} onClick={() => void handleClick()} disabled={checking}>
        {checking ? "Checking account..." : children}
      </Button>
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[calc(100dvh-2rem)] overflow-y-auto border-0 bg-transparent p-0 ring-0 sm:max-w-xl"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Sign in to manage pricing</DialogTitle>
            <DialogDescription>Sign in with your business account to continue.</DialogDescription>
          </DialogHeader>
          <AuthModalCard
            initialAccountType={role}
            initialMode="signin"
            businessRedirect="plans"
            onClose={() => setLoginOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
