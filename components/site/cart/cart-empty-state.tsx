"use client";

import { ShoppingCart } from "lucide-react";

export function CartEmptyState() {
  return (
    <div className="rounded-xl border border-border bg-brand-panel p-8 text-center">
      <ShoppingCart className="mx-auto mb-3 h-8 w-8 text-brand-muted" />
      <p className="font-medium text-white">Your cart is empty</p>
      <p className="mt-1 text-sm text-brand-muted">
        Add product offers or garage services before checkout.
      </p>
    </div>
  );
}
