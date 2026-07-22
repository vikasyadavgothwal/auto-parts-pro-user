"use client";

import { type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { CountryPhoneInput } from "@/components/site/shared/country-phone-input";
import {
  AuthFeedback,
  AuthMethodHeading,
} from "@/components/site/auth/auth-shared";

export function AuthLoginPhoneSend({
  phoneCountryCode,
  phoneNumber,
  isSubmitting,
  errorMessage,
  statusMessage,
  onCountryCodeChange,
  onPhoneNumberChange,
  onSendOtp,
  onUseEmail,
}: {
  phoneCountryCode: string;
  phoneNumber: string;
  isSubmitting: boolean;
  errorMessage: string;
  statusMessage: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onSendOtp: (event: FormEvent<HTMLFormElement>) => void;
  onUseEmail: () => void;
}) {
  return (
    <div className="min-w-0 px-4 pb-6 sm:px-8 sm:pb-8">
      <form onSubmit={onSendOtp}>
        <AuthMethodHeading
          title="Sign in with mobile"
          description="We’ll send a secure one-time code to your phone."
        />
        <CountryPhoneInput
          id="auth-phone-number"
          label="Phone Number"
          countryCode={phoneCountryCode}
          phoneNumber={phoneNumber}
          onCountryCodeChange={onCountryCodeChange}
          onPhoneNumberChange={onPhoneNumberChange}
          inputClassName="bg-background"
          selectClassName="bg-background"
        />
        <div id="firebase-phone-recaptcha" />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 h-12 w-full rounded-xl"
        >
          {isSubmitting ? "Sending..." : "Send Verification Code"}
        </Button>
        <Button
          type="button"
          variant="link"
          disabled={isSubmitting}
          onClick={onUseEmail}
          className="mt-2 w-full"
        >
          Use email and password instead
        </Button>
      </form>
      <AuthFeedback error={errorMessage} status={statusMessage} />
    </div>
  );
}
