"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ListingPaginationLink = {
  key: string;
  label: string;
  href: string;
  isCurrent?: boolean;
  isDisabled?: boolean;
};

export function ListingPagination({
  links,
}: {
  links: ListingPaginationLink[];
}) {
  if (links.length === 0) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {links.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          aria-disabled={link.isDisabled}
          className={cn(
            buttonVariants({
              variant: link.isCurrent ? "default" : "outline",
            }),
            "rounded-xl",
            !link.isCurrent && "border-[#2A2A2A] bg-[#1A1A1A] text-white",
            link.isDisabled && "pointer-events-none opacity-50",
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
