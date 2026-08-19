"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { PackageCheck, Wrench } from "lucide-react";
import { toast } from "sonner";

import { CartEmptyState } from "@/components/site/cart/cart-empty-state";
import { CartHeader } from "@/components/site/cart/cart-header";
import { CartItemList } from "@/components/site/cart/cart-item-list";
import { CartServiceSelector } from "@/components/site/cart/cart-service-selector";
import {
  CartSummary,
  type AddressFieldErrors,
  type AddressForm,
  type UserAddress,
} from "@/components/site/cart/cart-summary";
import { useSiteCart } from "@/components/site/cart/cart-provider";
import { siteAuthenticatedFetch } from "@/lib/current-user";
import {
  addressSchema,
  firstZodError,
  zodFieldErrors,
} from "@/lib/validation/site-forms";

const emptyAddressForm: AddressForm = {
  label: "Home",
  recipientName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  country: "",
  isDefault: true,
};

const normalizePhone = (value: string, maxLength = 15) => {
  const compact = value.replace(/[^\d+]/g, "");
  const prefix = compact.startsWith("+") ? "+" : "";
  return `${prefix}${compact.replace(/\+/g, "").slice(0, maxLength)}`;
};

const CartSection = ({
  title,
  description,
  count,
  icon,
  children,
}: {
  title: string;
  description: string;
  count: number;
  icon: ReactNode;
  children: ReactNode;
}) => (
  <section className="rounded-lg border border-border bg-brand-panel p-4 shadow-sm sm:p-5">
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          {icon}
          {title}
        </h2>
        <p className="mt-1 text-sm text-brand-muted">{description}</p>
      </div>
      <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        {count} {count === 1 ? "item" : "items"}
      </span>
    </div>
    {children}
  </section>
);

const validateAddress = (form: AddressForm) => {
  const validation = addressSchema.safeParse({
    ...form,
    label: form.label.trim(),
    recipientName: form.recipientName.trim(),
    phone: form.phone.trim(),
    addressLine1: form.addressLine1.trim(),
    addressLine2: form.addressLine2.trim(),
    landmark: form.landmark.trim(),
    city: form.city.trim(),
    state: form.state.trim(),
    country: form.country.trim(),
  });
  if (!validation.success) {
    const errors = zodFieldErrors<keyof AddressForm & string>(validation.error);
    return { data: null, errors, message: firstZodError(validation.error) };
  }
  return { data: validation.data, errors: {}, message: "" };
};

