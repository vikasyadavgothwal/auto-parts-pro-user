"use client";

import { type FormEvent, type ReactNode, useEffect } from "react";
import { toast } from "sonner";

import { GoogleBrandIcon } from "@/components/icons/brands";
import {
  BuildingIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserAccountRole } from "@/types/api/user-auth";
import {
  CountryPhoneInput,
  buildInternationalPhoneNumber,
} from "@/components/site/shared/country-phone-input";
import { RequiredMark } from "@/components/site/shared/required-mark";

export type AuthMode = "signin" | "signup";
export type AccountType = UserAccountRole;

const ACCOUNT_TYPE_DESCRIPTIONS: Record<AccountType, string> = {
  User: "Shop for parts and manage your personal vehicles.",
  Fleet: "Manage vehicles and source parts for your fleet.",
  Garage: "Manage repair services and customer bookings.",
  Supplier: "List inventory and respond to buyer RFQs.",
};

export function AccountSetupFields({
  accountType,
  fullName,
  businessName,
  supplierContactPerson,
  supplierDesignation,
  supplierPhoneCountryCode,
  supplierPhoneNumber,
  onAccountTypeChange,
  onFullNameChange,
  onBusinessNameChange,
  onSupplierContactPersonChange,
  onSupplierDesignationChange,
  onSupplierPhoneCountryCodeChange,
  onSupplierPhoneNumberChange,
}: {
  accountType: AccountType;
  fullName: string;
  businessName: string;
  supplierContactPerson: string;
  supplierDesignation: string;
  supplierPhoneCountryCode: string;
  supplierPhoneNumber: string;
  onAccountTypeChange: (value: AccountType) => void;
  onFullNameChange: (value: string) => void;
  onBusinessNameChange: (value: string) => void;
  onSupplierContactPersonChange: (value: string) => void;
  onSupplierDesignationChange: (value: string) => void;
  onSupplierPhoneCountryCodeChange: (value: string) => void;
  onSupplierPhoneNumberChange: (value: string) => void;
}) {
  const supplierPhone = buildInternationalPhoneNumber(
    supplierPhoneCountryCode,
    supplierPhoneNumber,
  );

  return (
    <>
      <div className="mb-5 min-w-0 space-y-2">
        <Label htmlFor="account-type" className="text-sm font-medium text-foreground">
          <span>Account Type<RequiredMark /></span>
        </Label>
        <Select
          value={accountType}
          onValueChange={(value) => onAccountTypeChange(value as AccountType)}
        >
          <SelectTrigger id="account-type" className="h-12 w-full rounded-xl bg-background">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="Fleet">Fleet</SelectItem>
            <SelectItem value="Garage">Garage</SelectItem>
            <SelectItem value="Supplier">Supplier</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs leading-5 text-brand-muted">
          {ACCOUNT_TYPE_DESCRIPTIONS[accountType]}
        </p>
      </div>

      <AuthField label={accountType === "User" ? "Full Name" : "Business Name"}>
        <div className="relative min-w-0">
          {accountType === "User" ? (
            <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
          ) : (
            <BuildingIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
          )}
          <Input
            value={accountType === "User" ? fullName : businessName}
            onChange={(event) => accountType === "User"
              ? onFullNameChange(event.target.value)
              : onBusinessNameChange(event.target.value)}
            autoComplete="name"
            placeholder={accountType === "User" ? "Enter your full name" : "Enter business name"}
            className="h-12 bg-background pl-12"
            maxLength={accountType === "User" ? 100 : 120}
            required
          />
        </div>
      </AuthField>

      {accountType === "Supplier" ? (
        <div className="mb-4 rounded-xl border border-border bg-background/60 p-4">
          <AuthField label="Authorized Person Name">
            <div className="relative min-w-0">
              <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
              <Input
                value={supplierContactPerson}
                onChange={(event) =>
                  onSupplierContactPersonChange(event.target.value)
                }
                autoComplete="name"
                placeholder="Enter authorized person name"
                className="h-12 bg-background pl-12"
                maxLength={100}
                required
              />
            </div>
          </AuthField>

          <AuthField label="Designation">
            <div className="relative min-w-0">
              <BuildingIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
              <Input
                value={supplierDesignation}
                onChange={(event) =>
                  onSupplierDesignationChange(event.target.value)
                }
                autoComplete="organization-title"
                placeholder="Enter designation"
                className="h-12 bg-background pl-12"
                maxLength={80}
                required
              />
            </div>
          </AuthField>

          <div className="relative">
            <PhoneIcon className="pointer-events-none absolute left-[calc(9.5rem+1rem)] top-[3.25rem] z-10 h-5 w-5 -translate-y-1/2 text-brand-muted" />
            <CountryPhoneInput
              id="supplier-phone"
              name="supplierPhone"
              label="Phone"
              countryCode={supplierPhoneCountryCode}
              phoneNumber={supplierPhoneNumber}
              onCountryCodeChange={onSupplierPhoneCountryCodeChange}
              onPhoneNumberChange={onSupplierPhoneNumberChange}
              inputClassName="pl-12"
            />
            <p className="mt-2 text-xs text-brand-muted">
              Stored as {supplierPhone}
            </p>
          </div>
        </div>
      ) : null}

    </>
  );
}

