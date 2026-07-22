"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import {
  formatCartPrice,
  type SiteCartItem,
} from "@/components/site/cart/cart-provider";
import { Button } from "@/components/ui/button";

type CartItemCardProps = {
  item: SiteCartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
};

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemCardProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-border bg-brand-panel p-4 sm:grid-cols-[1fr_auto]">
      <div className="min-w-0">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {item.type === "product" ? "Product" : "Service"}
          </span>
          <span className="text-sm font-semibold text-white">
            {formatCartPrice(item.unitPrice, item.currency)}
          </span>
        </div>
        <h2 className="line-clamp-2 font-semibold text-white">
          {item.title}
        </h2>
        <p className="mt-1 text-sm text-brand-muted">
          {item.type === "product"
            ? `${item.supplierName}${item.vendorSku ? ` | SKU ${item.vendorSku}` : ""}`
            : `${item.garageName} | ${item.category}`}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        {item.type === "product" ? (
          <div className="flex items-center rounded-xl border border-border bg-brand-surface">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="min-w-8 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : null}

        {item.type === "service" ? (
          <Button asChild className="h-9 rounded-xl px-3">
            <Link
              href={`/booking?garageId=${encodeURIComponent(item.garageId)}&serviceId=${encodeURIComponent(item.serviceId)}`}
            >
              Book service
            </Link>
          </Button>
        ) : null}

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onRemoveItem(item.id)}
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
