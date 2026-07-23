"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CartHeader() {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-normal sm:text-4xl">
          Cart
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-muted">
          Products and optional garage services ready for checkout.
        </p>
      </div>
      <Button
        asChild
        variant="outline"
        className="border-border bg-brand-panel text-white hover:bg-border"
      >
        <Link href="/search">Browse parts</Link>
      </Button>
    </div>
  );
}
