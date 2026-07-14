"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AuthModalCard } from "@/components/site/AuthModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCurrentUser } from "@/lib/current-user";
import type { UserAuthProfile } from "@/types/api/user-auth";

type CartItemBase = {
  id: string;
  title: string;
  image?: string | null;
  unitPrice: number | null;
  currency: string;
  quantity: number;
};

export type ProductCartItem = CartItemBase & {
  type: "product";
  productId: string;
  offerId: string;
  supplierName: string;
  partNumber?: string | null;
  vendorSku?: string | null;
};

export type ServiceCartItem = CartItemBase & {
  type: "service";
  garageId: string;
  serviceId: string;
  garageName: string;
  category: string;
  durationMinutes: number;
};

export type SiteCartItem = ProductCartItem | ServiceCartItem;

type AddCartItemInput =
  | (Omit<ProductCartItem, "id" | "quantity"> & { quantity?: number })
  | (Omit<ServiceCartItem, "id" | "quantity"> & { quantity?: number });

type CartActionResult = {
  ok: boolean;
  message: string;
};

type SiteCartContextValue = {
  user: UserAuthProfile | null;
  items: SiteCartItem[];
  itemCount: number;
  notice: string;
  isCheckingOut: boolean;
  subtotal: number;
  productSubtotal: number;
  productItems: ProductCartItem[];
  openCart: () => void;
  addItem: (item: AddCartItemInput) => Promise<CartActionResult>;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  clearNotice: () => void;
  checkoutProducts: (addressId: string) => Promise<void>;
};

const SiteCartContext = createContext<SiteCartContextValue | null>(null);

const storagePrefix = "auto-parts-pro-cart";

const itemKey = (item: AddCartItemInput) =>
  item.type === "product"
    ? `product:${item.offerId}`
    : `service:${item.garageId}:${item.serviceId}`;

export const formatCartPrice = (amount: number | null, currency: string) =>
  typeof amount === "number" ? `${currency} ${amount.toFixed(2)}` : "Contact";

const normalizeQuantity = (value: number) =>
  Math.min(999, Math.max(1, Number.isFinite(value) ? Math.floor(value) : 1));

const normalizeStoredItem = (item: unknown): SiteCartItem | null => {
  if (!item || typeof item !== "object") return null;
  const value = item as Record<string, unknown>;
  if (
    typeof value.id !== "string" ||
    typeof value.title !== "string" ||
    (value.type !== "product" && value.type !== "service")
  ) {
    return null;
  }

  const quantity = normalizeQuantity(Number(value.quantity ?? 1));
  const unitPrice =
    typeof value.unitPrice === "number" && Number.isFinite(value.unitPrice)
      ? value.unitPrice
      : null;
  const currency = typeof value.currency === "string" ? value.currency : "AED";

  if (value.type === "product") {
    if (
      typeof value.productId !== "string" ||
      typeof value.offerId !== "string" ||
      typeof value.supplierName !== "string"
    ) {
      return null;
    }
    return {
      id: value.id,
      type: "product",
      productId: value.productId,
      offerId: value.offerId,
      supplierName: value.supplierName,
      title: value.title,
      image: typeof value.image === "string" ? value.image : null,
      unitPrice,
      currency,
      quantity,
      partNumber:
        typeof value.partNumber === "string" ? value.partNumber : null,
      vendorSku: typeof value.vendorSku === "string" ? value.vendorSku : null,
    };
  }

  if (
    typeof value.garageId !== "string" ||
    typeof value.serviceId !== "string" ||
    typeof value.garageName !== "string" ||
    typeof value.category !== "string" ||
    typeof value.durationMinutes !== "number"
  ) {
    return null;
  }
  return {
    id: value.id,
    type: "service",
    garageId: value.garageId,
    serviceId: value.serviceId,
    garageName: value.garageName,
    title: value.title,
    category: value.category,
    durationMinutes: value.durationMinutes,
    image: typeof value.image === "string" ? value.image : null,
    unitPrice,
    currency,
    quantity,
  };
};

const readStoredItems = (userId: string): SiteCartItem[] => {
  try {
    const raw = window.localStorage.getItem(`${storagePrefix}:${userId}`);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed
          .map(normalizeStoredItem)
          .filter((item): item is SiteCartItem => Boolean(item))
      : [];
  } catch {
    return [];
  }
};