export function CartPage() {
  const {
    user,
    items,
    isCheckingOut,
    subtotal,
    productSubtotal,
    serviceAdvanceSubtotal,
    payableSubtotal,
    garageAdvance,
    productItems,
    serviceItems,
    updateQuantity,
    removeItem,
    clearCart,
    checkoutProducts,
  } = useSiteCart();
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressForm>(emptyAddressForm);
  const [addressFieldErrors, setAddressFieldErrors] =
    useState<AddressFieldErrors>({});
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  useEffect(() => {
    if (user?.activeRole !== "User") return;
    let mounted = true;
    siteAuthenticatedFetch("/api/user/addresses", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      headers: { accept: "application/json" },
    })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as {
          ok?: boolean;
          addresses?: UserAddress[];
          message?: string;
        } | null;
        if (!response.ok || !payload?.ok) {
          throw new Error(payload?.message ?? "Address lookup failed.");
        }
        if (!mounted) return;
        const nextAddresses = payload.addresses ?? [];
        setAddresses(nextAddresses);
        setSelectedAddressId(
          nextAddresses.find((address) => address.isDefault)?.id ??
            nextAddresses[0]?.id ??
            "",
        );
        setShowAddressForm(nextAddresses.length === 0);
      })
      .catch((error) => {
        if (mounted) {
          console.warn("Checkout address lookup failed", error);
          toast.error("Unable to load saved addresses. Add a new address to continue.");
          setShowAddressForm(true);
        }
      })
      .finally(() => {
        if (mounted) setIsLoadingAddresses(false);
      });

    return () => {
      mounted = false;
    };
  }, [user]);

  const setAddressField = <Key extends keyof AddressForm>(
    key: Key,
    value: AddressForm[Key],
  ) => {
    setAddressForm((current) => ({ ...current, [key]: value }));
    setAddressFieldErrors((current) => ({ ...current, [key]: undefined }));
  };

  const saveAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateAddress(addressForm);
    setAddressFieldErrors(validation.errors);
    if (validation.message) {
      toast.error(validation.message);
      return;
    }

    setIsSavingAddress(true);
    try {
      const address = validation.data;
      if (!address) return;
      const response = await siteAuthenticatedFetch("/api/user/addresses", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        address?: UserAddress;
        message?: string;
      } | null;
      if (!response.ok || !payload?.ok || !payload.address) {
        throw new Error(payload?.message ?? "Unable to save address.");
      }

      setAddresses((current) => {
        const existing = payload.address?.isDefault
          ? current.map((address) => ({ ...address, isDefault: false }))
          : current;
        return [payload.address as UserAddress, ...existing];
      });
      setSelectedAddressId(payload.address.id);
      setAddressForm(emptyAddressForm);
      setShowAddressForm(false);
      toast.success("Your delivery address was saved and selected for checkout.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save address.");
    } finally {
      setIsSavingAddress(false);
    }
  };

  return (
    <>
      <main className="bg-brand-surface py-10 text-white md:py-14">
        <div className="site-container-wide">
          <CartHeader />

          <div className="space-y-4">
            {user?.activeRole !== "User" ? (
              <div className="rounded-xl border border-border bg-brand-panel p-5 text-sm text-brand-muted">
                Sign in with a User account to view and manage cart items.
              </div>
            ) : items.length === 0 ? (
              <CartEmptyState />
            ) : (
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start">
                <div className="space-y-5">
                  {productItems.length ? (
                    <CartSection
                      title="Product offers"
                      description="Parts selected from marketplace suppliers."
                      count={productItems.length}
                      icon={<PackageCheck className="h-5 w-5 text-primary" />}
                    >
                      <CartItemList
                        items={productItems}
                        onUpdateQuantity={updateQuantity}
                        onRemoveItem={removeItem}
                      />
                    </CartSection>
                  ) : null}

                  {serviceItems.length || productItems.length ? (
                    <CartSection
                      title="Garage services"
                      description="Optional services are handled separately from product delivery."
                      count={serviceItems.length}
                      icon={<Wrench className="h-5 w-5 text-primary" />}
                    >
                      {serviceItems.length ? (
                        <CartItemList
                          items={serviceItems}
                          onUpdateQuantity={updateQuantity}
                          onRemoveItem={removeItem}
                        />
                      ) : (
                        <p className="rounded-lg border border-dashed border-border bg-brand-surface p-4 text-sm text-brand-muted">
                          No garage service selected yet.
                        </p>
                      )}
                      {productItems.length ? <CartServiceSelector /> : null}
                    </CartSection>
                  ) : null}
                </div>

                <CartSummary
                  productItemCount={productItems.length}
                  serviceItemCount={serviceItems.length}
                  subtotal={subtotal}
                  productSubtotal={productSubtotal}
                  serviceAdvanceSubtotal={serviceAdvanceSubtotal}
                  payableSubtotal={payableSubtotal}
                  garageAdvance={garageAdvance}
                  selectedAddressId={selectedAddressId}
                  addresses={addresses}
                  showAddressForm={showAddressForm}
                  addressForm={addressForm}
                  addressFieldErrors={addressFieldErrors}
                  isLoadingAddresses={isLoadingAddresses}
                  isSavingAddress={isSavingAddress}
                  isCheckingOut={isCheckingOut}
                  onAddressModalChange={setShowAddressForm}
                  onSelectAddress={setSelectedAddressId}
                  onSaveAddress={saveAddress}
                  onAddressFieldChange={setAddressField}
                  onPhoneChange={(value) =>
                    setAddressField("phone", normalizePhone(value))
                  }
                  onCheckoutProducts={() => checkoutProducts(selectedAddressId)}
                  onClearCart={clearCart}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
