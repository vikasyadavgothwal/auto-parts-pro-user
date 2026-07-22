"use client";

import { type FormEvent, type ReactNode } from "react";

import { GoogleBrandIcon } from "@/components/icons/brands";
import {
  BuildingIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
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
  onAccountTypeChange,
  onFullNameChange,
  onBusinessNameChange,
}: {
  accountType: AccountType;
  fullName: string;
  businessName: string;
  onAccountTypeChange: (value: AccountType) => void;
  onFullNameChange: (value: string) => void;
  onBusinessNameChange: (value: string) => void;
}) {
  return (
    <>
      <div className="mb-5 min-w-0 space-y-2">
        <Label htmlFor="account-type" className="text-sm font-medium text-foreground">
          Account Type
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
            required
          />
        </div>
      </AuthField>

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
        className="mt-0.5 shrink-0"
      />
      <Label
        htmlFor="terms"
        className="block min-w-0 flex-1 whitespace-normal break-words text-left text-xs leading-5 text-brand-muted sm:text-sm sm:leading-6"
      >
        I agree to the{" "}
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
    <form onSubmit={onSubmit}>
      <EmailFields
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
  email,
  password,
  showPassword,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
}: {
  email: string;
  password: string;
  showPassword: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
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
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-12 bg-background pl-12 pr-12"
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
      <Label className="text-sm font-medium text-foreground">{label}</Label>
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
  if (!error && !status) {
    return null;
  }

  return (
    <p
      role="status"
      aria-live="polite"
      className={`mb-4 text-sm ${error ? "text-destructive" : "text-emerald-600"}`}
    >
      {error || status}
    </p>
  );
}

export function AuthSeparator() {
  return (
    <FieldSeparator className="my-6 *:data-[slot=field-separator-content]:bg-card">
      Or continue with
    </FieldSeparator>
  );
}