export function SiteCartProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserAuthProfile | null>(null);
  const [items, setItems] = useState<SiteCartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const refreshUser = useCallback(async () => {
    const nextUser = await getCurrentUser();
    setUser(nextUser);
    setItems(
      nextUser?.activeRole === "User" ? readStoredItems(nextUser.id) : [],
    );
    return nextUser;
  }, []);

  useEffect(() => {
    let isMounted = true;
    void getCurrentUser()
      .then((nextUser) => {
        if (!isMounted) return;
        setUser(nextUser);
        setItems(
          nextUser?.activeRole === "User" ? readStoredItems(nextUser.id) : [],
        );
      })
      .finally(() => {
        if (isMounted) setIsLoaded(true);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !user || user.activeRole !== "User") return;
    window.localStorage.setItem(
      `${storagePrefix}:${user.id}`,
      JSON.stringify(items),
    );
  }, [isLoaded, items, user]);

  const addItem = useCallback(
    async (input: AddCartItemInput): Promise<CartActionResult> => {
      const activeUser = user ?? (await refreshUser());
      if (!activeUser) {
        setIsAuthOpen(true);
        return {
          ok: false,
          message: "Sign in as a user to add items to cart.",
        };
      }
      if (activeUser.activeRole !== "User") {
        return {
          ok: false,
          message: "Cart is available only for User accounts.",
        };
      }

      const id = itemKey(input);
      const quantity = normalizeQuantity(input.quantity ?? 1);
      const nextItem = { ...input, id, quantity } as SiteCartItem;
      setItems((current) => {
        const existing = current.find((item) => item.id === id);
        if (!existing) return [nextItem, ...current];
        return current.map((item) =>
          item.id === id
            ? {
                ...item,
                ...nextItem,
                quantity: normalizeQuantity(item.quantity + quantity),
              }
            : item,
        );
      });
      setNotice(`${input.title} added to cart.`);
      router.push("/cart");
      return { ok: true, message: "Added to cart." };
    },
    [refreshUser, router, user],
  );

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? { ...item, quantity: normalizeQuantity(quantity) }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((current) => current.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const clearNotice = useCallback(() => {
    setNotice("");
  }, []);

  const productItems = useMemo(
    () =>
      items.filter((item): item is ProductCartItem => item.type === "product"),
    [items],
  );

  const productSubtotal = useMemo(
    () =>
      productItems.reduce(
        (total, item) =>
          total +
          (typeof item.unitPrice === "number"
            ? item.unitPrice * item.quantity
            : 0),
        0,
      ),
    [productItems],
  );

  const checkoutProducts = useCallback(
    async (addressId: string) => {
      if (!productItems.length || isCheckingOut) return;
      if (!addressId.trim()) {
        setNotice("Select a delivery address before placing the order.");
        return;
      }
      setIsCheckingOut(true);
      setNotice("");
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: productItems.map((item) => ({
              supplierPartId: item.offerId,
              quantity: item.quantity,
            })),
            addressId,
          }),
        });
        const payload = (await response.json().catch(() => null)) as {
          ok?: boolean;
          message?: string;
          order?: { publicId?: string } | null;
          orders?: Array<{ publicId?: string }>;
          summary?: { orderCount?: number; totalAmount?: number };
        } | null;
        if (!response.ok || !payload?.ok) {
          throw new Error(payload?.message ?? "Unable to create orders.");
        }
        const checkedOutProductIds = new Set(
          productItems.map((item) => item.id),
        );
        setItems((current) =>
          current.filter((item) => !checkedOutProductIds.has(item.id)),
        );

        const orderCount =
          payload.summary?.orderCount ?? payload.orders?.length ?? 1;
        const totalAmount =
          typeof payload.summary?.totalAmount === "number"
            ? ` Total: AED ${payload.summary.totalAmount.toFixed(2)}.`
            : "";
        toast.success(
          `Your order has been confirmed. ${orderCount} order${orderCount === 1 ? "" : "s"} created.${totalAmount}`,
        );
      } catch (error) {
        setNotice(
          error instanceof Error ? error.message : "Unable to create orders.",
        );
      } finally {
        setIsCheckingOut(false);
      }
    },
    [isCheckingOut, productItems],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          (typeof item.unitPrice === "number"
            ? item.unitPrice * item.quantity
            : 0),
        0,
      ),
    [items],
  );

  const value = useMemo<SiteCartContextValue>(
    () => ({
      user,
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      notice,
      isCheckingOut,
      subtotal,
      productSubtotal,
      productItems,
      openCart: () => {
        setNotice("");
        router.push("/cart");
      },
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      clearNotice,
      checkoutProducts,
    }),
    [
      addItem,
      checkoutProducts,
      clearCart,
      clearNotice,
      isCheckingOut,
      items,
      notice,
      productItems,
      productSubtotal,
      removeItem,
      router,
      subtotal,
      updateQuantity,
      user,
    ],
  );

  return (
    <SiteCartContext.Provider value={value}>
      {children}

      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[calc(100%-2rem)] border-0 bg-transparent p-0 text-inherit shadow-none ring-0 sm:max-w-md"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Sign in to use cart</DialogTitle>
            <DialogDescription>
              Sign in or create a User account to add items to cart.
            </DialogDescription>
          </DialogHeader>
          <AuthModalCard
            onAuthenticated={async () => {
              await refreshUser();
              setIsAuthOpen(false);
            }}
            onClose={() => setIsAuthOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </SiteCartContext.Provider>
  );
}

export function useSiteCart() {
  const context = useContext(SiteCartContext);
  if (!context) {
    throw new Error("useSiteCart must be used within SiteCartProvider");
  }
  return context;
}
