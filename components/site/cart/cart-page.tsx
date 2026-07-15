"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import {
  formatCartPrice,
  useSiteCart,
} from "@/components/site/cart/cart-provider";
import { Button } from "@/components/ui/button";

type UserAddress = {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  landmark: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

type AddressForm = {
  label: string;
  recipientName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

type AddressFieldErrors = Partial<Record<keyof AddressForm, string>>;

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

const fieldClass = (hasError: boolean) =>
  `h-11 w-full min-w-0 rounded-lg border bg-brand-panel px-3 text-white outline-none transition-colors focus:border-primary ${
    hasError ? "border-destructive" : "border-border"
  }`;

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-xs text-destructive">{message}</p> : null;

export function CartPage() {
  const {
    user,
    items,
    notice,
    isCheckingOut,
    subtotal,
    productSubtotal,
    productItems,
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
    fetch("/api/user/addresses", {
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
      const response = await fetch("/api/user/addresses", {
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
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-normal sm:text-4xl">
              Cart
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-brand-muted">
              Pending products and services you added before checkout or
              booking.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-border bg-brand-panel text-white hover:bg-border"
          >
            <Link href="/search">Browse parts</Link>
          </Button>
        </div>

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
            <div className="rounded-xl border border-border bg-brand-panel p-8 text-center">
              <ShoppingCart className="mx-auto mb-3 h-8 w-8 text-brand-muted" />
              <p className="font-medium text-white">Your cart is empty</p>
              <p className="mt-1 text-sm text-brand-muted">
                Add product offers or garage services before checkout.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-3 rounded-xl border border-border bg-brand-panel p-4 sm:grid-cols-[1fr_auto]"
                  >
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
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
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
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
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
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {productItems.length ? (
                <div className="space-y-4 rounded-xl border border-border bg-brand-panel p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                        <MapPin className="h-5 w-5 text-primary" />
                        Delivery address
                      </h2>
                      <p className="mt-1 text-sm text-brand-muted">
                        Choose a saved address or add a new delivery address.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-border bg-brand-surface text-white hover:bg-border sm:w-auto"
                      onClick={() => setShowAddressForm((current) => !current)}
                    >
                      {showAddressForm ? "Cancel" : "Add address"}
                    </Button>
                  </div>

                  {addressError ? (
                    <p className="break-words rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {addressError}
                    </p>
                  ) : null}

                  {isLoadingAddresses ? (
                    <p className="text-sm text-brand-muted">
                      Loading addresses...
                    </p>
                  ) : addresses.length ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {addresses.map((address) => (
                        <button
                          key={address.id}
                          type="button"
                          onClick={() => setSelectedAddressId(address.id)}
                          className={`min-w-0 rounded-lg border p-4 text-left transition-colors ${
                            selectedAddressId === address.id
                              ? "border-primary bg-primary/10"
                              : "border-border bg-brand-surface hover:border-primary/60"
                          }`}
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="font-semibold text-white">
                              {address.label}
                            </span>
                            {selectedAddressId === address.id ? (
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            ) : null}
                          </div>
                          <p className="break-words text-sm text-white">
                            {address.recipientName} | {address.phone}
                          </p>
                          <p className="mt-1 break-words text-sm leading-6 text-brand-muted">
                            {[
                              address.addressLine1,
                              address.addressLine2,
                              address.landmark,
                              address.city,
                              address.state,
                              address.postalCode,
                              address.country,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-lg border border-border bg-brand-surface p-4 text-sm text-brand-muted">
                      Add a delivery address before placing a product order.
                    </p>
                  )}

                  {showAddressForm ? (
                    <form
                      onSubmit={saveAddress}
                      noValidate
                      className="grid min-w-0 gap-4 rounded-lg border border-border bg-brand-surface p-3 sm:grid-cols-2 sm:p-4"
                    >
                      <label className="min-w-0 space-y-2 text-sm">
                        <span className="text-brand-muted">Address label</span>
                        <input
                          value={addressForm.label}
                          onChange={(event) =>
                            setAddressField("label", event.target.value)
                          }
                          aria-invalid={Boolean(addressFieldErrors.label)}
                          maxLength={60}
                          placeholder="Home, Office, Warehouse"
                          className={fieldClass(
                            Boolean(addressFieldErrors.label),
                          )}
                        />
                        <FieldError message={addressFieldErrors.label} />
                      </label>
                      <label className="min-w-0 space-y-2 text-sm">
                        <span className="text-brand-muted">Recipient name</span>
                        <input
                          value={addressForm.recipientName}
                          onChange={(event) =>
                            setAddressField("recipientName", event.target.value)
                          }
                          aria-invalid={Boolean(
                            addressFieldErrors.recipientName,
                          )}
                          maxLength={120}
                          autoComplete="name"
                          className={fieldClass(
                            Boolean(addressFieldErrors.recipientName),
                          )}
                        />
                        <FieldError
                          message={addressFieldErrors.recipientName}
                        />
                      </label>
                      <label className="min-w-0 space-y-2 text-sm">
                        <span className="text-brand-muted">Phone</span>
                        <input
                          value={addressForm.phone}
                          onChange={(event) =>
                            setAddressField(
                              "phone",
                              normalizePhone(event.target.value),
                            )
                          }
                          aria-invalid={Boolean(addressFieldErrors.phone)}
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="+971..."
                          className={fieldClass(
                            Boolean(addressFieldErrors.phone),
                          )}
                        />
                        <FieldError message={addressFieldErrors.phone} />
                      </label>
                      <label className="min-w-0 space-y-2 text-sm">
                        <span className="text-brand-muted">Postal code</span>
                        <input
                          value={addressForm.postalCode}
                          onChange={(event) =>
                            setAddressField(
                              "postalCode",
                              normalizePostalCode(event.target.value),
                            )
                          }
                          aria-invalid={Boolean(addressFieldErrors.postalCode)}
                          autoComplete="postal-code"
                          maxLength={20}
                          className={fieldClass(
                            Boolean(addressFieldErrors.postalCode),
                          )}
                        />
                        <FieldError message={addressFieldErrors.postalCode} />
                      </label>
                      <label className="min-w-0 space-y-2 text-sm sm:col-span-2">
                        <span className="text-brand-muted">Address line 1</span>
                        <input
                          value={addressForm.addressLine1}
                          onChange={(event) =>
                            setAddressField("addressLine1", event.target.value)
                          }
                          aria-invalid={Boolean(
                            addressFieldErrors.addressLine1,
                          )}
                          autoComplete="address-line1"
                          maxLength={255}
                          placeholder="Building, street, area"
                          className={fieldClass(
                            Boolean(addressFieldErrors.addressLine1),
                          )}
                        />
                        <FieldError message={addressFieldErrors.addressLine1} />
                      </label>
                      <label className="min-w-0 space-y-2 text-sm sm:col-span-2">
                        <span className="text-brand-muted">Address line 2</span>
                        <input
                          value={addressForm.addressLine2}
                          onChange={(event) =>
                            setAddressField("addressLine2", event.target.value)
                          }
                          aria-invalid={Boolean(
                            addressFieldErrors.addressLine2,
                          )}
                          autoComplete="address-line2"
                          maxLength={255}
                          placeholder="Apartment, suite, floor"
                          className={fieldClass(
                            Boolean(addressFieldErrors.addressLine2),
                          )}
                        />
                        <FieldError message={addressFieldErrors.addressLine2} />
                      </label>
                      <label className="min-w-0 space-y-2 text-sm sm:col-span-2">
                        <span className="text-brand-muted">Landmark</span>
                        <input
                          value={addressForm.landmark}
                          onChange={(event) =>
                            setAddressField("landmark", event.target.value)
                          }
                          aria-invalid={Boolean(addressFieldErrors.landmark)}
                          maxLength={160}
                          placeholder="Nearby landmark"
                          className={fieldClass(
                            Boolean(addressFieldErrors.landmark),
                          )}
                        />
                        <FieldError message={addressFieldErrors.landmark} />
                      </label>
                      <label className="min-w-0 space-y-2 text-sm">
                        <span className="text-brand-muted">City</span>
                        <input
                          value={addressForm.city}
                          onChange={(event) =>
                            setAddressField("city", event.target.value)
                          }
                          aria-invalid={Boolean(addressFieldErrors.city)}
                          autoComplete="address-level2"
                          maxLength={120}
                          className={fieldClass(
                            Boolean(addressFieldErrors.city),
                          )}
                        />
                        <FieldError message={addressFieldErrors.city} />
                      </label>
                      <label className="min-w-0 space-y-2 text-sm">
                        <span className="text-brand-muted">State</span>
                        <input
                          value={addressForm.state}
                          onChange={(event) =>
                            setAddressField("state", event.target.value)
                          }
                          aria-invalid={Boolean(addressFieldErrors.state)}
                          autoComplete="address-level1"
                          maxLength={120}
                          className={fieldClass(
                            Boolean(addressFieldErrors.state),
                          )}
                        />
                        <FieldError message={addressFieldErrors.state} />
                      </label>
                      <label className="min-w-0 space-y-2 text-sm">
                        <span className="text-brand-muted">Country</span>
                        <input
                          value={addressForm.country}
                          onChange={(event) =>
                            setAddressField("country", event.target.value)
                          }
                          aria-invalid={Boolean(addressFieldErrors.country)}
                          autoComplete="country-name"
                          maxLength={120}
                          className={fieldClass(
                            Boolean(addressFieldErrors.country),
                          )}
                        />
                        <FieldError message={addressFieldErrors.country} />
                      </label>
                      <label className="flex min-w-0 items-center gap-2 self-end rounded-lg border border-border bg-brand-panel px-3 py-3 text-sm text-brand-muted">
                        <input
                          type="checkbox"
                          checked={addressForm.isDefault}
                          onChange={(event) =>
                            setAddressField("isDefault", event.target.checked)
                          }
                          className="h-4 w-4 accent-primary"
                        />
                        Use as default address
                      </label>
                      <div className="sm:col-span-2">
                        <Button
                          type="submit"
                          disabled={isSavingAddress}
                          className="w-full rounded-xl px-4 sm:w-auto"
                        >
                          {isSavingAddress ? "Saving..." : "Save address"}
                        </Button>
                      </div>
                    </form>
                  ) : null}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 rounded-xl border border-border bg-brand-panel p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-brand-muted">Estimated subtotal</p>
                  <p className="text-2xl font-bold text-white">
                    AED {subtotal.toFixed(2)}
                  </p>
                  {productItems.length ? (
                    <p className="mt-1 text-sm text-brand-muted">
                      Product checkout total: AED {productSubtotal.toFixed(2)}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {productItems.length ? (
                    <Button
                      type="button"
                      disabled={isCheckingOut || !selectedAddressId}
                      onClick={() => checkoutProducts(selectedAddressId)}
                      className="rounded-xl px-4"
                    >
                      {isCheckingOut
                        ? "Creating orders..."
                        : `Place product order${productItems.length === 1 ? "" : "s"}`}
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    variant="outline"
                    className="border-border bg-brand-surface text-white hover:bg-border"
                    onClick={clearCart}
                  >
                    Clear cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
