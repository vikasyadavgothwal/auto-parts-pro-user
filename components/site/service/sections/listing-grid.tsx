"use client";

import Link from "next/link";

import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PublicGarageSummary } from "@/types/site/garages";
import { ListingItemCard } from "@/components/site/service/sections/listing-item-card";

export function ListingGrid({ garages }: { garages: PublicGarageSummary[] }) {
  if (garages.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-xl font-semibold text-white">
          No garages match this search
        </h3>
        <p className="mt-2 text-sm text-brand-muted">
          Try a different garage name, city, service, or filter.
        </p>
        <Link
          href="/services"
          className={cn(buttonVariants(), "mt-5 rounded-xl")}
        >
          Clear search
        </Link>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {garages.map((garage) => (
        <ListingItemCard key={garage.id} garage={garage} />
      ))}
    </div>
  );
}
