"use client";

import { type FormEvent } from "react";
import { CheckCircle2, CreditCard, MapPin, Plus, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  CountryPhoneInput,
  PHONE_COUNTRY_OPTIONS,
  buildInternationalPhoneNumber,
  normalizePhoneDigits,
} from "@/components/site/shared/country-phone-input";
import { RequiredMark } from "@/components/site/shared/required-mark";

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
  country: string;
  isDefault: boolean;
};

export type AddressFieldErrors = Partial<Record<keyof AddressForm, string>>;

const fieldClass = (hasError: boolean) =>
  `h-11 rounded-lg border-brand-subtle bg-brand-panel text-white ${
    hasError ? "border-destructive" : ""
  }`;

const phoneSelectClass = (hasError: boolean) =>
  `h-11 !w-24 !min-w-0 rounded-l-lg rounded-r-none border-border bg-brand-panel px-2 text-white ${
    hasError ? "border-destructive" : ""
  }`;

const phoneInputClass = (hasError: boolean) =>
  `h-11 rounded-l-none rounded-r-lg border-border border-l-0 bg-brand-panel text-white ${
    hasError ? "border-destructive" : ""
  }`;

const parseInternationalPhone = (value: string) => {
  const compact = value.replace(/[^\d+]/g, "");
  const countryCode =
    [...PHONE_COUNTRY_OPTIONS]
      .sort((left, right) => right.code.length - left.code.length)
      .find((country) => compact.startsWith(country.code))?.code ?? "+971";
  return {
    countryCode,
    phoneNumber: normalizePhoneDigits(compact.slice(countryCode.length)),
  };
};

