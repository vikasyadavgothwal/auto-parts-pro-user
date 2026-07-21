"use client";

import { useState } from "react";
import { AuthModalCard } from "@/components/site/AuthModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { dashboardUrlForRole, getCurrentUser } from "@/lib/current-user";

const userCreateRfqUrl = () => `${dashboardUrlForRole("User")}/rfqs/create`;

export function RequestCustomQuoteButton() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [checking, setChecking] = useState(false);

  const redirectToCreateRfq = () => { window.location.href = userCreateRfqUrl(); };
  const handleClick = async () => {
    if (checking) return;
    setChecking(true);
    try {
      const user = await getCurrentUser();
      if (!user) { setLoginOpen(true); return; }
      redirectToCreateRfq();
    } finally {
      setChecking(false);
    }
  };

  return <>
    <Button type="button" variant="outline" disabled={checking} onClick={() => void handleClick()} className="rounded-full border-2 border-primary bg-white px-8 py-6 font-medium text-primary hover:bg-primary hover:text-white">{checking ? "Checking account..." : "Request Custom Quote"}</Button>
    <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
      <DialogContent showCloseButton={false} className="max-w-[calc(100%-1rem)] border-0 bg-transparent p-0 text-inherit shadow-none ring-0 sm:max-w-lg">
        <DialogHeader className="sr-only"><DialogTitle>Sign in to request a quote</DialogTitle><DialogDescription>Sign in to continue to the User Dashboard RFQ form.</DialogDescription></DialogHeader>
        <AuthModalCard onAuthenticated={redirectToCreateRfq} onClose={() => setLoginOpen(false)} />
      </DialogContent>
    </Dialog>
  </>;
}
