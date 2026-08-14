"use client";

import { type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  AccountSetupFields,
  AuthFeedback,
  AuthSeparator,
  EmailFields,
  GoogleButton,
  TermsAgreement,
  type AccountType,
} from "@/components/site/auth/auth-shared";

export function AuthRegister({
  accountType,
  fullName,
  businessName,
  supplierContactPerson,
  supplierDesignation,
  supplierPhoneCountryCode,
  supplierPhoneNumber,
  email,
  password,
  confirmPassword,
  showPassword,
  acceptedTerms,
  isSubmitting,
  errorMessage,
  statusMessage,
  onAccountTypeChange,
  onFullNameChange,
  onBusinessNameChange,
  onSupplierContactPersonChange,
  onSupplierDesignationChange,
  onSupplierPhoneCountryCodeChange,
  onSupplierPhoneNumberChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onTermsChange,
  onSubmit,
  onGoogleSignIn,
}: {
  accountType: AccountType;
  fullName: string;
  businessName: string;
  supplierContactPerson: string;
  supplierDesignation: string;
  supplierPhoneCountryCode: string;
  supplierPhoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  acceptedTerms: boolean;
  isSubmitting: boolean;
  errorMessage: string;
  statusMessage: string;
  onAccountTypeChange: (value: AccountType) => void;
  onFullNameChange: (value: string) => void;
  onBusinessNameChange: (value: string) => void;
  onSupplierContactPersonChange: (value: string) => void;
  onSupplierDesignationChange: (value: string) => void;
  onSupplierPhoneCountryCodeChange: (value: string) => void;
  onSupplierPhoneNumberChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onTermsChange: (value: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn: () => void;
}) {
  // FIX: Extracted existing registration view without changing fields or submit.
  return (
    <form
      className="min-w-0 px-4 pb-6 sm:px-8 sm:pb-8"
      onSubmit={onSubmit}
      noValidate
    >
      <AccountSetupFields
        accountType={accountType}
        fullName={fullName}
        businessName={businessName}
        supplierContactPerson={supplierContactPerson}
        supplierDesignation={supplierDesignation}
        supplierPhoneCountryCode={supplierPhoneCountryCode}
        supplierPhoneNumber={supplierPhoneNumber}
        onAccountTypeChange={onAccountTypeChange}
        onFullNameChange={onFullNameChange}
        onBusinessNameChange={onBusinessNameChange}
        onSupplierContactPersonChange={onSupplierContactPersonChange}
        onSupplierDesignationChange={onSupplierDesignationChange}
        onSupplierPhoneCountryCodeChange={onSupplierPhoneCountryCodeChange}
        onSupplierPhoneNumberChange={onSupplierPhoneNumberChange}
      />

      <EmailFields
        mode="signup"
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        showPassword={showPassword}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onConfirmPasswordChange={onConfirmPasswordChange}
        onTogglePassword={onTogglePassword}
      />
      <TermsAgreement
        checked={acceptedTerms}
        onCheckedChange={onTermsChange}
      />
      <AuthFeedback error={errorMessage} status={statusMessage} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>

      <AuthSeparator />
      <GoogleButton disabled={isSubmitting} onClick={onGoogleSignIn} />
    </form>
  );
}
