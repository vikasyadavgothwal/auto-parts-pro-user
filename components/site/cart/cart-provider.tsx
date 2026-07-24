"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AuthModalCard } from "@/components/site/AuthModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  dashboardUrlForRole,
  getCurrentUser,
  logoutCurrentUser,
  siteAuthenticatedFetch,
} from "@/lib/current-user";
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

type CheckoutSuccessDialog = {
  orderCount: number;
  serviceBookingCount: number;
  totalAmount: number | null;
};

type GarageAdvanceSetting = {
  mode: "percentage" | "fixed";
  value: number;
};

type SiteCartContextValue = {
  user: UserAuthProfile | null;
  items: SiteCartItem[];
  itemCount: number;
  notice: string;
  isCheckingOut: boolean;
  subtotal: number;
  productSubtotal: number;
  serviceAdvanceSubtotal: number;
  payableSubtotal: number;
  garageAdvance: GarageAdvanceSetting;
  productItems: ProductCartItem[];
  serviceItems: ServiceCartItem[];
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

const removeStoredItems = (userId: string) => {
  try {
    window.localStorage.removeItem(`${storagePrefix}:${userId}`);
  } catch {
    // Ignore local migration cleanup failures.
  }
};

const readDbCartItems = async () => {
  const response = await siteAuthenticatedFetch("/api/user/cart", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    headers: { accept: "application/json" },
  });
  const payload = (await response.json().catch(() => null)) as
    | { ok?: boolean; items?: unknown }
    | null;
  if (!response.ok || !payload?.ok || !Array.isArray(payload.items)) {
    return [];
  }
  return payload.items
    .map(normalizeStoredItem)
    .filter((item): item is SiteCartItem => Boolean(item));
};

