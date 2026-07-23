"use client";

import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { CartEmptyState } from "@/components/site/cart/cart-empty-state";
import { CartHeader } from "@/components/site/cart/cart-header";
import { CartItemList } from "@/components/site/cart/cart-item-list";
import { CartPromoCode } from "@/components/site/cart/cart-promo-code";
import { CartServiceSelector } from "@/components/site/cart/cart-service-selector";
import {
  CartSummary,
  type AddressFieldErrors,
  type AddressForm,
  type UserAddress,
} from "@/components/site/cart/cart-summary";
import { useSiteCart } from "@/components/site/cart/cart-provider";
import { siteAuthenticatedFetch } from "@/lib/current-user";

const emptyAddressForm: AddressForm = {
  label: "Home",
  recipientName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  isDefault: true,
};

const normalizePhone = (value: string, maxLength = 16) => {
  const compact = value.replace(/[^\d+]/g, "");
  const prefix = compact.startsWith("+") ? "+" : "";
  return `${prefix}${compact.replace(/\+/g, "").slice(0, maxLength)}`;
};

const normalizePostalCode = (value: string) =>
  value.replace(/[^A-Za-z0-9 -]/g, "").slice(0, 20);

const validateAddress = (form: AddressForm) => {
  const errors: AddressFieldErrors = {};
  const requiredText = (
    key: keyof AddressForm,
    label: string,
    maxLength: number,
  ) => {
    const value = String(form[key]).trim();
    if (!value) {
      errors[key] = `${label} is required.`;
      return;
    }
    if (value.length > maxLength) {
      errors[key] = `${label} must be ${maxLength} characters or fewer.`;
    }
  };

  requiredText("label", "Address label", 60);
  requiredText("recipientName", "Recipient name", 120);
  requiredText("addressLine1", "Address line 1", 255);
  requiredText("city", "City", 120);
  requiredText("state", "State", 120);
  requiredText("postalCode", "Postal code", 20);
  requiredText("country", "Country", 120);

  if (form.addressLine2.trim().length > 255) {
    errors.addressLine2 = "Address line 2 must be 255 characters or fewer.";
  }
  if (form.landmark.trim().length > 160) {
    errors.landmark = "Landmark must be 160 characters or fewer.";
  }

  const phone = form.phone.trim();
  const phoneDigits = phone.replace(/\D/g, "");
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?\d{8,16}$/.test(phone) || phoneDigits.length < 8) {
    errors.phone = "Enter a valid phone number with country code.";
  }

  if (!/^[A-Za-z0-9 -]{3,20}$/.test(form.postalCode.trim())) {
    errors.postalCode = "Enter a valid postal code.";
  }

  const firstError = Object.values(errors)[0] ?? "";
  return { errors, message: firstError };
};

export function CartPage() {
  const {
    user,
    items,
    notice,
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
  const [addressError, setAddressError] = useState("");
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
          setAddressError("");
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
    setAddressError("");
    const validation = validateAddress(addressForm);
    setAddressFieldErrors(validation.errors);
    if (validation.message) {
      setAddressError(validation.message);
      return;
    }

    setIsSavingAddress(true);
    try {
      const response = await siteAuthenticatedFetch("/api/user/addresses", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: addressForm.label.trim(),
          recipientName: addressForm.recipientName.trim(),
          phone: addressForm.phone.trim(),
          addressLine1: addressForm.addressLine1.trim(),
          addressLine2: addressForm.addressLine2.trim(),
          landmark: addressForm.landmark.trim(),
          city: addressForm.city.trim(),
          state: addressForm.state.trim(),
          postalCode: addressForm.postalCode.trim(),
          country: addressForm.country.trim(),
          isDefault: addressForm.isDefault,
        }),
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
      toast.success("Address saved.");
    } catch (error) {
      setAddressError(
        error instanceof Error ? error.message : "Unable to save address.",
      );
    } finally {
      setIsSavingAddress(false);
    }
  };

  return (
    <main className="bg-brand-surface py-10 text-white md:py-14">
      <div className="site-container-wide">
        <CartHeader />

        <div className="space-y-4">
          {notice ? (
            <div className="break-words rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
              {notice}
            </div>
          ) : null}

          {user?.activeRole !== "User" ? (
            <div className="rounded-xl border border-border bg-brand-panel p-5 text-sm text-brand-muted">
              Sign in with a User account to view and manage cart items.
            </div>
          ) : items.length === 0 ? (
            <CartEmptyState />
          ) : (
            <>
              <CartItemList
                items={items}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
              {productItems.length ? <CartServiceSelector /> : null}
              <CartPromoCode />
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
                addressError={addressError}
                addressFieldErrors={addressFieldErrors}
                isLoadingAddresses={isLoadingAddresses}
                isSavingAddress={isSavingAddress}
                isCheckingOut={isCheckingOut}
                onToggleAddressForm={() =>
                  setShowAddressForm((current) => !current)
                }
                onSelectAddress={setSelectedAddressId}
                onSaveAddress={saveAddress}
                onAddressFieldChange={setAddressField}
                onPhoneChange={(value) =>
                  setAddressField("phone", normalizePhone(value))
                }
                onPostalCodeChange={(value) =>
                  setAddressField("postalCode", normalizePostalCode(value))
                }
                onCheckoutProducts={() => checkoutProducts(selectedAddressId)}
                onClearCart={clearCart}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
