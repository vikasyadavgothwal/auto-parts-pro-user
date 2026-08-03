"use client";

import { type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  AccountSetupFields,
  AuthFeedback,
  TermsAgreement,
  type AccountType,
} from "@/components/site/auth/auth-shared";

export function AuthCompleteAccount({
  accountType,
  fullName,
  businessName,
  supplierContactPerson,
  supplierDesignation,
  supplierPhoneCountryCode,
  supplierPhoneNumber,
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
  onTermsChange,
  onSubmit,
}: {
  accountType: AccountType;
  fullName: string;
  businessName: string;
  supplierContactPerson: string;
  supplierDesignation: string;
  supplierPhoneCountryCode: string;
  supplierPhoneNumber: string;
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
  onTermsChange: (value: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  // FIX: Extracted existing complete-account view without changing behavior.
  return (
    <form
      className="min-w-0 px-4 pb-6 sm:px-8 sm:pb-8"
      onSubmit={onSubmit}
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
    </form>
  );
}