const replaceDbCartItems = async (items: SiteCartItem[]) => {
  await siteAuthenticatedFetch("/api/user/cart", {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
};

const calculateServiceAdvance = (
  servicePrice: number | null,
  quantity: number,
  setting: GarageAdvanceSetting,
) => {
  if (typeof servicePrice !== "number") return 0;
  const perService =
    setting.mode === "fixed"
      ? Math.min(servicePrice, setting.value)
      : (servicePrice * setting.value) / 100;
  return perService * quantity;
};

export function SiteCartProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserAuthProfile | null>(null);
  const [items, setItems] = useState<SiteCartItem[]>([]);
  const [cartLoadedForUserId, setCartLoadedForUserId] = useState<string | null>(
    null,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [addedCartItem, setAddedCartItem] = useState<{
    title: string;
    type: SiteCartItem["type"];
  } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [garageAdvance, setGarageAdvance] = useState<GarageAdvanceSetting>({
    mode: "percentage",
    value: 10,
  });
  const [checkoutSuccess, setCheckoutSuccess] =
    useState<CheckoutSuccessDialog | null>(null);

  const refreshUser = useCallback(async () => {
    const nextUser = await getCurrentUser();
    setUser(nextUser);
    setCartLoadedForUserId(null);
    if (nextUser?.activeRole !== "User") {
      setItems([]);
      return nextUser;
    }
    setItems(await readDbCartItems());
    setCartLoadedForUserId(nextUser.id);
    return nextUser;
  }, []);

  useEffect(() => {
    let isMounted = true;
    void getCurrentUser()
      .then((nextUser) => {
        if (!isMounted) return;
        setUser(nextUser);
        if (nextUser?.activeRole !== "User") {
          setItems([]);
          setCartLoadedForUserId(null);
          return;
        }
        void readDbCartItems()
          .then(async (dbItems) => {
            if (!isMounted) return;
            const localItems = readStoredItems(nextUser.id);
            const nextItems = dbItems.length ? dbItems : localItems;
            setItems(nextItems);
            setCartLoadedForUserId(nextUser.id);
            if (!dbItems.length && localItems.length) {
              await replaceDbCartItems(localItems).catch(() => undefined);
            }
            removeStoredItems(nextUser.id);
          })
          .catch(() => {
            if (!isMounted) return;
            setItems(readStoredItems(nextUser.id));
            setCartLoadedForUserId(nextUser.id);
          });
      })
      .finally(() => {
        if (isMounted) setIsLoaded(true);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/garage-booking-advance", {
      cache: "no-store",
      headers: { accept: "application/json" },
    })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as
          | { ok?: boolean; advance?: GarageAdvanceSetting }
          | null;
        if (isMounted && response.ok && payload?.ok && payload.advance) {
          setGarageAdvance(payload.advance);
        }
      })
      .catch(() => undefined);
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !user || user.activeRole !== "User") return;
    if (cartLoadedForUserId !== user.id) return;
    void replaceDbCartItems(items).catch(() => undefined);
  }, [cartLoadedForUserId, isLoaded, items, user]);

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
        const dashboardUrl = dashboardUrlForRole(activeUser.activeRole);
        await logoutCurrentUser();
        window.location.assign(dashboardUrl);
        return {
          ok: false,
          message: "Redirecting to your dashboard...",
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
      setAddedCartItem({ title: input.title, type: input.type });
      return { ok: true, message: "Added to cart." };
    },
    [refreshUser, user],
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

  const serviceItems = useMemo(
    () =>
      items.filter((item): item is ServiceCartItem => item.type === "service"),
    [items],
  );

  const serviceAdvanceSubtotal = useMemo(
    () =>
      serviceItems.reduce(
        (total, item) =>
          total +
          calculateServiceAdvance(item.unitPrice, item.quantity, garageAdvance),
        0,
      ),
    [garageAdvance, serviceItems],
  );

  const payableSubtotal = useMemo(
    () => productSubtotal + serviceAdvanceSubtotal,
    [productSubtotal, serviceAdvanceSubtotal],
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
        const response = await siteAuthenticatedFetch("/api/orders", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: productItems.map((item) => ({
              supplierPartId: item.offerId,
              quantity: item.quantity,
            })),
            services: serviceItems.map((item) => ({
              garageId: item.garageId,
              serviceId: item.serviceId,
              quantity: item.quantity,
              notes:
                "Slot will be selected after the product order is delivered.",
            })),
            addressId,
          }),
        });
        const payload = (await response.json().catch(() => null)) as {
          ok?: boolean;
          message?: string;
          order?: { publicId?: string } | null;
          orders?: Array<{ publicId?: string }>;
          summary?: {
            orderCount?: number;
            serviceBookingCount?: number;
            totalAmount?: number;
          };
        } | null;
        if (!response.ok || !payload?.ok) {
          throw new Error(payload?.message ?? "Unable to create orders.");
        }
        const checkedOutProductIds = new Set([
          ...productItems.map((item) => item.id),
          ...serviceItems.map((item) => item.id),
        ]);
        setItems((current) =>
          current.filter((item) => !checkedOutProductIds.has(item.id)),
        );

        const orderCount =
          payload.summary?.orderCount ?? payload.orders?.length ?? 1;
        setCheckoutSuccess({
          orderCount,
          serviceBookingCount: payload.summary?.serviceBookingCount ?? 0,
          totalAmount:
            typeof payload.summary?.totalAmount === "number"
              ? payload.summary.totalAmount
              : null,
        });
      } catch (error) {
        setNotice(
          error instanceof Error ? error.message : "Unable to create orders.",
        );
      } finally {
        setIsCheckingOut(false);
      }
    },
    [isCheckingOut, productItems, serviceItems],
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
      serviceAdvanceSubtotal,
      payableSubtotal,
      garageAdvance,
      productItems,
      serviceItems,
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
      serviceAdvanceSubtotal,
      serviceItems,
      payableSubtotal,
      garageAdvance,
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
          className="max-w-[calc(100%-1rem)] border-0 bg-transparent p-0 text-inherit shadow-none ring-0 sm:max-w-lg"
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

      <Dialog
        open={Boolean(addedCartItem)}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) setAddedCartItem(null);
        }}
      >
        <DialogContent className="border border-border bg-brand-surface text-white shadow-2xl sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="mb-2 flex size-12 items-center justify-center rounded-full border border-brand-success/25 bg-brand-success/10 text-brand-success">
              <CheckCircle2 className="size-6" />
            </div>
            <DialogTitle className="text-xl text-white">
              {addedCartItem?.type === "service"
                ? "Service added to cart"
                : "Product added to cart"}
            </DialogTitle>
            <DialogDescription className="text-brand-muted">
              {addedCartItem
                ? `${addedCartItem.title} was added successfully.`
                : "The item was added successfully."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="bg-transparent sm:justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setAddedCartItem(null)}
              className="w-full border-border text-white hover:bg-background/60 sm:w-auto"
            >
              Continue shopping
            </Button>
            <Button
              type="button"
              onClick={() => {
                setAddedCartItem(null);
                router.push("/cart");
              }}
              className="w-full hover:bg-brand-primary-hover sm:w-auto"
            >
              View cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(checkoutSuccess)}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) setCheckoutSuccess(null);
        }}
      >
        <DialogContent className="border border-border bg-brand-surface text-white shadow-2xl sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="mb-2 flex size-12 items-center justify-center rounded-full border border-brand-success/25 bg-brand-success/10 text-brand-success">
              <CheckCircle2 className="size-6" />
            </div>
            <DialogTitle className="text-xl text-white">
              Payment Successful
            </DialogTitle>
            <DialogDescription className="text-brand-muted">
              {checkoutSuccess
                ? `${checkoutSuccess.orderCount} order${
                    checkoutSuccess.orderCount === 1 ? "" : "s"
                  }${
                    checkoutSuccess.serviceBookingCount
                      ? ` and ${checkoutSuccess.serviceBookingCount} service booking${
                          checkoutSuccess.serviceBookingCount === 1 ? "" : "s"
                        }`
                      : ""
                  } created successfully.`
                : "Your order was created successfully."}
            </DialogDescription>
          </DialogHeader>

          {checkoutSuccess?.totalAmount != null ? (
            <div className="rounded-xl border border-border bg-background/40 px-4 py-3 text-center">
              <p className="text-xs text-brand-muted">Paid amount</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                AED {checkoutSuccess.totalAmount.toFixed(2)}
              </p>
            </div>
          ) : null}

          <DialogFooter className="bg-transparent sm:justify-center">
            <Button
              type="button"
              onClick={() => setCheckoutSuccess(null)}
              className="w-full hover:bg-brand-primary-hover sm:w-auto"
            >
              Continue
            </Button>
          </DialogFooter>
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
