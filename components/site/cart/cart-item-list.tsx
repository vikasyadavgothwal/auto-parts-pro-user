"use client";

import { type SiteCartItem } from "@/components/site/cart/cart-provider";
import { CartItemCard } from "@/components/site/cart/cart-item-card";

type CartItemListProps = {
  items: SiteCartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
};

export function CartItemList({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
}