const addressText = (address: UserAddress) =>
  [
    address.addressLine1,
    address.addressLine2,
    address.landmark,
    address.city,
    address.state,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");

type CartSummaryProps = {
  productItemCount: number;
  serviceItemCount: number;
  subtotal: number;
  productSubtotal: number;
  serviceAdvanceSubtotal: number;
  payableSubtotal: number;
  garageAdvance: {
    mode: "percentage" | "fixed";
    value: number;
  };
  selectedAddressId: string;
  addresses: UserAddress[];
  showAddressForm: boolean;
  addressForm: AddressForm;
  addressFieldErrors: AddressFieldErrors;
  isLoadingAddresses: boolean;
  isSavingAddress: boolean;
  isCheckingOut: boolean;
  onAddressModalChange: (open: boolean) => void;
  onSelectAddress: (addressId: string) => void;
  onSaveAddress: (event: FormEvent<HTMLFormElement>) => void;
  onAddressFieldChange: <Key extends keyof AddressForm>(
    key: Key,
    value: AddressForm[Key],
  ) => void;
  onPhoneChange: (value: string) => void;
  onCheckoutProducts: () => void;
  onClearCart: () => void;
};

export function CartSummary({
  productItemCount,
  serviceItemCount,
  subtotal,
  productSubtotal,
  serviceAdvanceSubtotal,
  payableSubtotal,
  garageAdvance,
  selectedAddressId,
  addresses,
  showAddressForm,
  addressForm,
  addressFieldErrors,
  isLoadingAddresses,
  isSavingAddress,
  isCheckingOut,
  onAddressModalChange,
  onSelectAddress,
  onSaveAddress,
  onAddressFieldChange,
  onPhoneChange,
  onCheckoutProducts,
  onClearCart,
}: CartSummaryProps) {
  const parsedPhone = parseInternationalPhone(addressForm.phone);
  const selectedAddress = addresses.find((address) => address.id === selectedAddressId);

  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      {productItemCount ? (
        <section className="rounded-lg border border-border bg-brand-panel p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                <MapPin className="h-5 w-5 text-primary" />
                Delivery address
              </h2>
              <p className="mt-1 text-sm text-brand-muted">
                Product orders need a saved delivery address.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 border-border bg-brand-surface text-white hover:bg-border"
              onClick={() => onAddressModalChange(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            {isLoadingAddresses ? (
              <p className="rounded-lg border border-border bg-brand-surface p-3 text-sm text-brand-muted">
                Loading addresses...
              </p>
            ) : addresses.length ? (
              addresses.map((address) => (
                <button
                  key={address.id}
                  type="button"
                  onClick={() => onSelectAddress(address.id)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selectedAddressId === address.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-brand-surface hover:border-primary/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-white">{address.label}</span>
                    {selectedAddressId === address.id ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : null}
                  </div>
                  <p className="mt-1 break-words text-sm text-white">
                    {address.recipientName} | {address.phone}
                  </p>
                  <p className="mt-1 line-clamp-2 break-words text-sm leading-5 text-brand-muted">
                    {addressText(address)}
                  </p>
                </button>
              ))
            ) : (
              <p className="rounded-lg border border-dashed border-border bg-brand-surface p-3 text-sm text-brand-muted">
                Add a delivery address before placing a product order.
              </p>
            )}
          </div>
        </section>
      ) : null}

      <section className="rounded-lg border border-border bg-brand-panel p-4">
        <h2 className="flex items-center gap-2 text-base font-semibold text-white">
          <CreditCard className="h-5 w-5 text-primary" />
          Order summary
        </h2>

        <div className="mt-4 space-y-3 border-b border-border pb-4 text-sm">
          <div className="flex justify-between gap-4 text-brand-muted">
            <span>Products</span>
            <span className="text-white">AED {Math.round(productSubtotal)}</span>
          </div>
          <div className="flex justify-between gap-4 text-brand-muted">
            <span>Garage service advance</span>
            <span className="text-white">AED {Math.round(serviceAdvanceSubtotal)}</span>
          </div>
          {serviceItemCount ? (
            <p className="rounded-lg bg-brand-surface px-3 py-2 text-xs leading-5 text-brand-muted">
              Service advance is due now
              {garageAdvance.mode === "percentage"
                ? ` at ${garageAdvance.value}% of service price.`
                : ` as AED ${Math.round(garageAdvance.value)} per service.`}
            </p>
          ) : null}
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-brand-muted">Payable now</p>
            <p className="text-2xl font-bold text-white">
              AED {Math.round(payableSubtotal)}
            </p>
          </div>
          <p className="text-right text-xs text-brand-muted">
            Cart value AED {Math.round(subtotal)}
          </p>
        </div>

        {selectedAddress ? (
          <p className="mt-3 flex items-center gap-2 rounded-lg bg-brand-surface px-3 py-2 text-xs text-brand-muted">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Delivering to {selectedAddress.label}
          </p>
        ) : null}

        <div className="mt-4 grid gap-2">
          {productItemCount ? (
            <Button
              type="button"
              disabled={isCheckingOut || !selectedAddressId}
              onClick={onCheckoutProducts}
              className="rounded-lg px-4"
            >
              {isCheckingOut
                ? "Processing payment..."
                : `Pay & place order${productItemCount === 1 ? "" : "s"}`}
            </Button>
          ) : null}
          <Button
            type="button"
            variant="outline"
            className="rounded-lg border-border bg-brand-surface text-white hover:bg-border"
            onClick={onClearCart}
          >
            Clear cart
          </Button>
        </div>
      </section>

      <Dialog open={showAddressForm} onOpenChange={onAddressModalChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-brand-surface text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add delivery address</DialogTitle>
            <DialogDescription>
              Save a delivery address for product checkout.
            </DialogDescription>
          </DialogHeader>

          <form id="checkout-address-form" onSubmit={onSaveAddress} noValidate>
            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">Address label<RequiredMark /></span>
                <Input
                  value={addressForm.label}
                  onChange={(event) => onAddressFieldChange("label", event.target.value)}
                  aria-invalid={Boolean(addressFieldErrors.label)}
                  required
                  maxLength={60}
                  placeholder="Home, Office, Warehouse"
                  className={fieldClass(Boolean(addressFieldErrors.label))}
                />
              </label>
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">Recipient name<RequiredMark /></span>
                <Input
                  value={addressForm.recipientName}
                  onChange={(event) =>
                    onAddressFieldChange("recipientName", event.target.value)
                  }
                  aria-invalid={Boolean(addressFieldErrors.recipientName)}
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder="Full name"
                  className={fieldClass(Boolean(addressFieldErrors.recipientName))}
                />
              </label>
              <CountryPhoneInput
                id="checkout-address-phone"
                label="Phone"
                className="[&>div]:grid-cols-[6rem_minmax(0,1fr)]"
                countryCode={parsedPhone.countryCode}
                phoneNumber={parsedPhone.phoneNumber}
                onCountryCodeChange={(countryCode) =>
                  onPhoneChange(buildInternationalPhoneNumber(countryCode, parsedPhone.phoneNumber))
                }
                onPhoneNumberChange={(phoneNumber) =>
                  onPhoneChange(buildInternationalPhoneNumber(parsedPhone.countryCode, phoneNumber))
                }
                labelClassName="text-brand-muted"
                selectClassName={phoneSelectClass(Boolean(addressFieldErrors.phone))}
                inputClassName={phoneInputClass(Boolean(addressFieldErrors.phone))}
              />
              <label className="min-w-0 space-y-2 text-sm sm:col-span-2">
                <span className="text-brand-muted">Address line 1<RequiredMark /></span>
                <Input
                  value={addressForm.addressLine1}
                  onChange={(event) =>
                    onAddressFieldChange("addressLine1", event.target.value)
                  }
                  aria-invalid={Boolean(addressFieldErrors.addressLine1)}
                  required
                  autoComplete="address-line1"
                  maxLength={255}
                  placeholder="Building, street, area"
                  className={fieldClass(Boolean(addressFieldErrors.addressLine1))}
                />
              </label>
              <label className="min-w-0 space-y-2 text-sm sm:col-span-2">
                <span className="text-brand-muted">Address line 2</span>
                <Input
                  value={addressForm.addressLine2}
                  onChange={(event) =>
                    onAddressFieldChange("addressLine2", event.target.value)
                  }
                  aria-invalid={Boolean(addressFieldErrors.addressLine2)}
                  autoComplete="address-line2"
                  maxLength={255}
                  placeholder="Apartment, suite, floor"
                  className={fieldClass(Boolean(addressFieldErrors.addressLine2))}
                />
              </label>
              <label className="min-w-0 space-y-2 text-sm sm:col-span-2">
                <span className="text-brand-muted">Landmark</span>
                <Input
                  value={addressForm.landmark}
                  onChange={(event) => onAddressFieldChange("landmark", event.target.value)}
                  aria-invalid={Boolean(addressFieldErrors.landmark)}
                  maxLength={160}
                  placeholder="Nearby landmark"
                  className={fieldClass(Boolean(addressFieldErrors.landmark))}
                />
              </label>
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">City<RequiredMark /></span>
                <Input
                  value={addressForm.city}
                  onChange={(event) => onAddressFieldChange("city", event.target.value)}
                  aria-invalid={Boolean(addressFieldErrors.city)}
                  required
                  autoComplete="address-level2"
                  maxLength={120}
                  placeholder="Dubai"
                  className={fieldClass(Boolean(addressFieldErrors.city))}
                />
              </label>
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">State<RequiredMark /></span>
                <Input
                  value={addressForm.state}
                  onChange={(event) => onAddressFieldChange("state", event.target.value)}
                  aria-invalid={Boolean(addressFieldErrors.state)}
                  required
                  autoComplete="address-level1"
                  maxLength={120}
                  placeholder="Dubai"
                  className={fieldClass(Boolean(addressFieldErrors.state))}
                />
              </label>
              <label className="min-w-0 space-y-2 text-sm">
                <span className="text-brand-muted">Country<RequiredMark /></span>
                <Input
                  value={addressForm.country}
                  onChange={(event) => onAddressFieldChange("country", event.target.value)}
                  aria-invalid={Boolean(addressFieldErrors.country)}
                  required
                  autoComplete="country-name"
                  maxLength={120}
                  placeholder="United Arab Emirates"
                  className={fieldClass(Boolean(addressFieldErrors.country))}
                />
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
            </div>
          </form>

          <DialogFooter className="border-border bg-brand-panel">
            <Button
              type="button"
              variant="outline"
              className="border-border bg-brand-surface text-white hover:bg-border"
              onClick={() => onAddressModalChange(false)}
              disabled={isSavingAddress}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="checkout-address-form"
              disabled={isSavingAddress}
              className="rounded-lg"
            >
              {isSavingAddress ? "Saving..." : "Save address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
