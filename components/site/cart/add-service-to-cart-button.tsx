"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

import { useSiteCart } from "@/components/site/cart/cart-provider";
import { Button } from "@/components/ui/button";

type AddServiceToCartButtonProps = {
  garageId: string;
  garageName: string;
  serviceId: string;
  serviceName: string;
  category: string;
  durationMinutes: number;
  price: number;
  currency: string;
  className?: string;
};

export function AddServiceToCartButton({
  garageId,
  garageName,
  serviceId,
  serviceName,
  category,
  durationMinutes,
  price,
  currency,
  className,
}: AddServiceToCartButtonProps) {
  const { addItem } = useSiteCart();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const addToCart = async () => {
    setPending(true);
    setMessage("");
    const result = await addItem({
      type: "service",
      garageId,
      garageName,
      serviceId,
      title: serviceName,
      category,
      durationMinutes,
      unitPrice: price / 100,
      currency,
      quantity: 1,
    });
    setMessage(result.message);
    setPending(false);
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        disabled={pending}
        onClick={addToCart}
        variant="outline"
        className={className}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {pending ? "Adding..." : "Add to cart"}
      </Button>
      {message ? (
        <p className="text-center text-xs text-brand-muted">{message}</p>
      ) : null}
    </div>
  );
}
