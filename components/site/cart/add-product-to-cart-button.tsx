"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { useSiteCart } from "@/components/site/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductOffer } from "@/types/site/product";

type AddProductToCartButtonProps = {
  offer: ProductOffer;
  className?: string;
};

export function AddProductToCartButton({
  offer,
  className,
}: AddProductToCartButtonProps) {
  const { addItem } = useSiteCart();
  const [pending, setPending] = useState(false);

  const addToCart = async () => {
    if (!offer.id || !offer.productId) {
      toast.error("This offer is not available for cart.");
      return;
    }
    setPending(true);
    const result = await addItem({
      type: "product",
      productId: offer.productId,
      offerId: offer.id,
      supplierName: offer.seller,
      title: offer.productTitle ?? "Auto part",
      image: offer.productImage || offer.logo,
      unitPrice: offer.unitPrice ?? null,
      currency: offer.currency ?? "AED",
      quantity: 1,
      partNumber: offer.partNumber,
      vendorSku: offer.vendorSku,
    });
    if (!result.ok) toast.error(result.message);
    setPending(false);
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        disabled={pending}
        onClick={addToCart}
        className={cn("h-12 w-full rounded-full font-medium", className)}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {pending ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  );
}
