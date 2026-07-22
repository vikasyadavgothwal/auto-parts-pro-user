"use client";

import { type FormEvent } from "react";
import { CheckCircle2, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

export type UserAddress = {
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

export type AddressForm = {
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

export type AddressFieldErrors = Partial<Record<keyof AddressForm, string>>;

const fieldClass = (hasError: boolean) =>
  `h-11 w-full min-w-0 rounded-lg border bg-brand-panel px-3 text-white outline-none transition-colors focus:border-primary ${
    hasError ? "border-destructive" : "border-border"
  }`;

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-xs text-destructive">{message}</p> : null;

type CartSummaryProps = {
  productItemCount: number;
  subtotal: number;
  productSubtotal: number;
  selectedAddressId: string;
  addresses: UserAddress[];
  showAddressForm: boolean;
  addressForm: AddressForm;
  addressError: string;
  addressFieldErrors: AddressFieldErrors;
  isLoadingAddresses: boolean;
  isSavingAddress: boolean;
  isCheckingOut: boolean;
  onToggleAddressForm: () => void;
  onSelectAddress: (addressId: string) => void;
  onSaveAddress: (event: FormEvent<HTMLFormElement>) => void;
  onAddressFieldChange: <Key extends keyof AddressForm>(
    key: Key,
    value: AddressForm[Key],
  ) => void;
  onPhoneChange: (value: string) => void;
  onPostalCodeChange: (value: string) => void;
  onCheckoutProducts: () => void;
  onClearCart: () => void;
};

export function CartSummary({
  productItemCount,
  subtotal,
  productSubtotal,
  selectedAddressId,
  addresses,
  showAddressForm,
  addressForm,
  addressError,
  addressFieldErrors,
  isLoadingAddresses,
  isSavingAddress,
  isCheckingOut,
  onToggleAddressForm,
  onSelectAddress,
  onSaveAddress,
  onAddressFieldChange,
  onPhoneChange,
  onPostalCodeChange,
  onCheckoutProducts,
  onClearCart,
}: CartSummaryProps) {
  return (
    <>
      {productItemCount ? (
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
              onClick={onToggleAddressForm}
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
            <p className="text-sm text-brand-muted">Loading addresses...</p>
          ) : addresses.length ? (
            <div className="grid gap-3 md:grid-cols-2">
              {addresses.map((address) => (
                <button
                  key={address.id}
                  type="button"
                  onClick={() => onSelectAddress(address.id)}
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
              onSubmit={onSaveAddress}
              noValidate
              className="grid min-w-0 gap-4 rounded-lg border border-border bg-brand-surface p-3 sm:grid-cols-2 sm:p-4"
            >
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">Address label</span>
                <input
                  value={addressForm.label}
                  onChange={(event) =>
                    onAddressFieldChange("label", event.target.value)
                  }
                  aria-invalid={Boolean(addressFieldErrors.label)}
                  maxLength={60}
                  placeholder="Home, Office, Warehouse"
                  className={fieldClass(Boolean(addressFieldErrors.label))}
                />
                <FieldError message={addressFieldErrors.label} />
              </label>
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">Recipient name</span>
                <input
                  value={addressForm.recipientName}
                  onChange={(event) =>
                    onAddressFieldChange("recipientName", event.target.value)
                  }
                  aria-invalid={Boolean(addressFieldErrors.recipientName)}
                  maxLength={120}
                  autoComplete="name"
                  className={fieldClass(
                    Boolean(addressFieldErrors.recipientName),
                  )}
                />
                <FieldError message={addressFieldErrors.recipientName} />
              </label>
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">Phone</span>
                <input
                  value={addressForm.phone}
                  onChange={(event) => onPhoneChange(event.target.value)}
                  aria-invalid={Boolean(addressFieldErrors.phone)}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+971..."
                  className={fieldClass(Boolean(addressFieldErrors.phone))}
                />
                <FieldError message={addressFieldErrors.phone} />
              </label>
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">Postal code</span>
                <input
                  value={addressForm.postalCode}
                  onChange={(event) => onPostalCodeChange(event.target.value)}
                  aria-invalid={Boolean(addressFieldErrors.postalCode)}
                  autoComplete="postal-code"
                  maxLength={20}
                  className={fieldClass(Boolean(addressFieldErrors.postalCode))}
                />
                <FieldError message={addressFieldErrors.postalCode} />
              </label>
              <label className="min-w-0 space-y-2 text-sm sm:col-span-2">
                <span className="text-brand-muted">Address line 1</span>
                <input
                  value={addressForm.addressLine1}
                  onChange={(event) =>
                    onAddressFieldChange("addressLine1", event.target.value)
                  }
                  aria-invalid={Boolean(addressFieldErrors.addressLine1)}
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
                    onAddressFieldChange("addressLine2", event.target.value)
                  }
                  aria-invalid={Boolean(addressFieldErrors.addressLine2)}
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
                    onAddressFieldChange("landmark", event.target.value)
                  }
                  aria-invalid={Boolean(addressFieldErrors.landmark)}
                  maxLength={160}
                  placeholder="Nearby landmark"
                  className={fieldClass(Boolean(addressFieldErrors.landmark))}
                />
                <FieldError message={addressFieldErrors.landmark} />
              </label>
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">City</span>
                <input
                  value={addressForm.city}
                  onChange={(event) =>
                    onAddressFieldChange("city", event.target.value)
                  }
                  aria-invalid={Boolean(addressFieldErrors.city)}
                  autoComplete="address-level2"
                  maxLength={120}
                  className={fieldClass(Boolean(addressFieldErrors.city))}
                />
                <FieldError message={addressFieldErrors.city} />
              </label>
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">State</span>
                <input
                  value={addressForm.state}
                  onChange={(event) =>
                    onAddressFieldChange("state", event.target.value)
                  }
                  aria-invalid={Boolean(addressFieldErrors.state)}
                  autoComplete="address-level1"
                  maxLength={120}
                  className={fieldClass(Boolean(addressFieldErrors.state))}
                />
                <FieldError message={addressFieldErrors.state} />
              </label>
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">Country</span>
                <input
                  value={addressForm.country}
                  onChange={(event) =>
                    onAddressFieldChange("country", event.target.value)
                  }
                  aria-invalid={Boolean(addressFieldErrors.country)}
                  autoComplete="country-name"
                  maxLength={120}
                  className={fieldClass(Boolean(addressFieldErrors.country))}
                />
                <FieldError message={addressFieldErrors.country} />
              </label>
              <label className="flex min-w-0 items-center gap-2 self-end rounded-lg border border-border bg-brand-panel px-3 py-3 text-sm text-brand-muted">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(event) =>
                    onAddressFieldChange("isDefault", event.target.checked)
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
          {productItemCount ? (
            <p className="mt-1 text-sm text-brand-muted">
              Product checkout total: AED {productSubtotal.toFixed(2)}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          {productItemCount ? (
            <Button
              type="button"
              disabled={isCheckingOut || !selectedAddressId}
              onClick={onCheckoutProducts}
              className="rounded-xl px-4"
            >
              {isCheckingOut
                ? "Processing dummy payment..."
                : `Pay & place order${productItemCount === 1 ? "" : "s"}`}
            </Button>
          ) : null}
          <Button
            type="button"
            variant="outline"
            className="border-border bg-brand-surface text-white hover:bg-border"
            onClick={onClearCart}
          >
            Clear cart
          </Button>
        </div>
      </div>
    </>
  );
}