export function TermsAgreement({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <div className="mb-5 flex w-full min-w-0 items-start gap-3 rounded-xl border border-border bg-background/70 p-4 text-left shadow-sm sm:mb-6">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        className="mt-0.5 size-5 shrink-0 border-2 border-primary bg-background data-[state=checked]:bg-primary"
      />
      <Label
        htmlFor="terms"
        className="block min-w-0 flex-1 whitespace-normal break-words text-left text-xs leading-5 text-brand-muted sm:text-sm sm:leading-6"
      >
        <span>I agree<RequiredMark /></span>{" "}to the{" "}
        <a
          href="/terms"
          className="inline whitespace-normal break-words font-medium text-primary underline-offset-4 hover:underline"
        >
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="inline whitespace-normal break-words font-medium text-primary underline-offset-4 hover:underline"
        >
          Privacy Policy
        </a>
      </Label>
    </div>
  );
}

export function EmailForm({
  mode,
  email,
  password,
  showPassword,
  isSubmitting,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: {
  mode: AuthMode;
  email: string;
  password: string;
  showPassword: boolean;
  isSubmitting: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <EmailFields
        mode={mode}
        email={email}
        password={password}
        showPassword={showPassword}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onTogglePassword={onTogglePassword}
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl"
      >
        {isSubmitting
          ? "Signing In..."
          : mode === "signin"
            ? "Sign in"
            : "Continue"}
      </Button>
    </form>
  );
}

export function EmailFields({
  mode = "signin",
  email,
  password,
  confirmPassword = "",
  showPassword,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
}: {
  mode?: AuthMode;
  email: string;
  password: string;
  confirmPassword?: string;
  showPassword: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange?: (value: string) => void;
  onTogglePassword: () => void;
}) {
  return (
    <>
      <AuthField label="Email Address">
        <div className="relative">
          <MailIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
          <Input
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            autoComplete="email"
            placeholder="Enter your email"
            className="h-12 bg-background pl-12"
            maxLength={254}
            required
          />
        </div>
      </AuthField>
      <AuthField label="Password">
        <div className="relative">
          <LockIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            placeholder="Enter your password"
            className="h-12 bg-background pl-12 pr-12"
            minLength={8}
            maxLength={128}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onTogglePassword}
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-brand-muted hover:bg-transparent hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <EyeIcon className="h-5 w-5" />
          </Button>
        </div>
      </AuthField>
      {mode === "signup" ? (
        <AuthField label="Confirm Password">
          <div className="relative">
            <LockIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
            <Input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => onConfirmPasswordChange?.(event.target.value)}
              autoComplete="new-password"
              placeholder="Enter your password again"
              className="h-12 bg-background pl-12"
              minLength={8}
              maxLength={128}
              required
            />
          </div>
        </AuthField>
      ) : null}
    </>
  );
}

export function AuthMethodHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 min-w-0 rounded-xl border border-border bg-background/60 p-3 sm:p-4">
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm leading-5 text-brand-muted">{description}</p>
    </div>
  );
}

export function AuthField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4 min-w-0 space-y-2">
      <Label className="text-sm font-medium text-foreground">
        <span>{label}<RequiredMark /></span>
      </Label>
      {children}
    </div>
  );
}

export function GoogleButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className="h-11 w-full rounded-xl border-border bg-background"
    >
      <GoogleBrandIcon className="h-5 w-5" />
      Continue with Google
    </Button>
  );
}

export function AuthFeedback({ error, status }: { error: string; status: string }) {
  useEffect(() => {
    if (error) toast.error(error);
    else if (status) toast.success(status);
  }, [error, status]);

  return null;
}

export function AuthSeparator() {
  return (
    <FieldSeparator className="my-6 *:data-[slot=field-separator-content]:bg-card">
      Or continue with
    </FieldSeparator>
  );
}
